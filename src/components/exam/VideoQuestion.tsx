import { useRef, useState } from "react";

/**
 * Pregunta con vídeo: reproductor completo y funcional.
 *
 * ⚠️ NO se usa en el examen actual: `EXAM_CONFIG.videoQuestions.enabled`
 * es `false` (verificado el 2026-10-06: el examen real del permiso B no
 * incluye preguntas de vídeo). Se deja listo y documentado por si la DGT
 * las introduce en el futuro: bastaría activar el flag y renderizar este
 * componente cuando `question.video` esté presente.
 *
 * Funcionalidad:
 * - Reproducción con controles nativos accesibles, póster y responsive.
 * - Contador de visualizaciones configurable (`maxViews`): al agotarse,
 *   el vídeo se pausa y se muestra un aviso (no se puede volver a ver).
 * - `lockUntilWatched`: hasta que el vídeo se ve completo (`ended`),
 *   `watched` es false y la UI puede bloquear la continuación.
 * - `onWatched` / `onViewCountChange` para integrarlo con el runner.
 */

interface VideoQuestionProps {
  src: string;
  title: string;
  poster?: string;
  /** Máximo de visualizaciones permitidas (undefined = sin límite). */
  maxViews?: number;
  /** Si true, hay que ver el vídeo entero antes de continuar. */
  lockUntilWatched?: boolean;
  onWatched?: () => void;
  onViewCountChange?: (views: number) => void;
}

export default function VideoQuestion({
  src,
  title,
  poster,
  maxViews,
  lockUntilWatched = false,
  onWatched,
  onViewCountChange,
}: VideoQuestionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [views, setViews] = useState(0);
  const [watched, setWatched] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const viewsExhausted = maxViews !== undefined && views >= maxViews;

  const handlePlay = () => {
    if (viewsExhausted) {
      videoRef.current?.pause();
      setBlocked(true);
      return;
    }
    setBlocked(false);
    // Cuenta como visualización cada vez que empieza a reproducirse
    // desde el principio (o tras haber terminado).
    const video = videoRef.current;
    if (video && (video.currentTime === 0 || video.ended)) {
      const next = views + 1;
      setViews(next);
      onViewCountChange?.(next);
    }
  };

  const handleEnded = () => {
    if (!watched) {
      setWatched(true);
      onWatched?.();
    }
  };

  const replay = () => {
    const video = videoRef.current;
    if (!video || viewsExhausted) return;
    setBlocked(false);
    video.currentTime = 0;
    void video.play();
  };

  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-night">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        aria-label={title}
        onPlay={handlePlay}
        onEnded={handleEnded}
        className="aspect-video w-full bg-black"
      >
        <track kind="captions" />
        Tu navegador no puede reproducir este vídeo.
      </video>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm text-white">
        <div className="flex items-center gap-3">
          <span aria-hidden="true">🎬</span>
          <span className="font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-3 text-white/80">
          {maxViews !== undefined && (
            <span aria-live="polite">
              Visualizaciones: {views}/{maxViews}
            </span>
          )}
          {lockUntilWatched && !watched && (
            <span role="status" className="font-semibold text-amber-300">
              Debes ver el vídeo completo antes de continuar
            </span>
          )}
          {lockUntilWatched && watched && (
            <span role="status" className="font-semibold text-emerald-300">
              ✓ Vídeo visto
            </span>
          )}
          {viewsExhausted && (
            <button
              type="button"
              onClick={replay}
              disabled
              className="cursor-not-allowed rounded-lg bg-white/10 px-3 py-1.5 opacity-60"
            >
              Sin más visualizaciones
            </button>
          )}
        </div>
      </figcaption>
      {blocked && viewsExhausted && (
        <p role="alert" className="bg-danger/15 px-4 py-2 text-sm font-medium text-red-200">
          Has agotado las {maxViews} visualizaciones permitidas para este vídeo.
        </p>
      )}
    </figure>
  );
}
