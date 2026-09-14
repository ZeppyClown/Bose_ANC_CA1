# Build spec — Bose ANC / Cyclic Innovation Model scroll presentation

Hand this to any agent. It is written to be implementable without further questions.

Reference for feel: `https://bose-anc-cim-presentation.netlify.app/` — dark, cinematic, wordless, scroll-driven. Match the *feel*, carry far more content.

---

## 1. The interaction — this is the part that matters

Build **fullPage.js-style scroll-jacking with a programmatic lock**. Do not use CSS `scroll-snap`. Do not use IntersectionObserver-driven reveals on a normally-scrolling page. The document must not scroll at all.

### Required behaviour

1. `document.body` has `overflow: hidden`. The page never scrolls natively.
2. All sections live in one container. Each section is exactly the viewport height. Navigation = `transform: translate3d(0, -index * viewportHeight, 0)` on the container.
3. **One discrete gesture advances exactly one section.** A wheel event, a trackpad flick, an arrow key, a swipe — each moves one section and no more.
4. **Programmatic lock.** On transition start set `locked = true`. Ignore every navigation input while locked. Release after `transitionDuration + ~140ms`. A user spinning a scroll wheel continuously must not skip sections.
5. **Wheel accumulation.** Sum `deltaY` into an accumulator; only fire when `|acc| > ~24`; reset the accumulator on a ~160ms idle timer and on every fired transition. This stops trackpad momentum from firing repeatedly.
6. `preventDefault()` on wheel with `{passive: false}`.
7. Transition ~1000–1100ms on a slow-in/slow-out curve (`cubic-bezier(.66,.01,.16,1)`).

### Do NOT gate the behaviour on viewport width

This was the defect in the previous build. Scroll-jacking must be **on by default at every size**, including inside a narrow embed or iframe. The only permitted opt-outs:

- `prefers-reduced-motion: reduce` → keep section-at-a-time navigation, set transition duration to ~0, disable looping animations.
- Genuine touch devices → keep jacking, driven by swipe (threshold ~44px), not by native scroll.

If a section's content is genuinely taller than the viewport, let that one section scroll internally and only advance when it reaches its own bottom edge. Never fall back to document scrolling.

### Also required

- Arrow Up/Down, Left/Right, PageUp/PageDown, Space, Home, End.
- A fixed section rail (right edge): one marker per section, current one highlighted, click to jump, section name on hover, real `<button>` elements with `aria-label` and `aria-current`.
- A thin progress bar pinned to the top.
- A "Scroll ↓" hint on section 1 that fades out after the first advance.

### Viewport height

Set a `--vh` custom property from `window.innerHeight` in JS and size sections with it. Do not rely on `100vh` or `100dvh` — both misbehave inside iframes.

---

## 2. Animation — must replay, must be continuous

Two failure modes to avoid: animation that fires once and never again, and animation that is only a fade-in.

- On entering a section: remove the active class, force reflow (`void el.offsetWidth`), re-add it. This restarts CSS animations so scrolling back and forth replays them.
- Content elements stagger in on 100–120ms offsets.
- Diagrams animate as a **sequence**, not all at once — 280ms apart.
- Ambient loops keep running while a section is on screen.

### Per section

| # | Section | Animation |
|---|---|---|
| 1 | Opening | A flat amber line draws left→right, then resolves into two opposed travelling waves (amber noise, cyan anti-noise) scrolling at different speeds, looping seamlessly |
| 2 | The gap | Numbers count up from zero (~1.1s, ease-out cubic): $299.95, $349.95, 13.0% |
| 3 | Scientific exploration | Three stacked oscilloscope traces. Noise and anti-noise scroll continuously. The sum trace starts at full amplitude and **collapses to flat** via `scaleY(1 → 0.03)` over ~1.9s after a 1.5s delay — the cancellation visibly happens |
| 4 | Technological research | Signal path builds mic → controller → driver → ear, 280ms apart. Dashed connectors run a continuous `stroke-dashoffset` flow so pulses travel along them |
| 5 | Product creation | Staggered reveal; spec rows wipe in sequentially |
| 6 | Market transitions | Three context cards rise in 220ms apart |
| 7 | CIM hub | Centre star, then four nodes clockwise, then the arcs draw, then the labels. Then the four cycle arcs brighten **in rotation** on an ~11s loop, one at a time. Hub breathes slowly |
| 8 | Timeline vs cycle | Left column (dead chronology) static and grey; right column (information flow) reveals row by row |
| 9 | Close & sources | Simple staggered reveal |

