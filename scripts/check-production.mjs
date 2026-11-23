import { chromium } from 'playwright-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.argv[2] ?? 'http://localhost:4173/';

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();

const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${m.type()}] ${m.text()}`);
});
page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}`));
page.on('requestfailed', (r) => errors.push(`[404?] ${r.url()} ${r.failure()?.errorText}`));

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);

const info = await page.evaluate(() => ({
  markers: document.querySelectorAll('.calendar-day').length,
  mobileDoors: document.querySelectorAll('.calendar-door').length,
  candles: document.querySelectorAll('[data-candle]').length,
  scene: Boolean(document.querySelector('.bethlehem-scene')),
  title: document.title,
  serviceWorker: Boolean(navigator.serviceWorker?.controller),
  storage: Boolean(window.localStorage),
  base: document.baseURI,
}));

console.log(JSON.stringify(info, null, 2));

// Service worker (solo en producción).
await page.waitForTimeout(1500);
const sw = await page.evaluate(async () => {
  const regs = await navigator.serviceWorker?.getRegistrations?.();
  return regs ? regs.length : 0;
});
console.log('service workers registrados:', sw);

console.log('\n--- Consola ---');
console.log(errors.length ? errors.slice(0, 20).join('\n') : 'Sin errores ni avisos.');

await browser.close();
