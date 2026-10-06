import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AnswerOption from "./AnswerOption";

describe("AnswerOption", () => {
  it("muestra la letra y el texto, con altura táctil ≥48px", () => {
    render(<AnswerOption letter="B" text="Ceder el paso" selected={false} onSelect={() => {}} />);
    // La letra va en un span aria-hidden (decorativa para lectores de pantalla).
    const btn = screen.getByRole("button", { name: "Ceder el paso" });
    expect(btn).toBeInTheDocument();
    expect(screen.getByText("B", { selector: "span" })).toBeInTheDocument();
    expect(btn.className).toMatch(/min-h-\[56px\]/);
  });

  it("llama a onSelect al pulsar", () => {
    const onSelect = vi.fn();
    render(<AnswerOption letter="A" text="Detenerse" selected={false} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button", { name: /Detenerse/ }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("refleja la selección con aria-pressed", () => {
    const { rerender } = render(
      <AnswerOption letter="C" text="Continuar" selected={false} onSelect={() => {}} />,
    );
    expect(screen.getByRole("button", { name: /Continuar/ })).toHaveAttribute("aria-pressed", "false");
    rerender(<AnswerOption letter="C" text="Continuar" selected={true} onSelect={() => {}} />);
    expect(screen.getByRole("button", { name: /Continuar/ })).toHaveAttribute("aria-pressed", "true");
  });

  it("muestra ✓/✕ con el veredicto revelado (no solo color)", () => {
    const { rerender } = render(
      <AnswerOption letter="A" text="Opción" selected={true} verdict="correct" onSelect={() => {}} />,
    );
    expect(screen.getByText("✓")).toBeInTheDocument();
    rerender(
      <AnswerOption letter="A" text="Opción" selected={true} verdict="incorrect" onSelect={() => {}} />,
    );
    expect(screen.getByText("✕")).toBeInTheDocument();
  });

  it("deshabilita tras revelar la corrección", () => {
    render(
      <AnswerOption letter="A" text="Opción" selected={false} verdict="correct" onSelect={() => {}} />,
    );
    expect(screen.getByRole("button", { name: /Opción/ })).toBeDisabled();
  });
});
