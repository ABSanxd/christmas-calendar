import { defineConfig } from 'vite';

/**
 * Configuración de Vite para el Calendario Navideño 2026.
 *
 * `base: './'` genera rutas relativas, de modo que el proyecto funciona tanto
 * en la raíz de un dominio como dentro de una subruta de GitHub Pages
 * (`https://<usuario>.github.io/calendario-navideño/`) sin necesidad de
 * cambiar la configuración en cada despliegue.
 */
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'es2019',
    sourcemap: false,
  },
  server: {
    port: 5173,
    open: false,
  },
  preview: {
    port: 4173,
  },
});
