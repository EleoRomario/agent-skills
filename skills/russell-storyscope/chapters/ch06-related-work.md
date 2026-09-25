# Chapter 6: Related Work

## Core Idea
StoryScope sits at the intersection of **AI-text detection**, **creativity/originality measurement**, and **computational narratology**—arguing that discourse-level structure is a more durable authorship signal than lexical “AI slop.”

## Frameworks Introduced
- **AI slop / stylistic convergence**: LLMs share narrow grammatical and rhetorical habits distinct from human variation; detectors exploit stylometry, linguistics, or ML on fiction—but partial edits remain hard.
  - When to use: Positioning why style-only tools work today and fail tomorrow.
- **Creativity deficit literature**: Lower novelty on n-gram, psychometric, and creativity-theoretic measures; reduced collective diversity; repeated plot elements across generations.
  - When to use: Linking StoryScope’s rarity findings to broader creativity claims.
- **Narrative-theory tooling**: Extract POV, temporality, focalization; compare cultural nuance/ambiguity/twists; network analyses of simpler AI social structures.
  - When to use: Justifying NarraBench-grounded feature induction over bag-of-words.

## Key Concepts
- **Partial AI edits**: Mixing human text with AI rewrites—harder detection regime.
- **Memorization vs. preference**: Literary fine-tuning can improve preference scores while activating verbatim memorization.
- **Reward anchoring with human stories**: RL with human story anchors improves long-form writing in smaller models (related line of work).

## Mental Models
- Use **“style detector lineage → narrative detector lineage”** when surveying prior art.
- Think of StoryScope as measuring **shared narrative attractors**, not only shared tokens.
- Prefer citing **parallel-corpus human–LLM comparisons** when claiming structural differences.

## Anti-patterns
- **Collapsing detection literature into one number**: Zero-shot vs supervised vs expert-human regimes differ wildly.
- **Ignoring memorization when generating literary-like text**: Preference ≠ originality.
- **Treating plot repetition as only a decoding artifact**: May reflect deeper feature-space convergence.

## Worked Example
**Positioning sentence you can reuse**: Prior detectors chase fleeting surface habits; creativity studies show LLMs reduce diversity; narratology supplies structural axes—StoryScope induces those axes at scale on parallel ~5k-word stories and shows structure alone nearly matches style+structure for binary detection.

## Key Takeaways
1. Style-based detection is mature but brittle to paraphrase and model updates.
2. Creativity metrics already hint at AI homogenization; StoryScope localizes it in narrative decisions.
3. Computational narratology provides the right feature ontology (time, focalization, agency…).
4. Partial authorship and constrained generation blur boundaries—motivate durable structural signals.
5. Related work supports both the threat model (AI fiction at scale) and the method (LLM-as-annotator for discourse).

## Connects To
- **Ch 1**: Problem framing and legal originality backdrop.
- **Ch 4–5**: Empirical answers to detection and attribution.
- **Appendix F**: Memorization risk checks on famous stories.
