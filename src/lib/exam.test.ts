import { describe, expect, it } from "vitest";
import type { Question } from "../types/question";
import {
  buildRecommendation,
  createSession,
  remainingSeconds,
  scoreExam,
  type ExamSession,
} from "./exam";

/* ——————————————— utilidades ——————————————— */

function makeQuestion(
  id: string,
  category = "normas-circulacion",
  correctAnswer = 0,
): Question {
  return {
    id,
    question: `Pregunta ${id}`,
    answers: [`A-${id}`, `B-${id}`, `C-${id}`],
    correctAnswer,
    explanation: `Explicación ${id}`,
    category,
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "Banco sintético de test",
    sourceReference: "test",
    legalReference: "Art. 1 Test",
    lastVerified: "2026-10-06",
    active: true,
    tags: [],
  };
}

function makeBank(n: number): Question[] {
  return Array.from({ length: n }, (_, i) => makeQuestion(`q-${i + 1}`));
}

/** RNG determinista (mulberry32) para tests reproducibles. */
function seededRng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sessionWithAnswers(
  bank: Question[],
  selected: (number | null)[],
  startedAt = 1_000_000,
): ExamSession {
  return {
    id: "test-session",
    startedAt,
    timeLimitSec: 1800,
    questions: bank,
    answers: bank.map((q, i) => ({
      questionId: q.id,
      selected: selected[i] ?? null,
      flagged: false,
    })),
  };
}

/* ——————————————— createSession ——————————————— */

describe("createSession", () => {
  it("genera 30 preguntas sin duplicados de un banco de 40", () => {
    const session = createSession(makeBank(40), 30, 1800, seededRng(42));
    expect(session.questions).toHaveLength(30);
    const ids = session.questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(30);
    expect(session.answers).toHaveLength(30);
    expect(session.answers.map((a) => a.questionId)).toEqual(ids);
    expect(session.answers.every((a) => a.selected === null && !a.flagged)).toBe(true);
  });

  it("es determinista con la misma semilla y distinto con otra", () => {
    const bank = makeBank(40);
    const a = createSession(bank, 30, 1800, seededRng(7)).questions.map((q) => q.id);
    const b = createSession(bank, 30, 1800, seededRng(7)).questions.map((q) => q.id);
    const c = createSession(bank, 30, 1800, seededRng(99)).questions.map((q) => q.id);
    expect(a).toEqual(b);
    expect(a).not.toEqual(c);
  });

  it("si el banco tiene menos preguntas que count, usa todas", () => {
    const session = createSession(makeBank(5), 30, 1800, seededRng(1));
    expect(session.questions).toHaveLength(5);
  });

  it("NO baraja el orden de las respuestas dentro de la pregunta", () => {
    const bank = makeBank(40);
    const session = createSession(bank, 30, 1800, seededRng(3));
    const byId = new Map(bank.map((q) => [q.id, q]));
    for (const q of session.questions) {
      const original = byId.get(q.id);
      expect(q.answers).toEqual(original?.answers);
      expect(q.correctAnswer).toBe(original?.correctAnswer);
    }
  });
});

/* ——————————————— scoreExam ——————————————— */

describe("scoreExam", () => {
  const bank = [
    makeQuestion("q-1", "cat-a", 0),
    makeQuestion("q-2", "cat-a", 1),
    makeQuestion("q-3", "cat-b", 2),
    makeQuestion("q-4", "cat-b", 0),
  ];

  it("APTO con 0, 1, 2 y 3 fallos", () => {
    for (const errors of [0, 1, 2, 3]) {
      const selected: (number | null)[] = [0, 1, 2, 0];
      for (let i = 0; i < errors; i++) selected[i] = (selected[i] as number) + 1 > 2 ? 0 : ((selected[i] as number) + 1);
      const scored = scoreExam(sessionWithAnswers(bank, selected), 1_000_000, 3);
      expect(scored.errors).toBe(errors);
      expect(scored.passed).toBe(true);
    }
  });

  it("NO APTO con 4 o más fallos", () => {
    const scored = scoreExam(sessionWithAnswers(bank, [1, 0, 1, 1]), 1_000_000, 3);
    expect(scored.errors).toBe(4);
    expect(scored.passed).toBe(false);
  });

  it("las preguntas en blanco cuentan como error", () => {
    // 3 falladas + 1 en blanco = 4 errores → NO APTO
    const scored = scoreExam(sessionWithAnswers(bank, [1, 0, 1, null]), 1_000_000, 3);
    expect(scored.blank).toBe(1);
    expect(scored.errors).toBe(4);
    expect(scored.correct).toBe(0);
    expect(scored.passed).toBe(false);
  });

  it("una sola en blanco con 0 falladas es APTO con 1 error", () => {
    const scored = scoreExam(sessionWithAnswers(bank, [0, 1, 2, null]), 1_000_000, 3);
    expect(scored.blank).toBe(1);
    expect(scored.errors).toBe(1);
    expect(scored.passed).toBe(true);
  });

  it("calcula durationSec redondeado y percentage", () => {
    const scored = scoreExam(sessionWithAnswers(bank, [0, 1, 2, 0]), 1_001_490, 3);
    expect(scored.durationSec).toBe(1);
    const scored2 = scoreExam(sessionWithAnswers(bank, [0, 1, 2, 0]), 1_001_500, 3);
    expect(scored2.durationSec).toBe(2);
    expect(scored.percentage).toBe(100);
    const scored3 = scoreExam(sessionWithAnswers(bank, [1, 0, 1, 1]), 1_000_000, 3);
    expect(scored3.percentage).toBe(0);
  });

  it("agrega estadísticas por categoría", () => {
    const scored = scoreExam(sessionWithAnswers(bank, [0, 0, 2, null]), 1_000_000, 3);
    expect(scored.byCategory["cat-a"]).toEqual({ correct: 1, total: 2, errors: 1 });
    expect(scored.byCategory["cat-b"]).toEqual({ correct: 1, total: 2, errors: 1 });
  });
});

