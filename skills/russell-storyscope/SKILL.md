---
name: russell-storyscope
description: "Knowledge base from \"StoryScope: Investigating idiosyncrasies in AI fiction\" by Russell et al. Use when applying StoryScope’s frameworks for AI fiction detection, narrative features, authorship attribution, originality/rarity proxies, studying the paper, or referencing its concepts."
---

<!-- argument-hint: [topic, framework name, or chapter number] -->

# StoryScope: Investigating idiosyncrasies in AI fiction
**Author**: Jenna Russell, Rishanth Rajendhran, Chau Minh Pham, Mohit Iyyer, John Wieting | **Pages**: ~30 | **Chapters**: 8 | **Generated**: 2026-09-25

## How to Use This Skill

- **Without arguments** — load core frameworks for reference
- **With a topic** — ask about `narrative features`, `fingerprints`, `rarity`, or another indexed topic; I find and read the relevant chapter
- **With chapter** — ask for `ch04`; I load that specific chapter
- **Browse** — ask "what chapters do you have?" to see the full index

When you ask about a topic not covered in Core Frameworks below, I will read
the relevant chapter file before answering.

---

## Core Frameworks & Mental Models

### Narrative features beat brittle style tells
Use **discourse-level narrative features** (agency, plot tidiness, revelation, temporality, intertextual strategy, reader address) when style detectors fail after paraphrase, model updates, or human-style fine-tuning. Prefer them because evasion requires **structural rewrites**, not surface polish. Stylistic signals still help; they are just more fleeting.

### StoryScope pipeline (operational toolkit)
1. **Template** each story into NarraBench-grounded JSON (10 dims: Agent, Social Network, Event, Plot, Structure, Setting, Time, Revelation, Perspective, Style).
2. **Compare** anonymized templates across sources on the **same prompt** (hold-out discovery pool).
3. **Discover** closed-form features (cat/ord/scale/binary/multi-select); dedupe; **assign** values corpus-wide; train interpretable classifiers.
Use templates as a **style firewall**. Blind source names. Split evaluation **by prompt**.

### Core vs Fingerprint
- **Core (30)**: Stable human↔AI separators that hold across all AI models—use for binary audits and explanations.
- **Fingerprint (75)**: Importance concentrated on one source—use for six-way attribution narratives (Claude restraint, GPT gossip, Gemini bleak tidy endings, DeepSeek front-loading, Kimi generic center).

### Binary detection defaults
Prefer this smell test:
- **AI**: thematic over-explanation, single-track causality, few subplots, protagonist/internal tidy resolutions, embodied emotion + setting-as-psyche, vague intertext, linear time.
- **Human**: named intertexts, chronological discontinuity/anachrony, moral ambivalence, fourth-wall/reader address, more locations & dialogue share, rarer/more dispersed vectors.

Headline: Narrative-only **93.2%** macro-F1; Core **84.8%**; Narrative+Style **96.0%**; after LAMP style edits still **~93.9%**.

### Attribution & convergence
Use narrative features for authorship ID expecting **AI↔AI confusion**: six-way Narrative **68.4%** F1 (chance 16.7%). Humans occupy a distinct region; mean human–AI centroid distance ≈ **1.6×** AI–AI. Prefer **Core+FP** when attribution matters.

### Rarity as originality proxy
Treat uncommon positions in narrative feature space as a **statistical proxy** for uniqueness/creative control discussions—not a legal test. Humans average higher rarity percentile (**0.71 vs 0.49**); often rarest of six mirrors per prompt (**57.8%**).

### Decision shortcuts
| Goal | Reach for |
|------|-----------|
| Explain human vs AI | Core checklist + Ch 4 |
| Max structure-only F1 | Narrative (257) |
| Which LLM? | Fingerprints / Core+FP / Ch 5 |
| Method design | Pipeline + blinding + prompt splits / Ch 2–3, Ch 8 |
| Durability claim | LAMP-style edit probe / Ch 4 |

### Anti-patterns
- Style-only creative-writing detectors as long-term strategy
- Story-level splits on parallel corpora
- Equating lexical novelty with narrative originality
- Unblinded LLM judges inventing features
- Overclaiming copyright conclusions from rarity scores

---

## Chapter Index

| # | Title | Key Frameworks |
|---|-------|----------------|
| [ch01](chapters/ch01-introduction.md) | Introduction | Narrative vs style; rarity-as-originality; StoryScope thesis |
| [ch02](chapters/ch02-storyscope-pipeline.md) | The StoryScope pipeline | Templates; compare; discover; core/fingerprint roles |
| [ch03](chapters/ch03-experiments.md) | Experiments | Prompt splits; Narrative/Style ablations; baselines |
| [ch04](chapters/ch04-detecting-ai-narrative-features.md) | Detecting AI from narrative features | Core themes; binary results; LAMP robustness |
| [ch05](chapters/ch05-source-fingerprints.md) | Pinpointing each source’s writing style | Attribution; convergence; model fingerprints; rarity |
| [ch06](chapters/ch06-related-work.md) | Related work | AI slop detection; creativity; narratology |
| [ch07](chapters/ch07-conclusion.md) | Conclusion | Durable structural authorship signals |
| [ch08](chapters/ch08-pipeline-details-core-features.md) | Pipeline details & core catalog | Blinding; validation; Table 14–16 gaps |

## Topic Index

- **Agency / resolution** → ch02, ch04, ch08
- **AI convergence / centroids** → ch05
- **Attribution (six-way)** → ch03, ch05
- **Blinding / anonymization** → ch02, ch08
- **Books3 / ethics** → ch02, ch07
- **Core features** → ch02, ch04, ch08
- **Edit robustness / LAMP** → ch04
- **Fingerprints (Claude/GPT/Gemini/DeepSeek/Kimi)** → ch05, ch08
- **Intertextuality / fourth wall** → ch04, ch08
- **NarraBench dimensions** → ch01, ch02
- **Narrative vs style features** → ch01, ch03, ch08
- **Originality / rarity** → ch01, ch05
- **Parallel corpus / mirrors** → ch02
- **Prompt-level splits** → ch03
- **SHAP / XGBoost** → ch02, ch03
- **StoryScope pipeline** → ch02, ch08
- **Temporal discontinuity / anachrony** → ch04, ch08
- **Thematic explicitness** → ch04, ch08
- **Templates** → ch02, ch08

## Supporting Files

- [glossary.md](glossary.md) — all key terms with definitions
- [patterns.md](patterns.md) — all techniques and design patterns
- [cheatsheet.md](cheatsheet.md) — quick reference tables and decision guides

---

## Scope & Limits

This skill covers the paper content only (arXiv:2604.03136). For hands-on implementation, combine with the authors’ release at https://github.com/jenna-russell/storyscope and project-specific tools. Narrative rarity is not legal advice on copyright or authorship.
