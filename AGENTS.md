# e-skills

Repo privado de skills + catálogo en https://skills.eleoromario.dev.

## Convenciones

- Cada skill vive en `skills/<id>/SKILL.md` (compatible con `npx skills`).
- Tras crear o editar skills, ejecutar `npm run sync` para regenerar `manifest.json`.
- La web (`catalog/`) es estática (Astro); no añadir backend ni auth en v1.
- No publicar skills de terceros ni las de Omarchy del sistema.
- El repo es **privado**: la web es pública, pero `npx skills add` solo funciona para quien tenga acceso GitHub al repo.

## Stack

- Skills: markdown + frontmatter
- Catálogo: Astro SSG
- Hosting: Vercel → skills.eleoromario.dev
