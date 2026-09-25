# Patterns — StoryScope

## Pattern: Parallel Mirror Corpus
**When to use**: Comparing human vs multi-LLM storytelling without confounding premise differences.  
**How**: Start from human stories → reverse-engineer writing prompts → regenerate with each model → treat each origin as a `source`.  
**Trade-offs**: High generation cost; prompt reverse-engineering may imperfectly capture premise; copyright limits releasing human text.

## Pattern: Template-Then-Compare
**When to use**: You need structure-heavy discriminative features, not style tells.  
**How**: Extract dimensional JSON templates → compare anonymized templates across sources on the same prompt → mine observations for feature proposals.  
**Trade-offs**: Extra LLM stage and schema design; templates can drop nuance; empirically shifts features from style to structure.

## Pattern: Closed-Form Feature Discovery
**When to use**: Building an interpretable, modelable taxonomy at scale.  
**How**: Per-dimension expert prompts propose questions with categorical/ordinal/scale/binary/multi-select answers; union multiple runs; embed+cluster to dedupe.  
**Trade-offs**: May miss open-ended phenomena; clustering threshold is sensitive (paper uses cosine 0.85).

## Pattern: Hold-Out Discovery Pool
**When to use**: Preventing feature invention from leaking evaluation prompts.  
**How**: Reserve a small diverse prompt set (here 100 prompts / 600 stories) exclusively for comparison/discovery; evaluate on the rest with prompt-level splits.  
**Trade-offs**: Smaller discovery set may under-cover rare genres; high-reasoning comparison is expensive.

## Pattern: Core vs Fingerprint Role Assignment
**When to use**: Explaining binary detection vs fine-grained attribution.  
**How**: Bootstrap SHAP; mark stable cross-model separators as Core; mark single-source concentrated importance as Fingerprint; drop the rest from role analyses.  
**Trade-offs**: Thresholds are heuristic; fingerprints shrink as models converge.

## Pattern: Strict Narrative Ablation
**When to use**: Claiming structure-only signal.  
**How**: Audit features for style dependence; drop Style dimension + gray-zone style-like features; compare Narrative vs Style Only vs Narrative+Style vs Core/Core+FP.  
**Trade-offs**: Borderline features (sensory density, interior access) need an explicit rule; removing too much can understate signal.

## Pattern: Edit-Robustness Probe (LAMP)
**When to use**: Testing whether detectors survive surface scrubbing.  
**How**: Rewrite AI artifacts at span level; re-score with narrative classifier; report ΔF1/AP.  
**Trade-offs**: Rewriter may introduce new artifacts; limited to categories the editor targets; doesn’t prove robustness to structural adversarial rewrites.

## Pattern: Aspect-Based Feature Application
**When to use**: Scoring large taxonomies on long documents.  
**How**: One call (or batch) per narrative dimension instead of a single mega-prompt; monitor coverage.  
**Trade-offs**: More calls/cost; must reconcile cross-dimension consistency.

## Pattern: Rarity-as-Originality Score
**When to use**: Complementing classifiers with a uniqueness proxy.  
**How**: Embed/encode stories; compute kNN distance percentiles; compare human vs AI tails and per-prompt rarest source.  
**Trade-offs**: Metric depends on corpus composition; rare ≠ good; not a legal originality test.

## Pattern: Prompt-Level Evaluation Hygiene
**When to use**: Any multi-source parallel dataset.  
**How**: Split and bootstrap by prompt ID; never let mirrors of the same premise straddle train/test.  
**Trade-offs**: Fewer effective independent units than story count suggests.
