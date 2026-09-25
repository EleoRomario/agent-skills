#!/usr/bin/env node
/**
 * Scans skills/<name>/SKILL.md and writes manifest.json for the catalog site.
 */
import { readdir, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_DIR = join(ROOT, "skills");
const OUT = join(ROOT, "manifest.json");
const CATALOG_DATA = join(ROOT, "catalog", "src", "data", "manifest.json");

const OWNER = "eleoromario";
const REPO = "agent-skills";

const CATEGORY_META = {
  // accent = fill/border; accentInk = texto legible sobre fondo claro
  dotnet: {
    label: ".NET",
    slug: "DOTNET",
    accent: "#AFC9BF",
    accentInk: "#3d5c52",
    badge: "C#",
  },
  architecture: {
    label: "Arquitectura",
    slug: "ARCHITECTURE",
    accent: "#7E9595",
    accentInk: "#3f5252",
    badge: "ARCH",
  },
  design: {
    label: "Diseño",
    slug: "DESIGN",
    accent: "#F7D0AB",
    accentInk: "#8a5a28",
    badge: "UI",
  },
  narrative: {
    label: "Narrativa",
    slug: "NARRATIVE",
    accent: "#EEB2A9",
    accentInk: "#8f4f47",
    badge: "MD",
  },
  tooling: {
    label: "Tooling",
    slug: "TOOLING",
    accent: "#D1DCDC",
    accentInk: "#456060",
    badge: "JS",
  },
  general: {
    label: "General",
    slug: "GENERAL",
    accent: "#AFC9BF",
    accentInk: "#3d5c52",
    badge: "SK",
  },
};

/** Pastel palette for skill cards (site chrome stays Reading Nook) */
const CARD_PALETTE = [
  { name: "Blush Petal", accent: "#F7C6D9", accentInk: "#8f4568" },
  { name: "Peach Fuzz", accent: "#F9D2B3", accentInk: "#8f5a30" },
  { name: "Buttercream Glow", accent: "#FBE9A5", accentInk: "#7a6818" },
  { name: "Mint Whip", accent: "#CFECCF", accentInk: "#3a6e45" },
  { name: "Sage Cloud", accent: "#D8E8D0", accentInk: "#4a6642" },
  { name: "Sky Whisper", accent: "#C9E4F6", accentInk: "#356484" },
  { name: "Powder Bluebell", accent: "#AECBEF", accentInk: "#3a5790" },
  { name: "Lilac Drift", accent: "#D8C8F2", accentInk: "#624a8f" },
  { name: "Lavender Frost", accent: "#E6DAF5", accentInk: "#655484" },
  { name: "Cotton Candy Mist", accent: "#F3CCE9", accentInk: "#844a76" },
];

/** Un pastel fijo por categoría (todas las skills del grupo = mismo color) */
const CATEGORY_PAINT = {
  dotnet: CARD_PALETTE[5], // Sky Whisper
  architecture: CARD_PALETTE[6], // Powder Bluebell
  design: CARD_PALETTE[1], // Peach Fuzz
  narrative: CARD_PALETTE[0], // Blush Petal
  tooling: CARD_PALETTE[3], // Mint Whip
  general: CARD_PALETTE[4], // Sage Cloud
};

function paintForCategory(categoryId) {
  return CATEGORY_PAINT[categoryId] || CATEGORY_PAINT.general;
}

const CATEGORY_RULES = [
  {
    id: "dotnet",
    test: (n, d) =>
      /\b(\.net|dotnet|asp\.net|ef core|c#|csharp|minimal.?api|xunit|identity)\b/i.test(
        `${n} ${d}`,
      ) ||
      /^(authentication|clean-architecture|dependency-injection|dotnet-|ef-core|error-handling|minimal-api|modern-csharp|security-scan|testing)$/.test(
        n,
      ),
  },
  {
    id: "architecture",
    test: (n, d) =>
      !/^(impeccable)$/.test(n) &&
      /clean.?architecture|hexagonal|domain-driven|\bddd\b|architecture-patterns|backend architecture/i.test(
        `${n} ${d}`,
      ),
  },
  {
    id: "design",
    test: (n) => /^(impeccable)$/.test(n),
  },
  {
    id: "narrative",
    test: (n, d) => /storyscope|narrative|fiction|prose/i.test(`${n} ${d}`),
  },
  {
    id: "tooling",
    test: (n, d) =>
      /biome|git.?hook|lint|find-docs|context7/i.test(`${n} ${d}`) ||
      /^(biome-git-hooks|find-docs)$/.test(n),
  },
];

function titleCase(id) {
  return id
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function extractSnippet(body, langHint = "text") {
  const match = body.match(/```(\w+)?\n([\s\S]*?)```/);
  if (match) {
    const lang = (match[1] || langHint).toLowerCase();
    const lines = match[2]
      .split(/\r?\n/)
      .map((l) => l.trimEnd())
      .filter((l) => l.length > 0)
      .slice(0, 4);
    if (lines.length) return { lang, lines };
  }
  // fallback install-style snippet
  return {
    lang: "bash",
    lines: [
      "npx skills add \\",
      `  eleoromario/agent-skills@…`,
      "  -g -y",
    ],
  };
}

function highlightLines(lines, lang, accent) {
  // Return simple HTML-friendly tokens as plain lines; UI highlights keywords
  return lines.map((line) => line.slice(0, 56));
}
function parseFrontmatter(raw) {
  if (!raw.startsWith("---\n") && !raw.startsWith("---\r\n")) {
    return { data: {}, body: raw };
  }
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: raw };
  const yaml = raw.slice(raw.indexOf("\n") + 1, end);
  const body = raw.slice(end + 4).replace(/^\r?\n/, "");
  const data = {};
  const lines = yaml.split(/\r?\n/).map((l) => l.replace(/\r$/, ""));
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) {
      i++;
      continue;
    }
    const key = m[1];
    let value = m[2];

    // Folded / literal block scalars: >, >-, |, |-
    if (/^[>|][-+]?$/.test(value)) {
      const block = [];
      i++;
      while (i < lines.length && (/^\s+/.test(lines[i]) || lines[i] === "")) {
        block.push(lines[i].replace(/^\s{2}/, ""));
        i++;
      }
      data[key] = block.join(" ").replace(/\s+/g, " ").trim();
      continue;
    }

    // Quoted scalar — strip outer quotes and unescape \"
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'");
    }
    data[key] = value.trim();
    i++;
  }

  return { data, body };
}

