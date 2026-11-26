import { chromium } from 'playwright-core';

const BASE = process.argv[2] ?? 'http://localhost:5177/';
const OUT = 'C:/Users/boyit/AppData/Local/Temp/opencode/calendario-shots/advent';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
page.on('pageerror', (e) => console.log('[pageerror]', e.message));

for (const fecha of ['2026-11-20', '2026-11-29', '2026-12-06', '2026-12-13', '2026-12-20']) {
  await page.goto(`${BASE}?fecha=${fecha}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200);

  // Si hay ceremonia, se cierra primero (bloquea la cabecera).
  const pending = page.locator('.advent-ceremony [data-target="true"]');
  if (await pending.count()) {
    await pending.click({ force: true });
    const continueButton = page.locator('[data-ceremony-continue]');
    await continueButton.waitFor({ state: 'visible', timeout: 15000 });
    await continueButton.click();
    await page.waitForTimeout(1200);
    await page.locator('.sunday-reflection__footer .button').click();
    await page.waitForTimeout(400);
  }

  const button = page.locator('[data-action="reflections"]');
  const hidden = await button.isHidden();
  let items = 0;
  if (!hidden) {
    await button.click();
    await page.waitForTimeout(400);
    items = await page.locator('.sunday-reflection__item').count();
    await page.screenshot({ path: `${OUT}/lista-${fecha}.png` });
    await page.locator('.sunday-reflection__item').first().click();
    await page.waitForTimeout(400);
    const title = await page.locator('.sunday-reflection__gospel').count();
    console.log(`  primera reflexión abierta: ${title > 0}`);
    await page.locator('.sunday-reflection__footer .button').click();
    await page.waitForTimeout(300);
  }
  console.log(`${fecha}: botón oculto=${hidden} reflexiones=${items}`);
}

await browser.close();
