/**
 * Comprueba que todas las referencias a `CONFIG.*` existan en la
 * configuración. Evita que un color o una fecha mal escritos se traduzcan en
 * un `undefined` silencioso dentro del SVG.
 *
 * Uso: `node scripts/check-config.mjs`
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONFIG } from '../src/data/configuration.js';
import { SCENE_COLORS } from '../src/components/calendar/scene/shapes.js';

const here = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(here, '../src');

/** Objetos de configuración a verificar en el código. */
const SOURCES = [
  { name: 'CONFIG', object: CONFIG },
  { name: 'SCENE_COLORS', object: SCENE_COLORS },
];

/**
 * Lista todos los archivos JS de una carpeta.
 * @param {string} directory
 * @returns {string[]}
 */
function listJsFiles(directory) {
  const files = [];
  for (const entry of readdirSync(directory)) {
    const full = join(directory, entry);
    if (statSync(full).isDirectory()) files.push(...listJsFiles(full));
    else if (full.endsWith('.js')) files.push(full);
  }
  return files;
}

const problems = [];

for (const file of listJsFiles(srcDir)) {
  const content = readFileSync(file, 'utf8');

  for (const { name, object } of SOURCES) {
    const pattern = new RegExp(`${name}\\.([A-Za-z0-9_]+)(?:\\.([A-Za-z0-9_]+))?`, 'g');
    let match = pattern.exec(content);

    while (match) {
      const [, group, key] = match;
      const value = object[group];

      if (value === undefined) {
        problems.push(`${file}: ${name}.${group} no existe`);
      } else if (key && typeof value === 'object' && !(key in value)) {
        problems.push(`${file}: ${name}.${group}.${key} no existe`);
      }

      match = pattern.exec(content);
    }
  }
}

if (problems.length > 0) {
  console.error('Configuración inválida:');
  problems.forEach((problem) => console.error(`  · ${problem}`));
  process.exit(1);
}

console.log(
  `Configuración correcta (${SOURCES.map((source) => Object.keys(source.object).length).join(' + ')} claves).`,
);
