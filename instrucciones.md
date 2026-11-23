# PROYECTO: CALENDARIO NAVIDEÑO 2026
## Experiencia interactiva de Adviento y preparación para la Navidad

Actúa como un desarrollador frontend senior especializado en experiencias web interactivas, diseño UI/UX, animaciones, arquitectura modular y aplicaciones web estáticas.

Tu tarea es **diseñar y desarrollar un proyecto web completo, funcional, visualmente atractivo, interactivo y escalable**, correspondiente a un calendario de Adviento católico para el año 2026.

No debes limitarte a presentar una propuesta, una maqueta o fragmentos de código. Debes generar todos los archivos necesarios, implementar las funcionalidades y dejar el proyecto preparado para ejecutarse localmente y desplegarse en GitHub Pages.

El nombre de la carpeta principal del proyecto será:

`calendario-navideño`

---

# 1. CONCEPTO GENERAL

El proyecto consiste en un calendario digital de Adviento y Navidad que permitirá a los integrantes de una comunidad católica prepararse espiritualmente para el nacimiento de Jesús.

Estará dirigido a niños, jóvenes, adultos y familias.

La experiencia combinará:

- Reflexiones cristianas.
- Versículos bíblicos.
- Oraciones.
- Retos y pequeños propósitos diarios.
- Juegos interactivos.
- Actividades familiares.
- Música católica navideña.
- Animaciones e ilustraciones.
- Una experiencia especial para cada domingo de Adviento.
- Una celebración especial para Nochebuena.

El calendario debe transmitir una sensación de descubrimiento, ternura, espiritualidad, ilusión y preparación para la Navidad.

No debe parecer una página convencional ni un simple listado de actividades. Debe sentirse como un pequeño mundo navideño interactivo que evoluciona conforme avanzan los días.

## Identidad visual y temática

La Navidad representada será exclusivamente de temática cristiana y católica.

**NO incluir:**
- Papá Noel o Santa Claus.
- Renos.
- Muñecos de nieve.
- Duendes navideños.
- Árboles navideños comerciales como protagonistas.
- Personajes ajenos a la representación cristiana del nacimiento de Jesús.

**SÍ incluir:**
- La Sagrada Familia.
- Jesús recién nacido.
- María y José.
- El pesebre.
- Los Reyes Magos.
- Pastores.
- Ángeles y querubines.
- Estrella de Belén.
- Iglesias y casitas de Belén.
- Coronas de Adviento.
- Velas moradas y rosadas.
- Estrellas, campanas, luces y elementos ornamentales.
- Ángeles con trompetas y otros elementos celestiales.

La estética debe ser cálida, ilustrada, delicada y artesanal.

---

# 2. TECNOLOGÍAS

El proyecto debe ser compatible con GitHub Pages y funcionar como una aplicación web estática.

Tecnologías principales:

- HTML5.
- CSS3.
- JavaScript moderno (ES Modules).
- Vite como herramienta de desarrollo y construcción.
- GSAP para animaciones y secuencias complejas.
- SVG para ilustraciones y elementos gráficos animables.
- Lottie únicamente cuando resulte útil y se disponga de animaciones compatibles.
- localStorage para almacenar el progreso individual.
- Notification API para notificaciones opcionales del navegador.

Puedes utilizar bibliotecas adicionales pequeñas si aportan una funcionalidad concreta y justificable.

No utilizar:
- Backend.
- Firebase.
- Bases de datos.
- MySQL.
- Laravel.
- React.
- Sistemas de autenticación.
- Servicios que requieran registro de usuarios.
- Servicios de almacenamiento externo obligatorio.

La aplicación debe poder funcionar sin conexión al servidor después de haber cargado sus recursos, siempre que se implemente correctamente el almacenamiento en caché y los recursos necesarios.

Toda funcionalidad principal debe poder utilizarse sin crear una cuenta.

---

# 3. FECHAS Y FUNCIONAMIENTO DEL CALENDARIO

El proyecto corresponde al Adviento de 2026.

El Adviento comienza el domingo 29 de noviembre de 2026.

El calendario tradicional tendrá 24 casillas, correspondientes al 1 al 24 de diciembre.

Sin embargo, el 29 de noviembre será una fecha especial de inauguración y bienvenida.

## Fechas importantes

