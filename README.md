# Calendario de Adviento 2026

**24 días para preparar el corazón y recibir a Jesús.**

Soy **Boyi**, soy católica y amo la Navidad: amo el nacimiento de Jesús, porque
amo a Jesús. De ahí nace este proyecto: una **experiencia web interactiva de
Adviento y Navidad** para una comunidad cristiana — una aldea de Belén
ilustrada, 24 puertas que se abren día a día, una corona de Adviento que se
enciende cada domingo y actividades personales o en familia.

Es una **aplicación web estática**: no hay backend, ni base de datos, ni
registros de usuarios, ni servicios externos. Todo el progreso se guarda en el
navegador del visitante. Es, en el fondo, **algo visual**: una pequeña Belén
que se abre puerta a puerta, para vivir la espera de la Navidad.

> ### ➡️ [Abre el calendario y empieza el Adviento](https://absanxd.github.io/christmas-calendar/)
>
> **https://absanxd.github.io/christmas-calendar/**
>
> Código: https://github.com/ABSanxd/christmas-calendar
>
> Cada `git push` a `main` recompila y vuelve a publicar el sitio
> automáticamente mediante GitHub Actions.

---

## Índice

1. [Descripción general](#1-descripción-general)
2. [Objetivo](#2-objetivo)
3. [Características principales](#3-características-principales)
4. [Tecnologías utilizadas](#4-tecnologías-utilizadas)
5. [Cómo ejecutarlo](#5-cómo-ejecutarlo)
6. [Estructura de carpetas](#6-estructura-de-carpetas)
7. [Cómo está hecho](#7-cómo-está-hecho)
8. [Cómo personalizar el contenido](#8-cómo-personalizar-el-contenido)
9. [Comprobaciones](#9-comprobaciones)

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
- Las preguntas de una sola respuesta se pueden **deseleccionar** pulsando
  otra vez la opción marcada, para poder rectificar antes de completar el día.
  Un día ya completado se puede volver a abrir y **actualizar**.

### Corona de Adviento

- Corona SVG permanente en la **esquina superior derecha**, junto a la fecha y
  al título, con cuatro velas: morada, morada, **rosa (Gaudete)** y morada.
- El domingo de Adviento la corona **salta al centro de la pantalla**, el
  fondo se oscurece y el puntero del mouse se convierte en un **fósforo**
  (inclinado hacia la izquierda, como el de verdad).
- La vela pendiente late suavemente, con un halo dorado y el mensaje «✧ Toca
  para encender la *n* velita». **El usuario es quien la enciende**: en
  ordenador, acercando el fósforo y haciendo clic; en el teléfono, con un
  toque.
- Al encenderla aparece el mensaje del domingo y la ceremonia **espera a que
  el usuario la cierre** (botón «Leer la reflexión de este domingo»).
- Al cerrarla, la corona **regresa a su esquina** y se abre la **reflexión del
  domingo**: el Evangelio del día, una reflexión breve y el significado de la
  vela.
- Las reflexiones se pueden volver a leer desde el botón de la cabecera (junto
  al del sonido, ambos con un tooltip que explica qué hacen). Se habilitan por
  domingo: en el segundo domingo de Adviento se leen la del primero y la del
  propio segundo.
- Si el visitante ya hizo la ceremonia, la corona se queda en su esquina con
  las velas correctas y no se repite.

### Nochebuena

- El día 24 tiene una experiencia propia: noche de Belén, estrellas que
  brillan, tres ángeles que despliegan el cartel «Nochebuena», el pesebre que
  se ilumina y un versículo con la oración final.
- La comunidad puede sustituir la ilustración por su propia imagen del
  nacimiento: basta con dejar el archivo en
  `public/assets/images/nacimiento.jpg` y el modal lo muestra en su lugar.

### Actividades interactivas

| Tipo | Qué propone |
| --- | --- |
| `reflection` | Lectura breve y una pregunta para meditar. |
| `prayer` | Oración con opción de anotar una intención (solo local). |
| `challenge` | Reto personal con pasos marcables. |
| `challengeFamily` | Reto para hacer en familia o grupo. |
| `scramble` | Reconstruir un mensaje bíblico reordenando palabras. |
| `riddle` | Acertijo con pistas progresivas. |
| `wordsearch` | Sopa de letras generada al azar: se marca arrastrando las letras (como en el celular) o tocándolas una a una. Las palabras encontradas quedan con su color. |
| `quiz` / `trivia` | Preguntas con explicación por respuesta. |
| `music` | Villancico: los días 7 y 19 lo reproducen desde YouTube (Athenas). La actividad admite además melodía sintetizada y acróstico. |
| `purpose` | Compromisos espirituales marcables. |

### Comodidades

- Indicador de progreso: una franja fina justo debajo de la cabecera con la
  barrita, el recuento de casillas descubiertas y actividades realizadas, y el
  porcentaje.
- Sonido con un solo botón en la cabecera (con un tooltip que dice si lo que
  va a pasar es apagar o activar la música), y un mensaje de Adviento en el pie
  sobre el progreso guardado.
- **Música de fondo** con dos villancicos en bucle y muy bajito, que **arranca
  sola en cuanto entra el visitante** y se apaga sola en los días musicales
  (7 y 19) para no competir con la canción; al salir de ellos, vuelve a sonar.
- Reinicio del progreso con doble confirmación.
- Funciona sin conexión (service worker) y se puede instalar como PWA.
- Los efectos de sonido se sintetizan con la Web Audio API (sin archivos
  externos); los únicos contenidos que vienen de un tercero son la música de
  fondo y el villancico del día 7, ambos de YouTube.
- Respeta automáticamente la preferencia de **movimiento reducido** del sistema.

## 4. Tecnologías utilizadas

- **HTML5**, **CSS3** y **JavaScript moderno (ES Modules)**.
- **Vite 5** como herramienta de desarrollo y construcción.
- **GSAP 3** para animaciones y secuencias complejas.
- **SVG** para toda la ilustración (sin imágenes de mapa de bits en la escena).
- **localStorage** para el progreso individual.
- **Web Audio API** para los efectos de sonido.
- **Service Worker + Web App Manifest** para el funcionamiento sin conexión.

No se usa React, ni backend, ni Firebase, ni bases de datos, ni autenticación,
ni servicios que requieran registro de usuarios.

## 5. Cómo ejecutarlo

### Requisitos previos

- **Node.js 18 o superior** (probado con Node 20 y 24).
- **npm 9 o superior** (viene con Node).
- Un navegador moderno: Chrome, Edge, Firefox o Safari de los dos últimos años.

> No hace falta servidor de aplicaciones: la versión compilada es estática.

### Instalación

```bash
npm install
```

Esto instala Vite y GSAP en `node_modules/`.

### Desarrollo

```bash
npm run dev
```

Abre `http://localhost:5173/`.

### Simular una fecha (solo desarrollo)

Para probar cualquier día del Adviento sin esperar, añade el parámetro `fecha`
a la URL:

```
http://localhost:5173/?fecha=2026-12-13        # tercer domingo (Gaudete)
http://localhost:5173/?fecha=2026-12-13T18:30  # con hora concreta
http://localhost:5173/?fecha=2026-11-20        # antes del Adviento
```

El parámetro se lee dentro de `import.meta.env.DEV`. **En la compilación de
producción el bloque entero se elimina**, de modo que un visitante final no
puede desbloquear casillas cambiando la fecha.

**Para volver a ver la ceremonia de un domingo** hay que borrar la marca de
«ya celebrada»: el progreso se guarda en `localStorage`, bajo la clave
`calendario-navideno-state`, en el apartado `seenSundayAnimations`. Desde la
consola del navegador:

```js
// Ver la ceremonia del domingo simulado otra vez:
const clave = 'calendario-navideno-state';
const estado = JSON.parse(localStorage.getItem(clave));
delete estado.seenSundayAnimations['2026-12-13'];
localStorage.setItem(clave, JSON.stringify(estado));
location.reload();
```

Para empezar de cero (sin casillas abiertas ni actividades):

```js
localStorage.removeItem('calendario-navideno-state');
location.reload();
```

### Compilar para producción

```bash
npm run build     # compila en dist/
npm run preview   # sirve dist/ en http://localhost:4173/
```

El comando `build` ejecuta antes `npm run check`, que valida que todas las
claves de `CONFIG` y `SCENE_COLORS` usadas en el código existen (evita colores
o fechas que se queden sin definir).

Existe además `npm run build:demo`: compila la **vista de prueba**, que es la
misma aplicación pero con la simulación de fecha activada, para poder abrir
cualquier día con `?fecha=AAAA-MM-DD` antes de que llegue el Adviento. El
calendario publicado se compila siempre con `npm run build`, que **elimina**
ese bloque de la compilación.

## 6. Estructura de carpetas

```text
calendario-navideño/
├── .github/
│   └── workflows/deploy.yml      Despliegue automático en GitHub Pages
├── public/
│   ├── assets/
│   │   └── images/
│   │       └── nacimiento.jpg     Foto opcional del día 24
│   ├── favicon.svg
│   ├── manifest.webmanifest      Datos de la PWA
│   └── sw.js                     Service worker (caché sin conexión)
├── scripts/                      Comprobaciones y capturas (ver sección 9)
├── src/
│   ├── components/               Elementos visuales reutilizables
│   │   ├── activities/           Una pieza por tipo de actividad
│   │   ├── advent/               Corona, vela y ceremonia de encendido
│   │   ├── calendar/             Calendario, casillas y progreso
│   │   │   └── scene/            Capas de la ilustración de Belén
│   │   │       └── characters/     Un archivo por personaje
│   │   ├── common/               Catálogo de iconos
│   │   └── interface/            Modal, avisos y escena de Nochebuena
│   ├── data/                     Contenido y configuración (editable sin tocar lógica)
│   ├── modules/                  Lógica funcional de cada sección
│   ├── services/                 Acceso a servicios del navegador
│   ├── styles/                   CSS organizado
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
  reexportan código.
- `modules/advent/adventDates.js` no duplica `data/adventDates.js`: el módulo
  combina los datos con el estado de la visita y devuelve el «plan del día».
- Las ilustraciones viven como **componentes SVG en código** (para poder
  animarlas con GSAP) y se recolocan personaje a personaje. No hay copias
  estáticas en `public/` que se puedan quedar desactualizadas.

### `src/data/` — el contenido editable

| Archivo | Contenido |
| --- | --- |
| `configuration.js` | Zona horaria, fechas del Adviento, número de días, paleta, mensajes de los domingos, clave de almacenamiento y versión del esquema. |
| `adventDates.js` | Los cuatro domingos de Adviento y los cálculos de cuántas velas están encendidas según la fecha. |
| `adventDays.js` | Los 24 días: título, bajada, tipo de actividad y contenido. |
| `activities.js` | Etiqueta, icono y color de cada tipo de actividad. |
| `bibleVerses.js` | Versículos con texto, referencia y tema. |
| `prayers.js` | Oraciones breves de Adviento y Navidad. |
| `sceneLayout.js` | Posición en el `viewBox` de las 24 casillas y su estilo. |

### `src/services/` — el acceso al navegador

| Archivo | Responsabilidad |
| --- | --- |
| `dateService.js` | Obtiene la fecha de hoy en `America/Lima` y expone la simulación de desarrollo. |
| `storageService.js` | Lectura y escritura segura de `localStorage`, con control de cuota y de modo privado. |
| `deviceService.js` | Capacidades: movimiento reducido, tipo de dispositivo, vibración. |

### `src/modules/` — la lógica

| Archivo | Responsabilidad |
| --- | --- |
| `progress/progressStorage.js` | Esquema versionado, saneado de datos y persistencia. |
| `progress/progressTracker.js` | Abre días, completa actividades, registra animaciones vistas y expone las preferencias. |
| `progress/progressController.js` | Une el rastreador con la interfaz y difunde el evento `calendario:progress`. |
| `calendar/calendarRenderer.js` | Construye la interfaz completa (cabecera, progreso, calendario, corona, pie). |
| `calendar/calendarEvents.js` | Enlaza los botones de la cabecera y escucha los cambios de progreso. |
| `calendar/calendarController.js` | Orquesta todo: calcula el estado de las casillas, la corona y el sonido. |
| `advent/adventDates.js` | Devuelve el «plan de Adviento» de una fecha (domingo, velas antes y después, si toca celebrar). |
| `advent/adventState.js` | Estado en memoria de la corona y sus suscriptores. |
| `advent/adventController.js` | Decide si se celebra la ceremonia del domingo y mantiene la corona al día. |
| `advent/adventCeremony.js` | Orquesta la ceremonia: la corona salta al centro, el usuario enciende la vela, la cierra y se abre la reflexión. |
| `advent/matchCursor.js` | Sustituye el puntero del mouse por un fósforo (apagado y encendido). |
| `advent/reflectionsController.js` | Habilita las reflexiones por domingo y abre su lista desde la cabecera. |
| `activities/activityRegistry.js` | Mapa `tipo → componente`. |
| `activities/activityValidator.js` | Valida la definición de un día y los datos que produce una actividad. |
| `activities/activityController.js` | Abre la casilla, comprueba el bloqueo en JavaScript, registra el progreso y celebra. |
| `animations/animationController.js` | Animaciones reutilizables del calendario (descubrimiento de casillas). |
| `animations/candleAnimations.js` | Encendido progresivo de las velas y destellos. |
| `animations/adventCeremonyAnimations.js` | Viaje de la corona al centro y de vuelta (FLIP) y latido de la vela pendiente. |
| `animations/calendarAnimations.js` | Entrada de la escena, apertura de casillas y confeti de estrellas. |
| `animations/christmasEveAnimations.js` | Secuencia completa de Nochebuena. |
| `audio/audioService.js` | Síntesis con la Web Audio API: campanillas, destellos y melodía. |
| `audio/audioController.js` | Preferencias de sonido y catálogo de efectos. |
| `audio/backgroundMusic.js` | Música de fondo: reproductor de YouTube en bucle, a volumen bajo y en pausa durante los días musicales. |

### `src/components/` — la interfaz

| Archivo | Responsabilidad |
| --- | --- |
| `calendar/Calendar.js` | Compone la escena con las 24 casillas y la versión alternativa de móvil. |
| `calendar/CalendarDay.js` | Una casilla: botón real, foco, estados y tooltip. |
| `calendar/CalendarProgress.js` | Barra de progreso. |
| `calendar/scene/*` | Capas de la ilustración: `SkyLayer`, `VillageLayer`, `NativityLayer`, `AngelsLayer`, `CharactersLayer`, `DayDoors` y `shapes.js` (formas reutilizables). |
| `calendar/scene/characters/*` | Cada personaje es un componente independiente: `Angel`, `Mary`, `Joseph`, `BabyJesus`, `Magus`, `Camel`, `Shepherd`, `Sheep` y `Tree`. Se dibujan con el origen en su base, de modo que se pueden colocar y escalarlo con libertad. |
| `advent/AdventWreath.js` | La corona completa, con sus variantes (esquina y ceremonia) y la vela pendiente resaltada. |
| `advent/AdventCandle.js` | Una vela, con la llama como elemento animable independiente. |
| `advent/AdventCeremony.js` | La capa de la ceremonia: corona grande, mensaje y vela que hay que encender. |
| `advent/AdventReflection.js` | El modal de la reflexión de cada domingo y la lista de las ya disponibles. |
| `activities/*` | Una pieza por tipo de actividad, más `activityParts.js` (bloques compartidos) y `ActivityModal.js`. |
| `interface/Modal.js` | Modal con foco atrapado, Escape y clic en el fondo. |
| `interface/Toast.js` | Avisos efímeros. |
| `interface/ChristmasEveScene.js` | Escena especial del 24 de diciembre. |
| `common/Icon.js` | Catálogo de iconos SVG. |

## 7. Cómo está hecho

### El desbloqueo por fechas

La fecha de referencia **no es la del dispositivo**: se calcula siempre en la
zona `America/Lima`, de modo que todos los miembros de la comunidad ven el
mismo calendario a la misma hora.

`src/services/dateService.js` obtiene la fecha con:

```js
new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Lima', ... })
```

y la devuelve como clave `YYYY-MM-DD`. Como ese formato mantiene el orden
alfabético, las comparaciones son directas.

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

### El almacenamiento local

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

Dos cosas que conviene saber:

- **El progreso no se sincroniza entre dispositivos ni entre navegadores.** Es
  una cuenta por navegador y por dispositivo, no una cuenta personal.
- **Si borras los datos del navegador** (historial, cookies y datos de sitios),
  el progreso se reinicia. No hay copia de seguridad automática ni exportación.

### La corona de Adviento

La corona vive en la **esquina superior derecha** del saludo (junto a la fecha
y al título), en versión compacta, y comparte ilustración con la versión
grande de la ceremonia. Sus cuatro velas siguen el orden litúrgico:

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

- **Domingo de Adviento y ceremonia no vista** → la corona salta al centro y
  espera a que el usuario encienda la vela; al terminar, la ceremonia queda
  registrada en `seenSundayAnimations`.
- **Domingo de Adviento y ceremonia ya vista** → la corona se queda en su
  esquina con las velas correctas.
- **Otro día dentro del Adviento** → se muestran encendidas las velas de los
  domingos anteriores, **sin** reproducir sus ceremonias.
- **Antes del Adviento** → todas las velas apagadas.

Así, quien entra por primera vez el 15 de diciembre ve las tres primeras
velas encendidas de golpe, sin tener que ver las ceremonias perdidas.

### La ceremonia del domingo

La rutina es **la misma para los cuatro domingos**: solo cambia cuál es la
vela pendiente. Al empezar, las velas de los domingos anteriores ya aparecen
encendidas.

Se ejecuta en `modules/advent/adventCeremony.js`:

1. Se crea la capa de ceremonia (`components/advent/AdventCeremony.js`) con
   la corona grande, el fondo oscurecido y el mensaje «✧ Toca para encender la
   *n* velita».
2. El puntero del mouse se sustituye por un **fósforo**
   (`modules/advent/matchCursor.js`), que se enciende al tocar la vela. En
   pantallas táctiles no hace falta: basta con tocar la vela.
3. La vela pendiente late (`animations/adventCeremonyAnimations.js`) y tiene un
   halo dorado detrás.
4. Al tocarla, la llama crece, saltan chispas, el fósforo se enciende y
   aparece el mensaje del domingo.
5. **La ceremonia no se cierra sola**: espera a que el visitante pulse «Leer
   la reflexión de este domingo» para poder leer el mensaje a su ritmo.
6. La corona **vuelve a su esquina** (técnica FLIP: se mide el hueco y el
   centro de pantalla y se anima el desplazamiento y la escala que los unen)
   y se abre la reflexión del domingo.

La vela también es activable con el teclado (Enter o espacio) y con el botón
del mensaje, de modo que la ceremonia nunca deja el calendario bloqueado.

### La reflexión de cada domingo

El contenido vive en `src/data/adventReflections.js`. Cada domingo tiene tres
partes: el **Evangelio** (el texto litúrgico del día, con su referencia), la
**reflexión** (una lectura breve del pasaje) y la **vela** (qué significa la
vela que se enciende ese domingo).

| Domingo | Evangelio | Vela |
| --- | --- | --- |
| 1.º (29 nov) | Mc 13,33-37 | La vela del arrepentimiento |
| 2.º (6 dic) | Mc 1,1-8 | La vela de la promesa de Navidad |
| 3.º (13 dic) | Jn 1,6-8.19-28 | La vela del amor (rosa, Gaudete) |
| 4.º (20 dic) | Lc 1,26-38 | La vela de la alegría: el gran día se acerca |

### Las animaciones

La ceremonia se apoya en un único sistema reutilizable para los cuatro
domingos:

```js
await runLightingCeremony({
  plan,        // plan de Adviento del día (candlesBefore, newCandle, message)
  originRect,  // dónde está la corona en la esquina
});
```

La escena de Nochebuena (`christmasEveAnimations.js`) sigue el mismo criterio:
noches que se aclaran, estrellas que brillan, ángeles que despliegan el cartel,
el pesebre que se ilumina y el texto que llega al final.

**Movimiento reducido.** El proyecto **respeta automáticamente** la preferencia
de movimiento reducido del sistema operativo (`prefers-reduced-motion`), sin
necesidad de tocar nada en la aplicación:

- En Windows: **Configuración → Accesibilidad → Efectos visuales → animaciones**.
- En iOS/macOS: **Ajustes → Accesibilidad → Mostrar → Reducir movimiento**.
- En Android: **Accesibilidad → Eliminar animaciones**.

Cuando el sistema lo pide, la ceremonia de Adviento **aplica el estado final
directamente** (sin el viaje al centro ni el regreso) y una regla CSS global
anula animaciones y transiciones. El resto de la experiencia —incluido el
fósforo y el mensaje para tocar la vela— se mantiene igual.

## 8. Cómo personalizar el contenido

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

Tipos disponibles: `reflection`, `purpose`, `prayer`, `challenge`,
`challengeFamily`, `quiz`, `trivia`, `riddle`, `scramble`, `wordsearch`,
`music`.

### Añadir versículos

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
de las casillas en `src/data/sceneLayout.js`. Después, `npm run check` y
`npm run build`.

## 9. Comprobaciones

```bash
npm run check             # Valida que CONFIG y SCENE_COLORS están completos
npm run check:production  # Revisa la compilación en un navegador real
npm run check:sundays     # Recorre los cuatro domingos y enciende las velas
npm run smoke             # Prueba funcional completa (necesita `npm run preview`)
```

En `scripts/` hay además utilidades de revisión visual:

| Script | Para qué sirve |
| --- | --- |
| `check-reflections.mjs` | Comprueba que las reflexiones se habilitan domingo a domingo. |
| `check-days.mjs` | Revisa los primeros días y sus actividades. |
| `check-mobile.mjs` | Comprueba la vista en celular. |
| `check-music.mjs` | Sigue el estado de la música de fondo (pausa y reanudación). |
| `verify-advent.mjs` | Capturas de la ceremonia de Adviento, paso a paso. |
| `shots.mjs` | Capturas de pantalla para revisión visual. |
| `shot-shepherds.mjs` | Recortes de los pastores para revisar el dibujo. |
