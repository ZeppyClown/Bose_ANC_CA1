/* Market transitions: animated explanatory diagrams. Each transition has one SVG with a layer per click;
   market.js shows the layer matching the current build. Illustrations, not measurements, except the
   2015 share bars, which plot the 1010data figures from the research report [16]. */
window.MarketVisuals = (() => {
  const C = {noise: '#ff6b57', anti: '#bca2de', purple: '#9a7bc0', quiet: '#8fd694', cyan: '#4dd0e1', ink: '#e9eef7', ink2: '#b6c2d6', muted: '#76839a', line: '#33445a', box: '#121c29'};
  const sine = (amp, width, period, y0 = 0) => { let d = ''; for (let x = 0; x <= width; x += 4) d += `${x ? 'L' : 'M'}${x} ${(y0 + Math.sin(x / period * Math.PI * 2) * amp).toFixed(1)} `; return d; };
  const box = (x, y, w, h, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${C.box}" stroke="${C.line}" stroke-width="1.5" ${extra}/>`;
  const two = (x, y, top, bottom, topFill = C.muted, anchor = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anchor}" class="t-mono" fill="${topFill}">${top}</text><text x="${x}" y="${y + 24}" text-anchor="${anchor}" class="t-big" fill="${C.ink}">${bottom}</text>`;
  const svg = (label, layers) => `<svg class="mkt-svg" viewBox="0 0 640 360" role="img" aria-label="${label}">${layers.map((l, i) => `<g class="mkt-layer" data-layer="${i}">${l}</g>`).join('')}</svg>`;
  const headset = (x, y, s = 1, fill = C.purple) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-40 -6 A42 42 0 0 1 40 -6" fill="none" stroke="${C.anti}" stroke-width="6"/><rect x="-52" y="-22" width="20" height="46" rx="8" fill="${fill}"/><rect x="32" y="-22" width="20" height="46" rx="8" fill="${fill}"/></g>`;

  /* Transition 1 · aviation */
  const aviation = svg('Aviation. Engine noise reaches a pilot and an ANC headset makes it quiet at the ear; prototypes were too costly for consumers so Bose chose pilots; the 1986 Voyager flight led to the 1989 aviation headset and the smaller Headset X in 1998.', [
    `<text x="32" y="40" class="t-mono" fill="${C.muted}">IN THE COCKPIT</text>
     <g transform="translate(96 190)"><circle r="46" fill="${C.box}" stroke="${C.line}" stroke-width="2"/><g class="a-spin"><path d="M0 -40 L7 0 L0 40 L-7 0Z M-40 0 L0 7 L40 0 L0 -7Z" fill="#8ea0b5"/></g><circle r="7" fill="${C.ink}"/></g>
     <g fill="none" stroke="${C.noise}" stroke-width="2">${[0, 1, 2].map(i => `<circle class="a-ripple" cx="96" cy="190" r="52" style="--d:${i * .9}s"/>`).join('')}</g>
     <text x="96" y="272" text-anchor="middle" class="t-mono" fill="${C.noise}">ENGINE NOISE</text>
     <clipPath id="mkt-av-noise"><rect x="150" y="130" width="262" height="120"/></clipPath>
     <g clip-path="url(#mkt-av-noise)"><g transform="translate(150 190)"><path class="a-travel" d="${sine(26, 700, 70)}" stroke="${C.noise}" stroke-width="3" fill="none"/></g></g>
     <circle cx="500" cy="190" r="56" fill="#1a2332" stroke="${C.line}" stroke-width="2"/>
     <circle class="a-halo" cx="448" cy="192" r="34" fill="${C.quiet}" fill-opacity=".16" stroke="${C.quiet}"/>
     ${headset(500, 186, 1.35)}
     <g class="a-bubble"><rect x="520" y="60" width="104" height="44" rx="10" fill="${C.box}" stroke="${C.line}"/><path d="M540 104 L532 120 L556 104" fill="${C.box}" stroke="${C.line}"/><text x="572" y="87" text-anchor="middle" class="t-mono" fill="${C.ink2}">SPEECH</text></g>
     <text x="480" y="290" text-anchor="middle" class="t-mono" fill="${C.quiet}">QUIET AT THE EAR</text>
     <text x="280" y="310" text-anchor="middle" class="t-small" fill="${C.muted}">Noise masks speech and music</text>`,
    `<text x="32" y="40" class="t-mono" fill="${C.muted}">WHERE SHOULD IT LAUNCH?</text>
     ${box(30, 150, 190, 66)}${two(125, 176, '1981', 'Working prototype')}
     <path class="a-draw" d="M220 172 C300 172 300 96 378 96" pathLength="100" fill="none" stroke="${C.noise}" stroke-width="3"/>
     <path class="a-draw" style="--d:.5s" d="M220 194 C300 194 300 270 378 270" pathLength="100" fill="none" stroke="${C.quiet}" stroke-width="3"/>
     <g class="a-pop" style="--d:.6s">${box(380, 60, 230, 72, `stroke="${C.noise}"`)}${two(470, 88, 'CONSUMERS', 'Too costly', C.noise)}<text x="584" y="106" text-anchor="middle" font-size="30" fill="${C.noise}">✕</text></g>
     <g class="a-pop" style="--d:1.1s">${box(380, 234, 230, 72, `stroke="${C.quiet}"`)}${two(470, 262, 'PILOTS', 'Functional need', C.quiet)}<text x="584" y="280" text-anchor="middle" font-size="28" fill="${C.quiet}">✓</text></g>`,
    `<text x="32" y="40" class="t-mono" fill="${C.muted}">PROOF IN THE FIELD</text>
     <g transform="translate(120 180)" fill="none" stroke="${C.line}" stroke-width="1.5"><circle r="78"/><ellipse rx="78" ry="28"/><ellipse rx="28" ry="78"/></g>
     <path d="M42 180 A78 78 0 1 1 198 180 A78 78 0 1 1 42 180" fill="none" stroke="${C.cyan}" stroke-width="2" stroke-dasharray="4 6"/>
     <circle r="7" fill="${C.cyan}"><animateMotion dur="5s" repeatCount="indefinite" path="M42 180 A78 78 0 1 1 198 180 A78 78 0 1 1 42 180"/></circle>
     ${two(120, 290, '1986 · VOYAGER', 'Field experience', C.cyan)}
     <path class="a-draw" style="--d:.3s" d="M212 180 H262" pathLength="100" stroke="${C.muted}" stroke-width="2" marker-end="url(#mkt-arrow)"/>
     <g class="a-pop" style="--d:.6s">${box(268, 146, 160, 68)}${two(348, 172, '1989', 'Aviation headset')}</g>
     <path class="a-draw" style="--d:1s" d="M430 180 H470" pathLength="100" stroke="${C.muted}" stroke-width="2" marker-end="url(#mkt-arrow)"/>
     <g class="a-pop" style="--d:1.3s">${box(476, 146, 150, 68, `stroke="${C.anti}"`)}${two(551, 172, '1998', 'Headset X', C.anti)}</g>
     <text x="444" y="250" text-anchor="middle" class="t-small" fill="${C.ink2}">Pilot trials and advocacy</text>
     <text x="444" y="270" text-anchor="middle" class="t-small" fill="${C.ink2}">spread the word; Headset X cut the bulk</text>`
  ]);

  /* Transition 2 · American Airlines */
  const seats = (x0, n, w, h, premium, delay0) => [150, 206].flatMap((y, r) => Array.from({length: n}, (_, c) => {
    const x = x0 + c * (w + 10), i = r * n + c;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${premium ? C.purple : '#1c2636'}" fill-opacity="${premium ? .4 : 1}" stroke="${premium ? C.anti : C.line}"/>${premium ? `<circle class="a-halo" cx="${x + w / 2}" cy="${y + h / 2}" r="${w * .62}" fill="${C.quiet}" fill-opacity=".1" stroke="${C.quiet}" stroke-opacity=".5" style="--d:${(delay0 + i * .15).toFixed(2)}s"/><path class="a-pop" style="--d:${(delay0 + i * .15).toFixed(2)}s" d="M${x + 4} ${y + 6} A${w / 2 - 4} ${w / 2 - 4} 0 0 1 ${x + w - 4} ${y + 6}" fill="none" stroke="${C.ink}" stroke-width="3"/>` : ''}`;
  })).join('');
  const cabin = svg('American Airlines, 1999. A print advert cannot let you hear quiet; first- and business-class passengers get ANC headsets in the cabin; their positive response feeds back into the decision to sell directly to consumers.', [
    `<text x="32" y="40" class="t-mono" fill="${C.muted}">THE BARRIER</text>
     <g class="a-pop"><rect x="44" y="64" width="220" height="256" rx="3" fill="#e6e1d6"/><text x="64" y="98" class="t-mono" fill="#6b6456">PRINT AD</text><text x="64" y="134" class="t-ad" fill="#2b2a28">Hear less</text><text x="64" y="164" class="t-ad" fill="#2b2a28">noise.</text>${[196, 212, 228].map((y, i) => `<rect x="64" y="${y}" width="${[170, 150, 120][i]}" height="7" fill="#b9b2a4"/>`).join('')}${headset(154, 280, .7, '#6b6456')}</g>
     <path d="M280 190 H420" stroke="${C.muted}" stroke-width="2" stroke-dasharray="6 6"/>
     <g class="a-pop" style="--d:.8s"><circle cx="350" cy="190" r="20" fill="${C.box}" stroke="${C.noise}" stroke-width="2"/><text x="350" y="198" text-anchor="middle" font-size="22" fill="${C.noise}">✕</text></g>
     <circle cx="506" cy="190" r="58" fill="#1a2332" stroke="${C.line}" stroke-width="2"/>
     <text class="a-pulse" x="506" y="210" text-anchor="middle" font-size="58" font-weight="700" fill="${C.anti}">?</text>
     <text x="506" y="286" text-anchor="middle" class="t-small" fill="${C.ink2}">Quiet is felt, not seen.</text>
     <text x="506" y="306" text-anchor="middle" class="t-small" fill="${C.ink2}">People have to hear it.</text>`,
    `<text x="320" y="40" text-anchor="middle" class="t-mono" fill="${C.anti}">AMERICAN AIRLINES · 1999</text>
     <clipPath id="mkt-cab-noise"><rect x="30" y="60" width="580" height="300"/></clipPath>
     <g clip-path="url(#mkt-cab-noise)" fill="none" stroke="${C.noise}" stroke-width="2" opacity=".7"><g transform="translate(-60 80)"><path class="a-travel" d="${sine(7, 800, 40)}"/></g><g transform="translate(-60 338)"><path class="a-travel" d="${sine(7, 800, 40)}"/></g></g>
     <rect x="30" y="100" width="580" height="180" rx="90" fill="#101826" stroke="#6f8196" stroke-width="2"/>
     ${Array.from({length: 13}, (_, i) => `<rect x="${118 + i * 32}" y="114" width="14" height="8" rx="3" fill="${C.line}"/>`).join('')}
     ${seats(104, 3, 32, 38, true, .2)}${seats(246, 3, 28, 34, true, 1.1)}${seats(376, 5, 22, 30, false, 0)}
     <text x="155" y="306" text-anchor="middle" class="t-mono" fill="${C.anti}">FIRST</text><text x="289" y="306" text-anchor="middle" class="t-mono" fill="${C.anti}">BUSINESS</text><text x="455" y="306" text-anchor="middle" class="t-mono" fill="${C.muted}">ECONOMY</text>`,
    `<text x="32" y="40" class="t-mono" fill="${C.muted}">THE SIGNAL BACK</text>
     ${box(30, 130, 220, 100)}${two(140, 170, 'PRODUCT EXPOSURE', 'Passengers try ANC', C.anti)}
     ${box(390, 130, 220, 100, `stroke="${C.anti}"`)}${two(500, 170, 'MARKET DECISION', 'Sell to consumers', C.anti)}
     <path class="a-draw" d="M250 150 C300 80 340 80 390 150" pathLength="100" fill="none" stroke="${C.anti}" stroke-width="3" marker-end="url(#mkt-arrow)"/>
     <path class="a-draw" style="--d:.6s" d="M390 212 C340 282 300 282 250 212" pathLength="100" fill="none" stroke="${C.quiet}" stroke-width="3" marker-end="url(#mkt-arrow)"/>
     <text x="320" y="84" text-anchor="middle" class="t-mono" fill="${C.anti}">EXPERIENCE</text>
     <text x="320" y="292" text-anchor="middle" class="t-mono" fill="${C.quiet}">POSITIVE RESPONSE</text>
     <circle r="6" fill="${C.ink}"><animateMotion dur="4s" repeatCount="indefinite" path="M250 150 C300 80 340 80 390 150 L390 212 C340 282 300 282 250 212 Z"/></circle>
     <text x="320" y="336" text-anchor="middle" class="t-small" fill="${C.muted}">Bose’s account · no contract value or conversion rate is published</text>`
  ]);

  /* Transition 3 · consumer launch */
  const kit = [['CONTROL BOX', '2 × AAA'], ['BATTERY', '80 h average'], ['AIRLINE', 'Adapter'], ['CUSHIONS', 'Replaceable']];
  const share = [['Bose', 13.0, true], ['Beats', 12.0, false], ['Sennheiser', 9.0, false]];
  const barX = 150, barMax = 400, scale = 15;
  const consumer = svg('Consumer launch, 2000. The headset is repositioned from a pilot tool to personal quiet for travellers with a complete travel kit; consumer travellers have different buying requirements from pilots; in 2015 Bose had 13.0 per cent of US online headphone dollar share, Beats 12.0 and Sennheiser 9.0.', [
    `<text x="32" y="40" class="t-mono" fill="${C.muted}">REPOSITIONED</text>
     ${box(30, 64, 220, 118)}${two(140, 104, 'BEFORE · AVIATION', 'A pilot’s tool')}<text x="140" y="156" text-anchor="middle" class="t-small" fill="${C.muted}">cockpit communication</text>
     <path class="a-draw" d="M258 123 H372" pathLength="100" stroke="${C.anti}" stroke-width="3" marker-end="url(#mkt-arrow)"/>
     <g class="a-pop" style="--d:.5s">${box(382, 64, 230, 118, `stroke="${C.anti}"`)}${two(497, 104, '2000 · QUIETCOMFORT', 'Personal quiet', C.anti)}<text x="497" y="156" text-anchor="middle" class="t-small" fill="${C.ink2}">for travellers</text></g>
     <text x="32" y="226" class="t-mono" fill="${C.muted}">SOLD AS A COMPLETE TRAVEL KIT</text>
     ${kit.map(([a, b], i) => `<g class="a-pop" style="--d:${(.9 + i * .2).toFixed(1)}s">${box(30 + i * 148, 242, 136, 76)}${two(98 + i * 148, 272, a, b)}</g>`).join('')}`,
    `<text x="32" y="40" class="t-mono" fill="${C.muted}">A NEW CUSTOMER · A NEW BUYING DECISION</text>
     ${box(35,85,245,155)}${two(157,125,'PILOTS','Communication',C.anti)}<text x="157" y="188" text-anchor="middle" class="t-small">Functional cockpit need</text>
     <path class="a-draw" d="M292 163 H348" pathLength="100" stroke="${C.anti}" stroke-width="3" marker-end="url(#mkt-arrow)"/>
     ${box(360,85,245,155)}${two(482,125,'CONSUMER TRAVELLERS','Personal quiet',C.anti)}<text x="482" y="188" text-anchor="middle" class="t-small">Comfort · portability · price</text>
     <text x="320" y="292" text-anchor="middle" class="t-small" fill="${C.muted}">New segment entry does not by itself prove mainstream adoption.</text>`,
    `<text x="32" y="40" class="t-mono" fill="${C.muted}">PROOF OF DEMAND · US ONLINE HEADPHONE DOLLAR SHARE, 2015</text>
     ${share.map(([name, v, hi], i) => { const y = 78 + i * 62, w = v / scale * barMax; return `<g><title>${name}: ${v.toFixed(1)}% of US online headphone dollar share, 2015</title>
       <text x="32" y="${y + 23}" class="t-big" fill="${C.ink}">${name}</text>
       <rect x="${barX}" y="${y}" width="${barMax}" height="34" fill="transparent"/>
       <path class="a-grow" style="--d:${(.2 + i * .2).toFixed(1)}s" d="M${barX} ${y} H${barX + w - 4} Q${barX + w} ${y} ${barX + w} ${y + 4} V${y + 30} Q${barX + w} ${y + 34} ${barX + w - 4} ${y + 34} H${barX} Z" fill="${hi ? C.purple : '#4a5b70'}"/>
       <text x="${barX + w + 10}" y="${y + 23}" class="t-big" fill="${hi ? C.ink : C.ink2}">${v.toFixed(1)}%</text></g>`; }).join('')}
     <line x1="${barX}" y1="70" x2="${barX}" y2="236" stroke="${C.line}"/>
     <text x="32" y="284" class="t-small" fill="${C.ink}">QC25 was Bose’s top-selling headphone online (launched Sept 2014, US$299.95)</text>
     <text x="32" y="312" class="t-small" fill="${C.muted}">1010data panel, top 100 US online retailers · brand-wide dollars, not ANC units</text>`
  ]);

  /* Transition 4 · digital era */
  const samples = Array.from({length: 20}, (_, i) => { const x = 40 + i * 29; return [x, 140 + Math.sin((x - 40) / 145 * Math.PI * 2) * 48]; });
  const stepped = samples.map(([x, y], i) => `${i ? 'H' + x + ' V' : 'M' + x + ' '}${y.toFixed(1)}`).join(' ');
  const digital = svg('Digital era. An illustrative in-ear headset represents QC20’s listening format (2013); a phone connects to QC35 over Bluetooth instead of a cable (2016); QC45 Aware mode lets surrounding sound through (2021), beyond the main case.', [
    `<text x="32" y="40" class="t-mono" fill="${C.muted}">NEW LISTENING FORMATS · QC20 · 2013</text>
     ${box(35,75,260,225)}
     <g class="a-pop" transform="translate(157 155)"><path d="M-22 65 C-75 24 -54 -64 -5 -70 C60 -79 71 -8 28 23 L12 59 Q-4 93 -22 65 M-22 15 Q-48 -28 -5 -39 Q33 -42 14 -10" fill="none" stroke="${C.ink2}" stroke-width="4"/><ellipse cx="-14" cy="12" rx="20" ry="16" fill="${C.box}" stroke="${C.cyan}" stroke-width="3"/><path d="M-14 27 V76 Q-14 99 10 103" fill="none" stroke="${C.cyan}" stroke-width="3"/></g>
     <text x="165" y="276" text-anchor="middle" class="t-small">In-ear format · illustration</text>
     <path class="a-draw" d="M310 180 H365" pathLength="100" stroke="${C.cyan}" stroke-width="3" marker-end="url(#mkt-arrow)"/>
     ${box(380,104,230,145)}${two(495,148,'DIGITAL ANC','Personal listening',C.cyan)}
     <text x="495" y="218" text-anchor="middle" class="t-small">A different product format</text>`,
    `<text x="32" y="40" class="t-mono" fill="${C.muted}">GOING WIRELESS · QC35 · JUNE 2016</text>
     <g transform="translate(70 150)"><rect width="84" height="156" rx="14" fill="${C.box}" stroke="#8ea0b5" stroke-width="2"/><rect x="9" y="18" width="66" height="110" rx="3" fill="#1c2a3b"/><circle cx="42" cy="142" r="5" fill="#8ea0b5"/></g>
     <path class="a-cable" d="M112 306 C200 350 400 350 470 262" fill="none" stroke="${C.muted}" stroke-width="3" stroke-dasharray="7 7"/>
     ${[0, 1, 2].map(i => `<g class="a-wifi" style="--d:${i * .7}s"><path d="M170 204 A34 34 0 0 1 170 252" fill="none" stroke="${C.cyan}" stroke-width="3"/></g>`).join('')}
     ${headset(510, 228, 1.4)}
     ${[['QC35 · 2016', 'Bluetooth'], ['Phone listening', 'Customer use']].map(([a, b], i) => `<g class="a-pop" style="--d:${(.4 + i * .25).toFixed(2)}s">${box(214 + i * 196, 64, 180, 64)}${two(304 + i * 196, 90, b.toUpperCase(), a)}</g>`).join('')}
     <text x="320" y="352" text-anchor="middle" class="t-small" fill="${C.ink2}">Wireless listening expanded · QC35 added Bluetooth</text>`,
    `<text x="32" y="40" class="t-mono" fill="${C.muted}">QC45 · 2021 · AWARE MODE</text>
     <g transform="translate(500 30)"><rect width="110" height="30" rx="15" fill="${C.box}" stroke="${C.line}"/><circle class="a-knob" cx="17" cy="15" r="11" fill="${C.anti}"/><text x="55" y="-6" text-anchor="middle" class="t-mono" fill="${C.muted}"><tspan class="a-lbl-quiet">QUIET</tspan><tspan class="a-lbl-aware" x="55">AWARE</tspan></text></g>
     <circle class="a-ring" cx="320" cy="196" r="98" fill="none" stroke="${C.anti}" stroke-width="3" stroke-dasharray="8 6"/>
     <circle cx="320" cy="196" r="46" fill="#1a2332" stroke="${C.line}" stroke-width="2"/>${headset(320, 192, 1.05)}
     <clipPath id="mkt-dg-left"><rect x="20" y="120" width="202" height="160"/></clipPath>
     <g clip-path="url(#mkt-dg-left)"><g transform="translate(-40 196)"><path class="a-travel" d="${sine(22, 600, 50)}" fill="none" stroke="${C.noise}" stroke-width="3"/></g></g>
     <text x="96" y="130" text-anchor="middle" class="t-mono" fill="${C.noise}">NOISE</text><path class="a-voice-in" d="M228 196 Q242 180 256 196 T284 196" fill="none" stroke="${C.noise}" stroke-width="3"/>
     <g transform="translate(578 196)"><circle cy="-22" r="14" fill="none" stroke="${C.cyan}" stroke-width="2.5"/><path d="M-22 30 A22 22 0 0 1 22 30" fill="none" stroke="${C.cyan}" stroke-width="2.5"/></g>
     <text x="578" y="130" text-anchor="middle" class="t-mono" fill="${C.cyan}">VOICE</text>
     ${[0, 1, 2].map(i => `<path class="a-voice-out" style="--d:${i * .6}s" d="M540 172 A30 30 0 0 0 540 220" fill="none" stroke="${C.cyan}" stroke-width="3"/>`).join('')}
     ${[0, 1].map(i => `<path class="a-voice-in" style="--d:${i * .6}s" d="M412 176 A24 24 0 0 0 412 216" fill="none" stroke="${C.cyan}" stroke-width="3"/>`).join('')}
     <text x="320" y="330" text-anchor="middle" class="t-small" fill="${C.ink2}">Aware mode lets surrounding sound through · continuation beyond 2016</text>`
  ]);

  const defs = `<svg width="0" height="0" aria-hidden="true" style="position:absolute"><defs><marker id="mkt-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8" fill="${C.muted}"/></marker></defs></svg>`;

  const icons = {
    pilot: `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 22 A12 12 0 0 1 32 22" fill="none" stroke="currentColor" stroke-width="2.5"/><rect x="5" y="20" width="7" height="12" rx="3" fill="currentColor"/><rect x="28" y="20" width="7" height="12" rx="3" fill="currentColor"/><path d="M12 30 Q16 36 22 35" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
    seat: `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M11 6 H18 L22 24 H33 V31 H16 Z M14 31 L11 37 M29 31 L32 37" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
    travel: `<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="8" y="13" width="24" height="21" rx="3" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M15 13 V8 H25 V13 M8 22 H32" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>`,
    phone: `<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="12" y="5" width="16" height="30" rx="3" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M31 14 A8 8 0 0 1 31 26 M35 10 A13 13 0 0 1 35 30" fill="none" stroke="currentColor" stroke-width="2"/></svg>`
  };

  return {aviation, cabin, consumer, digital, defs, icons};
})();
