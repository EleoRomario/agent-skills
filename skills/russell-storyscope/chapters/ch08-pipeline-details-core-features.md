# Chapter 8: Pipeline Details, Validation & Core Feature Catalog

## Core Idea
Appendices specify the engineering choices that make StoryScope credible: **blinding**, **template necessity**, **deduplication**, **aspect-based feature application**, **human agreement**, and the **30 core + fingerprint** catalogs with human/AI gaps.

## Frameworks Introduced
- **Blinding + order randomization**: Anonymize sources in LLM prompts; randomize presentation order in pairwise comparisons.
  - When to use: Any LLM-as-judge comparative pipeline.
- **Template necessity test**: Run discovery on templates vs raw text; expect style-heavy vs structure-heavy feature sets (only 6/20 top features overlapped).
  - When to use: Defending intermediate representations.
- **Aspect-based application**: Score features per NarraBench dimension rather than one giant call (coverage 68.4% → 95.4% in early tests).
  - When to use: Long feature taxonomies on long documents.
- **Style boundary rule**: If answerable only from prose texture → style; if primarily narrative content → non-style (even if sensory/interior/time features feel “writerly”).
  - When to use: Building a strict Narrative feature subset.
- **Core score ranking**: mean SHAP × stability × (1 + |human–AI gap|) on the qualifying encoded column.

## Key Concepts
- **Feature types**: Categorical 124, Ordinal 59, Scale 45, Binary 44, Multi-select 32 (d=304).
- **Dedup**: F2LLM-4B embeddings; single-linkage cosine 0.85; 408 → 304.
- **Human validation**: Mean human–model Cohen’s κ ≈ 0.84; exact agreement ~86%.
- **Costs**: Generation ~$2800; feature extraction ~$1600.

## Mental Models
- Use **aspect batching** when single-shot drops late dimensions (revelation/time).
- Prefer **0.85 cosine** as a practical merge threshold (0.90 left duplicates; higher stopped useful merges).
- Read **Table 16 thematic blocks** as the operational checklist for AI vs human narrative defaults.

## Anti-patterns
- **Single-shot assigning hundreds of features**: Systematic dropout, especially late dimensions.
- **Calling Sensory Density “style” by default**: Paper’s audit places it on the non-style side when about narrative content density.
- **Publishing human Books3 stories**: Copyright; paper withholds them.

## Worked Example
**AI-elevated gaps (selected)**: Embodied emotion 81% vs 38%; narratorial thematic commentary 77% vs 52%; no subplots 79% vs 57%; protagonist-driven resolution 69% vs 46%; olfactory modality 82% vs 57%.

**Human-elevated gaps (selected)**: Explicit named intertext 47% vs 24%; thematically parallel subplots 42% vs 21%; chronological discontinuity / anachrony / nonlinear reveal higher; fourth-wall and direct reader address higher; moral polarity toward protagonist more ambivalent.

**Fingerprint inventory sizes**: Human 32, Claude 26, GPT 11, Gemini 11, DeepSeek 7, Kimi 3.

## Key Takeaways
1. Credibility comes from blinding, hold-out discovery, and agreement metrics—not only F1.
2. Templates change *which* features you discover.
3. Aspect-based application is required for coverage at this taxonomy size.
4. Core catalogs + mean gaps are the practitioner-facing interface to the paper.
5. Strict Narrative = 257 after removing 47 style/style-like features.

## Connects To
- **Ch 2**: Pipeline stages these details implement.
- **Ch 4–5**: Where core/fingerprint features are used in results.
- **Prompts appendix J**: Reverse-prompting from source stories.
