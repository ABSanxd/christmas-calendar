import { chromium } from 'playwright-core';

const BASE = process.argv[2] ?? 'http://localhost:5177/';
const OUT = 'C:/Users/boyit/AppData/Local/Temp/opencode/calendario-shots/days';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
page.on('pageerror', (e) => console.log('[pageerror]', e.message));

await page.goto(`${BASE}?fecha=2026-12-24`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2200);
await page.locator('.calendar-day[data-day="24"]').click();
await page.waitForTimeout(3500);

const state = await page.evaluate(() => {
  const frame = document.querySelector('.christmas-eve__photo-frame');
  const photo = document.querySelector('.christmas-eve__photo');
  const panel = document.querySelector('.christmas-eve__panel');
  return {
    ilustracionSvg: document.querySelectorAll('.christmas-eve__svg').length,
    hueco: frame ? Math.round(frame.getBoundingClientRect().width) : 0,
    altoHueco: frame ? Math.round(frame.getBoundingClientRect().height) : 0,
    altoModal: panel ? Math.round(panel.getBoundingClientRect().height) : 0,
    fotoVisible: photo ? !photo.hidden : false,
    aviso: document.querySelector('.christmas-eve__photo-hint')?.textContent?.trim(),
    botones: Array.from(document.querySelectorAll('.christmas-eve__actions button')).map((b) => b.textContent.trim()),
  };
});
console.log(JSON.stringify(state, null, 2));
await page.screenshot({ path: `${OUT}/dia-24-hueco.png` });

await browser.close();