function inferCategories(name, description) {
  const cats = CATEGORY_RULES.filter((r) => r.test(name, description)).map(
    (r) => r.id,
  );
  return cats.length ? [...new Set(cats)] : ["general"];
}

function excerpt(body, max = 180) {
  const text = body
    .replace(/^#+\s.*$/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`#>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

async function main() {
  const entries = await readdir(SKILLS_DIR);
  const skills = [];

  for (const name of entries.sort()) {
    const skillMd = join(SKILLS_DIR, name, "SKILL.md");
    try {
      await stat(skillMd);
    } catch {
      continue;
    }
    const raw = await readFile(skillMd, "utf8");
    const { data, body } = parseFrontmatter(raw);
    const description = (data.description || "").replace(/\s+/g, " ").trim();
    const categories = inferCategories(name, description);
    const primary = categories[0] || "general";
    const meta = CATEGORY_META[primary] || CATEGORY_META.general;
    const paint = paintForCategory(primary);
    const files = await readdir(join(SKILLS_DIR, name));
    const snippet = extractSnippet(body, meta.badge === "C#" ? "csharp" : "bash");

    skills.push({
      id: name,
      name: data.name || name,
      title: titleCase(data.name || name),
      description,
      excerpt: excerpt(body) || description.slice(0, 180),
      categories,
      primary,
      categorySlug: meta.slug,
      accent: paint.accent,
      accentInk: paint.accentInk,
      palette: paint.name,
      badge: meta.badge,
      snippet: {
        lang: snippet.lang,
        lines: highlightLines(snippet.lines, snippet.lang, paint.accent),
      },
      install: `npx skills add ${OWNER}/${REPO}@${name} -g -y`,
      path: `skills/${name}`,
      hasExtras: files.some((f) => f !== "SKILL.md"),
    });
  }

  const used = new Set(skills.flatMap((s) => s.categories));
  const categories = Object.entries(CATEGORY_META)
    .filter(([id]) => used.has(id))
    .map(([id, meta]) => {
      const paint = paintForCategory(id);
      return {
        id,
        label: meta.label,
        slug: meta.slug,
        accent: paint.accent,
        accentInk: paint.accentInk,
      };
    });

  const manifest = {
    generatedAt: new Date().toISOString(),
    owner: OWNER,
    repo: REPO,
    package: `${OWNER}/${REPO}`,
    site: "https://skills.eleoromario.dev",
    installAll: `npx skills add ${OWNER}/${REPO} -g -y`,
    palette: CARD_PALETTE,
    categories,
    skills,
  };

  const json = JSON.stringify(manifest, null, 2) + "\n";
  await writeFile(OUT, json);
  await mkdir(dirname(CATALOG_DATA), { recursive: true });
  await writeFile(CATALOG_DATA, json);
  console.log(`Wrote ${skills.length} skills → manifest.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
