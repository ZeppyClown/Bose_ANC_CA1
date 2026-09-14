/* A compact Cyclic Innovation Model drawing shared by the introduction and conclusion.
   Nodes, arcs and spokes carry classes so each chapter can light the parts it discusses. */
window.CimFigure = (() => {
  const CX = 260, CY = 230, R = 165, NODE_R = 72, HUB_R = 68;
  const nodes = [
    {key: 'science', angle: 180, color: '#e0913a', ink: '#e0913a', full: ['Scientific', 'exploration'], short: 'Science'},
    {key: 'technology', angle: 270, color: '#9bb84a', ink: '#b8cf7b', full: ['Technological', 'research'], short: 'Technology'},
    {key: 'product', angle: 0, color: '#d8c93f', ink: '#d8c93f', full: ['Product', 'creation'], short: 'Product'},
    {key: 'market', angle: 90, color: '#9a7bc0', ink: '#bca2de', full: ['Market', 'transitions'], short: 'Market'}
  ];
  const point = (angle, radius = R) => {
    const t = angle * Math.PI / 180;
    return [CX + radius * Math.cos(t), CY + radius * Math.sin(t)].map(v => v.toFixed(1));
  };
  const arc = from => {
    const [x1, y1] = point(from + 27), [x2, y2] = point(from + 63);
    return `M${x1} ${y1} A${R} ${R} 0 0 1 ${x2} ${y2}`;
  };

  let instance = 0;
  function svg({compact = false, label = 'Cyclic Innovation Model', extras = ''} = {}) {
    const arrowId = `cim-arrow-${++instance}`;
    const nodeText = n => compact
      ? `<text x="0" y="8" text-anchor="middle" fill="${n.ink}" font-size="23">${n.short}</text>`
      : `<text x="0" y="-4" text-anchor="middle" fill="${n.ink}" font-size="17">${n.full[0]}</text><text x="0" y="18" text-anchor="middle" fill="${n.ink}" font-size="17">${n.full[1]}</text>`;
    return `<svg class="cim-mini${compact ? ' is-compact' : ''}" viewBox="-10 -16 540 492" role="img" aria-label="${label}">
      <defs><marker id="${arrowId}" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto-start-reverse"><path d="M0 0 L7 3.5 L0 7" fill="#8092ae"/></marker></defs>
      <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="#2a384b" stroke-dasharray="2 9"/>
      ${[180, 270, 0, 90].map((a, i) => `<path class="cim-arc cim-arc-${i}" d="${arc(a)}" pathLength="100" fill="none" stroke="#8092ae" stroke-width="2" marker-start="url(#${arrowId})" marker-end="url(#${arrowId})"/>`).join('')}
      ${nodes.map(n => { const [x1, y1] = point(n.angle, HUB_R + 4), [x2, y2] = point(n.angle, R - NODE_R - 4); return `<path class="cim-spoke cim-spoke-${n.key}" d="M${x1} ${y1} L${x2} ${y2}" pathLength="100" stroke="#3d8fc4" stroke-width="2"/>`; }).join('')}
      <g class="cim-hub-node"><circle cx="${CX}" cy="${CY}" r="${HUB_R}" fill="#3d8fc4" fill-opacity=".2" stroke="#3d8fc4" stroke-width="1.5"/><text x="${CX}" y="${CY + 4}" text-anchor="middle" fill="#e9eef7" font-size="${compact ? 14 : 13}" font-weight="600">Entrepreneurship</text></g>
      ${nodes.map(n => { const [x, y] = point(n.angle); return `<g class="cim-node-mini cim-node-${n.key}" transform="translate(${x} ${y})"><circle r="${NODE_R}" fill="${n.color}" fill-opacity=".14" stroke="${n.color}" stroke-width="1.5"/>${nodeText(n)}</g>`; }).join('')}
      ${extras}
    </svg>`;
  }
  return {svg, nodes: nodes.map(n => n.key)};
})();
