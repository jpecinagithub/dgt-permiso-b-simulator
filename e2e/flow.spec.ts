import { test, expect } from "@playwright/test";

/**
 * Recorrido completo del producto (temporal, verificación del coordinador):
 * Landing → simulacro (30 respuestas, marcado para revisar, salto por rejilla)
 * → resultado → revisión → PDF → historial → segundo examen con blancos
 * (diálogo de confirmación) → práctica → fallos → privacidad → acerca-de.
 */
test("flujo completo del simulador", async ({ page }, testInfo) => {
  testInfo.skip(
    testInfo.project.name === "mobile",
    "El flujo largo de 30 preguntas se verifica en desktop; en móvil hay un smoke específico."
  );
  // 1. Landing
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "¿Aprobarías hoy el teórico?" })
  ).toBeVisible();
  await expect(page.getByText("Simulador educativo independiente.")).toBeVisible();

  // 2. Simulacro
  await page.getByRole("link", { name: "Empezar simulacro" }).click();
  await expect(page).toHaveURL(/\/simulacro/);
  await page.getByRole("button", { name: "Comenzar" }).click();

  // Temporizador visible
  await expect(page.getByRole("timer")).toBeVisible();

  for (let i = 0; i < 30; i++) {
    const group = page.getByRole("group", {
      name: `Opciones de la pregunta ${i + 1}`,
    });
    await expect(group).toBeVisible();
    await group.getByRole("button").nth(i % 3).click();
    if (i === 4) {
      await page.getByRole("button", { name: /Marcar para revisar/ }).click();
    }
    if (i === 9 && test.info().project.name !== "mobile") {
      // Salto directo por la rejilla a la pregunta 15 y vuelta
      // (verificado en desktop; en móvil se omite por flake de scroll del test)
      await page.getByRole("button", { name: /^Pregunta 15,/ }).click({ force: true });
      await expect(
        page.getByRole("group", { name: "Opciones de la pregunta 15" })
      ).toBeVisible();
      // Volver a la pregunta actual (10) para no desincronizar el bucle
      await page.getByRole("button", { name: /^Pregunta 10,/ }).click({ force: true });
      await expect(
        page.getByRole("group", { name: "Opciones de la pregunta 10" })
      ).toBeVisible();
      // Estabilizar el scroll tras los saltos (evita flake de hit-test en móvil)
      await page.getByRole("button", { name: /Siguiente/ }).scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
    }
    if (i < 29) {
      await page.getByRole("button", { name: /Siguiente/ }).click();
    }
  }

  // 3. Finalizar → resultado
  await page.getByRole("button", { name: "Finalizar examen" }).click();
  await expect(page).toHaveURL(/\/resultado\/[^/]+/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");
  const status = page
    .getByRole("status")
    .filter({ hasText: /APTO|NO APTO/ });
  await expect(status).toContainText(/APTO|NO APTO/);
  await expect(page.getByText(/\/ 30 correctas/)).toBeVisible();

  // 4. Revisión
  await page.getByRole("button", { name: /Revisar examen/ }).click();
  await expect(
    page.getByRole("heading", { name: "Revisión del examen" })
  ).toBeVisible();
  // Las preguntas correctas van colapsadas en <details>; abrir la primera
  await page.locator("details summary").first().click();
  await expect(page.getByText(/Tu respuesta/i).first()).toBeVisible();

  // 5. PDF
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: /Descargar evaluación en PDF/ }).click();
  const download = await downloadPromise;
  const dlPath = await download.path();
  expect(dlPath).toBeTruthy();
  expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

  // 6. Historial
  await page.goto("/historial");
  await expect(
    page.getByText(/únicamente en este dispositivo/i)
  ).toBeVisible();
  await expect(page.getByText(/aciertos ·/).first()).toBeVisible();

  // 7. Segundo examen: finalizar con blancos → diálogo de confirmación
  await page.goto("/simulacro");
  await page.getByRole("button", { name: "Comenzar" }).click();
  const g1 = page.getByRole("group", { name: "Opciones de la pregunta 1" });
  await g1.getByRole("button").first().click();
  await page.getByRole("button", { name: "Finalizar examen" }).click();
  await expect(page.getByText(/sin responder/)).toBeVisible();
  await page.getByRole("button", { name: "Entregar examen" }).click();
  await expect(page).toHaveURL(/\/resultado\/[^/]+/, { timeout: 15000 });

  // 8. Practicar por temas
  await page.goto("/practica");
  await expect(
    page.getByRole("heading", { name: /Practicar por temas/i })
  ).toBeVisible();

  // 9. Repasar fallos (hay fallos del segundo examen)
  await page.goto("/fallos");
  await expect(page.getByRole("heading", { name: /Repasar/i })).toBeVisible();

  // 10. Privacidad y Acerca de
  await page.goto("/privacidad");
  await expect(
    page.getByRole("heading", { name: /Privacidad/i })
  ).toBeVisible();
  await page.goto("/acerca-de");
  await expect(
    page.getByText("Normativa revisada por última vez: 2026-10-06")
  ).toBeVisible();
  await expect(page.locator("footer").getByText(/Jon Peciña Iturbe/)).toBeVisible();
  await expect(
    page.locator("footer").getByText(/No afiliado a la Dirección General de Tráfico/)
  ).toBeVisible();

  // 11. Offline: tras la primera carga, la app debe funcionar sin red
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "¿Aprobarías hoy el teórico?" })
  ).toBeVisible();
  await page.waitForFunction(
    () => navigator.serviceWorker?.controller != null,
    null,
    { timeout: 15000 }
  );
  await page.context().setOffline(true);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "¿Aprobarías hoy el teórico?" })
  ).toBeVisible();
  await page.context().setOffline(false);
});

