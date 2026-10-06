import { describe, expect, it } from "vitest";
import type { ExamAnswer } from "../../lib/exam";
import {
  examRunnerReducer,
  initRunner,
  type RunnerState,
} from "./examRunnerReducer";

function makeState(n = 5): RunnerState {
  const answers: ExamAnswer[] = Array.from({ length: n }, (_, i) => ({
    questionId: `q-${i + 1}`,
    selected: null,
    flagged: false,
  }));
  return { answers, currentIndex: 0 };
}

describe("examRunnerReducer", () => {
  it("initRunner parte de la primera pregunta sin respuestas", () => {
    const state = initRunner({
      id: "s",
      startedAt: 0,
      timeLimitSec: 1800,
      questions: [],
      answers: makeState(3).answers,
    });
    expect(state.currentIndex).toBe(0);
    expect(state.answers).toHaveLength(3);
  });

  it("next avanza y se detiene en la última", () => {
    let state = makeState(3);
    state = examRunnerReducer(state, { type: "next" });
    expect(state.currentIndex).toBe(1);
    state = examRunnerReducer(state, { type: "next" });
    expect(state.currentIndex).toBe(2);
    state = examRunnerReducer(state, { type: "next" });
    expect(state.currentIndex).toBe(2);
  });

  it("prev retrocede y se detiene en la primera", () => {
    let state = { ...makeState(3), currentIndex: 2 };
    state = examRunnerReducer(state, { type: "prev" });
    expect(state.currentIndex).toBe(1);
    state = examRunnerReducer(state, { type: "prev" });
    expect(state.currentIndex).toBe(0);
    state = examRunnerReducer(state, { type: "prev" });
    expect(state.currentIndex).toBe(0);
  });

  it("go salta a una pregunta y satura los límites", () => {
    let state = makeState(4);
    state = examRunnerReducer(state, { type: "go", index: 2 });
    expect(state.currentIndex).toBe(2);
    state = examRunnerReducer(state, { type: "go", index: 99 });
    expect(state.currentIndex).toBe(3);
    state = examRunnerReducer(state, { type: "go", index: -5 });
    expect(state.currentIndex).toBe(0);
  });

  it("select guarda la respuesta y permite cambiarla", () => {
    let state = makeState(3);
    state = examRunnerReducer(state, { type: "select", index: 1, option: 2 });
    expect(state.answers[1].selected).toBe(2);
    expect(state.answers[0].selected).toBeNull();
    state = examRunnerReducer(state, { type: "select", index: 1, option: 0 });
    expect(state.answers[1].selected).toBe(0);
  });

  it("toggle-flag marca y desmarca para revisar", () => {
    let state = makeState(3);
    state = examRunnerReducer(state, { type: "toggle-flag", index: 0 });
    expect(state.answers[0].flagged).toBe(true);
    state = examRunnerReducer(state, { type: "toggle-flag", index: 0 });
    expect(state.answers[0].flagged).toBe(false);
  });

  it("ignora índices fuera de rango", () => {
    const state = makeState(2);
    expect(examRunnerReducer(state, { type: "select", index: 9, option: 1 })).toBe(state);
    expect(examRunnerReducer(state, { type: "toggle-flag", index: -1 })).toBe(state);
  });
});
