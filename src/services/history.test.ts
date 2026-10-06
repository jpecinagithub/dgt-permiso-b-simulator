import "fake-indexeddb/auto";
import { beforeEach, describe, expect, it } from "vitest";
import { questionBank } from "../data/questions";
import {
  clearHistory,
  deleteExamRecord,
  getExamRecord,
  getFailedQuestionIds,
  listExamRecords,
  MAX_HISTORY_RECORDS,
  saveExamRecord,
  type ExamRecord,
} from "./history";

/* ——————————————— utilidades ——————————————— */

type RecordInput = Omit<ExamRecord, "id" | "date">;

function makeRecordInput(partial: Partial<RecordInput> = {}): RecordInput {
  return {
    questionIds: ["q-1", "q-2"],
    answers: [0, 1],
    correct: 1,
    errors: 1,
    blank: 0,
    total: 2,
    durationSec: 120,
    passed: true,
    byCategory: { "cat-a": { correct: 1, total: 2 } },
    recommendation: "Recomendación de test",
    mode: "simulacro",
    ...partial,
  };
}

/** Pequeña pausa real para que dos guardados no compartan el mismo ms. */
function tick(ms = 5): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

beforeEach(async () => {
  await clearHistory();
});

/* ——————————————— CRUD ——————————————— */

describe("saveExamRecord / listExamRecords / getExamRecord", () => {
  it("guarda generando id y date, y lo lista", async () => {
    const saved = await saveExamRecord(makeRecordInput());
    expect(saved.id).toBeTruthy();
    expect(saved.date).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    const list = await listExamRecords();
    expect(list).toHaveLength(1);
    expect(list[0]).toEqual(saved);
  });

  it("ordena por fecha descendente", async () => {
    const first = await saveExamRecord(makeRecordInput({ total: 2 }));
    await tick();
    const second = await saveExamRecord(makeRecordInput({ total: 3 }));
    const list = await listExamRecords();
    expect(list.map((r) => r.id)).toEqual([second.id, first.id]);
  });

  it("getExamRecord devuelve el registro y undefined si no existe", async () => {
    const saved = await saveExamRecord(makeRecordInput());
    const found = await getExamRecord(saved.id);
    expect(found).toEqual(saved);
    expect(await getExamRecord("no-existe")).toBeUndefined();
  });

  it("deleteExamRecord elimina el registro", async () => {
    const saved = await saveExamRecord(makeRecordInput());
    await deleteExamRecord(saved.id);
    expect(await listExamRecords()).toHaveLength(0);
  });

  it("clearHistory vacía el historial", async () => {
    await saveExamRecord(makeRecordInput());
    await saveExamRecord(makeRecordInput());
    await clearHistory();
    expect(await listExamRecords()).toHaveLength(0);
  });
});

/* ——————————————— límite de 10 ——————————————— */

describe("límite de registros", () => {
  it("guarda 11 y conserva solo los 10 más recientes", async () => {
    const ids: string[] = [];
    for (let i = 0; i < MAX_HISTORY_RECORDS + 1; i++) {
      const saved = await saveExamRecord(makeRecordInput({ durationSec: i }));
      ids.push(saved.id);
      await tick();
    }
    const list = await listExamRecords();
    expect(list).toHaveLength(MAX_HISTORY_RECORDS);
    // El más antiguo (primer guardado) se ha eliminado.
    expect(list.map((r) => r.id)).not.toContain(ids[0]);
    expect(list.map((r) => r.id)).toContain(ids[ids.length - 1]);
    // Orden descendente por fecha.
    const dates = list.map((r) => r.date);
    expect([...dates].sort().reverse()).toEqual(dates);
  });
});

/* ——————————————— fallos ——————————————— */

describe("getFailedQuestionIds", () => {
  it("devuelve ids fallados y en blanco del historial", async () => {
    const [q1, q2, q3] = questionBank.slice(0, 3);
    const wrongForQ2 = q2.correctAnswer === 0 ? 1 : 0;
    await saveExamRecord(
      makeRecordInput({
        questionIds: [q1.id, q2.id, q3.id],
        answers: [q1.correctAnswer, wrongForQ2, null],
        correct: 1,
        errors: 2,
        blank: 1,
        total: 3,
      }),
    );
    const failed = await getFailedQuestionIds();
    expect(failed).toContain(q2.id);
    expect(failed).toContain(q3.id);
    expect(failed).not.toContain(q1.id);
  });

  it("devuelve vacío si no hay fallos en el historial", async () => {
    const [q1] = questionBank.slice(0, 1);
    await saveExamRecord(
      makeRecordInput({
        questionIds: [q1.id],
        answers: [q1.correctAnswer],
        correct: 1,
        errors: 0,
        blank: 0,
        total: 1,
      }),
    );
    expect(await getFailedQuestionIds()).toEqual([]);
  });

  it("devuelve vacío con el historial vacío", async () => {
    expect(await getFailedQuestionIds()).toEqual([]);
  });
});
