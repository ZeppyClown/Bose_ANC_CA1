/* Product creation: two engineering slides, built one click (or gesture) at a time.
   A to-scale 1984–2016 timeline stays on screen while the scenes change. */
window.ProductChapter = (() => {
  const FIRST_YEAR = 1983, LAST_YEAR = 2017;
  const pad = n => String(n).padStart(2, '0');

  const art = {
    patent: `<svg class="prod-art-svg art-patent" viewBox="0 0 240 140" aria-hidden="true">
      <g class="doc"><path d="M70 12 H152 L172 32 V130 H70 Z" fill="#0f1826" stroke="#6f8196" stroke-width="1.5"/><path d="M152 12 V32 H172" fill="none" stroke="#6f8196" stroke-width="1.5"/>
      <g stroke="#3a4a5e" stroke-width="3" stroke-linecap="round"><path d="M84 30 H136 M84 40 H126 M84 108 H140 M84 118 H130"/></g>
      <g fill="none" stroke="#4dd0e1" stroke-width="2"><path d="M98 88 V70 C98 46 144 46 144 70 V88"/><rect x="90" y="72" width="14" height="24" rx="6"/><rect x="138" y="72" width="14" height="24" rx="6"/></g></g>
      <g transform="translate(184 94) rotate(-14)"><g class="stamp-in"><circle r="30" fill="#0a1019" stroke="#ffb340" stroke-width="2"/><circle r="24" fill="none" stroke="#ffb340" stroke-dasharray="2 3"/><text y="-3" text-anchor="middle" fill="#ffb340" font-size="8">US PATENT</text><text y="10" text-anchor="middle" fill="#ffb340" font-size="9">4,455,675</text></g></g>
    </svg>`,
    voyager: `<svg class="prod-art-svg art-voyager" viewBox="0 0 240 140" aria-hidden="true">
      <g fill="none" stroke="#3d556d" stroke-width="1.5"><circle cx="120" cy="66" r="38" fill="#0d1a28"/><ellipse cx="120" cy="66" rx="15" ry="38"/><ellipse cx="120" cy="66" rx="38" ry="12"/></g>
      <path d="M20 66 A100 34 0 1 0 220 66 A100 34 0 1 0 20 66" fill="none" stroke="#2b3d51" stroke-dasharray="3 5"/>
      <path class="orbit-draw" d="M20 66 A100 34 0 1 0 220 66 A100 34 0 1 0 20 66" pathLength="100" fill="none" stroke="#ffb340" stroke-width="2"/>
      <g transform="translate(20 66)"><path class="plane" d="M0 -9 L3 -2 L9 1 V3 L3 1 V6 L5 8 V9 L0 8 L-5 9 V8 L-3 6 V1 L-9 3 V1 L-3 -2 Z" fill="#ffb340"/></g>
      <text x="120" y="130" text-anchor="middle" fill="#9fb2c6" font-size="9" letter-spacing=".5">NON-STOP · UNREFUELED · ROUND THE WORLD</text>
    </svg>`,
    aviation: `<svg class="prod-art-svg art-aviation" viewBox="0 0 240 140" aria-hidden="true">
      <g class="noise-lines" stroke="#ffb340" stroke-width="2" stroke-linecap="round" opacity=".7"><path d="M14 72 H42 M22 90 H42 M14 108 H42"/><path d="M48 66 V114" stroke-width="3"/></g>
      <path d="M78 96 V66 C78 14 162 14 162 66 V96" fill="none" stroke="#56677c" stroke-width="9" stroke-linecap="round"/>
      <rect x="60" y="60" width="36" height="58" rx="15" fill="#172230" stroke="#6f8196" stroke-width="2"/>
      <rect x="144" y="60" width="36" height="58" rx="15" fill="#172230" stroke="#6f8196" stroke-width="2"/>
      <path class="boom" d="M72 116 C78 136 104 138 118 130" pathLength="100" fill="none" stroke="#d8c93f" stroke-width="3" stroke-linecap="round"/>
      <circle class="mic" cx="121" cy="129" r="5" fill="#d8c93f"/>
      <g class="comms" fill="none" stroke="#4dd0e1" stroke-width="2" stroke-linecap="round"><path d="M192 78 q8 11 0 22"/><path d="M202 70 q15 19 0 38"/></g>
    </svg>`,
    headsetX: `<svg class="prod-art-svg art-headsetx" viewBox="0 0 240 140" aria-hidden="true">
      <g class="ghost" fill="none" stroke="#3a4a5e" stroke-width="2" stroke-dasharray="4 4"><path d="M58 100 V70 C58 6 182 6 182 70 V100"/><rect x="36" y="64" width="44" height="70" rx="18"/><rect x="160" y="64" width="44" height="70" rx="18"/></g>
      <g class="small-set"><path d="M84 98 V74 C84 32 156 32 156 74 V98" fill="none" stroke="#8ea0b5" stroke-width="6" stroke-linecap="round"/><rect x="68" y="72" width="32" height="50" rx="13" fill="#172230" stroke="#d8c93f" stroke-width="2"/><rect x="140" y="72" width="32" height="50" rx="13" fill="#172230" stroke="#d8c93f" stroke-width="2"/></g>
    </svg>`,
    cabin: `<svg class="prod-art-svg art-cabin" viewBox="0 0 240 140" aria-hidden="true">
      <rect x="8" y="12" width="224" height="62" rx="31" fill="#0d1622" stroke="#56677c" stroke-width="1.5"/>
      ${Array.from({length: 11}, (_, r) => [26, 50].map(y => `<rect class="seat${r < 3 ? ' seat-premium' : ''}" style="--d:${r * 120}ms" x="${36 + r * 17}" y="${y}" width="10" height="12" rx="2"/>`).join('')).join('')}
      <path class="direct" d="M53 80 C58 116 100 120 138 120" pathLength="100" fill="none" stroke="#4dd0e1" stroke-width="2"/>
      <path class="direct-head" d="M132 114 L140 120 L132 126" fill="none" stroke="#4dd0e1" stroke-width="2"/>
      <text class="direct-label" x="148" y="124" fill="#4dd0e1" font-size="10">DIRECT SALES</text>
    </svg>`,
    qc1: `<svg class="prod-art-svg art-qc1" viewBox="0 0 240 140" aria-hidden="true">
      <path d="M30 70 V48 C30 8 100 8 100 48 V70" fill="none" stroke="#8ea0b5" stroke-width="6" stroke-linecap="round"/>
      <rect x="18" y="44" width="24" height="38" rx="10" fill="#172230" stroke="#6f8196" stroke-width="2"/><rect x="88" y="44" width="24" height="38" rx="10" fill="#172230" stroke="#6f8196" stroke-width="2"/>
      <path class="cable" d="M100 82 C108 124 140 64 150 96" pathLength="100" fill="none" stroke="#6f8196" stroke-width="2"/>
      <g class="control-box"><text x="187" y="66" text-anchor="middle" fill="#8b9bb3" font-size="8" letter-spacing=".5">CONTROL BOX</text><rect x="150" y="72" width="74" height="48" rx="5" fill="#121c29" stroke="#6f8196" stroke-width="1.5"/>
      <rect x="158" y="84" width="26" height="9" rx="2" fill="none" stroke="#ffb340" stroke-width="1.5"/><rect x="158" y="99" width="26" height="9" rx="2" fill="none" stroke="#ffb340" stroke-width="1.5"/><text x="191" y="100" fill="#ffb340" font-size="9">2×AAA</text></g>
    </svg>`,
    qc25: `<svg class="prod-art-svg art-qc25" viewBox="0 0 240 140" aria-hidden="true">
      <path d="M82 88 V62 C82 8 158 8 158 62 V88" fill="none" stroke="#8ea0b5" stroke-width="7" stroke-linecap="round"/>
      <rect x="62" y="56" width="40" height="68" rx="17" fill="#172230" stroke="#6f8196" stroke-width="2"/>
      <rect x="138" y="56" width="40" height="68" rx="17" fill="#172230" stroke="#6f8196" stroke-width="2"/>
      <rect x="146" y="70" width="24" height="40" rx="6" fill="#0a1119" stroke="#d8c93f" stroke-dasharray="3 3"/>
      <g class="cell"><rect x="152" y="77" width="12" height="28" rx="2" fill="none" stroke="#ffb340" stroke-width="2"/><rect x="155" y="74" width="6" height="3" fill="#ffb340"/></g>
      <text x="186" y="88" fill="#ffb340" font-size="9">1×AAA</text><text x="186" y="100" fill="#8b9bb3" font-size="8">IN EARCUP</text>
      <text x="8" y="88" fill="#8b9bb3" font-size="8">NO CONTROL</text><text x="8" y="100" fill="#8b9bb3" font-size="8">BOX</text>
    </svg>`
  };

  const batt = (hours, label) => `<div class="prod-batt"><span>${label}</span><i style="--w:${hours / 80 * 100}%"></i><b>${hours} h</b></div>`;

  const slides = [
    {id:'engineering',short:'Engineering',label:'Making the consumer form possible',title:'Engineer the<br><em>whole experience.</em>',caption:'Integrated engineering cycle · Technology ↔ Product. Product requirements shape technical work.',cards:[
      {year:1984,tag:'PATENT',label:'1984 · Combined requirements',title:'One engineering problem',text:'Bose and Carter’s Headphoning patent brings noise reduction, consistent audio response and comfort together.',art:art.patent,refs:[8]},
      {year:2000,tag:'TRIPORT',label:'2000 · Consumer form',title:'Acoustics unlocks the form',text:'Gauger credits Roman Sapiejewski and Bob Maresca’s TriPort work with enabling the consumer model. Smaller packaging had to preserve useful acoustic performance.',art:art.headsetX,refs:[9]}
    ]},
    {id:'design',short:'Design choices',label:'Requirements change the design',title:'Performance<br><em>people can wear.</em>',caption:'QC25 illustrates the trade-offs: performance must be wearable. A usable product still needs customers who recognise its value.',intro:'The product balance',choices:[
      {title:'Comfort and sealing',label:'Comfort and sealing',text:'Cushions and headband support long wear. A comfortable fit must still provide passive isolation; seal and acoustics cannot be designed separately.'},
      {title:'Portability and acoustic space',label:'Portability and acoustic space',text:'Smaller earcups improve portability but constrain acoustic space. Integrated engineering cycle: product requirements guide acoustics; acoustic improvements enable a practical product.'},
      {title:'Power without the external box',label:'Battery and continued playback',text:'QC1 used a separate box with two AAA cells. QC25 houses one AAA in the earcup for up to 35 hours; music still plays after battery depletion.',path:['Packaging requirement','Technical integration','Travel usability']}
    ],refs:[8,9,12,13,15]}
  ];

  const stops = slides.flatMap((s, si) => {
    const builds = s.cards ? s.cards.map(c => c.label) : [s.intro, ...s.choices.map(c => c.label)];
    return builds.map((label, build) => ({slide: si, build, label}));
  });
  const stopOf = (slide, build) => stops.findIndex(s => s.slide === slide && s.build === build);
  const years = [
    {year:1984,tag:'PATENT',stop:0,slides:[0]},
    {year:2000,tag:'CONSUMER FORM',stop:1,slides:[0]},
    {year:2014,tag:'QC25',stop:2,slides:[1]}
  ].map((y,i)=>({...y,side:i%2?'below':'above',x:(y.year-FIRST_YEAR)/(LAST_YEAR-FIRST_YEAR)*100}));

  const cardHtml = (c, i, cite) => `<article class="prod-card" data-build="${i}">
      <p class="prod-card-year">${c.year}<small>${c.tag}</small></p>
      <div class="prod-art">${c.art}</div>
      <h3>${c.title}</h3>
      ${c.text ? `<p class="prod-card-text">${c.text}</p>` : ''}
      ${c.specs ? `<ul class="prod-specs">${c.specs.map((s, k) => `<li style="--i:${k}">${s}</li>`).join('')}</ul>` : ''}
      ${c.batt || ''}
      <p class="prod-refs">${cite(...c.refs)}</p>
    </article>`;

  const designFigure = `<svg class="design-svg" viewBox="0 0 440 330" role="img" aria-label="Schematic QC25 headphones. Numbered markers point to the cushions and headband, the earcup, the battery inside the earcup, and the battery housed in the earcup.">
      <g class="part part-cable"><path d="M118 278 C118 312 64 300 40 322" pathLength="100" fill="none" stroke="#6f8196" stroke-width="3"/></g>
      <g class="part part-band"><path d="M120 170 V120 C120 18 320 18 320 120 V170" fill="none" stroke="#56677c" stroke-width="16" stroke-linecap="round"/><path d="M136 118 C138 46 302 46 304 118" fill="none" stroke="#2f3d4f" stroke-width="8"/></g>
      <g class="part-dims"><rect x="70" y="136" width="100" height="156" rx="46" fill="none" stroke="#56677c" stroke-dasharray="4 5"/><path d="M52 150 V278 M46 150 H58 M46 278 H58" stroke="#d8c93f" stroke-width="1.5" fill="none"/><text x="40" y="214" transform="rotate(-90 40 214)" text-anchor="middle" fill="#d8c93f" font-size="10" letter-spacing="1">LESS BULK</text></g>
      <g class="part part-cup"><rect x="82" y="150" width="76" height="128" rx="36" fill="#172230" stroke="#6f8196" stroke-width="2"/></g>
      <rect x="282" y="150" width="76" height="128" rx="36" fill="#172230" stroke="#6f8196" stroke-width="2"/>
      <g class="part part-cushion"><rect x="152" y="160" width="16" height="108" rx="8" fill="#2a3442" stroke="#4a5b70" stroke-width="2"/><rect x="272" y="160" width="16" height="108" rx="8" fill="#2a3442" stroke="#4a5b70" stroke-width="2"/></g>
      <g class="part part-battery"><rect x="300" y="176" width="40" height="76" rx="10" fill="#0a1119" stroke="#d8c93f" stroke-dasharray="4 3"/><rect x="312" y="188" width="16" height="52" rx="3" fill="none" stroke="#ffb340" stroke-width="2"/><rect x="316" y="184" width="8" height="4" fill="#ffb340"/></g>
      <g class="part-box"><rect x="184" y="270" width="72" height="40" rx="5" fill="#121c29" stroke="#6f8196" stroke-dasharray="4 3"/><text x="220" y="294" text-anchor="middle" fill="#8b9bb3" font-size="10">QC1 BOX</text></g>
      <g class="part part-bt"><path class="wave" d="M370 196 q10 18 0 36" fill="none" stroke="#4dd0e1" stroke-width="2"/><path class="wave wave-2" d="M382 186 q18 28 0 56" fill="none" stroke="#4dd0e1" stroke-width="2"/><rect x="398" y="184" width="30" height="58" rx="5" fill="#0d1a28" stroke="#4dd0e1" stroke-width="1.5"/><path d="M405 198 H421 M405 206 H417 M405 214 H421" stroke="#4dd0e1" stroke-width="2"/><text x="432" y="264" text-anchor="end" fill="#4dd0e1" font-size="10">QC35 · 2016</text></g>
      ${[[220, 26], [62, 138], [352, 164]].map(([x, y], i) => `<g class="badge badge-${i + 1}" transform="translate(${x} ${y})"><circle r="13" fill="#070b12" stroke="#d8c93f" stroke-width="1.5"/><text y="4" text-anchor="middle" fill="#d8c93f" font-size="11">${pad(i + 1)}</text></g>`).join('')}
    </svg>`;

  const designHtml = s => `<div class="prod-design">
      <div class="design-figure" data-build="0">${designFigure}</div>
      <div class="prod-choices">${s.choices.map((c, i) => `<article class="prod-choice" data-build="${i + 1}"><span class="choice-n">${pad(i + 1)}</span><div class="choice-main"><h3>${c.title}</h3><div class="choice-body"><div><p>${c.text}</p>${c.path ? `<p class="choice-path">${c.path.map(p => `<span>${p}</span>`).join('<b>→</b>')}</p>` : ''}</div></div></div></article>`).join('')}</div>
    </div>`;

  function html(cite) {
    return `<div class="prod-chapter">
      <div class="prod-topline"><span>PRODUCT CREATION</span><span>CLICK, SCROLL OR PRESS → TO BUILD EACH SLIDE</span></div>
      <div class="prod-rail" aria-hidden="true"><div class="prod-rail-track"><i class="prod-rail-fill"></i></div>${years.map(y => `<span class="prod-year ${y.side}" style="--x:${y.x}%"><i></i><span>${y.year}${y.tag ? `<small> ${y.tag}</small>` : ''}</span></span>`).join('')}</div>
      <div class="prod-stage" data-click-advance>
        ${slides.map((s, si) => `<article class="prod-scene prod-scene-${s.id}" data-scene="${si}" ${si ? 'hidden inert' : ''} aria-label="Slide ${si + 1}: ${s.label}">
          <div class="prod-copy"><p class="prod-label">${pad(si + 1)} / ${pad(slides.length)} <span>${s.label}</span></p><h2>${s.title}</h2><p class="prod-caption">${s.caption}</p>
          ${s.refs ? `<p class="prod-scope">Design implications are our interpretation of documented features and engineering testimony. ${cite(...s.refs)}</p>` : ''}</div>
          ${s.cards ? `<div class="prod-cards" style="--n:${s.cards.length}">${s.cards.map((c, i) => cardHtml(c, i, cite)).join('')}</div>` : designHtml(s)}
        </article>`).join('')}
      </div>
      <div class="prod-bottom">
        <nav class="prod-slide-nav" aria-label="Product creation slides">${slides.map((s, si) => `<button type="button" data-prod-jump="${stopOf(si, 0)}" aria-label="Slide ${si + 1}: ${s.label}"><span>${pad(si + 1)} <b>${s.short}</b></span><span class="pips">${stops.filter(st => st.slide === si).map(() => '<i></i>').join('')}</span></button>`).join('')}</nav>
        <button type="button" class="prod-next-cue" data-chapter-next>CLICK TO CONTINUE → <b>Next</b></button>
      </div>
    </div>`;
  }

  function markBuilds(scope, build) {
    scope.querySelectorAll('[data-build]').forEach(el => {
      if (el.classList.contains('design-figure')) return;
      const b = Number(el.dataset.build);
      el.classList.toggle('is-on', b <= build);
      el.classList.toggle('is-current', b === build);
    });
  }

  function show(index) {
    const root = document.querySelector('.prod-chapter'); if (!root) return;
    const {slide, build} = stops[index];
    root.querySelectorAll('.prod-scene').forEach((scene, si) => {
      const wasHidden = scene.hidden;
      scene.hidden = si !== slide; scene.inert = si !== slide;
      if (si === slide && wasHidden) { scene.classList.remove('scene-enter'); void scene.offsetWidth; scene.classList.add('scene-enter'); }
    });
    const scene = root.querySelector(`[data-scene="${slide}"]`);
    markBuilds(scene, build);
    const figure = scene.querySelector('.design-figure');
    if (figure) {
      figure.dataset.build = String(build);
      [1, 2, 3, 4].forEach(n => figure.classList.toggle(`upto-${n}`, build >= n));
    }
    const focusYear = [...years].reverse().find(y => y.stop <= index);
    root.querySelectorAll('.prod-year').forEach((el, i) => {
      const y = years[i];
      el.classList.toggle('on', y.stop <= index);
      el.classList.toggle('current', y === focusYear);
      el.classList.toggle('in-slide', y.slides.includes(slide));
    });
    root.querySelector('.prod-rail-fill').style.width = `${focusYear.x}%`;
    root.querySelectorAll('[data-prod-jump]').forEach((button, si) => {
      if (si === slide) button.setAttribute('aria-current', 'step'); else button.removeAttribute('aria-current');
      button.querySelectorAll('.pips i').forEach((pip, b) => pip.classList.toggle('on', si < slide || (si === slide && b <= build)));
    });
    root.querySelector('.prod-next-cue b').textContent = index === stops.length - 1 ? 'Next: market transitions' : `Next: ${stops[index + 1].label}`;
  }

  const progressLabel = i => `03 / PRODUCT · SLIDE ${stops[i].slide + 1} OF ${slides.length} · ${stops[i].label.toUpperCase()}`;
  const announce = i => `Product creation, slide ${stops[i].slide + 1} of ${slides.length}: ${stops[i].label}`;
  return {steps: stops, html, show, progressLabel, announce, lockMs: 650};
})();
