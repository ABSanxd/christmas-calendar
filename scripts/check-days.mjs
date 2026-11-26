import { chromium } from 'playwright-core';

const BASE = process.argv[2] ?? 'http://localhost:5177/';
const OUT = 'C:/Users/boyit/AppData/Local/Temp/opencode/calendario-shots/days';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
page.on('pageerror', (e) => console.log('[pageerror]', e.message));

// --- 1. ¿Se puede desmarcar en todas las actividades? ---
console.log('=== marcar y desmarcar ===');
await page.goto(`${BASE}?fecha=2026-12-24`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2200);

for (let day = 1; day <= 23; day += 1) {
  await page.goto(`${BASE}?fecha=2026-12-24`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.locator(`.calendar-day[data-day="${day}"]`).click();
  await page.waitForTimeout(500);

  const result = await page.evaluate(async () => {
    const radio = document.querySelector('.option-list:not(.option-list--multiple) .option-list__input');
    const checkbox = document.querySelector('.activity__step input');
    const multi = document.querySelector('.option-list--multiple .option-list__input');
    const control = radio ?? checkbox ?? multi;
    if (!control) return { tipo: 'sin control', ok: null };

    const esRadio = control.type === 'radio';
    control.click();
    await new Promise((r) => setTimeout(r, 120));
    const marcados = document.querySelectorAll(
      '.option-list__input:checked, .activity__step input:checked',
    ).length;
    control.click();
    await new Promise((r) => setTimeout(r, 120));
    const tras = document.querySelectorAll(
      '.option-list__input:checked, .activity__step input:checked',
    ).length;

    return {
      tipo: esRadio ? 'opción única' : 'casilla',
      marcados,
      tras,
      ok: marcados === 1 && tras === 0,
    };
  });

  console.log(
    `  día ${String(day).padStart(2)}: ${result.tipo.padEnd(12)} ` +
      (result.ok === null ? '(sin control que marcar)' : result.ok ? '✓ se desmarca' : '✗ NO se desmarca'),
  );

  await page.locator('.modal__close').click();
  await page.waitForTimeout(200);
}

// --- 2. El reproductor de YouTube del día 7 ---
console.log('\n=== día 7: villancico ===');
await page.goto(`${BASE}?fecha=2026-12-07`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1800);
await page.locator('.calendar-day[data-day="7"]').click();
await page.waitForTimeout(600);
console.log('  versículo:', (await page.locator('.verse-block blockquote').textContent())?.trim());
console.log('  botón de video:', await page.locator('.music__video-play').count());
await page.locator('.music__video-play').click();
await page.waitForTimeout(7000);
console.log('  iframe:', await page.locator('.music__video-frame').count());
console.log('  aviso:', (await page.locator('.music__video .activity__feedback').textContent())?.trim());
await page.screenshot({ path: `${OUT}/dia-7-video.png` });
await page.locator('.modal__close').click();
await page.waitForTimeout(300);

// --- 3. Día 5 y 6 ---
await page.goto(`${BASE}?fecha=2026-12-05`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1600);
await page.locator('.calendar-day[data-day="5"]').click();
await page.waitForTimeout(500);
const steps5 = await page.locator('.activity__step-label').allTextContents();
console.log('\n=== día 5 ===');
steps5.forEach((s, i) => console.log(`  reto ${i + 1}: ${s}`));
await page.locator('.modal__close').click();
await page.waitForTimeout(300);

await page.goto(`${BASE}?fecha=2026-12-06`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2600);
// Si hay ceremonia del domingo, se cierra primero.
if (await page.locator('.advent-ceremony [data-target="true"]').count()) {
  await page.locator('.advent-ceremony [data-target="true"]').click({ force: true });
  await page.locator('[data-ceremony-continue]').waitFor({ state: 'visible', timeout: 15000 });
  await page.locator('[data-ceremony-continue]').click();
  await page.waitForTimeout(1200);
  await page.locator('.sunday-reflection__footer .button').click();
  await page.waitForTimeout(400);
}
await page.locator('.calendar-day[data-day="6"]').click();
await page.waitForTimeout(500);
console.log('\n=== día 6 ===');
console.log('  versículo:', (await page.locator('.verse-block blockquote').textContent())?.trim());
console.log('  cierre:', (await page.locator('.activity__closing').textContent())?.trim());
const opts6 = await page.locator('.option-list__text').allTextContents();
opts6.forEach((o, i) => console.log(`  opción ${i + 1}: ${o}`));

await browser.close();
