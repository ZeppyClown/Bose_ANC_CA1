/* Content is based on the supplied Bose ANC CA1 Research Report.
   Citation IDs retain the report's numbering. No framework or build step. */
const sources = [
  [1,'Berkhout, Hartmann & Trott · Cyclic Innovation Model','2010 · R&D Management; report inspected the abstract','https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1467-9310.2010.00618.x'],
  [2,'Paul Lueg · Process of silencing sound oscillations','1936 · US 2043416','https://patents.google.com/patent/US2043416A/en'],
  [3,'Kuo & Morgan · Active noise control: a tutorial review','1999 · Proceedings of the IEEE','https://www.researchgate.net/publication/2985088_Active_noise_control_a_tutorial_review'],
  [4,'Shi et al. · Active Noise Control in the New Century','2023 · arXiv preprint','https://arxiv.org/abs/2306.01425'],
  [5,'Wolfson · Ambient noise cancellation','2010 · Supplier white paper','https://d3uzseaevmutz1.cloudfront.net/pubs/whitePaper/WP_Ambient_noise_cancellation_for_headphones_and_handsets.pdf'],
  [6,'Analog Devices · Bowers & Wilkins headphones','Generic hybrid architecture; not Bose supplier evidence','https://www.analog.com/en/signals/articles/bowers-wilkins-noise-canceling-headphones.html'],
  [7,'Bose Timeline · The Seventies','Company history · 1978 flight','https://timeline.bose.com/decade/the-seventies'],
  [8,'Bose & Carter · Headphoning','1984 · US 4455675','https://patents.google.com/patent/US4455675A/en'],
  [9,'Dan Gauger · First-person engineering account','Crutchfield · 2020 interview, updated 2025','https://www.crutchfield.com/learn/bose-noise-cancelling-engineer-interview.html'],
  [10,'AOPA · Bose celebrates 25 years in aviation','2014 · Includes Bose executive testimony','https://www.aopa.org/news-and-media/all-news/2014/may/13/bose-celebrates-25-years-in-aviation'],
  [11,'Bose Timeline · The Nineties','Company history · Headset X and American Airlines','https://timeline.bose.com/decade/the-nineties'],
  [12,'Bose · Original QuietComfort owner guide','2001 · Consumer headset manual','https://products.bose.com/pdf/customer_service/owners/qc1_guide.pdf'],
  [13,'Bose · QC25 product release','2015 · Australia / New Zealand; manufacturer specifications','https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/pressroom/2015/bose-quietcomfort-25-acoustic-noise-cancelling-headphones/Bose_Introduces_QuietComfort_25_Acoustic_Noise_Cancelling_Headphones_en_nz.pdf'],
  [14,'Bose · QC25 US launch announcement','2014 · Reproduced by Headphone Zone','https://www.headphonezone.com/news/bose/bose-quietcomfort-acoustic-noise-cancelling-headphones.htm'],
  [15,'RTINGS · QuietComfort 25 review','Independent testing · comfort, isolation and limitations','https://www.rtings.com/headphones/reviews/bose/quietcomfort-25-qc25'],
  [16,'1010data / TWICE · 2015 ecommerce results','2016 · US online purchase panel','https://www.twice.com/blog/2015-1010data-ecommerce-awards-presented-twice-59992'],
  [17,'NPD · Bluetooth headphone sales','2016 · Broader category, not QC35-only','https://www.prweb.com/releases/bluetooth_capable_headphone_sales_surpass_non_bluetooth_sales_in_june/prweb13581918.htm'],
  [18,'Bose · Wireless QC launch release','2016 · QC35 availability and specifications','https://www.bose.com/pressroom/bose_introduces_wireless_qc_noise_cancelling_headphones_and_wireless_sport_headphones'],
  [19,'MIT · Amar Bose stock donation','2011 · Private ownership and research orientation','https://news.mit.edu/2011/bose-gift'],
  [20,'Bose · Complaint against Beats','2014 · Party assertions, not court findings','https://cdn1.vox-cdn.com/assets/4811900/BoseBeatsComplaint.pdf'],
  [21,'Bose · QuietComfort 45 announcement','2021 · Manufacturer adoption and feature claims','https://www.bose.com/pressroom/bose-introduces-quietcomfort-45']
];
const cite = (...ids) => `<span class="citations">${ids.map(id => `<a href="${sources.find(s=>s[0]===id)[3]}" target="_blank" rel="noopener noreferrer" aria-label="Source ${id}">[${String(id).padStart(2,'0')}]</a>`).join(' ')}</span>`;
const wavePath = (amplitude=26) => {
  let d=''; for(let x=-100;x<=700;x+=2) d+=`${x===-100?'M':'L'}${x} ${(Math.sin(x*Math.PI/25)*amplitude).toFixed(2)} `; return d;
};
const wave = (kind='noise', amplitude=26) => `<svg class="wave-svg ${kind}" viewBox="0 -42 500 84" preserveAspectRatio="none" aria-hidden="true"><path class="wave-path" d="${wavePath(amplitude)}"/></svg>`;
const headphones = id => `<svg class="headphones" viewBox="0 0 620 590" role="img" aria-label="Schematic illustration of over-ear noise-cancelling headphones, not an exact product rendering">
 <defs><linearGradient id="band-${id}" x1="0" x2="1" y2=".5"><stop stop-color="#161d27"/><stop offset=".3" stop-color="#748397"/><stop offset=".52" stop-color="#263243"/><stop offset=".8" stop-color="#6b7c90"/><stop offset="1" stop-color="#172230"/></linearGradient><linearGradient id="cup-${id}"><stop stop-color="#0d131d"/><stop offset=".48" stop-color="#3b4b60"/><stop offset="1" stop-color="#131f30"/></linearGradient><linearGradient id="rim-${id}"><stop stop-color="#7e8fa4"/><stop offset=".4" stop-color="#293749"/><stop offset="1" stop-color="#101722"/></linearGradient><radialGradient id="glow-${id}"><stop stop-color="#4dd0e1" stop-opacity=".17"/><stop offset="1" stop-color="#4dd0e1" stop-opacity="0"/></radialGradient></defs>
 <circle cx="320" cy="300" r="260" fill="url(#glow-${id})"/>
 <g transform="rotate(-13 310 300)"><path d="M139 351 V240 C139 31 482 31 482 240 V351" fill="none" stroke="#060910" stroke-width="46"/><path d="M139 329 V240 C139 38 482 38 482 240 V329" fill="none" stroke="url(#band-${id})" stroke-width="29"/><path d="M151 237 C153 52 467 52 470 237" fill="none" stroke="#101720" stroke-width="14"/><path d="M141 263 L136 385 M482 263 L487 385" stroke="url(#rim-${id})" stroke-width="19"/>
 <g transform="rotate(-9 145 400)"><rect x="84" y="308" width="100" height="196" rx="47" fill="#070a11" stroke="#293442" stroke-width="4"/><rect x="103" y="309" width="90" height="188" rx="43" fill="url(#rim-${id})"/><rect x="111" y="320" width="72" height="164" rx="35" fill="url(#cup-${id})"/><path d="M127 347 V455" stroke="#627183" opacity=".45"/></g>
 <g transform="rotate(9 479 400)"><rect x="433" y="309" width="106" height="196" rx="49" fill="#080c14" stroke="#293442" stroke-width="4"/><rect x="421" y="309" width="92" height="188" rx="44" fill="url(#rim-${id})"/><rect x="429" y="320" width="75" height="164" rx="35" fill="url(#cup-${id})"/><path d="M488 349 V451" stroke="#8a9aab" opacity=".35"/><circle cx="473" cy="459" r="3" fill="#4dd0e1"/><text x="466" y="410" text-anchor="middle" fill="#9badc1" font-size="12" letter-spacing="3" transform="rotate(-90 466 410)">QUIET</text></g></g></svg>`;
