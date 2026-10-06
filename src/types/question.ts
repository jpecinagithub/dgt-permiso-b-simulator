import { z } from "zod";

/**
 * Contrato del banco de preguntas.
 *
 * El agente del banco implementa contra este schema. No modificar sin
 * coordinar con el script de validación (scripts/validate-questions.ts)
 * y con la fase 2 de funcionalidad.
 */
export const QuestionSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answers: z.tuple([z.string(), z.string(), z.string()]),
  correctAnswer: z.number().int().min(0).max(2),
  explanation: z.string().min(1),
  category: z.string().min(1),
  difficulty: z.enum(["easy", "medium", "hard"]),
  sourceType: z.enum(["equivalent-practice", "official-published"]),
  sourceTitle: z.string().min(1),
  sourceReference: z.string().min(1),
  legalReference: z.string().min(1),
  lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  image: z.string().optional(),
  video: z.string().optional(),
  active: z.boolean(),
  tags: z.array(z.string()),
});

export type Question = z.infer<typeof QuestionSchema>;

/**
 * Las 16 materias oficiales de la prueba común de conocimientos
 * (RD 818/2009, Anexo V, B) 1).
 */
export interface Category {
  key: string;
  label: string;
}

export const CATEGORIES: Category[] = [
  { key: "normas-circulacion", label: "Normas de circulación: señalización, prioridad y velocidad" },
  { key: "accidentes-causas", label: "Accidentes: factores y causas" },
  { key: "convivencia", label: "Vigilancia y actitudes respecto a otros usuarios" },
  { key: "percepcion", label: "Percepción, reacción, alcohol, drogas, fatiga y sueño" },
  { key: "distancias", label: "Distancias de seguridad, frenado y estabilidad" },
  { key: "calzada-clima", label: "Estado de la calzada, climatología y túneles" },
  { key: "la-via", label: "La vía: clases y partes" },
  { key: "vulnerables", label: "Usuarios vulnerables" },
  { key: "tipos-vehiculos", label: "Riesgos de los distintos tipos de vehículos" },
  { key: "documentacion", label: "Documentación" },
  { key: "auxilio", label: "Accidentes y primeros auxilios" },
  { key: "carga", label: "Carga y pasajeros" },
  { key: "abandono", label: "Abandono del vehículo" },
  { key: "mecanica", label: "Mecánica y seguridad" },
  { key: "retencion", label: "Cinturones, reposacabezas y retención infantil" },
  { key: "medio-ambiente", label: "Vehículo y medio ambiente" },
];

/** Mapa de clave de categoría → etiqueta, para búsquedas rápidas. */
export const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c.label]),
);

/** Valida una pregunta desconocida contra el schema. */
export function parseQuestion(value: unknown): Question {
  return QuestionSchema.parse(value);
}
