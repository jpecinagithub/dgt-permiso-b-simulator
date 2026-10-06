import { useMemo, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { EXAM_CONFIG } from "../../config/exam";
import { buildRecommendation, createSession, scoreExam, type ExamSession } from "../../lib/exam";
import { saveExamRecord } from "../../services/history";
import { CATEGORY_LABELS, type Question } from "../../types/question";
import QuestionCard from "./QuestionCard";
import { examRunnerReducer } from "./examRunnerReducer";

interface PracticeRunnerProps {
  questions: Question[];
  title: string;
  subtitle?: string;
  /** Si true, al terminar ofrece "Guardar en historial" (mode "practica"). */
  allowSave?: boolean;
  /** RNG inyectable para el barajado (tests deterministas). Por defecto Math.random. */
  rng?: () => number;
}

type Phase = "running" | "summary";

/**
 * Modo práctica: sin tiempo, corrección inmediata.
 *
 * Al responder se muestra al instante si es correcta o no, junto con la
 * explicación y la referencia legal. Al terminar, resumen simple con
 * opción de guardar en el historial (solo si el usuario lo pulsa).
 * Lo usan /practica y /fallos.
 */
export default function PracticeRunner({
  questions,
  title,
  subtitle,
  allowSave = false,
  rng,
}: PracticeRunnerProps) {
  const [runId, setRunId] = useState(0);
  const session: ExamSession = useMemo(
    () => createSession(questions, questions.length, 0, rng),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [questions, runId, rng],
  );

  if (questions.length === 0) {
    return (
      <p className="rounded-2xl border border-line bg-white p-8 text-center text-muted">
        No hay preguntas disponibles para esta selección.
      </p>
    );
  }

  // `key` fuerza el remontaje al reintentar: el reducer vuelve a
  // inicializarse con la nueva sesión barajada.
  return (
    <PracticeRunnerInner
      key={runId}
      session={session}
      title={title}
      subtitle={subtitle}
      allowSave={allowSave}
      onRestart={() => setRunId((n) => n + 1)}
    />
  );
}

function PracticeRunnerInner({
  session,
  title,
  subtitle,
  allowSave,
  onRestart,
}: {
  session: ExamSession;
  title: string;
  subtitle?: string;
  allowSave: boolean;
  onRestart: () => void;
}) {
  const [state, dispatch] = useReducer(examRunnerReducer, session, (s) => ({
    answers: s.answers,
    currentIndex: 0,
  }));
  const [phase, setPhase] = useState<Phase>("running");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const total = session.questions.length;
  const current = state.currentIndex;
  const question = session.questions[current];
  const answer = state.answers[current];
  const answeredCount = state.answers.filter((a) => a.selected !== null).length;
  const isLast = current === total - 1;

  const restart = () => {
    onRestart();
  };

  const saveToHistory = async () => {
    if (saving || saved) return;
    setSaving(true);
    try {
      const finalSession = { ...session, answers: state.answers };
      const scored = scoreExam(finalSession, Date.now(), EXAM_CONFIG.maxErrors);
      await saveExamRecord({
        mode: "practica",
        questionIds: finalSession.questions.map((q) => q.id),
        answers: finalSession.answers.map((a) => a.selected),
        correct: scored.correct,
        errors: scored.errors,
        blank: scored.blank,
        total: scored.total,
        durationSec: scored.durationSec,
        passed: scored.passed,
        byCategory: Object.fromEntries(
          Object.entries(scored.byCategory).map(([k, v]) => [k, { correct: v.correct, total: v.total }]),
        ),
        recommendation: buildRecommendation(scored, CATEGORY_LABELS),
      });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  if (phase === "summary") {
    const finalSession = { ...session, answers: state.answers };
    const scored = scoreExam(finalSession, Date.now(), EXAM_CONFIG.maxErrors);
    return (
      <section aria-labelledby="practice-summary" className="mx-auto max-w-xl">
        <div className="rounded-2xl border border-line bg-white p-8 text-center">
          <p className="text-xs font-semibold tracking-widest text-muted uppercase">{title}</p>
          <h2 id="practice-summary" className="mt-2 text-3xl font-extrabold">
            {scored.correct} de {scored.total} correctas
          </h2>
          <p className="mt-2 text-muted">
            {scored.percentage.toFixed(0)} % de aciertos
            {scored.blank > 0 && ` · ${scored.blank} en blanco`}
          </p>
          {allowSave && !saved && (
            <button
              type="button"
              onClick={saveToHistory}
              disabled={saving}
              className="transition-soft mt-6 min-h-[48px] w-full rounded-xl bg-electric px-5 py-2 font-semibold text-white disabled:opacity-60 hover:not-disabled:bg-electric-dark"
            >
              {saving ? "Guardando…" : "Guardar en historial"}
            </button>
          )}
          {saved && (
            <p role="status" className="mt-6 rounded-xl bg-success/10 px-4 py-3 text-sm font-semibold text-success">
              ✓ Guardado en el historial. Puedes verlo en <Link to="/historial" className="underline">Historial</Link>.
            </p>
          )}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={restart}
              className="transition-soft min-h-[48px] flex-1 rounded-xl border-2 border-line bg-white px-5 py-2 font-semibold hover:border-electric"
            >
              Reintentar
            </button>
            <Link
              to="/practica"
              className="transition-soft inline-flex min-h-[48px] flex-1 items-center justify-center rounded-xl bg-night px-5 py-2 font-semibold text-white hover:bg-electric-dark"
            >
              Cambiar de tema
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const showFeedback = answer.selected !== null;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-extrabold">{title}</h1>
          {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
        </div>
        <p className="text-sm font-medium text-muted" aria-live="polite">
          Respondidas {answeredCount} de {total}
        </p>
      </div>

      <QuestionCard
        question={question}
        index={current}
        total={total}
        selected={answer.selected}
        onSelect={(option) => dispatch({ type: "select", index: current, option })}
        reveal
      />

      {showFeedback && (
        <div
          role="status"
          className={`rounded-2xl border-2 p-5 ${
            answer.selected === question.correctAnswer
              ? "border-success/40 bg-success/5"
              : "border-danger/40 bg-danger/5"
          }`}
        >
          <p
            className={`text-lg font-bold ${
              answer.selected === question.correctAnswer ? "text-success" : "text-danger"
            }`}
          >
            {answer.selected === question.correctAnswer ? "✓ Correcta" : "✕ Incorrecta"}
          </p>
          <p className="mt-2 leading-relaxed">{question.explanation}</p>
          <p className="mt-2 text-sm text-muted">
            Referencia legal: <span className="font-medium">{question.legalReference}</span>
          </p>
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => dispatch({ type: "prev" })}
          disabled={current === 0}
          className="transition-soft min-h-[48px] rounded-xl border-2 border-line bg-white px-6 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-40 hover:not-disabled:border-electric"
        >
          ← Anterior
        </button>
        {isLast ? (
          <button
            type="button"
            onClick={() => setPhase("summary")}
            className="transition-soft min-h-[48px] rounded-xl bg-electric px-6 py-2 font-semibold text-white hover:bg-electric-dark"
          >
            Ver resumen
          </button>
        ) : (
          <button
            type="button"
            onClick={() => dispatch({ type: "next" })}
            className="transition-soft min-h-[48px] rounded-xl bg-electric px-6 py-2 font-semibold text-white hover:bg-electric-dark"
          >
            Siguiente →
          </button>
        )}
      </div>
    </div>
  );
}
