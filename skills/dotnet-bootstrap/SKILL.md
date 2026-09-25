---
name: dotnet-bootstrap
description: >
  Bootstraps a Cursor-ready .NET backend monolith project: creates .cursor/rules,
  sets architecture defaults, and points the agent to the curated .NET skills.
  Use when starting a new .NET backend project, scaffolding a monolith API,
  "nuevo proyecto .NET", "iniciar monolito", "bootstrap .NET", or setting up
  .cursor for an existing ASP.NET Core backend.
---

# Dotnet Bootstrap (Cursor)

Prepara un **monolito backend .NET** para trabajar bien en Cursor. No aplica a frontend.

## Cuándo

- Repo vacío o greenfield .NET
- “Nuevo proyecto .NET / monolito / API”
- Añadir `.cursor` a un backend existente

## Checklist

```
- [ ] Confirmar: backend .NET (no frontend)
- [ ] Preguntar nombre del proyecto y arquitectura si no está clara
- [ ] Crear .cursor/rules/project.mdc
- [ ] (Opcional) Crear AGENTS.md corto en la raíz
- [ ] Si greenfield: ofrecer scaffold con skill `dotnet-init` / `dotnet new`
```

## Preguntas (solo si faltan)

1. **Nombre** del solution/proyecto
2. **Arquitectura**: Clean Architecture (default) | Vertical Slice | DDD
3. **Auth**: JWT + Identity (default) | OIDC | ninguna aún
4. **DB**: PostgreSQL | SQL Server | SQLite | ninguna aún

## Crear `.cursor/rules/project.mdc`

Plantilla (rellenar placeholders):

```markdown
---
description: Convenciones de este monolito backend .NET
alwaysApply: true
---

# [ProjectName]

Monolito backend ASP.NET Core. Frontend vive en otro repo.

## Decisiones

- Arquitectura: [Clean Architecture | Vertical Slice | DDD]
- API: Minimal APIs
- Auth: [JWT + Identity | …]
- DB: [PostgreSQL | …] + EF Core
- Skills: authentication, clean-architecture, modern-csharp, ef-core,
  minimal-api, testing, dependency-injection, error-handling, security-scan

## Reglas locales

- No mezclar UI/frontend en este repo
- Policies de autorización sobre roles sueltos
- Secrets fuera del código
```

## Después del bootstrap

1. Si el usuario quiere código: cargar `dotnet-init` / `clean-architecture` / `authentication` según el caso
2. No instalar el kit completo; el núcleo ya está en `~/.cursor/skills/`
3. Responder en el idioma del usuario

## Anti-patrones

- No crear skills de frontend aquí
- No copiar las 47 skills del kit al proyecto
- No generar `CLAUDE.md` salvo que el usuario lo pida (este flujo es Cursor: `.cursor/rules`)
