import { Analytics } from '@vercel/analytics/react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import UpdatePrompt from '../UpdatePrompt'

const NAV_ITEMS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/simulacro', label: 'Simulacro' },
  { to: '/practica', label: 'Practicar' },
  { to: '/fallos', label: 'Fallos' },
  { to: '/historial', label: 'Historial' },
  { to: '/acerca-de', label: 'Acerca de' },
]

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col bg-offwhite text-night">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>

      <header className="bg-night text-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="text-lg font-bold tracking-tight whitespace-nowrap"
            aria-label="DGT Test — inicio"
          >
            DGT <span className="font-medium text-white/80">Test</span>
          </Link>
          <nav aria-label="Navegación principal" className="min-w-0">
            <ul className="flex items-center gap-1 overflow-x-auto">
              {NAV_ITEMS.map((item) => (
                <li key={item.to} className="shrink-0">
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `transition-soft flex min-h-[44px] items-center rounded-lg px-2 text-sm font-medium sm:px-3 ${
                        isActive
                          ? 'bg-white/15 text-white'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="contenido" className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            Creado por <span className="font-medium text-night">Jon Peciña Iturbe</span>
          </p>
          <p className="max-w-xl">
            Proyecto educativo independiente. No afiliado a la Dirección General de Tráfico.
          </p>
          <nav aria-label="Enlaces legales" className="flex gap-4">
            <Link
              to="/privacidad"
              className="transition-soft min-h-[44px] inline-flex items-center text-electric hover:underline"
            >
              Privacidad
            </Link>
            <Link
              to="/acerca-de"
              className="transition-soft min-h-[44px] inline-flex items-center text-electric hover:underline"
            >
              Acerca de
            </Link>
          </nav>
        </div>
      </footer>

      <UpdatePrompt />
      <Analytics />
    </div>
  )
}
