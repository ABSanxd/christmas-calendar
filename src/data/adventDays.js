/**
 * Contenido de los 24 días del calendario de Adviento 2026.
 *
 * Cada día declara su tipo de actividad y el contenido correspondiente. Para
 * incorporar un nuevo tipo basta con añadirlo en `activities.js` y en el
 * registro de actividades; el calendario no necesita cambios.
 *
 * Tipos disponibles:
 *   reflection | prayer | challenge | challengeFamily | scramble | riddle |
 *   wordsearch | quiz | trivia | music | purpose | special
 */

/**
 * @typedef {object} AdventDay
 * @property {string} id          Identificador estable (day-01).
 * @property {number} day         Número de casilla (1..24).
 * @property {string} title       Título visible.
 * @property {string} subtitle    Bajada breve.
 * @property {string} type        Tipo de actividad.
 * @property {string} icon        Nombre del icono SVG.
 * @property {string} [verseKey]  Clave del versículo en `bibleVerses.js`.
 * @property {boolean} requiresInteraction
 * @property {boolean} completionEnabled
 * @property {object} content     Datos específicos del tipo.
 */

/** @type {AdventDay[]} */
export const ADVENT_DAYS = [
  {
    id: 'day-01',
    day: 1,
    title: 'Comienza nuestro camino',
    subtitle: 'La primera chispa de esperanza',
    type: 'reflection',
    icon: 'spark',
    verseKey: 'emmanuel',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      paragraphs: [
        'Hoy comienza el Adviento. No es solo un calendario que se abre: es un camino. ' +
          'Durante veinticuatro días iremos preparando el lugar donde Jesús quiere nacer.',
        'El Adviento es tiempo de silencio y de espera, pero también de acción. ' +
          'Cada día que descubrimos es un pequeño regalo que Dios nos deja junto a la puerta ' +
          'de nuestra casa, como quien deja una lámpara encendida para que no se pierda el camino.',
      ],
      question: {
        prompt: '¿Qué esperas de este Adviento?',
        options: [
          'Orar mejor cada día',
          'Estar más cerca de mi familia',
          'Sacar a la luz un gesto de bondad',
          'Prepararme para recibir a Jesús',
        ],
      },
      closing:
        'La estrella ya está en el cielo. Solo falta caminar hacia ella, un paso cada día.',
    },
  },
  {
    id: 'day-02',
    day: 2,
    title: 'Una pequeña oración',
    subtitle: 'Un minuto que cambia el día',
    type: 'prayer',
    icon: 'hands',
    verseKey: 'Saludo',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      prayerKey: 'manana',
      hint: 'Lee en voz alta, si estás acompañado, leanla juntos',
    },
  },
  {
    id: 'day-03',
    day: 3,
    title: 'Un gesto de amor',
    subtitle: 'Lo pequeño también ilumina',
    type: 'challenge',
    icon: 'heart',
    verseKey: 'Amor',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      intro:
        'Jesús no necesitó grandes gestos para salvarnos: necesitó ternura. ' +
        'Hoy tú puedes hacer lo mismo con un gesto pequeño.',
      steps: [
        'Escoge a una persona y dile algo que normalmente no le dices: un agradecimiento sincero.',
        'Reserva cinco minutos para alguien que vive solo, está enfermo o necesita compañía.',
        'Cierra el día con un gesto de bondad que no cueste dinero: una puerta, una llamada, un abrazo.',
      ],
      encouragement:
        '¡Muy bien! Cada pequeño gesto de amor nos acerca a las manos que sostienen al Niño de Belén.',
    },
  },
  {
    id: 'day-04',
    day: 4,
    title: 'Descubre el mensaje',
    subtitle: 'Ordena las palabras del ángel',
    type: 'scramble',
    icon: 'scroll',
    verseKey: 'Gloria',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      hideVerse: true,
      intro:
        'Los ángeles anunciaron a los pastores un cántico que todavía se canta esta noche. ' +
        'Hoy no te lo damos: búscalo en tu Biblia.',
      instruction:
        'Abre tu Biblia en Lucas 2, 14 y lee el cántico de los ángeles. Después toca las ' +
        'palabras en el orden correcto para reconstruir el mensaje.',
      words: ['GLORIA', 'A', 'DIOS', 'EN', 'LAS', 'ALTURAS'],
      solution: 'GLORIA A DIOS EN LAS ALTURAS',
      hint: 'Es el primer cántico que los ángeles cantaron en Belén (Lucas 2, 14).',
    },
  },
  {
    id: 'day-05',
    day: 5,
    title: 'La alegría de compartir',
    subtitle: 'Un reto para toda la familia',
    type: 'challengeFamily',
    icon: 'family',
    verseKey: 'LuzMundo',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      intro:
        'La alegría que se comparte se multiplica. Esta noche, reunan a su familia ' +
        '(o a su grupo) y hagan juntos un gesto de preparación.',
      steps: [
        'Entreguen una caja de víveres, ropa o útiles en la puerta de una casa que lo necesite.',
        'Compartan una comida con una familia sola, con un enfermo o con alguien que no tiene con quién celebrar.',
        'Regalen algo que para ustedes es fácil: su tiempo, una novella, un lugar en su mesa.',
      ],
      duration: '30-45 minutos',
      encouragement:
        '¡Qué bonito! La alegría de hoy no fue un regalo recibido, sino un regalo compartido.',
    },
  },
  {
    id: 'day-06',
    day: 6,
    title: 'María, ejemplo de fe',
    subtitle: 'La que dijo sí',
    type: 'reflection',
    icon: 'star',
    verseKey: 'Magnificat',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      paragraphs: [
        'María no entendió todo lo que le anunciaban, pero confió. Se quedó con una noticia ' +
          'que no cabía en su cabeza y, aun así, dijo que sí.',
        'Antes de que el ángel llegara, María ya estaba en el Magnificat: "Magnificat anima mea ' +
          'Dominum". Su primera reacción no fue la duda, sino la alabanza.',
      ],
      question: {
        prompt: '¿En qué momento de tu vida te ha costado decir que sí?',
        options: [
          'Cuando alguien me pidió perdón',
          'Cuando tuve que cambiar de planes',
          'Cuando no entendía lo que pasaba',
          'Cuando algo me parecía imposible',
        ],
      },
      closing:
        'María no lo tenía todo resuelto: lo tenía confiado. Hoy puedes copiarle.',
    },
  },
  {
    id: 'day-07',
    day: 7,
    title: 'Villancicos para Jesús',
    subtitle: 'Canta con nosotros',
    type: 'music',
    icon: 'music',
    verseKey: 'Gloria',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      mode: 'sing',
      title: 'Noche de paz',
      subtitle: 'Canon tradicional · dominio público',
      intro:
        'Pulsa "Escuchar" y deja que la campanita marque la melodía. Después, toca las notas ' +
        'que se encienden para cantar juntos.',
      stanzas: [
        [
          'Noche de paz, noche de amor,',
          'ya brilla la estrella del cielo;',
          'en el campo suena el canto de los ángeles:',
          '¡Gloria a Dios en las alturas!',
        ],
        [
          'En el cielo brillan las estrellas,',
          'la luna y el sol;',
          'y en la tierra ya suena el canto de los ángeles:',
          '¡Gloria a Dios en las alturas!',
        ],
      ],
      closing:
        'La música que nace en un pesebre sigue siendo canción de familia. Cántala hoy.',
    },
  },
  {
    id: 'day-08',
    day: 8,
    title: 'La estrella de Belén',
    subtitle: 'Un acertijo para pensar',
    type: 'riddle',
    icon: 'star',
    verseKey: 'Estrella',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      question:
        'No la hizo ningún carpintero y no se apagó con el viento. Brilla en el cielo, ' +
        'guía a tres reyes y se apagó cuando el Niño ya estaba en la cuna. ¿Quién soy?',
      answer: 'estrella',
      acceptedAnswers: ['estrella', 'la estrella', 'estrella de belen', 'estrella de belén'],
      hints: [
        'No es un astro cualquiera: fue señal de una noticia.',
        'C Numbers 24,17 la anuncia: "La estrella sale de Jacob".',
        'Los Magos lafollowed como se sigue una luz.',
      ],
      success:
        '¡Exacto! La estrella no guiaba un camino, señalaba a una Persona. Por eso la seguimos con el corazón.',
    },
  },
  {
    id: 'day-09',
    day: 9,
    title: 'Un momento de gratitud',
    subtitle: 'Lo que ya tienes',
    type: 'purpose',
    icon: 'sparkle',
    verseKey: 'GloriaDios',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      intro:
        'La gratitud es una forma corta de-oración. Elige al menos tres cosas por las que ' +
        'quieres dar gracias a Dios hoy.',
      options: [
        'Por la salud de mi cuerpo',
        'Por las personas que me quieren',
        'Por un techo y un pan',
        'Por una sonrisa que me regalaron',
        'Por la familia que tengo',
        'Por algo que me costó effort',
        'Por la luz que me guía',
        'Por lo que aún no ha llegado, pero ya espero',
      ],
      closing: 'Cada «gracias» es una semilla de Adviento.',
    },
  },
  {
    id: 'day-10',
    day: 10,
    title: 'Preparamos el corazón',
    subtitle: 'Soltar para poder recibir',
    type: 'reflection',
    icon: 'heart',
    verseKey: 'Perdón',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      paragraphs: [
        'El pesebre de Belén era un lugar pequeño y austero. Nadie lo escogería para un gran ' +
          'evento, y sin embargo el mundo cambió allí.',
        'Jesús nace en el lugar de los que nada tienen. Para recibirlo, el corazón también ' +
          'tiene que quedar desprovisto: de orgullo, de deudas, de rencores guardados.',
      ],
      question: {
        prompt: '¿Qué necesitas soltar para preparar tu corazón?',
        options: [
          'Un rencor guardado',
          'Una exigencia hacia alguien',
          'La prisa por tener todo resuelto',
          'Un miedo antiguo',
        ],
      },
      closing:
        'Soltar no es olvidar: es dejar de cargar con lo que no nos pertenece.',
    },
  },
  {
    id: 'day-11',
    day: 11,
    title: 'Los pastores',
    subtitle: 'Los que menos tenían',
    type: 'wordsearch',
    icon: 'shepherd',
    verseKey: 'Pastores',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      intro:
        'Los pastores estaban en la campina cuando oyeron el anuncio. Busca en la sopa de ' +
        'letras las palabras de aquella noche.',
      instruction: 'Toca las letras contiguas para encontrar cada palabra.',
      words: ['PASTORES', 'OVEJAS', 'BELEN', 'NOCHE', 'ANGEL', 'CENA'],
      closing:
        'La noticia llegó primero a los sencillos. Dios siempre ha elegido hablar primero a quien está con el corazón limpio.',
    },
  },
  {
    id: 'day-12',
    day: 12,
    title: 'Una familia que acompaña',
    subtitle: 'Reto para compartir en casa',
    type: 'challengeFamily',
    icon: 'family',
    verseKey: 'Mandamiento',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      intro:
        'La Sagrada Familia es el primer cuadro de Navidad: María, José y un Niño. ' +
        'Hoy, tu familia es ese cuadro.',
      steps: [
        'Reunid a los que viven con vos (o llama a los que están lejos) y contad qué es lo mejor de este año.',
        'Elegid a alguien de la familia a quien no hayáis dado atención estos días, y dadle una atención completa.',
        'Terminad la noche con una oración de acción de gracias: cada uno agradece algo de los demás.',
      ],
      duration: '20-30 minutos',
      encouragement:
        '¡Lo habéis hecho! Una familia que se escucha es ya una familia que se parece a la de Belén.',
    },
  },
  {
    id: 'day-13',
    day: 13,
    title: 'La alegría de Gaudete',
    subtitle: 'Tercer domingo · vela rosa',
    type: 'reflection',
    icon: 'star',
    verseKey: 'Esperanza',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      paragraphs: [
        'El tercer domingo de Adviento tiene nombre propio: Gaudete, "¡alégrate!". ' +
          'Es el domingo en que la liturgia viste de rosa, porque la alegría ya no es una ' +
          'promesa lejana: está a pocos días.',
        'La alegría cristiana no depende de que todo salga bien: nace de saber que Dios ' +
          'cumple sus promesas, aunque el camino no sea el que esperábamos.',
      ],
      question: {
        prompt: '¿Cuál es tu fuente de alegría en Adviento?',
        options: [
          'La presencia de mi familia',
          'Una llamada que recibí',
          'La certeza de que Dios me acompaña',
          'La música y los cantos',
        ],
      },
      closing: 'Hoy la vela de Gaudete se enciende: ¡alégrate, porque viene el Señor!',
    },
  },
  {
    id: 'day-14',
    day: 14,
    title: 'Compartir con generosidad',
    subtitle: 'Un reto solidario',
    type: 'challenge',
    icon: 'gift',
    verseKey: 'Generosidad',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      intro:
        'Hoy la palabra es "medida buena". Dios mide lo que damos con la misma generosidad ' +
        'con que nos ha dado.',
      steps: [
        'Elige a una persona que lo necesite y dale algo que necesitas de verdad: tiempo, ' +
          'atención, una herramienta, un favor.',
        'Pon en un sobre lo que ibas a comprar y ofrécelo esta semana a quien lo necesite más.',
        'Reza por esa persona durante un minuto. Compartir y orar es una misma cosa.',
      ],
      encouragement:
        '¡Qué generoso! Dios recoge en su libro cada dádiva, aunque nadie la vea.',
    },
  },
  {
    id: 'day-15',
    day: 15,
    title: 'Los Reyes Magos',
    subtitle: 'El camino de los que vinieron de lejos',
    type: 'quiz',
    icon: 'crown',
    verseKey: 'Promise',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      intro:
        'Tres sabios dejaron su tierra para ver al Niño. Para llegar a Belén necesitaron ' +
        'preguntar, trusting y seguir una luz.',
      question:
        'Los Reyes Magos ofrecieron tres regalos al Niño Jesús. ¿Cuál de estos NO fue uno de ellos?',
      options: [
        { label: 'Oro', correct: false, feedback: 'El oro era para reconocer a un rey.' },
        { label: 'Incienso', correct: false, feedback: 'El incienso era para reconocer a Dios.' },
        { label: 'Myrrha', correct: false, feedback: 'La myrrha era para reconocer a un mortal.' },
        {
          label: 'Un manto de lana',
          correct: true,
          feedback:
            'Los Magos ofrecieron oro, incienso y myrrha. El manto vino después, cuando huían a Egipto.',
        },
      ],
      closing:
        'Regalar para el Niño no es para ganarse un favor, sino para reconocer quién es.',
    },
  },
  {
    id: 'day-16',
    day: 16,
    title: 'Una oración por los demás',
    subtitle: 'La oración que sale del corazón',
    type: 'prayer',
    icon: 'hands',
    verseKey: 'Amar',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      prayerKey: 'intencion',
      hint:
        'Si quieres, escribe a quién le pides hoy que rece. Se queda solo en este navegador ' +
        'y nunca se envía a ningún servidor.',
      allowIntention: true,
    },
  },
  {
    id: 'day-17',
    day: 17,
    title: 'Descubre el pesebre',
    subtitle: 'Trivia de la noche de Belén',
    type: 'trivia',
    icon: 'manger',
    verseKey: 'Nacimiento',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      questions: [
        {
          q: '¿Dónde nació Jesús?',
          options: ['En una casa de Nazaret', 'En un pesebre de Belén', 'En un templo de Jerusalén'],
          correct: 1,
          explain: 'Jesús nació en Belén, en un cobertizo de ganado, porque no había sitio en la posada.',
        },
        {
          q: '¿Quién fue el primero en anunciarlo?',
          options: ['Los Reyes Magos', 'Los pastores', 'Herodes'],
          correct: 1,
          explain: 'Los ángeles anunciaron el nacimiento primero a los pastores de la campina (Lc 2,8-16).',
        },
        {
          q: '¿Cómo se llamaba el marido de María?',
          options: ['José', 'Juan', 'Simón'],
          correct: 0,
          explain: 'José, el carpintero, era el esposo de María y padre adoptivo de Jesús.',
        },
        {
          q: '¿Qué animales estaban junto al Niño?',
          options: ['Cabras y ovejas', 'El buey y el asno', 'Camellos y dromedarios'],
          correct: 1,
          explain: 'La tradición representa al buey y al asno junto al pesebre.',
        },
      ],
      closing: 'Ahora conoces el cuadro: un cobertizo, una familia y un Niño que cambió el mundo.',
    },
  },
  {
    id: 'day-18',
    day: 18,
    title: 'La importancia del perdón',
    subtitle: 'Soltar para poder amar',
    type: 'reflection',
    icon: 'heart',
    verseKey: 'Misericordia',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      paragraphs: [
        'El perdón no es un lujo espiritual: es una necesidad. Un rencor guardado ocupa el ' +
          'espacio donde debería vivir el amor.',
        'Jesús no solo perdonó desde la cruz; antes lo había practiced en lo cotidiano. Nadie ' +
          'ama como quien no sabe perdonar.',
      ],
      question: {
        prompt: '¿Qué te cuesta perdonar más: a una persona o a ti mismo?',
        options: [
          'A alguien que me hirió',
          'A mí mismo por un error mío',
          'A una situación que no cambió',
          'A quien no me hará nunca justice',
        ],
      },
      closing: 'Perdonar no es olvidar: es decidir que el amor tiene la última palabra.',
    },
  },
  {
    id: 'day-19',
    day: 19,
    title: 'La música de Navidad',
    subtitle: 'Escribe tu propio villancico',
    type: 'music',
    icon: 'music',
    verseKey: 'Gloria',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      mode: 'compose',
      title: 'Tu villancico',
      subtitle: 'Acróstico N · A · V · I · D',
      intro:
        'Un villancico es un canto de Adviento que habla de Jesús. Escribe cuatro frases que ' +
        'comiencen, en este orden, con las sílabas NA, VID y las letras del nombre. ' +
        'Después podrás cantarlas con la melodía de Noche de paz.',
      acrostic: [
        { syllable: 'NA', hint: 'puedes empezar con "Nada…" o "Nace…"' },
        { syllable: 'VID', hint: 'puedes empezar con "Vida…" o "Vive…"' },
        { syllable: 'I', hint: 'una letra sola: "Ilumina…" o "Invita…"' },
        { syllable: 'D', hint: 'una letra sola: "Dulce…" o "Deja…"' },
      ],
      closing:
        'Los villancicos más antiguos nacieron en las casas, no en los libros. El tuyo ya existe.',
    },
  },
  {
    id: 'day-20',
    day: 20,
    title: 'La luz que se acerca',
    subtitle: 'Cuarto domingo de Adviento',
    type: 'reflection',
    icon: 'candle',
    verseKey: 'Seguid',
    verseKeyNote: 'La última vela se enciende: ya falta poco.',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      paragraphs: [
        'El cuarto domingo de Adviento es el más silencioso y el más intimate. ' +
          'La luz de las cuatro velas ya está completa: solo falta un paso más.',
        'María estaba encinta; José buscaba un lugar; los ángeles ya habían cantado. ' +
          'Todo estaba listo antes de que llegara la luz del mundo.',
      ],
      question: {
        prompt: '¿Qué necesitas resolver antes de que llegue la Navidad?',
        options: [
          'Una riña en casa',
          'Una deuda o cuenta pendiente',
          'Una decisión importante',
          'Un perdón que sigue pendiente',
        ],
      },
      closing:
        'Dejar libre el camino es la mejor forma de preparar la venida del Señor.',
    },
  },
  {
    id: 'day-21',
    day: 21,
    title: 'Un corazón dispuesto',
    subtitle: 'Un pequeño propósito espiritual',
    type: 'purpose',
    icon: 'sparkle',
    verseKey: 'FeAmor',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      intro:
        'Preparar el corazón es decidir. Marca al menos tres decisiones que quieres ' +
        'llevar estos días.',
      options: [
        'Orar en una hora concreta cada día',
        'Pedir perdón a alguien',
        'Escribir una carta de perdón',
        'Ayudar sin que nadie me vea hacerlo',
        'Reservar un momento de silencio',
        'Regalar algo a quien más lo necesita',
        'Leer el Evangelio del día',
        'Ir a misa con mi familia',
      ],
      closing: 'Lo que decides hoy es lo que vas a vivir en Navidad.',
    },
  },
  {
    id: 'day-22',
    day: 22,
    title: 'La esperanza',
    subtitle: 'Actividad para hacer en casa',
    type: 'challengeFamily',
    icon: 'family',
    verseKey: 'Esperanza',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      intro:
        'La esperanza no espera sentada: se construye entre dos o más personas. ' +
        'Esta actividad se hace mejor acompañado.',
      steps: [
        'Escribid en un papel grande una palabra que describa vuestra Navidad y colocadla en un lugar visible.',
        'Cada noche, al cerrar el día, cada persona añade algo por lo que dar gracias.',
        'El último día, leed en familia lo que habéis escrito: será el regalo más bonito del Adviento.',
      ],
      duration: '15 minutos cada noche',
      encouragement: 'La esperanza compartida multiplica su luz. Ya se ve la Navidad.',
    },
  },
  {
    id: 'day-23',
    day: 23,
    title: 'Ya falta poco',
    subtitle: 'Preparativos de Nochebuena',
    type: 'prayer',
    icon: 'candle',
    verseKey: 'Eterno',
    requiresInteraction: true,
    completionEnabled: true,
    content: {
      prayerKey: 'preparacion',
      hint: 'La checklist te ayuda a que nada importante se quede para última hora.',
      checklist: [
        'He reservado o comprado algo para compartir en Nochebuena',
        'He hablado con mi familia sobre lo que queremos celebrar',
        'He preparado un lugar tranquilo para orar en Nochebuena',
        'He pensado en una persona concreta a quien quiero acompañar esta Navidad',
      ],
      closing: 'Mañana llega. Que la alegría te encuentre con el corazón limpio.',
    },
  },
  {
    id: 'day-24',
    day: 24,
    title: 'Nochebuena',
    subtitle: 'La noche en que nació el Salvador',
    type: 'special',
    icon: 'star',
    verseKey: 'AmorDios',
    requiresInteraction: true,
    completionEnabled: false,
    content: {
      message:
        'Hoy nos reunimos para celebrar el nacimiento de Jesús. Que su luz ilumine nuestros ' +
        'hogares y nuestros corazones.',
    },
  },
];

/**
 * Devuelve el contenido de un día por su número.
 * @param {number} day 1..24
 * @returns {AdventDay | undefined}
 */
export function getAdventDay(day) {
  return ADVENT_DAYS.find((entry) => entry.day === day);
}

export default ADVENT_DAYS;