| Fecha | Evento |
|---|---|
| 29/11/2026 | Primer domingo de Adviento y apertura especial |
| 01/12/2026 | Primera casilla |
| 06/12/2026 | Segundo domingo de Adviento |
| 13/12/2026 | Tercer domingo de Adviento (Gaudete) |
| 20/12/2026 | Cuarto domingo de Adviento |
| 24/12/2026 | Nochebuena y cierre especial |

Utilizar la zona horaria `America/Lima` para determinar la fecha actual.

No depender de la zona horaria configurada en el dispositivo del visitante para desbloquear las casillas.

## 3.1. Sistema de desbloqueo

Esta funcionalidad es fundamental.

El calendario debe funcionar según la fecha actual.

Reglas:

1. Antes del 1 de diciembre, las casillas del 1 al 24 estarán bloqueadas.
2. El 1 de diciembre se podrá abrir únicamente la casilla 1.
3. El 2 de diciembre se podrán abrir las casillas 1 y 2.
4. El 3 de diciembre se podrán abrir las casillas 1, 2 y 3.
5. El mismo comportamiento continuará hasta el 24 de diciembre.
6. Nunca se podrá abrir una casilla correspondiente a una fecha futura.
7. Los días anteriores que todavía no hayan sido abiertos podrán descubrirse en cualquier momento posterior a su fecha.
8. Al abrir una casilla, se guardará el estado de apertura en localStorage.
9. Una casilla abierta debe mostrar visualmente una etiqueta o indicador que permita reconocer que ya fue descubierta.
10. Una casilla bloqueada debe tener una apariencia diferente y no debe permitir acceder a su contenido.

Ejemplo:

Si hoy es 10 de diciembre:

- Días 1 al 10: disponibles.
- Días 11 al 24: bloqueados.
- Si ya abrió el día 1, aparecerá identificado como abierto.
- Si nunca abrió el día 7, podrá descubrirlo.
- No podrá acceder al día 11 ni a cualquier día posterior.

Los días abiertos deben conservar su contenido accesible para que el usuario pueda volver a consultarlos, pero no deben volver a registrarse como una nueva apertura ni repetir innecesariamente su animación inicial.

## 3.2. Estado visual de las casillas

Cada casilla debe tener tres estados:

**Disponible y no descubierta:**
- Se puede seleccionar.
- Tiene una apariencia atractiva.
- Puede mostrar un pequeño efecto al pasar el cursor o tocarla.

**Descubierta:**
- Muestra una etiqueta como «Abierto», «Descubierto» o un pequeño check.
- Conserva una apariencia especial.
- Permite volver a consultar su contenido.

**Bloqueada:**
- Apariencia visual diferenciada.
- Candado, sombra o efecto de bloqueo.
- No permite abrir el contenido.
- Puede mostrar un mensaje como «Todavía no es tiempo de descubrir esta sorpresa».

El bloqueo debe validarse también en JavaScript, no únicamente mediante CSS.

---

# 4. IDENTIFICACIÓN Y ALMACENAMIENTO DEL PROGRESO

No habrá registros ni cuentas de usuario.

Utilizar localStorage para guardar el progreso individual de cada navegador.

La información puede incluir:

- Casillas descubiertas.
- Actividades completadas.
- Fecha de primera apertura de cada casilla.
- Estado de visualización de las animaciones de los domingos.
- Preferencias de notificaciones.
- Preferencias de audio.
- Configuraciones de accesibilidad.

Generar una estructura de almacenamiento organizada y versionada.

Por ejemplo:

`calendario-navideno-state`

El sistema debe:

- Inicializarse automáticamente al ingresar por primera vez.
- Recuperar el progreso al regresar.
- Evitar duplicados.
- Validar los datos almacenados.
- Manejar errores de lectura y escritura.
- Permitir reiniciar el progreso mediante una opción de configuración con confirmación.

IMPORTANTE:

El progreso corresponde al navegador y dispositivo, no a una cuenta personal.

No implementar sincronización entre dispositivos ni estadísticas globales.

---

# 5. DISEÑO PRINCIPAL DEL CALENDARIO

Tomar como referencia visual la ilustración navideña proporcionada.

La composición debe estar inspirada en un pequeño pueblo de Belén.

## 5.1. Composición visual

Elementos:

- Fondo azul nocturno.
- Estrellas doradas y moradas.
- Casas blancas de arquitectura antigua.
- Paisaje desértico.
- Palmeras y vegetación.
- Caminos que conducen hacia el pesebre.
- Personajes bíblicos distribuidos en la escena.
- Ángeles en la parte superior.
- Estrella de Belén como elemento central superior.
- Sagrada Familia y pesebre en el centro.
- Corona de Adviento en la zona inferior.

