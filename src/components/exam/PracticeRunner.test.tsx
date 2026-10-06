import "fake-indexeddb/auto";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import type { Question } from "../../types/question";
import { clearHistory } from "../../services/history";
import PracticeRunner from "./PracticeRunner";

function makeQuestion(id: string, correctAnswer: number): Question {
  return {
    id,
    question: `¿Pregunta ${id}?`,
    answers: [`Respuesta A ${id}`, `Respuesta B ${id}`, `Respuesta C ${id}`],
    correctAnswer,
    explanation: `Explicación de ${id}`,
    category: "normas-circulacion",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "Banco sintético de test",
    sourceReference: "test",
    legalReference: `Art. ${id} Test`,
    lastVerified: "2026-10-06",
    active: true,
    tags: [],
  };
}

const QUESTIONS = [makeQuestion("p-1", 0), makeQuestion("p-2", 1)];

function renderRunner() {
  render(
    <MemoryRouter>
      <PracticeRunner
        questions={QUESTIONS}
        title="Practicar por temas"
        subtitle="2 preguntas"
        allowSave
        // rng que no baraja: Fisher-Yates con j=i conserva el orden
        rng={() => 0.9999999}
      />
    </MemoryRouter>,
  );
}

beforeEach(async () => {
  await clearHistory();
});

describe("PracticeRunner", () => {
  it("muestra la primera pregunta sin corrección previa", () => {
    renderRunner();
    expect(screen.getByRole("heading", { name: "¿Pregunta p-1?" })).toBeInTheDocument();
    expect(screen.queryByText(/Correcta/)).not.toBeInTheDocument();
  });

  it("al responder muestra corrección inmediata con explicación y referencia legal", () => {
    renderRunner();
    fireEvent.click(screen.getByRole("button", { name: /Respuesta A p-1/ }));
    expect(screen.getByText("✓ Correcta")).toBeInTheDocument();
    expect(screen.getByText("Explicación de p-1")).toBeInTheDocument();
    expect(screen.getByText(/Art\. p-1 Test/)).toBeInTheDocument();
  });

  it("marca como incorrecta la respuesta errónea", () => {
    renderRunner();
    fireEvent.click(screen.getByRole("button", { name: /Respuesta B p-1/ }));
    expect(screen.getByText("✕ Incorrecta")).toBeInTheDocument();
  });

  it("avanza a la siguiente pregunta y al final muestra el resumen", () => {
    renderRunner();
    fireEvent.click(screen.getByRole("button", { name: /Respuesta A p-1/ }));
    fireEvent.click(screen.getByRole("button", { name: /Siguiente/ }));
    expect(screen.getByRole("heading", { name: "¿Pregunta p-2?" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Respuesta C p-2/ }));
    fireEvent.click(screen.getByRole("button", { name: /Ver resumen/ }));
    expect(screen.getByRole("heading", { name: "1 de 2 correctas" })).toBeInTheDocument();
  });

  it("guarda en el historial solo al pulsar el botón", async () => {
    renderRunner();
    fireEvent.click(screen.getByRole("button", { name: /Respuesta A p-1/ }));
    fireEvent.click(screen.getByRole("button", { name: /Siguiente/ }));
    fireEvent.click(screen.getByRole("button", { name: /Respuesta B p-2/ }));
    fireEvent.click(screen.getByRole("button", { name: /Ver resumen/ }));
    fireEvent.click(screen.getByRole("button", { name: /Guardar en historial/ }));
    await waitFor(() => {
      expect(screen.getByText(/Guardado en el historial/)).toBeInTheDocument();
    });
  });
});
