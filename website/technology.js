/* Captions change; the same headset nodes move through every scroll stop. */
window.TechnologyChapter = (() => {
  const steps = [
    {id:'listen',label:'Connect expertise',title:'Complementary expertise.<br><em>A shared problem.</em>',copy:'Bose paired Gauger’s control and circuit expertise with Sapiejewski’s acoustics. This generic headset shows the sensing and control problem they had to solve.',refs:[5,6,9]},
    {id:'placement',label:'Open the earcup',title:'Pull it apart.<br><em>Find the microphone.</em>',copy:'The shell opens to reveal the microphone, controller, driver and cushion. The outer microphone measures sound here—not at your eardrum. Its position matters.',refs:[3,5]},
    {id:'direction',label:'Noise direction',title:'Now move<br><em>the noise.</em>',copy:'The same microphone now hears noise arriving from another direction. Follow the paths to the microphone and the ear: the available warning time can change.',refs:[3,5]},
    {id:'timing',label:'Follow the signal',title:'From a measurement<br><em>to an opposite sound.</em>',copy:'Follow the signal into the controller, then to the driver. The driver produces anti-noise. It must reach the ear with the right timing and amplitude.',refs:[3,4,5]},
    {id:'feedback',label:'Check inside',title:'Listen again.<br><em>This time, inside.</em>',copy:'The inner microphone measures the local result. Its signal returns to the controller, which adjusts the response. That is feedback.',refs:[5,6]},
    {id:'stability',label:'Keep it stable',title:'A correction can<br><em>become a problem.</em>',copy:'Watch the loop. Delay and too much gain can make correction reinforce a disturbance at some frequencies. Engineers must keep that loop stable.',refs:[3,5]},
    {id:'hybrid',label:'Combine both',title:'Two microphones.<br><em>One coordinated system.</em>',copy:'Hybrid ANC combines the outside reference with the inside measurement. The system also handles desired music, preserving playback while reducing environmental noise.',refs:[5,6]},
    {id:'research',label:'Science ↔ Technology',title:'Science and technology<br><em>inform each other.</em>',copy:'Theory guides control; prototype measurements refine it. Finding: timing and stability make cancellation usable. Product development must integrate that control with comfort, size and power. Our CIM interpretation.',refs:[3,9]}
  ];
  function html(cite){return `<div class="tech-chapter"><div class="tech-topline"><span>TECHNOLOGICAL RESEARCH</span><span>SCROLL TO MOVE THROUGH THE HEADSET</span></div>${HeadsetScene.html()}<div class="tech-steps">${steps.map((s,i)=>`<article class="tech-step" data-tech-step="${i}" ${i?'hidden inert':''} aria-label="Step ${i+1}: ${s.label}"><div class="tech-copy"><p class="tech-step-label">${String(i+1).padStart(2,'0')} / 08 <span>${s.label}</span></p><h2>${s.title}</h2></div><div class="tech-narration"><p class="tech-explanation">${s.copy}</p><p class="tech-evidence">Illustrative assembly and signal paths, not a Bose teardown or a measured simulation. ${cite(...s.refs)}</p></div></article>`).join('')}</div><div class="tech-bottom"><nav class="tech-step-nav" aria-label="Technology explanation steps">${steps.map((s,i)=>`<button data-tech-jump="${i}" aria-label="Step ${i+1}: ${s.label}" ${i?'':'aria-current="step"'}><span>${String(i+1).padStart(2,'0')}</span><i></i></button>`).join('')}</nav><span class="tech-next-cue">SCROLL TO CONTINUE ↓ <b>Next: open the earcup</b></span></div></div>`;}
  function show(index){
    const root=document.querySelector('.tech-chapter');if(!root)return;
    // Never replace the headset: CSS interpolates its existing pieces.
    HeadsetScene.show(index);
    root.querySelectorAll('.tech-step').forEach((el,i)=>{el.classList.remove('tech-step-active');el.hidden=i!==index;el.inert=i!==index;});
    const el=root.querySelector(`[data-tech-step="${index}"]`);void el.offsetWidth;el.classList.add('tech-step-active');
    root.querySelectorAll('[data-tech-jump]').forEach((b,i)=>{if(i===index)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');b.classList.toggle('completed',i<index);});
    root.querySelector('.tech-next-cue b').textContent=index===steps.length-1?'Next: product creation':`Next: ${steps[index+1].label.toLowerCase()}`;
  }
  const progressLabel=i=>`02 / TECHNOLOGY · ${i+1} OF ${steps.length}`;
  const announce=i=>`Technological research, step ${i+1} of ${steps.length}: ${steps[i].label}`;
  return {steps,html,show,progressLabel,announce,lockMs:1490};
})();