Paleta sugerida:

- Azul noche: `#17264A`
- Azul profundo: `#26345D`
- Dorado: `#C6A568`
- Beige: `#D9C79D`
- Marfil: `#F6F0E5`
- Morado: `#78528D`
- Rosa Gaudete: `#DDA3B8`

Se pueden introducir variaciones de tonalidad para dar profundidad.

## 5.2. Distribución de las casillas

Las 24 casillas deben estar integradas en la ilustración.

No utilizar una cuadrícula convencional de 4x6 como diseño principal.

Distribuirlas alrededor del nacimiento de Jesús, aprovechando:

- Puertas de las casas.
- Ventanas.
- Pequeños edificios.
- Elementos decorativos.
- Caminos.
- Estrellas y otros espacios de la ilustración.

Cada casilla debe tener un número claramente identificable.

Las zonas interactivas deben ser independientes.

No convertir todo el calendario en una sola imagen plana.

Utilizar una composición por capas:

- Ilustración de fondo.
- Elementos decorativos.
- Personajes.
- Casillas interactivas.
- Elementos animados.
- Corona de Adviento.

Preferir SVG independientes para las partes que deban tener movimiento.

En dispositivos móviles, adaptar la composición para evitar que los números y las zonas interactivas sean demasiado pequeños. Se puede implementar una distribución alternativa responsive conservando la identidad visual.

## 5.3. Interacciones

Al pasar el cursor sobre una casilla:

- Pequeño efecto de elevación.
- Brillo suave.
- Cambio sutil de escala.

En dispositivos táctiles, responder al toque.

Al seleccionar una casilla disponible:

1. Reproducir una animación breve de apertura.
2. Mostrar una transición.
3. Abrir el contenido correspondiente.
4. Registrar la fecha de descubrimiento.
5. Actualizar visualmente el calendario.

No utilizar ventanas emergentes genéricas del navegador.

El contenido debe presentarse mediante una experiencia visual integrada en la página: modal personalizado, panel animado o escena ampliada.

---

# 6. CORONA DE ADVIENTO Y ANIMACIONES DE LOS DOMINGOS

Esta es una de las funcionalidades visuales más importantes del proyecto.

La corona estará presente permanentemente en la parte inferior del calendario.

Debe tener cuatro velas:

- Primera vela: morada.
- Segunda vela: morada.
- Tercera vela: rosa.
- Cuarta vela: morada.

La tercera vela representa el domingo de Gaudete.

La corona debe ser una ilustración independiente, preferentemente SVG, con cada vela y su llama como elementos separados.

## 6.1. Primer domingo: 29 de noviembre

Al ingresar durante el primer domingo de Adviento, mostrar una experiencia especial de inauguración.

Secuencia:

1. La página presenta el calendario.
2. Se produce una transición suave.
3. Aparece la corona de Adviento en primer plano.
4. La corona realiza un pequeño giro y se detiene.
5. Aparece un angelito volando desde un extremo de la pantalla.
6. El angelito se dirige hacia la primera vela.
7. Se produce el encendido de la primera vela morada.
8. La llama aparece progresivamente.
9. Se agregan pequeños destellos.
10. El angelito realiza una salida suave.
11. Se presenta un mensaje de bienvenida al tiempo de Adviento.

Mensaje sugerido:

«Comienza nuestro camino hacia la Navidad. Preparemos nuestro corazón para recibir a Jesús».

La primera vela debe permanecer encendida después de la animación.

## 6.2. Segundo domingo: 6 de diciembre

Repetir la experiencia de la corona.

Sin embargo:

- La primera vela ya debe aparecer encendida.
- La segunda vela permanece apagada inicialmente.
- El angelito vuelve a ingresar.
- Se dirige hacia la segunda vela.
- Enciende la segunda vela morada.
- Ambas velas permanecen encendidas.

## 6.3. Tercer domingo: 13 de diciembre

Es el domingo de Gaudete.

La secuencia será similar:

- Primera y segunda velas encendidas.
- Tercera vela apagada.
- La tercera vela debe ser rosa.
- El angelito ingresa y la enciende.
- Se produce una iluminación especial.
- Se presenta un mensaje relacionado con la alegría por la cercanía del nacimiento de Jesús.

