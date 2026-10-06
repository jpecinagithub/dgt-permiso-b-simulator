import { useCallback, useEffect, useReducer, useRef } from "react";
import type { ExamSession } from "../../lib/exam";
import ExamTimer from "./ExamTimer";
import QuestionCard from "./QuestionCard";
import QuestionNavigator from "./QuestionNavigator";
import { examRunnerReducer, initRunner } from "./examRunnerReducer";

interface ExamRunnerProps {
  session: ExamSession;
  /** Se llama una sola vez al entregar (manual o por tiempo agotado). */
  onFinish: (finalSession: ExamSession) => void;
}

/**
 * Runner del simulacro: una pregunta por pantalla, fiel al examen DGT.
 *
 * - Navegación: Anterior/Siguiente, rejilla de preguntas, teclado
 *   (flechas cuando el foco no está en un control; 1/2/3 para responder).
 * - "Marcar para revisar" por pregunta (toggle).
 * - "Finalizar examen": si hay preguntas sin responder pide confirmación
 *   en un <dialog> nativo; al agotar el tiempo se entrega automáticamente.
 * - El temporizador se basa en timestamps (ExamTimer): sobrevive a
 *   cambios de pestaña sin visibilitychange.
 */
export default function ExamRunner({ session, onFinish }: ExamRunnerProps) {
  const [state, dispatch] = useReducer(examRunnerReducer, session, initRunner);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const finishingRef = useRef(false);
  const stateRef = useRef(state);
  stateRef.current = state;

  const deadlineMs = session.startedAt + session.timeLimitSec * 1000;
  const total = session.questions.length;
  const current = state.currentIndex;
  const question = session.questions[current];
  const answer = state.answers[current];
  const unanswered = state.answers.filter((a) => a.selected === null).length;
  const answered = total - unanswered;

  const finish = useCallback(() => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    onFinish({ ...session, answers: stateRef.current.answers });
  }, [session, onFinish]);

  const requestFinish = () => {
    if (unanswered > 0) {
      dialogRef.current?.showModal();
    } else {
      finish();
    }
  };

  // Al cambiar de pregunta, llevar el foco al enunciado (lectores de pantalla).
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [current]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest("button, input, textarea, select, a, [role='dialog'], dialog")) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      dispatch({ type: "next" });
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      dispatch({ type: "prev" });
    } else if (e.key === "1" || e.key === "2" || e.key === "3") {
      dispatch({ type: "select", index: current, option: Number(e.key) - 1 });
    }
  };

  return (
    <div onKeyDown={handleKeyDown} className="flex flex-col gap-5">
      {/* Barra superior: temporizador + acciones */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ExamTimer deadlineMs={deadlineMs} onExpire={finish} />
        <p className="text-sm font-medium text-muted" aria-live="polite">
          Respondidas {answered} de {total}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => dispatch({ type: "toggle-flag", index: current })}
            aria-pressed={answer.flagged}
            className={`transition-soft min-h-[44px] rounded-xl border-2 px-4 py-2 text-sm font-semibold ${
              answer.flagged
                ? "border-amber-500 bg-amber-50 text-amber-700"
                : "border-line bg-white text-night hover:border-amber-400"
            }`}
          >
            {answer.flagged ? "⚑ Marcada para revisar" : "⚑ Marcar para revisar"}
          </button>
          <button
            type="button"
            onClick={requestFinish}
            className="transition-soft min-h-[44px] rounded-xl bg-night px-5 py-2 text-sm font-semibold text-white hover:bg-electric-dark"
          >
            Finalizar examen
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
        <div className="flex min-w-0 flex-col gap-5">
          <QuestionCard
            question={question}
            index={current}
            total={total}
            selected={answer.selected}
            onSelect={(option) => dispatch({ type: "select", index: current, option })}
            headingRef={headingRef}
          />
          {/* Controles anterior / siguiente */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => dispatch({ type: "prev" })}
              disabled={current === 0}
              className="transition-soft min-h-[48px] rounded-xl border-2 border-line bg-white px-6 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-40 hover:not-disabled:border-electric"
            >
              ← Anterior
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "next" })}
              disabled={current === total - 1}
              className="transition-soft min-h-[48px] rounded-xl bg-electric px-6 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 hover:not-disabled:bg-electric-dark"
            >
              Siguiente →
            </button>
          </div>
        </div>

        <aside className="lg:sticky lg:top-4 lg:self-start">
          <QuestionNavigator
            answers={state.answers}
            currentIndex={current}
            onGo={(index) => dispatch({ type: "go", index })}
          />
        </aside>
      </div>

      {/* Confirmación antes de entregar con preguntas sin responder */}
      <dialog
        ref={dialogRef}
        aria-labelledby="confirm-finish-title"
        className="w-[min(92vw,28rem)] rounded-2xl border border-line bg-white p-6 shadow-xl backdrop:bg-night/50"
      >
        <h2 id="confirm-finish-title" className="text-lg font-bold">
          ¿Entregar el examen?
        </h2>
        <p className="mt-2 leading-relaxed text-muted">
          Tienes <strong className="text-night">{unanswered} pregunta{unanswered === 1 ? "" : "s"} sin responder</strong>.
          Las preguntas en blanco cuentan como error. ¿Quieres entregar el examen?
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            autoFocus
            onClick={() => dialogRef.current?.close()}
            className="transition-soft min-h-[48px] rounded-xl border-2 border-line bg-white px-5 py-2 font-semibold hover:border-electric"
          >
            Seguir respondiendo
          </button>
          <button
            type="button"
            onClick={() => {
              dialogRef.current?.close();
              finish();
            }}
            className="transition-soft min-h-[48px] rounded-xl bg-night px-5 py-2 font-semibold text-white hover:bg-electric-dark"
          >
            Entregar examen
          </button>
        </div>
      </dialog>
    </div>
  );
}
