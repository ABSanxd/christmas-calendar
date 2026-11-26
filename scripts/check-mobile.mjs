import { chromium } from 'playwright-core';

const BASE = process.argv[2] ?? 'http://localhost:5177/';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
const page = await context.newPage();

await page.goto(`${BASE}?fecha=2026-12-10`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2200);

const estado = await page.evaluate(() => {
  const markers = document.querySelector('.calendar__markers');
  const scene = document.querySelector('.calendar__scene');
  const doors = document.querySelector('.calendar__mobile');
  return {
    celdasVisibles: markers ? getComputedStyle(markers).display !== 'none' : false,
    puertasVisibles: doors ? getComputedStyle(doors).display !== 'none' : false,
    escenaVisible: scene ? getComputedStyle(scene).display !== 'none' : false,
    altoEscena: scene ? Math.round(scene.getBoundingClientRect().height) : 0,
  };
});
console.log('móvil:', JSON.stringify(estado));

// ¿Se puede deslizar la página empezando el gesto sobre la escena?
const antes = await page.evaluate(() => window.scrollY);
await page.mouse.move(195, 620);
await page.mouse.wheel(0, 500);
await page.waitForTimeout(500);
const despues = await page.evaluate(() => window.scrollY);
console.log(`deslizando sobre la escena: ${antes} -> ${despues}`);

await browser.close();
