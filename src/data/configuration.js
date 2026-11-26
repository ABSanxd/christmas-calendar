/**
 * Configuración global del Calendario Navideño 2026.
 *
 * Todos los valores que definen el calendario se pueden ajustar aquí sin
 * tocar la lógica de la aplicación.
 */

export const CONFIG = {
  /** Identificador principal del proyecto. */
  name: 'Calendario de Adviento 2026',
  tagline: '24 días para preparar el corazón',

  /** Zona horaria de referencia. El calendario nunca usa la zona del dispositivo. */
  timezone: 'America/Lima',

  /** Año del ciclo de Adviento. */
  year: 2026,

  /** Fechas clave del calendario. */
  dates: {
    /** Inicio del Adviento: primer domingo. */
    adventStart: '2026-11-29',
    /** Primer día de las casillas. */
    calendarStart: '2026-12-01',
    /** Nochebuena. */
    christmasEve: '2026-12-24',
    /** Navidad. */
    christmasDay: '2026-12-25',
  },

  /** Número de casillas del calendario tradicional. */
  totalDays: 24,

  /** Clave de almacenamiento en localStorage. */
  storageKey: 'calendario-navideno-state',
  /** Versión del esquema de datos; permite migraciones futuras. */
  storageVersion: 1,

  /** Colores de las cuatro velas de la corona y de los acentos de la escena. */
  candleColors: {
    purple: '#78528d',
    purpleDeep: '#5b3f6d',
    violetLight: '#9a76ad',
    violetDeep: '#5b3f6d',
    pink: '#dda3b8',
    pinkLight: '#f0c4d3',
    rose: '#b8785c',
    gold: '#c6a568',
    goldLight: '#f0dca6',
    goldBright: '#ffeec2',
    goldDeep: '#8d713f',
    red: '#d9534f',
    redDeep: '#a5342f',
    yellow: '#f3c53f',
    yellowDeep: '#c99a24',
  },

  /** Mensajes de los domingos de Adviento. */
  sundayMessages: {
    1: 'Comienza nuestro camino hacia la Navidad. Preparemos nuestro corazón para recibir a Jesús.',
    2: 'La segunda vela ya está encendida. Seguimos caminando, paso a paso, hacia Belén.',
    3: 'La alegría de Gaudete resuena en el camino. ¡Cuánto falta para encontrar a Jesús!',
    4: 'La luz se acerca. Preparad el camino: el Señor está a punto de llegar.',
  },

  /** Mensaje de Nochebuena. */
  christmasEveMessage:
    'Hoy nos reunimos para celebrar el nacimiento de Jesús. Que su luz ilumine nuestros hogares y nuestros corazones.',

  /** Oración final de Nochebuena. */
  christmasEvePrayer:
    'Señor Jesús, gracias por haber nacido entre nosotros y por quedarte en nuestros hogares. ' +
    'Bendice a mi familia, a mis amigos y a toda la comunidad. Que esta Navidad nos encuentre ' +
    'unidos, alegres y con el corazón preparado para seguirte. Amén.',

  /** Último reto del calendario, al cerrar la Nochebuena. */
  christmasEveChallenge:
    'Tómate una foto en la misa de Nochebuena y compártela con los demás en tus redes sociales.',
};

export default CONFIG;