const plane = `<svg viewBox="0 0 80 80" fill="none" aria-hidden="true"><path d="M39 11 L45 32 L66 46 V51 L44 44 V62 L51 68 V71 L40 67 L29 71 V68 L36 62 V44 L14 51 V46 L35 32 Z" stroke="currentColor" stroke-width="1.5"/></svg>`;
const seat = `<svg viewBox="0 0 80 80" fill="none" aria-hidden="true"><path d="M23 16 H35 L42 42 H62 V53 H32 L23 16Z M34 54 L29 68 M56 54 L61 68 M46 33 H66 M57 33 V42" stroke="currentColor" stroke-width="1.5"/><path d="M13 14 V60 H24" stroke="currentColor" opacity=".35"/></svg>`;
const city = `<svg viewBox="0 0 80 80" fill="none" aria-hidden="true"><path d="M12 67 V35 H29 V19 H48 V42 H66 V67 M9 67 H70 M35 28 H41 M35 36 H41 M35 44 H41 M18 44 H23 M18 52 H23 M53 51 H60 M53 59 H60" stroke="currentColor" stroke-width="1.5"/></svg>`;
const cim = `<svg class="cim-svg" viewBox="0 0 640 560" role="img" aria-label="Cyclic Innovation Model. Entrepreneurship at the centre connects scientific exploration on the left, technological research above, product creation on the right, and market transitions below. Each adjacent pair exchanges information in both directions.">
 <defs><marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto-start-reverse"><path d="M0 0 L6 3 L0 6" fill="#8092ae"/></marker></defs>
 <circle class="cim-orbit" cx="320" cy="280" r="190"/>
 <g class="cim-hub"><path d="M320 137 L364 236 L463 280 L364 324 L320 423 L276 324 L177 280 L276 236 Z" fill="#3d8fc4" fill-opacity=".23" stroke="#3d8fc4"/><text x="320" y="277" text-anchor="middle" fill="#e9eef7" font-weight="600" font-size="16">Entrepreneurship</text><text x="320" y="302" text-anchor="middle" fill="#8cbadd" font-size="10" letter-spacing="2">CONNECT & COMMIT</text></g>
 <g class="cim-arcs" fill="none" stroke="#8092ae" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"><path class="cycle-arc arc-0" d="M146 197 Q185 124 241 116"/><path class="cycle-arc arc-1" d="M399 116 Q455 124 494 197"/><path class="cycle-arc arc-2" d="M494 363 Q455 436 399 444"/><path class="cycle-arc arc-3" d="M241 444 Q185 436 146 363"/></g>
 <g class="cim-node node-0"><circle cx="130" cy="280" r="70" fill="#e0913a" fill-opacity=".15" stroke="#e0913a"/><text x="130" y="275" text-anchor="middle" fill="#e0913a" font-size="16">Scientific</text><text x="130" y="297" text-anchor="middle" fill="#e0913a" font-size="16">exploration</text></g>
 <g class="cim-node node-1"><circle cx="320" cy="90" r="70" fill="#9bb84a" fill-opacity=".15" stroke="#9bb84a"/><text x="320" y="85" text-anchor="middle" fill="#b8cf7b" font-size="16">Technological</text><text x="320" y="107" text-anchor="middle" fill="#b8cf7b" font-size="16">research</text></g>
 <g class="cim-node node-2"><circle cx="510" cy="280" r="70" fill="#d8c93f" fill-opacity=".15" stroke="#d8c93f"/><text x="510" y="275" text-anchor="middle" fill="#d8c93f" font-size="16">Product</text><text x="510" y="297" text-anchor="middle" fill="#d8c93f" font-size="16">creation</text></g>
 <g class="cim-node node-3"><circle cx="320" cy="470" r="70" fill="#9a7bc0" fill-opacity=".15" stroke="#9a7bc0"/><text x="320" y="465" text-anchor="middle" fill="#bca2de" font-size="16">Market</text><text x="320" y="487" text-anchor="middle" fill="#bca2de" font-size="16">transitions</text></g>
 <g class="cim-labels" text-anchor="middle" fill="#b6c2d6" font-size="11"><text x="211" y="202"><tspan x="211">Natural and life</tspan><tspan x="211" dy="15">sciences cycle</tspan></text><text x="429" y="202"><tspan x="429">Integrated</tspan><tspan x="429" dy="15">engineering cycle</tspan></text><text x="429" y="351"><tspan x="429">Differentiated</tspan><tspan x="429" dy="15">services cycle</tspan></text><text x="211" y="349"><tspan x="211">Social and behavioural</tspan><tspan x="211" dy="15">sciences cycle</tspan></text></g>
 <g class="cim-labels" fill="#8b9bb3" font-size="10" text-anchor="middle"><text x="102" y="101"><tspan x="102">CREATE</tspan><tspan x="102" dy="16">technical capabilities</tspan></text><text x="538" y="101"><tspan x="538">CREATE</tspan><tspan x="538" dy="16">technical functions</tspan></text><text x="538" y="465"><tspan x="538">CREATE</tspan><tspan x="538" dy="16">customer value</tspan></text><text x="102" y="465"><tspan x="102">CREATE</tspan><tspan x="102" dy="16">social insights</tspan></text></g></svg>`;
