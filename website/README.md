# Refined CA1 presentation - 15 September 2026

Current presentation follows the agreed cuts, with an expanded two-minute entrepreneurship section. Read [PRESENTATION_GUIDE.md](../PRESENTATION_GUIDE.md) for timing, ownership, cues and rubric coverage. The original team transcript is preserved unchanged.

## Preview

From the repository root: `python3 -m http.server 8766 --bind 127.0.0.1`

Open http://127.0.0.1:8766/website/ or http://127.0.0.1:8766/website/recording.html for the portrait layout.

## Current state counts

Introduction 3; Science 6; Technology 8; Product 6; Market 4; Entrepreneurship (people/decisions) 2; Entrepreneurship (feedback) 4; Conclusion 2; Sources 1. Total: 36 displayed states including Sources.

Scroll/arrow keys advance; reverse navigation revisits; N toggles rehearsal cues; R replays the current visual; F requests fullscreen. No automatic advance. Presenter controls all holds. Use a 1920 x 1080 window for recording layout and place your portrait in the bottom-right reserved column.

## Editing

- `refined-chapters.js`: opening, market, entrepreneurship, feedback; audience copy, sources and cues.
- `refinements.css`: shared visual styling for these chapters.
- `science.js`, `technology.js`, `product.js`, `conclusion.js`: retained existing chapters.
- `presenter-cues.js`: rehearsal drawer and replay.
- `app.js`: chapter navigation and source register.

Science and Technology content is preserved. Product retains its patent, TriPort and three design trade-offs. Market owns the aviation/airline/customer history and commercial evidence. F focuses on coordinating decisions and feedback. Context images are labelled as illustrations where documentary provenance is not established. Graphs describe the cited panel only.

The website is the presentation prototype, not the final PowerPoint/MP4 submission. No final recording, PowerPoint conversion or public deployment is included in this update. Earlier PDF decks and demo video have not been regenerated. The legacy check_presentation.py assumes the previous script and chapter counts; use check_refinement.py for this version.
