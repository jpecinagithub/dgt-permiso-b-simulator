import type * as React from "react";
import type { ExamRecord } from "../../services/history";
import { CATEGORY_LABELS } from "../../types/question";
import { formatDurationSec, formatExamDate } from "../../lib/format";

interface HistoryCardProps {
  record: ExamRecord;
  downloading: boolean;
  onView: () => void;
  onReview: () => void;
  onDownload: () => void;
  onDelete: () => void;
}

/** Las 2 materias no perfectas con peor porcentaje, para el mini-resumen. */
function weakestSummary(record: ExamRecord): string {
  const weak = Object.entries(record.byCategory)
    .filter(([, s]) => s.total > 0)
    .map(([key, s]) => ({
      key,
      pct: Math.round((s.correct / s.total) * 100),
    }))
    .filter((w) => w.pct < 100)
    .sort((a, b) => a.pct - b.pct || a.key.localeCompare(b.key))
    .slice(0, 2)
    .map((w) => `${CATEGORY_LABELS[w.key] ?? w.key} (${w.pct} %)`);
  return weak.length > 0
    ? `A repasar: ${weak.join(" · ")}`
    : "Pleno en todas las materias";
}

const BTN =
  "transition-soft inline-flex min-h-[44px] items-center justify-center rounded-xl border border-line bg-white px-4 py-2 text-sm font-bold text-night hover:border-electric hover:text-electric disabled:cursor-wait disabled:opacity-60";
const BTN_DANGER =
  "transition-soft inline-flex min-h-[44px] items-center justify-center rounded-xl border border-danger/40 bg-white px-4 py-2 text-sm font-bold text-danger hover:bg-danger/10";

/**
 * Tarjeta de un examen del historial: fecha, modalidad, resultado
 * APTO/NO APTO (texto + icono), estadísticas, mini-resumen por materias
 * y acciones (ver, revisar, PDF, eliminar).
 */
export default function HistoryCard({
  record,
  downloading,
  onView,
  onReview,
  onDownload,
  onDelete,
}: HistoryCardProps): React.ReactElement {
  const passed = record.passed;

  return (
    <article
      aria-label={`Examen del ${formatExamDate(record.date)}: ${passed ? "apto" : "no apto"}`}
      className="rounded-2xl border border-line bg-white p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
            passed ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
          }`}
        >
          <span aria-hidden="true">{passed ? "✓" : "✗"}</span>
          {passed ? "APTO" : "NO APTO"}
        </span>
        <span className="rounded-full bg-neutral-soft px-2.5 py-1 text-xs font-semibold text-muted">
          {record.mode === "practica" ? "Práctica" : "Simulacro"}
        </span>
        <time
          dateTime={record.date}
          className="ml-auto text-sm text-muted"
        >
          {formatExamDate(record.date)}
        </time>
      </div>

      <p className="mt-3 text-sm text-night">
        <strong className="font-bold">
          {record.correct}/{record.total}
        </strong>{" "}
        aciertos · {record.errors} errores ·{" "}
        {formatDurationSec(record.durationSec)}
      </p>
      <p className="mt-1 text-xs text-muted">{weakestSummary(record)}</p>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <button type="button" onClick={onView} className={BTN}>
          Ver resultado
        </button>
        <button type="button" onClick={onReview} className={BTN}>
          Revisar examen
        </button>
        <button
          type="button"
          onClick={onDownload}
          disabled={downloading}
          aria-busy={downloading}
          className={BTN}
        >
          {downloading ? "Generando…" : "Descargar evaluación en PDF"}
        </button>
        <button type="button" onClick={onDelete} className={BTN_DANGER}>
          Eliminar examen
        </button>
      </div>
    </article>
  );
}
