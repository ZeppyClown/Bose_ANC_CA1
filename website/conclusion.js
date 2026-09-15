/* Conclusion: five points, one per click, each lighting the part of the CIM it refers to. */
window.ConclusionChapter = (() => {
  const pad = n => String(n).padStart(2, '0');
  const points = [
    {title: 'No single cause', label: 'No single cause', text: 'The four CIM areas reinforced and fed back into one another over several decades.'},
    {title: 'Sponsorship and expertise', label: 'Sponsorship and expertise', text: 'Amar Bose’s long-term commitment, plus acoustics and control engineering from people like Roman Sapiejewski and Dan Gauger.'},
    {title: 'Wearable, practical, affordable', label: 'Wearable, practical, affordable', text: 'Technical viability was never enough. It had to be comfortable, fit everyday travel and be affordable for real customers.', path: ['Comfortable', 'Practical', 'Affordable'], plain: true},
    {title: 'A way to experience it', label: 'A way to experience it', text: 'Customers had to try it and be convinced before Bose moved to direct consumer sales.', path: ['Aviation trials', 'Airline exposure', 'Direct sales']},
    {title: 'Entrepreneurship, the thread', label: 'Entrepreneurship, the thread', text: 'It connected research, engineering, product design and market strategy throughout the case.'}
  ];
  const stops = points.map((p, build) => ({slide: 0, build, label: p.label}));

  const people = `<g class="cim-people" font-size="11" letter-spacing=".5">
      <text x="185" y="150" text-anchor="middle" fill="#8cbadd">AMAR BOSE · SPONSOR</text>
      <text x="176" y="26" text-anchor="end" fill="#b8cf7b">R. SAPIEJEWSKI · ACOUSTICS</text>
      <text x="344" y="26" fill="#b8cf7b">D. GAUGER · CONTROL</text>
    </g>`;

  function html(cite) {
    return `<div class="story-chapter conclusion-chapter">
      <div class="story-stage" data-click-advance>
        <article class="story-scene conclusion-scene" data-scene="0" data-build="0" aria-label="Conclusion">
          <div class="story-copy">
            <p class="story-label">CONCLUSION <span>Bringing it together</span></p>
            <h2>A combination,<br><em>not a single cause.</em></h2>
            <ol class="conclusion-points">${points.map((p, i) => `<li class="conclusion-point" data-build="${i}"><span class="point-n">${pad(i + 1)}</span><div><h3>${p.title}</h3><div class="point-body"><div><p>${p.text}</p>${p.path ? `<p class="point-path">${p.path.map(x => `<span>${x}</span>`).join(p.plain ? '<b>·</b>' : '<b>→</b>')}</p>` : ''}</div></div></div></li>`).join('')}</ol>
            <p class="story-refs">${cite(1, 9, 10, 11, 13, 19)}</p>
          </div>
          <div class="conclusion-figure">${CimFigure.svg({label: 'Cyclic Innovation Model with entrepreneurship at the centre. Each conclusion point highlights the capabilities it concerns.', extras: people})}</div>
        </article>
      </div>
      <div class="story-bottom">
        <nav class="story-nav" aria-label="Conclusion points"><button type="button" data-story-jump="0" aria-label="Conclusion, first point"><span>CONCLUSION <b>${points.length} points</b></span><span class="pips">${points.map(() => '<i></i>').join('')}</span></button></nav>
        <button type="button" class="story-next" data-chapter-next>CLICK TO CONTINUE → <b>Next</b></button>
      </div>
    </div>`;
  }

  function show(index) {
    const root = document.querySelector('.conclusion-chapter'); if (!root) return;
    StoryKit.show(root, stops, index, 'Next: thank you');
  }

  return {
    steps: stops, html, show, lockMs: 650,
    progressLabel: i => `07 / CONCLUSION · ${i + 1} OF ${points.length}`,
    announce: i => `Conclusion, point ${i + 1} of ${points.length}: ${points[i].title}`
  };
})();
