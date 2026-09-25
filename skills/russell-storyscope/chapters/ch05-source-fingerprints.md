# Chapter 5: Pinpointing Each Source’s Writing Style

## Core Idea
Six-way authorship from narrative features reaches **68.4% macro-F1**—useful but much harder than binary—because AI models converge into an overlapping narrative region while humans (and Claude/GPT) remain more separable via **fingerprint features**.

## Frameworks Introduced
- **AI convergence vs. human separation**: Mean human–AI centroid distance ≈1.6× mean AI–AI distance; even closest human–AI pair farther than farthest AI–AI pair.
  - When to use: Arguing models share a narrative attractor, not just a style.
  - How: z-scored encoded space; Euclidean centroids/radii; confusion matrices.
- **Per-story rarity**: Mean Euclidean distance to 25 nearest neighbors; percentile within corpus.
  - When to use: Originality proxy at story level; prompt-level “who is rarest?” comparisons.
  - How: Humans mean rarity percentile 0.71 vs AI 0.49 (d=0.83); human rarest-of-six 57.8% of prompts.
- **Model fingerprints** (narrative quirks):
  - **Claude**: Flat event escalation; uniform voice; reverent/continuist toward tradition; epilogues; avoids dreams; quiet endings.
  - **GPT**: Gossip/rumor as plot engine; retrospective framing; denser ensembles; more expectation subversion; ambiguous reconciliations.
  - **Gemini**: Tidy endings, extended denouements, bleak/oppressive settings (~88%).
  - **DeepSeek**: Front-loads crucial context others delay.
  - **Kimi**: Fewest fingerprints; sits at generic AI center; lowest F1.
  - When to use: Attribution explanations or generative “avoid/adopt” style guides at discourse level.

## Key Concepts
- **Fingerprint count skew**: Human 32, Claude 26, GPT 11, Gemini 11, DeepSeek 7, Kimi 3.
- **Confusion concentration**: Worst pairs are AI↔AI (esp. Gemini–DeepSeek–Kimi “triplets”).
- **Dispersion**: Human radius ~22% larger than average AI radius.

## Mental Models
- Use **binary for “human vs machine,” fingerprints for “which machine.”**
- Think of **Kimi as the AI prior / center**, Claude as the most narratively distinct LLM, humans as the dispersed outlier cloud.
- Prefer **Core+FP over Core Only** when attribution matters (+16.8 macro-F1 in paper).

## Anti-patterns
- **Expecting narrative-only six-way to match binary ease**: Chance is 16.7%; 68% is strong but AI cluster confusions dominate.
- **Treating all LLMs as interchangeable narratively**: Claude/GPT retain more separable fingerprints than the triplet.
- **Using rarity alone as a detector threshold without calibration**: Overlap exists; use as comparative evidence.

## Worked Example
**Attribution (Table 3)**: Narrative 68.4% F1; Core Only 46.5%; Core+FP 63.4%; Narr.+Style 77.3%; Style Only 60.4%; text baselines ≥99.5%.

**Per-class (narrative-only, approx.)**: Human ~88.5% F1; Claude ~78%; GPT ~72%; Gemini/DeepSeek/Kimi ~55–60%.

**Fingerprint vignette**: GPT “likes to gossip” (64% vs 44–55% other sources) plus retrospective ensemble social webs—explain a GPT attribution as social-plot machinery, not vocabulary.

## Key Takeaways
1. Attribution signal exists in narrative space but AI↔AI overlap caps ceiling without style.
2. Fingerprints convert SHAP concentration into named model habits.
3. Humans are rarer and more dispersed; often the rarest mirror for a prompt.
4. Claude and GPT are the most distinctive AIs; Gemini–DeepSeek–Kimi form a confused triplet.
5. Core+FP recovers most attribution value with ~1/3 of full narrative features.

## Connects To
- **Ch 4**: Binary boundary is compact; attribution needs source-specific axes.
- **Ch 6**: Related work on convergence and reduced collective diversity.
- **Appendix H–I**: Rarity tables and fingerprint inventories.
