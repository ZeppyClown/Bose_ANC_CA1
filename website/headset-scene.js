/* One persistent, layered headset illustration. Scroll changes transforms, not
   images, so the assembled/exploded transitions run forwards and backwards. */
window.HeadsetScene = (() => {
  const capsule = (fill,stroke='#64758b') => `<rect x="-67" y="-133" width="134" height="266" rx="63" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  function html(){return `<div class="headset-cinema" data-scene-step="0" data-click-advance>
    <div class="cinema-status"><span class="live-dot"></span><span class="cinema-status-text">01 / ASSEMBLED HEADSET</span></div>
    <svg class="headset-film" viewBox="0 0 1200 610" role="img" aria-labelledby="headset-film-title headset-film-description">
      <title id="headset-film-title">Inside an active noise-cancelling headset</title>
      <desc id="headset-film-description">An assembled headset receives sound. Scrolling separates the earcup into its shell, outer microphone, controller, driver, inner microphone and cushion, then shows how signals move between them.</desc>
      <defs>
        <linearGradient id="film-metal" x1="0" y1="0" x2="1" y2=".3"><stop stop-color="#0a1019"/><stop offset=".25" stop-color="#516277"/><stop offset=".5" stop-color="#1d2a3c"/><stop offset=".78" stop-color="#798a9d"/><stop offset="1" stop-color="#141d2a"/></linearGradient>
        <linearGradient id="film-shell" x1="0" x2="1" y2=".35"><stop stop-color="#111a28"/><stop offset=".35" stop-color="#41516a"/><stop offset=".7" stop-color="#243248"/><stop offset="1" stop-color="#0b111c"/></linearGradient>
        <linearGradient id="film-cushion" x1="0" x2="1" y2=".3"><stop stop-color="#080c13"/><stop offset=".27" stop-color="#3c4756"/><stop offset=".53" stop-color="#121b29"/><stop offset="1" stop-color="#050a12"/></linearGradient>
        <radialGradient id="film-cone"><stop stop-color="#151e2c"/><stop offset=".22" stop-color="#667d94"/><stop offset=".32" stop-color="#25384b"/><stop offset=".69" stop-color="#0c1927"/><stop offset=".85" stop-color="#536679"/><stop offset="1" stop-color="#152334"/></radialGradient>
        <radialGradient id="film-halo"><stop stop-color="#326c82" stop-opacity=".25"/><stop offset="1" stop-color="#326c82" stop-opacity="0"/></radialGradient>
        <pattern id="film-mesh" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#71899f" opacity=".45"/></pattern>
        <marker id="film-arrow-amber" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7" fill="#ffb340"/></marker>
        <marker id="film-arrow-cyan" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7" fill="#4dd0e1"/></marker>
      </defs>
      <ellipse cx="650" cy="330" rx="490" ry="280" fill="url(#film-halo)"/>
      <g class="film-grid" fill="none" stroke="#254055" stroke-width="1"><ellipse cx="650" cy="335" rx="430" ry="224"/><path d="M170 335 H1140 M650 50 V577" stroke-dasharray="2 9"/></g>
      <g class="film-camera">
        <g class="headset-rest">
          <path d="M405 320 V227 C405 4 759 4 759 227 V310" fill="none" stroke="#080d16" stroke-width="53"/>
          <path d="M405 313 V227 C405 15 759 15 759 227 V309" fill="none" stroke="url(#film-metal)" stroke-width="31"/>
          <path d="M420 228 C423 46 741 46 744 228" fill="none" stroke="#101926" stroke-width="15"/>
          <path d="M405 252 L405 352 M758 252 L758 352" stroke="url(#film-metal)" stroke-width="22"/>
          <g transform="translate(397 371) rotate(-10)"><rect x="-69" y="-128" width="146" height="278" rx="65" fill="#080c13" stroke="#56657b" stroke-width="3"/><rect x="-61" y="-125" width="122" height="267" rx="57" fill="url(#film-shell)"/><path d="M-34 -91 V96" stroke="#8d9bb0" stroke-opacity=".25" stroke-width="2"/></g>
        </g>
        <g class="earcup-assembly" transform="translate(755 362)">
          <g class="film-piece piece-cushion"><g transform="skewY(-12)"><rect x="-37" y="-137" width="135" height="275" rx="65" fill="url(#film-cushion)" stroke="#49586d" stroke-width="2"/><rect x="-11" y="-102" width="82" height="205" rx="41" fill="#050b13" stroke="#27394e" stroke-width="9"/><path d="M5 -86 Q31 -111 54 -84" stroke="#5b6d83" fill="none" opacity=".5"/></g><g class="piece-label"><path d="M18 148 V175"/><text x="18" y="202">CUSHION</text><text class="label-detail" x="18" y="223">Seal + comfort</text></g></g>
          <g class="film-piece piece-inner"><g transform="skewY(-12)"><rect x="-34" y="-117" width="72" height="232" rx="30" fill="#24374c" fill-opacity=".35" stroke="#8fd694" stroke-opacity=".5"/><path d="M0 -96 V78" stroke="#7cc5a0" stroke-width="2"/><rect x="-19" y="61" width="38" height="32" rx="6" fill="#314a3e" stroke="#8fd694" stroke-width="2"/><circle cx="0" cy="77" r="8" fill="#071610" stroke="#8fd694"/><circle class="inner-mic-halo" cx="0" cy="77" r="23" fill="none" stroke="#8fd694" stroke-width="2"/></g><g class="piece-label"><path d="M0 -130 V-193"/><text x="0" y="-210">INNER MIC</text><text class="label-detail" x="0" y="-190">Checks inside</text></g></g>
          <g class="film-piece piece-driver"><g transform="skewY(-12)"><ellipse cx="0" cy="0" rx="70" ry="126" fill="#111e2c" stroke="#7393ad" stroke-width="3"/><ellipse rx="59" ry="112" fill="url(#film-cone)" stroke="#4dd0e1" stroke-opacity=".6"/><ellipse rx="43" ry="88" fill="none" stroke="#91adbf" stroke-opacity=".35"/><ellipse rx="26" ry="61" fill="#0e1b2b" stroke="#8199ac"/><ellipse rx="12" ry="34" fill="#435b71"/><path d="M-44 -77 Q0 -114 44 -77" stroke="#b0c3d3" stroke-opacity=".25" fill="none" stroke-width="3"/></g><g class="piece-label"><path d="M0 139 V175"/><text x="0" y="202">DRIVER</text><text class="label-detail" x="0" y="223">Makes the sound</text></g></g>
          <g class="film-piece piece-controller"><g transform="skewY(-12)"><rect x="-42" y="-110" width="84" height="220" rx="21" fill="#173b39" stroke="#52776f" stroke-width="2"/><g stroke="#82b39a" fill="none" stroke-width="2"><path d="M-30 -85 V-32 H-17 M30 -85 V-28 H16 M-27 78 V31 H-16 M29 77 V26 H17 M-38 0 H-18 M18 0 H37"/><path d="M-8 -105 V-40 M8 40 V106"/></g><rect x="-21" y="-33" width="42" height="66" rx="3" fill="#071217" stroke="#88aab1"/><text x="0" y="5" text-anchor="middle" font-size="13" fill="#bdd4db">ANC</text><g fill="#799a90"><rect x="-29" y="-80" width="14" height="19"/><rect x="15" y="60" width="14" height="19"/><rect x="-26" y="56" width="10" height="24"/></g></g><g class="piece-label"><path d="M0 -125 V-155"/><text x="0" y="-192">CONTROLLER</text><text class="label-detail" x="0" y="-172">Shapes the response</text></g></g>
          <g class="film-piece piece-outer"><g transform="skewY(-12)"><rect x="-21" y="-110" width="42" height="219" rx="19" fill="#182c33" stroke="#668d8c"/><path d="M0 -40 V85" stroke="#b59a60" stroke-width="3"/><rect x="-24" y="-78" width="48" height="43" rx="8" fill="#7a6441" stroke="#ffb340" stroke-width="2"/><circle cx="0" cy="-57" r="12" fill="#100e0c" stroke="#ffcf7f"/><circle class="outer-mic-halo" cx="0" cy="-57" r="30" fill="none" stroke="#ffb340" stroke-width="2"/></g><g class="piece-label mic-piece-label"><path d="M0 -117 V-156"/><text x="0" y="-192">OUTER MIC</text><text class="label-detail" x="0" y="-172">Listens outside</text></g></g>
          <g class="film-piece piece-shell"><g transform="skewY(-12)"><rect x="-72" y="-139" width="144" height="280" rx="67" fill="#0b121e" stroke="#53677e" stroke-width="3"/>${capsule('url(#film-shell)')}<rect x="-53" y="-119" width="99" height="232" rx="47" fill="url(#film-mesh)" opacity=".35"/><path d="M-42 -91 V96" stroke="#b8c8db" stroke-opacity=".25" stroke-width="2"/><text x="0" y="31" fill="#899ab1" font-size="15" letter-spacing="5" text-anchor="middle" transform="rotate(-90 0 31)">QUIET</text><rect x="-9" y="-88" width="18" height="7" rx="3" fill="#0a0d10" stroke="#ffb340"/><circle class="assembled-mic-halo" cx="0" cy="-84" r="28" fill="none" stroke="#ffb340" stroke-width="2"/></g><g class="piece-label"><path d="M0 155 V175"/><text x="0" y="202">OUTER SHELL</text><text class="label-detail" x="0" y="223">Housing</text></g></g>
        </g>
        <g class="listener-ear" transform="translate(1071 340)" fill="none" stroke="#8498b0" stroke-width="4" stroke-linecap="round"><path d="M43 -110 C-37 -129 -68 -66 -48 -14 C-31 20 -9 19 -18 51 C-31 91 15 113 35 64 M26 -80 C-22 -91 -41 -48 -18 -25 C4 -4 -7 22 8 40 M5 -21 Q47 -50 32 -4 L15 20"/><text x="0" y="160" fill="#8fabc3" stroke="none" text-anchor="middle">YOUR EAR</text></g>
      </g>
      <g class="assembled-callout"><path d="M755 258 L893 181 H1045" fill="none" stroke="#ffb340"/><circle cx="755" cy="258" r="5" fill="#ffb340"/><text x="904" y="153" fill="#ffb340">OUTER MICROPHONE</text><text x="904" y="174" fill="#a8b7ca" font-size="15">A small opening. A crucial signal.</text></g>
      <g class="film-source"><circle r="32" fill="#ffb34008" stroke="#ffb340" stroke-width="1.4"/><path d="M-15 -10 H-6 L7 -20 V20 L-6 10 H-15Z M14 -13 Q28 0 14 13" fill="none" stroke="#ffb340" stroke-width="2"/><circle class="film-source-ring" r="33" fill="none" stroke="#ffb340"/><circle class="film-source-ring second-ring" r="33" fill="none" stroke="#ffb340"/><text x="0" y="74" text-anchor="middle" fill="#ffb340">OUTSIDE NOISE</text></g>
      <g class="film-acoustics" fill="none" stroke="#ffb340">
        <path class="film-noise-path" d="M170 235 Q395 165 755 278" stroke-width="1.5" opacity=".45"/>
        <path class="film-noise-packet" d="M170 235 Q395 165 755 278" stroke-width="4" pathLength="100"/>
        <path class="film-alternate-path" d="M965 85 Q710 95 505 305" stroke-width="1.5" opacity=".5"/>
        <path class="film-alternate-packet" d="M965 85 Q710 95 505 305" stroke-width="4" pathLength="100"/>
        <path class="film-ear-path" d="M965 85 Q1110 167 1070 315" stroke-width="1.5" stroke-dasharray="5 8"/>
        <path class="film-ear-packet" d="M965 85 Q1110 167 1070 315" stroke-width="3" pathLength="100"/>
      </g>
      <g class="film-signal-flow" fill="none" stroke-linecap="round">
        <path class="flow-guide" d="M505 305 Q540 342 605 362 H735 Q866 362 1055 347" stroke="#4dd0e1" stroke-width="1"/>
        <path class="flow-forward" d="M505 305 Q540 342 605 362 H735 Q866 362 1055 347" stroke="#4dd0e1" stroke-width="4" pathLength="100"/>
        <path class="flow-feedback-guide" d="M860 422 C952 503 584 544 605 385" stroke="#8fd694" stroke-width="1.5" stroke-dasharray="4 7"/>
        <path class="flow-feedback" d="M860 422 C952 503 584 544 605 385" stroke="#8fd694" stroke-width="4" pathLength="100"/>
        <path class="flow-music" d="M530 104 Q585 135 605 275" stroke="#b89adc" stroke-width="3" pathLength="100"/>
      </g>
      <g class="film-anti-waves" fill="none" stroke="#4dd0e1" stroke-width="2"><path d="M805 297 Q841 350 805 400"/><path d="M842 275 Q899 350 842 421"/><path d="M879 254 Q956 350 879 442"/></g>
      <g class="film-feedback-label"><text x="760" y="535" fill="#8fd694" text-anchor="middle">MEASURE THE RESULT → ADJUST THE RESPONSE</text></g>
      <g class="film-warning"><rect x="360" y="77" width="455" height="53" rx="5" fill="#291719" stroke="#a4463b"/><text x="588" y="109" fill="#ff9a8d" text-anchor="middle">DELAY + TOO MUCH GAIN → REINFORCEMENT</text></g>
      <g class="film-music-label"><text x="525" y="90" fill="#b89adc" text-anchor="middle">DESIRED MUSIC ♪</text></g>
      <g class="film-research-labels" text-anchor="middle"><text x="600" y="550" fill="#9bb84a">ACOUSTIC THEORY ↔ PROTOTYPES ↔ MEASUREMENTS</text><text x="600" y="579" fill="#9babbe" font-size="15">Early Bose: analogue circuitry · QC20, 2013: digital consumer ANC</text></g>
    </svg>
    <div class="cinema-key"><span><i class="noise-key"></i> Noise / outside reference</span><span><i class="anti-key"></i> Control / anti-noise</span><span><i class="feedback-key"></i> Inside measurement</span></div>
  </div>`;}
  const states=['ASSEMBLED HEADSET','OPEN THE EARCUP','CHANGE THE NOISE DIRECTION','FOLLOW THE CONTROL SIGNAL','CHECK INSIDE THE EARCUP','CONTROL THE FEEDBACK','COMBINE THE TWO SIGNALS','BRING THE SYSTEM TOGETHER'];
  function show(index){const scene=document.querySelector('.headset-cinema');if(!scene)return;scene.dataset.sceneStep=String(index);scene.querySelector('.cinema-status-text').textContent=`${String(index+1).padStart(2,'0')} / ${states[index]}`;}
  return {html,show};
})();
