/**
 * Reflexión de cada domingo de Adviento.
 *
 * Cada domingo tiene tres partes:
 *
 *   1. **El Evangelio**: el texto litúrgico del día, con su referencia.
 *   2. **La reflexión**: una lectura breve y personal del pasaje.
 *   3. **La vela**: qué significa la vela que se enciende ese domingo.
 *
 * El orden de las velas es el litúrgico: morada, morada, rosa (Gaudete) y
 * morada.
 *
 * Los textos bíblicos son de la Biblia Latinoamérica, la que usa la comunidad.
 * Cuando el pasaje es muy extenso se corta con […], para que la lectura no
 * se rompa.
 */

/**
 * @typedef {object} SundayReflection
 * @property {number} index        Número del domingo (1..4).
 * @property {string} date         Fecha del domingo (YYYY-MM-DD).
 * @property {string} name         Nombre del domingo.
 * @property {string} title        Título de la reflexión.
 * @property {string} gospel       Texto del Evangelio.
 * @property {string} reference    Referencia bíblica del Evangelio.
 * @property {string} reflection   Reflexión breve sobre el pasaje.
 * @property {string} candleName   Nombre de la vela.
 * @property {string} candle       Significado de la vela.
 * @property {string} color        Color litúrgico de la vela.
 */

