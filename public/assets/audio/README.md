# Audio

En esta carpeta **no hay archivos de audio**.

Todos los efectos sonoros del calendario (campanillas, destellos, encendido de
velas y la melodía de *Noche de paz*) se **sintetizan en el navegador** con la
[Web Audio API](https://developer.mozilla.org/docs/Web/API/Web_Audio_API).

Motivos de la decisión:

- No hay archivos pesados que descargar: el proyecto funciona sin conexión.
- No hay problemas de licencias ni derechos de autor.
- El volumen y el timbre se pueden ajustar con precisión.
- Nada se reproduce automáticamente: siempre hace falta una interacción del
  usuario, tal como exige el diseño del proyecto.

El código que genera los sonidos vive en:

- `src/modules/audio/audioService.js` — síntesis de los efectos y las melodías.
- `src/modules/audio/audioController.js` —Bridge con las preferencias y el
  catálogo de efectos con nombre.

Si en el futuro se quisieran añadir grabaciones reales, este es el lugar
natural para alojar los archivos, siempre con licencia comprobada.
