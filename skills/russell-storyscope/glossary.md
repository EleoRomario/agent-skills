# Glossary — StoryScope

**Agency in Resolution** — Whether endings turn on protagonist choice, mixed causes, or external fate (Ch 2, Ch 4).

**AI convergence** — Tendency of multiple LLMs to occupy overlapping regions of narrative feature space, separated from humans (Ch 5).

**Anachrony Intensity** — How heavily the narrative relies on flashbacks/flash-forwards (Ch 4, Ch 8).

**Aspect-based application** — Assigning features one NarraBench dimension at a time for higher coverage (Ch 8).

**AUPRC / AP** — Area under precision–recall curve; primary binary ranking metric alongside macro-F1 (Ch 3–4).

**Binoculars** — Zero-shot AI-text detector used as a weak baseline on this fiction corpus (Ch 3–4).

**Blinding protocol** — Anonymizing source identities (and randomizing order) in LLM-facing prompts (Ch 2, Ch 8).

**Books3** — Source of human short stories; used academically only; human text not released (Ch 2, Ch 7).

**Chronological Discontinuity** — Frequency of time jumps away from linear order (Ch 2, Ch 4).

**Core features** — 30 stable, important narrative features for binary human-vs-AI, consistent across AI models (Ch 2–4, Ch 8).

**Core score** — Ranking = mean SHAP × stability × (1 + |human–AI gap|) (Ch 8).

**Depth of Recontextualization After Surprise** — How much a reveal forces reinterpretation of earlier scenes (Ch 2, Ch 4).

**Discovery pool** — Held-out 600 stories / 100 prompts used only for comparative analysis and feature proposal (Ch 2).

**Encoded vector x** — Model input after one-hot/multi-hot/numeric expansion of raw feature assignments (Ch 2–3).

**Feature assignment vector z** — Raw 304-dimensional narrative labels per story (Ch 2).

**Fingerprint features** — Features whose importance concentrates on one source class for attribution (Ch 2, Ch 5).

**Fourth-Wall Permeability** — Degree of breaking story-world / reader boundary (Ch 4, Ch 8).

**LAMP** — Span-level rewriting framework that removes AI prose artifacts; used to test edit robustness (Ch 4).

**Macro-F1** — Unweighted mean of per-class F1; primary classification metric (Ch 3–5).

**Mirrored stories** — Multi-source stories written from the same reverse-engineered prompt (Ch 2).

**NarraBench** — Taxonomy of narrative dimensions grounding StoryScope (10 of 12 aspects used) (Ch 1–2).

**Narrative features** — Discourse-level storytelling decisions (plot, agency, time, revelation…), not stylistic texture (Ch 1).

**Narrative (257) variant** — Strict non-style feature set after excluding 47 style/style-like features (Ch 3).

**Originality proxy (rarity)** — Statistical uncommonness in narrative feature space as stand-in for creative uniqueness (Ch 1, Ch 5).

**Parallel corpus** — Matched human + multi-LLM stories enabling controlled comparison (Ch 1–2).

**Prompt-level split** — Train/test partitioning by writing prompt to prevent leakage (Ch 3).

**Rarity (kNN)** — Mean distance to 25 nearest neighbors; higher = rarer narrative configuration (Ch 5).

**SHAP (bootstrap)** — Per-feature importance with B=50 prompt-resampled runs for stability (Ch 2).

**Source** — Uniform term for human or any LLM origin (Ch 2).

**StoryScope** — Pipeline: template → compare → discover features → assign → classify (Ch 1–2).

**Style features** — Sentence/phrase texture: diction, syntax, rhythm, figurative density, tonal register (Ch 3, Ch 8).

**Style boundary rule** — Texture-only answers ⇒ style; content/structure answers ⇒ non-style (Ch 8).

**Template (structured representation)** — JSON fields along NarraBench dimensions abstracting away surface wording (Ch 2).

**Thematic Explicitness and Moralizing** — How openly the story articulates themes/morals (Ch 2, Ch 4).

**XGBoost** — Gradient-boosted trees used for detection/attribution with SHAP interpretability (Ch 2–3).
