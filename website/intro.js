/* Introduction: welcome, then two story slides, each built one point per click. */
window.IntroChapter = (() => {
  const pad = n => String(n).padStart(2, '0');
  const slides = [
    {id: 'welcome', short: 'Welcome', builds: ['Welcome']},
    {id: 'origin', short: 'The question', builds: ['1978 · The flight', 'The commercial question']},
    {id: 'argument', short: 'The argument', builds: ['Our argument', 'The case we examine']}
  ];
  const stops = slides.flatMap((s, slide) => s.builds.map((label, build) => ({slide, build, label})));
  const stopOf = (slide, build = 0) => stops.findIndex(s => s.slide === slide && s.build === build);

  const caseLine = [
    {year: 2000, name: 'QC1', note: 'Consumer launch'},
    {year: 2014, name: 'QC25', note: '$299.95 · top seller'},
    {year: 2016, name: 'QC35', note: '$349.95 · Bluetooth'}
  ];

  const originPanels = `
    <article class="story-panel story-flight" data-build="0">
      <figure class="bose-portrait"><img src="amar-bose.jpg" width="368" height="368" alt="Amar Bose, founder of Bose Corporation, seated and smiling"><figcaption>Amar Bose · Photo: MIT</figcaption></figure>
      <div class="flight-copy"><p class="story-tag"><b>1978</b> THE FLIGHT</p>
        <p class="story-lead story-lead-big">Amar Bose was dissatisfied with airline headphones.</p></div>
    </article>
    <article class="story-panel story-question" data-build="1"><p class="story-tag">THE COMMERCIAL QUESTION</p><p class="question-text">How does an acoustic principle discovered in a lab become a product that ordinary people are willing to <mark style="--i:0">wear</mark>, <mark style="--i:1">trust</mark> and <mark style="--i:2">pay a premium for</mark>?</p></article>`;

  const argumentPanels = cim => `
    <article class="story-panel story-argument" data-build="0"><p class="story-tag">OUR ARGUMENT</p><div class="story-cim">${cim}</div></article>
    <article class="story-panel story-case" data-build="1">
      <div class="case-head"><img class="bose-logo" src="bose-logo.svg" width="215" height="27" alt="Bose"><p class="story-tag">THE CASE WE EXAMINE</p><p class="case-stat"><b>#1</b><span>US online headphone sales, 2015<small>13% share · Beats 12%</small></span></p></div>
      <ol class="case-line">${caseLine.map((c, i) => `<li style="--i:${i}"><i></i><b>${c.year}</b><span>${c.name}</span><small>${c.note}</small></li>`).join('')}</ol>
    </article>`;

  function html(cite, heroHtml) {
    const cim = CimFigure.svg({compact: true, label: 'Four capabilities: science, technology, product and market, connected by entrepreneurship at the centre'});
    return `<div class="story-chapter intro-chapter">
      <div class="story-stage" data-click-advance>
        <article class="story-scene intro-welcome" data-scene="0" aria-label="Welcome">${heroHtml}</article>
        <article class="story-scene intro-story intro-origin" data-scene="1" hidden inert aria-label="The flight and the commercial question">
          <div class="story-copy"><p class="story-label">02 / 03 <span>Introduction</span></p><h2>From a noisy cockpit<br><em>to a global product.</em></h2><p class="story-refs">${cite(7, 19)}</p></div>
          <div class="story-panels">${originPanels}</div>
        </article>
        <article class="story-scene intro-story intro-argument" data-scene="2" hidden inert aria-label="Our argument and the case">
          <div class="story-copy"><p class="story-label">03 / 03 <span>Introduction</span></p><h2>One argument.<br><em>One product family.</em></h2><p class="story-refs">${cite(1, 12, 13, 14, 16, 18)}</p></div>
          <div class="story-panels">${argumentPanels(cim)}</div>
        </article>
      </div>
      <div class="story-bottom">
        <nav class="story-nav" aria-label="Introduction slides">${slides.map((s, si) => `<button type="button" data-story-jump="${stopOf(si)}" aria-label="Slide ${si + 1}: ${s.short}"><span>${pad(si + 1)} <b>${s.short}</b></span><span class="pips">${s.builds.map(() => '<i></i>').join('')}</span></button>`).join('')}</nav>
        <button type="button" class="story-next" data-chapter-next>CLICK TO CONTINUE → <b>Next</b></button>
      </div>
    </div>`;
  }

  function show(index) {
    const root = document.querySelector('.intro-chapter'); if (!root) return;
    StoryKit.show(root, stops, index, 'Next: scientific exploration');
  }

  return {
    steps: stops, html, show, lockMs: 650,
    progressLabel: i => `INTRODUCTION · ${stops[i].label.toUpperCase()}`,
    announce: i => `Introduction, slide ${stops[i].slide + 1} of ${slides.length}: ${stops[i].label}`
  };
})();

/* Shared build logic for the introduction and conclusion chapters. */
window.StoryKit = {
  show(root, stops, index, lastCue) {
    const {slide, build} = stops[index];
    root.querySelectorAll('.story-scene').forEach((scene, si) => {
      const wasHidden = scene.hidden;
      scene.hidden = si !== slide; scene.inert = si !== slide;
      if (si === slide && wasHidden) { scene.classList.remove('scene-enter'); void scene.offsetWidth; scene.classList.add('scene-enter'); }
    });
    const scene = root.querySelector(`[data-scene="${slide}"]`);
    scene.querySelectorAll('[data-build]').forEach(el => {
      const b = Number(el.dataset.build);
      el.classList.toggle('is-on', b <= build);
      el.classList.toggle('is-current', b === build);
    });
    scene.dataset.build = String(build);
    root.querySelectorAll('[data-story-jump]').forEach((button, si) => {
      if (si === slide) button.setAttribute('aria-current', 'step'); else button.removeAttribute('aria-current');
      button.querySelectorAll('.pips i').forEach((pip, b) => pip.classList.toggle('on', si < slide || (si === slide && b <= build)));
    });
    const cue = root.querySelector('[data-chapter-next] b');
    if (cue) cue.textContent = index === stops.length - 1 ? lastCue : `Next: ${stops[index + 1].label}`;
  }
};
