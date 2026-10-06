import { useMemo, useState } from "react";
import PracticeRunner from "../components/exam/PracticeRunner";
import { questionBank } from "../data/questions";
import { CATEGORIES } from "../types/question";

/**
 * /practica — Practicar por temas: selector de las 16 materias oficiales
 * (con nº de preguntas), modo sin tiempo y corrección inmediata.
 * Al terminar, resumen simple con opción de guardar en el historial
 * (solo si el usuario lo pulsa; por defecto no se guarda).
 */
export default function PracticePage() {
  const [category, setCategory] = useState<string | null>(null);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const q of questionBank) map.set(q.category, (map.get(q.category) ?? 0) + 1);
    return map;
  }, []);

  if (category !== null) {
    const questions =
      category === "all"
        ? questionBank
        : questionBank.filter((q) => q.category === category);
    const label =
      category === "all"
        ? "Todas las materias"
        : (CATEGORIES.find((c) => c.key === category)?.label ?? category);
    return (
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className="transition-soft self-start rounded-xl border-2 border-line bg-white px-4 py-2 text-sm font-semibold hover:border-electric"
        >
          ← Cambiar de materia
        </button>
        <PracticeRunner
          key={category}
          questions={questions}
          title="Practicar por temas"
          subtitle={`${label} · ${questions.length} preguntas · sin límite de tiempo`}
          allowSave
        />
      </div>
    );
  }

  return (
    <section aria-labelledby="practica-title" className="mx-auto max-w-3xl">
      <h1 id="practica-title" className="text-3xl font-extrabold tracking-tight">
        Practicar por temas
      </h1>
      <p className="mt-2 leading-relaxed text-muted">
        Elige una materia para practicar a tu ritmo, sin límite de tiempo. Al responder verás al
        instante la corrección con su explicación y la referencia legal.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className="transition-soft min-h-[64px] rounded-2xl border-2 border-electric bg-electric/5 p-4 text-left hover:bg-electric/10"
        >
          <span className="block font-bold text-night">Todas las materias</span>
          <span className="text-sm text-muted">{questionBank.length} preguntas</span>
        </button>
        {CATEGORIES.map((c) => {
          const n = counts.get(c.key) ?? 0;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setCategory(c.key)}
              disabled={n === 0}
              className="transition-soft min-h-[64px] rounded-2xl border-2 border-line bg-white p-4 text-left disabled:cursor-not-allowed disabled:opacity-50 hover:not-disabled:border-electric/60 hover:not-disabled:bg-electric/5"
            >
              <span className="block font-semibold text-night">{c.label}</span>
              <span className="text-sm text-muted">
                {n} pregunta{n === 1 ? "" : "s"}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
