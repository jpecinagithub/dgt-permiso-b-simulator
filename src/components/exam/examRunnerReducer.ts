import type { ExamAnswer, ExamSession } from "../../lib/exam";

/**
 * Estado de UI del runner del examen (navegación y respuestas).
 * La lógica de negocio (generación, corrección) vive en src/lib/exam;
 * aquí solo hay estado de interacción, testeable sin DOM.
 */

export interface RunnerState {
  answers: ExamAnswer[];
  currentIndex: number;
}

export type RunnerAction =
  | { type: "select"; index: number; option: number }
  | { type: "toggle-flag"; index: number }
  | { type: "go"; index: number }
  | { type: "next" }
  | { type: "prev" };

export function initRunner(session: ExamSession): RunnerState {
  return { answers: session.answers, currentIndex: 0 };
}

export function examRunnerReducer(state: RunnerState, action: RunnerAction): RunnerState {
  const last = state.answers.length - 1;
  switch (action.type) {
    case "select": {
      if (action.index < 0 || action.index > last) return state;
      const answers = state.answers.map((a, i) =>
        i === action.index ? { ...a, selected: action.option } : a,
      );
      return { ...state, answers };
    }
    case "toggle-flag": {
      if (action.index < 0 || action.index > last) return state;
      const answers = state.answers.map((a, i) =>
        i === action.index ? { ...a, flagged: !a.flagged } : a,
      );
      return { ...state, answers };
    }
    case "go":
      return { ...state, currentIndex: Math.min(Math.max(action.index, 0), Math.max(last, 0)) };
    case "next":
      return { ...state, currentIndex: Math.min(state.currentIndex + 1, Math.max(last, 0)) };
    case "prev":
      return { ...state, currentIndex: Math.max(state.currentIndex - 1, 0) };
  }
}
