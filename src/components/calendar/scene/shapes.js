/**
 * Constructores de formas SVG reutilizables para la escena de Belén.
 *
 * Todas las formas comparten el mismo lenguaje visual: siluetas planas con
 * contorno dorado fino y tres tonos de sombra. Así la escena mantiene coherencia
 * y se puede ampliar o recolorear sin reescribir el dibujo.
 */

/** Paleta de la escena. */
export const SCENE_COLORS = {
  skyTop: '#0b1228',
  skyMid: '#1b2a55',
  skyLow: '#2b3a68',
  mountainFar: '#2a2c58',
  mountainNear: '#3b3363',
  sandLight: '#e7d9b4',
  sand: '#d9c79d',
  sandDark: '#bda877',
  ivory: '#f6f0e5',
  ivoryShade: '#ded4c1',
  ivoryDeep: '#c6bba6',
  gold: '#c6a568',
  goldLight: '#f0dca6',
  goldBright: '#ffeec2',
  goldDeep: '#8d713f',
  violet: '#78528d',
  violetDeep: '#5b3f6d',
  violetLight: '#9a76ad',
  pink: '#dda3b8',
  rose: '#b8785c',
  roseDeep: '#8c5540',
  ink: '#1c2340',
  night: '#16224a',
};

/**
 * Envuelve un fragmento SVG con un grupo y sus transformaciones.
 *
 * `flip` produce un espejo **horizontal**. No se puede usar `scale(-1)` porque
 * en SVG eso invierte los dos ejes y voltearía la figura por completo.
 *
 * @param {string} content
 * @param {{x?: number, y?: number, scale?: number, flip?: boolean, rotate?: number, originX?: number, originY?: number, opacity?: number, className?: string}} [options]
 * @returns {string}
 */
export function group(content, options = {}) {
  const {
    x = 0,
    y = 0,
    scale = 1,
    flip = false,
    rotate = 0,
    originX = 0,
    originY = 0,
    opacity,
    className,
  } = options;

  const transform = [
    `translate(${x} ${y})`,
    rotate ? `rotate(${rotate} ${originX} ${originY})` : '',
    `scale(${flip ? -scale : scale} ${scale})`,
  ]
    .filter(Boolean)
    .join(' ');

  const style = opacity !== undefined ? ` opacity="${opacity}"` : '';
  const cls = className ? ` class="${className}"` : '';
  return `<g${cls}${style} transform="${transform}">${content}</g>`;
}

/**
 * Casa de estilo antiguo: cuerpo recto, cúpula opcional y ventanas en arco.
 * @param {{x: number, baseY: number, width: number, height: number, dome?: boolean, windows?: number, door?: boolean, color?: string, shade?: string}} options
 * @returns {string}
 */
export function drawHouse(options) {
  const {
    x,
    baseY,
    width,
    height,
    dome = true,
    windows = 2,
    door = true,
    color = SCENE_COLORS.ivory,
    shade = SCENE_COLORS.ivoryShade,
  } = options;

  const parts = [];

  // Cuerpo de la casa con esquinas ligeramente redondeadas.
  parts.push(
    `<rect x="${x}" y="${baseY - height}" width="${width}" height="${height}" rx="4" fill="${color}"/>`,
  );
  // Franja de sombra en la base.
  parts.push(
    `<rect x="${x}" y="${baseY - height * 0.18}" width="${width}" height="${height * 0.18}" fill="${shade}" opacity="0.85"/>`,
  );

  // Cúpula.
  if (dome) {
    const cx = x + width / 2;
    const r = width * 0.26;
    parts.push(
      `<path d="M ${cx - r} ${baseY - height} A ${r} ${r} 0 0 1 ${cx + r} ${baseY - height} Z" fill="${shade}"/>`,
      `<path d="M ${cx - r * 0.18} ${baseY - height - r * 0.9} L ${cx} ${baseY - height - r * 1.22} L ${cx + r * 0.18} ${baseY - height - r * 0.9} Z" fill="${SCENE_COLORS.gold}"/>`,
    );
  }

  // Ventanas en arco.
  const windowWidth = width * 0.16;
  const windowHeight = height * 0.26;
  const gap = width * 0.22;
  const startX = x + width / 2 - ((windows - 1) * gap) / 2;
  for (let index = 0; index < windows; index += 1) {
    const wx = startX + index * gap - windowWidth / 2;
    const wy = baseY - height * 0.68;
    parts.push(
      `<path d="M ${wx} ${wy + windowHeight} L ${wx} ${wy + windowWidth / 2} A ${windowWidth / 2} ${windowWidth / 2} 0 0 1 ${wx + windowWidth} ${wy + windowWidth / 2} L ${wx + windowWidth} ${wy + windowHeight} Z" fill="${SCENE_COLORS.night}" opacity="0.85"/>`,
      `<path d="M ${wx} ${wy + windowHeight} L ${wx} ${wy + windowWidth / 2} A ${windowWidth / 2} ${windowWidth / 2} 0 0 1 ${wx + windowWidth} ${wy + windowWidth / 2} L ${wx + windowWidth} ${wy + windowHeight} Z" fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="1.6" opacity="0.7"/>`,
    );
  }

  // Puerta en arco.
  if (door) {
    const doorWidth = width * 0.2;
    const doorHeight = height * 0.36;
    const dx = x + width / 2 - doorWidth / 2;
    const dy = baseY - doorHeight;
    parts.push(
      `<path d="M ${dx} ${baseY} L ${dx} ${dy + doorWidth / 2} A ${doorWidth / 2} ${doorWidth / 2} 0 0 1 ${dx + doorWidth} ${dy + doorWidth / 2} L ${dx + doorWidth} ${baseY} Z" fill="${SCENE_COLORS.violetDeep}"/>`,
      `<path d="M ${dx} ${baseY} L ${dx} ${dy + doorWidth / 2} A ${doorWidth / 2} ${doorWidth / 2} 0 0 1 ${dx + doorWidth} ${dy + doorWidth / 2} L ${dx + doorWidth} ${baseY} Z" fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="1.8" opacity="0.8"/>`,
    );
  }

  return parts.join('');
}