## 6.4. Cuarto domingo: 20 de diciembre

- Las primeras tres velas aparecen encendidas.
- La cuarta vela, de color morado, permanece apagada.
- El angelito ingresa y enciende la cuarta.
- Las cuatro velas permanecen iluminadas.
- Se presenta un mensaje especial de preparación para la Navidad.

## 6.5. Reutilización de las animaciones

No crear cuatro animaciones completamente independientes.

Diseñar un sistema reutilizable.

Ejemplo conceptual:

`playAdventAnimation({ candlesLit: 2, newCandle: 3, candleColor: "pink" })`

La función debe:

- Determinar qué velas deben aparecer encendidas.
- Mantener los estados anteriores.
- Seleccionar la nueva vela.
- Ejecutar la secuencia del angelito.
- Activar la llama.
- Ejecutar los efectos de iluminación.
- Finalizar con la corona actualizada.

La cantidad de velas encendidas debe calcularse según la fecha y el domingo correspondiente.

No permitir que una fecha anterior muestre velas de domingos futuros.

## 6.6. Control de reproducción

La animación principal debe mostrarse una vez por cada domingo y conservar su estado.

Si el visitante ya vio la secuencia:

- No reproducirla automáticamente de nuevo.
- Mantener la corona con las velas correspondientes encendidas.
- Permitir reproducir voluntariamente la animación mediante un botón, si resulta conveniente.

Si el usuario ingresa por primera vez después del segundo domingo, debe ver las dos primeras velas encendidas, sin reproducir las secuencias de los domingos anteriores obligatoriamente.

---

# 7. EXPERIENCIA ESPECIAL DE NOCHEBUENA: 24 DE DICIEMBRE

El día 24 debe tener una presentación diferente.

No debe sentirse como una casilla más.

Crear una secuencia especial:

1. Transición hacia una escena nocturna.
2. Las estrellas comienzan a brillar.
3. Aparecen varios angelitos volando.
4. Los angelitos transportan o despliegan un cartel.
5. El cartel muestra «Nochebuena».
6. Se ilumina el pesebre.
7. La Sagrada Familia aparece como protagonista.
8. Se presenta un versículo bíblico o mensaje navideño.
9. Se ofrece una oración final de agradecimiento.

Mensaje sugerido:

«Hoy nos reunimos para celebrar el nacimiento de Jesús. Que su luz ilumine nuestros hogares y nuestros corazones».

La experiencia debe ser emotiva, cálida y visualmente especial.

Se puede incluir un botón para volver a contemplar la escena.

---

# 8. CONTENIDO DE LOS 24 DÍAS

El contenido debe estar separado de los componentes visuales y de la lógica del calendario.

Crear un sistema de actividades flexible.

Cada día puede tener una categoría diferente:

- Reflexión.
- Oración.
- Versículo bíblico.
- Reto personal.
- Reto familiar.
- Juego.
- Trivia.
- Acertijo.
- Música católica navideña.
- Actividad creativa.
- Propósito espiritual.

No todos los días deben tener la misma estructura.

Ejemplos:

**Día 1: Comienza nuestro camino**

Reflexión sobre el Adviento y la esperanza.

**Día 2: Una pequeña oración**

Invitar a dedicar unos minutos a Dios.

**Día 3: Un gesto de amor**

Realizar una buena acción por alguien.

**Día 4: Descubre el mensaje**

Una pequeña actividad bíblica interactiva.

**Día 5: La alegría de compartir**

Un reto para realizar en familia.

**Día 6: María, ejemplo de fe**

Una reflexión sobre la Virgen María.

**Día 7: Villancicos para Jesús**

Una actividad musical con música católica navideña.

**Día 8: La estrella de Belén**

Un acertijo o juego de observación.

**Día 9: Un momento de gratitud**

Un pequeño propósito.

**Día 10: Preparamos el corazón**

Una reflexión sobre la reconciliación.

**Día 11: Los pastores**

Una actividad relacionada con el anuncio del nacimiento de Jesús.

**Día 12: Una familia que acompaña**

Un reto familiar.

**Día 13: La alegría de Gaudete**

Una reflexión especial sobre el tercer domingo de Adviento.

**Día 14: Compartir con generosidad**

Un reto solidario.

**Día 15: Los Reyes Magos**

Una actividad interactiva sobre su camino hacia Jesús.

**Día 16: Una oración por los demás**

