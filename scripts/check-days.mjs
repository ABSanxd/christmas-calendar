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
await page.waitForTimeout(3200);

const m = await page.evaluate(() => {
  const content = document.querySelector('.christmas-eve__content');
  const challenge = document.querySelector('.christmas-eve__challenge');
  const panel = document.querySelector('.christmas-eve__panel');
  return {
    contenido: { scroll: content.scrollHeight, client: content.clientHeight, cabe: content.scrollHeight <= content.clientHeight + 1 },
    retoVisible: challenge.getBoundingClientRect().bottom <= content.getBoundingClientRect().bottom + 1,
    altoPanel: Math.round(panel.getBoundingClientRect().height),
    ventana: window.innerHeight,
  };
});
console.log(JSON.stringify(m, null, 2));
await page.screenshot({ path: `${OUT}/nochebuena-reto.png` });

await browser.close();
