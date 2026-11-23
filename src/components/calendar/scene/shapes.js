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
  pinkLight: '#f0c4d3',
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
 * @param {{x: number, baseY: number, width: number, height: number, dome?: boolean, windows?: number, door?: boolean, color?: string, shade?: string, litWindows?: number}} options
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
  const litWindows = options.litWindows ?? 0;

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
    const isLit = index < litWindows;
    const glass = isLit ? '#f6d98a' : SCENE_COLORS.night;
    parts.push(
      `<path d="M ${wx} ${wy + windowHeight} L ${wx} ${wy + windowWidth / 2} A ${windowWidth / 2} ${windowWidth / 2} 0 0 1 ${wx + windowWidth} ${wy + windowWidth / 2} L ${wx + windowWidth} ${wy + windowHeight} Z" fill="${glass}" opacity="${isLit ? 0.95 : 0.85}"/>`,
      `<path d="M ${wx} ${wy + windowHeight} L ${wx} ${wy + windowWidth / 2} A ${windowWidth / 2} ${windowWidth / 2} 0 0 1 ${wx + windowWidth} ${wy + windowWidth / 2} L ${wx + windowWidth} ${wy + windowHeight} Z" fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="1.6" opacity="0.7"/>`,
    );
    if (isLit) {
      // Resplandor contenido: da calidez sin manchar la fachada.
      parts.push(
        `<ellipse cx="${wx + windowWidth / 2}" cy="${wy + windowHeight / 2}" rx="${windowWidth * 0.85}" ry="${windowHeight * 0.95}" fill="#f6d98a" opacity="0.3"/>`,
      );
    }
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
 * Estrella de cuatro puntas.
 * @param {{x: number, y: number, size: number, color?: string, opacity?: number}} options
 * @returns {string}
 */
export function drawSpark(options) {
  const { x, y, size, color = SCENE_COLORS.goldLight, opacity = 1 } = options;
  const inner = size * 0.22;
  return `<path d="M ${x} ${y - size} Q ${x + inner} ${y - inner} ${x + size} ${y} Q ${x + inner} ${y + inner} ${x} ${y + size} Q ${x - inner} ${y + inner} ${x - size} ${y} Q ${x - inner} ${y - inner} ${x} ${y - size} Z" fill="${color}" opacity="${opacity}"/>`;
}

