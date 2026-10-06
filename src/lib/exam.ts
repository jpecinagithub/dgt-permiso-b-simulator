import type { Question } from "../types/question";

/**
 * Lógica pura del motor de examen (sin DOM, sin estado, sin E/S).
 *
 * Toda la lógica de negocio del simulacro vive aquí para poder testearla
 * al 100 % sin componentes: los componentes solo presentan y delegan.
 */

export interface ExamAnswer {
  questionId: string;
  selected: number | null;
  flagged: boolean;
}

export interface ExamSession {
  id: string;
  startedAt: number;
  timeLimitSec: number;
  questions: Question[];
  answers: ExamAnswer[];
}

/** Genera un id único sin depender de APIs no disponibles en todos los entornos. */
function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `exam-${Date.now()}-${Math.floor(Math.random() * 1e9).toString(36)}`;
}

/**
 * Crea una sesión de examen eligiendo `count` preguntas aleatorias sin
 * duplicados (Fisher-Yates con `rng` inyectable para tests deterministas).
 * Si el banco tiene menos de `count` preguntas, usa todas las disponibles.
 *
 * NO baraja el orden de las respuestas dentro de cada pregunta: las
 * posiciones correctas ya vienen repartidas en el banco.
 */
export function createSession(
  bank: Question[],
  count: number,
  timeLimitSec: number,
  rng: () => number = Math.random,
): ExamSession {
  const copy = [...bank];
  // Fisher-Yates completo: barajado uniforme con la rng inyectada.
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  const questions = copy.slice(0, Math.max(0, Math.min(count, copy.length)));
  return {
    id: generateId(),
    startedAt: Date.now(),
    timeLimitSec,
    questions,
    answers: questions.map((q) => ({
      questionId: q.id,
      selected: null,
      flagged: false,
    })),
  };
}

export interface CategoryStat {
  correct: number;
  total: number;
  errors: number;
}

export interface ScoredExam {
  correct: number;
  errors: number;
  blank: number;
  total: number;
  percentage: number;
  passed: boolean;
  durationSec: number;
  byCategory: Record<string, CategoryStat>;
}

/**
 * Corrige una sesión de examen.
 *
 * - `blank` (selected === null) cuenta como error: decisión del simulador,
 *   documentada (la norma no regula las preguntas en blanco).
 * - `passed = errors <= maxErrors`.
 * - `durationSec = (nowMs - startedAt) / 1000`, redondeado al entero.
 */
export function scoreExam(
  session: ExamSession,
  nowMs: number,
  maxErrors: number,
): ScoredExam {
  const byCategory: Record<string, CategoryStat> = {};
  let correct = 0;
  let errors = 0;
  let blank = 0;

  for (let i = 0; i < session.questions.length; i++) {
    const q = session.questions[i];
    const answer = session.answers[i];
    const selected = answer?.selected ?? null;

    let stat = byCategory[q.category];
    if (!stat) {
      stat = { correct: 0, total: 0, errors: 0 };
      byCategory[q.category] = stat;
    }
    stat.total++;

    if (selected === null) {
      blank++;
      errors++;
      stat.errors++;
    } else if (selected === q.correctAnswer) {
      correct++;
      stat.correct++;
    } else {
      errors++;
      stat.errors++;
    }
  }

  const total = session.questions.length;
  return {
    correct,
    errors,
    blank,
    total,
    percentage: total === 0 ? 0 : (correct / total) * 100,
    passed: errors <= maxErrors,
    durationSec: Math.max(0, Math.round((nowMs - session.startedAt) / 1000)),
    byCategory,
  };
}

/**
 * Segundos restantes de una sesión en el instante `nowMs`.
 * Basado en timestamps (no en contadores acumulativos): sobrevive a
 * cambios de pestaña y a temporizadores pausados por el navegador.
 * Nunca negativo: se satura en 0.
 */
export function remainingSeconds(session: ExamSession, nowMs: number): number {
  const elapsed = Math.floor((nowMs - session.startedAt) / 1000);
  return Math.max(0, session.timeLimitSec - elapsed);
}

/**
 * Recomendación de repaso determinista, sin IA.
 *
 * Toma las 2-3 categorías con peor porcentaje de acierto (entre las que
 * tienen al menos 1 error) y construye una frase como:
 * "Conviene repasar especialmente límites de velocidad y señales de prioridad."
 * Si no hay ningún error, devuelve un mensaje de refuerzo.
 */
export function buildRecommendation(
  scored: ScoredExam,
  categoryLabels: Record<string, string>,
): string {
  const weak = Object.entries(scored.byCategory)
    .filter(([, stat]) => stat.errors > 0 && stat.total > 0)
    .map(([key, stat]) => ({
      key,
      pct: (stat.correct / stat.total) * 100,
      total: stat.total,
    }))
    .sort((a, b) => b.total - a.total) // desempate estable: más preguntas primero
    .sort((a, b) => a.pct - b.pct); // peor porcentaje primero

  if (weak.length === 0) {
    return "Pleno: no has cometido ningún error. Mantén el ritmo con repasos periódicos para llegar al examen con la misma solidez.";
  }

  const names = weak
    .slice(0, 3)
    .map(({ key }) => categoryLabels[key] ?? key);

  return `Conviene repasar especialmente ${joinSpanish(names)}.`;
}

/** Une una lista en español: "a", "a y b", "a, b y c". */
function joinSpanish(names: string[]): string {
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} y ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} y ${names[names.length - 1]}`;
}
