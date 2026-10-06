import type { Question } from "../../types/question";
import { CATEGORY_LABELS } from "../../types/question";
import { QUESTION_ART } from "../QuestionArt";
import AnswerOption from "./AnswerOption";

const LETTERS = ["A", "B", "C"];

interface QuestionCardProps {
  question: Question;
  index: number;
  total: number;
  /** Índice de la opción elegida, o null si no hay respuesta. */
  selected: number | null;
  onSelect: (optionIndex: number) => void;
  disabled?: boolean;
  /**
   * En modo práctica: al responder se revela la corrección.
   * - `reveal` false → comportamiento de examen (sin feedback).
   * - `reveal` true y `selected !== null` → muestra correcta/incorrecta.
   */
  reveal?: boolean;
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
}

/**
 * Tarjeta de pregunta: enunciado, ilustración SVG si la pregunta la trae
 * (`question.image` → clave de QUESTION_ART) y las 3 opciones A/B/C.
 */
export default function QuestionCard({
  question,
  index,
  total,
  selected,
  onSelect,
  disabled = false,
  reveal = false,
  headingRef,
}: QuestionCardProps) {
  const Art = question.image ? QUESTION_ART[question.image] : undefined;
  const revealed = reveal && selected !== null;

  return (
    <article
      aria-labelledby={`pregunta-${question.id}`}
      className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <p className="font-semibold text-muted">
          Pregunta {index + 1} de {total}
        </p>
        <p className="rounded-full bg-neutral-soft px-3 py-1 text-xs font-medium text-muted">
          {CATEGORY_LABELS[question.category] ?? question.category}
        </p>
      </div>

      <h2
        id={`pregunta-${question.id}`}
        ref={headingRef}
        tabIndex={-1}
        className="mt-3 text-xl leading-relaxed font-bold text-balance sm:text-2xl"
      >
        {question.question}
      </h2>

      {Art && (
        <figure className="mx-auto mt-5 max-w-md overflow-hidden rounded-xl border border-line bg-offwhite p-3">
          <Art />
        </figure>
      )}

      <div
        role="group"
        aria-label={`Opciones de la pregunta ${index + 1}`}
        className="mt-6 flex flex-col gap-3"
      >
        {question.answers.map((text, i) => {
          let verdict: "correct" | "incorrect" | null = null;
          if (revealed) {
            if (i === question.correctAnswer) verdict = "correct";
            else if (i === selected) verdict = "incorrect";
          }
          return (
            <AnswerOption
              key={i}
              letter={LETTERS[i]}
              text={text}
              selected={selected === i}
              disabled={disabled}
              verdict={verdict}
              onSelect={() => onSelect(i)}
            />
          );
        })}
      </div>
    </article>
  );
}
