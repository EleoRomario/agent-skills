---
name: storyscope-ai-audit
description: >-
  Audits fiction or narrative prose for AI-likeness using StoryScope discourse-level
  narrative signals (thematic explicitness, causal tidiness, temporality, agency,
  intertext, reader address)—not brittle style tells like em-dashes. Use when the user
  asks if a text is AI-written, wants an AI vs human narrative score, StoryScope audit,
  detector narrativo, or to evaluate how AI-like a story/essay is.
---

<!-- argument-hint: [pegar texto | ruta de archivo | "compara A vs B"] -->

# StoryScope AI Narrative Audit

Evalúa textos con las señales **narrativas** del paper *StoryScope* (Russell et al., arXiv:2604.03136).  
No es un detector forense ni prueba legal. Es una **auditoría explicable** orientada a ficción/prosa narrativa (~idealmente >1.5k palabras; con textos cortos baja la confianza).

Para profundidad teórica del paper, carga también `russell-storyscope`.

## Cuándo aplicar

- “¿Este texto es de IA?”
- “Puntúa qué tan AI-like es”
- Auditoría editorial / originalidad narrativa
- Comparar dos versiones (humana vs modelo, o borrador vs editado)

## Qué NO hacer

- No bases el veredicto en em-dashes, “delve”, “tapestry”, ritmo de frases o vocabulario genérico (señales de estilo frágiles).
- No digas “es IA al 100%” ni “humano certificado”.
- No uses esto como prueba de copyright o autoría legal.
- Si el texto no es narrativo (código, JSON, lista técnica), dilo y limita el alcance o rechaza el audit.

## Flujo (obligatorio)

1. **Leer el texto completo** (o archivo indicado). Si supera ~8k palabras, muestrear inicio + 2–3 secciones medias + cierre, y anotar que el scoring es por muestra.
2. **Clasificar género**: ficción / no ficción narrativa / otro. Ajustar confianza.
3. **Puntuar las 10 dimensiones** de [rubric.md](rubric.md) en escala **1–5** (1 = humano-típico, 5 = IA-típico según StoryScope).
4. **Calcular score**:
   - `AI_likeness = media aritmética de las 10 dimensiones` (1.0–5.0)
   - `AI_pct = (AI_likeness - 1) / 4 * 100` (0–100%)
5. **Emitir el informe** con la plantilla de abajo.
6. **Citar evidencia**: 1–2 citas cortas o paráfrasis por dimensión crítica (no pegues párrafos largos del texto).

### Bandas de interpretación

| AI_likeness | Lectura |
|-------------|---------|
| 1.0–2.2 | Predominio de patrones humanos (StoryScope) |
| 2.3–3.2 | Mixto / ambiguo |
| 3.3–4.2 | Predominio de patrones IA |
| 4.3–5.0 | Fuertemente alineado con defaults narrativos IA |

Confianza:
- **Alta**: ficción ≥ ~3k palabras, señales consistentes
- **Media**: 1–3k palabras o señales mixtas
- **Baja**: <1k palabras, no narrativo, o solo un eje extremo

## Plantilla de salida

```markdown
## Auditoría StoryScope (narrativa)

**Texto**: <título o “pegado” / ruta>
**Tipo**: <ficción | narrativa no ficción | otro>
**AI-likeness**: <X.X>/5  (~<NN>% hacia polos IA)
**Banda**: <humano-típico | mixto | predominio IA | fuerte IA>
**Confianza**: <alta | media | baja> — <motivo en 1 frase>

### Score por dimensión
| Dimensión | Score (1=humano … 5=IA) | Evidencia breve |
|-----------|-------------------------|-----------------|
| 1 Temática explícita / moralizante | | |
| 2 Unidad temática / subplots | | |
| 3 Agencia y resolución | | |
| 4 Cadena causal / tidy plot | | |
| 5 Temporalidad (lineal ↔ discontinua) | | |
| 6 Emoción (cuerpo/setting ↔ etiquetas/ambigüedad) | | |
| 7 Densidad sensorial / setting-espejo | | |
| 8 Intertextualidad | | |
| 9 Lectura / cuarta pared | | |
| 10 Ambigüedad moral del protagonista | | |

### Lectura global
<3–6 frases: qué empuja hacia IA, qué empuja hacia humano>

### Si quisieras “humanizar” (opcional)
- <2–4 cambios estructurales concretos, no de estilo cosmétique>

### Límites
Heurística StoryScope; no sustituye clasificador entrenado ni peritaje.
```

## Reglas de scoring rápidas

Ver detalle en [rubric.md](rubric.md). Resumen:

| # | Más humano (↓) | Más IA (↑) |
|---|----------------|------------|
| 1 | Tema implícito | Narrador explica la lección / moral |
| 2 | Subplots que dialogan o contrastan | Track único, “no subplots” |
| 3 | Destino externo / final ambiguo | Protagonista elige + aceptación interna limpia |
| 4 | Causas flojas, cabos sueltos | Cadena causal continua y ordenada |
| 5 | Saltos, flashbacks, revelación que relee el pasado | Cronología lineal clue→reveal |
| 6 | Etiquetas emocionales / ambigüedad | Emoción casi siempre corporal |
| 7 | Setting funcional, sensorial moderado | Setting psicológico + sensorial denso (olor, etc.) |
| 8 | Obras/autores nombrados | Solo ecos vagos |
| 9 | “Tú / querido lector”, meta | Nunca rompe la cuarta pared |
| 10 | Protagonista moralmente ambivalente | Polaridad moral clara |

Si una dimensión **no aplica** (p. ej. sin intertexto posible), marca `N/A` y exclúyela de la media (recalcula sobre N aplicables). Anótalo.

## Comparar dos textos

Evalúa A y B con la misma rúbrica. Tabla lado a lado + Δ AI_likeness. No declares ganador “más humano” sin mostrar dimensiones.

## Relación con el paper

- Señales = **core narrative features** (no estilo).
- En el paper, ~30 core features ~84.8% macro-F1; set narrativo completo ~93.2%. Esta skill es una **aproximación cualitativa** de esos ejes, no el clasificador XGBoost.
- Código/datos de autores: https://github.com/jenna-russell/storyscope
