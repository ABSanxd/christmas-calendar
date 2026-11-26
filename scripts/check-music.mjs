import { chromium } from 'playwright-core';

const BASE = process.argv[2] ?? 'http://localhost:5177/';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
page.on('pageerror', (e) => console.log('[pageerror]', e.message));

const estado = () =>
  page.evaluate(() => {
    const player = window.__backgroundMusic;
    if (!player) return { listo: false };
    const lista = player.getPlaylist?.() ?? [];
    return {
      listo: true,
      reproduciendo: player.getPlayerState() === 1,
      pausado: player.getPlayerState() === 2,
      volumen: player.getVolume(),
      video: player.getVideoData?.()?.title ?? '?',
      lista: lista.map((item) => item.title),
      tiempo: Math.round(player.getCurrentTime()),
    };
  });

await page.goto(`${BASE}?fecha=2026-12-10`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
console.log('1) antes de interactuar:', JSON.stringify(await estado()));

await page.mouse.click(700, 700);
await page.waitForTimeout(5000);
console.log('2) tras la primera interacción:', JSON.stringify(await estado()));

// El día 7 es musical: el fondo debe pausarse.
await page.goto(`${BASE}?fecha=2026-12-07`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.mouse.click(700, 700);
await page.waitForTimeout(4000);
console.log('3) en el calendario:', JSON.stringify(await estado()));

await page.locator('.calendar-day[data-day="7"]').click();
await page.waitForTimeout(1500);
console.log('4) con el día 7 abierto:', JSON.stringify(await estado()));

await page.locator('.modal__close').click();
await page.waitForTimeout(2000);
console.log('5) tras cerrar el día 7:', JSON.stringify(await estado()));

// El sonido de la cabecera también controla el fondo.
await page.locator('[data-action="sound"]').click();
await page.waitForTimeout(1200);
console.log('6) con el sonido apagado:', JSON.stringify(await estado()));

await page.locator('[data-action="sound"]').click();
await page.waitForTimeout(1500);
console.log('7) con el sonido encendido:', JSON.stringify(await estado()));

await browser.close();
