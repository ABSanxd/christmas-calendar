import { chromium } from 'playwright-core';

const BASE = process.argv[2] ?? 'http://localhost:5177/';
const OUT = 'C:/Users/boyit/AppData/Local/Temp/opencode/calendario-shots/days';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
page.on('pageerror', (e) => console.log('[pageerror]', e.message));

const openDay = async (fecha, day) => {
  await page.goto(`${BASE}?fecha=${fecha}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200);
  if (await page.locator('.advent-ceremony [data-target="true"]').count()) {
    await page.locator('.advent-ceremony [data-target="true"]').click({ force: true });
    await page.locator('[data-ceremony-continue]').waitFor({ state: 'visible', timeout: 15000 });
    await page.locator('[data-ceremony-continue]').click();
    await page.waitForTimeout(1200);
    await page.locator('.sunday-reflection__footer .button').click();
    await page.waitForTimeout(400);
  }
  await page.locator(`.calendar-day[data-day="${day}"]`).click();
  await page.waitForTimeout(600);
};

// --- DÍA 17: trivia con "volver a intentar" ---
console.log('=== día 17 ===');
await openDay('2026-12-17', 17);
const radios17 = page.locator('.quiz__option input');
for (let i = 0; i < 4; i += 1) {
  await radios17.nth(1).click();
  await page.waitForTimeout(200);
  const next = page.locator('.trivia__stage button:visible');
  if (await next.count()) { await next.click(); await page.waitForTimeout(300); }
}
await page.waitForTimeout(400);
console.log('  resultado:', (await page.locator('.trivia__score').textContent())?.trim());
console.log('  botón "Volver a intentar":', await page.locator('.trivia__retry').count());
await page.screenshot({ path: `${OUT}/dia-17-resultado.png` });
await page.locator('.trivia__retry').click();
await page.waitForTimeout(500);
console.log('  tras volver a intentar, pregunta:', (await page.locator('.activity__question-title').textContent())?.trim());
await page.locator('.modal__close').click();
await page.waitForTimeout(300);

// --- DÍA 18 ---
console.log('\n=== día 18 ===');
await openDay('2026-12-18', 18);
console.log('  versículo:', (await page.locator('.verse-block blockquote').textContent())?.trim());
console.log('  párrafo:', (await page.locator('.activity__paragraph').nth(1).textContent())?.trim());
const opts18 = await page.locator('.option-list__text').allTextContents();
opts18.forEach((o) => console.log(`  opción: ${o}`));
await page.locator('.modal__close').click();
await page.waitForTimeout(300);

// --- DÍA 19: villancico en video ---
console.log('\n=== día 19 ===');
await openDay('2026-12-19', 19);
console.log('  título:', (await page.locator('.music__title').textContent())?.trim());
console.log('  acróstico:', await page.locator('.acrostic').count(), '(debe ser 0)');
console.log('  reproductor:', await page.locator('.music__video-play').count());
await page.locator('.music__video-play').click();
await page.waitForTimeout(6000);
console.log('  iframe:', await page.locator('.music__video-frame').count());
console.log('  aviso:', (await page.locator('.music__video .activity__feedback').textContent())?.trim());
await page.screenshot({ path: `${OUT}/dia-19-video.png` });
await page.locator('.modal__close').click();
await page.waitForTimeout(300);

// --- DÍA 20 ---
console.log('\n=== día 20 ===');
await openDay('2026-12-20', 20);
console.log('  versículo:', (await page.locator('.verse-block blockquote').textContent())?.trim());
console.log('  párrafo:', (await page.locator('.activity__paragraph').first().textContent())?.trim());
const opts20 = await page.locator('.option-list__text').allTextContents();
opts20.forEach((o) => console.log(`  opción: ${o}`));
await page.locator('.modal__close').click();
await page.waitForTimeout(300);

// --- DÍA 21 ---
console.log('\n=== día 21 ===');
await openDay('2026-12-21', 21);
console.log('  versículo:', (await page.locator('.verse-block blockquote').textContent())?.trim());
await page.locator('.modal__close').click();
await page.waitForTimeout(300);

// --- DÍA 22 ---
console.log('\n=== día 22 ===');
await openDay('2026-12-22', 22);
const steps22 = await page.locator('.activity__step-label').allTextContents();
console.log(`  retos: ${steps22.length}`);
steps22.forEach((s) => console.log(`  reto: ${s}`));
await page.locator('.modal__close').click();
await page.waitForTimeout(300);

// --- DÍA 24: Nochebuena ---
console.log('\n=== día 24 ===');
await page.goto(`${BASE}?fecha=2026-12-24`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2200);
await page.locator('.calendar-day[data-day="24"]').click();
await page.waitForTimeout(2000);
console.log('  botón "Volver a contemplar":', await page.locator('[data-eve-replay]').count(), '(debe ser 0)');
console.log('  espacio para la foto:', await page.locator('.christmas-eve__photo').count());
console.log('  ilustración de escena:', await page.locator('.christmas-eve__scene').count());
console.log('  botones:', (await page.locator('.christmas-eve__actions button').allTextContents()).join(' | '));
await page.screenshot({ path: `${OUT}/dia-24-nochebuena.png` });

await browser.close();
