import { chromium } from 'playwright-core';

const BASE = process.argv[2] ?? 'http://localhost:5177/';
const OUT = 'C:/Users/boyit/AppData/Local/Temp/opencode/calendario-shots/days';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

import { mkdirSync } from 'node:fs';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
page.on('pageerror', (e) => console.log('[pageerror]', e.message));

const openDay = async (day) => {
  await page.goto(`${BASE}?fecha=2026-12-0${day}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.locator(`.calendar-day[data-day="${day}"]`).click();
  await page.waitForTimeout(700);
};

// --- DÍA 1: seleccionar y deseleccionar ---
await openDay(1);
const options = page.locator('.option-list__input');
console.log('día 1 · opciones:', await options.count());
await options.nth(1).click();
await page.waitForTimeout(250);
console.log('  tras marcar:', await page.evaluate(() => document.querySelectorAll('.option-list__input:checked').length));
await options.nth(1).click();
await page.waitForTimeout(250);
console.log('  tras volver a marcar (deselecciona):', await page.evaluate(() => document.querySelectorAll('.option-list__input:checked').length));
console.log('  texto del versículo:', (await page.locator('.verse-block blockquote').textContent())?.trim());
await page.screenshot({ path: `${OUT}/dia-1.png` });
await page.locator('.modal__close').click();
await page.waitForTimeout(300);

// --- DÍA 2: versículo, indicación y oración ---
await openDay(2);
console.log('día 2 · versículo:', (await page.locator('.verse-block blockquote').textContent())?.trim());
console.log('  indicación:', (await page.locator('.activity__intro').textContent())?.trim());
console.log('  oración:', (await page.locator('.prayer__text').textContent())?.trim());
await page.screenshot({ path: `${OUT}/dia-2.png` });
await page.locator('.modal__close').click();
await page.waitForTimeout(300);

// --- DÍA 3: marcar un reto, completar y actualizar después ---
await openDay(3);
console.log('día 3 · versículo:', (await page.locator('.verse-block blockquote').textContent())?.trim());
const steps = page.locator('.activity__step input');
console.log('  retos:', await steps.count());
await steps.nth(0).click();
await page.locator('.button--complete').click();
await page.waitForTimeout(600);
console.log('  botón tras completar:', (await page.locator('.button--complete').textContent())?.trim());
await page.locator('.modal__close').click();
await page.waitForTimeout(400);

// Se vuelve a abrir el día 3 para marcar otro reto y actualizar.
await openDay(3);
const steps2 = page.locator('.activity__step input');
console.log('  al reabrir, retos marcados:', await page.evaluate(() => document.querySelectorAll('.activity__step input:checked').length));
await steps2.nth(1).click();
await page.locator('.button--complete').click();
await page.waitForTimeout(600);
const stored = await page.evaluate(() => {
  const state = JSON.parse(localStorage.getItem('calendario-navideno-state'));
  return state.openedDays['3']?.interactions?.checkedSteps;
});
console.log('  retos guardados:', JSON.stringify(stored));
await page.locator('.modal__close').click();
await page.waitForTimeout(300);

// --- DÍA 4: sin versículo, con la invitación a buscarlo ---
await openDay(4);
console.log('día 4 · versículo visible:', await page.locator('.verse-block').count());
console.log('  instrucción:', (await page.locator('.activity__instruction').textContent())?.trim());
console.log('  pista:', (await page.locator('.activity__hint').textContent())?.trim());
await page.screenshot({ path: `${OUT}/dia-4.png` });
await page.locator('.modal__close').click();
await page.waitForTimeout(300);

// --- DÍA 5: versículo, introducción y retos ---
await openDay(5);
console.log('día 5 · versículo:', (await page.locator('.verse-block blockquote').textContent())?.trim());
console.log('  introducción:', (await page.locator('.activity__intro').textContent())?.trim());
const steps5 = await page.locator('.activity__step-label').allTextContents();
steps5.forEach((s, i) => console.log(`  reto ${i + 1}: ${s}`));
await page.screenshot({ path: `${OUT}/dia-5.png` });

await browser.close();
