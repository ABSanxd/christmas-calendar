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
  // --- Tonos cálidos de la aldea: piedra, barro cocido y luz de lamparilla ---
  wall: '#f2e4c9',
  wallShade: '#dcc8a2',
  wallDeep: '#c3a97e',
  terracotta: '#c9784f',
  terracottaDeep: '#a3593a',
  amber: '#f6bd52',
  amberSoft: '#ffe2ab',
  brown: '#7b543a',
  brownDeep: '#5d3d29',
  grass: '#8dab63',
  grassDeep: '#5f7d43',
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
 *
 * Las ventanas usan siempre el mismo criterio, para que se lean como una
 * familia: marco marrón cálido, cristal ámbar cuando están encendidas y
 * hueco marrón apagado cuando no. Así se distinguen tanto sobre una fachada
 * clara como sobre una de color.
 *
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
    color = SCENE_COLORS.wall,
    shade = SCENE_COLORS.wallShade,
  } = options;

  const parts = [];
  const litWindows = options.litWindows ?? 0;

  // Sombra de contacto: la casa se apoya en el suelo, no flota encima.
  parts.push(
    `<ellipse cx="${x + width / 2}" cy="${baseY}" rx="${(width * 0.56).toFixed(1)}" ry="${Math.max(5, height * 0.03).toFixed(1)}" fill="${SCENE_COLORS.brownDeep}" opacity="0.16"/>`,
  );

  // Cuerpo de la casa con esquinas ligeramente redondeadas.
  parts.push(
    `<rect x="${x}" y="${baseY - height}" width="${width}" height="${height}" rx="4" fill="${color}"/>`,
  );
  // Franja de sombra en la base.
  parts.push(
    `<rect x="${x}" y="${baseY - height * 0.18}" width="${width}" height="${height * 0.18}" fill="${shade}" opacity="0.85"/>`,
  );
  // Sombra lateral: da volumen al bloque.
  parts.push(
    `<rect x="${x}" y="${baseY - height}" width="${width * 0.07}" height="${height}" fill="${shade}" opacity="0.6"/>`,
  );

  // Cúpula. El tono es configurable porque en las casas claras la cúpula
  // debe ser más clara que el muro, o no se distingue.
  if (dome) {
    const cx = x + width / 2;
    const r = width * 0.26;
    const domeColor = options.domeColor ?? shade;
    parts.push(
      `<path d="M ${cx - r} ${baseY - height} A ${r} ${r} 0 0 1 ${cx + r} ${baseY - height} Z" fill="${domeColor}" stroke="${SCENE_COLORS.brownDeep}" stroke-width="1.4" stroke-opacity="0.3"/>`,
      `<path d="M ${cx - r * 0.18} ${baseY - height - r * 0.9} L ${cx} ${baseY - height - r * 1.22} L ${cx + r * 0.18} ${baseY - height - r * 0.9} Z" fill="${SCENE_COLORS.gold}"/>`,
    );
  }

  // Ventanas en arco.
  const windowWidth = width * 0.17;
  const windowHeight = height * 0.24;
  const gap = width * 0.24;
  const startX = x + width / 2 - ((windows - 1) * gap) / 2;
  for (let index = 0; index < windows; index += 1) {
    const wx = startX + index * gap - windowWidth / 2;
    const wy = baseY - height * 0.66;
    const isLit = index < litWindows;
    const glass = isLit ? SCENE_COLORS.amber : SCENE_COLORS.brown;
    const arch = `M ${wx} ${wy + windowHeight} L ${wx} ${wy + windowWidth / 2} A ${windowWidth / 2} ${windowWidth / 2} 0 0 1 ${wx + windowWidth} ${wy + windowWidth / 2} L ${wx + windowWidth} ${wy + windowHeight} Z`;
    if (isLit) {
      // El halo va DETRÁS del cristal: si se pone delante, lo lava.
      parts.push(
        `<ellipse cx="${wx + windowWidth / 2}" cy="${wy + windowHeight / 2}" rx="${windowWidth * 0.75}" ry="${windowHeight * 0.9}" fill="${SCENE_COLORS.amberSoft}" opacity="0.2"/>`,
      );
    }
    parts.push(
      `<path d="${arch}" fill="${glass}" opacity="${isLit ? 0.96 : 0.8}"/>`,
      `<path d="${arch}" fill="none" stroke="${SCENE_COLORS.brownDeep}" stroke-width="1.8" opacity="0.85"/>`,
      `<path d="M ${wx + windowWidth / 2} ${wy + windowWidth / 2 - 1} L ${wx + windowWidth / 2} ${wy + windowHeight}" stroke="${SCENE_COLORS.brownDeep}" stroke-width="1.6" opacity="0.7"/>`,
    );
  }

  // Puerta en arco.
  if (door) {
    const doorWidth = width * 0.2;
    const doorHeight = height * 0.36;
    const dx = x + width / 2 - doorWidth / 2;
    const dy = baseY - doorHeight;
    const arch = `M ${dx} ${baseY} L ${dx} ${dy + doorWidth / 2} A ${doorWidth / 2} ${doorWidth / 2} 0 0 1 ${dx + doorWidth} ${dy + doorWidth / 2} L ${dx + doorWidth} ${baseY} Z`;
    parts.push(
      `<path d="${arch}" fill="${SCENE_COLORS.violetDeep}"/>`,
      `<path d="${arch}" fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="1.8" opacity="0.85"/>`,
      `<ellipse cx="${dx + doorWidth / 2}" cy="${baseY - 2}" rx="${doorWidth * 0.9}" ry="${doorWidth * 0.3}" fill="${SCENE_COLORS.amber}" opacity="0.22"/>`,
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