Seamless wave loop: draw the path from x=−100 to x=+500 with a 50px period, animate `translateX(0 → −100px)` linear infinite. Clip to the viewBox.

---

## 3. Visual system

**Palette** — dark only, single theme, every colour painted explicitly (never transparent body).

```
--ground   #070b12   blue-black, not pure black
--ground-2 #0c1320
--ink      #e9eef7
--ink-2    #b6c2d6
--muted    #76839a
--signal   #ffb340   amber — the noise wave
--anti     #4dd0e1   cyan — the anti-noise
--hot      #ff6b57
--ok       #8fd694
```

Amber and cyan are opposed on the colour wheel, mirroring the phase relationship of the two waves. Keep that.

**CIM node colours** (from the ET5218 lecture figure, deck 01 slide 27):
`scientific exploration #e0913a` · `technological research #9bb84a` · `product creation #d8c93f` · `market transitions #9a7bc0` · `entrepreneurship hub #3d8fc4`

**Type** — Archivo 700/800 display, IBM Plex Sans 300/400/600 body, IBM Plex Mono for figures, patent numbers, timings, scope notes. Google Fonts only.

**SVG gotcha:** `svg text { fill: ... }` overrides `fill=""` presentation attributes, because CSS beats presentation attributes. Scope it as `svg text:not([fill])` or every labelled diagram element renders the wrong colour.

---

## 4. Content — nine sections

Full copy is in the project docs `ET5218_CA1_member_scripts_v2.md` and `ET5218_CA1_slides_source.md`. Structure:

1. **Opening** — "Twenty-Two Years of Quiet". 1936 patented / 1978 Bose starts / 2000 in shops. Six presenter names.
2. **A Twenty-Two Year Gap** — what ANC is in plain words; QC25 $299.95 (3 Sep 2014), QC35 $349.95 (5 Jun 2016), Bose 13.0% US online headphone dollar share 2015 vs Beats 12.0%, Sennheiser 9.0%; full panel scope in mono small type.
3. **Scientific exploration** — 1978 flight; equal-and-opposite; Lueg US 2043416 (1936) correction; cancellation at the eardrum not the mic. Cycle: *social and behavioural sciences*.
4. **Technological research** — feedforward / feedback / hybrid; timing and stability; analogue-until-2013 chronology warning. Cycle: *natural and life sciences*.
5. **Product creation** — 1981→2000; US 4455675 "Headphoning" binds comfort to noise reduction; TriPort as the consumer unlock; QC25 specs; manufacturing inference disclaimer. Cycle: *integrated engineering*.
6. **Market transitions** — pilot 1989 / premium cabin 1999 / commuter 2000–; the cabin as demonstration booth that pre-selects the customer; evidence scope block. Cycle: *differentiated services*.
7. **Entrepreneurship at the hub** — the CIM figure plus what moved in each of the four cycles; four entrepreneurial acts.
8. **A timeline tells you when** — dead chronology vs information flow, side by side.
9. **Close and sources**.

**Do not paraphrase the figures.** Every number keeps its scope qualifier. Never claim Bose invented noise cancelling; never convert Bose revenue into ANC revenue.

The four cycle names must be exactly: *natural and life sciences cycle*, *integrated engineering cycle*, *differentiated services cycle*, *social and behavioural sciences cycle*.

---

## 5. Acceptance criteria

Verify each before declaring done:

- [ ] `document.body` never scrolls — `scrollTop` stays 0 at every viewport size, including 400px wide.
- [ ] One wheel notch advances exactly one section.
- [ ] Spinning the wheel hard advances one section, not several.
- [ ] After N wheel gestures the container transform equals `-N × innerHeight` px.
- [ ] Scrolling down then back up **replays** the section's animation.
- [ ] Every diagram label renders in its intended colour, not muted grey.
- [ ] Rail click jumps and updates `aria-current`.
- [ ] Keyboard navigation works.
- [ ] At 400×800 the layout stacks, stays jacked, and has no horizontal overflow.
- [ ] `prefers-reduced-motion` removes motion but keeps navigation.
