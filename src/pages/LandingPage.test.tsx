import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import LandingPage from './LandingPage'

function renderLanding() {
  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>,
  )
}

describe('LandingPage', () => {
  it('muestra el hero con el título y el subtítulo exactos', () => {
    renderLanding()
    expect(
      screen.getByRole('heading', { name: '¿Aprobarías hoy el teórico?' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Haz un simulacro del examen del permiso B y descubre en 30 minutos si estás preparado.',
      ),
    ).toBeInTheDocument()
  })

  it('el CTA principal lleva a /simulacro', () => {
    renderLanding()
    const cta = screen.getByRole('link', { name: 'Empezar simulacro' })
    expect(cta).toHaveAttribute('href', '/simulacro')
  })

  it('muestra los tres indicadores del formato del examen', () => {
    renderLanding()
    expect(screen.getByText('preguntas')).toBeInTheDocument()
    expect(screen.getByText('minutos')).toBeInTheDocument()
    expect(screen.getByText('errores máximo')).toBeInTheDocument()
  })

  it('incluye el aviso de proyecto independiente', () => {
    renderLanding()
    expect(
      screen.getByText(/No está afiliado ni pertenece a la Dirección General de Tráfico/),
    ).toBeInTheDocument()
  })
})