/** @type {SundayReflection[]} */
export const SUNDAY_REFLECTIONS = [
  {
    index: 1,
    date: '2026-11-29',
    name: 'Primer domingo de Adviento',
    title: 'Vigilantes',
    color: 'Morada',
    reference: 'Mc 13,33-37',
    gospel:
      '«Estén preparados y vigilando, porque no saben cuándo llegará ese momento. ' +
      'Cuando un hombre va al extranjero y deja su casa, entrega responsabilidades a sus ' +
      'sirvientes, cada cual recibe su tarea, y al portero le exige que esté vigilante. Lo ' +
      'mismo ustedes: estén vigilantes, porque no saben cuándo regresará el dueño de casa, si ' +
      'al atardecer, a medianoche, al canto del gallo o de madrugada; no sea que llegue de ' +
      'repente y los encuentre dormidos. […] Lo que les digo a ustedes se lo digo a todos: ' +
      'Estén despiertos.»',
    reflection:
      'Jesús no dice cuándo volverá: dice cómo estar de guardia. En los días de Noé la gente ' +
      'comía, bebía y se casaba sin advertir que el diluvio estaba cerca. La advertencia ' +
      'llega siempre tarde para quien no la escucha. El Adviento es ese tiempo en que el mundo ' +
      'sigue a lo suyo y, sin embargo, el Señor ya está a la puerta. Estar despiertos no es ' +
      'estar inquietos: es tener el corazón preparado para que la luz no nos encuentre a oscuras.',
    candleName: 'La vela del arrepentimiento',
    candle:
      'Se enciende la primera vela, que es la vela del arrepentimiento. El color de la vela ' +
      'nos recuerda que es un tiempo de penitencia, de conversión.',
  },
  {
    index: 2,
    date: '2026-12-06',
    name: 'Segundo domingo de Adviento',
    title: 'El comienzo del Evangelio',
    color: 'Morada',
    reference: 'Mc 1,1-8',
    gospel:
      '«Este es el comienzo de la Buena Nueva de Jesucristo (Hijo de Dios). En el libro del ' +
      'profeta Isaías estaba escrito: "Ya estoy para enviar a mi mensajero delante de ti para ' +
      'que te prepare el camino. Escuchen ese grito en el desierto: Preparen el camino del ' +
      'Señor, enderecen sus senderos". Es así como Juan el Bautista empezó a bautizar en el ' +
      'desierto. Allí predicaba bautismo y conversión, para alcanzar el perdón de los pecados. ' +
      'Toda la provincia de Judea y el pueblo de Jerusalén acudían a Juan para confesar sus ' +
      'pecados y ser bautizados por él en el río Jordán. Además de la piel que tenía colgada ' +
      'de la cintura, Juan no llevaba más que un manto hecho de pelo de camello. Su comida eran ' +
      'langostas y miel silvestre. […] Juan proclamaba este mensaje: "Detrás de mí viene uno con ' +
      'más poder que yo. Yo no soy digno de desatar la correa de sus sandalias, aunque fuera ' +
      'arrodillándome ante él. Yo los he bautizado con agua, pero él los bautizará en el ' +
      'Espíritu Santo".»',
    reflection:
      'Todo empieza aquí, con una frase corta: "Este es el comienzo de la Buena Nueva de ' +
      'Jesucristo (Hijo de Dios)". Y para que ese Evangelio llegara hasta nosotros hizo falta ' +
      'alguien que preparara el camino: Juan en el desierto, con su austeridad y su dureza, ' +
      'que se apartó de la comodidad para señalar a alguien mejor que él. También nosotros ' +
      'somos eso: gente que abre caminos, que prepara el corazón de otros para que puedan ' +
      'encontrarse con el Salvador.',
    candleName: 'La vela de la promesa',
    candle:
      'Se enciende la segunda vela, que es la vela de la promesa de Navidad, de la promesa de ' +
      'la venida del Salvador.',
  },
  {
    index: 3,
    date: '2026-12-13',
    name: 'Tercer domingo de Adviento · Gaudete',
    title: 'Testimonio de la luz',
    color: 'Rosa',
    reference: 'Jn 1,6-8.19-28',
    gospel:
      '«Hubo un hombre, enviado por Dios: se llamaba Juan. Este vino para un testimonio, para ' +
      'dar testimonio de la luz, para que todos creyeran por él. No era él la luz, sino quien ' +
      'debía dar testimonio de la luz. […] Y este fue el testimonio de Juan, cuando los judíos ' +
      'enviaron donde él desde Jerusalén sacerdotes y levitas a preguntarle: "¿Quién eres ' +
      'tú?". El confesó, y no negó; confesó: "Yo no soy el Cristo". Y le preguntaron: "¿Qué, ' +
      'pues? ¿Eres tú Elías?". El dijo: "No lo soy". - "¿Eres tú el profeta?". Respondió: "No". ' +
      'Entonces le dijeron: "¿Quién eres, pues, para que demos respuesta a los que nos han ' +
      'enviado? ¿Qué dices de ti mismo?". Dijo él: "Yo soy voz del que clama en el desierto: ' +
      'Rectificad el camino del Señor, como dijo el profeta Isaías". Los enviados eran ' +
      'fariseos. Y le preguntaron: "¿Por qué, pues, bautizas, si no eres tú el Cristo ni Elías ni ' +
      'el profeta?". Juan les respondió: "Yo bautizo con agua, pero en medio de vosotros está uno a ' +
      'quien no conocéis, que viene detrás de mí, a quien yo no soy digno de desatarle la correa ' +
      'de su sandalia". […] Esto ocurrió en Betania, al otro lado del Jordán, donde estaba Juan ' +
      'bautizando.»',
    reflection:
      'No era él la luz, sino que venía a dar testimonio de la luz. Juan no se guarda lo que ha ' +
      'recibido: lo señala. Gaudete significa "alégrense", y es una alegría que no espera al ' +
      'final, sino que ya suena a mitad de camino. La alegría no es un premio reservado a ' +
      'quien lo hizo todo bien: es el anuncio de que el Señor viene y nos ama antes de que ' +
      'nosotros sepamos amarlo. La vela rosa recuerda que el Adviento ya no es solo espera: ' +
      'es esperanza cumpliéndose.',
    candleName: 'La vela del amor',
    candle:
      'Se enciende la tercera vela, que es la vela del amor: representa el amor de Jesús por ' +
      'los hombres. Por eso este domingo la vela es rosa: el Adviento ya se inclina hacia la ' +
      'alegría, porque Navidad se acerca.',
  },
  {
    index: 4,
    date: '2026-12-20',
    name: 'Cuarto domingo de Adviento',
    title: 'Hágase en mí',
    color: 'Morada',
    reference: 'Lc 1,26-38',
    gospel:
      '«Al sexto mes el ángel Gabriel fue enviado por Dios a una ciudad de Galilea, llamada ' +
      'Nazaret, a una joven virgen que estaba comprometida en matrimonio con un hombre llamado ' +
      'José, de la familia de David. La virgen se llamaba María. Llegó el ángel hasta ella y le ' +
      'dijo: "Alégrate, llena de gracia, el Señor está contigo". María quedó muy conmovida al ' +
      'oír estas palabras, y se preguntaba qué significaría tal saludo. Pero el ángel le dijo: ' +
      '"No temas, María, porque has encontrado el favor de Dios. Concebirás en tu seno y darás ' +
      'a luz un hijo, al que pondrás el nombre de Jesús. Será grande y justamente será llamado ' +
      'Hijo del Altísimo. El Señor Dios le dará el trono de su antepasado David; gobernará por ' +
      'siempre al pueblo de Jacob y su reinado no terminará jamás". […] María entonces dijo al ' +
      'ángel: "¿Cómo puede ser eso, si yo soy virgen?". Contestó el ángel: "El Espíritu Santo ' +
      'descenderá sobre ti y el poder del Altísimo te cubrirá con su sombra; por eso el niño ' +
      'santo que nacerá de ti será llamado Hijo de Dios. También tu parienta Isabel está ' +
      'esperando un hijo en su vejez, y aunque no podía tener familia, se encuentra ya en el ' +
      'sexto mes del embarazo. Para Dios, nada es imposible". Dijo María: "Yo soy la servidora ' +
      'del Señor, hágase en mí tal como has dicho". Después la dejó el ángel.»',
    reflection:
      'Dios no manda a un ejército: manda a un ángel a una casa sencilla de Galilea. Y no ' +
      'habla con un rey, sino con una mujer que responde con la frase más valiente de toda la ' +
      'Biblia: "Hágase en mí según tu palabra". El gran día se acerca porque Dios se ha hecho ' +
      'pequeño, hasta caber en un vientre. La cuarta vela, la última, completa la corona: ya ' +
      'no queda luz por encender, solo queda acrecentar la luz que ya brilla.',
    candleName: 'La vela de la alegría',
    candle:
      'Se enciende la cuarta vela, la última, con la que se completa la corona. Con ella ' +
      'llega el gran día: el Adviento toca a su fin y la luz ya está completa. Esta vela ' +
      'anuncia que el Salvador está a punto de llegar y que hay que estar preparados para ' +
      'acogerlo.',
  },
];

/**
 * Devuelve la reflexión de un domingo por su índice (1..4).
 *
 * @param {number} index
 * @returns {SundayReflection | null}
 */
export function getSundayReflection(index) {
  return SUNDAY_REFLECTIONS.find((reflection) => reflection.index === index) ?? null;
}

/**
 * Devuelve las reflexiones de los domingos ya celebrados.
 *
 * @param {string} dateKey Fecha actual (YYYY-MM-DD).
 * @returns {SundayReflection[]}
 */
export function getAvailableReflections(dateKey) {
  return SUNDAY_REFLECTIONS.filter((reflection) => dateKey >= reflection.date);
}

export default SUNDAY_REFLECTIONS;
