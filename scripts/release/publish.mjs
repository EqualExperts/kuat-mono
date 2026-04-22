#!/usr/bin/env node

import { readFile, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..");

const PACKAGE_MAP = {
  core: {
    id: "core",
    name: "@equal-experts/kuat-core",
    dir: "packages/kuat-core",
    packageJson: "packages/kuat-core/package.json",
  },
  react: {
    id: "react",
    name: "@equal-experts/kuat-react",
    dir: "packages/kuat-react",
    packageJson: "packages/kuat-react/package.json",
  },
  vue: {
    id: "vue",
    name: "@equal-experts/kuat-vue",
    dir: "packages/kuat-vue",
    packageJson: "packages/kuat-vue/package.json",
  },
};

const DEFAULT_ORDER = ["core", "react", "vue"];

function parseArgs(argv) {
  const parsed = {
    package: "all",
    bump: undefined,
    notesFile: undefined,
    yes: false,
    dryRun: false,
    skipLint: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--yes") {
      parsed.yes = true;
    } else if (arg === "--dry-run") {
      parsed.dryRun = true;
    } else if (arg === "--skip-lint") {
      parsed.skipLint = true;
    } else if (arg === "--package") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) {
        parsed.package = "__prompt_single__";
      } else {
        parsed.package = value;
        i += 1;
      }
    } else if (arg === "--bump") {
      parsed.bump = argv[i + 1];
      i += 1;
    } else if (arg === "--notes-file") {
      parsed.notesFile = argv[i + 1];
      i += 1;
    }
  }

  return parsed;
}

function ensureSemver(version) {
  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error(`Invalid semver value: ${version}`);
  }
}

