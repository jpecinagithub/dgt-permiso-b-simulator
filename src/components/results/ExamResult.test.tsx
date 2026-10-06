import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ExamResult from "./ExamResult";
import { makeQuestion, makeRecord } from "./testFixtures";
import type { Question } from "../../types/question";
import type { ExamRecord } from "../../services/history";

function renderResult(
  recordOverrides: Partial<ExamRecord> = {},
  questionOverrides: Partial<Question>[] = [],
) {
  const questions = [
    makeQuestion({ id: "q1", question: "¿Primera?", correctAnswer: 1 }),
    makeQuestion({ id: "q2", question: "¿Segunda?", correctAnswer: 0 }),
    makeQuestion({ id: "q3", question: "¿Tercera?", correctAnswer: 2 }),
  ].map((q, i) => ({ ...q, ...(questionOverrides[i] ?? {}) }));
  const record = makeRecord({ id: "rec-1", ...recordOverrides });
  const onToggleReview = vi.fn();
  const onDownloadPdf = vi.fn();

  render(
    <MemoryRouter>
      <ExamResult
        record={record}
        questions={questions}
        reviewOpen={false}
        onToggleReview={onToggleReview}
        onDownloadPdf={onDownloadPdf}
        downloading={false}
      />
    </MemoryRouter>,
  );
  return { record, onToggleReview, onDownloadPdf };
}

describe("ExamResult", () => {
  it("muestra la insignia APTO con icono y estadísticas", () => {
    renderResult({ passed: true, correct: 27, errors: 3, blank: 0, total: 30 });

    expect(
      screen.getByRole("heading", { name: "APTO" }),
    ).toBeInTheDocument();
    expect(screen.getByText("27 / 30 correctas")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument(); // errores
    expect(screen.getByText("27:16")).toBeInTheDocument(); // duración 1636 s
    expect(screen.getByText("90 %")).toBeInTheDocument(); // % aciertos
  });

  it("muestra NO APTO cuando no se supera el examen", () => {
    renderResult({ passed: false, correct: 24, errors: 6, blank: 0, total: 30 });

    expect(
      screen.getByRole("heading", { name: "NO APTO" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "APTO" })).not.toBeInTheDocument();
  });

  it("muestra el nombre del usuario cuando existe", () => {
    render(
      <MemoryRouter>
        <ExamResult
          record={makeRecord({ id: "r" })}
          questions={[makeQuestion({ id: "q1" })]}
          userName="Ada"
          reviewOpen={false}
          onToggleReview={vi.fn()}
          onDownloadPdf={vi.fn()}
          downloading={false}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Ada")).toBeInTheDocument();
  });

  it("el botón de revisión alterna aria-expanded y avisa al padre", () => {
    const { onToggleReview } = renderResult();
    const btn = screen.getByRole("button", { name: "Revisar examen" });

    expect(btn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(btn);
    expect(onToggleReview).toHaveBeenCalledTimes(1);
  });

  it("el botón de PDF llama a la descarga", () => {
    const { onDownloadPdf } = renderResult();
    fireEvent.click(
      screen.getByRole("button", { name: "Descargar evaluación en PDF" }),
    );
    expect(onDownloadPdf).toHaveBeenCalledTimes(1);
  });

  it("muestra la recomendación de repaso", () => {
    renderResult({ recommendation: "Repasa las señales de stop." });
    expect(
      screen.getByText("Repasa las señales de stop."),
    ).toBeInTheDocument();
  });

  it("los enlaces de repetir e inicio apuntan a las rutas correctas", () => {
    renderResult();
    expect(screen.getByRole("link", { name: "Repetir simulacro" })).toHaveAttribute(
      "href",
      "/simulacro",
    );
    expect(screen.getByRole("link", { name: "Volver al inicio" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
