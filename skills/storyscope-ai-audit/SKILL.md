---
name: storyscope-ai-audit
description: >-
  Audits academic research writing (theses, papers, proposals, Cap. I–III style
  sections) for AI-likeness using discourse-level structural signals inspired by
  StoryScope—argument tidiness, hortatory overclaim, missing tensions/limits,
  generic vs named citations, promotional vision vs measurable purpose—not brittle
  style tells. Use when evaluating if a tesis, paper, planteamiento, justificación,
  marco or academic chapter sounds AI-written, or to score AI-likeness of research prose.
---

<!-- argument-hint: [pegar texto | ruta PDF/MD | capítulo | "compara A vs B"] -->

# StoryScope AI Audit — Investigación académica

Evalúa **prosa de investigación profesional** (tesis de posgrado, papers, planes de transformación digital, planteamientos, justificaciones, marcos).

Inspirado en la idea de StoryScope (Russell et al., arXiv:2604.03136): priorizar **decisiones de discurso/estructura** difíciles de “maquillar”, no señales de estilo (em-dashes, “delve”, ritmo).  
La rúbrica de este skill está **adaptada al género académico**; no uses ejes de ficción (subplots, cuarta pared, emoción corporal, setting psicológico).

No es detector forense ni prueba de autoría legal.

## Cuándo aplicar

- ¿Este capítulo / paper / planteamiento suena a IA?
- Comparar borrador vs versión editada
- Revisión editorial antes de entregar tesis o artículo
- Auditar Cap. I (planteamiento), justificación, objetivos, marco, metodología narrativa

## Qué NO hacer

- No puntuar con criterios de novela/cuento.
- No bases el veredicto en em-dashes, listas de tres, formalidad genérica o vocabulario “IA”.
- No digas “es IA al 100%” / “humano certificado”.
- No uses el score como prueba de plagio o copyright.
- Si el input es código, tablas puras o solo bibliografía, limita el alcance.

## Flujo (obligatorio)

1. Leer el texto (o capítulo indicado). Si > ~8k palabras, muestrear inicio + secciones medias + cierre y declararlo.
2. Confirmar que es **prosa académica de investigación**. Si es ficción, avisar y redirigir a criterios literarios (skill `russell-storyscope`) o adaptar con advertencia.
3. Puntuar las **10 dimensiones** de [rubric.md](rubric.md) en **1–5** (1 = humano-académico típico / rigurosidad situada; 5 = default IA-académico / brochure).
4. Calcular:
   - `AI_likeness = media de dimensiones válidas` (1.0–5.0)
   - `AI_pct = (AI_likeness - 1) / 4 * 100`
5. Emitir el informe con la plantilla.
6. Evidencia: 1–2 anclas breves por dimensión crítica (sin pegar párrafos largos).

### Bandas

| AI_likeness | Lectura |
|-------------|---------|
| 1.0–2.2 | Predominio de prosa de investigación situada / tensionada |
| 2.3–3.2 | Mixto / ambiguo |
| 3.3–4.2 | Predominio de defaults “IA-académicos” |
| 4.3–5.0 | Fuertemente alineado a brochure / overclaim |

Confianza:
- **Alta**: sección ≥ ~2k palabras, un género claro (planteamiento, marco, etc.)
- **Media**: 800–2k palabras o señales mixtas
- **Baja**: <800 palabras, solo bullets, o mezcla caótica de géneros

## Plantilla de salida

```markdown
## Auditoría StoryScope (investigación académica)

**Texto**: <título / archivo / capítulo>
**Tipo**: <planteamiento | justificación | objetivos | marco | metodología | paper | mixto>
**AI-likeness**: <X.X>/5  (~<NN>% hacia polos IA-académicos)
**Banda**: <situada | mixto | predominio IA-académico | fuerte brochure>
**Confianza**: <alta | media | baja> — <1 frase>

### Score por dimensión
| Dimensión | Score (1=situado … 5=IA-académico) | Evidencia breve |
|-----------|-------------------------------------|-----------------|
| 1 Overclaim hortatorio / moralina | | |
| 2 Monorriel argumental vs tensiones | | |
| 3 Cierre teleológico del problema | | |
| 4 Cadena causal demasiado limpia | | |
| 5 Propósito-promesa vs propósito-medible | | |
| 6 Hedging y límites metodológicos | | |
| 7 Anclaje local / datos situados | | |
| 8 Intertexto nombrado vs ecos genéricos | | |
| 9 Homogeneidad de voz / plantilla | | |
| 10 Trade-offs y riesgos omitidos | | |

### Lectura global
<3–6 frases>

### Si quisieras “humanizar” (estructura académica)
- <2–4 cambios estructurales concretos>

### Comparación (si hay versión previa)
| Versión | AI-likeness | Banda |
|---------|-------------|-------|

### Límites
Heurística estructural adaptada de StoryScope al género académico; no es el clasificador del paper ni peritaje.
```

## Mapa rápido (1 = mejor rigor situado, 5 = más “IA brochure”)

| # | Más situado (↓) | Más IA-académico (↑) |
|---|-----------------|----------------------|
| 1 | Afirma con mesura | Sermón de inclusión/innovación/justicia |
| 2 | Varias líneas que pueden conflictuar | Todo empuja a la misma tesis-solución |
| 3 | Problema queda parcialmente abierto | La solución “cierra” el drama social |
| 4 | Condiciones, excepciones, contraejemplos | Problema→síntoma→solución sin fricción |
| 5 | Objetivos medibles y acotados | Escena visionaria (entrevista perfecta, etc.) |
| 6 | Hedging, limitaciones explícitas | Certeza absoluta, cero fricción |
| 7 | Lugar, muestra, dialecto, cifras locales | “A nivel global / la sociedad” genérico |
| 8 | Autores, años, venues nombrados | “Estudios demuestran” sin ancla |
| 9 | Irregularidad útil, matices | Párrafos plantilla intercambiables |
| 10 | Riesgos, fallos, costos ocultos | Solo beneficios y RSE |

Si una dimensión no aplica (p. ej. sección solo de ecuaciones), `N/A` y excluir de la media.

## Relación con StoryScope (paper)

El paper midió ficción. Este skill **reutiliza la lógica** (estructura > estilo; over-determinación; tidy plot; rareza/diversidad argumental) y la traduce a convenciones de investigación. Para el paper original: `russell-storyscope`.
