/**
 * Sincroniza el calendario con la vista de prueba.
 *
 * Copia el código del proyecto principal en la carpeta de la vista de prueba
 * y lo sube a GitHub, de modo que `christmas-calendar-preview` siempre tenga
 * el mismo contenido que el calendario real (pero compilado con
 * `npm run build:demo`).
 *
 * Uso:
 *   node scripts/sync-preview.mjs <carpeta-de-la-vista-de-prueba>
 *
 * Ejemplo:
 *   node scripts/sync-preview.mjs ../christmas-calendar-preview
 */

import { cpSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ORIGEN = resolve(HERE, '..');

/** Archivos y carpetas que se copian a la vista de prueba. */
const A_COPIAR = [
  'index.html',
  'package.json',
  'package-lock.json',
  'vite.config.js',
  '.gitignore',
  '.env.demo',
  'LICENSE',
  'src',
  'public',
];

/**
 * Ejecuta un comando de git en la carpeta indicada.
 * @param {string} cwd
 * @param {string[]} args
 */
function git(cwd, args) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();
}

const destino = resolve(process.argv[2] ?? '../christmas-calendar-preview');

if (!existsSync(destino)) {
  console.error(`No existe la carpeta: ${destino}`);
  process.exit(1);
}

// --- Copia el código ---
for (const archivo of A_COPIAR) {
  const origen = join(ORIGEN, archivo);
  const destinoArchivo = join(destino, archivo);
  if (!existsSync(origen)) continue;

  rmSync(destinoArchivo, { recursive: true, force: true });
  cpSync(origen, destinoArchivo, { recursive: true });
}

// `scripts/` es opcional en la vista de prueba: solo hacen falta los que usa
// `npm run check` (que corre antes de compilar).
const scriptsDestino = join(destino, 'scripts');
rmSync(scriptsDestino, { recursive: true, force: true });
cpSync(join(ORIGEN, 'scripts'), scriptsDestino, { recursive: true });

// Borra los scripts temporales que se hayan quedado por el camino.
for (const archivo of readdirSync(scriptsDestino)) {
  if (archivo.startsWith('_tmp-')) rmSync(join(scriptsDestino, archivo), { force: true });
}

// --- Sube los cambios ---
git(destino, ['add', '-A']);

const hayCambios = git(destino, ['status', '--porcelain']);
if (!hayCambios) {
  console.log('La vista de prueba ya estaba al día.');
  process.exit(0);
}

git(destino, ['commit', '-m', 'chore: sincroniza con el calendario principal']);
git(destino, ['push', 'origin', 'main']);

console.log('Vista de prueba actualizada.');
