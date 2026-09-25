# Cheatsheet — StoryScope

## Decision rules

| Situation | Do this | Because |
|-----------|---------|---------|
| Style detector fails after paraphrase/fine-tune | Switch to **narrative features** | Structural choices cost rewrites, not polish |
| Need explainable human-vs-AI score | Use **Core (30)** checklist first | Retains ~85% F1; maps to named decisions |
| Need best structure-only accuracy | Use full **Narrative (257)** | 93.2% macro-F1; ~97% of Narr+Style |
| Need which LLM wrote it | Use **Core+Fingerprint** or Narr+Style | Core alone weak on six-way (46.5%) |
| Comparing methods fairly on mirrors | **Split by prompt** | Prevents premise leakage |
| Building features with LLM judges | **Blind sources + templates** | Cuts stereotype and style confounds |
| Scoring 100s of features on long text | **Aspect-based application** | Coverage jumps (~68%→95%) |
| Claiming durability | Run an **edit probe** (e.g. LAMP) | Paper: −1.6 F1 after style scrub |
| Discussing originality | Report **rarity/dispersion**, not only F1 | Humans rarer (0.71 vs 0.49 pctile) |

## Binary vs attribution

```
Need human vs AI?
  ├─ want short audit → Core Only
  ├─ want max narrative signal → Narrative
  └─ want ceiling among features → Narrative+Style
Need which source?
  ├─ AI models may collide → expect AI↔AI confusions
  ├─ Claude/GPT more separable than Gemini–DeepSeek–Kimi
  └─ add Fingerprints (+style if allowed)
```

## AI narrative defaults (quick smells)

- Themes/morals **over-explained**; narrator states the lesson
- **Single-track** plot, few subplots, tidy causal chain
- Resolution via **protagonist choice / internal acceptance**
- Emotion via **body + setting-as-psyche**; lots of sensory (esp. smell)
- Intertext = **vague echoes**, not named works
- Time mostly **linear**; delayed nonlinear reveals rarer

## Human narrative defaults (quick smells)

- **Named** intertexts / balanced explicit–implicit mix
- **Time jumps**, anachrony, recontextualizing reveals
- Moral **ambivalence**; messier causality; more locations
- **Fourth wall / dear reader** more often
- Higher **dialogue share**; thematically parallel subplots
- Occupies **rarer, more dispersed** region of feature space

## Model fingerprints (attribution hints)

| Source | Tell |
|--------|------|
| Claude | Flat escalation, uniform voice, epilogues, reverent/continuist, quiet endings |
| GPT | Gossip/rumor plots, retrospective framing, denser social ensembles, ambiguous reconciliations |
| Gemini | Tidier endings, long denouements, bleak/oppressive settings |
| DeepSeek | Front-loads crucial context |
| Kimi | Generic AI center; few distinctive fingerprints |
| Human | Highest separability; often rarest of the six mirrors |

## Headline numbers (remember)

- Stories: **61,608** · Prompts: **10,272** · Features: **304** (Narrative **257**, Core **30**, FP **75**)
- Binary Narrative F1 **93.2** · Narr+Style **96.0** · Core **84.8** · LAMP-edited **93.9**
- Six-way Narrative F1 **68.4** · Narr+Style **77.3** · Core+FP **63.4**
- Assignment reliability: α≈**0.90**; human–model κ≈**0.84**

## Feature-type encoding

| Type | Encode as |
|------|-----------|
| Categorical | one-hot |
| Multi-select | multi-hot |
| Ordinal / scale | numeric |
| Binary | 0/1 |

## Don’t

- Shuffle stories across prompts into train/test
- Equate rarity with legal originality
- Release Books3 human text
- Assume style scrubbing kills narrative detection
- Expect six-way narrative F1 to match binary ease