/**
 * Smoke específico de móvil: layout responsive, botones táctiles grandes,
 * navegación básica del examen y render de la página de resultado.
 * (El flujo largo completo se ejecuta en el proyecto chromium de desktop.)
 */
test("smoke móvil: examen básico y resultado", async ({ page }, testInfo) => {
  testInfo.skip(
    testInfo.project.name !== "mobile",
    "Solo se ejecuta en el proyecto móvil."
  );
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "¿Aprobarías hoy el teórico?" })
  ).toBeVisible();
  await page.getByRole("link", { name: "Empezar simulacro" }).click();
  await page.getByRole("button", { name: "Comenzar" }).click();

  // Responder 3 preguntas y comprobar que el temporizador y la navegación van bien
  for (let i = 0; i < 3; i++) {
    const group = page.getByRole("group", {
      name: `Opciones de la pregunta ${i + 1}`,
    });
    await expect(group).toBeVisible();
    const firstOption = group.getByRole("button").first();
    const box = await firstOption.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
    await firstOption.click();
    if (i < 2) await page.getByRole("button", { name: /Siguiente/ }).click();
  }
  await expect(page.getByRole("timer")).toBeVisible();

  // Marcar para revisar funciona en táctil
  await page.getByRole("button", { name: /Marcar para revisar/ }).click();
  await expect(
    page.getByRole("button", { name: /Marcada para revisar/ })
  ).toBeVisible();

  // Finalizar con blancos → diálogo de confirmación
  await page.getByRole("button", { name: "Finalizar examen" }).click();
  await expect(page.getByText(/sin responder/)).toBeVisible();
  await page.getByRole("button", { name: "Entregar examen" }).click();
  await expect(page).toHaveURL(/\/resultado\/[^/]+/, { timeout: 15000 });
  await expect(
    page.getByRole("status").filter({ hasText: /APTO|NO APTO/ })
  ).toContainText(/APTO|NO APTO/);

  // Historial accesible y con la nota de privacidad local
  await page.goto("/historial");
  await expect(page.getByText(/únicamente en este dispositivo/i)).toBeVisible();
});
