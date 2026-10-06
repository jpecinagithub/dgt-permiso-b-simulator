import type { ExamAnswer } from "../../lib/exam";

interface QuestionNavigatorProps {
  answers: ExamAnswer[];
  currentIndex: number;
  onGo: (index: number) => void;
}

type CellState = "current" | "answered" | "flagged" | "unanswered";

function cellState(answer: ExamAnswer, isCurrent: boolean): CellState {
  if (isCurrent) return "current";
  if (answer.flagged) return "flagged";
  if (answer.selected !== null) return "answered";
  return "unanswered";
}

const STATE_LABEL: Record<CellState, string> = {
  current: "actual",
  answered: "contestada",
  flagged: "marcada para revisar",
  unanswered: "sin contestar",
};

/**
 * Rejilla de navegación 1–N con el estado de cada pregunta.
 * El estado se comunica con color + icono/texto, nunca solo con color:
 * actual (anillo grueso), contestada (✓), sin contestar (número),
 * marcada para revisar (⚑).
 */
export default function QuestionNavigator({
  answers,
  currentIndex,
  onGo,
}: QuestionNavigatorProps) {
  return (
    <nav aria-label="Navegación por preguntas" className="rounded-2xl border border-line bg-white p-4">
      <h2 className="text-sm font-semibold text-muted">Preguntas</h2>
      <ol className="mt-3 grid grid-cols-6 gap-2 sm:grid-cols-10">
        {answers.map((answer, i) => {
          const state = cellState(answer, i === currentIndex);
          const answered = answer.selected !== null;
          const flagged = answer.flagged;
          return (
            <li key={answer.questionId}>
              <button
                type="button"
                onClick={() => onGo(i)}
                aria-label={`Pregunta ${i + 1}, ${STATE_LABEL[state]}${answered && flagged ? ", contestada" : ""}`}
                aria-current={i === currentIndex ? "true" : undefined}
                className={`transition-soft flex aspect-square w-full items-center justify-center rounded-lg border-2 text-sm font-bold ${
                  state === "current"
                    ? "border-electric bg-electric text-white ring-2 ring-electric/40 ring-offset-1"
                    : state === "answered"
                      ? "border-electric/70 bg-electric/10 text-electric"
                      : state === "flagged"
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-line bg-offwhite text-muted hover:border-muted"
                }`}
              >
                <span aria-hidden="true" className="flex flex-col items-center leading-none">
                  <span>{i + 1}</span>
                  {state === "answered" && <span className="text-[10px]">✓</span>}
                  {state === "flagged" && <span className="text-[10px]">⚑</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted" aria-label="Leyenda">
        <li className="flex items-center gap-1">
          <span aria-hidden="true" className="font-bold text-electric">✓</span> Contestada
        </li>
        <li className="flex items-center gap-1">
          <span aria-hidden="true" className="font-bold text-amber-600">⚑</span> Para revisar
        </li>
        <li className="flex items-center gap-1">
          <span aria-hidden="true" className="inline-block h-3 w-3 rounded border-2 border-line bg-offwhite" />{" "}
          Sin contestar
        </li>
      </ul>
    </nav>
  );
}
