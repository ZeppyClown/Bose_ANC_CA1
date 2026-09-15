/* Scientific exploration: five slides from Thomas Young to Amar Bose, one point per click. */
window.ScienceChapter = (() => {
  const pad = n => String(n).padStart(2, '0');
  const slides = [
    {id: 'young', short: 'Young', builds: ['Thomas Young', 'Waves reinforce or cancel']},
    {id: 'water', short: 'Water', builds: ['Peak meets trough', 'Destructive interference']},
    {id: 'sound', short: 'Sound', builds: ['Sound is a wave', 'The big question']},
    {id: 'lueg', short: 'Lueg', builds: ['Lueg’s 1936 patent', 'A second sound wave', 'The electronics weren’t ready']},
    {id: 'bose', short: 'Bose', builds: ['Amar Bose, 1978', 'Two centuries to headphones']}
  ];
  const stops = slides.flatMap((s, slide) => s.builds.map((label, build) => ({slide, build, label})));
  const stopOf = (slide, build = 0) => stops.findIndex(s => s.slide === slide && s.build === build);

  // One travelling sine path, shifted by CSS so it scrolls left.
  const sine = (amp, width = 1400, period = 100) => {
    let d = '';
    for (let x = 0; x <= width; x += 4) d += `${x ? 'L' : 'M'}${x} ${(Math.sin(x / period * Math.PI * 2) * amp).toFixed(1)} `;
    return d;
  };

  const pulses = `<svg class="sci-water" viewBox="0 0 900 300" role="img" aria-label="A wave peak and a wave trough travel towards each other on a water surface; where they overlap the surface goes flat">
      <defs><linearGradient id="sci-water-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b4a63" stop-opacity=".55"/><stop offset="1" stop-color="#0a1622" stop-opacity="0"/></linearGradient></defs>
      <path class="water-body" d="M0 150 H900 V300 H0 Z" fill="url(#sci-water-fill)"/>
      <path class="water-a" d="M0 150 H900" fill="none" stroke="#ffb340" stroke-width="2" stroke-dasharray="5 7"/>
      <path class="water-b" d="M0 150 H900" fill="none" stroke="#4dd0e1" stroke-width="2" stroke-dasharray="5 7"/>
      <path class="water-sum" d="M0 150 H900" fill="none" stroke="#9fc3d6" stroke-width="5" stroke-linecap="round"/>
      <text class="label-a" x="250" y="36" text-anchor="middle" fill="#ffb340">PEAK</text>
      <text class="label-b" x="650" y="284" text-anchor="middle" fill="#4dd0e1">TROUGH</text>
      <text class="label-flat" x="450" y="118" text-anchor="middle" fill="#8fd694" opacity="0">= FLAT</text>
    </svg>`;

  const airDots = Array.from({length: 26}, (_, c) => Array.from({length: 7}, (_, r) => `<circle cx="${40 + c * 32}" cy="${36 + r * 26}" r="4.5" style="--d:${(-c * 0.09).toFixed(2)}s"/>`).join('')).join('');
  const soundWave = `<svg class="sci-sound" viewBox="0 0 900 330" role="img" aria-label="Air particles bunch together and spread apart as a sound wave passes; the pressure rises and falls like a wave">
      <g class="speaker"><path d="M0 70 H18 L44 44 V192 L18 166 H0 Z" fill="#172230" stroke="#6f8196" stroke-width="2"/></g>
      <g class="air" fill="#8ea0b5">${airDots}</g>
      <text x="60" y="244" fill="#8b9bb3">PRESSURE</text>
      <g transform="translate(40 290)"><path class="travel" d="${sine(26, 1300, 150)}" fill="none" stroke="#e0913a" stroke-width="3"/></g>
    </svg>`;

  const duct = `<svg class="sci-duct" viewBox="0 0 900 300" role="img" aria-label="Lueg's idea in a pipe: a microphone picks up noise, an amplifier drives a loudspeaker, and the loudspeaker's opposite wave cancels the noise further along">
      <defs>
        <clipPath id="sci-before"><rect x="60" y="40" width="470" height="180"/></clipPath>
        <clipPath id="sci-after"><rect x="530" y="40" width="370" height="180"/></clipPath>
      </defs>
      <path d="M40 70 H880 M40 190 H880" stroke="#6f8196" stroke-width="3"/>
      <g clip-path="url(#sci-before)"><g transform="translate(60 130)"><path class="travel" d="${sine(48)}" fill="none" stroke="#ffb340" stroke-width="4"/></g></g>
      <g clip-path="url(#sci-after)">
        <g class="duct-ghost" transform="translate(60 130)"><path class="travel" d="${sine(48)}" fill="none" stroke="#ffb340" stroke-width="2" stroke-dasharray="6 8"/></g>
        <g class="duct-anti" transform="translate(60 130)"><path class="travel" d="${sine(-48)}" fill="none" stroke="#4dd0e1" stroke-width="2" stroke-dasharray="6 8"/></g>
        <path class="duct-flat" d="M530 130 H880" stroke="#8fd694" stroke-width="5"/>
      </g>
      <circle cx="56" cy="130" r="9" fill="#070b12" stroke="#ffb340" stroke-width="3"/><text x="40" y="54" fill="#ffb340">NOISE</text>
      <g class="duct-parts">
        <rect x="200" y="116" width="28" height="28" fill="#070b12" stroke="#c4d5e5" stroke-width="2"/><path d="M200 116 L228 144 M228 116 L200 144" stroke="#c4d5e5" stroke-width="2"/><text x="214" y="102" text-anchor="middle" fill="#c4d5e5">MIC</text>
        <path d="M214 144 V250 H350 M450 250 H550 V204" fill="none" stroke="#6f8196" stroke-width="3"/>
        <rect x="350" y="230" width="100" height="40" rx="3" fill="#121c29" stroke="#c4d5e5" stroke-width="2"/><text x="400" y="258" text-anchor="middle" fill="#c4d5e5">AMP</text>
        <path d="M530 190 H570 V204 H530 Z" fill="#4dd0e1"/><text x="590" y="232" fill="#4dd0e1">SPEAKER</text>
      </g>
      <text class="duct-quiet" x="715" y="54" text-anchor="middle" fill="#8fd694">QUIETER</text>
    </svg>`;

  const years = {start: 1790, end: 2020};
  const xOf = y => ((y - years.start) / (years.end - years.start) * 100).toFixed(2);
  const timeline = [
    {year: 1803, label: 'Young', note: 'Light waves interfere', side: 'above'},
    {year: 1936, label: 'Lueg', note: 'Patent', side: 'below'},
    {year: 1978, label: 'Bose', note: 'The flight', side: 'above'},
    {year: 2000, label: 'QC headphones', note: 'Consumer ANC', side: 'below'}
  ];

  const scene = (index, title, body, label = 'Scientific exploration') => `
    <article class="story-scene sci-scene sci-${slides[index].id}" data-scene="${index}" ${index ? 'hidden inert' : ''} aria-label="${slides[index].builds[0]}">
      <div class="story-copy"><p class="story-label">${pad(index + 1)} / ${pad(slides.length)} <span>${label}</span></p><h2>${title}</h2></div>
      <div class="sci-stage">${body}</div>
    </article>`;

  function html(cite) {
    return `<div class="story-chapter science-chapter">
      <div class="story-stage" data-click-advance>
        ${scene(0, 'Where it began:<br><em>light.</em>', `
          <article class="story-panel sci-portrait" data-build="0">
            <figure><img src="thomas-young.jpg" width="520" height="659" alt="Engraved portrait of Thomas Young"><figcaption>Thomas Young · engraving after Thomas Lawrence · public domain</figcaption></figure>
            <div><p class="story-tag"><b>EARLY 1800s</b></p><p class="sci-name">Thomas Young</p><p class="sci-sub">Experiments with light</p></div>
          </article>
          <article class="story-panel sci-interference" data-build="1">
            <p class="story-tag">OVERLAPPING WAVES</p>
            <div class="sci-canvas-wrap"><canvas class="sci-ripples" width="240" height="150" aria-label="Animated ripples from two sources overlapping into bright and dark bands"></canvas></div>
            <div class="sci-legend"><span class="up">Aligned → reinforce</span><span class="down">Opposed → cancel</span></div>
            <figure class="sci-sketch"><img src="young-1807.jpg" width="960" height="426" alt="Thomas Young's 1807 drawing of two sets of circular waves overlapping"><figcaption>Young’s own drawing, 1807 · public domain</figcaption></figure>
          </article>`)}
        ${scene(1, 'Think of<br><em>water waves.</em>', `
          <article class="story-panel sci-wide sci-water-panel" data-build="0">
            <p class="story-tag">PEAK + TROUGH</p>${pulses}
            <p class="sci-result" data-build="1">Destructive interference</p>
          </article>`)}
        ${scene(2, 'Sound behaves<br><em>as a wave.</em>', `
          <article class="story-panel sci-wide sci-sound-panel" data-build="0"><p class="story-tag"><b>1800s</b> ACOUSTICS</p>${soundWave}</article>
          <article class="story-panel sci-question" data-build="1"><p class="question-text">If sound is a wave… <mark style="--i:0">could sound cancel sound?</mark></p></article>`)}
        ${scene(3, 'Paul Lueg’s<br><em>1936 patent.</em>', `
          <article class="story-panel sci-patent" data-build="0"><figure><img src="lueg-1936.png" width="1000" height="520" alt="Figure 1 of Paul Lueg's 1936 US patent 2,043,416, Process of silencing sound oscillations: a pipe with a microphone, amplifier and loudspeaker"><figcaption>US 2,043,416, Fig. 1 · public domain ${cite(2)}</figcaption></figure></article>
          <article class="story-panel sci-duct-panel" data-build="1"><p class="story-tag">A SECOND SOUND WAVE</p>${duct}</article>
          <article class="story-panel sci-ready" data-build="2">
            <div class="ready-row ok"><span>The science</span><i style="--w:100%"></i><b>✓</b></div>
            <div class="ready-row no"><span>Electronics &amp; control</span><i style="--w:22%"></i><b>✕</b></div>
          </article>`)}
        ${scene(4, 'Then, in 1978:<br><em>Amar Bose.</em>', `
          <article class="story-panel sci-portrait sci-bose" data-build="0">
            <figure><img src="amar-bose.jpg" width="368" height="368" alt="Amar Bose, seated and smiling"><figcaption>Amar Bose · Photo: MIT</figcaption></figure>
            <div><p class="story-tag"><b>1978</b></p><p class="sci-name">Frustrated by cabin noise</p><p class="sci-sub">Set out to make ANC practical</p></div>
          </article>
          <article class="story-panel sci-timeline" data-build="1">
            <p class="story-tag">FROM PHENOMENON TO HEADPHONES</p>
            <div class="sci-line"><i class="sci-line-fill"></i>${timeline.map((t, i) => `<span class="sci-year ${t.side}" style="--x:${xOf(t.year)}%;--i:${i}"><i></i><b>${t.year}</b><em>${t.label}</em><small>${t.note}</small></span>`).join('')}
              <span class="sci-axis" style="--x:${xOf(1800)}%">1800</span><span class="sci-axis" style="--x:${xOf(1900)}%">1900</span><span class="sci-axis" style="--x:${xOf(2000)}%">2000</span></div>
            <p class="sci-span">≈ 200 years</p>
          </article>`)}
      </div>
      <div class="story-bottom">
        <nav class="story-nav" aria-label="Scientific exploration slides">${slides.map((s, si) => `<button type="button" data-story-jump="${stopOf(si)}" aria-label="Slide ${si + 1}: ${s.short}"><span>${pad(si + 1)} <b>${s.short}</b></span><span class="pips">${s.builds.map(() => '<i></i>').join('')}</span></button>`).join('')}</nav>
        <button type="button" class="story-next" data-chapter-next>CLICK TO CONTINUE → <b>Next</b></button>
      </div>
    </div>`;
  }

  // Two-source ripple field, drawn small and scaled up by CSS. Runs only while visible.
  function startRipples(canvas) {
    if (!canvas || canvas.dataset.running) return;
    canvas.dataset.running = '1';
    const ctx = canvas.getContext('2d'), {width: w, height: h} = canvas;
    const image = ctx.createImageData(w, h);
    const sources = [[0, h * 0.3], [0, h * 0.7]];
    const still = matchMedia('(prefers-reduced-motion: reduce)');
    const draw = t => {
      const phase = t / 260;
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const a = sources.reduce((sum, [sx, sy]) => sum + Math.sin(Math.hypot(x - sx, y - sy) / 4.2 - phase), 0) / 2;
        const i = (y * w + x) * 4, v = a;
        image.data[i] = v > 0 ? 40 + v * 215 : 10 + -v * 40;
        image.data[i + 1] = v > 0 ? 30 + v * 150 : 18 + -v * 60;
        image.data[i + 2] = v > 0 ? 20 + v * 40 : 30 + -v * 70;
        image.data[i + 3] = 255;
      }
      ctx.putImageData(image, 0, 0);
    };
    const loop = t => {
      const visible = canvas.closest('.section.active') && !canvas.closest('[hidden]');
      if (visible) draw(still.matches ? 0 : t);
      if (!visible && !canvas.closest('.section.active')) { delete canvas.dataset.running; return; }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  // Water surface = peak + trough, recomputed each frame so the meeting is continuous in both directions.
  function startWater(svg) {
    if (!svg || svg.dataset.running) return;
    svg.dataset.running = '1';
    const scene = svg.closest('.sci-scene'), still = matchMedia('(prefers-reduced-motion: reduce)');
    const [body, a, b, sum] = ['.water-body', '.water-a', '.water-b', '.water-sum'].map(q => svg.querySelector(q));
    const [labelA, labelB, labelFlat] = ['.label-a', '.label-b', '.label-flat'].map(q => svg.querySelector(q));
    const AMP = 88, SIGMA = 58, BASE = 150;
    const bump = (x, centre, sign) => sign * AMP * Math.exp(-((x - centre) ** 2) / (2 * SIGMA * SIGMA));
    const surface = f => { let d = ''; for (let x = 0; x <= 900; x += 6) d += `${x ? 'L' : 'M'}${x} ${(BASE - f(x)).toFixed(1)} `; return d; };
    const smooth = t => t * t * (3 - 2 * t);
    let progress = Number(scene.dataset.build) === 1 ? 1 : 0, last = performance.now();
    const loop = now => {
      if (!svg.closest('.section.active')) { delete svg.dataset.running; return; }
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const target = Number(scene.dataset.build) === 1 ? 1 : 0;
      progress = still.matches ? target : progress + Math.sign(target - progress) * Math.min(Math.abs(target - progress), dt / 1.8);
      const p = smooth(progress), bob = still.matches ? 0 : Math.sin(now / 420) * 10 * (1 - p);
      const xa = 250 + 200 * p + bob, xb = 650 - 200 * p - bob;
      a.setAttribute('d', surface(x => bump(x, xa, 1)));
      b.setAttribute('d', surface(x => bump(x, xb, -1)));
      const d = surface(x => bump(x, xa, 1) + bump(x, xb, -1));
      sum.setAttribute('d', d); body.setAttribute('d', `${d} L900 300 L0 300 Z`);
      const ghost = 0.15 + 0.35 * p; a.style.opacity = b.style.opacity = ghost;
      labelA.setAttribute('x', xa); labelB.setAttribute('x', xb);
      labelA.style.opacity = labelB.style.opacity = 1 - 0.7 * p;
      const flat = smooth(Math.max(0, (progress - 0.75) / 0.25));
      labelFlat.style.opacity = flat; sum.style.stroke = flat > 0.5 ? '#8fd694' : '#9fc3d6';
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  function show(index) {
    const root = document.querySelector('.science-chapter'); if (!root) return;
    StoryKit.show(root, stops, index, 'Next: technological research');
    if (stops[index].slide === 0 && stops[index].build >= 1) startRipples(root.querySelector('.sci-ripples'));
    if (stops[index].slide === 1) startWater(root.querySelector('.sci-water'));
  }

  return {
    steps: stops, html, show, lockMs: 650,
    progressLabel: i => `01 / SCIENCE · ${stops[i].label.toUpperCase()}`,
    announce: i => `Scientific exploration, slide ${stops[i].slide + 1} of ${slides.length}: ${stops[i].label}`
  };
})();