/**
 * Palmera con tronco curvo y hojas en abanico.
 * @param {{x: number, y: number, scale?: number, flip?: boolean}} options
 * @returns {string}
 */
export function drawPalm(options) {
  const { x, y, scale = 1, flip = false } = options;
  const trunk = `
    <path d="M 0 0 C -6 -40 -4 -72 4 -104" stroke="${SCENE_COLORS.roseDeep}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M -2 -6 C -8 -44 -6 -72 2 -100" stroke="${SCENE_COLORS.rose}" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7"/>`;

  const leaves = [
    { rotate: -62, length: 74 },
    { rotate: -40, length: 82 },
    { rotate: -16, length: 88 },
    { rotate: 12, length: 84 },
    { rotate: 38, length: 76 },
    { rotate: 58, length: 66 },
  ]
    .map(
      ({ rotate, length }) =>
        `<path d="M 3 -104 C ${18} ${-104 - length * 0.35} ${30} ${-104 - length * 0.7} 2 ${-104 - length}" ` +
        `stroke="${SCENE_COLORS.violetLight}" stroke-width="6" fill="none" stroke-linecap="round" ` +
        `transform="rotate(${rotate} 3 -104)"/>`,
    )
    .join('');

  return group(`${trunk}${leaves}`, {
    x,
    y,
    scale,
    flip,
  });
}

/**
 * Figura humana estilizada con manto y halo opcional.
 * @param {{x: number, y: number, height?: number, robe: string, robeDark?: string, skin?: string, halo?: boolean, arms?: 'down'|'raised'|'holding'}} options
 * @returns {string}
 */
export function drawPerson(options) {
  const {
    x,
    y,
    height = 120,
    robe,
    robeDark = robe,
    skin = '#e8c9a8',
    halo = false,
    arms = 'down',
  } = options;

  const headRadius = height * 0.13;
  const bodyWidth = height * 0.42;
  const shoulderY = y - height * 0.72;

  const armShapes = {
    down: `<path d="M ${x - bodyWidth / 2 + 4} ${shoulderY + 6} L ${x - bodyWidth / 2 - 6} ${y - height * 0.26}" stroke="${robeDark}" stroke-width="${height * 0.06}" stroke-linecap="round" fill="none"/>
           <path d="M ${x + bodyWidth / 2 - 4} ${shoulderY + 6} L ${x + bodyWidth / 2 + 6} ${y - height * 0.26}" stroke="${robeDark}" stroke-width="${height * 0.06}" stroke-linecap="round" fill="none"/>`,
    raised: `<path d="M ${x - bodyWidth / 2 + 4} ${shoulderY + 6} L ${x - bodyWidth / 2 - 18} ${shoulderY - height * 0.12}" stroke="${robeDark}" stroke-width="${height * 0.06}" stroke-linecap="round" fill="none"/>
              <path d="M ${x + bodyWidth / 2 - 4} ${shoulderY + 6} L ${x + bodyWidth / 2 + 18} ${shoulderY - height * 0.12}" stroke="${robeDark}" stroke-width="${height * 0.06}" stroke-linecap="round" fill="none"/>`,
    holding: `<path d="M ${x - bodyWidth / 2 + 4} ${shoulderY + 8} L ${x - bodyWidth / 2 - 4} ${y - height * 0.42}" stroke="${robeDark}" stroke-width="${height * 0.06}" stroke-linecap="round" fill="none"/>
               <path d="M ${x + bodyWidth / 2 - 4} ${shoulderY + 8} L ${x + bodyWidth / 2 + 4} ${y - height * 0.42}" stroke="${robeDark}" stroke-width="${height * 0.06}" stroke-linecap="round" fill="none"/>`,
  };

  return group(
    `
      ${halo ? `<circle cx="${x}" cy="${y - height * 0.86}" r="${headRadius * 1.55}" fill="${SCENE_COLORS.goldLight}" opacity="0.55"/>` : ''}
      <path d="M ${x - bodyWidth / 2} ${y} L ${x - bodyWidth * 0.36} ${shoulderY} Q ${x} ${shoulderY - height * 0.09} ${x + bodyWidth * 0.36} ${shoulderY} L ${x + bodyWidth / 2} ${y} Z" fill="${robe}"/>
      <path d="M ${x + bodyWidth * 0.1} ${shoulderY} L ${x + bodyWidth / 2} ${y} L ${x + bodyWidth * 0.06} ${y} Z" fill="${robeDark}" opacity="0.55"/>
      ${armShapes[arms]}
      <circle cx="${x}" cy="${y - height * 0.86}" r="${headRadius}" fill="${skin}"/>
      <path d="M ${x - headRadius * 0.95} ${y - height * 0.9} Q ${x} ${y - height * 1.04} ${x + headRadius * 0.95} ${y - height * 0.9} L ${x + headRadius * 0.7} ${y - height * 0.86} Q ${x} ${y - height * 0.96} ${x - headRadius * 0.75} ${y - height * 0.86} Z" fill="${SCENE_COLORS.ink}" opacity="0.75"/>
    `,
    {},
  );
}