Una intención de oración.

**Día 17: Descubre el pesebre**

Un juego de preguntas.

**Día 18: La importancia del perdón**

Una reflexión.

**Día 19: La música de Navidad**

Una actividad musical.

**Día 20: La luz que se acerca**

Una reflexión especial del cuarto domingo de Adviento.

**Día 21: Un corazón dispuesto**

Un pequeño propósito personal.

**Día 22: La esperanza**

Una actividad familiar.

**Día 23: Ya falta poco**

Una preparación espiritual para Nochebuena.

**Día 24: Nochebuena**

Una experiencia especial sobre el nacimiento de Jesús.

Estos son contenidos iniciales de referencia. Organizar los textos definitivos en archivos de datos para que puedan modificarse fácilmente.

IMPORTANTE:
- Los versículos bíblicos deben tener referencias correctas.
- No inventar citas bíblicas.
- Las reflexiones deben ser apropiadas para una comunidad católica.
- La música debe ser católica o de temática cristiana navideña.
- No descargar ni incorporar música protegida sin autorización.
- Para canciones, utilizar enlaces a fuentes legítimas o archivos propios autorizados.
- No incluir enlaces ficticios.

---

# 9. SISTEMA DE ACTIVIDADES INTERACTIVAS

Crear un módulo independiente para gestionar las actividades.

Tipos de actividades iniciales:

1. Reflexiones con preguntas.
2. Oraciones.
3. Retos personales.
4. Retos familiares.
5. Juegos de selección múltiple.
6. Trivia bíblica.
7. Acertijos.
8. Sopas de letras.
9. Actividades musicales.

Cada actividad debe tener una estructura flexible.

Ejemplo conceptual:

{
  id: "day-03",
  type: "challenge",
  title: "Un gesto de amor",
  description: "Realiza una buena acción por alguien.",
  requiresInteraction: true,
  completionEnabled: true
}

Las actividades deben poder completarse mediante interacciones dentro de la aplicación.

El usuario podrá marcar un reto como realizado.

El estado se guardará en localStorage.

No solicitar fotografías, videos ni evidencias personales.

No crear formularios de registro.

No exigir que el usuario comparta información personal.

Al completar una actividad, mostrar una respuesta visual agradable:

- Pequeña animación.
- Estrellas o destellos.
- Mensaje de felicitación.
- Indicador de actividad completada.

Ejemplo:

«¡Muy bien! Cada pequeño gesto de amor nos ayuda a preparar el corazón para Jesús».

---

# 10. NOTIFICACIONES DEL NAVEGADOR

Implementar una funcionalidad opcional de notificaciones mediante la Notification API.

Al ingresar por primera vez, mostrar una invitación discreta para activar recordatorios.

No solicitar permiso inmediatamente sin explicar su utilidad.

Si el usuario acepta:

- Solicitar permiso al navegador.
- Guardar su preferencia en localStorage.
- Mostrar una notificación de prueba o de bienvenida.
- Permitir desactivar las notificaciones.

Las notificaciones deben dirigir al calendario cuando el usuario las seleccione, siempre que la plataforma lo permita.

IMPORTANTE:

GitHub Pages no dispone de un servidor propio que envíe notificaciones programadas.

Por tanto:

- No afirmar que se enviarán notificaciones automáticas cuando el navegador esté cerrado.
- No implementar un falso sistema de notificaciones push.
- Se puede implementar un recordatorio mientras la página permanece abierta, siempre que se respete el permiso y las limitaciones del navegador.
- Si se incorpora un Service Worker para PWA, utilizarlo para caché y funcionamiento offline.
- Documentar claramente en README.md las limitaciones de las notificaciones sin backend.

El sistema de notificaciones no debe ser obligatorio para utilizar el calendario.

---

# 11. DISEÑO RESPONSIVE Y EXPERIENCIA DE USUARIO

La aplicación debe estar diseñada principalmente para celulares, sin descuidar tablets y computadoras.

## En celulares

- Diseño adaptable.
- Casillas fáciles de tocar.
- Textos legibles.
- Modales que ocupen adecuadamente la pantalla.
- Animaciones ligeras.
- Corona visible y bien integrada.
- Navegación sencilla.

## En computadoras

- Calendario amplio.
- Ilustración completa.
- Elementos decorativos distribuidos.
- Animaciones con mayor espacio visual.
- Casillas claramente identificables.