function bumpVersion(currentVersion, bumpType) {
  ensureSemver(currentVersion);
  const [major, minor, patch] = currentVersion.split(".").map(Number);

  if (bumpType === "patch") return `${major}.${minor}.${patch + 1}`;
  if (bumpType === "minor") return `${major}.${minor + 1}.0`;
  if (bumpType === "major") return `${major + 1}.0.0`;

  ensureSemver(bumpType);
  return bumpType;
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? repoRoot,
    stdio: "inherit",
    shell: false,
  });

  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(" ")}`);
  }
}

function runCapture(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? repoRoot,
    stdio: "pipe",
    shell: false,
    encoding: "utf8",
  });

  if (result.status !== 0) {
    const stderr = result.stderr?.trim();
    throw new Error(`Command failed: ${command} ${args.join(" ")}${stderr ? `\n${stderr}` : ""}`);
  }

  return result.stdout ?? "";
}

function printSuccessSummary({ dryRun, releasePlan, runLint }) {
  const banner = [
    "",
    "==============================================",
    "  _  ___   _    _  _____   ___  _   __        ",
    " | |/ / | | |  / \\|_   _| |_ _|/ \\ / /        ",
    " | ' /| | | | / _ \\ | |    | ||  _  |         ",
    " | . \\| |_| |/ ___ \\| |    | || | | |         ",
    " |_|\\_\\\\___//_/   \\_\\_|   |___|_| |_|         ",
    "                                              ",
    "                                              ",
    " Release flow completed successfully.",
    "==============================================",
  ];
  console.log(banner.join("\n"));

  console.log("\nSummary:");
  console.log(`- Mode: ${dryRun ? "dry-run (no publish/write)" : "publish"}`);
  console.log(`- Lint: ${runLint ? "run" : "skipped"}`);
  console.log("- Packages:");
  for (const item of releasePlan) {
    console.log(`  - ${item.pkg.name}: ${item.from} -> ${item.to}`);
  }
}

function printFailureSummary(error, stage) {
  const banner = [
    "",
    "==============================================",
    "  ____  _____ _     _____ ___ ____  _         ",
    " |  _ \\| ____| |   | ____|_ _|  _ \\| |        ",
    " | |_) |  _| | |   |  _|  | || |_) | |        ",
    " |  _ <| |___| |___| |___ | ||  _ <| |___     ",
    " |_| \\_\\_____|_____|_____|___|_| \\_\\_____|    ",
    "                                              ",
    "                                              ",
    " Release flow stopped due to an issue.",
    "==============================================",
  ];
  console.error(banner.join("\n"));
  console.error("\nFailure summary:");
  console.error(`- Stage: ${stage}`);
  console.error(`- Error: ${error.message}`);
  console.error("\nSuggested actions:");
  console.error("- Fix the issue reported above.");
  console.error("- Re-run the same release command.");
}

function isNpmAuthenticated() {
  const result = spawnSync("npm", ["whoami"], {
    cwd: repoRoot,
    stdio: "pipe",
    shell: false,
    encoding: "utf8",
  });
  return result.status === 0;
}

function ensureNpmAuth(args) {
  if (args.dryRun) return;
  if (isNpmAuthenticated()) return;

  console.log("\nNPM authentication required before release.");
  console.log("Running `npm login` now so release data is not lost later...");

  if (args.yes) {
    throw new Error("Not logged into npm. Run `npm login` first, then retry release command.");
  }

  run("npm", ["login"]);

  if (!isNpmAuthenticated()) {
    throw new Error("npm login did not complete successfully. Aborting release.");
  }
}

async function readJson(relPath) {
  const abs = path.join(repoRoot, relPath);
  return JSON.parse(await readFile(abs, "utf8"));
}

async function writeJson(relPath, value) {
  const abs = path.join(repoRoot, relPath);
  await writeFile(abs, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function collectExportTargets(exportsConfig, acc = new Set()) {
  if (typeof exportsConfig === "string") {
    acc.add(exportsConfig);
    return acc;
  }

  if (Array.isArray(exportsConfig)) {
    for (const item of exportsConfig) {
      collectExportTargets(item, acc);
    }
    return acc;
  }

  if (exportsConfig && typeof exportsConfig === "object") {
    for (const value of Object.values(exportsConfig)) {
      collectExportTargets(value, acc);
    }
  }

  return acc;
}

function parsePackedFilename(packOutput, packageName) {
  const lines = packOutput
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const tarball = [...lines].reverse().find((line) => line.endsWith(".tgz"));
  if (!tarball) {
    throw new Error(`Could not determine tarball name for ${packageName} from npm pack output.`);
  }
  return tarball;
}

function toTarEntryPath(relativePath) {
  return `package/${relativePath.replace(/^\.\//, "")}`;
}

function listTarEntries(tarballPath, cwd) {
  const output = runCapture("tar", ["-tzf", tarballPath], { cwd });
  return new Set(
    output
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
  );
}

function extractTarText(tarballPath, entryPath, cwd) {
  return runCapture("tar", ["-xOf", tarballPath, entryPath], { cwd });
}

async function validateExportTargets(pkg, tarballPath, cwd) {
  const packageJson = await readJson(pkg.packageJson);
  const exportTargets = [...collectExportTargets(packageJson.exports)];
  const entries = listTarEntries(tarballPath, cwd);

  for (const target of exportTargets) {
    const expectedEntry = toTarEntryPath(target);
    if (!entries.has(expectedEntry)) {
      throw new Error(
        `${pkg.name} export target missing from tarball: ${target} (expected ${expectedEntry} in ${tarballPath})`,
      );
    }
  }
}

async function validateStylesContract(pkg, tarballPath, cwd) {
  const packageJson = await readJson(pkg.packageJson);
  const stylesExport = packageJson.exports?.["./styles"];
  if (!stylesExport) return;

  const stylesTarget =
    typeof stylesExport === "string"
      ? stylesExport
      : stylesExport.import ?? stylesExport.default ?? stylesExport.require;

  if (!stylesTarget || typeof stylesTarget !== "string") {
    throw new Error(`${pkg.name} has invalid ./styles export configuration.`);
  }

  const stylesEntry = toTarEntryPath(stylesTarget);
  const entries = listTarEntries(tarballPath, cwd);
  if (!entries.has(stylesEntry)) {
    throw new Error(`${pkg.name} styles export target missing from tarball: ${stylesTarget}`);
  }

  const requiredSelectorsByPackage = {
    react: [".button", ".field", ".content-card", ".kuat-carousel"],
    vue: [".button", ".field", ".kuat-carousel"],
  };
  const requiredSelectors = requiredSelectorsByPackage[pkg.id];
  if (requiredSelectors) {
    const css = extractTarText(tarballPath, stylesEntry, cwd);
    const missing = requiredSelectors.filter((selector) => !css.includes(selector));
    if (missing.length > 0) {
      throw new Error(
        `${pkg.name} styles contract failed. Missing selectors in ${stylesTarget}: ${missing.join(", ")}`,
      );
    }
  }
}

async function promptList(rl, label, options, defaultIndex = 0) {
  console.log(`\n${label}`);
  options.forEach((option, index) => {
    const marker = index === defaultIndex ? "*" : " ";
    console.log(`  ${index + 1}) [${marker}] ${option.label}`);
  });
  const raw = await rl.question(`Select (1-${options.length}) [${defaultIndex + 1}]: `);
  const selectedIndex = raw.trim() ? Number(raw.trim()) - 1 : defaultIndex;
  if (!Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex >= options.length) {
    throw new Error(`Invalid selection: ${raw}`);
  }
  return options[selectedIndex].value;
}

async function promptYesNo(rl, label, defaultYes = true) {
  const suffix = defaultYes ? "Y/n" : "y/N";
  const raw = await rl.question(`${label} [${suffix}]: `);
  if (!raw.trim()) return defaultYes;
  return raw.trim().toLowerCase().startsWith("y");
}

function toBullets(text) {
  if (!text.trim()) return [];
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (line.startsWith("- ") ? line.slice(2).trim() : line));
}

