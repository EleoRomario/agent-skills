# Chapter 7: Conclusion

## Core Idea
StoryScope shows that **interpretable narrative features** separate human and AI fiction at scale, capture most of the signal of style-augmented models, and offer a more rewrite-costly—hence potentially more durable—basis for authorship analysis than surface tells.

## Frameworks Introduced
- **Durable authorship via structural features**: Prefer signals that require significant narrative rewrites to evade.
  - When to use: Designing detectors, editorial tools, or originality proxies as models scrub lexical fingerprints.
  - How: Induce core narrative axes; validate under style editing; report rarity/dispersion.
- **Compact core set**: ~30 features explain much of human–AI separation (thematic explicitness, causal tidiness, temporal linearity vs. human diversity/rarity).
  - When to use: Lightweight audits or human-in-the-loop checklists.

## Key Concepts
- **93.2% / 68.4%**: Binary vs six-way narrative-only headline numbers.
- **>97% retention**: Narrative vs Narrative+Style binary performance ratio.
- **Measurable narrative uniqueness**: Rarity/dispersion as complement to black-box detectors.

## Mental Models
- Use StoryScope outputs as **explanations beside a score**, not only a yes/no flag.
- Prefer **core checklist first**, full taxonomy when attribution or research depth is needed.
- Treat released artifacts (code, prompts, AI stories, features—not human Books3 text) as the reproducibility surface.

## Anti-patterns
- **Overclaiming that narrative features solve copyright**: They are a statistical proxy for uniqueness/creative-control discussions, not a legal test.
- **Ignoring ethics of Books3**: Academic analysis ≠ endorsement for training/commercial generation.
- **Shipping detectors without edit-robustness tests**: Style scrubbing is the realistic adversary.

## Worked Example
**One-paragraph executive brief**: Across 61,608 ~5k-word stories from 10,272 prompts, narrative features alone hit 93.2% macro-F1 human-vs-AI and 68.4% six-way attribution, retaining most of style+narrative performance. AI writing is more thematically explicit, causally tidy, and temporally linear; humans are rarer and more structurally diverse. Because changing these choices demands rewrites, they complement brittle style detectors.

## Key Takeaways
1. Narrative structure is a first-class AI-authorship signal.
2. A small core feature set is enough for strong binary separation.
3. Attribution needs fingerprints; AI models converge.
4. Durability claim rests on edit experiments + rewrite cost, not vibes.
5. Release non-copyrighted artifacts; document Books3 academic-only use.

## Connects To
- **Ch 2–5**: Method and evidence stack.
- **Ethics / Acknowledgments**: NSF, cloud credits; AI-assisted writing disclosure.
- **GitHub release**: https://github.com/jenna-russell/storyscope