/* ——————————————— remainingSeconds ——————————————— */

describe("remainingSeconds", () => {
  it("calcula el tiempo restante por diferencia de timestamps", () => {
    const session: ExamSession = {
      id: "s",
      startedAt: 1_000_000,
      timeLimitSec: 1800,
      questions: [],
      answers: [],
    };
    expect(remainingSeconds(session, 1_000_000)).toBe(1800);
    expect(remainingSeconds(session, 1_100_000)).toBe(1700);
    expect(remainingSeconds(session, 2_799_999)).toBe(1);
  });

  it("se satura en 0 cuando se agota el tiempo", () => {
    const session: ExamSession = {
      id: "s",
      startedAt: 1_000_000,
      timeLimitSec: 1800,
      questions: [],
      answers: [],
    };
    expect(remainingSeconds(session, 2_800_000)).toBe(0);
    expect(remainingSeconds(session, 9_999_999)).toBe(0);
  });
});

/* ——————————————— buildRecommendation ——————————————— */

describe("buildRecommendation", () => {
  const labels = { "cat-a": "Categoría A", "cat-b": "Categoría B", "cat-c": "Categoría C" };

  function scoredWith(stats: Record<string, { correct: number; total: number; errors: number }>) {
    return {
      correct: 0,
      errors: 0,
      blank: 0,
      total: 0,
      percentage: 100,
      passed: true,
      durationSec: 0,
      byCategory: stats,
    };
  }

  it("mensaje de refuerzo si no hay errores", () => {
    const scored = scoredWith({ "cat-a": { correct: 2, total: 2, errors: 0 } });
    expect(buildRecommendation(scored, labels)).toMatch(/ningún error/i);
  });

  it("cita las 2 peores categorías con peor porcentaje primero", () => {
    const scored = scoredWith({
      "cat-a": { correct: 1, total: 2, errors: 1 }, // 50 %
      "cat-b": { correct: 0, total: 2, errors: 2 }, // 0 %
      "cat-c": { correct: 2, total: 2, errors: 0 },
    });
    const text = buildRecommendation(scored, labels);
    expect(text).toMatch(/^Conviene repasar especialmente /);
    expect(text.indexOf("Categoría B")).toBeLessThan(text.indexOf("Categoría A"));
    expect(text).not.toContain("Categoría C");
  });

  it("como máximo 3 categorías y solo con al menos 1 error", () => {
    const scored = scoredWith({
      "cat-a": { correct: 0, total: 1, errors: 1 },
      "cat-b": { correct: 0, total: 1, errors: 1 },
      "cat-c": { correct: 0, total: 1, errors: 1 },
      "otra": { correct: 0, total: 1, errors: 1 },
    });
    const text = buildRecommendation(scored, { ...labels, otra: "Otra" });
    expect(text.match(/Categoría|Otra/g)?.length).toBe(3);
  });

  it("es determinista", () => {
    const scored = scoredWith({
      "cat-a": { correct: 0, total: 2, errors: 2 },
      "cat-b": { correct: 1, total: 2, errors: 1 },
    });
    expect(buildRecommendation(scored, labels)).toBe(buildRecommendation(scored, labels));
  });
});

/* ——————————————— banco offline ——————————————— */

describe("banco de preguntas offline", () => {
  it("el banco se importa localmente sin red y tiene preguntas activas", async () => {
    const { questionBank } = await import("../data/questions");
    expect(questionBank.filter((q) => q.active).length).toBeGreaterThan(0);
    expect(questionBank.length).toBeGreaterThanOrEqual(30);
  });
});
