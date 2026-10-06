import { describe, expect, it, vi, afterEach } from "vitest";
import { PDFDocument } from "pdf-lib";
import {
  buildPdfFilename,
  downloadPdf,
  generateExamPdf,
} from "./pdf";
import { makeQuestion, makeRecord } from "../components/results/testFixtures";
import type { PdfReportInput } from "./pdf";

function makeInput(passed: boolean): PdfReportInput {
  const questions = [
    makeQuestion({
      id: "q1",
      question: "¿Primera pregunta de ejemplo?",
      correctAnswer: 1,
      category: "normas-circulacion",
    }),
    makeQuestion({
      id: "q2",
      question: "¿Segunda pregunta de ejemplo?",
      correctAnswer: 0,
      category: "percepcion",
    }),
    makeQuestion({
      id: "q3",
      question: "¿Tercera pregunta de ejemplo?",
      correctAnswer: 2,
      category: "distancias",
    }),
  ];
  // q1 correcta, q2 fallada, q3 en blanco
  const record = makeRecord({
    id: "rec-1",
    questionIds: ["q1", "q2", "q3"],
    answers: [1, 2, null],
    correct: passed ? 2 : 1,
    errors: passed ? 1 : 2,
    blank: 1,
    total: 3,
    durationSec: 1636,
    passed,
    byCategory: {
      "normas-circulacion": { correct: 1, total: 1 },
      percepcion: { correct: 0, total: 1 },
      distancias: { correct: 0, total: 1 },
    },
    recommendation:
      "Recomendación de ejemplo: repasa las materias más flojas.",
  });
  return {
    record,
    questions,
    userName: "Ada",
    appName: "DGT Test Simulator — Permiso B",
    legalReviewDate: "2026-10-06",
  };
}

describe("generateExamPdf", () => {
  it("genera un PDF válido y no vacío con el informe del examen", async () => {
    const bytes = await generateExamPdf(makeInput(true));

    expect(bytes.length).toBeGreaterThan(500);
    expect(new TextDecoder().decode(bytes.subarray(0, 5))).toBe("%PDF-");

    const doc = await PDFDocument.load(bytes);
    expect(doc.getPageCount()).toBeGreaterThanOrEqual(1);
  });

  it("genera el informe también para un NO APTO y sin nombre de usuario", async () => {
    const input = makeInput(false);
    const bytes = await generateExamPdf({ ...input, userName: undefined });

    expect(bytes.length).toBeGreaterThan(500);
    expect(new TextDecoder().decode(bytes.subarray(0, 5))).toBe("%PDF-");
  });
});

describe("buildPdfFilename", () => {
  it("genera un nombre de fichero seguro con fecha y hora", () => {
    const record = makeRecord({ id: "x", date: "2026-10-06T08:05:00.000Z" });
    expect(buildPdfFilename(record)).toMatch(
      /^dgt-permiso-b-evaluacion-\d{8}-\d{4}\.pdf$/,
    );
  });
});

describe("downloadPdf", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("crea un Blob PDF, genera una URL de objeto y pulsa un enlace de descarga", () => {
    const createObjectURL = vi.fn((_blob: Blob) => "blob:fake-url");
    const revokeObjectURL = vi.fn((_url: string) => undefined);
    const originalCreate = URL.createObjectURL;
    const originalRevoke = URL.revokeObjectURL;
    URL.createObjectURL =
      createObjectURL as typeof URL.createObjectURL;
    URL.revokeObjectURL = revokeObjectURL as typeof URL.revokeObjectURL;

    let downloadAttr = "";
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(function (this: HTMLAnchorElement) {
        downloadAttr = this.download;
      });

    try {
      downloadPdf(new Uint8Array([37, 80, 68, 70]), "informe.pdf");
    } finally {
      URL.createObjectURL = originalCreate;
      URL.revokeObjectURL = originalRevoke;
    }

    expect(createObjectURL).toHaveBeenCalledTimes(1);
    const blob = createObjectURL.mock.calls[0]?.[0];
    expect(blob).toBeInstanceOf(Blob);
    expect(blob?.type).toBe("application/pdf");
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(downloadAttr).toBe("informe.pdf");
  });
});
