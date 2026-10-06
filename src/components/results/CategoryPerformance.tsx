import type * as React from "react";
import { CATEGORIES } from "../../types/question";

interface CategoryPerformanceProps {
  byCategory: Record<string, { correct: number; total: number }>;
}

/**
 * Barras de rendimiento por materia: etiqueta + porcentaje en texto
 * (accesible sin depender del color) y barra visual decorativa.
 */
export default function CategoryPerformance({
  byCategory,
}: CategoryPerformanceProps): React.ReactElement | null {
  const rows = CATEGORIES.map((cat) => ({
    ...cat,
    stat: byCategory[cat.key],
  })).filter((row) => row.stat && row.stat.total > 0);

  if (rows.length === 0) return null;

  return (
    <section
      aria-labelledby="rendimiento-materias"
      className="rounded-2xl border border-line bg-white p-5"
    >
      <h2
        id="rendimiento-materias"
        className="text-lg font-bold text-night"
      >
        Rendimiento por materias
      </h2>
      <ul className="mt-4 flex flex-col gap-4">
        {rows.map((row) => {
          const pct = Math.round((row.stat.correct / row.stat.total) * 100);
          return (
            <li key={row.key}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium text-night">
                  {row.label}
                </span>
                <span className="shrink-0 text-sm text-muted">
                  <strong className="font-bold text-night">{pct} %</strong>
                  <span className="sr-only"> de aciertos, </span>
                  <span aria-hidden="true"> · </span>
                  {row.stat.correct}/{row.stat.total}
                </span>
              </div>
              <div
                aria-hidden="true"
                className="mt-1.5 h-2 overflow-hidden rounded-full bg-neutral-soft"
              >
                <div
                  className="h-full rounded-full bg-electric"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
