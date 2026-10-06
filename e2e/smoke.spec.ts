import { expect, test } from '@playwright/test'

test('la landing carga con el hero y el CTA', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: '¿Aprobarías hoy el teórico?' }),
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Empezar simulacro' })).toHaveAttribute(
    'href',
    '/simulacro',
  )
})

test('las rutas existen y la navegación funciona', async ({ page }) => {
  await page.goto('/privacidad')
  await expect(page.getByRole('heading', { name: 'Privacidad' })).toBeVisible()
  await page.goto('/acerca-de')
  await expect(page.getByRole('heading', { name: 'Acerca de' })).toBeVisible()
  await page.goto('/simulacro')
  await expect(page.getByText('En construcción')).toBeVisible()
})
