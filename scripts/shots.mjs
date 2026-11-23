import { chromium } from 'playwright-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUT = 'C:/Users/boyit/AppData/Local/Temp/opencode/calendario-shots';

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } });

await page.goto('http://localhost:5173/?fecha=2026-12-13', { waitUntil: 'networkidle' });
await page.waitForTimeout(4200);
const button = page.locator('.welcome__start');
if (await button.count()) await button.click();
await page.waitForTimeout(400);

const scene = page.locator('.calendar__scene');
const box = await scene.boundingBox();

await scene.screenshot({ path: `${OUT}/escena.png` });
await page.screenshot({ path: `${OUT}/completo.png`, fullPage: true });
await page.locator('.advent-section').screenshot({ path: `${OUT}/corona.png` });

// Recorte alrededor del ángel derecho (coordenadas del viewBox 1600x1200).
const scale = box.width / 1600;
await page.screenshot({
  path: `${OUT}/angel-derecho.png`,
  clip: {
    x: box.x + 1120 * scale,
    y: box.y + 40 * scale,
    width: 240 * scale,
    height: 260 * scale,
  },
});

await page.screenshot({
  path: `${OUT}/angel-izquierdo.png`,
  clip: {
    x: box.x + 260 * scale,
    y: box.y + 40 * scale,
    width: 240 * scale,
    height: 260 * scale,
  },
});

console.log('ok');
await browser.close();
