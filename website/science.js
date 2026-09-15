/* Science: established principle, research constraints, and the market-to-science link. */
window.ScienceChapter = (() => {
  const slides = [
    {id:'principle',short:'Principle',builds:['Equal and opposite','An established idea']},
    {id:'limits',short:'Research',builds:['Quiet is local','Fit changes the problem']},
    {id:'inquiry',short:'CIM link',builds:['The research question','Market → Science']}
  ];
  const stops=slides.flatMap((s,slide)=>s.builds.map((label,build)=>({slide,build,label})));
  const stopOf=slide=>stops.findIndex(s=>s.slide===slide);
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


  const local = `<svg viewBox="0 0 680 220" role="img" aria-label="Noise continues in the cabin while a small region near the ear has reduced pressure. Ideal illustration, not a measurement.">
    <g fill="none" stroke="#ffb340" stroke-width="3"><path d="M25 65 Q80 5 135 65 T245 65 T355 65"/><path d="M25 115 Q80 55 135 115 T245 115 T355 115"/><path d="M25 165 Q80 105 135 165 T245 165 T355 165"/></g>
    <ellipse cx="492" cy="112" rx="62" ry="87" fill="#8fd69418" stroke="#8fd694" stroke-width="2" stroke-dasharray="5 5"/>
    <path d="M483 159 C451 138 457 67 494 59 C545 47 552 116 517 127 L505 152 Q493 177 483 159 M481 119 Q470 84 499 82 Q521 85 504 105" fill="none" stroke="#b6c2d6" stroke-width="4"/>
    <text x="25" y="210" fill="#ffb340">CABIN NOISE CONTINUES</text><text x="399" y="210" fill="#8fd694">QUIETER NEAR THE EAR</text>
  </svg>`;
  const panel=(build,title,body)=>`<article class="story-panel sci-finding" data-build="${build}"><p class="story-tag">${title}</p>${body}</article>`;
  function html(cite){
    const bodies=[
      panel(0,'MATCH PRESSURE AT THE LISTENING POINT',pulses+'<p class="story-lead">Equal amplitude + opposite phase can reduce the combined pressure.</p>')+
      panel(1,'1936 · LUEG’S PATENT',`<p class="story-lead">Active noise control predates Bose. The commercial challenge was making it work in a wearable headset.</p><p class="story-refs">${cite(2,3)}</p>`),
      panel(0,'FINDING 1 · CANCELLATION IS LOCAL',local+`<p class="story-lead">A quiet region near the ear does not silence the cabin. Matching depends on frequency and position.</p>${cite(3,4,5)}`)+
      panel(1,'FINDING 2 · THE ACOUSTIC PATH CHANGES',`<p class="story-lead">Fit and leakage change the sound reaching the ear. Passive sealing and active control must work together.</p><p class="story-arrow">Measurement → revised model → another prototype</p>${cite(3,5,9)}`),
      panel(0,'BOSE’S RESEARCH PROBLEM',`<p class="question-text">How do we measure <mark>what listeners experience?</mark></p><p class="story-lead">Gauger describes psychoacoustic experiments: physical measurements must be checked against what people actually hear. A better laboratory reading need not mean a better listening experience.</p>${cite(9)}`)+
      panel(1,'SOCIAL & BEHAVIOURAL SCIENCES CYCLE',`<p class="story-arrow">Market need → Scientific exploration</p><p class="story-lead">User experience sets the research question. Finding: cancellation is local and fit-dependent. Engineering must turn those constraints into sensing and control.</p>${cite(3,5,7,9)}`)
    ];
    return `<div class="story-chapter science-chapter"><div class="story-stage" data-click-advance>${slides.map((s,i)=>`<article class="story-scene sci-scene sci-${s.id}" data-scene="${i}" ${i?'hidden inert':''}><div class="story-copy"><p class="story-label">0${i+1} / 03 <span>Scientific exploration</span></p><h2>${['The principle<br><em>already existed.</em>','What the science<br><em>requires.</em>','A user need becomes<br><em>a research question.</em>'][i]}</h2></div><div class="sci-stage">${bodies[i]}</div></article>`).join('')}</div><div class="story-bottom"><nav class="story-nav" aria-label="Scientific exploration slides">${slides.map((s,i)=>`<button data-story-jump="${stopOf(i)}" aria-label="Slide ${i+1}: ${s.short}"><span>0${i+1} <b>${s.short}</b></span><span class="pips">${s.builds.map(()=>'<i></i>').join('')}</span></button>`).join('')}</nav><button class="story-next" data-chapter-next>CLICK TO CONTINUE → <b>Next</b></button></div></div>`;
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
    let progress = still.matches ? 1 : 0, last = performance.now();
    const loop = now => {
      if (!svg.closest('.section.active')) { delete svg.dataset.running; return; }
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const target = 1; // Narration describes overlap on the first science cue.
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

  function show(index){
    const root=document.querySelector('.science-chapter'); if(!root)return;
    StoryKit.show(root,stops,index,'Next: technological research');
    if(stops[index].slide===0)startWater(root.querySelector('.sci-water'));
  }
  return {steps:stops,html,show,lockMs:650,progressLabel:i=>`01 / SCIENCE · ${stops[i].label.toUpperCase()}`,announce:i=>`Scientific exploration, slide ${stops[i].slide+1}: ${stops[i].label}`};
})();
