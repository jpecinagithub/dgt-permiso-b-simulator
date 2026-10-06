import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EXAM_CONFIG } from "../../config/exam";
import VideoQuestion from "./VideoQuestion";

describe("VideoQuestion", () => {
  it("documenta que no se usa en el examen actual (flag desactivado)", () => {
    // El examen real del permiso B no incluye preguntas de vídeo
    // (verificado 2026-10-06). El componente queda listo por si se activan.
    expect(EXAM_CONFIG.videoQuestions.enabled).toBe(false);
  });

  it("renderiza el reproductor con póster, título y controles accesibles", () => {
    render(
      <VideoQuestion
        src="https://ejemplo.test/video.mp4"
        title="Vídeo de ejemplo"
        poster="https://ejemplo.test/poster.jpg"
        maxViews={2}
        lockUntilWatched
        onWatched={vi.fn()}
      />,
    );
    const video = screen.getByLabelText("Vídeo de ejemplo");
    expect(video.tagName).toBe("VIDEO");
    expect(video).toHaveAttribute("poster", "https://ejemplo.test/poster.jpg");
    expect(video).toHaveAttribute("controls");
    expect(screen.getByText("Visualizaciones: 0/2")).toBeInTheDocument();
    expect(
      screen.getByText("Debes ver el vídeo completo antes de continuar"),
    ).toBeInTheDocument();
  });
});
