/**
 * Utilidades de formato compartidas por las pantallas de resultados
 * y la generación del PDF.
 */

/** "27:16" a partir de segundos. */
export function formatDurationSec(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
}

/** "06/10/2026, 08:54" a partir de un ISO de fecha. */
export function formatExamDateTime(isoDate: string): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoDate));
}

/** "06/10/2026" a partir de un ISO de fecha. */
export function formatExamDate(isoDate: string): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(isoDate));
}
