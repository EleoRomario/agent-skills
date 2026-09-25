# Chapter 2: The StoryScope Pipeline

## Core Idea
StoryScope turns long fiction into comparable narrative decisions via three stages—**structured templates**, **cross-source comparison**, and **feature discovery**—so downstream models reason over discourse structure rather than prose texture.

## Frameworks Introduced
- **Three-stage StoryScope pipeline**:
  1. Structured intermediate representations (per story)
  2. Comparative analysis across sources (same prompt)
  3. Discourse-level feature discovery + corpus-wide assignment
  - When to use: Scaling narrative annotation beyond manual coding.
  - How: LLM extract JSON templates along NarraBench dimensions → hold-out discovery pool → propose closed-form features → assign values to all stories.
- **NarraBench grounding (10 of 12 aspects)**: Agent, Social Network, Event, Plot, Structure, Setting, Time, Revelation, Perspective, Style. Exclude Paratext and Motivation (need external context).
  - When to use: Ensuring features map to established narratology, not ad-hoc vibes.
  - How: One expert discovery prompt per dimension; constrain response types.
- **Core vs. Fingerprint roles** (via XGBoost + bootstrap SHAP):
  - **Core**: Stable, important for binary human-vs-AI; consistent across all five AI models; signed human- or AI-leaning.
  - **Fingerprint**: SHAP mass concentrated on one source; values visibly differ.
  - When to use: Interpreting *why* a classifier separates classes.
  - How: B=50 bootstrap SHAP with prompt-level resampling; apply role criteria (§D).

## Key Concepts
- **Source**: Any origin (human or a named LLM) treated uniformly.
- **Mirrored AI stories**: Prompts reverse-engineered from human stories; each LLM regenerates.
- **Template**: Controlled intermediate representation stripping surface wording.
- **Discovery pool**: 600 stories / 100 prompts held out; used only for comparison + feature proposal.
- **Response types**: Categorical, ordinal, scale, binary, multi-select (supports interpretable encoding).
- **Encoded vector x**: One-hot / multi-hot / numeric expansion of raw assignment vector z (d=304).

## Mental Models
- Use **templates as a style firewall**: force comparison on narrative fields, not diction.
- Think of **discovery as compress-then-formalize**: ~2.7M tokens of raw text → ~686K tokens of comparative notes before inventing features.
- Prefer **closed-form questions with discrete answers** so features stay auditable and modelable.

## Anti-patterns
- **Discovering features on the same data used for evaluation**: Leakage of prompt-level patterns.
- **Leaving source names unblinded in LLM prompts**: Induces stereotype-driven “features.”
- **Letting discovery invent free-text axes**: Breaks encoding and SHAP interpretability.
- **Skipping deduplication**: Inflates correlated feature counts (408 → 304 after clustering at cosine 0.85).

## Worked Example
**Data construction**: 10,272 human shorts from Books3 → Gemini 2.5 Flash reverse-engineers writing prompts → five LLMs (Claude Sonnet 4.6, GPT-5.4, Gemini 3 Flash, DeepSeek V3.2, Kimi K2.5) each write a mirror → 61,608 stories (~4,753 words mean).

**Example core contrasts (Table 1)**:
- AI-leaning: Thematic Explicitness (1–5); Agency in Resolution → protagonist_choice; Narratorial Thematic Commentary → yes.
- Human-leaning: Intertextual Strategy → explicit named; Depth of Recontextualization After Surprise; Degree of Chronological Discontinuity.

**Assignment**: Gemini 3 Flash labels all 304 features per story (α≈0.90 repeatability; mean human–model κ≈0.84 on validated items).

## Key Takeaways
1. Parallel prompts + anonymized sources make comparative narrative diffs credible.
2. Templates shift discovery from style-heavy to structure-heavy features (appendix ablation: only 6/20 top features overlap vs. raw-text comparison).
3. Union-of-three discovery runs + embedding clustering balances coverage and redundancy.
4. Role labels (core/fingerprint) turn black-box importance into narrative explanations.
5. Cost/scale: feature extraction ~$1.6k; generation ~$2.8k; total release cost cited ~$4.4k.

## Connects To
- **Ch 3**: How encoded features become classifiers and ablations.
- **Ch 8 / Appendix B–C**: Blinding, batching, aspect-based application, type examples.
- **Genette / Tian et al.**: Time and plot-arc theoretical lineage.
