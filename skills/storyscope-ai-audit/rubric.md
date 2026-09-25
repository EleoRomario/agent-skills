# Rúbrica — AI audit para investigación académica

Escala: **1 = prosa académica situada / tensionada**, **5 = default IA-académico (brochure, overclaim, monorriel)**.  
Enteros; medio punto solo entre anclas claras.

Inspiración StoryScope (estructura discursiva, no estilo), **redefinida para tesis/papers**.

---

## 1. Overclaim hortatorio / moralina

| Score | Criterio |
|------:|----------|
| 1 | Claims mesurados; el valor social no sermonea |
| 2 | Algún lenguaje valorativo controlado |
| 3 | Mixto: rigor + frases exhortativas |
| 4 | Inclusión/innovación/justicia se repiten como lección |
| 5 | Cierre tipo manifiesto (“nadie quede excluido… motor de una sociedad más justa”) |

**Ancla:** ¿El texto predica una moral en vez de argumentar un aporte investigable?

---

## 2. Monorriel argumental vs tensiones

| Score | Criterio |
|------:|----------|
| 1 | Varias líneas (p. ej. pedagógica / laboral / técnica) con prioridades distintas |
| 2 | Al menos un contraargumento o trade-off desarrollado |
| 3 | Un hilo dominante con digresiones menores |
| 4 | Casi todo empuja a la misma conclusión-solución |
| 5 | Monorriel total: cada párrafo refuerza el mismo pitch |

**Ancla:** ¿Pueden conflictuar lecturas del problema, o todo es un solo riel?

---

## 3. Cierre teleológico del problema

| Score | Criterio |
|------:|----------|
| 1 | El problema queda abierto; la solución es parcial |
| 2 | Se admite que otras intervenciones pueden ser mejores en X casos |
| 3 | Solución central con matices |
| 4 | La propuesta “resuelve” casi todo el drama planteado |
| 5 | Arco completo: exclusión → dispositivo → inclusión restaurada |

**Ancla:** ¿El artefacto cierra narrativamente el problema social?

---

## 4. Cadena causal demasiado limpia

| Score | Criterio |
|------:|----------|
| 1 | Condiciones, excepciones, mecanismos inciertos |
| 2 | Varios eslabones dudosos explicitados |
| 3 | Causalidad mayormente clara con algún hueco |
| 4 | Problema → síntomas → oportunidad → solución casi sin fricción |
| 5 | Cadena publicitaria sin mecanismos falsables |

**Ancla:** ¿Hay fricción causal o solo escalera hacia el prototipo?

---

## 5. Propósito-promesa vs propósito-medible

| Score | Criterio |
|------:|----------|
| 1 | Propósito = diseñar/validar con alcance, métricas e hipótesis implícitas |
| 2 | Escenarios de uso como *casos de prueba*, no promesas |
| 3 | Mixto visión + objetivos |
| 4 | Escenas aspiracionales dominan (entrevista perfecta, “voz clara”, etc.) |
| 5 | Propósito = promesa de experiencia fluida / transformación cultural |

**Ancla:** ¿Se puede evaluar el éxito con criterios de investigación?

---

## 6. Hedging y límites metodológicos

| Score | Criterio |
|------:|----------|
| 1 | Hedging frecuente; limitaciones operativas y de validez |
| 2 | Límites claros en alcance geográfico, muestra, léxico, red, etc. |
| 3 | Algo de hedging sin sistematizar |
| 4 | Certeza alta; límites apenas ceremoniales |
| 5 | Cero fricción: “intuitivo”, “inmediato”, “sin barreras” |

**Ancla:** ¿Dónde puede fallar el claim?

---

## 7. Anclaje local / datos situados

| Score | Criterio |
|------:|----------|
| 1 | Lugar, población, dialecto/LSP, instituciones o cifras concretas |
| 2 | Anclaje local + comparación internacional cuidadosa |
| 3 | Local nombrado pero genérico |
| 4 | “Latinoamérica / la sociedad” sin grano fino |
| 5 | Solo panorama global abstracto |

**Ancla:** ¿Se nota el sitio y el caso, o podría ser cualquier ciudad?

---

## 8. Intertexto nombrado vs ecos genéricos

| Score | Criterio |
|------:|----------|
| 1 | Autores, años, venues o normas nombradas y usadas |
| 2 | Mix de citas densas + síntesis |
| 3 | Algunas citas + frases “la literatura indica” |
| 4 | Mayoría de ecos (“estudios demuestran”) |
| 5 | Autoridad fantasma sin anclas bibliográficas |

*En sección sin expectativa de citas (p. ej. solo objetivos formales), valora según lo esperable o marca N/A.*

---

## 9. Homogeneidad de voz / plantilla

| Score | Criterio |
|------:|----------|
| 1 | Variación útil de densidad, énfasis y estructura entre subsecciones |
| 2 | Alguna irregularidad de autor (sin caos) |
| 3 | Bastante uniforme pero con matices |
| 4 | Párrafos intercambiables tipo plantilla de posgrado |
| 5 | Misma cadencia exhortativa en todo el capítulo |

**Ancla:** ¿Podrías reordenar párrafos sin que nadie note el cambio de sección?

---

## 10. Trade-offs y riesgos omitidos

| Score | Criterio |
|------:|----------|
| 1 | Riesgos, costos ocultos, falsos positivos, privacidad, dependencia del dispositivo |
| 2 | Al menos un trade-off serio discutido |
| 3 | Riesgos mencionados de paso |
| 4 | Solo beneficios + RSE / imagen institucional |
| 5 | Tecnología como bien puro sin reverso |

**Ancla:** ¿Qué puede salir mal si el piloto “funciona”?

---

## Agregación

```
válidas = dimensiones con score ≠ N/A
AI_likeness = mean(válidas)                 # 1..5
AI_pct = (AI_likeness - 1) / 4 * 100       # 0..100
```

## Señales fuera de alcance (ignorar)

Em-dashes, “delve/tapestry”, perfect grammar, listas de tres ítems, tono formal genérico, presencia de IA como *tema* del trabajo.
