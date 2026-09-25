# Rúbrica StoryScope — AI Narrative Audit

Escala por dimensión: **1 = patrón humano-típico**, **5 = patrón IA-típico** (según hallazgos StoryScope).  
Usa enteros; medio punto solo si estás entre dos anclas claras.

---

## 1. Temática explícita / moralizante (SIT)

| Score | Criterio |
|------:|----------|
| 1 | El tema se infiere; casi nunca se formula |
| 2 | Algún comentario temático ligero, sin lección |
| 3 | Temas visibles pero no sermoneados |
| 4 | Narrador o diálogo filosofan la moraleja a menudo |
| 5 | Cierre o arco con **lección explícita**; moral muy articulado |

**Pregunta ancla:** ¿El texto articula sus temas/morales de forma explícita?

---

## 2. Unidad temática / subplots (PLT)

| Score | Criterio |
|------:|----------|
| 1 | Varios subplots que contrastan o enriquecen el tema |
| 2 | Subplots temáticamente paralelos claros |
| 3 | Un subplot menor o digresiones controladas |
| 4 | Casi un solo hilo; digresiones solo decorativas |
| 5 | Track único; “todo sirve al mismo punto” sin ramas |

**Pregunta ancla:** ¿Hay subplots reales o solo una trama cerrada?

---

## 3. Agencia y resolución (PLT / EVT)

| Score | Criterio |
|------:|----------|
| 1 | Cierre por azar externo / destino / sin resolución |
| 2 | Mixto; mucha ambigüedad de quién decide |
| 3 | Agencia compartida; final algo abierto |
| 4 | Protagonista resuelve en gran medida |
| 5 | Resolución por **elección del protagonista** + **aceptación/entendimiento interno** limpio |

**Pregunta ancla:** ¿El final lo mueve la voluntad del protagonista o fuerzas externas/ambigüedad?

---

## 4. Cadena causal / tidy plot (EVT)

| Score | Criterio |
|------:|----------|
| 1 | Cabos sueltos, causas opacas, desorden productivo |
| 2 | Varias rupturas causales o elipsis fuertes |
| 3 | Mayormente causal con algún salto |
| 4 | Cadena clara con pocos flecos |
| 5 | Continuidad causal alta: incidente → consecuencias → cierre ordenado |

**Pregunta ancla:** ¿Qué tan continua y “limpia” es la cadena del conflicto?

---

## 5. Temporalidad (TMP / REV)

| Score | Criterio |
|------:|----------|
| 1 | Anacronía dominante; revelaciones que reescriben lo leído |
| 2 | Flashbacks/forwards frecuentes y estructurales |
| 3 | Algún salto temporal significativo |
| 4 | Casi lineal con un flashback ornamental |
| 5 | Lineal estricto (p. ej. misterio del primer clue al gran reveal) |

**Pregunta ancla:** ¿El tiempo salta y recontextualiza, o avanza en línea?

---

## 6. Expresión emocional (AGENT)

| Score | Criterio |
|------:|----------|
| 1 | Emociones nombradas / ambiguas / conductuales sin somaticismo |
| 2 | Mezcla; etiquetas frecuentes |
| 3 | Equilibrio cuerpo / etiqueta |
| 4 | Predomina lo corporal (garganta, pecho, sudor…) |
| 5 | Emoción casi siempre vía **metáfora corporal**; casi nunca “tuvo miedo” |

*Nota StoryScope: IA eleva “embodied”; humanos usan más etiquetas explícitas.*

---

## 7. Sensorialidad y setting como espejo (SET)

| Score | Criterio |
|------:|----------|
| 1 | Setting utilitario; sensorial mínimo |
| 2 | Algo de atmósfera sin psicologizar el espacio |
| 3 | Sensorial moderado; espejo psicológico puntual |
| 4 | Ambiente refleja estados internos a menudo; sensorial rico |
| 5 | Setting-espejo sistemático + densidad sensorial alta (p. ej. olfato frecuente) |

---

## 8. Intertextualidad (SIT)

| Score | Criterio |
|------:|----------|
| 1 | Referencias **nombradas** a obras/autores/marcas/lugares reales |
| 2 | Mix equilibrado nombre + eco |
| 3 | Algunas alusiones sin anclar |
| 4 | Casi solo ecos difusos |
| 5 | Ninguna ancla externa concreta; atmósfera “literaria genérica” |

*Si el género no permite intertexto (p. ej. informe técnico), marca N/A.*

---

## 9. Lectura / cuarta pared (PER / SIT)

| Score | Criterio |
|------:|----------|
| 1 | Dirige al lector de forma estructural (“tú”, “querido lector”) |
| 2 | Apartes frecuentes al lector |
| 3 | Algún guiño metatextual |
| 4 | Casi nunca rompe la cuarta pared |
| 5 | Narración sellada: nadie “mira” al lector |

---

## 10. Polaridad moral del protagonista (PLT)

| Score | Criterio |
|------:|----------|
| 1 | Claramente ambivalente / mixto en sus elecciones |
| 2 | Ambivalencia dominante con momentos claros |
| 3 | Moralidad mixta sin énfasis |
| 4 | Mayormente héroe o villano legible |
| 5 | Polaridad moral **clara** (positivo o negativo sin fricción)

---

## Agregación

```
dimensiones_válidas = {i | score_i ≠ N/A}
AI_likeness = mean(scores válidos)          # 1..5
AI_pct = (AI_likeness - 1) / 4 * 100        # 0..100
```

## Señales a ignorar en este audit

Em-dashes, palabras “IA” de moda, formalidad genérica, listas con tres ítems, ritmo de frase — **fuera de alcance** salvo que el usuario pida explícitamente un pase de estilo aparte.
