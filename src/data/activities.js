/**
 * Registro de tipos de actividad.
 *
 * Cada tipo declara su etiqueta, su icono y cómo se presenta. El calendario
 * consulta este mapa para pintar las etiquetas de las casillas; para añadir un
 * tipo nuevo basta con registrarlo aquí y crear su componente.
 */

export const ACTIVITY_TYPES = {
  reflection: {
    label: 'Reflexión',
    shortLabel: 'Reflexión',
    icon: 'spark',
    accent: 'violet',
    description: 'Una lectura breve y una pregunta para meditar.',
  },
  prayer: {
    label: 'Oración',
    shortLabel: 'Oración',
    icon: 'hands',
    accent: 'gold',
    description: 'Una oración corta para repetir en casa o en comunidad.',
  },
  challenge: {
    label: 'Reto personal',
    shortLabel: 'Reto',
    icon: 'heart',
    accent: 'rose',
    description: 'Un compromiso personal concreto para el día.',
  },
  challengeFamily: {
    label: 'Reto familiar',
    shortLabel: 'Familia',
    icon: 'family',
    accent: 'gold',
    description: 'Una actividad para hacer en familia o en grupo.',
  },
  scramble: {
    label: 'Actividad bíblica',
    shortLabel: 'Ordenar',
    icon: 'scroll',
    accent: 'violet',
    description: 'Reconstruye un mensaje reordenando palabras.',
  },
  riddle: {
    label: 'Acertijo',
    shortLabel: 'Acertijo',
    icon: 'star',
    accent: 'gold',
    description: 'Resuelve un acertijo sobre la historia de la salvación.',
  },
  wordsearch: {
    label: 'Sopa de letras',
    shortLabel: 'Sopa',
    icon: 'grid',
    accent: 'violet',
    description: 'Encuentra las palabras escondidas en la cuadrícula.',
  },
  quiz: {
    label: 'Trivia bíblica',
    shortLabel: 'Trivia',
    icon: 'question',
    accent: 'gold',
    description: 'Responde y aprende sobre los personajes de la Navidad.',
  },
  trivia: {
    label: 'Juego de preguntas',
    shortLabel: 'Juego',
    icon: 'question',
    accent: 'rose',
    description: 'Varias preguntas con explicación al terminar.',
  },
  music: {
    label: 'Actividad musical',
    shortLabel: 'Música',
    icon: 'music',
    accent: 'gold',
    description: 'Canta un villancico o compón el tuyo.',
  },
  purpose: {
    label: 'Propósito espiritual',
    shortLabel: 'Propósito',
    icon: 'sparkle',
    accent: 'rose',
    description: 'Elige compromisos concretos para el Adviento.',
  },
  special: {
    label: 'Celebración',
    shortLabel: 'Celebración',
    icon: 'star',
    accent: 'gold',
    description: 'Una experiencia especial de la comunidad.',
  },
};

/**
 * Devuelve la metadata de un tipo de actividad.
 * @param {string} type
 * @returns {{label: string, shortLabel: string, icon: string, accent: string, description: string}}
 */
export function getActivityType(type) {
  return (
    ACTIVITY_TYPES[type] || {
      label: 'Actividad',
      shortLabel: 'Actividad',
      icon: 'spark',
      accent: 'gold',
      description: 'Contenido del día.',
    }
  );
}

export default ACTIVITY_TYPES;
