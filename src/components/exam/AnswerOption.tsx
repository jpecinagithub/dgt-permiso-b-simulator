interface AnswerOptionProps {
  /** Letra mostrada (A, B, C). */
  letter: string;
  text: string;
  selected: boolean;
  disabled?: boolean;
  /** En modo práctica con respuesta revelada: estado de corrección. */
  verdict?: "correct" | "incorrect" | null;
  onSelect: () => void;
}

/**
 * Opción de respuesta grande y táctil (≥48 px).
 * Usa color + borde + icono, nunca solo el color, para el estado.
 */
export default function AnswerOption({
  letter,
  text,
  selected,
  disabled = false,
  verdict = null,
  onSelect,
}: AnswerOptionProps) {
  const revealed = verdict !== null;

  const base =
    "transition-soft flex min-h-[56px] w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-[1.05rem] leading-snug";
  let tone = "border-line bg-white hover:border-electric/60 hover:bg-electric/5";
  if (revealed && verdict === "correct") {
    tone = "border-success bg-success/10";
  } else if (revealed && verdict === "incorrect") {
    tone = "border-danger bg-danger/10";
  } else if (selected) {
    tone = "border-electric bg-electric/10";
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled || revealed}
      aria-pressed={selected}
      className={`${base} ${tone} ${disabled && !revealed ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <span
        aria-hidden="true"
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-base font-bold ${
          revealed && verdict === "correct"
            ? "border-success bg-success text-white"
            : revealed && verdict === "incorrect"
              ? "border-danger bg-danger text-white"
              : selected
                ? "border-electric bg-electric text-white"
                : "border-line bg-offwhite text-muted"
        }`}
      >
        {revealed && verdict === "correct" ? "✓" : revealed && verdict === "incorrect" ? "✕" : letter}
      </span>
      <span className="flex-1">{text}</span>
    </button>
  );
}
