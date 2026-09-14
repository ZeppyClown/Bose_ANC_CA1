# Twenty-Two Years of Quiet

Website presentation and a synchronised preparation script for ET5218 CA1. Updated 14 September 2026 after the rubric review and a second script-first content check. Open `index.html`, or serve the workspace root:

```sh
python3 -m http.server 8766 --bind 127.0.0.1
```

Visit http://127.0.0.1:8766/website/. Serving the workspace root also makes the working-script link accessible. No external JavaScript or build step; Google Fonts has local fallbacks.

## Slide and speaking map

| Website section | Speaker | Slides / states | Responsibility |
|---|---|---|---|
| 1 Introduction | A | 3 / 5 | Origin once, argument, bounded commercial-success evidence |
| 2 Scientific exploration | B | 3 / 6 | Established principle, acoustic constraints, perception, Market → Science |
| 3 Technological research | C | 1 continuous illustration / 8 | Complementary expertise, sensing and stable control, Science ↔ Technology |
| 4 Product creation | D | 2 / 6 | Integrated requirements, TriPort, usability trade-offs, Technology ↔ Product |
| 5 Market transitions | E | 5 / 13 | Aviation and airline story, consumer market, Product ↔ Market, brief continuation |
| 6 Entrepreneurship | F | 1 / 1 | Sponsorship, hiring, responding to marketing, IP |
| 7 Timeline versus cycle | F | 1 / 1 | Explain the 1981–2000 commercialisation gap and evidence limits |
| 8 Conclusion | A | 1 / 2 | Finding and board action |
| 9 Sources | A | Reference page | 21 linked references |

A state is a displayed build: the first appears automatically on entering a chapter. There is no separate “three loops” section. Speaker names are listed on the opening slide, but the team must assign the A–F roles.

The current `../CA1_scripts_revised.md` has a cue link for every spoken state and a word-count timing table. Its narration is an AI-assisted working draft. Existing PDF decks, the research report and the technology demo MP4 predate this revision and have not been regenerated.

The second check aligned the introduction question, wave-overlap timing, Product’s bidirectional cycle, Market’s in-ear-format illustration, and Entrepreneurship’s three points with the narration. Extra QC35 price/battery/ranking details were removed from Market.

## Navigation

- Scroll, swipe, arrows, Page Up/Down, or Space/Shift+Space advance or reverse one state.
- Home/End jump to the opening or sources. F requests fullscreen; ? opens controls.
- Chapter markers jump between sections; numbered buttons jump within a chapter.
- Click a slide stage or its next button to advance. Long mobile content scrolls internally before moving to the next state.
- A sustained wheel gesture advances once. Reduced motion preserves all content and navigation.
- Deep links such as `#science-4`, `#product-6` and `#market-7` open individual states.

## Presenter space

`recording.html` reserves a separate 260-pixel column beside the slides for a manually placed presenter camera overlay. Use a 1920 × 1080 browser window and click inside the slide frame for keyboard control. The page does not access a camera or record. It is a layout aid; it does not replace the PowerPoint submission requirement.

## Content ownership and evidence

`intro.js`, `science.js`, `technology.js`, `product.js`, `market.js` and `conclusion.js` contain the respective chapters. `app.js` supplies the section map, entrepreneurship, synthesis and 21-source register. `cim-figure.js` supplies the shared bidirectional model. Source numbers match the research report.

The revision removes the long Young history, repeated flight/aviation/airline accounts, Product’s wireless retelling, Market’s extra synthesis, and three of the five concluding points. The early-adopter/chasm assertion is replaced with actual customer buying requirements. No ANC research funding flow is asserted from sales. The 13% statistic is labelled as Bose brand-wide US online headphone dollar share in the 2015 panel, not global ANC share.

Waveforms, local cancellation, headset parts and signal paths are explanatory illustrations. They are not measured simulations or verified Bose teardowns. The Product size illustration is not a TriPort cross-section. CIM connections and design implications are identified as interpretations of the documented events, features and engineering accounts.

## Verification

With the preview server running and Python Playwright installed:

```sh
python3 website/check_presentation.py
python3 website/check_technology.py
```

The presentation check covers every state at 1440 × 900, 1920 × 1080 and 400 × 800; script cue order; chapter boundaries; keyboard, wheel and touch; unique diagram IDs; bidirectional model arrows; presenter layout; and JavaScript errors. The technology check covers the eight-state persistent headset, forward/backward boundaries, captions and controls, mobile layout and touch.

Desktop content is checked to fit one viewport except the internally scrolling references. Mobile sections may scroll internally. Safari, physical devices and the final recorded video require team verification. Print/PDF is an optional reference facility, not a PowerPoint exporter.

## Submission

The assignment requires PowerPoint slides and an MP4 no longer than 10 minutes and smaller than 500 MB, with all members appearing and speaking, due 16 September 2026 at 23:59 SGT. This workspace revision does not produce the final PowerPoint or recording.

The brief permits AI-assisted slide ideas and structuring, but requires the assessed video and recording to be completed entirely without AI assistance. Rewording an AI draft does not automatically establish compliance. Follow the original brief and lecturer’s interpretation for assessed preparation.
