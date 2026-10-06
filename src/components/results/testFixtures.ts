/**
 * Fixtures sintéticos para los tests de resultados y PDF.
 * Solo se importan desde ficheros *.test.ts; no forman parte del bundle.
 */
import type { ExamRecord } from "../../services/history";
import type { Question } from "../../types/question";

export function makeQuestion(
  overrides: Partial<Question> & { id: string },
): Question {
  return {
    question: "¿Pregunta de ejemplo?",
    answers: ["Respuesta A", "Respuesta B", "Respuesta C"],
    correctAnswer: 1,
    explanation: "Explicación de ejemplo.",
    category: "normas-circulacion",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "Banco de ejemplo",
    sourceReference: "https://example.com",
    legalReference: "Art. 1 Ejemplo",
    lastVerified: "2026-10-06",
    active: true,
    tags: [],
    ...overrides,
  };
}

export function makeRecord(
  overrides: Partial<ExamRecord> & { id: string },
): ExamRecord {
  return {
    date: "2026-10-06T08:00:00.000Z",
    questionIds: ["q1", "q2", "q3"],
    answers: [1, 0, null],
    correct: 1,
    errors: 1,
    blank: 1,
    total: 3,
    durationSec: 1636,
    passed: true,
    byCategory: {
      "normas-circulacion": { correct: 1, total: 2 },
      percepcion: { correct: 0, total: 1 },
    },
    recommendation: "Recomendación de ejemplo.",
    mode: "simulacro",
    ...overrides,
  };
}
