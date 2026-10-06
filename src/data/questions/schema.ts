import { z } from "zod";

/**
 * Copia local del contrato de datos del banco de preguntas.
 * El andamiaje define este mismo schema en `src/types/question.ts`;
 * este fichero existe para validar el banco de forma autónoma.
 * NO modificar el shape sin coordinarlo con el otro agente.
 */

/** Las 16 materias de la prueba común de conocimientos (Anexo V, B) 1 del RD 818/2009). */
export const CATEGORY_KEYS = [
  "normas-circulacion",
  "accidentes-causas",
  "convivencia",
  "percepcion",
  "distancias",
  "calzada-clima",
  "la-via",
  "vulnerables",
  "tipos-vehiculos",
  "documentacion",
  "auxilio",
  "carga",
  "abandono",
  "mecanica",
  "retencion",
  "medio-ambiente",
] as const;

export type CategoryKey = (typeof CATEGORY_KEYS)[number];

export const QuestionSchema = z.object({
  id: z.string().min(1), // único, kebab-case, ej. "norm-001"
  question: z.string().min(1),
  answers: z.tuple([z.string(), z.string(), z.string()]), // EXACTAMENTE 3
  correctAnswer: z.number().int().min(0).max(2),
  explanation: z.string().min(1),
  category: z.string().min(1), // una de las 16 keys de CATEGORY_KEYS
  difficulty: z.enum(["easy", "medium", "hard"]),
  sourceType: z.enum(["equivalent-practice", "official-published"]), // casi todo será equivalent-practice
  sourceTitle: z.string().min(1),
  sourceReference: z.string().min(1),
  legalReference: z.string().min(1), // norma concreta, ej. "Art. 85 RGC"
  lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // "2026-10-06"
  image: z.string().optional(), // clave de QUESTION_ART
  video: z.string().optional(),
  active: z.boolean(),
  tags: z.array(z.string()),
});

export type Question = z.infer<typeof QuestionSchema>;
