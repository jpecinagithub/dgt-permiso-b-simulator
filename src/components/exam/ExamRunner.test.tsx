import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ExamSession } from "../../lib/exam";
import type { Question } from "../../types/question";
import ExamRunner from "./ExamRunner";

function makeQuestion(id: string): Question {
  return {
    id,
    question: `¿Pregunta ${id}?`,
    answers: [`Respuesta A ${id}`, `Respuesta B ${id}`, `Respuesta C ${id}`],
    correctAnswer: 0,
    explanation: `Explicación de ${id}`,
    category: "normas-circulacion",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "Banco sintético de test",
    sourceReference: "test",
    legalReference: "Art. 1 Test",
    lastVerified: "2026-10-06",
    active: true,
    tags: [],
  };
}

function makeSession(): ExamSession {
  const questions = [makeQuestion("e-1"), makeQuestion("e-2"), makeQuestion("e-3")];
  return {
    id: "session-test",
    startedAt: Date.now(),
    timeLimitSec: 1800,
    questions,
    answers: questions.map((q) => ({ questionId: q.id, selected: null, flagged: false })),
  };
}

function renderRunner(onFinish = vi.fn()) {
  const result = render(<ExamRunner session={makeSession()} onFinish={onFinish} />);
  return { ...result, onFinish };
}

describe("ExamRunner", () => {
  it("muestra la primera pregunta y el temporizador", () => {
    renderRunner();
    expect(screen.getByRole("heading", { name: "¿Pregunta e-1?" })).toBeInTheDocument();
    expect(screen.getByRole("timer")).toBeInTheDocument();
    expect(screen.getByText(/Respondidas 0 de 3/)).toBeInTheDocument();
  });

  it("responde y avanza con el botón Siguiente; el navegador refleja el estado", () => {
    renderRunner();
    fireEvent.click(screen.getByRole("button", { name: /Respuesta B e-1/ }));
    expect(screen.getByText(/Respondidas 1 de 3/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Siguiente/ }));
    expect(screen.getByRole("heading", { name: "¿Pregunta e-2?" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pregunta 1, contestada" })).toBeInTheDocument();
  });

  it("el botón Anterior retrocede", () => {
    renderRunner();
    fireEvent.click(screen.getByRole("button", { name: /Siguiente/ }));
    fireEvent.click(screen.getByRole("button", { name: /Anterior/ }));
    expect(screen.getByRole("heading", { name: "¿Pregunta e-1?" })).toBeInTheDocument();
  });

  it("marcar para revisar se refleja en el navegador", () => {
    renderRunner();
    fireEvent.click(screen.getByRole("button", { name: /Marcar para revisar/ }));
    // Sigue siendo la actual; al movernos se ve el estado "marcada para revisar".
    fireEvent.click(screen.getByRole("button", { name: /Siguiente/ }));
    expect(
      screen.getByRole("button", { name: "Pregunta 1, marcada para revisar" }),
    ).toBeInTheDocument();
  });

  it("el teclado: flechas mueven, 1/2/3 responden", () => {
    const { container } = renderRunner();
    const root = container.firstElementChild as HTMLElement;
    fireEvent.keyDown(root, { key: "2" });
    expect(screen.getByText(/Respondidas 1 de 3/)).toBeInTheDocument();
    fireEvent.keyDown(root, { key: "ArrowRight" });
    expect(screen.getByRole("heading", { name: "¿Pregunta e-2?" })).toBeInTheDocument();
    fireEvent.keyDown(root, { key: "ArrowLeft" });
    expect(screen.getByRole("heading", { name: "¿Pregunta e-1?" })).toBeInTheDocument();
  });

  it("la rejilla del navegador salta a la pregunta pulsada", () => {
    renderRunner();
    fireEvent.click(screen.getByRole("button", { name: "Pregunta 3, sin contestar" }));
    expect(screen.getByRole("heading", { name: "¿Pregunta e-3?" })).toBeInTheDocument();
  });
});
