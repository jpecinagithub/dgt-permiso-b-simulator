interface StubPageProps {
  title: string;
  description: string;
}

/**
 * Marcador de posición para las pantallas de funcionalidad.
 * La fase 2 (otros agentes) implementará cada ruta sin importar
 * el banco de preguntas aquí: este stub no depende de src/data/questions.
 */
export default function StubPage({ title, description }: StubPageProps) {
  return (
    <section aria-labelledby="stub-title" className="mx-auto max-w-xl pt-8 text-center">
      <div className="rounded-2xl border border-line bg-white p-10">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Próximamente
        </p>
        <h1 id="stub-title" className="mt-3 text-3xl font-extrabold tracking-tight">
          {title}
        </h1>
        <p className="mt-3 leading-relaxed text-muted">{description}</p>
        <p className="mt-6 inline-flex items-center rounded-full bg-offwhite px-4 py-2 text-sm font-medium text-muted">
          En construcción
        </p>
      </div>
    </section>
  );
}
