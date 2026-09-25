# Chapter 3: Experiments

## Core Idea
Train interpretable XGBoost models on encoded narrative feature vectors with **prompt-level splits**, then ablate Narrative vs. Style vs. Core/Fingerprint to test whether structure alone carries detection and attribution signal.

## Frameworks Introduced
- **Two-task evaluation design**:
  1. Binary human vs. AI detection (macro-F1 + AUPRC)
  2. Six-way authorship attribution (human + five LLMs)
  - When to use: Separating “is it AI?” from “which model?”
  - How: Same feature pipeline; different label spaces and hyperparameters.
- **Feature-variant matrix**:
  - Narrative (257): exclude Style dim + style-flagged features (47 total excluded)
  - Style Only (39)
  - Narrative + Style (304)
  - Core Only (30)
  - Core + Fingerprint (101)
  - When to use: Isolating structure from texture; measuring compactness of the human–AI boundary.
- **Prompt-level grouping**: Train/val/test never share a writing prompt.
  - When to use: Any parallel multi-source corpus.
  - How: Split on prompt IDs; evaluate on held-out prompts (here: 8,739 train prompts / 1,377 test prompts).

## Key Concepts
- **Encoded dimensionality D**: Expands with one-hot/multi-hot (Narrative+Style D=1108; Narrative D=958; Style Only D=129).
- **Text baselines**: ModernBERT, Stylometric+XGB (144 feats), TF-IDF+XGB (5k), Binoculars (zero-shot).
- **Primary narrative model**: Narrative (257)—tests structure without style.
- **Style-dependence audit**: LLM rates features high/medium/low style reliance to build the exclusion set.

## Mental Models
- Use **Narrative as the scientific claim**, Narrative+Style as the ceiling among feature models, Style Only as the surface baseline.
- Think of **Core Only as the minimal durable boundary** and **Core+FP as mid-size interpretable pack**.
- Prefer **prompt-level CV logic** over story-level shuffle whenever mirrors share premises.

## Anti-patterns
- **Story-level random splits on parallel corpora**: Leakage via shared prompt content.
- **Calling any NarraBench field “narrative”**: Style dimension and gray-zone features must be audited out for the strict Narrative claim.
- **Comparing only to zero-shot detectors**: Supervised text models set a near-perfect upper bound; the point is interpretability + durability, not beating ModernBERT on raw F1.

## Worked Example
**Split**: 52,434 stories (8,739 prompts) train; 8,262 stories (1,377 prompts) test.

**Hyperparameters (grid on val)**:
- Binary: n_estimators=420, depth=8, λ=2.0, 5:1 positive class weight
- Six-way: n_estimators=500, depth=7, λ=1.0

**Encoding recipe**: nominal → one-hot; multi-select → multi-hot; ordinal/scale → numeric; binary as-is.

## Key Takeaways
1. The experimental claim is *narrative signal independent of style*, not SOTA raw-text detection.
2. Ablations must include Core and Core+FP to show compactness and source-specificity.
3. Prompt-level grouping is non-negotiable for mirrored corpora.
4. Supervised text baselines (~99.5–99.9% F1) are upper bounds; Binoculars (~55.9%) shows zero-shot weakness on this fiction setting.
5. Reliability checks (assignment α, human κ) belong next to accuracy numbers.

## Connects To
- **Ch 4**: Binary results and core-feature interpretation.
- **Ch 5**: Six-way results and fingerprints.
- **Appendix D–E**: Selection criteria and dimension ablations.
