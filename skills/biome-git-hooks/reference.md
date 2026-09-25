# biome-git-hooks — templates

Copy/adapt; prefer `biome.jsonc` (comments allowed).

## `biome.jsonc`

```jsonc
{
  "$schema": "https://biomejs.dev/schemas/2.3.10/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": true
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "asNeeded"
    }
  }
}
```

Update `$schema` version to match the installed `@biomejs/biome` major/minor when `biome init` prints a newer schema URL.

Ignore generated/noise via `.gitignore` (Biome `useIgnoreFile`) and optionally:

```jsonc
"files": {
  "ignoreUnknown": true,
  "includes": ["**", "!**/dist", "!**/node_modules", "!**/.git"]
}
```

(Exact `includes` / `ignore` keys follow the installed Biome major — prefer whatever `biome init` emits, then merge rules above.)

## `package.json` fragments

```json
{
  "scripts": {
    "prepare": "husky",
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "format": "biome format --write ."
  },
  "lint-staged": {
    "*.{js,ts,cjs,mjs,jsx,tsx,json,jsonc,css}": [
      "biome check --write --no-errors-on-unmatched --files-ignore-unknown=true"
    ]
  }
}
```

## `commitlint.config.js` (ESM)

```js
export default {
  extends: ['@commitlint/config-conventional'],
}
```

## `commitlint.config.cjs` (CJS)

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
}
```

## `.husky/pre-commit`

```sh
#!/usr/bin/env sh
pnpm exec lint-staged
```

## `.husky/commit-msg`

```sh
#!/usr/bin/env sh
pnpm exec commitlint --edit "$1"
```

Swap `pnpm exec` → `npx` / `yarn` / `bunx` to match the repo.

## Conventional commit cheat sheet (for agents writing commits)

```
feat:     new user-facing capability
fix:      bug fix
chore:    tooling, deps, hooks
docs:     documentation only
refactor: no behavior change
test:     tests only
perf:     performance
ci:       CI config
```

Format: `type(scope)?: subject` — subject lowercase, no trailing period, imperative.

## Migration from ESLint / Prettier

1. Install Biome + run `biome check --write` on a branch.
2. Remove `eslint*`, `prettier*`, related VS Code settings that force Prettier.
3. Delete unused ESLint/Prettier deps from `package.json`.
4. Keep TypeScript (`tsc`) as the typechecker — Biome does not replace `tsc`.

## Optional VS Code / Cursor workspace snippet

`.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports.biome": "explicit"
  },
  "[javascript]": { "editor.defaultFormatter": "biomejs.biome" },
  "[typescript]": { "editor.defaultFormatter": "biomejs.biome" },
  "[typescriptreact]": { "editor.defaultFormatter": "biomejs.biome" },
  "[json]": { "editor.defaultFormatter": "biomejs.biome" },
  "[jsonc]": { "editor.defaultFormatter": "biomejs.biome" }
}
```
