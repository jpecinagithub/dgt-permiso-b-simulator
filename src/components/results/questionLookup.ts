/**
 * Utilidades compartidas por las pantallas de resultados.
 *
 * - Resuelve las preguntas de un examen a partir de los ids guardados en el
 *   ExamRecord (el banco es estático, así que se buscan en `questionBank`).
 * - Descarga el informe PDF de un examen ya guardado en el historial.
 * - Lee el nombre del usuario para el PDF (clave "dgt-sim-user-name").
 */
import { EXAM_CONFIG } from "../../config/exam";
import { questionBank } from "../../data/questions/index";
import type { ExamRecord } from "../../services/history";
import type { Question } from "../../types/question";
import {
  buildPdfFilename,
  downloadPdf,
  generateExamPdf,
} from "../../lib/pdf";

/**
 * Devuelve las preguntas del examen en el orden de `questionIds`.
 * Si alguna ya no está en el banco, se sustituye por un marcador para
 * mantener el alineamiento con `record.answers`.
 */
export function resolveExamQuestions(questionIds: string[]): Question[] {
  const byId = new Map(questionBank.map((q) => [q.id, q]));
  return questionIds.map((id) => byId.get(id) ?? missingQuestion(id));
}

function missingQuestion(id: string): Question {
  return {
    id,
    question: "Esta pregunta ya no está disponible en el banco actual.",
    answers: ["—", "—", "—"],
    correctAnswer: 0,
    explanation:
      "El banco de preguntas se actualizó después de realizar este examen.",
    category: "normas-circulacion",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "—",
    sourceReference: "—",
    legalReference: "—",
    lastVerified: EXAM_CONFIG.legalReviewDate,
    active: false,
    tags: [],
  };
}

/**
 * Clave de localStorage con el nombre opcional del alumno para el PDF.
 * La escribe la pantalla previa del simulacro (src/pages/ExamPage.tsx,
 * constante exportada STUDENT_NAME_KEY). Se duplica aquí el literal para
 * no acoplar este helper a la página; si cambia allí, debe cambiar aquí.
 */
const STUDENT_NAME_KEY = "dgt-sim:studentName";

/** Nombre del usuario para el informe PDF, si la pantalla previa lo guardó. */
export function readUserName(): string | undefined {
  try {
    const name = localStorage.getItem(STUDENT_NAME_KEY);
    return name && name.trim() ? name : undefined;
  } catch {
    return undefined;
  }
}

/** Genera y descarga el PDF de evaluación de un examen del historial. */
export async function downloadExamRecordPdf(
  record: ExamRecord,
  userName?: string,
): Promise<void> {
  const bytes = await generateExamPdf({
    record,
    questions: resolveExamQuestions(record.questionIds),
    userName,
    appName: "DGT Test Simulator — Permiso B",
    legalReviewDate: EXAM_CONFIG.legalReviewDate,
  });
  downloadPdf(bytes, buildPdfFilename(record));
}
