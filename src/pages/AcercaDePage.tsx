import { Link } from 'react-router-dom'
import { EXAM_CONFIG, isPassed } from '../config/exam'

export default function AcercaDePage() {
  return (
    <article aria-labelledby="acerca-title" className="mx-auto max-w-2xl">
      <h1 id="acerca-title" className="text-3xl font-extrabold tracking-tight">
        Acerca de
      </h1>

      <div className="mt-8 flex flex-col gap-4">
        <section className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-bold">Qué es esta app</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            DGT Test Simulator es un simulador educativo del examen teórico del
            permiso B: 30 preguntas tipo test, 30 minutos y corrección con
            explicaciones. Está pensado para entrenar en condiciones parecidas
            a las del examen real.
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-bold">Criterio de APTO</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Se considera APTO el resultado con un máximo de{' '}
            <strong className="text-night">{EXAM_CONFIG.maxErrors} errores</strong>{' '}
            en {EXAM_CONFIG.questionCount} preguntas, siguiendo el criterio
            oficial (los errores no pueden superar el 10 % de las preguntas:
            Anexo VI, B) 3 del RD 818/2009).
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Nota: la normativa no regula expresamente las preguntas sin
            responder. Por decisión de este simulador, las preguntas en blanco
            cuentan como error.
          </p>
          <p className="mt-2 text-xs text-muted">
            Ejemplo: {EXAM_CONFIG.maxErrors} errores →{' '}
            {isPassed(EXAM_CONFIG.maxErrors) ? 'APTO' : 'NO APTO'};{' '}
            {EXAM_CONFIG.maxErrors + 1} errores →{' '}
            {isPassed(EXAM_CONFIG.maxErrors + 1) ? 'APTO' : 'NO APTO'}.
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-bold">Normativa</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Normativa revisada por última vez:{' '}
            <strong className="text-night">{EXAM_CONFIG.legalReviewDate}</strong>.
            El contenido se elabora a partir de la normativa vigente (RD
            818/2009, RD 1428/2003, RDL 6/2015 y sus modificaciones) y de las
            publicaciones oficiales de la DGT. Cada pregunta indica su
            referencia legal y su fecha de verificación.
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-bold">Autor</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Creado por <span className="font-medium text-night">Jon Peciña Iturbe</span>.
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-bold">Aviso importante</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Proyecto educativo independiente. No está afiliado ni pertenece a
            la Dirección General de Tráfico. Las preguntas son de elaboración
            propia con fines de práctica y no constituyen el examen oficial.
          </p>
          <Link
            to="/privacidad"
            className="transition-soft mt-3 inline-flex min-h-[44px] items-center text-sm font-semibold text-electric hover:underline"
          >
            Leer la política de privacidad →
          </Link>
        </section>
      </div>
    </article>
  )
}
