import { useEffect, useRef, useState } from "react";

interface ExamTimerProps {
  /** Instante (ms, Date.now) en el que expira el examen. */
  deadlineMs: number;
  /** Segundos restantes a partir de los cuales se muestra el aviso. */
  warningThresholdSec?: number;
  /** Se llama una sola vez al agotarse el tiempo. */
  onExpire: () => void;
  compact?: boolean;
}

/** Formatea segundos como mm:ss. */
export function formatRemaining(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

/**
 * Temporizador del examen: visible pero discreto.
 *
 * Robusto por diseño: el tiempo restante se calcula por diferencia de
 * timestamps (Date.now() frente a `deadlineMs`) en cada tick, así que
 * sobrevive a cambios de pestaña, suspensión del portátil o throttling
 * del intervalo por el navegador. Aviso discreto a 5 minutos con
 * aria-live; al llegar a 0 llama a `onExpire` una sola vez.
 */
export default function ExamTimer({
  deadlineMs,
  warningThresholdSec = 300,
  onExpire,
  compact = false,
}: ExamTimerProps) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, Math.ceil((deadlineMs - Date.now()) / 1000)),
  );
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;
  const expiredRef = useRef(false);

  useEffect(() => {
    expiredRef.current = false;
    const update = () => {
      const left = Math.max(0, Math.ceil((deadlineMs - Date.now()) / 1000));
      setRemaining(left);
      if (left <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        onExpireRef.current();
      }
    };
    update();
    const id = setInterval(update, 250);
    return () => clearInterval(id);
  }, [deadlineMs]);

  const warning = remaining > 0 && remaining <= warningThresholdSec;

  return (
    <div
      role="timer"
      aria-label={`Tiempo restante: ${formatRemaining(remaining)}`}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-lg font-bold tabular-nums ${
        remaining === 0
          ? "border-danger bg-danger/10 text-danger"
          : warning
            ? "border-amber-500 bg-amber-50 text-amber-700"
            : "border-line bg-white text-night"
      }`}
    >
      <span aria-hidden="true">⏱</span>
      <span>{formatRemaining(remaining)}</span>
      {warning && !compact && (
        <span role="status" aria-live="polite" className="font-sans text-xs font-semibold">
          Quedan 5 minutos o menos
        </span>
      )}
    </div>
  );
}
