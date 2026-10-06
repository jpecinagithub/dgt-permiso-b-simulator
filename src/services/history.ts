import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import { questionBank } from "../data/questions";

/**
 * Historial de exámenes en IndexedDB (base "dgt-sim", store "exams").
 *
 * Se guardan como máximo los últimos 10 registros: cada guardado elimina
 * los más antiguos. Todo el banco es local, así que funciona sin conexión.
 */

export interface ExamRecord {
  id: string;
  date: string; // ISO
  questionIds: string[];
  answers: (number | null)[];
  correct: number;
  errors: number;
  blank: number;
  total: number;
  durationSec: number;
  passed: boolean;
  byCategory: Record<string, { correct: number; total: number }>;
  recommendation: string;
  mode: "simulacro" | "practica";
}

/** Número máximo de registros que se conservan en el historial. */
export const MAX_HISTORY_RECORDS = 10;

interface DgtSimDB extends DBSchema {
  exams: {
    key: string;
    value: ExamRecord;
    indexes: { "by-date": string };
  };
}

const DB_NAME = "dgt-sim";
const STORE = "exams";

let dbPromise: Promise<IDBPDatabase<DgtSimDB>> | null = null;

function getDb(): Promise<IDBPDatabase<DgtSimDB>> {
  if (!dbPromise) {
    dbPromise = openDB<DgtSimDB>(DB_NAME, 1, {
      upgrade(db) {
        const store = db.createObjectStore(STORE, { keyPath: "id" });
        store.createIndex("by-date", "date");
      },
    });
  }
  return dbPromise;
}

function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `exam-${Date.now()}-${Math.floor(Math.random() * 1e9).toString(36)}`;
}

/**
 * Guarda un registro generando `id` y `date`, y elimina los más antiguos
 * quedándose con los últimos 10.
 */
export async function saveExamRecord(
  r: Omit<ExamRecord, "id" | "date">,
): Promise<ExamRecord> {
  const db = await getDb();
  const record: ExamRecord = {
    ...r,
    id: generateId(),
    date: new Date().toISOString(),
  };
  const tx = db.transaction(STORE, "readwrite");
  await tx.store.put(record);
  // Poda: conservar solo los 10 más recientes (fecha desc).
  const all = await tx.store.index("by-date").getAll();
  if (all.length > MAX_HISTORY_RECORDS) {
    const toDelete = all
      .slice(0, all.length - MAX_HISTORY_RECORDS)
      .map((rec) => rec.id);
    await Promise.all(toDelete.map((id) => tx.store.delete(id)));
  }
  await tx.done;
  return record;
}

/** Lista los registros ordenados por fecha descendente (más recientes primero). */
export async function listExamRecords(): Promise<ExamRecord[]> {
  const db = await getDb();
  const all = await db.getAllFromIndex(STORE, "by-date");
  return all.reverse();
}

export async function getExamRecord(id: string): Promise<ExamRecord | undefined> {
  const db = await getDb();
  return db.get(STORE, id);
}

export async function deleteExamRecord(id: string): Promise<void> {
  const db = await getDb();
  await db.delete(STORE, id);
}

export async function clearHistory(): Promise<void> {
  const db = await getDb();
  await db.clear(STORE);
}

/**
 * Ids de preguntas falladas o dejadas en blanco en todo el historial,
 * para "Repasar mis fallos". Se resuelve contra el banco local (las
 * preguntas que ya no existan en el banco se ignoran).
 */
export async function getFailedQuestionIds(): Promise<string[]> {
  const records = await listExamRecords();
  const byId = new Map(questionBank.map((q) => [q.id, q]));
  const failed = new Set<string>();
  for (const record of records) {
    for (let i = 0; i < record.questionIds.length; i++) {
      const id = record.questionIds[i];
      const question = byId.get(id);
      if (!question) continue;
      const selected = record.answers[i] ?? null;
      if (selected === null || selected !== question.correctAnswer) {
        failed.add(id);
      }
    }
  }
  return [...failed];
}
