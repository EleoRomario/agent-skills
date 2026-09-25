# Chapter 1: Introduction

## Core Idea
Surface stylistic AI tells (em-dashes, “delve,” rhythm) are powerful but brittle; discourse-level **narrative features**—plot structure, agency, revelation, temporality—are harder to fake because changing them requires structural rewrites, not light edits.

## Frameworks Introduced
- **Narrative features (vs. stylistic signals)**: Discourse-level choices such as character agency, chronological discontinuity, and information revelation—not word choice or sentence texture.
  - When to use: Evaluating originality, detection durability, or authorship when style can be paraphrased away.
  - How: Withhold style features; measure separation that survives style removal.
- **Statistical rarity as originality proxy**: Treat uncommon combinations in narrative feature space as a stand-in for Torrance-style originality and copyright’s “minimal creativity / human creative control.”
  - When to use: Comparing human vs. AI “conception,” not just prose surface.
  - How: Embed stories as feature vectors; score rarity (e.g., distance to neighbors); compare distributions.
- **StoryScope**: Pipeline that induces an interpretable narrative feature space from parallel human/AI stories, grounded in NarraBench’s 10 dimensions.
  - When to use: Large-scale comparative narrative analysis or interpretable AI-fiction detection.
  - How: Template → cross-source compare → feature discovery → full-corpus assignment → classify.

## Key Concepts
- **Stylistic signals**: Lexical/syntactic cues (em-dashes, favored vocabulary, sentence rhythm).
- **Narrative features**: Structural storytelling decisions independent of surface wording.
- **Parallel corpus**: Same prompt written by human + multiple LLMs for controlled comparison.
- **Human creative control**: Legal/copyright framing for distinguishing protectable authorship.
- **Fingerprint**: Source-specific narrative quirks enabling six-way attribution.
- **Shared AI narrative region**: Convergence of multiple models into a tight cluster away from humans.

## Mental Models
- Use **“how written vs. how conceived”** when style detectors fail after paraphrase or fine-tuning.
- Think of **narrative features as load-bearing beams**: style is paint; changing beams costs a rewrite.
- Prefer **rarity in decision space** over n-gram novelty when arguing about originality of fiction.

## Anti-patterns
- **Relying only on style detectors for creative writing**: Fine-tuning to mimic human style can collapse detection (paper cites drops from ~97% to ~3%).
- **Equating originality with lexical uniqueness alone**: Misses shared plot/agency defaults across models.
- **Assuming all AI models look the same narratively forever**: Binary human–AI is strong; fine-grained model ID needs fingerprints + often style.

## Worked Example
**Scenario**: A commercially published novel is flagged ~78% AI-generated and recalled; Amazon self-pub samples show high AI rates. Detectors trained on “delve/tapestry/em-dash” may fail after GPT reduces em-dashes or after human-style fine-tuning.

**StoryScope framing**: Build mirrored stories from the same prompt; extract discourse features (agency, flashbacks, thematic explicitness); show that narrative-only classifiers still separate human vs. AI at high macro-F1, and that AI models cluster together while humans disperse.

## Key Takeaways
1. Ask whether the signal is **style** (editable) or **narrative structure** (rewrite-costly).
2. Parallel prompts make narrative differences attributable to source, not premise.
3. Narrative-only detection can retain most of narrative+style performance.
4. Humans occupy a rarer, more dispersed narrative region on average.
5. Release code/features/prompts (not copyrighted human text) to enable follow-on work.

## Connects To
- **Ch 2**: Pipeline that operationalizes narrative feature induction.
- **Ch 4–5**: Empirical detection and per-model fingerprints.
- **NarraBench / Genette**: Taxonomic and narratological grounding.
