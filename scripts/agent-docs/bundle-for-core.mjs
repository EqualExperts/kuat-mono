import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..");

const manifestPath = path.join(__dirname, "core-bundle.manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

const outputDir = path.resolve(repoRoot, manifest.outputDir);

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

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const entry of manifest.include) {
  const sourcePath = path.resolve(repoRoot, entry.source);
  const targetPath = path.resolve(outputDir, entry.target);

  const sourceStat = await stat(sourcePath);
  if (shouldDeny(sourcePath)) {
    throw new Error(`Blocked by deny list: ${entry.source}`);
  }

  await mkdir(path.dirname(targetPath), { recursive: true });

  if (sourceStat.isDirectory()) {
    await cp(sourcePath, targetPath, { recursive: true });
  } else {
    await cp(sourcePath, targetPath);
  }
}

await assertSafeTree(outputDir);

const generatedReadme = `# Kuat Consumer Agent Docs

Curated, consumer-safe agent docs bundled with \`@equal-experts/kuat-core\`.

This bundle is generated at package \`prepack\` from:
- local Kuat rules for layout primitives and scenarios
- canonical Equal Experts foundations and web product/marketing rules

## Start here

- [Rules index](./kuat-docs/rules/README.md)
- [Kuat layout primitives](./kuat-docs/rules/design/layouts.md)
- [Scenario patterns](./kuat-docs/rules/scenarios/README.md)
- [Upstream loading index](./external/kuat-agent-rules/kuat-docs/rules/LOADING.md)

## Consumer agent path

\`node_modules/@equal-experts/kuat-core/agent-docs/README.md\`

## Explicit exclusions

Contributor-maintainer docs are excluded from this bundle (for example \`CONTRIBUTING.md\`, \`contribution-docs/\`, \`.cursor/\`, repo \`AGENTS.md\` and \`.cursorrules\`).
`;

await writeFile(path.join(outputDir, "README.md"), generatedReadme, "utf8");
await writeFile(path.join(outputDir, "bundle-manifest.json"), JSON.stringify(manifest, null, 2), "utf8");

console.log(`Bundled consumer agent docs into ${toPosix(path.relative(repoRoot, outputDir))}`);
