import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PracticeRunner from "../components/exam/PracticeRunner";
import { questionBank } from "../data/questions";
import { getFailedQuestionIds } from "../services/history";

/**
 * /fallos — Repasar mis fallos: lee los ids fallados o en blanco del
 * historial (getFailedQuestionIds) y los presenta en modo práctica
 * (explicación inmediata). Estado vacío amable si no hay fallos.
 */
export default function FailuresPage() {
  const [loading, setLoading] = useState(true);
  const [failedIds, setFailedIds] = useState<string[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    getFailedQuestionIds()
      .then((ids) => {
        if (!cancelled) {
          setFailedIds(ids);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFailedIds([]);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <p role="status" className="py-16 text-center text-muted">
        Cargando tus fallos…
      </p>
    );
  }

  const ids = failedIds ?? [];
  if (ids.length === 0) {
    return (
      <section aria-labelledby="fallos-title" className="mx-auto max-w-xl pt-8 text-center">
        <div className="rounded-2xl border border-line bg-white p-10">
          <p aria-hidden="true" className="text-5xl">🎉</p>
          <h1 id="fallos-title" className="mt-4 text-3xl font-extrabold tracking-tight">
            Sin fallos que repasar
          </h1>
          <p className="mt-3 leading-relaxed text-muted">
            Aún no has fallado ninguna pregunta (o todavía no has hecho ningún simulacro).
            Cuando falles o dejes preguntas en blanco, aparecerán aquí para repasarlas con su
            explicación.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
            <Link
              to="/simulacro"
              className="transition-soft inline-flex min-h-[48px] items-center justify-center rounded-xl bg-electric px-6 py-2 font-semibold text-white hover:bg-electric-dark"
            >
              Hacer un simulacro
            </Link>
            <Link
              to="/practica"
              className="transition-soft inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-line bg-white px-6 py-2 font-semibold hover:border-electric"
            >
              Practicar por temas
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const failedSet = new Set(ids);
  const questions = questionBank.filter((q) => failedSet.has(q.id));

  return (
    <PracticeRunner
      questions={questions}
      title="Repasar mis fallos"
      subtitle={`${questions.length} pregunta${questions.length === 1 ? "" : "s"} falladas o en blanco en tu historial`}
    />
  );
}
