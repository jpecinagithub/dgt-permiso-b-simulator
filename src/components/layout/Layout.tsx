import { Analytics } from '@vercel/analytics/react'
import { BookOpen, History, Home, Info, RotateCcw, Timer } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import UpdatePrompt from '../UpdatePrompt'

const NAV_ITEMS: { to: string; label: string; icon: LucideIcon; end?: boolean }[] = [
  { to: '/', label: 'Inicio', icon: Home, end: true },
  { to: '/simulacro', label: 'Simulacro', icon: Timer },
  { to: '/practica', label: 'Practicar', icon: BookOpen },
  { to: '/fallos', label: 'Fallos', icon: RotateCcw },
  { to: '/historial', label: 'Historial', icon: History },
  { to: '/acerca-de', label: 'Acerca de', icon: Info },
]

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col bg-offwhite text-night">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>

      <header className="bg-night text-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-center gap-4 px-4 py-3 sm:justify-between sm:px-6">
          <Link
            to="/"
            className="hidden text-lg font-bold tracking-tight whitespace-nowrap sm:block"
            aria-label="DGT Test — inicio"
          >
            DGT <span className="font-medium text-white/80">Test</span>
          </Link>
          <nav aria-label="Navegación principal" className="min-w-0">
            <ul className="flex items-center gap-0 overflow-x-auto sm:gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to} className="shrink-0">
                  <NavLink
                    to={item.to}
                    end={item.end}
                    aria-label={item.label}
                    title={item.label}
                    className={({ isActive }) =>
                      `transition-soft flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg px-2 text-sm font-medium sm:justify-start sm:px-3 ${
                        isActive
                          ? 'bg-white/15 text-white'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5 sm:hidden" aria-hidden="true" />
                    <span className="hidden sm:inline">{item.label}</span>
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
