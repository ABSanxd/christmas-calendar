/**
 * Ángel trompetista.
 *
 * Vista **frontal y simétrica**. Es una decisión deliberada: el duplicado
 * de la escena se genera con `scale(-1 1)`, así que una figura de frente
 * produce un espejo exacto y ambos lados del cielo de Belén mantienen el
 * mismo peso visual. La única asimetría (la trompeta) es intencionada y
 * simula el reflejo de los dos ángeles de la ilustración de referencia.
 *
 * Lectura del personaje (según la ilustración de referencia):
 * - aurela dorada flotando sobre la cabeza;
 * - melena larga con raya al centro que cae sobre los hombros;
 * - manto lavanda de falda amplia con banda crema en el bajo;
 * - alas color marfil con borde emplumado;
 * - trompetita dorada alzada en una mano, la otra descansa en el pecho.
 *
 * Todo el personaje está construido con curvas Bézier: no hay círculos ni
 * rectángulos rígidos, para que el resultado se lea como una ilustración
 * dibujada y no como un ensamblaje de figuras geométricas.
 */

import { SCENE_COLORS } from '../shapes.js';

/**
 * @param {object} options
 * @param {number} options.x
 * @param {number} options.y      Base del manto.
 * @param {number} [options.scale]
 * @param {boolean} [options.flip] Orienta el ángel hacia el centro.
 * @param {string} [options.robe]
 * @returns {string}
 */
