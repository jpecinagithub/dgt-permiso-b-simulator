/**
 * Diagnóstico de desbordamiento horizontal en móvil (390x844).
 * Recorre landing, páginas y las 30 preguntas del simulacro midiendo
 * scrollWidth vs viewport e identificando elementos culpables.
 */
const { chromium } = require('@playwright/test');

const VIEWPORT = { width: 390, height: 844 };

async function offenders(page) {
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const bad = [];
    const els = document.querySelectorAll('body *');
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      if (r.right > vw + 1 || r.left < -1) {
        const cls = (el.className && el.className.baseVal !== undefined)
          ? String(el.className.baseVal)
          : String(el.className || '');
        bad.push({
          tag: el.tagName.toLowerCase(),
          cls: cls.slice(0, 80),
          left: Math.round(r.left),
          right: Math.round(r.right),
          text: (el.textContent || '').trim().slice(0, 40),
        });
        if (bad.length >= 8) break;
      }
    }
    return {
      scrollW: document.documentElement.scrollWidth,
      vw,
      overflow: document.documentElement.scrollWidth > vw + 1,
      bad,
    };
  });
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    isMobile: false,
    hasTouch: true,
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  const report = [];

  async function check(label) {
    await page.waitForTimeout(400);
    const r = await offenders(page);
    report.push({ label, ...r });
    console.log(`${r.overflow ? 'OVERFLOW' : 'ok      '} [${label}] scrollW=${r.scrollW} vw=${r.vw}`);
    if (r.overflow) {
      for (const b of r.bad) console.log(`    -> <${b.tag}> class="${b.cls}" left=${b.left} right=${b.right} "${b.text}"`);
    }
  }

  await page.goto('http://127.0.0.1:8903/', { waitUntil: 'networkidle' });
  await check('landing');

  await page.goto('http://127.0.0.1:8903/simulacro', { waitUntil: 'networkidle' });
  await check('simulacro-intro');

  // Empezar examen
  await page.getByRole('button', { name: 'Comenzar' }).click();
  await page.waitForTimeout(500);

  // Recorrer las 30 preguntas respondiendo la opción A y comprobando overflow
  for (let i = 0; i < 30; i++) {
    await check(`pregunta-${i + 1}`);
    const options = page.getByRole('button', { name: /^Opción [ABC]/ });
    // AnswerOption no tiene ese nombre; buscar por grupo de opciones
    const group = page.getByRole('group', { name: new RegExp(`Opciones de la pregunta ${i + 1}`) });
    await group.getByRole('button').first().click();
    if (i < 29) {
      await page.getByRole('button', { name: /Siguiente/ }).click();
    }
  }

  // Finalizar -> diálogo de confirmación (hay 0 sin responder, entrega directa)
  await page.getByRole('button', { name: 'Finalizar examen' }).click();
  await page.waitForTimeout(1500);
  await check('resultado');

  // Revisión del examen (scroll a la sección de revisión)
  const review = page.getByRole('heading', { name: /Revisi|Correcci/i });
  if (await review.count()) { await review.first().scrollIntoViewIfNeeded(); }
  await check('resultado-revision');

  await page.goto('http://127.0.0.1:8903/practica', { waitUntil: 'networkidle' });
  await check('practica');
  await page.goto('http://127.0.0.1:8903/fallos', { waitUntil: 'networkidle' });
  await check('fallos');
  await page.goto('http://127.0.0.1:8903/historial', { waitUntil: 'networkidle' });
  await check('historial');

  const withOverflow = report.filter((r) => r.overflow);
  console.log(`\n==== RESUMEN: ${withOverflow.length}/${report.length} pantallas con overflow ====`);
  await browser.close();
  process.exit(withOverflow.length ? 2 : 0);
})().catch((e) => { console.error('ERR', e.message); process.exit(1); });