const sections = [
 {id:'opening',name:'Introduction',chapter:'INTRODUCTION',speaker:'A',html:IntroChapter.html(cite,`<div class="hero-grid"><div class="hero-copy"><p class="eyebrow reveal">ET5218 CA1 · BOSE QUIETCOMFORT</p><h1 class="reveal hero-title-long">Engineering a market through the <em>Cyclic Innovation Model.</em></h1><p class="hero-description reveal">How entrepreneurship connected science, technology, product and market.</p><div class="team reveal"><span>TEAM</span><p class="team-names">${['Shawn Tan','Wu Guan Tong David','Yap Kai Xiang','Chua Victor','Khoo Kai Yih','Kasahara Kei'].map(n=>`<span>${n}</span>`).join('<i>/</i>')}</p></div>${cite(7,9,10)}</div><div class="hero-art reveal"><div class="orbital orbital-a"></div><div class="orbital orbital-b"></div><div class="art-cross cross-a">+</div><div class="art-cross cross-b">+</div>${headphones('hero')}<div class="art-label"><span class="live-dot"></span> NOISE ↓ &nbsp; POSSIBILITY ↑</div><span class="schematic-label">CONCEPT ILLUSTRATION / NOT TO SCALE</span></div></div>`)},
 {id:'science',name:'Scientific exploration',chapter:'01 / THE PRINCIPLE',speaker:'B',html:ScienceChapter.html(cite)},
 {id:'technology',name:'Technological research',chapter:'02 / MAKING THE PRINCIPLE WORK',speaker:'C',html:TechnologyChapter.html(cite)},
 {id:'product',name:'Product creation',chapter:'03 / A PRODUCT PEOPLE WILL WEAR',speaker:'D',html:ProductChapter.html(cite)},
 {id:'market',name:'Market transitions',chapter:'04 / MARKET TRANSITIONS',speaker:'E',html:MarketChapter.html(cite)},
 {id:'cim',name:'Entrepreneurship: connected decisions',chapter:'05 / WHO CONNECTED THE WORK?',speaker:'F',html:EntrepreneurshipChapter.html(cite)},
 {id:'conclusion',name:'Conclusion',chapter:'07 / A COMBINATION, NOT A SINGLE CAUSE',speaker:'A',html:ConclusionChapter.html(cite)},
 {id:'thank-you',name:'Thank you',chapter:'08 / THANK YOU',speaker:'A',html:`<div class="thank-you-slide" data-click-advance><p class="eyebrow reveal">BOSE QUIETCOMFORT · CYCLIC INNOVATION MODEL</p><h2 class="reveal">Thank you.</h2><p class="thank-you-subtitle reveal">Questions & discussion</p><button class="story-next reveal" data-chapter-next>View sources →</button></div>`},
 {id:'sources',name:'Sources',chapter:'09 / SOURCES',speaker:'A',html:`<div class="sources-slide"><h2 class="reveal">Sources</h2><div class="source-heading reveal"><span>THE EVIDENCE REGISTER</span><span>21 SOURCES / NUMBERING MATCHES THE RESEARCH REPORT</span></div><div class="sources-grid">${sources.map(([id,title,detail,url])=>`<a class="source-item" href="${url}" target="_blank" rel="noopener noreferrer"><span>${String(id).padStart(2,'0')}</span><div><b>${title}</b><p>${detail}</p></div><i>↗</i></a>`).join('')}</div><p class="scope">Source register transcribed from the supplied research report (10 September 2026). Manufacturer claims, first-person testimony and independent evidence are distinguished. External pages may change. The lecture diagram is an additional course reference.</p></div>`}
];