export function drawAngel(options) {
  const {
    x,
    y,
    scale = 1,
    flip = false,
    robe = '#a789d0',
    headDrop = 6,
  } = options;

  // Paleta local. `shade` se usa con opacidad para que el mismo dibujo
  // sirva con cualquier color de manto (cada ángel usa uno distinto).
  const skin = '#f3d4b6';
  const skinShade = '#dfb092';
  const hair = '#8b6141';
  const hairLight = '#a97c56';
  const hairDark = '#6d492f';
  const feather = '#f7f1e6';
  const featherShade = '#e7ddc9';
  const featherDeep = '#d5c8ae';
  const gold = '#e2bb59';
  const goldLight = '#f8e3a6';
  const goldDeep = '#b48f3d';
  const blush = '#ee9aa4';
  const ink = '#3a2b3f';
  const shade = SCENE_COLORS.violetDeep;

  // Desplazamiento vertical de la cabeza respecto al cuerpo. Las alas y el
  // manto no se tocan: bajan solo el rostro, el pelo y la aurela, de forma
  // que la cabeza repose sobre los hombros en vez de quedar "en alto".
  // Sube el valor para bajarla más; bájalo para devolverla a su sitio.
  //
  // El cuello no puede moverse como un bloque: su parte alta pertenece a la
  // cabeza y su base tiene que seguir llegando al escote del manto. Por eso
  // se calcula con `chinY` (que sigue a la cabeza) y con un pie fijo en
  // `neckFootY` (que pertenece al cuerpo).
  const chinY = -112 + headDrop;
  const neckTopY = chinY - 11;
  const neckFootY = -99;

  // Un ala se dibuja una sola vez y se reutiliza en espejo: así las dos
  // alas son exactamente iguales y el personaje queda equilibrado.
  const wing = `
    <path d="M 12 -112 C 32 -124 66 -128 94 -121 C 102 -119 107 -113 104 -108
             C 88 -98 64 -88 44 -85 C 28 -83 16 -86 12 -92 Z"
          fill="${feather}" stroke="${featherDeep}" stroke-width="1.2"/>
    <path d="M 14 -101 C 34 -112 66 -115 90 -110 C 97 -109 102 -106 99 -102
             C 85 -94 62 -85 44 -82 C 30 -80 19 -83 14 -89 Z"
          fill="${featherDeep}" opacity="0.45"/>
    <ellipse cx="25" cy="-88" rx="13" ry="8" transform="rotate(-32 25 -88)" fill="${feather}"/>
    <ellipse cx="43" cy="-86" rx="14" ry="8.5" transform="rotate(-22 43 -86)" fill="${feather}"/>
    <ellipse cx="61" cy="-85" rx="14" ry="8.5" transform="rotate(-12 61 -85)" fill="${feather}"/>
    <ellipse cx="79" cy="-88" rx="13" ry="8" transform="rotate(-2 79 -88)" fill="${feather}"/>
    <ellipse cx="94" cy="-97" rx="11" ry="7" transform="rotate(12 94 -97)" fill="${feather}"/>
    <path d="M 34 -95 Q 37 -86 35 -79" stroke="${featherShade}" stroke-width="1.5" fill="none" opacity="0.8" stroke-linecap="round"/>
    <path d="M 52 -96 Q 55 -87 53 -80" stroke="${featherShade}" stroke-width="1.5" fill="none" opacity="0.8" stroke-linecap="round"/>
    <path d="M 70 -97 Q 73 -88 71 -81" stroke="${featherShade}" stroke-width="1.5" fill="none" opacity="0.8" stroke-linecap="round"/>
  `;

  const angel = `
    <!-- === RESPLANDOR DE LA AURELA === -->
    <g transform="translate(0 ${headDrop})">
      <ellipse cx="0" cy="-167" rx="35" ry="14.5" fill="${goldLight}" opacity="0.05"/>
      <ellipse cx="0" cy="-167" rx="32" ry="13" fill="${goldLight}" opacity="0.05"/>
      <ellipse cx="0" cy="-167" rx="29" ry="11.5" fill="${goldLight}" opacity="0.06"/>
      <ellipse cx="0" cy="-167" rx="26" ry="10" fill="${goldLight}" opacity="0.07"/>
    </g>

    <!-- === ALAS (detrás del cuerpo) === -->
    <g>${wing}</g>
    <g transform="scale(-1 1)">${wing}</g>

    <!-- === MELENA (volumen trasero, da grosor al pelo) === -->
    <g transform="translate(0 ${headDrop})">
      <path d="M 0 -162 C -20 -162 -29 -148 -29 -131 C -30 -115 -28 -102 -26 -94
               C -18 -99 -8 -101 0 -101 C 8 -101 18 -99 26 -94
               C 28 -102 30 -115 29 -131 C 29 -148 20 -162 0 -162 Z"
            fill="${hairDark}"/>
    </g>

    <!-- === PIE Y MANTO === -->
    <!-- Cuello: su parte alta sigue al mentón y su base se ancla al escote. -->
    <path d="M -4.5 ${neckTopY} L -4.5 ${neckFootY - 6}
             Q -4.5 ${neckFootY} 0 ${neckFootY}
             Q 4.5 ${neckFootY} 4.5 ${neckFootY - 6} L 4.5 ${neckTopY} Z"
          fill="${skinShade}"/>
    <path d="M -17 -97 C -22 -66 -29 -32 -34 -3 Q 0 5 34 -3
             C 29 -32 22 -66 17 -97 Q 0 -104 -17 -97 Z"
          fill="${robe}" stroke="${shade}" stroke-width="1" stroke-opacity="0.35"/>
    <!-- Pliegues suaves del faldón -->
    <path d="M -8 -97 C -13 -60 -15 -28 -13 -1" stroke="${shade}" stroke-width="2.2" fill="none" opacity="0.28"/>
    <path d="M 8 -97 C 12 -60 14 -28 13 -1" stroke="${shade}" stroke-width="2.2" fill="none" opacity="0.28"/>
    <path d="M 0 -100 C -1 -64 -2 -32 -1 2" stroke="${shade}" stroke-width="2" fill="none" opacity="0.2"/>
    <!-- Luz central del manto -->
    <path d="M -3 -99 C -5 -62 -6 -30 -5 2 L 5 2 C 6 -30 5 -62 3 -99 Z" fill="${goldLight}" opacity="0.12"/>
    <!-- Sombra en los bordes -->
    <path d="M -17 -97 C -21 -68 -27 -34 -32 -6 Q -26 -3 -22 -5 C -18 -32 -13 -66 -10 -96 Z" fill="${shade}" opacity="0.18"/>
    <path d="M 17 -97 C 21 -68 27 -34 32 -6 Q 26 -3 22 -5 C 18 -32 13 -66 10 -96 Z" fill="${shade}" opacity="0.18"/>
    <!-- Cuello del forro -->
    <path d="M -8 -99 Q 0 -104 8 -99 Q 5 -94 0 -92 Q -5 -94 -8 -99 Z" fill="${shade}" opacity="0.55"/>
    <!-- Banda crema del bajo y filete dorado -->
    <path d="M -33 -16 Q 0 -4 33 -16 L 34 -3 Q 0 5 -34 -3 Z" fill="${feather}"/>
    <path d="M -33 -18 Q 0 -6 33 -18" stroke="${gold}" stroke-width="1.4" fill="none" opacity="0.8"/>

    <!-- === CARA, MELENA DELANTERA Y AURELA (bajan juntas) === -->
    <g transform="translate(0 ${headDrop})">
      <!-- === CARA === -->
      <path d="M 0 -148 C 12 -148 23 -140 23 -129 C 22 -120 13 -114 0 -112
               C -13 -114 -22 -120 -23 -129 C -23 -140 -12 -148 0 -148 Z"
            fill="${skin}"/>
      <!-- Mejillas -->
      <ellipse cx="-13" cy="-121" rx="5" ry="3.2" fill="${blush}" opacity="0.42"/>
      <ellipse cx="13" cy="-121" rx="5" ry="3.2" fill="${blush}" opacity="0.42"/>
      <!-- Cejas -->
      <path d="M -13.5 -138 Q -8 -141 -2.5 -138" stroke="${hair}" stroke-width="1.7" fill="none" opacity="0.7" stroke-linecap="round"/>
      <path d="M 2.5 -138 Q 8 -141 13.5 -138" stroke="${hair}" stroke-width="1.7" fill="none" opacity="0.7" stroke-linecap="round"/>
      <!-- Ojos -->
      <ellipse cx="-8" cy="-130" rx="4.4" ry="5.2" fill="${ink}"/>
      <ellipse cx="8" cy="-130" rx="4.4" ry="5.2" fill="${ink}"/>
      <circle cx="-9.4" cy="-132.2" r="1.7" fill="#ffffff"/>
      <circle cx="6.6" cy="-132.2" r="1.7" fill="#ffffff"/>
      <!-- Naricilla y sonrisa -->
      <ellipse cx="0" cy="-125" rx="1.7" ry="1.2" fill="${skinShade}" opacity="0.7"/>
      <path d="M -4.2 -118.5 Q 0 -115 4.2 -118.5" stroke="#9c5f5a" stroke-width="1.8" fill="none" stroke-linecap="round"/>

      <!-- === MELENA DELANTERA (raya al centro y mechones laterales) === -->
      <path d="M -21 -144 C -24 -157 -13 -163 0 -163 C 13 -163 24 -157 21 -144
               C 21 -130 22 -112 21 -98 C 18 -91 13 -93 16 -99
               C 17 -114 17 -129 18 -144
               C 16 -149 9 -152 3 -152 C 1 -154 -1 -154 -3 -152
               C -9 -152 -16 -149 -18 -144
               C -17 -129 -17 -114 -16 -99
               C -13 -93 -18 -91 -21 -98
               C -22 -112 -21 -130 -21 -144 Z"
            fill="${hair}"/>
      <!-- Brillo del pelo -->
      <path d="M -20 -141 C -22 -153 -13 -160 -3 -161 C -12 -156 -17 -150 -18 -142 Z" fill="${hairLight}" opacity="0.75"/>
      <path d="M 20 -141 C 22 -153 13 -160 3 -161 C 12 -156 17 -150 18 -142 Z" fill="${hairLight}" opacity="0.6"/>
      <!-- Raya al centro -->
      <path d="M 0 -161 C -1 -158 -1 -155 0 -152" stroke="${hairDark}" stroke-width="1.5" fill="none" opacity="0.55" stroke-linecap="round"/>

      <!-- === AURELA (encima de la melena) === -->
      <g transform="rotate(-7 0 -167)">
        <ellipse cx="0" cy="-167" rx="23.5" ry="8.4" fill="none" stroke="${goldDeep}" stroke-width="4.8" opacity="0.45"/>
        <ellipse cx="0" cy="-167" rx="23.5" ry="8.4" fill="none" stroke="${gold}" stroke-width="3.2"/>
        <ellipse cx="0" cy="-168.3" rx="23.5" ry="8.4" fill="none" stroke="${goldLight}" stroke-width="1.3" opacity="0.85"/>
      </g>
    </g>

    <!-- === BRAZOS Y TROMPETE === -->
    <!-- Manga: campana estrecha que cae desde el hombro. Se reutiliza en los
         dos brazos para que ambos remangos tengan el mismo volumen. -->
    <g transform="translate(-33 -104) rotate(-16)">
      <path d="M -8.5 0 C -12 8 -13 21 -9.5 29 C -5 36 5 36 9.5 29
               C 13 21 12 8 8.5 0 C 3 -3.5 -3 -3.5 -8.5 0 Z" fill="${robe}"/>
      <path d="M -8.5 0 C -12 8 -13 21 -9.5 29 C -6 34 -2 35 0 35
               C -4 28 -5 12 -3 0 Z" fill="${shade}" opacity="0.22"/>
    </g>
    <!-- Brazo que alza la trompeta -->
    <path d="M -7 -97 C -15 -101 -25 -105 -33 -106
             C -36 -103 -35 -98 -30 -96 C -21 -93 -13 -92 -9 -89 Z" fill="${robe}"/>
    <path d="M -31 -104 C -33 -101 -33 -98 -30 -96 C -26 -97 -22 -99 -19 -100 Z" fill="${shade}" opacity="0.38"/>
    <!-- Manga del brazo libre, colgando al costado -->
    <g transform="translate(15 -97) rotate(9)">
      <path d="M -8.5 0 C -12 8 -13 21 -9.5 29 C -5 36 5 36 9.5 29
               C 13 21 12 8 8.5 0 C 3 -3.5 -3 -3.5 -8.5 0 Z" fill="${robe}"/>
      <path d="M -8.5 0 C -12 8 -13 21 -9.5 29 C -6 34 -2 35 0 35
               C -4 28 -5 12 -3 0 Z" fill="${shade}" opacity="0.22"/>
    </g>
    <!-- Antebrazo y mano libre apoyada en el pecho -->
    <path d="M 13 -90 C 11 -89 9 -88 7 -88" stroke="${robe}" stroke-width="6.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="4" cy="-88" rx="5" ry="3.6" fill="${skin}" transform="rotate(-16 4 -88)"/>
    <!-- Trompeta: tubo fino y campana acampanada con la boca abierta -->
    <g transform="translate(-46 -148) rotate(20)">
      <path d="M -3 11 C -4 4 -7 -3 -8.5 -7 C -4 -11 4 -11 8.5 -7
               C 7 -3 4 4 3 11 Z" fill="${gold}"/>
      <ellipse cx="0" cy="-7" rx="8.5" ry="3.8" fill="${goldDeep}"/>
      <ellipse cx="0" cy="-7.6" rx="6.4" ry="2.6" fill="${goldLight}" opacity="0.5"/>
      <path d="M -8.5 -7 C -8.5 -10.6 -3.5 -12 0 -12 C 3.5 -12 8.5 -10.6 8.5 -7"
            fill="none" stroke="${goldLight}" stroke-width="2" stroke-linecap="round"/>
      <path d="M -2.6 8 C -3.4 2 -4.6 -2 -5.6 -6" stroke="${goldLight}" stroke-width="1.6" fill="none" opacity="0.7" stroke-linecap="round"/>
    </g>
    <path d="M -38 -107 L -48 -140" stroke="${goldDeep}" stroke-width="5.4" stroke-linecap="round"/>
    <path d="M -38 -107 L -48 -140" stroke="${gold}" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M -39 -107.5 L -49 -140" stroke="${goldLight}" stroke-width="1.2" stroke-linecap="round" opacity="0.9"/>
    <!-- Mano que sujeta la trompeta -->
    <ellipse cx="-37" cy="-108" rx="5.4" ry="4.4" fill="${skin}" transform="rotate(-62 -37 -108)"/>
  `;

  return `<g transform="translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})">${angel}</g>`;
}

export default drawAngel;
