import { chromium } from 'playwright-core';

const BASE = process.argv[2] ?? 'http://localhost:5177/';
const OUT = 'C:/Users/boyit/AppData/Local/Temp/opencode/calendario-shots/days';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
page.on('pageerror', (e) => console.log('[pageerror]', e.message));

await page.goto(`${BASE}?fecha=2026-12-24`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2200);
await page.locator('.calendar-day[data-day="24"]').click();
await page.waitForTimeout(3500);

const state = await page.evaluate(() => {
  const panel = document.querySelector('.christmas-eve__panel');
  const content = document.querySelector('.christmas-eve__content');
  const photo = document.querySelector('.christmas-eve__photo');
  const overlay = document.querySelector('.christmas-eve');
  const cs = getComputedStyle(content);
  return {
    fotoVisible: photo ? !photo.hidden : false,
    fotoCargada: photo ? photo.complete && photo.naturalWidth > 0 : false,
    altoPanel: panel ? Math.round(panel.getBoundingClientRect().height) : 0,
    altoPanelMax: panel ? Math.round(panel.getBoundingClientRect().height) <= Math.round(window.innerHeight * 0.9) : null,
    scrollInterno: cs.overflowY,
    scrollable: content ? content.scrollHeight > content.clientHeight : false,
    scrollExterno: overlay ? getComputedStyle(overlay).overflowY : '',
    overlayScroll: overlay ? overlay.scrollHeight > overlay.clientHeight : false,
    altoVentana: window.innerHeight,
  };
});
console.log(JSON.stringify(state, null, 2));
await page.screenshot({ path: `${OUT}/dia-24-imagen.png` });

// Con el contenido largo, el scroll debe ser dentro del panel.
await page.evaluate(() => {
  const content = document.querySelector('.christmas-eve__content');
  const filler = document.createElement('div');
  filler.style.height = '900px';
  filler.dataset.filler = 'true';
  content.appendChild(filler);
});
await page.waitForTimeout(300);
const scroll = await page.evaluate(() => {
  const content = document.querySelector('.christmas-eve__content');
  const overlay = document.querySelector('.christmas-eve');
  const panel = document.querySelector('.christmas-eve__panel');
  return {
    contenidoScrollable: content.scrollHeight > content.clientHeight,
    contentScrollHeight: content.scrollHeight,
    contentClientHeight: content.clientHeight,
    overlayScrollable: overlay.scrollHeight > overlay.clientHeight,
    overlayScrollHeight: overlay.scrollHeight,
    overlayClientHeight: overlay.clientHeight,
    panelHeight: Math.round(panel.getBoundingClientRect().height),
    ventana: window.innerHeight,
  };
});
console.log('con contenido largo:', JSON.stringify(scroll, null, 2));

// El scroll interno no debe mover el overlay: el modal se queda quieto.
const antes = await page.evaluate(() => window.scrollY);
await page.mouse.move(700, 500);
await page.mouse.wheel(0, 400);
await page.waitForTimeout(400);
const despues = await page.evaluate(() => ({
  scrollY: window.scrollY,
  overlayScrollTop: document.querySelector('.christmas-eve').scrollTop,
  contentScrollTop: document.querySelector('.christmas-eve__content').scrollTop,
}));
console.log('tras rueda:', JSON.stringify({ antes, ...despues }));

await browser.close();
