/**
 * Comprobación visual y funcional con un navegador real.
 *
 * Uso:
 *   node scripts/smoke.mjs [url] [--shots]
 *
 * Abre la aplicación, recoge los errores de consola, prueba el desbloqueo por
 * fecha con la simulación de desarrollo y guarda capturas.
 */

import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const BASE = process.argv[2] ?? 'http://localhost:4173/';
const SHOTS = process.argv.includes('--shots');
const OUT = 'C:/Users/boyit/AppData/Local/Temp/opencode/calendario-shots';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

if (SHOTS) mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();

const errors = [];
page.on('console', (message) => {
  if (message.type() === 'error' || message.type() === 'warning') {
    errors.push(`[${message.type()}] ${message.text()}`);
  }
});
page.on('pageerror', (error) => errors.push(`[pageerror] ${error.message}`));

async function dismissWelcome(targetPage) {
  const button = targetPage.locator('.welcome__start');
  if (await button.count()) {
    await button.click();
    await targetPage.waitForTimeout(400);
  }
}

async function visit(label, url, wait = 1400) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(wait);
  if (SHOTS) {
    await page.screenshot({ path: `${OUT}/${label}.png`, fullPage: false });
  }
  console.log(`✓ ${label}`);
}

// 1. Primera visita (pantalla de bienvenida).
await visit('01-bienvenida', BASE);

// 2. Día simulado: 13 de diciembre (Gaudete).
await visit('02-gaudete', `${BASE}?fecha=2026-12-13`, 4200);

// 3. Antes del Adviento.
await visit('03-antes', `${BASE}?fecha=2026-11-20`);

// 4. Nochebuena.
await visit('04-nochebuena', `${BASE}?fecha=2026-12-24`, 2600);

// 5. Móvil.
const mobile = await context.newPage();
mobile.on('pageerror', (error) => errors.push(`[mobile pageerror] ${error.message}`));
mobile.on('console', (message) => {
  if (message.type() === 'error') errors.push(`[mobile error] ${message.text()}`);
});
await mobile.setViewportSize({ width: 390, height: 844 });
await mobile.goto(`${BASE}?fecha=2026-12-13`, { waitUntil: 'networkidle' });
await mobile.waitForTimeout(3200);
if (SHOTS) await mobile.screenshot({ path: `${OUT}/05-movil.png`, fullPage: false });
console.log('✓ 05-movil');

// 6. Interacción: abrir una casilla y completar una actividad.
await page.goto(`${BASE}?fecha=2026-12-13`, { waitUntil: 'networkidle' });
await page.waitForTimeout(4200);
await dismissWelcome(page);
const marker = page.locator('.calendar-day[data-day="5"]');
await marker.click();
await page.waitForTimeout(1200);
if (SHOTS) await page.screenshot({ path: `${OUT}/06-modal.png` });
const modalVisible = await page.locator('.modal').isVisible();
console.log(`  modal abierto: ${modalVisible}`);

// 7. Abrir la Nochebuena desde la interfaz.
await page.goto(`${BASE}?fecha=2026-12-24`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2600);
await dismissWelcome(page);
const eveMarker = page.locator('.calendar-day[data-day="24"]');
await eveMarker.click();
await page.waitForTimeout(7000);
if (SHOTS) await page.screenshot({ path: `${OUT}/07-eve.png` });
const eveVisible = await page.locator('.christmas-eve').isVisible();
console.log(`  escena de nochebuena: ${eveVisible}`);

// 8. Cerrar la escena con el botón (comprueba que el overlay es interactivo).
await page.locator('[data-eve-close]').click();
await page.waitForTimeout(500);
console.log(`  escena cerrada: ${!(await page.locator('.christmas-eve').count())}`);

// 9. Completar una actividad desde el modal.
await page.goto(`${BASE}?fecha=2026-12-13`, { waitUntil: 'networkidle' });
await page.waitForTimeout(4200);
await dismissWelcome(page);
await page.locator('.calendar-day[data-day="8"]').click();
await page.waitForTimeout(800);
const answer = page.locator('.riddle__input');
await answer.fill('estrella');
await page.locator('.riddle__form button[type="submit"]').click();
await page.waitForTimeout(400);
const completeButton = page.locator('.button--complete');
await completeButton.click();
await page.waitForTimeout(900);
console.log(`  actividad completada: ${await completeButton.isDisabled()}`);
if (SHOTS) await page.screenshot({ path: `${OUT}/08-completada.png` });

// 10. El progreso se guarda en localStorage.
const stored = await page.evaluate(() => window.localStorage.getItem('calendario-navideno-state'));
console.log(`  progreso guardado: ${stored ? 'sí' : 'no'}`);

// 11. Reiniciar el progreso desde los ajustes.
await page.locator('.modal__close').click();
await page.waitForTimeout(400);
await page.locator('[data-action="settings"]').click();
await page.waitForTimeout(500);
await page.locator('.button--danger').click();
await page.waitForTimeout(200);
await page.locator('.button--danger').click();
await page.waitForTimeout(600);
const afterReset = await page.evaluate(() => window.localStorage.getItem('calendario-navideno-state'));
console.log(`  reinicio: ${afterReset?.includes('"openedDays":{}') ? 'correcto' : 'revisar'}`);

console.log('\n--- Consola ---');
if (errors.length === 0) {
  console.log('Sin errores ni avisos.');
} else {
  errors.slice(0, 40).forEach((error) => console.log(error));
}

await browser.close();
