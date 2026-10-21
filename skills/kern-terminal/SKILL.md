---
name: kern-terminal
description: Kern specialist for command-line tools and terminal user interfaces (CLIs, TUIs, REPLs, installers, dev tools, logs and build output) built with Ink, Bubble Tea, Ratatui, Textual, Rich, Clack or plain stdout. It covers output hierarchy, colour with restraint, NO_COLOR and non-TTY behaviour, progress, errors that teach, help text, prompts, layout in a fixed grid of cells, and machine-readable output. Use it whenever you design or polish CLI or TUI output.
---

# Kern Terminal

A terminal is a fixed grid of cells in someone else's colour scheme, often piped into another program, and often read in a hurry when something has failed. Hold the [canon](../kern/references/canon.md). In a terminal, hierarchy comes from position, weight, dimming and space more than from colour.

## Output hierarchy

- **Lead with the result.** The last line of a command's output says what happened, such as `✓ Deployed harvest-api to production in 41s`, plus where to look next. Detail goes above it, or behind `--verbose`.
- **Show three levels at most.** Normal for content, bold for the important thing, dim for metadata. Use indentation and blank lines to group, not boxes around everything.
- **Align columns** in tables of output, with right-aligned numbers and consistent units. Truncate long values in the middle (`~/…/src/index.ts`) to fit the terminal width (`$COLUMNS`), and never wrap a table mid-row.
- **Use symbols sparingly** and consistently, such as `✓` for success, `✗` for failure, `!` for warnings and `→` for next steps. Provide an ASCII fallback where Unicode is unsupported. Do not use emoji as status markers.

## Colour

- **The user's terminal theme owns the colours.** Use the 16 ANSI colours (which users theme) for meaning, and use truecolor only for content such as syntax or images, where it must look right on both light and dark backgrounds.
- **Use colour for meaning only:** red for errors, yellow for warnings, green for success and one accent for the tool's identity. Most output is the default foreground.
- **Respect `NO_COLOR`, `FORCE_COLOR` and `--no-color`,** and disable colour and animation automatically when output is not a TTY. Piped output is plain and parseable.

## Progress and time

- **Under about 100 ms**, print nothing. **Up to a few seconds**, show a spinner with the current step. **Longer than that**, show a progress bar with counts and an estimate when the total is known.
- **Long multi-step tasks** list their steps, ticking each as it completes, collapse the finished detail and keep any failure visible.
- **Never leave the terminal in a broken state.** Restore the cursor, clear the spinner line and handle Ctrl+C gracefully with a summary of what was done.

## Errors that teach

Every error says what happened, why, and what to do, in that order and in plain language:

```text
✗ Could not read config at ./harvest.toml
  The file has a syntax error on line 12: expected "=" after key "region".
  → Fix the line, or run `harvest config check` to validate it.
```

Exit with a non-zero status. Print errors to stderr and results to stdout. Show stack traces only with `--debug`.

## Help, prompts and input

- **`--help`** shows a one-line description, the usage line, the most common examples first, and then the flags grouped by purpose. Keep help to one screen and put the detail in man pages or docs.
- **Prompts** have clear defaults (`[Y/n]`), work with the arrow keys, and accept flags for everything so that scripts never need to answer prompts. Never prompt when stdin is not a TTY. Fail with the flag that is needed instead.
- **Destructive commands** confirm, or require `--yes`, and support `--dry-run`.

## TUIs

- **Layout:** a few regions, separated by space or a single line. Keep one focused region, and highlight focus with inverse or bold text plus the accent.
- **Keys:** show the important bindings in a footer, provide `?` for full help and `q` or Esc to back out, and support vim-style keys where users expect them.
- **Resizing:** reflow at the minimum supported size (often 80×24) and say clearly when the window is too small.
- **Themes:** inherit the terminal background. Do not paint a full-screen background colour unless the app owns the whole screen and offers a theme setting.

## Machine output

Provide `--json` (or `--format json`) for anything a script might consume, with a stable schema. Make human output pleasant and machine output boring.

## Verify

Run the tool in a light theme and a dark theme, at 80 columns, piped to `cat`, with `NO_COLOR=1`, with Ctrl+C in the middle of a long task, with a deliberately broken input, and on Windows Terminal if the tool supports Windows.
