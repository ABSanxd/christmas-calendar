/**
 * Captura recortada de la zona de los pastores para revisarlos.
 *
 * El recorte se hace cambiando el `viewBox` del propio SVG, así la zona
 * pedida es exactamente la que sale en la imagen, sin trigonometría de
 * coordenadas ni problemas de desplazamiento.
 *
 * Uso: `node scripts/shot-shepherds.mjs`
 */

import { chromium } from 'playwright-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUT = 'C:/Users/boyit/AppData/Local/Temp/opencode/calendario-shots';

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } });

await page.goto('http://localhost:5173/?fecha=2026-12-13', { waitUntil: 'networkidle' });
await page.waitForTimeout(4200);

const svg = page.locator('#bethlehem-scene');

/**
 * Captura el rectángulo indicado del viewBox.
 * @param {string} name
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
async function shotRegion(name, x, y, width, height) {
  await page.evaluate(
    ([vx, vy, vw, vh]) => {
      const node = document.querySelector('#bethlehem-scene');
      if (!node.dataset.viewbox) node.dataset.viewbox = node.getAttribute('viewBox');
      node.setAttribute('viewBox', `${vx} ${vy} ${vw} ${vh}`);
      // Las casillas son una capa HTML sobre el SVG: se ocultan al ampliar.
      document.querySelector('.calendar__markers').style.visibility = 'hidden';
    },
    [x, y, width, height],
  );
  await svg.screenshot({ path: `${OUT}/${name}.png` });
  await page.evaluate(() => {
    const node = document.querySelector('#bethlehem-scene');
    node.setAttribute('viewBox', node.dataset.viewbox);
    document.querySelector('.calendar__markers').style.visibility = '';
  });
}

// La escena completa, para juzgar la composición.
await svg.screenshot({ path: `${OUT}/escena.png` });

// Pastores y rebaño.
await shotRegion('pastores', 1030, 540, 500, 400);

// El primer pastor, ampliado.
await shotRegion('pastor-1', 1100, 620, 95, 200);

// El segundo pastor, ampliado.
await shotRegion('pastor-2', 1180, 675, 90, 190);

// La Natividad, para comparar con José y María.
await shotRegion('natividad', 600, 400, 400, 330);

console.log('ok');
await browser.close();
