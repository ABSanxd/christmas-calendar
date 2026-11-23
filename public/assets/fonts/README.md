# Fuentes

En esta carpeta **no hay archivos de tipografía**.

El proyecto usa únicamente las tipografías que ya están instaladas en el
sistema, para que no haya descargas externas ni problemas de licencia:

```css
--font-display: 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia,
  'Times New Roman', serif;
--font-body: 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif;
```

De este modo el calendario funciona completamente sin conexión y respeta la
configuración tipográfica del dispositivo de cada visitante.

Si en el futuro se quisiera incorporar una tipografía propia (por ejemplo un
alfabeto manuscrito para las citas), este es el lugar para alojar los archivos
`.woff2`, declarándolos en `src/styles/variables.css` con `@font-face`.
