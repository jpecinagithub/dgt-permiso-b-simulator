import { Link } from 'react-router-dom'

const STATS = [
  { value: '30', label: 'preguntas' },
  { value: '30', label: 'minutos' },
  { value: '3', label: 'errores máximo' },
]

const ACCESS = [
  {
    to: '/simulacro',
    title: 'Simulacro',
    description:
      'Examen completo en condiciones reales: 30 preguntas, 30 minutos y corrección al final.',
    cta: 'Hacer un simulacro',
  },
  {
    to: '/practica',
    title: 'Practicar por temas',
    description:
      'Repasa las 16 materias oficiales del temario a tu ritmo, sin límite de tiempo.',
    cta: 'Elegir un tema',
  },
  {
    to: '/historial',
    title: 'Historial',
    description:
      'Consulta tus últimos resultados y sigue tu evolución hacia el APTO.',
    cta: 'Ver historial',
  },
]

const STEPS = [
  {
    title: 'Elige el modo',
    description: 'Simulacro con tiempo real o práctica tranquila por materias.',
  },
  {
    title: 'Responde 30 preguntas',
    description: 'Test de 3 opciones como en el examen, con imágenes y señales.',
  },
  {
    title: 'Corrige y aprende',
    description: 'Revisa cada fallo con su explicación y la referencia legal.',
  },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-12">
      {/* Hero */}
      <section aria-labelledby="hero-title" className="pt-4 sm:pt-8">
        <p className="mb-4 inline-flex items-center rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold tracking-wide text-muted uppercase">
          Simulador del examen teórico · Permiso B
        </p>
        <h1
          id="hero-title"
          className="max-w-2xl text-4xl font-extrabold tracking-tight text-night sm:text-5xl"
        >
          ¿Aprobarías hoy el teórico?
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Haz un simulacro del examen del permiso B y descubre en 30 minutos si
          estás preparado.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/simulacro"
            className="transition-soft inline-flex min-h-[52px] items-center justify-center rounded-xl bg-electric px-8 text-base font-semibold text-white shadow-lg shadow-electric/25 hover:bg-electric-dark"
          >
            Empezar simulacro
          </Link>
          <Link
            to="/practica"
            className="transition-soft inline-flex min-h-[52px] items-center justify-center rounded-xl border border-line bg-white px-8 text-base font-semibold text-night hover:border-electric hover:text-electric"
          >
            Practicar por temas
          </Link>
        </div>

        <dl className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col rounded-2xl border border-line bg-white px-4 py-5 text-center"
            >
              <dt className="order-2 mt-1 text-xs font-medium text-muted sm:text-sm">
                {stat.label}
              </dt>
              <dd className="order-1 text-3xl font-extrabold text-night sm:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Accesos */}
      <section aria-labelledby="accesos-title">
        <h2 id="accesos-title" className="text-2xl font-bold tracking-tight">
          Elige cómo entrenar
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {ACCESS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="transition-soft group flex flex-col rounded-2xl border border-line bg-white p-6 hover:-translate-y-0.5 hover:border-electric/40 hover:shadow-xl hover:shadow-night/5"
            >
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
              <span className="mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-electric group-hover:underline">
                {item.cta} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section aria-labelledby="como-funciona-title">
        <h2 id="como-funciona-title" className="text-2xl font-bold tracking-tight">
          Cómo funciona
        </h2>
        <ol className="mt-5 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl border border-line bg-white p-6"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-electric/10 text-base font-bold text-electric"
              >
                {i + 1}
              </span>
              <h3 className="mt-3 font-bold">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Aviso */}
      <p className="rounded-xl border border-line bg-white px-4 py-3 text-center text-xs text-muted">
        Simulador educativo independiente. No está afiliado ni pertenece a la
        Dirección General de Tráfico.
      </p>
    </div>
  )
}
