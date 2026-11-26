import { chromium } from 'playwright-core';

const BASE = process.argv[2] ?? 'http://localhost:5177/';
const OUT = 'C:/Users/boyit/AppData/Local/Temp/opencode/calendario-shots/movil';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

import { mkdirSync } from 'node:fs';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await context.newPage();
page.on('pageerror', (e) => console.log('[pageerror]', e.message));

await page.goto(`${BASE}?fecha=2026-12-10`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}/01-inicio.png` });

const hero = await page.evaluate(() => {
  const head = document.querySelector('.hero__head');
  const wreath = document.querySelector('.hero__wreath');
  const h = head.getBoundingClientRect();
  const w = wreath.getBoundingClientRect();
  return {
    textoAbajo: Math.round(h.bottom),
    coronaArriba: Math.round(w.top),
    coronaAncho: Math.round(w.width),
    coronaDebajoDelTexto: w.top > h.bottom - 4,
    desborde: document.documentElement.scrollWidth > window.innerWidth,
  };
});
console.log('saludo móvil:', JSON.stringify(hero));

// El día 24 con el botón de marcar.
await page.goto(`${BASE}?fecha=2026-12-24`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2200);
// En el móvil se usan las puertas, no las casillas de la ilustración.
const marker = page.locator('.calendar-door[data-day="24"]');
await marker.click();
await page.waitForTimeout(3000);
console.log(
  'botones:',
  (await page.locator('.christmas-eve__actions button').allTextContents()).join(' | '),
);
await page.screenshot({ path: `${OUT}/02-nochebuena.png` });

await page.locator('[data-eve-complete]').click();
await page.waitForTimeout(1200);
console.log('tras marcar:', (await page.locator('[data-eve-complete]').textContent())?.trim());
const guardado = await page.evaluate(() => {
  const state = JSON.parse(localStorage.getItem('calendario-navideno-state'));
  return state.openedDays['24']?.completedAt ? 'sí' : 'no';
});
console.log('día 24 guardado como realizado:', guardado);
await page.screenshot({ path: `${OUT}/03-realizado.png` });

await browser.close();
