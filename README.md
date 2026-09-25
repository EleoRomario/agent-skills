# e-skills

Catálogo público de **agent skills** para Cursor y Claude Code.

- **Web:** https://skills.eleoromario.dev  
- **Paquete:** `eleoromario/agent-skills`  
- **Instalación:** `npx skills`

## Instalar

Cualquiera con el link puede instalar (repo público):

```bash
npx skills add eleoromario/agent-skills@authentication -g -y
```

Instalar todas:

```bash
npx skills add eleoromario/agent-skills -g -y
```

Solo algunas (desde la web, selección múltiple):

```bash
npx skills add eleoromario/agent-skills -s authentication,ef-core -g -y
```

Listar sin instalar:

```bash
npx skills add eleoromario/agent-skills -l
```

## Estructura

```
skills/           # fuente canónica (una carpeta por skill)
catalog/          # web Astro (SSG) → skills.eleoromario.dev
scripts/          # sync-manifest.mjs
manifest.json     # índice generado
```

## Desarrollo local

```bash
npm run sync      # regenera manifest.json
npm run dev       # catálogo en http://localhost:4321
npm run build     # build estático en catalog/dist
```

## Añadir una skill

1. Crea `skills/<nombre>/SKILL.md` con frontmatter `name` + `description`.
2. Corre `npm run sync`.
3. Commit y push → Vercel redespliega la web.

## Deploy (Vercel)

1. Importa el repo `eleoromario/agent-skills` en Vercel.
2. Root Directory: `.` (usa `vercel.json`).
3. Dominio custom: `skills.eleoromario.dev`.
