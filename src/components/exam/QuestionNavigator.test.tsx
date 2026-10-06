import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ExamAnswer } from "../../lib/exam";
import QuestionNavigator from "./QuestionNavigator";

function answers(): ExamAnswer[] {
  return [
    { questionId: "q-1", selected: 0, flagged: false }, // contestada
    { questionId: "q-2", selected: null, flagged: true }, // marcada
    { questionId: "q-3", selected: null, flagged: false }, // sin contestar
  ];
}

describe("QuestionNavigator", () => {
  it("renderiza una celda por pregunta con su estado en el aria-label", () => {
    render(<QuestionNavigator answers={answers()} currentIndex={2} onGo={() => {}} />);
    expect(screen.getByRole("button", { name: "Pregunta 1, contestada" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Pregunta 2, marcada para revisar" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pregunta 3, actual" })).toBeInTheDocument();
  });

  it("marca la pregunta actual con aria-current", () => {
    render(<QuestionNavigator answers={answers()} currentIndex={0} onGo={() => {}} />);
    expect(screen.getByRole("button", { name: "Pregunta 1, actual" })).toHaveAttribute(
      "aria-current",
      "true",
    );
  });

  it("usa icono además de color: ✓ contestada, ⚑ marcada", () => {
    render(<QuestionNavigator answers={answers()} currentIndex={2} onGo={() => {}} />);
    const answered = screen.getByRole("button", { name: "Pregunta 1, contestada" });
    const flagged = screen.getByRole("button", { name: "Pregunta 2, marcada para revisar" });
    expect(answered.textContent).toContain("✓");
    expect(flagged.textContent).toContain("⚑");
  });

  it("llama a onGo con el índice al pulsar una celda", () => {
    const onGo = vi.fn();
    render(<QuestionNavigator answers={answers()} currentIndex={0} onGo={onGo} />);
    fireEvent.click(screen.getByRole("button", { name: "Pregunta 3, sin contestar" }));
    expect(onGo).toHaveBeenCalledWith(2);
  });
});
