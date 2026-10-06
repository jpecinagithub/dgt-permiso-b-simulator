import type * as React from "react";
import { useEffect, useRef } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

/**
 * Diálogo modal de confirmación accesible: role="dialog" + aria-modal,
 * foco inicial en el botón de confirmación y cierre con Escape.
 */
export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  onConfirm,
  onCancel,
  danger = false,
}: ConfirmDialogProps): React.ReactElement | null {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-night/60 p-4 sm:items-center"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-desc"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="confirm-dialog-title"
          className="text-lg font-bold text-night"
        >
          {title}
        </h2>
        <p id="confirm-dialog-desc" className="mt-2 text-sm text-muted">
          {description}
        </p>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="transition-soft inline-flex min-h-[44px] items-center justify-center rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-bold text-night hover:border-electric hover:text-electric"
          >
            Cancelar
          </button>
          <button
            type="button"
            ref={confirmRef}
            onClick={onConfirm}
            className={`transition-soft inline-flex min-h-[44px] items-center justify-center rounded-xl px-5 py-2.5 text-sm font-bold text-white ${
              danger
                ? "bg-danger hover:bg-danger/90"
                : "bg-electric hover:bg-electric-dark"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
