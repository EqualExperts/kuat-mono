import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..");

const manifestPath = path.join(__dirname, "core-bundle.manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

const outputDir = path.resolve(repoRoot, manifest.outputDir);
const reactAgentDocs = path.resolve(repoRoot, "packages/kuat-react/agent-docs");
const vueAgentDocs = path.resolve(repoRoot, "packages/kuat-vue/agent-docs");

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function shouldDeny(filePath) {
  const base = path.basename(filePath);
  if (manifest.denyFilenames?.includes(base)) return true;

  const segments = toPosix(filePath).split("/");
  return segments.some((segment) => manifest.denyPathSegments?.includes(segment));
}

async function assertSafeTree(currentPath) {
  const entryStat = await stat(currentPath);
  if (shouldDeny(currentPath)) {
    throw new Error(`Blocked path detected in bundle: ${toPosix(path.relative(repoRoot, currentPath))}`);
  }

  if (!entryStat.isDirectory()) return;

  const entries = await readdir(currentPath, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(currentPath, entry.name);
      await assertSafeTree(entryPath);
    }),
  );
}

async function removeDeprecatedExamples(root) {
  const examplesDirs = [
    path.join(root, "external/kuat-agent-rules/kuat-docs/rules/types/web/product/examples"),
    path.join(root, "kuat-docs/examples"),
  ];
  for (const dir of examplesDirs) {
    try {
      await rm(dir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  }
}

function gitRef(cwd) {
  try {
    return execSync("git rev-parse HEAD", { cwd, encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

async function readPackageVersion(pkgDir) {
  const pkg = JSON.parse(await readFile(path.join(pkgDir, "package.json"), "utf8"));
  return pkg.version ?? "0.0.0";
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const entry of manifest.include) {
  const sourcePath = path.resolve(repoRoot, entry.source);
  const targetPath = path.resolve(outputDir, entry.target);

  if (shouldDeny(sourcePath)) {
    throw new Error(`Blocked by deny list: ${entry.source}`);
  }

  let sourceStat;
  try {
    sourceStat = await stat(sourcePath);
  } catch (err) {
    if (err?.code === "ENOENT") {
      console.warn(`bundle: skip missing source: ${entry.source}`);
      continue;
    }
    throw err;
  }

  await mkdir(path.dirname(targetPath), { recursive: true });

  if (sourceStat.isDirectory()) {
    await cp(sourcePath, targetPath, { recursive: true });
  } else {
    await cp(sourcePath, targetPath);
  }
}

await removeDeprecatedExamples(outputDir);
await assertSafeTree(outputDir);

const upstreamRoot = path.join(repoRoot, "external/kuat-agent-rules");
const snapshotRef = gitRef(upstreamRoot);
const coreVersion = await readPackageVersion(path.join(repoRoot, "packages/kuat-core"));

const loadingConsumer = `# Kuat consumer rules (bundled)

**Package:** @equal-experts/kuat-core (and mirrored in kuat-react / kuat-vue agent-docs)

**Snapshot:** ${snapshotRef.slice(0, 12)}

## Default load (web product / marketing UI)

1. \`external/kuat-agent-rules/kuat-docs/rules/foundations/\` (design, content, brand, logo, accessibility)
2. \`external/kuat-agent-rules/kuat-docs/rules/types/web/product/\` — core files + scenarios + content (examples excluded)
3. \`external/kuat-agent-rules/kuat-docs/rules/types/web/marketing/\`
4. \`kuat-docs/rules/design/layouts.md\` — Kuat layout primitives
5. \`kuat-docs/rules/scenarios/\` — Kuat scenario overlays
6. Component guides on demand: \`components/{slug}.md\` via \`components.manifest.json\`

## Component IDs

Resolve \`shadcn:button\`, \`kuat:button-group\`, etc. using \`components/components.manifest.json\`.

## Full org taxonomy

Set \`KUAT_RULES_PATH\` to a \`kuat-agent-docs\` git clone for slides, graphics, and latest upstream.

## Related

- [README.md](../README.md)
- Upstream [LOADING.md](../external/kuat-agent-rules/kuat-docs/rules/LOADING.md)
`;

await mkdir(path.join(outputDir, "rules"), { recursive: true });
await writeFile(path.join(outputDir, "rules", "LOADING-consumer.md"), loadingConsumer, "utf8");

const consumerAgents = `# Kuat — consumer agent entry

Rules for this install live under \`agent-docs/\` in \`@equal-experts/kuat-core\`, \`@equal-experts/kuat-react\`, and \`@equal-experts/kuat-vue\`.

1. Run \`ensure-rules.sh\` from kuat-agent-docs skills (symlinked) — expect \`RULES_SOURCE=package\` when cwd has node_modules.
2. Load \`agent-docs/rules/LOADING-consumer.md\`.
3. Load component guides via \`agent-docs/components.manifest.json\`.
4. Skills: \`kuat-review\`, \`kuat-create\` from [kuat-agent-docs](https://github.com/equalexperts/kuat-agent-docs).

**Version:** ${coreVersion} · **Rules snapshot:** ${snapshotRef.slice(0, 12)}
`;

await writeFile(path.join(outputDir, "AGENTS.md"), consumerAgents, "utf8");

const agentManifest = {
  packageVersion: coreVersion,
  rules: {
    snapshotRef,
    snapshotDate: new Date().toISOString(),
    sourceRepo: "equalexperts/kuat-agent-docs",
    loadingPath: "agent-docs/rules/LOADING-consumer.md",
  },
};

await writeFile(path.join(outputDir, "manifest.json"), `${JSON.stringify(agentManifest, null, 2)}\n`, "utf8");

const generatedReadme = `# Kuat Consumer Agent Docs

Curated agent docs bundled with \`@equal-experts/kuat-core\`, \`@equal-experts/kuat-react\`, and \`@equal-experts/kuat-vue\`.

## Start here

- [AGENTS.md](./AGENTS.md)
- [rules/LOADING-consumer.md](./rules/LOADING-consumer.md)
- [components/components.manifest.json](./components/components.manifest.json)

## Regenerate

\`\`\`bash
node scripts/agent-docs/bundle-for-core.mjs
\`\`\`

Built against upstream ref: \`${snapshotRef.slice(0, 12)}\`
`;

await writeFile(path.join(outputDir, "README.md"), generatedReadme, "utf8");
await writeFile(path.join(outputDir, "bundle-manifest.json"), JSON.stringify(manifest, null, 2), "utf8");

for (const target of [reactAgentDocs, vueAgentDocs]) {
  await rm(target, { recursive: true, force: true });
  await cp(outputDir, target, { recursive: true });
}

console.log(`Bundled consumer agent docs into ${toPosix(path.relative(repoRoot, outputDir))}`);
console.log(`Mirrored to kuat-react and kuat-vue agent-docs`);