/**
 * Caballo estilizado en perfil.
 * @param {{x: number, y: number, scale?: number, flip?: boolean, color?: string, colorDark?: string}} options
 * @returns {string}
 */
export function drawHorse(options) {
  const { x, y, scale = 1, flip = false, color = SCENE_COLORS.rose, colorDark = SCENE_COLORS.roseDeep } = options;

  return group(
    `
      <path d="M -58 0 C -54 -26 -38 -40 -16 -42 L 30 -40 C 44 -40 52 -50 56 -64 L 62 -74 L 66 -60 C 68 -52 74 -46 74 -38 L 72 -30 L 78 -26 L 74 -22 L 70 -26 C 68 -18 62 -14 52 -14 L 44 -14 L 40 0 L 32 0 L 34 -14 L 4 -14 L 0 0 L -8 0 L -4 -14 L -30 -14 L -34 0 L -42 0 L -38 -14 L -50 -12 Z" fill="${color}"/>
      <path d="M 30 -40 C 44 -40 52 -50 56 -64 L 62 -74 L 66 -60 C 68 -52 74 -46 74 -38 L 70 -26 L 62 -28 C 58 -36 48 -34 38 -34 Z" fill="${colorDark}" opacity="0.6"/>
      <path d="M -52 -16 C -34 -26 6 -26 34 -22" stroke="${colorDark}" stroke-width="4" fill="none" opacity="0.45"/>
      <circle cx="68" cy="-52" r="2.6" fill="${SCENE_COLORS.ink}"/>
    `,
    { x, y, scale, flip },
  );
}

/**
 * Oveja pequeña y redondita.
 * @param {{x: number, y: number, scale?: number, flip?: boolean}} options
 * @returns {string}
 */
export function drawSheep(options) {
  const { x, y, scale = 1, flip = false } = options;
  return group(
    `
      <ellipse cx="0" cy="-14" rx="20" ry="14" fill="${SCENE_COLORS.ivory}"/>
      <circle cx="-14" cy="-16" r="8" fill="${SCENE_COLORS.ivory}" opacity="0.9"/>
      <circle cx="-2" cy="-24" r="7" fill="${SCENE_COLORS.ivory}" opacity="0.85"/>
      <circle cx="10" cy="-20" r="7" fill="${SCENE_COLORS.ivory}" opacity="0.85"/>
      <ellipse cx="-20" cy="-16" rx="7" ry="6" fill="${SCENE_COLORS.ink}" opacity="0.75"/>
      <rect x="-8" y="-4" width="3" height="7" rx="1.5" fill="${SCENE_COLORS.ink}" opacity="0.7"/>
      <rect x="7" y="-4" width="3" height="7" rx="1.5" fill="${SCENE_COLORS.ink}" opacity="0.7"/>
    `,
    { x, y, scale, flip },
  );
}

/**
 * Estrella de cuatro puntas.
 * @param {{x: number, y: number, size: number, color?: string, opacity?: number}} options
 * @returns {string}
 */
export function drawSpark(options) {
  const { x, y, size, color = SCENE_COLORS.goldLight, opacity = 1 } = options;
  const inner = size * 0.22;
  return `<path d="M ${x} ${y - size} Q ${x + inner} ${y - inner} ${x + size} ${y} Q ${x + inner} ${y + inner} ${x} ${y + size} Q ${x - inner} ${y + inner} ${x - size} ${y} Q ${x - inner} ${y - inner} ${x} ${y - size} Z" fill="${color}" opacity="${opacity}"/>`;
}

/**
 * Arco decorativo con adorno superior.
 * @param {{x: number, y: number, width: number, height: number, stroke?: string, strokeWidth?: number}} options
 * @returns {string}
 */
export function drawArch(options) {
  const { x, y, width, height, stroke = SCENE_COLORS.gold, strokeWidth = 6 } = options;
  const radius = width / 2;
  return `<path d="M ${x} ${y} L ${x} ${y - height + radius} A ${radius} ${radius} 0 0 1 ${x + width} ${y - height + radius} L ${x + width} ${y}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
}
