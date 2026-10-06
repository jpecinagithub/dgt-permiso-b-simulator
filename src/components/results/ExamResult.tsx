import type * as React from "react";
import { Link } from "react-router-dom";
import type { ExamRecord } from "../../services/history";
import type { Question } from "../../types/question";
import { CATEGORY_LABELS } from "../../types/question";
import { buildRecommendation } from "../../lib/exam";
import type { ScoredExam } from "../../lib/exam";
import { formatDurationSec, formatExamDateTime } from "../../lib/format";
import CategoryPerformance from "./CategoryPerformance";
import ExamReview from "./ExamReview";

interface ExamResultProps {
  record: ExamRecord;
  questions: Question[]; // en el mismo orden que record.questionIds
  userName?: string;
  reviewOpen: boolean;
  onToggleReview: () => void;
  onDownloadPdf: () => void;
  downloading: boolean;
}

const BTN_SECONDARY =
  "transition-soft inline-flex min-h-[44px] items-center justify-center rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-bold text-night hover:border-electric hover:text-electric disabled:cursor-wait disabled:opacity-60";
const BTN_PRIMARY =
  "transition-soft inline-flex min-h-[44px] items-center justify-center rounded-xl bg-electric px-5 py-2.5 text-sm font-bold text-white hover:bg-electric-dark";
const BTN_GHOST =
  "transition-soft inline-flex min-h-[44px] items-center justify-center rounded-xl px-5 py-2.5 text-sm font-bold text-muted hover:text-night";

/**
 * Pantalla de resultado de un examen: insignia APTO/NO APTO (texto + icono,
 * no solo color), estadísticas, rendimiento por materias, recomendación de
 * repaso y acciones (revisar, PDF, repetir, inicio).
 */
export default function ExamResult({
  record,
  questions,
  userName,
  reviewOpen,
  onToggleReview,
  onDownloadPdf,
  downloading,
}: ExamResultProps): React.ReactElement {
  const passed = record.passed;
  const pct = Math.round((record.correct / Math.max(1, record.total)) * 100);
  // El registro ya trae la recomendación calculada al terminar el examen;
  // si faltara, se recalcula con la función del contrato (determinista).
  const scored: ScoredExam = {
    correct: record.correct,
    errors: record.errors,
    blank: record.blank,
    total: record.total,
    percentage: pct,
    passed: record.passed,
    durationSec: record.durationSec,
    byCategory: Object.fromEntries(
      Object.entries(record.byCategory).map(([key, s]) => [
        key,
        { correct: s.correct, total: s.total, errors: s.total - s.correct },
      ]),
    ),
  };
  const recommendation =
    record.recommendation || buildRecommendation(scored, CATEGORY_LABELS);

  return (
    <div className="flex flex-col gap-6">
      <section aria-labelledby="resultado-titulo">
        <div
          role="status"
          className={`rounded-2xl border p-6 text-center sm:p-8 ${
            passed
              ? "border-success/30 bg-success/10"
              : "border-danger/30 bg-danger/10"
          }`}
        >
          <span
            aria-hidden="true"
            className={`text-5xl font-extrabold ${
              passed ? "text-success" : "text-danger"
            }`}
          >
            {passed ? "✓" : "✗"}
          </span>
          <h2
            id="resultado-titulo"
            className={`mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl ${
              passed ? "text-success" : "text-danger"
            }`}
          >
            {passed ? "APTO" : "NO APTO"}
          </h2>
          <p className="mt-3 text-lg font-semibold text-night">
            {record.correct} / {record.total} correctas
          </p>
          <p className="mt-1 text-sm text-muted">
            {userName ? (
              <>
                Examen de <span className="font-medium text-night">{userName}</span>
                {" · "}
              </>
            ) : null}
            {formatExamDateTime(record.date)}
            {" · "}
            {record.mode === "practica" ? "Práctica" : "Simulacro"}
          </p>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="% de aciertos" value={`${pct} %`} />
          <Stat label="Errores" value={String(record.errors)} />
          <Stat label="Sin responder" value={String(record.blank)} />
          <Stat label="Duración" value={formatDurationSec(record.durationSec)} />
        </dl>
      </section>

      <CategoryPerformance byCategory={record.byCategory} />

      <section
        aria-labelledby="recomendacion-titulo"
        className="rounded-2xl border border-line bg-white p-5"
      >
        <h2
          id="recomendacion-titulo"
          className="text-lg font-bold text-night"
        >
          Recomendación de repaso
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {recommendation}
        </p>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={onToggleReview}
          aria-expanded={reviewOpen}
          aria-controls="revision-examen"
          className={BTN_SECONDARY}
        >
          {reviewOpen ? "Ocultar revisión" : "Revisar examen"}
        </button>
        <button
          type="button"
          onClick={onDownloadPdf}
          disabled={downloading}
          aria-busy={downloading}
          className={BTN_SECONDARY}
        >
          {downloading ? "Generando PDF…" : "Descargar evaluación en PDF"}
        </button>
        <Link to="/simulacro" className={BTN_PRIMARY}>
          Repetir simulacro
        </Link>
        <Link to="/" className={BTN_GHOST}>
          Volver al inicio
        </Link>
      </div>

      {reviewOpen ? (
        <div id="revision-examen">
          <ExamReview record={record} questions={questions} />
        </div>
      ) : null}
    </div>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}): React.ReactElement {
  return (
    <div className="rounded-xl border border-line bg-white p-4 text-center">
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className="mt-1 text-2xl font-extrabold text-night">{value}</dd>
    </div>
  );
}
