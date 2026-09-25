---
name: biome-git-hooks
description: >-
  Sets up Biome (lint+format), Husky, lint-staged, and commitlint (conventional
  commits) in any JS/TS project or monorepo package. Use when scaffolding a new
  frontend/Node app, adding git hooks, replacing ESLint/Prettier, or when the
  user mentions Biome, Husky, commitlint, lint-staged, pre-commit, or quality
  hooks.
---

# Biome + Husky + lint-staged + commitlint

Install this quality stack in the **package root that owns `package.json` and the git hooks** (usually repo root; in monorepos prefer the workspace root).

## Checklist

```
- [ ] 1. Detect package manager + existing tooling
- [ ] 2. Install deps (dev)
- [ ] 3. Biome init + config
- [ ] 4. package.json scripts + lint-staged
- [ ] 5. Husky prepare + hooks (pre-commit, commit-msg)
- [ ] 6. commitlint config
- [ ] 7. Verify (hooks fire; biome check)
```

## Step 1 — Detect

| Signal | Action |
|--------|--------|
| `pnpm-lock.yaml` | use `pnpm` |
| `yarn.lock` | use `yarn` |
| `bun.lock` / `bun.lockb` | use `bun` |
| else | use `npm` |
| `biome.json` / `biome.jsonc` | merge, do not overwrite blindly |
| `.husky/` | extend hooks, do not wipe custom hooks |
| ESLint / Prettier configs | migrate to Biome; remove after Biome works |
| No `package.json` | create minimal one only if user wants a JS root |

Must be a **git** repo for Husky. If not: `git init` only when the user agrees.

## Step 2 — Install

```bash
# pnpm example — swap for npm/yarn/bun
pnpm add -D @biomejs/biome husky lint-staged @commitlint/cli @commitlint/config-conventional
```

## Step 3 — Biome

```bash
pnpm exec biome init --jsonc
```

If `biome.jsonc` already exists, skip init. Prefer the template in [reference.md](reference.md).

Ensure `vcs.enabled` + `useIgnoreFile` so Biome respects `.gitignore`.

Add scripts:

```json
{
  "scripts": {
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "format": "biome format --write ."
  }
}
```

## Step 4 — lint-staged

In `package.json` (canonical — one write command):

```json
{
  "lint-staged": {
    "*.{js,ts,cjs,mjs,jsx,tsx,json,jsonc,css}": [
      "biome check --write --no-errors-on-unmatched --files-ignore-unknown=true"
    ]
  }
}
```

Do **not** stack multiple biome commands on the same pattern (Biome docs list alternatives, not a pipeline).

## Step 5 — Husky

```bash
pnpm exec husky init
```

Ensure `"prepare": "husky"` in `package.json` scripts.

**`.husky/pre-commit`**

```sh
pnpm exec lint-staged
```

(Use `npx lint-staged` / `yarn lint-staged` / `bunx lint-staged` to match the package manager.)

**`.husky/commit-msg`**

```sh
pnpm exec commitlint --edit "$1"
```

Make hooks executable (`chmod +x`).

## Step 6 — commitlint

Create `commitlint.config.js` (or `.cjs` / `.mjs` to match `"type"`):

```js
export default {
  extends: ["@commitlint/config-conventional"],
};
```

For `"type": "commonjs"` use `module.exports = { extends: ['@commitlint/config-conventional'] }`.

## Step 7 — Verify

1. `pnpm exec biome check .` (or fix with `--write`)
2. Stage a tiny change → `pnpm exec lint-staged`
3. `echo "bad message" | pnpm exec commitlint` → must fail
4. `echo "chore: test hooks" | pnpm exec commitlint` → must pass

## Hard rules

- Prefer **Biome only** for JS/TS/JSON/CSS lint+format; do not leave ESLint+Prettier fighting Biome.
- Hooks live at the **git root**; if the app is in `apps/web`, still configure Husky at the monorepo root and scope lint-staged globs if needed.
- Never commit secrets in hook scripts.
- Do not use `--no-verify` to “make it work”.
- After setup, remind: enable the **Biome** editor extension; disable Prettier/ESLint format-on-save for this repo.

## Monorepo note

- Install tooling once at the workspace root.
- Point Biome `files.includes` (or project layout) at packages; see [reference.md](reference.md).

## Templates

Canonical file contents: [reference.md](reference.md).
