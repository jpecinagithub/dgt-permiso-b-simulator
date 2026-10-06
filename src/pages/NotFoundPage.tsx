import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section aria-labelledby="not-found-title" className="mx-auto max-w-xl pt-8 text-center">
      <div className="rounded-2xl border border-line bg-white p-10">
        <p className="text-6xl font-extrabold text-night" aria-hidden="true">
          404
        </p>
        <h1 id="not-found-title" className="mt-3 text-2xl font-extrabold tracking-tight">
          Página no encontrada
        </h1>
        <p className="mt-3 text-muted">
          La dirección que buscas no existe en este simulador.
        </p>
        <Link
          to="/"
          className="transition-soft mt-6 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-electric px-8 text-base font-semibold text-white hover:bg-electric-dark"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
