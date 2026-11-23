import { chromium } from 'playwright-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.argv[2] ?? 'http://localhost:5173/';

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.goto(`${BASE}?fecha=2026-12-13`, { waitUntil: 'networkidle' });
await page.waitForTimeout(4200);
const button = page.locator('.welcome__start');
if (await button.count()) await button.click();
await page.waitForTimeout(600);

await page.locator('.calendar__scene').screenshot({
  path: 'public/assets/images/og-calendario.jpg',
  type: 'jpeg',
  quality: 82,
});

console.log('og-calendario.jpg generado');
await browser.close();
