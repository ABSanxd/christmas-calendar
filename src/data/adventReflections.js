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
      '«Mirad que vigiláis, porque no sabéis cuándo vendrá el Señor, ni el día ni la hora. ' +
      'Como fue en los días de Noé, cuando el diluvio vino, así será también el día del Hijo ' +
      'del hombre. Porque así como en los días que precedieron al diluvio comían y bebían, ' +
      'se casaban y daban en matrimonio, hasta el día en que Noé entró en el arca, y no se dieron ' +
      'cuenta de nada hasta que llegó el diluvio y arrastró a todos; así será también el día ' +
      'del hijo del hombre. […] Atended y rogad, porque no sabéis cuándo llegó el tiempo. ' +
      'Porque el Hijo del hombre vendrá como un ladrón en la noche, y se hallará un hombre que ' +
      'no habrá velado y no habrá puesto a salvo lo que tenía, y el otro tampoco. Sed ' +
      'vigilantes, pues, y rogad, para que podáis ser hallados por el Hijo del hombre.»',
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
      '«Comienzo del Evangelio de Jesucristo, Hijo de Dios. Como está escrito en Isaías el ' +
      'profeta: "Mira que yo envío a mi mensajero delante de ti, que preparará tu camino delante ' +
      'de ti". Hubo una voz del cielo que decía: "Aquí viene el que va a bautizar, Juan". Y ' +
      'Juan, el Bautista, aparecía en el desierto, proclamando un bautismo de conversión para ' +
      'el perdón de los pecados. Y mucha gente de toda la comarca de Judea y de Jerusalén iba ' +
      'a él al río Jordán y se hacía bautizar, confesando sus pecados. Y Juan vestía de camello ' +
      'y se ceñía con un cinturón de cuero, y comía langostas y mieles salvajes.»',
    reflection:
      'Todo empieza aquí, con una frase corta: "Comienzo del Evangelio de Jesucristo, Hijo de ' +
      'Dios". Y para que ese Evangelio llegara hasta nosotros hizo falta alguien que preparara ' +
      'el camino: Juan en el desierto, con su austeridad y su dureza, que se apartó de la ' +
      'comodidad para señalar a alguien mejor que él. También nosotros somos eso: gente que ' +
      'abre caminos, que prepara el corazón de otros para que puedan encontrarse con el Salvador.',
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
      '«Hubo un hombre enviado por Dios, de nombre Juan. Vino como testigo, para dar ' +
      'testimonio de la luz, para que todos creyeran por su medio. No era él la luz, sino que ' +
      'venía a dar testimonio de la luz. La luz true la luz, y todo el que la recibe ya no ' +
      'está en tinieblas, sino tiene la luz de la vida. […] Y he aquí que yo os doy testimonio ' +
      'de Juan, porque no era él quien bautizaba, sino yo, el que os he de bautizar con ' +
      'Espíritu Santo; a quien vosotros no conocéis. Él estaba conmigo, y era anterior a mí, ' +
      'y me ha precedido. […] Y vi bajar desde el cielo al Espíritu Santo como una paloma, y ' +
      'vino sobre mí. Y oí una voz del cielo que decía: "Tú eres mi Hijo, el amado; en ti me ' +
      'complace".»',
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
      'los hombres. Por eso este domingo la vela es rosa y los sacerdotes pueden usar la ' +
      'casulla de color rosa: el Adviento ya se inclina hacia la alegría, porque Navidad se ' +
      'acerca.',
  },
  {
    index: 4,
    date: '2026-12-20',
    name: 'Cuarto domingo de Adviento',
    title: 'Hágase en mí',
    color: 'Morada',
    reference: 'Lc 1,26-38',
    gospel:
      '«En aquel tiempo, el ángel Gabriel fue enviado por Dios a la ciudad de Galilea, ' +
      'Nazaret, a una Virgen desposada con un hombre llamado José, de la casa de David. Y el ' +
      'nombre de la Virgen era María. Y entró el ángel y le dijo: "¡Salve, gracia plenísima, ' +
      'el Señor es contigo! Bendita tú eres entre todas las mujeres. Y el Señor te ha dado el ' +
      'favor de concebir en tu vientre y dar a luz un hijo, al que llamarás Jesús. Este será ' +
      'admirable, y lo llamarán Hijo del Altísimo, y el Señor Dios le dará el trono de David, su ' +
      'padre, y reinará por siempre sobre la casa de Israel. Su reino no tendrá fin". Y le ' +
      'dijo María al ángel: "¿Cómo será esto, si no he conocido varón?". Y el ángel le ' +
      'respondió: "El Espíritu Santo vendrá sobre ti, y la fuerza del Altísimo te cubrirá con su ' +
      'sombra. […] Y darás a luz un hijo, al que llamarás santo, Hijo de Dios". Y María le dijo: ' +
      '"He aquí la esclava del Señor; hágase en mí según tu palabra". Y el ángel se fue de ella.»',
    reflection:
      'Dios no manda a un ejército: manda a un ángel a una casa corriente de Galilea. Y no ' +
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
