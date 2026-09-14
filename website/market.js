/* Market transitions: five slides aligned with the reviewed thirteen-cue script.
   Wording is checked against the research report; numbers in brackets are its sources. */
window.MarketChapter = (() => {
  const pad = n => String(n).padStart(2, '0');
  const V = window.MarketVisuals;

  const phases = [
    {years: '1989–1998', strip: '1989', icon: 'pilot', title: 'Aviation applications', who: 'Pilots', text: 'Noise-cancelling headsets for pilots, where noise reduction was an operational need.'},
    {years: '1999', strip: '1999', icon: 'seat', title: 'Passenger experience', who: 'Premium-cabin passengers', text: 'First- and business-class passengers try ANC on American Airlines flights.'},
    {years: '2000', strip: '2000', icon: 'travel', title: 'Consumer travel', who: 'Travellers', text: 'The original QuietComfort takes ANC from aviation to consumer travel.'},
    {years: '2013–2021', strip: '2013', icon: 'phone', title: 'Everyday listening', who: 'Everyday listeners', text: 'Digital processing (QC20), Bluetooth (QC35) and Aware mode (QC45).'}
  ];

  // steps: [heading, explanation, sources]; values: the deck's "Entrepreneurship values".
  const transitions = [
    {name: 'Aviation Validation', title: 'Validating ANC<br><em>in the cockpit.</em>', photo: 'market-cockpit.jpg', visual: V.aviation,
      steps: [
        ['The need', 'Engine noise masks speech and music. For pilots, a quieter headset was a functional need, not a luxury.', [10]],
        ['Why aviation first', 'Prototypes worked by 1981 but were too expensive for consumers. Bose took the technology where the benefit justified the cost.', [9]],
        ['Proof in the field', 'Voyager provided field experience in 1986, before the 1989 aviation launch. Pilot trials and advocacy helped customers evaluate the benefit.', [10, 11]]],
      values: ['Patient sponsorship: 11 years from the 1978 flight to launch', 'Market sequencing: pilots before consumers']},
    {name: 'In-Flight Demonstration', title: 'Solving the<br><em>observability gap.</em>', photo: 'market-cabin.jpg', visual: V.cabin,
      steps: [
        ['The barrier', 'Anti-noise is invisible. A print or radio ad can describe quiet, but people have to hear it to believe it.', []],
        ['The trial', 'Bose partnered with American Airlines to give first- and business-class passengers ANC headsets, turning flight time into a live demonstration.', [11]],
        ['The signal back', 'Bose says the positive response encouraged it to sell directly to consumers. No contract value or conversion rate is published.', [11]]],
      values: ['Differentiated services cycle: Product ↔ Market', 'Passenger response → consumer sales decision']},
    {name: 'Consumer Launch', title: 'Winning a<br><em>consumer market.</em>', photo: 'market-qc-desk.jpg', visual: V.consumer,
      steps: [
        ['Repositioned', 'The original QuietComfort offered personal quiet for travellers, packaged as a complete travel product.', [12]],
        ['A new buying decision', 'Consumer travellers needed comfort, portability and a benefit worth the price. Entering this segment was a new commercial task, not proof of mainstream adoption.', [11,12]],
        ['Proof of demand', 'By 2015, QC25 was Bose’s top-selling headphone online in the US, and Bose led US online headphone dollar share at 13.0%.', [14, 16]]],
      values: ['Repositioning: personal quiet for travellers', 'Market bridging: from the cabin to everyday travel']},
    {name: 'Digital Era', title: 'The digital era:<br><em>ANC everywhere.</em>', photo: 'market-qc-digital.jpg', visual: V.digital,
      steps: [
        ['New listening formats', 'QC20 (2013) extended digital ANC into an in-ear product: a different format for personal listening.', [9]],
        ['Phone-based listening', 'QC35 added Bluetooth in 2016 as wireless listening expanded, serving customers listening through their phones.', [17, 18]],
        ['A brief continuation', 'Beyond our 2000–2016 main case, QC45 (2021) offered Aware mode: an example of serving listeners who also need to hear their surroundings.', [21]]],
      values: ['Continuous product renewal', 'Following customers to phone-based listening']}
  ];

  const slides = [
    {short: 'Roadmap', builds: ['Market transition roadmap']},
    ...transitions.map((t, i) => ({short: phases[i].strip, builds: t.steps.map(s => `${t.name} · ${s[0]}`)}))
  ];
  const stops = slides.flatMap((s, slide) => s.builds.map((label, build) => ({slide, build, label})));
  const stopOf = (slide, build = 0) => stops.findIndex(s => s.slide === slide && s.build === build);

  const strip = active => `<ol class="mkt-strip" aria-label="Transition ${active} of 4">${phases.map((p, i) => `<li class="${i + 1 === active ? 'on' : i + 1 < active ? 'done' : ''}"><i></i><span>${p.strip}</span></li>`).join('')}</ol>`;
  const stepList = (steps, cite) => `<ol class="mkt-steps">${steps.map(([h, p, refs], i) => `<li class="mkt-step" data-build="${i}"><span class="mkt-step-n">${pad(i + 1)}</span><div><h3>${h}</h3><div class="mkt-step-body"><div><p>${p}${refs.length ? ` ${cite(...refs)}` : ''}</p></div></div></div></li>`).join('')}</ol>`;
  function transitionScene(t, i, cite) {
    const n = i + 1;
    return `<article class="story-scene mkt-transition" data-scene="${n}" hidden inert aria-label="Transition ${n}: ${t.name}, ${phases[i].years}">
      <div class="mkt-left">
        <p class="story-label">TRANSITION ${n} <span>${t.name} (${phases[i].years})</span></p>
        ${strip(n)}
        <h2>${t.title}</h2>
        ${stepList(t.steps, cite)}
        <div class="mkt-values" data-build="${t.steps.length - 1}"><span>ENTREPRENEURSHIP VALUES</span>${t.values.map(v => `<b>${v}</b>`).join('')}</div>
      </div>
      <div class="mkt-stage" style="--photo:url('${t.photo}')">${t.visual}</div>
    </article>`;
  }

  function html(cite) {
    return `<div class="story-chapter market-chapter">${V.defs}
      <div class="story-stage" data-click-advance>
        <article class="story-scene mkt-roadmap" data-scene="0" aria-label="Market transition roadmap">
          <div class="mkt-roadmap-head"><p class="story-label">MARKET TRANSITION ROADMAP <span>Four transitions</span></p><h2>Active noise cancelling<br><em>market evolution.</em></h2></div>
          <div class="mkt-journey" data-build="0">
            <div class="mkt-track"><i></i></div>
            <ol class="mkt-phases">${phases.map((p, i) => `<li style="--i:${i}"><span class="mkt-node"></span><div class="mkt-icon">${V.icons[p.icon]}</div><span class="mkt-pill">${p.years}</span><h3>${p.title}</h3><p>${p.text}</p><span class="mkt-who">${p.who}</span></li>`).join('')}</ol>
            <div class="mkt-reach"><span>WHO THE CUSTOMER WAS</span><div><i></i></div><span>narrow → broad</span></div>
          </div>
          <p class="story-refs">${cite(9, 10, 11, 12, 18, 21)}</p>
        </article>
        ${transitions.map((t, i) => transitionScene(t, i, cite)).join('')}
      </div>
      <div class="story-bottom">
        <nav class="story-nav" aria-label="Market transitions slides">${slides.map((s, si) => `<button type="button" data-story-jump="${stopOf(si)}" aria-label="Slide ${si + 1}: ${s.short}"><span>${pad(si + 1)} <b>${s.short}</b></span><span class="pips">${s.builds.map(() => '<i></i>').join('')}</span></button>`).join('')}</nav>
        <button type="button" class="story-next" data-chapter-next>CLICK TO CONTINUE → <b>Next</b></button>
      </div>
    </div>`;
  }

  function show(index) {
    const root = document.querySelector('.market-chapter'); if (!root) return;
    StoryKit.show(root, stops, index, 'Next: entrepreneurship');
    // Restart the matching diagram layer's animations on every click.
    const {slide, build} = stops[index];
    root.querySelectorAll('.mkt-layer').forEach(layer => {
      const live = Number(layer.closest('.story-scene').dataset.scene) === slide && Number(layer.dataset.layer) === build;
      layer.classList.remove('is-live');
      if (live) { void layer.getBoundingClientRect(); layer.classList.add('is-live'); }
    });
  }

  return {
    steps: stops, html, show, lockMs: 650,
    progressLabel: i => `04 / MARKET TRANSITIONS · ${stops[i].label.toUpperCase()}`,
    announce: i => `Market transitions, slide ${stops[i].slide + 1} of ${slides.length}: ${stops[i].label}`
  };
})();
