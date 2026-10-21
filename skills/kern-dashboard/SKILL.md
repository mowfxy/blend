---
name: kern-dashboard
description: Kern specialist for dashboards and data-dense interfaces such as analytics, monitoring, observability, finance, operations, admin overviews, reports and internal tools. It covers deciding which numbers matter, layout by decision, chart choice, data colour, tabular typography, density, time ranges, comparisons, anomalies, drill-down, real-time updates and empty or missing data. Use it whenever you build or redesign a dashboard, a chart-heavy screen, KPI tiles or a data table, or when a dashboard looks like every other admin template.
---

# Kern Dashboard

A dashboard exists so someone can make a decision faster. Every number on it should earn its place by changing what someone does next. Work through the [method](../kern/references/method.md) and hold the [canon](../kern/references/canon.md). For a dashboard, *ground* means the decisions people make with it, how often they look, and what they do when something is wrong.

## Decide what matters before drawing anything

1. **List the decisions.** Write questions such as *"Do I need to page someone?"*, *"Which region is behind plan this week?"* and *"Is this campaign worth continuing?"* Each question becomes a view or a region.
2. **For each decision, find the one number or shape that answers it**, and the comparison that gives it meaning: against the target, the last period, the forecast or a peer. A number without a comparison is trivia.
3. **Order by consequence and frequency.** What is checked every few minutes goes top left and largest. Weekly context goes lower. Anything nobody acts on is removed, however available the data.
4. **Identify the posture.** A glance at a wall screen, a morning check, a deep analysis session and an incident in progress need different designs.

## Layout

- **The dominant element is the answer to the most frequent decision.** It is not a row of four equally weighted KPI tiles. When several numbers really are equal, set them as a compact, aligned summary line or table, not as cards.
- **Use the grid for comparison.** Charts that will be compared share axes, scales and time ranges, and sit side by side at the same size. Charts that are not compared do not need to match.
- **Tables are first-class.** Often the best dashboard is a well-designed table with inline sparklines, conditional emphasis and sorting.
- **Use few containers.** Separate regions with space and tone steps rather than a card around every chart. A card is a boundary around something independent.
- **Make the time range explicit and global**, shown at the top, with the comparison period named. Show data freshness ("updated 2 min ago") wherever it matters.

## Charts

- **Choose the chart by the question.** A line for change over time, bars for comparing categories (sorted, horizontal when labels are long), a dot or slope chart for before and after, a histogram for distributions, a scatter plot for relationships, a heatmap for time by category, and a bullet chart for progress against a target. Pie and donut charts only for two or three parts of a whole, when the whole matters.
- **Maximise data ink.** Use light gridlines or none, label lines directly instead of using a legend, and mark only the axis ticks people need. Avoid 3D and dual axes unless they are clearly labelled and really needed.
- **Use honest scales.** Bars start at zero. Lines may be truncated, but say so. Use consistent units, and put the unit in the label, not on every tick.
- **Show the anomaly.** Highlight what is unusual (the breach, the drop, the outlier) with colour and annotation, and keep everything else quiet.
- **Make interaction explain.** Hover shows exact values and the comparison. Clicking drills down. Brushing a time range filters the whole view. Keep the state in the URL so a view can be shared.

## Colour for data

- Keep neutrals for most of the ink, and use **one accent for "this matters now"**.
- **Data palettes by type of data.** Sequential palettes run light to dark in one hue, for magnitude. Diverging palettes use two hues around a meaningful midpoint, for things like variance from target. Categorical palettes use five to seven distinguishable hues at most, ordered so that adjacent hues stay distinct. Test them for colour-blindness.
- **Status colours** (success, warning, critical) are reserved for status and are never decoration. Pair them with an icon or label, so colour is never the only signal.
- **Dark dashboards** (operations, monitoring) get their own tuned palette, not inverted light colours. See [kern-color](../kern-color/SKILL.md).

## Type for data

- Use **tabular figures** everywhere values compare, right-aligned and aligned on the decimal.
- Choose a face with clear numerals (distinct 0 and O, 1, l and I). A condensed or semi-condensed face can fit more columns without shrinking the size.
- Format numbers for reading: abbreviate large values (1.2M) with the precise value on hover, use consistent decimals in a column, and use locale-aware separators.
- Use a large size for the one answer and a compact size for everything else. Keep labels in sentence case, readable rather than microtext.

## Real time and missing data

- Update values in place without reflowing the layout. Flash the change subtly, once, and never pulse continuously.
- Distinguish **zero**, **no data**, **loading**, **delayed** and **error** visually. A gap in a line chart is a gap, not a drop to zero.
- An empty dashboard on first use explains which data will appear and how to connect it.

## Verify

Ask whether each region answers a decision in the list, and remove the ones that do not. Then check that the time range, comparison and freshness are visible, and look at the dashboard with real data, sparse data, no data and extreme values. Check a narrow window, colour-blind simulation, and both themes if both ship. Score with [kern-critique](../kern-critique/SKILL.md).
