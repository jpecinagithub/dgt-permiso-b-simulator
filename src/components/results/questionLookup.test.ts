import { describe, expect, it } from "vitest";
import { resolveExamQuestions } from "./questionLookup";

describe("resolveExamQuestions", () => {
  it("resuelve preguntas del banco por id manteniendo el orden", () => {
    const [first, second] = resolveExamQuestions(["norm-001", "norm-001"]);
    expect(first.id).toBe("norm-001");
    expect(first.question.length).toBeGreaterThan(0);
    expect(second.id).toBe("norm-001");
  });

  it("sustituye ids desconocidos por un marcador sin romper el orden", () => {
    const [missing, real] = resolveExamQuestions(["no-existe", "norm-001"]);
    expect(missing.id).toBe("no-existe");
    expect(real.id).toBe("norm-001");
  });
});
