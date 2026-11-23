# Calendario de Adviento 2026

**24 días para preparar el corazón y recibir a Jesús.**

Experiencia web interactiva de Adviento y Navidad para una comunidad católica:
una aldea de Belén ilustrada, 24 puertas que se abren día a día, una corona de
Adviento que se enciende cada domingo, actividades para solos o en familia y
una celebración especial de Nochebuena.

Es una **aplicación web estática**: no hay backend, ni base de datos, ni
registros de usuarios, ni servicios externos. Todo el progreso se guarda en el
navegador del visitante.

---

## Índice

1. [Descripción general](#1-descripción-general)
2. [Objetivo](#2-objetivo)
3. [Características principales](#3-características-principales)
4. [Tecnologías utilizadas](#4-tecnologías-utilizadas)
5. [Requisitos previos](#5-requisitos-previos)
6. [Instalación](#6-instalación)
7. [Ejecución en desarrollo](#7-ejecución-en-desarrollo)
8. [Compilación para producción](#8-compilación-para-producción)
9. [Estructura de carpetas](#9-estructura-de-carpetas)
10. [Descripción de cada módulo](#10-descripción-de-cada-módulo)
11. [Funcionamiento del desbloqueo por fechas](#11-funcionamiento-del-desbloqueo-por-fechas)
12. [Funcionamiento del almacenamiento local](#12-funcionamiento-del-almacenamiento-local)
13. [Funcionamiento de la corona de Adviento](#13-funcionamiento-de-la-corona-de-adviento)
14. [Configuración de las animaciones](#14-configuración-de-las-animaciones)
15. [Cómo agregar o modificar actividades](#15-cómo-agregar-o-modificar-actividades)
16. [Cómo agregar nuevos versículos y reflexiones](#16-cómo-agregar-nuevos-versículos-y-reflexiones)
17. [Configuración de las notificaciones](#17-configuración-de-las-notificaciones)
18. [Limitaciones técnicas](#18-limitaciones-técnicas)
19. [Despliegue en GitHub Pages](#19-despliegue-en-github-pages)
20. [Cómo actualizar el proyecto](#20-cómo-actualizar-el-proyecto)
21. [Solución de problemas frecuentes](#21-solución-de-problemas-frecuentes)
22. [Verificación y pruebas](#22-verificación-y-pruebas)

---

## 1. Descripción general

El proyecto representa el Adviento 2026 (que comienza el **domingo 29 de
noviembre**) como una pequeña aldea de Belén ilustrada bajo la noche. Las 24
casillas no están en una cuadrícula: están **integradas en la ilustración**,
apoyadas en puertas, ventanas, hornacinas, caminos y placas suspendidas en el
cielo.

La escena contiene, todos ellos dentro de la identidad cristiana del proyecto:
la Sagrada Familia en el centro, ángeles con sus trompetas y estandartes, la
Estrella de Belén, los Reyes Magos a caballo, los pastores con sus ovejas, las
palmeras del desierto y el arco monumental de la ciudad.

Cada día del calendario esconde un contenido distinto: reflexiones con
preguntas, oraciones, retos personales y familiares, una trivia bíblica, un
acertijo, una sopa de letras, una actividad de reordenación de palabras, una
actividad musical y un propósito espiritual.

La estética es cálida, ilustrada, nocturna y artesanal: azul noche, oro de
estrella, arena y marfil, con morados y el rosa de Gaudete como acentos.

## 2. Objetivo

- Ayudar a la comunidad a **preparar espiritualmente** la celebración de la
  Navidad, con un recorrido de Adviento que va de la expectativa a la alegría.
- Ofrecer una experiencia **tierna y compartida**, usable en familia, en
  grupo parroquial o en la catequesis.
- Funcionar **sin cuentas, sin servidor y sin conexión** después de la primera
  visita.
- Enseñar la historia de la salvación con **rigor**: los versículos citan la
  Biblia de Jerusalén (Reinaldo), con su referencia exacta.

## 3. Características principales

### Calendario ilustrado

- Ilustración SVG original de Belén, construida por capas (`data-layer`) para
  poder animarse de forma independiente.
- 24 casillas integradas en la escena, con tres estados visibles:
  **disponible**, **descubierta** (con check o estrella) y **bloqueada**
  (con candado visual y texto explicativo).
- Versión alternativa para móvil: las mismas 24 puertas en una retícula
  legible, sin sacrificar la identidad visual.
- Controles de hover, foco de teclado y estados de rechazo al intentar abrir
  una casilla bloqueada.

### Corona de Adviento

- Corona SVG permanente en la parte inferior del calendario, con cuatro velas:
  morada, morada, **rosa (Gaudete)** y morada.
- Secuencia animada reutilizable para los cuatro domingos: aparece la corona,
  gira suavemente, entra un angelito, enciende la vela nueva con destellos y
  se retira con un mensaje.
- Si el visitante ya vio la animación, la corona se muestra con las velas
  correctas y ofrece un botón para volver a contemplarla.

### Nochebuena

- El día 24 tiene una experiencia propia: noche de Belén, estrellas que
  brillan, tres ángeles que despliegan el cartel «Nochebuena», el pesebre que
  se ilumina y un versículo con la oración final.

### Actividades interactivas

| Tipo | Qué propone |
| --- | --- |
| `reflection` | Lectura breve y una pregunta para meditar. |
| `prayer` | Oración con opción de anotar una intención (solo local). |
| `challenge` | Reto personal con pasos marcables. |
| `challengeFamily` | Reto para hacer en familia o grupo. |
| `scramble` | Reconstruir un mensaje bíblico reordenando palabras. |
| `riddle` | Acertijo con pistas progresivas. |
| `wordsearch` | Sopa de letras generada al azar. |
| `quiz` / `trivia` | Preguntas con explicación por respuesta. |
| `music` | Villancico con melodía y juego de ritmo, o acróstico para componer uno. |
| `purpose` | Compromisos espirituales marcables. |

### Comodidades

- Indicador de progreso (casillas descubiertas y actividades realizadas).
- Configuración de **sonido**, **recordatorios** y **movimiento reducido**.
- Reinicio del progreso con doble confirmación.
- Funciona sin conexión (service worker) y se puede instalar como PWA.
- Sin audio externo: todos los sonidos se sintetizan con la Web Audio API.

## 4. Tecnologías utilizadas

- **HTML5**, **CSS3** y **JavaScript moderno (ES Modules)**.
- **Vite 5** como herramienta de desarrollo y construcción.
- **GSAP 3** para animaciones y secuencias complejas.
- **SVG** para toda la ilustración (sin imágenes de mapa de bits en la escena).
- **localStorage** para el progreso individual.
- **Notification API** para recordatorios opcionales.
- **Web Audio API** para los efectos de sonido.
- **Service Worker + Web App Manifest** para el funcionamiento sin conexión.

No se usa React, ni backend, ni Firebase, ni bases de datos, ni autenticación,
ni servicios que requieran registro de usuarios.

## 5. Requisitos previos

- **Node.js 18 o superior** (probado con Node 20 y 24).
- **npm 9 o superior** (viene con Node).
- Un navegador moderno: Chrome, Edge, Firefox o Safari de los dos últimos años.

> No hace falta servidor de aplicaciones: la versión compilada es estática.

## 6. Instalación

```bash
npm install
```

Esto instala Vite y GSAP en `node_modules/`.

## 7. Ejecución en desarrollo

```bash
npm run dev
```

Abre `http://localhost:5173/`.

### Simular una fecha (solo desarrollo)

Para probar cualquier día del Adviento sin esperar, añade el parámetro
`fecha` a la URL:

```
http://localhost:5173/?fecha=2026-12-13        # tercer domingo (Gaudete)
http://localhost:5173/?fecha=2026-12-13T18:30  # con hora concreta
http://localhost:5173/?fecha=2026-11-20        # antes del Adviento
```

El parámetro se lee dentro de `import.meta.env.DEV`. **En la compilación de
producción el bloque entero se elimina**, de modo que un visitante final no
puede desbloquear casillas cambiando la fecha.

## 8. Compilación para producción

```bash
npm run build
```

Genera la carpeta `dist/` con todo el sitio estático.

Para comprobar la compilación tal como se publicará:

```bash
npm run preview
```

Abre `http://localhost:4173/`.

El comando `build` ejecuta antes `npm run check`, que valida que todas las
claves de `CONFIG` y `SCENE_COLORS` usadas en el código existen (evita colores
o fechas que se queden sin definir).

## 9. Estructura de carpetas

```text
calendario-navideño/
├── .github/
│   └── workflows/deploy.yml      Despliegue automático en GitHub Pages
├── public/
│   ├── assets/
│   │   ├── audio/                (sin archivos: el audio se sintetiza)
│   │   ├── fonts/                (sin archivos: tipografías del sistema)
│   │   ├── images/
│   │   │   └── og-calendario.jpg Imagen para redes sociales
│   │   └── illustrations/        Ilustraciones exportadas en SVG suelto
│   │       ├── advent-wreath/corona-adviento.svg
│   │       ├── angels/angel-trompetista.svg
│   │       ├── bethlehem/escena-belen.svg
│   │       └── holy-family/pesebre.svg
│   ├── favicon.svg
│   ├── manifest.webmanifest      Datos de la PWA
│   └── sw.js                     Service worker (caché sin conexión)
├── scripts/
│   ├── check-config.mjs          Valida CONFIG y SCENE_COLORS
│   ├── export-illustrations.mjs  Exporta las ilustraciones a public/
│   ├── export-og.mjs             Genera la imagen para redes sociales
│   ├── smoke.mjs                 Prueba funcional en un navegador real
│   └── shots.mjs                 Capturas de pantalla para revisión visual
├── src/
│   ├── components/               Elementos visuales reutilizables
│   │   ├── activities/           Una pieza por tipo de actividad
│   │   ├── advent/               Corona, vela y angelito
│   │   ├── calendar/             Calendario, casillas y progreso
│   │   │   └── scene/            Capas de la ilustración de Belén
│   │   ├── common/               Catálogo de iconos
│   │   └── interface/            Modal, avisos, ajustes, bienvenida, Nochebuena
│   ├── data/                     Contenido y configuración (editable sin tocar lógica)
│   │   ├── activities.js         Metadatos de cada tipo de actividad
│   │   ├── adventDates.js        Fechas de los domingos de Adviento
│   │   ├── adventDays.js         Contenido de los 24 días
│   │   ├── bibleVerses.js        Versículos con su referencia
│   │   ├── configuration.js      Fechas, paleta, mensajes y claves
│   │   ├── prayers.js            Oraciones
│   │   └── sceneLayout.js        Posición de las 24 casillas en la escena
│   ├── modules/                  Lógica funcional de cada sección
│   │   ├── activities/           Registro, validación y controlador
│   │   ├── advent/               Estado y plan de la corona
│   │   ├── animations/           GSAP: velas, ángel, casillas, Nochebuena
│   │   ├── audio/                Síntesis y control del sonido
│   │   ├── calendar/             Render, eventos y controlador del calendario
│   │   ├── notifications/        Permiso y recordatorios
│   │   └── progress/             Estado, persistencia y control del progreso
│   ├── services/                 Acceso a servicios del navegador
│   │   ├── dateService.js        Fecha en America/Lima y simulación de desarrollo
│   │   ├── deviceService.js      Capacidades del navegador y dispositivo
│   │   └── storageService.js     Acceso seguro a localStorage
│   ├── styles/                   CSS organizado
│   │   └── components/           Una hoja por bloque visual
│   ├── utils/                    Funciones auxiliares puras
│   ├── app.js                    Arranque de la aplicación
│   └── main.js                   Punto de entrada y service worker
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── LICENSE
```

### Adaptaciones respecto a la estructura propuesta

- `components/common/` contiene solo `Icon.js`: los botones se resuelven con
  HTML semántico y clases CSS compartidas, y no se crean componentes que solo
  reexporten código.
- `modules/advent/adventDates.js` no duplica `data/adventDates.js`: el módulo
  combina los datos con el estado de la visita y devuelve el «plan del día».
- Las ilustraciones viven como **componentes SVG en código** (para poder
  animarlas con GSAP) y además se exportan a `public/assets/illustrations/`
  con `npm run illustrations`.

## 10. Descripción de cada módulo

### `src/data/`

| Archivo | Contenido |
| --- | --- |
| `configuration.js` | Zona horaria, fechas del Adviento, número de días, paleta, mensajes de los domingos, clave de almacenamiento y versión del esquema. |
| `adventDates.js` | Los cuatro domingos de Adviento y los cálculos de cuántas velas están encendidas según la fecha. |
| `adventDays.js` | Los 24 días: título, bajada, tipo de actividad y contenido. |
| `activities.js` | Etiqueta, icono y color de cada tipo de actividad. |
| `bibleVerses.js` | Versículos con texto, referencia y tema. |
| `prayers.js` | Oraciones breves de Adviento y Navidad. |
| `sceneLayout.js` | Posición en el `viewBox` de las 24 casillas y su estilo. |

### `src/services/`

| Archivo | Responsabilidad |
| --- | --- |
| `dateService.js` | Obtiene la fecha de hoy en `America/Lima` con `Intl.DateTimeFormat`, compara claves `YYYY-MM-DD` y expone la simulación de desarrollo. |
| `storageService.js` | Lectura y escritura segura de `localStorage`, con control de cuota y de modo privado. |
| `deviceService.js` | Capacidades: notificaciones, movimiento reducido, tipo de dispositivo, vibración. |

### `src/modules/`

| Archivo | Responsabilidad |
| --- | --- |
| `progress/progressStorage.js` | Esquema versionado, saneado de datos y persistencia. |
| `progress/progressTracker.js` | Abre días, completa actividades, registra animaciones vistas y expone las preferencias. |
| `progress/progressController.js` | Une el rastreador con la interfaz y difunde el evento `calendario:progress`. |
| `calendar/calendarRenderer.js` | Construye la interfaz completa (cabecera, progreso, calendario, corona, pie). |
| `calendar/calendarEvents.js` | Enlaza los botones de la cabecera y escucha los cambios de progreso. |
| `calendar/calendarController.js` | Orquesta todo: calcula el estado de las casillas, la corona, los ajustes y el recordatorio. |
| `advent/adventDates.js` | Devuelve el «plan de Adviento» de una fecha (domingo, velas antes y después, si toca animar). |
| `advent/adventState.js` | Estado en memoria de la corona y sus suscriptores. |
| `advent/adventController.js` | Decide si se reproduce la animación del domingo y mantiene la corona al día. |
| `activities/activityRegistry.js` | Mapa `tipo → componente`. |
| `activities/activityValidator.js` | Valida la definición de un día y los datos que produce una actividad. |
| `activities/activityController.js` | Abre la casilla, comprueba el bloqueo en JavaScript, registra el progreso y celebra. |
| `animations/animationController.js` | Sistema reutilizable `playAdventAnimation({ candlesLit, newCandle, candleColor })`. |
| `animations/candleAnimations.js` | Encendido progresivo de las velas y destellos. |
| `animations/angelAnimations.js` | Vuelo del angelito hasta la vela. |
| `animations/calendarAnimations.js` | Entrada de la escena, apertura de casillas y confeti de estrellas. |
| `animations/christmasEveAnimations.js` | Secuencia completa de Nochebuena. |
| `audio/audioService.js` | Síntesis con la Web Audio API: campanillas, destellos y melodía. |
| `audio/audioController.js` | Preferencias de sonido y catálogo de efectos. |
| `notifications/notificationService.js` | Permiso, aviso y condiciones para recordar. |
| `notifications/notificationController.js` | Recordatorio diario mientras la página está abierta. |

### `src/components/`

| Archivo | Responsabilidad |
| --- | --- |
| `calendar/Calendar.js` | Compone la escena con las 24 casillas y la versión alternativa de móvil. |
| `calendar/CalendarDay.js` | Una casilla: botón real, foco, estados y tooltip. |
| `calendar/CalendarProgress.js` | Barra de progreso. |
| `calendar/scene/*` | Capas de la ilustración: `SkyLayer`, `VillageLayer`, `NativityLayer`, `AngelsLayer`, `CharactersLayer`, `DayDoors` y `shapes.js` (formas reutilizables). |
| `advent/AdventWreath.js` | La corona completa y su texto explicativo. |
| `advent/AdventCandle.js` | Una vela, con la llama como elemento animable independiente. |
| `advent/AdventAngel.js` | El angelito que vuela por la pantalla. |
| `activities/*` | Una pieza por tipo de actividad, más `activityParts.js` (bloques compartidos) y `ActivityModal.js`. |
| `interface/Modal.js` | Modal con foco atrapado, Escape y clic en el fondo. |
| `interface/WelcomeScreen.js` | Bienvenida de la primera visita e invitación a los recordatorios. |
| `interface/SettingsPanel.js` | Sonido, recordatorios, movimiento y reinicio. |
| `interface/Toast.js` | Avisos efímeros. |
| `interface/ChristmasEveScene.js` | Escena especial del 24 de diciembre. |
| `common/Icon.js` | Catálogo de iconos SVG. |

## 11. Funcionamiento del desbloqueo por fechas

La fecha de referencia **no es la del dispositivo**: se calcula siempre en la
zona `America/Lima`, de modo que todos los miembros de la comunidad ven el
mismo calendario a la misma hora.

`src/services/dateService.js` obtiene la fecha con:

```js
new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Lima', ... })
```

y la devuelve como clave `YYYY-MM-DD`. Como ese formato mantiene el orden
alfabético, las comparaciones son directas.

Reglas implementadas:

| Fecha de hoy | Casillas disponibles |
| --- | --- |
| Antes del 1 de diciembre | Ninguna. |
| 1 de diciembre | 1 |
| 2 de diciembre | 1 y 2 |
| … | … |
| 10 de diciembre | 1 a 10 |
| 24 de diciembre | 1 a 24 |

- Una casilla **nunca** se abre si su fecha es futura.
- Una casilla ya pasada que no se ha abierto **puede** descubrirse después.
- Al reabrir una casilla descubierta se conserva su contenido, pero **no** se
  vuelve a registrar ni a repetir la animación inicial.
- El bloqueo se valida **también en JavaScript** (`activityController.js`), no
  solo con CSS: la comprobación es `dateKey >= getDateKeyFromDay(day)`.

Los tres estados visuales de una casilla:

| Estado | Aspecto | Interacción |
| --- | --- | --- |
| Disponible | Marco dorado, número brillante | Se abre y suena la campanilla. |
| Descubierta | Relleno violeta y marca `✧` | Se puede volver a consultar. |
| Completada | Relleno rosa y marca `✓` | Se puede volver a consultar. |
| Bloqueada | Apagada, rayada, sin marca | No deja abrir; muestra «Todavía no es tiempo de descubrir esta sorpresa». |

## 12. Funcionamiento del almacenamiento local

Todo se guarda en **una sola clave** de `localStorage`:

```text
calendario-navideno-state
```

Estructura versionada:

```json
{
  "version": 1,
  "createdAt": "2026-11-29T03:00:00.000Z",
  "updatedAt": "2026-12-13T18:30:00.000Z",
  "openedDays": {
    "3": {
      "openedAt": "2026-12-03T10:12:00.000Z",
      "completedAt": "2026-12-03T10:15:00.000Z",
      "interactions": { "checkedSteps": [0, 1] }
    }
  },
  "activities": {},
  "seenSundayAnimations": {
    "2026-12-13": "2026-12-13T18:31:00.000Z"
  },
  "preferences": {
    "sound": true,
    "notifications": false,
    "reducedMotion": "system",
    "lastVisit": "2026-12-13T18:30:00.000Z"
  }
}
```

- Al entrar por primera vez se **crea automáticamente** el estado.
- Al volver, el progreso se **recupera** de forma transparente.
- Los datos leídos se **sanean**: se descartan días fuera de rango, registros
  corruptos o preferencias con tipos inesperados.
- `storageService.js` captura los errores de lectura y escritura (cuota
  agotada, modo privado) para que la aplicación siga funcionando.
- El reinicio se hace desde **Ajustes → Reiniciar mi progreso** y exige una
  **doble confirmación**.

### Limitaciones que conviene conocer

- **El progreso no se sincroniza entre dispositivos ni entre navegadores.** Es
  una cuenta por navegador y por dispositivo, no una cuenta personal.
- **Si borras los datos del navegador** (historial, cookies y datos de sitios),
  el progreso se reinicia.
- No hay copia de seguridad automática ni exportación del progreso.

## 13. Funcionamiento de la corona de Adviento

La corona está siempre presente en la parte inferior del calendario, con sus
cuatro velas en el orden litúrgico:

| Vela | Color | Cuándo se enciende |
| --- | --- | --- |
| 1 | Morada | 29 de noviembre (primer domingo) |
| 2 | Morada | 6 de diciembre (segundo domingo) |
| 3 | Rosa (Gaudete) | 13 de diciembre (tercer domingo) |
| 4 | Morada | 20 de diciembre (cuarto domingo) |

El estado de la corona se decide en `modules/advent/adventController.js` a
partir del **plan del día**:

```js
const plan = getAdventPlanForDate(dateKey, animationAlreadySeen);
```

- **Domingo de Adviento y animación no vista** → se reproduce la secuencia y
  la animación queda registrada en `seenSundayAnimations`.
- **Domingo de Adviento y animación ya vista** → la corona aparece con las
  velas correctas y se ofrece el botón «Ver la animación de la corona».
- **Otro día dentro del Adviento** → se muestran encendidas las velas de los
  domingos anteriores, **sin** reproducir sus animaciones.
- **Antes del Adviento** → todas las velas apagadas.

Así, quien entra por primera vez el 15 de diciembre ve las tres primeras
velas encendidas de golpe, sin tener que ver las animaciones perdidas.

## 14. Configuración de las animaciones

Todo se apoya en **un único sistema reutilizable**, no en cuatro animaciones
independientes:

```js
await playAdventAnimation({
  candlesLit: 2,       // velas ya encendidas
  newCandle: 3,        // vela que se enciende ahora
  candleColor: 'pink', // color de esa vela
  wreath,              // contenedor de la corona
  messageElement,      // dónde se escribe el mensaje
  message,             // texto de bienvenida
});
```

Secuencia:

1. La corona aparece en primer plano (`opacity` y `y`).
2. Gira unos grados y se detiene.
3. Las velas anteriores quedan encendidas; la nueva, apagada.
4. Entra el angelito y vuela hasta la llama.
5. La llama crece desde cero (`back.out`) y queda latiendo.
6. Salen destellos alrededor de la vela.
7. El ángel se retira con suavidad.
8. Aparece el mensaje del domingo.

La escena de Nochebuena (`christmasEveAnimations.js`) sigue el mismo criterio:
noches que se aclaran, estrellas que brillan, ángeles que despliegan el cartel,
el pesebre que se ilumina y el texto que llega al final.

### Movimiento reducido

Se respeta en tres niveles:

- La preferencia del sistema (`prefers-reduced-motion`).
- La opción de **Ajustes → Movimiento** (`system`, `full`, `reduced`).
- Una regla CSS global que anula animaciones y transiciones.

Con movimiento reducido, `playAdventAnimation` **aplica el estado final
directamente** (velas encendidas y mensaje visible) sin reproducir la
secuencia.

## 15. Cómo agregar o modificar actividades

### Modificar el contenido de un día

Todo el contenido está en `src/data/adventDays.js`. Para cambiar el día 7:

```js
{
  id: 'day-07',
  day: 7,
  title: 'Villancicos para Jesús',
  subtitle: 'Canta con nosotros',
  type: 'music',
  verseKey: 'Gloria',
  requiresInteraction: true,
  completionEnabled: true,
  content: { /* ... */ },
}
```

### Añadir un tipo de actividad nuevo

1. Crea el componente en `src/components/activities/MiActividad.js` con esta
   forma:

   ```js
   export function createMiActividad(options) {
     const element = createElement('div', { class: 'activity' });
     // ... contenido e interacciones ...
     return {
       element,
       validate: () => true,      // ¿se puede completar?
       getData: () => ({}),       // datos que se guardan
     };
   }
   ```

2. Regístralo en `src/modules/activities/activityRegistry.js`:

   ```js
   import { createMiActividad } from '../../components/activities/MiActividad.js';

   export const ACTIVITY_REGISTRY = {
     // ...
     miActividad: { create: createMiActividad, requiresAnswer: true },
   };
   ```

3. Añade su etiqueta en `src/data/activities.js`.
4. Opcional: valida sus datos en `activityValidator.js`.

**El calendario, el modal y el controlador no necesitan ningún cambio**: el
registro es el único punto de extensión.

### Tipos disponibles

`reflection`, `purpose`, `prayer`, `challenge`, `challengeFamily`, `quiz`,
`trivia`, `riddle`, `scramble`, `wordsearch`, `music`.

## 16. Cómo agregar nuevos versículos y reflexiones

### Versículos

En `src/data/bibleVerses.js`:

```js
export const VERSES = {
  emmanuel: {
    reference: 'Is 7,14',
    text: 'Mirad, la virgen concibe y da a luz un hijo, y le pondrás por nombre Emanuel.',
    theme: 'El signo de Dios',
  },
  // ...
};
```

Después, refiéralo desde un día con `verseKey: 'nombreDeLaClave'`.

> Las referencias corresponden a la Biblia de Jerusalén (Reinaldo), la
> edición de uso habitual en la liturgia católica en español. **No se incluyen
> citas inventadas ni paráfrasis**: si no estás seguro de la referencia,
> verifícala antes de añadirla.

### Reflexiones y oraciones

- Reflexiones y textos largos: en `src/data/adventDays.js`, dentro de
  `content.paragraphs`, `content.question` y `content.closing`.
- Oraciones: en `src/data/prayers.js`, con `id`, `title`, `text` y `duration`;
  se invocan desde un día con `content.prayerKey`.

### Cambiar fechas o el número de días

Todo en `src/data/configuration.js`:

```js
export const CONFIG = {
  timezone: 'America/Lima',
  year: 2026,
  dates: {
    adventStart: '2026-11-29',
    calendarStart: '2026-12-01',
    christmasEve: '2026-12-24',
  },
  totalDays: 24,
  storageKey: 'calendario-navideno-state',
  storageVersion: 1,
  // ...
};
```

Los domingos de Adviento están en `src/data/adventDates.js` y las posiciones
de las casillas en `src/data/sceneLayout.js`.

## 17. Configuración de las notificaciones

Las notificaciones son **opcionales** y nunca se activan solas.

1. En la primera visita, la pantalla de bienvenida explica para qué sirven y
   ofrece activarlas. El permiso **solo** se pide cuando el visitante pulsa el
   botón.
2. Si acepta, se guarda `preferences.notifications = true` y se muestra un
   aviso de prueba.
3. Se puede desactivar en cualquier momento desde **Ajustes**.
4. Mientras la página está abierta, un temporizador comprueba cada minuto si
   hay una casilla nueva sin abrir y, en ese caso, muestra un aviso.

### Lo que **no** puede hacer este proyecto

- **No hay notificaciones push reales.** GitHub Pages es un hosting estático:
  no hay servidor que pueda programar avisos ni enviar nada cuando el
  navegador está cerrado.
- Por eso el calendario **no promete** avisos con la aplicación cerrada. Solo
  funciona con la pestaña abierta.
- Si el usuario deniega el permiso, la aplicación sigue funcionando igual:
  los recordatorios son un extra, nunca un requisito.

## 18. Limitaciones técnicas

- **Sin backend.** No hay sincronización, ni cuentas, ni estadísticas globales.
  El progreso es local del navegador.
- **Notificaciones solo con la pestaña abierta** (ver el apartado anterior).
- **Sin audio protegido.** Todos los efectos se sintetizan en el navegador, de
  modo que no hay grabaciones de terceros ni problemas de licencia. La
  melodía de *Noche de paz* (canon de dominio público) se reproduce sintetizada
  y con la letra a la vista.
- **Fuentes del sistema.** No hay tipografías descargadas: el proyecto no
  depende de la red para verse bien.
- **Service worker.** Solo se registra en producción. Si publicas una versión
  nueva, el service worker puede servir durante un rato la versión anterior;
  la actualización se produce al recargar.
- **Navegadores antiguos.** Se necesita soporte de ES Modules, `Intl`,
  `aspect-ratio`, `container-type` y `backdrop-filter`. En navegadores sin
  `container-type` las casillas usan el tamaño mínimo.
- **Sin soporte sin JavaScript.** El calendario necesita JavaScript para
  abrir las casillas, guardar el progreso y animar la corona; hay un aviso
  `noscript` para quien lo desactive.

## 19. Despliegue en GitHub Pages

### 1. Crear el repositorio

```bash
git init
git add .
git commit -m "feat: calendario de adviento 2026"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/calendario-navideño.git
git push -u origin main
```

En GitHub, crea el repositorio con el nombre **`calendario-navideño`** y
opción de repositorio público (GitHub Pages es gratis en repositorios
públicos; en los privados hay que consultar el plan).

### 2. Publicar

El archivo `.github/workflows/deploy.yml` ya está preparado:

1. `npm ci` y `npm run build`.
2. Sube `dist/` como artefacto de Pages.
3. Publica en GitHub Pages.

En **Settings → Pages**, elige **Source: GitHub Actions**. Cada `push` a
`main` despliega automáticamente.

### 3. Verificar la URL

Quedará disponible en:

```text
https://TU_USUARIO.github.io/calendario-navideño/
```

### Rutas y subcarpetas

`vite.config.js` usa `base: './'`, de modo que **todas las rutas son
relativas** y el proyecto funciona igual en la raíz de un dominio que dentro
de una subruta de GitHub Pages, sin tocar la configuración.

El service worker se registra con `import.meta.env.BASE_URL`, por lo que
también funciona en la subruta.

### Alternativa manual

Si prefieres publicar sin GitHub Actions:

```bash
npm run build
```

y sube el contenido de `dist/` a la rama `gh-pages` (o a `main` en la
configuración clásica), siempre desde la **carpeta `dist/`**.

## 20. Cómo actualizar el proyecto

1. Edita los archivos (sobre todo `src/data/`).
2. Comprueba que la configuración es coherente:

   ```bash
   npm run check
   ```

3. Compila:

   ```bash
   npm run build
   ```

4. Sube los cambios:

   ```bash
   git add .
   git commit -m "docs: actualiza el contenido del día 12"
   git push
   ```

5. GitHub Actions publica la versión nueva automáticamente.

### Actualizar el contenido de un día (caso habitual)

Edita `src/data/adventDays.js`, ejecuta `npm run build` y sube el cambio. No
hay que tocar ningún componente.

### Cambiar el diseño de la ilustración

- Las formas reutilizables están en `src/components/calendar/scene/shapes.js`.
- Cada capa es un archivo independiente en `src/components/calendar/scene/`.
- Si cambias la composición, revisa las posiciones de las casillas en
  `src/data/sceneLayout.js`.
- Para volver a exportar los SVG sueltos: `npm run illustrations`.

## 21. Solución de problemas frecuentes

**No se abre ninguna casilla.**
Comprueba la fecha del sistema. El calendario sigue la zona `America/Lima`,
que puede ir uno o dos días por delante o por detrás de tu reloj local. En
desarrollo, prueba con `?fecha=2026-12-13`.

**Las casillas salen diminutas en el móvil.**
Por debajo de 720 px se oculta la capa de casillas de la ilustración y se
muestra la retícula de puertas. Si ves las casillas pequeñas, comprueba que
la ventana no está en modo escritorio con un ancho de móvil.

**No suena nada.**
El sonido no se reproduce automáticamente: hace falta un primer clic o
pulsación en la página (los navegadores lo exigen). Comprueba también que el
icono de la cabecera no esté apagado y que el sistema no esté en silencio.

**No llegan las notificaciones.**
Revisa que el permiso esté concedido en los ajustes del navegador. Recuerda
que **solo funcionan con la página abierta**.

**He borrado los datos del navegador y he perdido el progreso.**
No hay forma de recuperarlo: el progreso solo vivía en ese navegador. Se
puede evitar en el futuro no borrando los datos de este sitio.

**La compilación falla con `Cannot find module` o similar.**
Ejecuta `npm install` de nuevo y comprueba que estás en la carpeta del
proyecto (donde está `package.json`).

**La página en GitHub Pages no carga los recursos.**
Comprueba que `base` siga siendo `'./'` en `vite.config.js` y que no haya
rutas absolutas (`/assets/...`) añadidas a mano.

**Las animaciones se ven entrecortadas o son muy largas.**
Ajusta **Ajustes → Movimiento → Movimiento reducido**. El proyecto respeta
también la preferencia del sistema.

**Quiero cambiar el número de días o las fechas.**
Todo está en `src/data/configuration.js` (fechas y `totalDays`) y en
`src/data/adventDates.js` (domingos). Después, `npm run check` y
`npm run build`.

**El service worker sirve una versión antigua.**
Recarga la página dos veces o vacía la caché del sitio. Al publicar una
versión nueva, cambia `CACHE_NAME` en `public/sw.js` para forzar la
actualización.

## 22. Verificación y pruebas

### Comprobación automática de configuración

```bash
npm run check
```

Verifica que todas las claves de `CONFIG` y `SCENE_COLORS` usadas en el
código existen. Es la red de seguridad para los colores y las fechas.

### Prueba funcional en un navegador real

Requiere `playwright-core` (ya está en las dependencias de desarrollo) y un
Chrome o Edge instalado en el sistema:

```bash
npm run dev
npm run smoke
```

La prueba recorre la aplicación y comprueba:

- La pantalla de bienvenida de la primera visita.
- El estado del calendario antes del Adviento y en un domingo de Gaudete.
- La versión de móvil (390 × 844).
- La apertura de una casilla y la aparición del modal.
- La escena de Nochebuena y su cierre.
- La resolución de un acertijo y el marcado de la actividad como realizada.
- La persistencia del progreso en `localStorage`.
- El reinicio del progreso desde Ajustes.
- **Que no haya ningún error ni aviso en la consola.**

### Capturas para revisión visual

```bash
node scripts/shots.mjs
```

Guarda en la carpeta temporal del sistema la escena, la corona, la versión
móvil y los ángulos de los dos ángeles de la ilustración.

### Comprobación de los cuatro domingos

```bash
npm run dev
npm run check:sundays
```

Recorre el 29 de noviembre, el 6, el 13 y el 20 de diciembre, además del 24
y de un día anterior al Adviento, y comprueba que la corona tiene
exactamente 1, 2, 3 y 4 velas encendidas en su momento.

### Comprobación de la compilación de producción

```bash
npm run build
npm run preview
npm run check:production
```

Verifica que en la versión compilada están las 24 casillas, las 24 puertas de
móvil, las 4 velas, la escena y el service worker registrado, y que no hay
ningún error en consola.

### Qué se ha verificado en este proyecto

- [x] Sin errores de JavaScript en consola.
- [x] Compilación de producción correcta.
- [x] Rutas y recursos cargan correctamente.
- [x] `localStorage` guarda, recupera y reinicia el progreso.
- [x] Días bloqueados, días disponibles y reapertura de casillas descubiertas.
- [x] Los cuatro domingos de Adviento y los cuatro estados de las velas.
- [x] La experiencia del 24 de diciembre.
- [x] Diseño en celular (390 px) y escritorio (1440 px) sin desbordamientos.
- [x] El audio no se reproduce automáticamente.
- [x] Las notificaciones no se solicitan sin contexto.
- [x] La simulación de fecha funciona en desarrollo y **no** existe en
      producción.

---

## Licencia y créditos

- Código: [MIT](LICENSE).
- Textos bíblicos: Biblia de Jerusalén (Reinaldo), edición de la Real Academia
  Española.
- *Noche de paz*: canon tradicional de dominio público.
- Ilustraciones: originales de este proyecto, dibujadas en SVG.
- Sin recursos de terceros: no hay imágenes, audios ni tipografías externas.
