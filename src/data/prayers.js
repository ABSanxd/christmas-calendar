/**
 * Oraciones breves de Adviento y Navidad.
 *
 * Son textos de libre redacción, aptos para la oración familiar y para ser
 * leídos en comunidad.
 */

export const PRAYERS = {
  adviento: {
    id: 'adviento',
    title: 'Oración por el Adviento',
    text:
      'Señor Jesús, mientras te esperamos, tu amor ya está entre nosotros. ' +
      'Que este Adviento no sea solo un calendario, sino un camino de fe, ' +
      'silencio y caridad. Que nazca en nosotros el deseo de recibirte ' +
      'y que nada nos separe de tu amor. Amén.',
    duration: '1 minuto',
  },
  manana: {
    id: 'manana',
    title: 'Un minuto con Dios',
    text:
      'Gracias, Señor, por este día. Antes de comenzar te pido una cosa sencilla: ' +
      'que tu amor esté en mis palabras, en mi trabajo y en mi casa. ' +
      'Que no haya un solo momento de este día en el que no pueda pensar en ti. ' +
      'Camina conmigo. Amén.',
    duration: '1 minuto',
  },
  gesto: {
    id: 'gesto',
    title: 'Oración por los pequeños gestos',
    text:
      'Señor, hoy quiero amarte en lo pequeño. En un saludo, en un mensaje, ' +
      'en un gesto que nadie ve. Que mi vida sea un camino de bondad y que ' +
      'al llegar la Navidad pueda decir con verdad: «Lo hice por Ti». Amén.',
    duration: '1 minuto',
  },
  familia: {
    id: 'familia',
    title: 'Bendición para la familia',
    text:
      'Padre bueno, que tu amor bendiga esta familia. Que no falte nunca el ' +
      'pan de cada día ni la paciencia de cada día. Que nos perdonemos con ' +
      'generosidad, como Tú nos perdonas, y que vivamos unidos como Tú nos ' +
      'quisiste. Amén.',
    duration: '2 minutos',
  },
  Gaudete: {
    id: 'gaudete',
    title: 'Alegría de Gaudete',
    text:
      '¡Aleluya! El Señor está cerca. La alegría no es un lujo: es una fuerza ' +
      'que nace de saber que Él viene a salvarnos. Que esta alegría se contagie ' +
      'en mi casa, en mi trabajo y en mi corazón. Amén.',
    duration: '1 minuto',
  },
  generosidad: {
    id: 'generosidad',
    title: 'Oración por los necesitados',
    text:
      'Señor, hoy te pido que pongas mi manos y mi corazón al servicio de ' +
      'quien más lo necesita. Que no me importe lo que me falta cuando otro ' +
      'padece hambre, soledad o tristeza. Que mi generosidad sea discreta y ' +
      'sin mirada. Amén.',
    duration: '1 minuto',
  },
  intencion: {
    id: 'intencion',
    title: 'Oración por los demás',
    text:
      'Señor Jesús, te presento ahora a todas las personas que me importan: ' +
      'mi familia, mis amigos, mis vecinos, los que sufrieren en silencio. ' +
      'Rodea con tu luz a quien camina por un camino difícil. Que cada uno de ' +
      'ellos se sepa visto y amado por Ti. Amén.',
    duration: '2 minutos',
  },
  perdon: {
    id: 'perdon',
    title: 'Oración por el perdón',
    text:
      'Señor, hay alguien en quien he pensado hoy y a quien no he perdonado. ' +
      'No te pido que hagas de mí alguien mejor de un día para otro, sino que ' +
      'tú pongas tu paz donde yo pongo mi rencor. Perdona, como me perdonas a mí. Amén.',
    duration: '2 minutos',
  },
  reyes: {
    id: 'reyes',
    title: 'Oración por los Reyes Magos',
    text:
      'Señor, que ellos te buscaron y te encontraron. Que su viaje sea el signo ' +
      'del mío: caminar de noche, con dudas, hasta encontrarte. Que no me ' +
      'falte la estrella que me guía hacia Ti. Amén.',
    duration: '1 minuto',
  },
  nochebuena: {
    id: 'nochebuena',
    title: 'Oración de Nochebuena',
    text:
      'Señor Jesús, gracias por haber nacido entre nosotros y por quedarte en ' +
      'nuestros hogares. Bendice a mi familia, a mis amigos y a toda la ' +
      'comunidad. Que esta Navidad nos encuentre unidos, alegres y con el ' +
      'corazón preparado para seguirte. Amén.',
    duration: '2 minutos',
  },
  preparacion: {
    id: 'preparacion',
    title: 'La noche más importante',
    text:
      'Mañana será Nochebuena. Señor, que esta noche no se quede en palabras: ' +
      'que la alegría de tu nacimiento se vea en mi casa, en mi trato con los ' +
      'demás y en mi manera de orar. Que esta sea la Navidad más hermosa que ' +
      'hemos vivido, porque es la más verdadera. Amén.',
    duration: '2 minutos',
  },
};

/**
 * Devuelve una oración por clave.
 * @param {keyof typeof PRAYERS} key
 */
export function getPrayer(key) {
  const prayer = PRAYERS[key];
  if (!prayer) {
    throw new Error(`Oración desconocida: "${key}"`);
  }
  return prayer;
}

export default PRAYERS;
