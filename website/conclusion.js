/* Conclusion: one finding and one board action. */
window.ConclusionChapter = (() => {
  const pad = n => String(n).padStart(2, '0');
  const points = [
    {title:'Commercialisation required coordination',label:'The finding',text:'Entrepreneurship connected scientific understanding, control engineering, usable products and customer experience.'},
    {title:'For your board: organise the exchanges',label:'The board action',text:'Pair complementary specialists, test where the benefit matters, and make customer and product feedback change the next development decision.'}
  ];
  const stops = points.map((p, build) => ({slide: 0, build, label: p.label}));

  function html(cite) {
    return `<div class="story-chapter conclusion-chapter">
      <div class="story-stage" data-click-advance>
        <article class="story-scene conclusion-scene" data-scene="0" data-build="0" aria-label="Conclusion">
          <div class="story-copy">
            <p class="story-label">CONCLUSION <span>Bringing it together</span></p>
            <h2>Make the learning<br><em>change decisions.</em></h2>
            <ol class="conclusion-points">${points.map((p, i) => `<li class="conclusion-point" data-build="${i}"><span class="point-n">${pad(i + 1)}</span><div><h3>${p.title}</h3><div class="point-body"><div><p>${p.text}</p>${p.path ? `<p class="point-path">${p.path.map(x => `<span>${x}</span>`).join(p.plain ? '<b>·</b>' : '<b>→</b>')}</p>` : ''}</div></div></div></li>`).join('')}</ol>
            <p class="story-refs">${cite(1, 9, 10, 11, 13, 19)}</p>
          </div>
          <div class="conclusion-figure">${CimFigure.svg({label: 'Cyclic Innovation Model with entrepreneurship at the centre. Each conclusion point highlights the capabilities it concerns.'})}</div>
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
    StoryKit.show(root, stops, index, 'Next: thank you and sources');
  }

  return {
    steps: stops, html, show, lockMs: 650,
    progressLabel: i => `07 / CONCLUSION · ${i + 1} OF ${points.length}`,
    announce: i => `Conclusion, point ${i + 1} of ${points.length}: ${points[i].title}`
  };
})();