async function collectNotes(rl, args) {
  if (args.notesFile) {
    const notes = await readFile(path.resolve(repoRoot, args.notesFile), "utf8");
    const items = toBullets(notes);
    return {
      added: [],
      changed: items,
      fixed: [],
    };
  }

  const added = await rl.question("Added bullets (one per line, blank for none):\n");
  const changed = await rl.question("Changed bullets (one per line, blank for none):\n");
  const fixed = await rl.question("Fixed bullets (one per line, blank for none):\n");

  return {
    added: toBullets(added),
    changed: toBullets(changed),
    fixed: toBullets(fixed),
  };
}

function sectionLines(title, entries) {
  if (!entries.length) return [];
  return [`### ${title}`, ...entries.map((entry) => `- ${entry}`), ""];
}

function buildChangelogEntry({ heading, affectedPackages, notes }) {
  const today = new Date().toISOString().slice(0, 10);
  const lines = [
    `## ${heading} - ${today}`,
    "",
    "### Affected packages",
    ...affectedPackages.map((item) => `- ${item}`),
    "",
    ...sectionLines("Added", notes.added),
    ...sectionLines("Changed", notes.changed),
    ...sectionLines("Fixed", notes.fixed),
  ];

  if (!notes.added.length && !notes.changed.length && !notes.fixed.length) {
    lines.push("### Notes", "- Release prepared via shorthand script.", "");
  }

  return `${lines.join("\n").trimEnd()}\n\n`;
}