const deck = document.querySelector('#deck');
// Fragment names deliberately differ from DOM IDs: native anchor scrolling can
// scroll even an overflow-hidden body and break the translated viewport model.
deck.innerHTML = sections.map((s,i)=>`<section id="panel-${s.id}" class="section section-${s.id}" aria-labelledby="section-title-${i}" ${i?'inert aria-hidden="true"':''}><div class="section-scroll" tabindex="0" role="region" aria-label="${s.name} content"><div class="section-inner">${s.html}</div></div><span class="sr-only" id="section-title-${i}">${s.name}</span></section>`).join('');
const sectionEls = [...deck.children];
deck.style.setProperty('--sections', sections.length);
document.querySelector('#page-total').textContent=String(sections.length).padStart(2,'0');
const rail = document.querySelector('#rail');
rail.innerHTML = sections.map((s,i)=>`<button class="rail-marker" data-index="${i}" aria-label="${i+1}. ${s.name}" ${i?'':'aria-current="step"'}><span>${s.name}</span></button>`).join('');
document.querySelectorAll('.section').forEach(section => section.querySelectorAll('.reveal').forEach((el,i)=>el.style.setProperty('--delay',`${Math.min(i,8)*110}ms`)));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let current = 0, locked = false, lockTimer, accumulator = 0, wheelIdleTimer, wheelGestureUsed = false;
const steppedChapters = {opening: IntroChapter, science: ScienceChapter, technology: TechnologyChapter, product: ProductChapter, market: MarketChapter, cim: EntrepreneurshipChapter, conclusion: ConclusionChapter};
const chapterAt = index => steppedChapters[sections[index]?.id];
let chapterStep = 0;
let touchY = null, touchX = null, touchStartTarget = null;
const dialog = document.querySelector('#help-dialog');
const duration = () => reducedMotion.matches ? 0 : 1050;
function resize() {
  document.body.scrollTop=0;document.documentElement.scrollTop=0;
  document.documentElement.style.setProperty('--vh', `${innerHeight}px`);
  deck.style.transition = 'none';
  deck.style.transform = `translate3d(0, ${-current*innerHeight}px, 0)`;
  void deck.offsetWidth;
  deck.style.transition = '';
}
function countUp(section) {
  section.querySelectorAll('.count').forEach(el=>{
    const value=Number(el.dataset.value), decimals=Number(el.dataset.decimals||0);
    const format = n => `${el.dataset.prefix||''}${n.toFixed(decimals)}${el.dataset.suffix||''}`;
    if(reducedMotion.matches){el.textContent=format(value);return;}
    const start=performance.now();
    const frame=now=>{if(!section.classList.contains('active'))return;const p=Math.min((now-start)/1100,1);el.textContent=format(value*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(frame);};
    el.textContent=format(0);requestAnimationFrame(frame);
  });
}
function activate(index, {initial=false, updateHash=true, chapterEntry=0}={}) {
  index=Math.max(0,Math.min(sections.length-1,index));
  if(!initial&&(locked||index===current)) return false;
  const oldSection=sectionEls[current];
  if(oldSection.contains(document.activeElement)) document.activeElement.blur();
  current=index;
  document.body.scrollTop=0;document.documentElement.scrollTop=0;
  sectionEls.forEach((el,i)=>{el.classList.remove('active');el.inert=i!==index;el.setAttribute('aria-hidden',String(i!==index));});
  const active=sectionEls[index];void active.offsetWidth;active.classList.add('active');
  const chapter=chapterAt(index);
  if(chapter){
    chapterStep=chapterEntry==='last'?chapter.steps.length-1:chapterEntry;
    chapter.show(chapterStep);
    active.querySelector('.section-scroll').scrollTop=0;
  }
  deck.style.transform=`translate3d(0, ${-index*innerHeight}px, 0)`;
  rail.querySelectorAll('button').forEach((b,i)=>{if(i===index)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
  document.querySelector('#progress-fill').style.width=`${index/(sections.length-1)*100}%`;
  document.querySelector('#page-number').textContent=String(index+1).padStart(2,'0');
  document.querySelector('#chapter-label').textContent=sections[index].chapter;
  document.querySelector('#previous').disabled=index===0;
  document.querySelector('#next').disabled=index===sections.length-1;
  document.querySelector('#announcement').textContent=`Section ${index+1} of ${sections.length}: ${sections[index].name}`;
  if(index>0)document.body.classList.add('has-advanced');
  if(updateHash)history.replaceState(null,'',currentHash());
  updateChapterProgress();
  countUp(active);accumulator=0;
  if(!initial){locked=true;clearTimeout(lockTimer);lockTimer=setTimeout(()=>{locked=false;},duration()+140);}
  return true;
}
function scrollArea(){return sectionEls[current].querySelector('.section-scroll');}
function canScrollInside(direction){const el=scrollArea();return direction>0?el.scrollTop+el.clientHeight<el.scrollHeight-2:el.scrollTop>2;}
function currentHash(){const id=sections[current].id;return chapterAt(current)&&chapterStep>0?`#${id}-${chapterStep+1}`:`#${id}`;}
function updateChapterProgress(){
  const chapter=chapterAt(current);if(!chapter)return;
  document.querySelector('#progress-fill').style.width=`${(current+chapterStep/chapter.steps.length)/(sections.length-1)*100}%`;
  document.querySelector('#chapter-label').textContent=chapter.progressLabel(chapterStep);
  document.querySelector('#announcement').textContent=chapter.announce(chapterStep);
}
function goChapterStep(index,{updateHash=true}={}){
  const chapter=chapterAt(current);
  if(locked||!chapter||index<0||index>=chapter.steps.length||index===chapterStep)return false;
  const focused=document.activeElement;
  if(sectionEls[current].contains(focused)&&!focused.closest('[data-tech-jump],[data-prod-jump],[data-story-jump],[data-chapter-next]'))focused.blur();
  chapterStep=index;chapter.show(index);scrollArea().scrollTop=0;
  document.body.scrollTop=0;document.documentElement.scrollTop=0;
  if(updateHash)history.replaceState(null,'',currentHash());
  updateChapterProgress();accumulator=0;locked=true;clearTimeout(lockTimer);
  lockTimer=setTimeout(()=>{locked=false;},reducedMotion.matches?140:chapter.lockMs);
  return true;
}
function navigate(direction){
  if(locked)return;
  const chapter=chapterAt(current);
  if(chapter&&chapterStep+direction>=0&&chapterStep+direction<chapter.steps.length){goChapterStep(chapterStep+direction);return;}
  activate(current+direction,{chapterEntry:direction<0?'last':0});
}
addEventListener('wheel',event=>{
  if(dialog.open||event.ctrlKey)return;
  event.preventDefault();
  clearTimeout(wheelIdleTimer);
  wheelIdleTimer=setTimeout(()=>{accumulator=0;wheelGestureUsed=false;},180);
  if(locked||wheelGestureUsed)return;
  const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);
  if(Math.abs(delta)<Math.abs(event.deltaX))return;
  const direction=Math.sign(delta);
  if(canScrollInside(direction)){scrollArea().scrollTop+=delta;return;}
  if(accumulator&&Math.sign(accumulator)!==direction)accumulator=0;
  accumulator+=delta;
  if(Math.abs(accumulator)>24){wheelGestureUsed=true;navigate(direction);accumulator=0;}
},{passive:false});
addEventListener('keydown',event=>{
  if(dialog.open||event.altKey||event.ctrlKey||event.metaKey||/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)||event.target.isContentEditable)return;
  if(event.key==='?' ){event.preventDefault();dialog.showModal();return;}
  if(event.key.toLowerCase()==='f'){event.preventDefault();toggleFullscreen();return;}
  if((event.key===' '||event.key==='Enter')&&event.target.closest('button,a'))return;
  const directions={ArrowDown:1,ArrowRight:1,PageDown:1,' ':event.shiftKey?-1:1,ArrowUp:-1,ArrowLeft:-1,PageUp:-1};
  if(event.key==='Home'||event.key==='End'){event.preventDefault();if(!event.repeat)activate(event.key==='Home'?0:sections.length-1);return;}
  const direction=directions[event.key];if(!direction)return;
  event.preventDefault();if(locked||event.repeat)return;
  if(canScrollInside(direction)){scrollArea().scrollBy({top:direction*innerHeight*.65,behavior:reducedMotion.matches?'instant':'smooth'});return;}
  navigate(direction);
});
addEventListener('touchstart',event=>{if(dialog.open||event.touches.length!==1){touchY=null;return;}touchY=event.touches[0].clientY;touchX=event.touches[0].clientX;touchStartTarget=event.target;},{passive:true});
addEventListener('touchmove',event=>{
  if(dialog.open||touchY===null)return;
  event.preventDefault();
},{passive:false});
addEventListener('touchend',event=>{
  if(dialog.open||touchY===null||!event.changedTouches.length)return;
  const delta=touchY-event.changedTouches[0].clientY, x=touchX-event.changedTouches[0].clientX;touchY=null;
  if(locked||Math.abs(delta)<44||Math.abs(x)>Math.abs(delta)||touchStartTarget.closest('button'))return;
  const direction=Math.sign(delta);if(canScrollInside(direction)){scrollArea().scrollTop+=delta;return;}navigate(direction);
},{passive:true});
addEventListener('touchcancel',()=>{touchY=null;},{passive:true});
rail.addEventListener('click',event=>{const button=event.target.closest('button');if(button)activate(Number(button.dataset.index));});
deck.addEventListener('click',event=>{
  const jump=event.target.closest('[data-tech-jump],[data-prod-jump],[data-story-jump]');
  if(jump){goChapterStep(Number(jump.dataset.techJump??jump.dataset.prodJump??jump.dataset.storyJump));return;}
  if(event.target.closest('[data-chapter-next]')){navigate(1);return;}
  // Clicking a stage advances like a presentation clicker; links, buttons and text selection are left alone.
  if(!event.target.closest('[data-click-advance]')||event.target.closest('a,button,video')||String(getSelection()))return;
  navigate(1);
});
document.querySelector('#previous').addEventListener('click',()=>navigate(-1));
document.querySelector('#next').addEventListener('click',()=>navigate(1));
document.querySelector('.brand').addEventListener('click',event=>{event.preventDefault();if(current===0)goChapterStep(0);else activate(0);});
document.querySelector('#help-open').addEventListener('click',()=>dialog.showModal());
document.querySelector('#print-deck').addEventListener('click',()=>{dialog.close();window.print();});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
async function toggleFullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();}catch{document.querySelector('#announcement').textContent='Full screen is unavailable in this browser.';}}
addEventListener('resize',resize);
function readLocation(){
  // Keep the previous feedback links useful after consolidating F into one chapter.
  const legacy=location.hash.match(/^#cycle(?:-(\d+))?$/);
  if(legacy)return {index:sections.findIndex(s=>s.id==='cim'),step:({1:0,2:1,3:4,4:3})[Number(legacy[1]||1)]??0};
  const match=location.hash.match(new RegExp(`^#(${Object.keys(steppedChapters).join('|')})(?:-(\\d+))?$`));
  if(match)return {index:sections.findIndex(s=>s.id===match[1]),step:Math.max(0,Math.min(steppedChapters[match[1]].steps.length-1,Number(match[2]||1)-1))};
  return {index:sections.findIndex(s=>`#${s.id}`===location.hash),step:0};
}
addEventListener('hashchange',()=>{const target=readLocation();if(target.index>=0){clearTimeout(lockTimer);locked=false;if(chapterAt(current)&&target.index===current)goChapterStep(target.step,{updateHash:false});else activate(target.index,{updateHash:false,chapterEntry:target.step});}});
reducedMotion.addEventListener('change',()=>{clearTimeout(lockTimer);locked=false;resize();});
resize();
const initialTarget=readLocation();
activate(initialTarget.index<0?0:initialTarget.index,{initial:true,chapterEntry:initialTarget.step});
