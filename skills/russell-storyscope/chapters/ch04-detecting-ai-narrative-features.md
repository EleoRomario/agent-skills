# Chapter 4: Detecting AI from Narrative Features

## Core Idea
Narrative features alone detect human vs. AI fiction at **93.2% macro-F1** (~97% of Narrative+Style), and remain effective after span-level style rewriting (LAMP)—evidence that the human–AI boundary lives in structural storytelling defaults.

## Frameworks Introduced
- **Core narrative separation themes** (interpret the 30 core features as four AI defaults + human counters):
  1. **Thematic over-determination** — AI over-explains morals/themes
  2. **Structural streamlining** — tidy single-track causality, few subplots, protagonist-driven tidy resolutions
  3. **Sensory & embodied performativity** — body metaphors, smell, setting-as-psyche
  4. **Human counters** — intertextual naming, reader address/fourth wall, temporal complexity, moral ambivalence, location/dialogue diversity
  - When to use: Explaining a detection score or auditing a story’s “AI-likeness” without style cues.
  - How: Score the core axes; compare to corpus means (Table 16 gaps).
- **Style-orthogonal robustness test (LAMP)**: Rewrite AI prose artifacts; re-run narrative classifier.
  - When to use: Claiming durability vs. paraphrase/edit attacks on detectors.
  - How: Apply span rewrites; measure ΔF1 (here: 95.5% → 93.9% on Gemini, −1.6).

## Key Concepts
- **Macro-F1 / AUPRC**: Primary binary metrics.
- **LDA narrative projection**: Humans occupy a distinct region; AI models cluster (Claude most distinct among AIs).
- **Length-matched evaluation**: Narrative F1 unchanged after matching human lengths—not an artifact of verbosity.
- **Over-determination**: Spelling out meaning instead of trusting inference.

## Mental Models
- Prefer **“tidy, explicit, embodied, linear”** as the quick AI narrative smell test.
- Prefer **“messy time, named intertexts, ambivalent morals, reader co-presence”** as human tells.
- Use **Core Only (~85% F1)** when you need a short checklist; full Narrative when maximizing structure-only accuracy.

## Anti-patterns
- **Assuming style edits break narrative detectors**: On LAMP-edited Gemini stories, drop is tiny.
- **Reading high F1 as proof humans are “better writers”**: Result is distributional separation, not aesthetic ranking.
- **Ignoring that supervised text models still win raw F1**: Narrative’s value is interpretability + edit robustness.

## Worked Example
**Binary results (Table 2, approx.)**:
| Method | Size | macro-F1 | AP |
| Narrative | 257 | 93.2 | .959 |
| Core Only | 30 | 84.8 | .828 |
| Core+FP | 101 | 91.1 | .934 |
| Narr.+Style | 304 | 96.0 | .982 |
| Style Only | 39 | 85.8 | .867 |
| ModernBERT | — | 99.9 | 1.00 |
| Binoculars | — | 55.9 | .404 |
| LAMP-edited | — | 93.9 | .988 |

**Concrete contrast**: Human mystery may open at a funeral and spiral backward; AI often walks clue → reveal linearly. AI grief arcs often end with narrator stating the lesson (narratorial thematic commentary 77% vs 52%).

## Key Takeaways
1. Structure alone nearly matches structure+style for binary detection.
2. Thirty core features capture most of the boundary (~91% of Narrative F1).
3. AI defaults: explicit themes, tidy plots, embodied emotion, weak named intertext.
4. Human defaults: discontinuity, ambivalence, fourth-wall/reader address, richer location/dialogue mix.
5. Surface artifact scrubbing barely moves narrative detection—claim durability carefully but empirically.

## Connects To
- **Ch 5**: Attribution is harder because AI↔AI overlap.
- **Ch 1**: Motivates durability vs. fleeting style.
- **Appendix I**: Full core feature lists and mean gaps.
