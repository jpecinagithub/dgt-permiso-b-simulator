import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CategoryPerformance from "./CategoryPerformance";

describe("CategoryPerformance", () => {
  it("muestra etiqueta, porcentaje y aciertos por materia", () => {
    render(
      <CategoryPerformance
        byCategory={{
          "normas-circulacion": { correct: 9, total: 10 },
          percepcion: { correct: 1, total: 4 },
        }}
      />,
    );

    expect(
      screen.getByText(
        "Normas de circulación: señalización, prioridad y velocidad",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("90 %")).toBeInTheDocument();
    expect(screen.getByText("25 %")).toBeInTheDocument();
    expect(screen.getByText("9/10")).toBeInTheDocument();
    expect(screen.getByText("1/4")).toBeInTheDocument();
  });

  it("omite las materias sin preguntas y no renderiza nada si no hay datos", () => {
    const { rerender } = render(
      <CategoryPerformance
        byCategory={{
          "normas-circulacion": { correct: 0, total: 0 },
          percepcion: { correct: 2, total: 2 },
        }}
      />,
    );
    expect(
      screen.queryByText(
        "Normas de circulación: señalización, prioridad y velocidad",
      ),
    ).not.toBeInTheDocument();
    expect(screen.getByText("100 %")).toBeInTheDocument();

    rerender(<CategoryPerformance byCategory={{}} />);
    expect(
      screen.queryByRole("heading", { name: "Rendimiento por materias" }),
    ).not.toBeInTheDocument();
  });

  it("ordena las materias según el orden oficial del temario", () => {
    render(
      <CategoryPerformance
        byCategory={{
          percepcion: { correct: 1, total: 1 },
          "normas-circulacion": { correct: 1, total: 1 },
        }}
      />,
    );
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Normas de circulación");
    expect(items[1]).toHaveTextContent("Percepción");
  });
});