## Experiencia de usuario

Incluir:

- Pantalla de bienvenida.
- Calendario principal.
- Contenido de las casillas.
- Corona de Adviento.
- Indicadores de progreso.
- Configuración de audio.
- Configuración de notificaciones.
- Opción para consultar días anteriores.
- Opción para reiniciar el progreso con confirmación.

No recargar la interfaz con botones innecesarios.

Utilizar transiciones suaves y una jerarquía visual clara.

---

# 12. SONIDO Y MÚSICA

El sonido debe ser opcional.

Se pueden incluir:

- Sonidos suaves al abrir una casilla.
- Campanillas.
- Efectos de brillo.
- Sonidos sutiles para las animaciones de los domingos.
- Música instrumental navideña cristiana con licencia adecuada.

No reproducir audio automáticamente sin interacción del usuario.

Incluir controles para activar o desactivar el sonido.

Optimizar los archivos de audio.

---

# 13. ARQUITECTURA Y ORGANIZACIÓN DEL PROYECTO

La estructura debe ser modular, escalable y fácil de mantener.

No concentrar toda la lógica en un único archivo JavaScript.

Cada funcionalidad debe estar en su propio módulo.

Estructura recomendada:

calendario-navideño/
│
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── backgrounds/
│   │   │   ├── characters/
│   │   │   ├── nativity/
│   │   │   ├── advent/
│   │   │   └── decorations/
│   │   │
│   │   ├── illustrations/
│   │   │   ├── angels/
│   │   │   ├── holy-family/
│   │   │   ├── bethlehem/
│   │   │   └── advent-wreath/
│   │   │
│   │   ├── animations/
│   │   │   ├── angels/
│   │   │   ├── candles/
│   │   │   └── christmas-eve/
│   │   │
│   │   ├── audio/
│   │   └── fonts/
│   │
│   ├── favicon.svg
│   └── manifest.webmanifest
│
├── src/
│   │
│   ├── components/
│   │   ├── calendar/
│   │   │   ├── Calendar.js
│   │   │   ├── CalendarDay.js
│   │   │   └── CalendarProgress.js
│   │   │
│   │   ├── advent/
│   │   │   ├── AdventWreath.js
│   │   │   ├── AdventCandle.js
│   │   │   └── AdventAngel.js
│   │   │
│   │   ├── activities/
│   │   │   ├── ActivityModal.js
│   │   │   ├── Reflection.js
│   │   │   ├── Prayer.js
│   │   │   ├── Challenge.js
│   │   │   ├── Quiz.js
│   │   │   ├── Riddle.js
│   │   │   └── WordSearch.js
│   │   │
│   │   ├── interface/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── Modal.js
│   │   │   ├── Toast.js
│   │   │   └── WelcomeScreen.js
│   │   │
│   │   └── common/
│   │       ├── Button.js
│   │       ├── Icon.js
│   │       └── Loading.js
│   │
│   ├── modules/
│   │   ├── calendar/
│   │   │   ├── calendarController.js
│   │   │   ├── calendarRenderer.js
│   │   │   └── calendarEvents.js
│   │   │
│   │   ├── advent/
│   │   │   ├── adventController.js
│   │   │   ├── adventDates.js
│   │   │   └── adventState.js
│   │   │
│   │   ├── activities/
│   │   │   ├── activityController.js
│   │   │   ├── activityRegistry.js
│   │   │   └── activityValidator.js
│   │   │
│   │   ├── animations/
│   │   │   ├── animationController.js
│   │   │   ├── candleAnimations.js
│   │   │   ├── angelAnimations.js
│   │   │   ├── calendarAnimations.js
│   │   │   └── christmasEveAnimations.js
│   │   │
│   │   ├── progress/
│   │   │   ├── progressController.js
│   │   │   ├── progressTracker.js
│   │   │   └── progressStorage.js
│   │   │
│   │   ├── notifications/
│   │   │   ├── notificationController.js
│   │   │   └── notificationService.js
│   │   │
│   │   └── audio/
│   │       ├── audioController.js
│   │       └── audioService.js
│   │
│   ├── data/
│   │   ├── adventDays.js
│   │   ├── activities.js
│   │   ├── bibleVerses.js
│   │   ├── prayers.js
│   │   └── configuration.js
│   │
│   ├── services/
│   │   ├── storageService.js
│   │   ├── dateService.js
│   │   └── deviceService.js
│   │
│   ├── styles/
│   │   ├── main.css
│   │   ├── variables.css
│   │   ├── reset.css
│   │   ├── layout.css
│   │   ├── responsive.css
│   │   ├── animations.css
│   │   └── components/
│   │       ├── calendar.css
│   │       ├── advent.css
│   │       ├── activities.css
│   │       ├── modals.css
│   │       └── interface.css
│   │
│   ├── utils/
│   │   ├── dateUtils.js
│   │   ├── domUtils.js
│   │   ├── validationUtils.js
│   │   └── accessibilityUtils.js
│   │
│   ├── app.js
│   └── main.js
│
├── index.html
├── vite.config.js
├── package.json
├── .gitignore
├── README.md
└── LICENSE (solo si corresponde)