async function updateChangelog(entry) {
  const changelogPath = path.join(repoRoot, "CHANGELOG.md");
  const current = await readFile(changelogPath, "utf8");

  const header = "# Changelog\n\nAll notable changes to the published Kuat packages are documented in this file.\n\n";
  let remaining = current;
  if (current.startsWith(header)) {
    remaining = current.slice(header.length);
  }

  await writeFile(changelogPath, `${header}${entry}${remaining}`, "utf8");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  let currentStage = "initialization";

  try {
    console.log("Kuat interactive release");
    console.log(`Mode: ${args.dryRun ? "dry-run" : "publish"}`);
    currentStage = "npm authentication";
    ensureNpmAuth(args);

    let scope = args.package;
    if (!args.yes) {
      if (scope === "__prompt_single__") {
        scope = await promptList(
          rl,
          "Select package to release:",
          DEFAULT_ORDER.map((key) => ({ label: PACKAGE_MAP[key].name, value: key })),
          1,
        );
      } else if (scope === "all") {
        scope = await promptList(
          rl,
          "Release scope:",
          [
            { label: "All packages (default)", value: "all" },
            ...DEFAULT_ORDER.map((key) => ({ label: `Single: ${PACKAGE_MAP[key].name}`, value: key })),
          ],
          0,
        );
      }
    }

    currentStage = "scope selection";
    const selectedPackageIds =
      scope === "all"
        ? [...DEFAULT_ORDER]
        : DEFAULT_ORDER.includes(scope)
          ? [scope]
          : (() => {
              throw new Error(`Invalid --package value: ${scope}. Use all|core|react|vue`);
            })();

    const selectedPackages = selectedPackageIds.map((id) => PACKAGE_MAP[id]);

    currentStage = "version planning";
    const packageVersions = {};
    for (const pkg of selectedPackages) {
      const json = await readJson(pkg.packageJson);
      packageVersions[pkg.id] = json.version;
    }

    const releasePlan = [];
    for (const pkg of selectedPackages) {
      let bumpChoice = args.bump;
      if (!bumpChoice && !args.yes) {
        bumpChoice = await promptList(
          rl,
          `Bump for ${pkg.name} (current ${packageVersions[pkg.id]}):`,
          [
            { label: "patch", value: "patch" },
            { label: "minor", value: "minor" },
            { label: "major", value: "major" },
            { label: "custom version", value: "custom" },
          ],
          0,
        );
        if (bumpChoice === "custom") {
          bumpChoice = await rl.question("Enter custom version (x.y.z): ");
        }
      }

      bumpChoice ||= "patch";
      const nextVersion = bumpVersion(packageVersions[pkg.id], bumpChoice.trim());
      releasePlan.push({ pkg, from: packageVersions[pkg.id], to: nextVersion, bump: bumpChoice.trim() });
    }

    currentStage = "changelog input";
    const notes = args.yes
      ? { added: [], changed: [], fixed: [] }
      : await collectNotes(rl, args);

    let runLint = !args.skipLint;
    if (!args.skipLint && !args.yes) {
      runLint = await promptYesNo(rl, "Run lint before publish?", true);
    }

    console.log("\nRelease plan:");
    for (const item of releasePlan) {
      console.log(`- ${item.pkg.name}: ${item.from} -> ${item.to} (${item.bump})`);
    }
    console.log(`- Lint: ${runLint ? "yes" : "no"}`);
    console.log(`- Publish: ${args.dryRun ? "no (dry-run)" : "yes"}`);

    if (!args.yes) {
      const proceed = await promptYesNo(rl, "Proceed?", true);
      if (!proceed) {
        console.log("Aborted.");
        return;
      }
    }

    currentStage = "build";
    run("pnpm", ["build"]);
    if (runLint) {
      currentStage = "lint";
      run("pnpm", ["lint"]);
    }

    currentStage = "package checks (npm pack)";
    for (const item of releasePlan) {
      const packageDir = path.join(repoRoot, item.pkg.dir);
      const packOutput = runCapture("npm", ["pack"], { cwd: packageDir });
      const tarballName = parsePackedFilename(packOutput, item.pkg.name);
      console.log(`Validated pack output for ${item.pkg.name}: ${tarballName}`);

      await validateExportTargets(item.pkg, tarballName, packageDir);
      await validateStylesContract(item.pkg, tarballName, packageDir);

      await unlink(path.join(packageDir, tarballName));
    }

    if (!args.dryRun) {
      currentStage = "version updates";
      for (const item of releasePlan) {
        const json = await readJson(item.pkg.packageJson);
        json.version = item.to;
        await writeJson(item.pkg.packageJson, json);
      }

      currentStage = "changelog update";
      const affectedPackages = releasePlan.map((item) => `${item.pkg.name}@${item.to}`);
      const heading =
        releasePlan.length === 1
          ? `${releasePlan[0].pkg.name} ${releasePlan[0].to}`
          : "Multi-package release";
      const changelogEntry = buildChangelogEntry({ heading, affectedPackages, notes });
      await updateChangelog(changelogEntry);
    } else {
      const affectedPackages = releasePlan.map((item) => `${item.pkg.name}@${item.to}`);
      const heading =
        releasePlan.length === 1
          ? `${releasePlan[0].pkg.name} ${releasePlan[0].to}`
          : "Multi-package release";
      const changelogEntry = buildChangelogEntry({ heading, affectedPackages, notes });
      console.log("\n[Dry-run] Changelog preview:\n");
      console.log(changelogEntry);
    }

    if (!args.dryRun) {
      currentStage = "npm publish";
      for (const item of releasePlan) {
        run("npm", ["publish", "--access", "public"], { cwd: path.join(repoRoot, item.pkg.dir) });
      }
    }

    currentStage = "completed";
    printSuccessSummary({ dryRun: args.dryRun, releasePlan, runLint });
    console.log("\nRelease complete.");
    console.log("Suggested next steps:");
    console.log("- git status");
    console.log("- git add <updated files>");
    console.log('- git commit -m "chore: release packages"');
    console.log("- git tag <tag>");
    console.log("- git push && git push --tags");
  } catch (error) {
    error.stage = currentStage;
    throw error;
  } finally {
    rl.close();
  }
}

main().catch((error) => {
  const stage = error?.stage ?? "unknown";
  printFailureSummary(error, stage);
  process.exit(1);
});
