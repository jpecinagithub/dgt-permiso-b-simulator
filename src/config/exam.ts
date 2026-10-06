/**
 * Configuración central del simulador.
 *
 * Formato del examen teórico del permiso B verificado el 2026-10-06
 * (RD 818/2009, Anexo VI, B; declaración oficial DGT, septiembre 2026).
 * Ver docs/research.md para las fuentes y el detalle.
 */
export const EXAM_CONFIG = {
  bankVersion: "1.0.0",
  legalReviewDate: "2026-10-06",
  questionCount: 30,
  optionsPerQuestion: 3,
  timeLimitMinutes: 30,
  maxErrors: 3,
  passRate: 0.9, // APTO si aciertos >= 90% (equivale a <=3 errores en 30)
  blankCountsAsError: true, // decisión del simulador: la norma no regula las preguntas en blanco; documentado
  videoQuestions: { enabled: false, maxViews: 2, lockUntilWatched: true },
} as const;

/**
 * Determina si un resultado es APTO.
 * Criterio oficial: los errores no pueden superar el 10 % de las preguntas
 * (Anexo VI, B) 3 del RD 818/2009); con 30 preguntas, máximo 3 errores.
 */
export function isPassed(errors: number): boolean {
  return errors <= EXAM_CONFIG.maxErrors;
}