Puedes adaptar esta estructura si existe una razón técnica justificada, pero debes conservar la separación por responsabilidades.

## 13.1. Responsabilidades

Cada carpeta debe tener una función clara.

- `components/`: elementos visuales reutilizables.
- `modules/`: lógica funcional de cada sección.
- `data/`: contenido y configuración.
- `services/`: acceso a servicios del navegador y almacenamiento.
- `styles/`: estilos organizados.
- `utils/`: funciones auxiliares reutilizables.
- `public/`: recursos estáticos.

No duplicar funciones.

No repetir código que pueda convertirse en una utilidad reutilizable.

Evitar dependencias circulares.

Utilizar nombres claros y consistentes.

Los archivos deben tener responsabilidades concretas.

No crear archivos innecesarios que únicamente reexporten funciones sin aportar organización.

## 13.2. Mantenibilidad

El proyecto debe permitir:

- Agregar un nuevo tipo de actividad sin modificar todo el calendario.
- Cambiar una ilustración sin tocar la lógica.
- Modificar una fecha desde la configuración.
- Ajustar una animación sin modificar los componentes de contenido.
- Agregar efectos reutilizables.
- Cambiar textos desde los archivos de datos.
- Incorporar nuevas celebraciones en futuras versiones.

Comentar las partes complejas, especialmente las animaciones, la gestión de fechas y el almacenamiento.

No llenar el código de comentarios obvios.

---

# 14. README.md OBLIGATORIO

Generar un README.md completo, en español.

Debe contener:

1. Nombre del proyecto.
2. Descripción general.
3. Objetivo.
4. Características principales.
5. Tecnologías utilizadas.
6. Requisitos previos.
7. Instalación.
8. Ejecución en desarrollo.
9. Compilación para producción.
10. Estructura de carpetas.
11. Descripción de cada módulo.
12. Funcionamiento del desbloqueo por fechas.
13. Funcionamiento del almacenamiento local.
14. Funcionamiento de la corona de Adviento.
15. Configuración de las animaciones.
16. Cómo agregar o modificar actividades.
17. Cómo agregar nuevos versículos y reflexiones.
18. Configuración de las notificaciones.
19. Limitaciones técnicas.
20. Despliegue en GitHub Pages.
21. Cómo actualizar el proyecto.
22. Solución de problemas frecuentes.

Incluir los comandos reales para instalar y ejecutar el proyecto.

Explicar claramente que localStorage no sincroniza información entre dispositivos.

Explicar que borrar los datos del navegador puede reiniciar el progreso.

Explicar las limitaciones de las notificaciones sin backend.

No incluir instrucciones ficticias.

---

# 15. DESPLIEGUE EN GITHUB PAGES

Configurar Vite para que el proyecto pueda desplegarse desde un repositorio de GitHub.

El repositorio tendrá como nombre:

`calendario-navideño`

Configurar correctamente `base` en `vite.config.js` para que funcione en GitHub Pages.

Preparar el proyecto para utilizar GitHub Actions en el despliegue, si corresponde.

Documentar el proceso:

1. Crear el repositorio.
2. Subir el proyecto.
3. Instalar dependencias.
4. Configurar GitHub Pages.
5. Configurar el despliegue.
6. Verificar la URL pública.
7. Actualizar el proyecto posteriormente.

Evitar rutas absolutas que rompan los recursos al publicar el proyecto en una subruta.

Verificar que las imágenes, SVG, fuentes, audios y archivos JavaScript se carguen correctamente en producción.

---

# 16. CALIDAD Y VALIDACIONES

Antes de considerar terminado el proyecto:

- Verificar que no existan errores de JavaScript.
- Comprobar que todas las rutas funcionen.
- Verificar el funcionamiento de localStorage.
- Probar los cambios de fecha.
- Probar los días bloqueados.
- Probar las casillas disponibles.
- Probar la reapertura de casillas descubiertas.
- Probar los cuatro domingos de Adviento.
- Probar los estados de las cuatro velas.
- Probar la experiencia del 24 de diciembre.
- Verificar el diseño en celular y escritorio.
- Verificar que no haya desbordamientos.
- Comprobar que las animaciones puedan pausarse o respeten la preferencia de movimiento reducido.
- Verificar que el audio no se reproduzca automáticamente.
- Comprobar que las notificaciones no se soliciten sin contexto.
- Verificar el funcionamiento de la compilación de producción.

Para probar las fechas sin tener que esperar al día correspondiente, implementar un mecanismo de simulación de fecha exclusivo para desarrollo.

Este mecanismo debe estar deshabilitado en producción y no debe permitir que el usuario final manipule las fechas para desbloquear casillas.

---

# 17. INSTRUCCIONES DE EJECUCIÓN

Quiero que generes el proyecto completo.

Trabaja en el siguiente orden:

**FASE 1. Preparación**
- Crear la carpeta principal.
- Configurar Vite.
- Crear la estructura de carpetas.
- Configurar los estilos base.

**FASE 2. Diseño**
- Implementar la interfaz principal.
- Crear el calendario ilustrado.
- Integrar las casillas.
- Diseñar la corona de Adviento.
- Implementar la adaptación responsive.

**FASE 3. Funcionalidad**
- Implementar el desbloqueo por fechas.
- Implementar localStorage.
- Implementar el registro de casillas descubiertas.
- Implementar el registro de actividades completadas.
- Implementar la navegación y los modales.

**FASE 4. Animaciones**
- Implementar GSAP.
- Implementar el movimiento del angelito.
- Implementar el encendido progresivo de las velas.
- Implementar las animaciones de los cuatro domingos.
- Implementar la escena especial de Nochebuena.

**FASE 5. Contenido**
- Incorporar las actividades iniciales.
- Incorporar reflexiones.
- Incorporar versículos.
- Incorporar oraciones.
- Incorporar juegos y retos.

**FASE 6. Funcionalidades complementarias**
- Implementar audio opcional.
- Implementar notificaciones compatibles con las limitaciones establecidas.
- Implementar la experiencia PWA si resulta viable sin servicios externos.

**FASE 7. Documentación y validación**
- Generar README.md.
- Verificar todos los módulos.
- Ejecutar la compilación.
- Corregir errores.
- Verificar el despliegue.

---

# 18. CONSIDERACIONES IMPORTANTES PARA EL DESARROLLO

1. No entregar únicamente una maqueta visual.
2. No dejar funcionalidades principales simuladas.
3. No utilizar botones decorativos que no hagan nada.
4. No utilizar imágenes genéricas que contradigan la identidad católica del proyecto.
5. No incorporar Papá Noel, renos ni muñecos de nieve.
6. No colocar todo el código en un único archivo.
7. No utilizar una base de datos.
8. No implementar registros ni autenticación.
9. No solicitar evidencias personales.
10. No bloquear innecesariamente el acceso a días anteriores.
11. No permitir abrir días futuros.
12. No repetir las animaciones de los domingos sin necesidad.
13. No reproducir audio automáticamente.
14. No sacrificar la experiencia móvil por el diseño de escritorio.
15. No inventar funcionalidades de notificaciones que GitHub Pages no pueda proporcionar.

Si no dispones de ilustraciones originales, utiliza SVG propios, elementos vectoriales y CSS para construir una composición visual coherente. No reemplaces el diseño por emojis ni por una cuadrícula genérica.

Prioriza una experiencia visual de calidad, con animaciones fluidas, ilustraciones consistentes y una interfaz intuitiva.

El resultado debe ser un proyecto real, ejecutable, organizado y preparado para su publicación.

**ENTREGABLES OBLIGATORIOS:**
- Proyecto completo dentro de `calendario-navideño/`.
- Todos los archivos fuente.
- Recursos gráficos y animaciones utilizados.
- Configuración de Vite.
- Configuración de despliegue en GitHub Pages.
- README.md completo en español.
- Proyecto compilable y funcional.

Comienza creando la estructura y desarrollando el proyecto. No te detengas después de presentar un plan de trabajo.