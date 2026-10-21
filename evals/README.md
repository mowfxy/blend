# Evaluating Kern

The suite makes two claims, and each can be tested:

1. **Quality:** designs built with Kern score higher than designs built without it.
2. **Divergence:** designs built with Kern differ from each other, across runs, models and briefs, more than designs built without it.

## Method

For each brief in [briefs.json](briefs.json):

1. **Baseline.** Run the brief in three fresh sessions without Kern installed. Save the renders, the source, and a fingerprint written from the result in the format shown in [the record](../skills/kern/references/record.md).
2. **Kern.** Run the brief in three fresh sessions with Kern installed, prefixed with "Use $kern". Kern writes `.kern/fingerprint.json` itself. Clear `~/.kern/ledger.jsonl` between runs, so the ledger cannot push runs apart artificially. You are measuring the method, not the memory.
3. **Cross-model (optional).** Repeat step 2 with a second model to test whether different AIs converge.
4. **Score blind.** Shuffle the renders, have a judge who does not know which is which score each one with the [Kern Score](../skills/kern-critique/SKILL.md#the-kern-score), and record the per-criterion scores.
5. **Measure sameness.** Within each group, compare every pair of fingerprints:

   ```bash
   node skills/kern/scripts/kern.mjs ledger compare runA.json runB.json --json
   ```

   Report the mean pairwise similarity for each group. Lower similarity within a group means more divergence.
6. **Check the brief's own items** listed under `checks`.

## Report

| Brief | Baseline score | Kern score | Baseline similarity | Kern similarity | Checks passed |
|---|---|---|---|---|---|

Report the medians, the spread, and the actual screenshots. A handful of runs gives a direction, not a statistic, so say how many runs back each number.
