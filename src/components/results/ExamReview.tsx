import type * as React from "react";
import type { Question } from "../../types/question";
import type { ExamRecord } from "../../services/history";
import { CATEGORY_LABELS } from "../../types/question";
import { QUESTION_ART } from "../QuestionArt";

interface ExamReviewProps {
  record: ExamRecord;
  questions: Question[]; // en el mismo orden que record.questionIds
}

type ItemStatus = "correct" | "wrong" | "blank";

const STATUS_META: Record<
  ItemStatus,
  { label: string; icon: string; pill: string }
> = {
  correct: {
    label: "Correcta",
    icon: "✓",
    pill: "border-success/40 bg-success/10 text-success",
  },
  wrong: {
    label: "Fallada",
    icon: "✗",
    pill: "border-danger/40 bg-danger/10 text-danger",
  },
  blank: {
    label: "Sin responder",
    icon: "○",
    pill: "border-line bg-neutral-soft text-muted",
  },
};

function statusOf(q: Question, selected: number | null): ItemStatus {
  if (selected === null) return "blank";
  return selected === q.correctAnswer ? "correct" : "wrong";
}

const OPTION_LETTERS = ["A", "B", "C"];

/**
 * Revisión pregunta a pregunta: tu respuesta, la correcta, explicación,
 * materia y referencia legal. Las correctas aparecen colapsadas de forma
 * discreta; los fallos y las preguntas en blanco, destacadas y expandidas.
 */
export default function ExamReview({
  record,
  questions,
}: ExamReviewProps): React.ReactElement {
  const items = record.questionIds.map((id, i) => ({
    id,
    index: i,
    question: questions[i],
    selected: record.answers[i] ?? null,
  }));

  return (
    <section aria-labelledby="revision-titulo">
      <h2 id="revision-titulo" className="text-xl font-bold text-night">
        Revisión del examen
      </h2>
      <p className="mt-1 text-sm text-muted">
        Repasa cada pregunta con su explicación y su referencia legal. Las
        correctas están colapsadas; los fallos y las preguntas en blanco se
        muestran expandidos.
      </p>

      <ol className="mt-4 flex flex-col gap-4">
        {items.map(({ id, index, question: q, selected }) => {
          const status = statusOf(q, selected);
          const meta = STATUS_META[status];
          const header = (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${meta.pill}`}
              >
                <span aria-hidden="true">{meta.icon}</span>
                {meta.label}
              </span>
              <span className="text-sm font-bold text-night">
                Pregunta {index + 1}
              </span>
              <span className="text-xs text-muted">
                {CATEGORY_LABELS[q.category] ?? q.category}
              </span>
            </div>
          );
          const body = (
            <QuestionBody q={q} selected={selected} status={status} />
          );

          return (
            <li key={id}>
              {status === "correct" ? (
                <details className="rounded-2xl border border-line bg-white">
                  <summary className="transition-soft cursor-pointer list-none p-4 hover:bg-neutral-soft/60 [&::-webkit-details-marker]:hidden">
                    {header}
                  </summary>
                  <div className="border-t border-line p-4 sm:p-5">{body}</div>
                </details>
              ) : (
                <article
                  aria-label={`Pregunta ${index + 1}: ${meta.label}`}
                  className={`rounded-2xl border bg-white p-4 sm:p-5 ${
                    status === "wrong" ? "border-danger/50" : "border-line"
                  }`}
                >
                  {header}
                  <div className="mt-3">{body}</div>
                </article>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function QuestionBody({
  q,
  selected,
  status,
}: {
  q: Question;
  selected: number | null;
  status: ItemStatus;
}): React.ReactElement {
  const Art = q.image ? QUESTION_ART[q.image] : undefined;

  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold text-night">{q.question}</p>

      {Art ? (
        <div className="max-w-md overflow-hidden rounded-xl border border-line">
          <Art />
        </div>
      ) : null}

      <ol className="flex flex-col gap-2">
        {q.answers.map((text, i) => {
          const isCorrect = i === q.correctAnswer;
          const isSelected = i === selected;
          const box = isCorrect
            ? "border-success/50 bg-success/10"
            : isSelected
              ? "border-danger/50 bg-danger/10"
              : "border-line";
          return (
            <li
              key={i}
              className={`rounded-xl border px-3 py-2.5 text-sm ${box}`}
            >
              <span className="font-bold text-night">
                {OPTION_LETTERS[i]}.{" "}
              </span>
              <span className="text-night">{text}</span>
              {isCorrect ? (
                <span className="ml-2 text-xs font-bold text-success">
                  Respuesta correcta
                </span>
              ) : null}
              {isSelected && !isCorrect ? (
                <span className="ml-2 text-xs font-bold text-danger">
                  Tu respuesta
                </span>
              ) : null}
              {isSelected && isCorrect ? (
                <span className="ml-2 text-xs font-bold text-success">
                  Tu respuesta
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>

      {status === "blank" ? (
        <p className="text-sm font-medium text-muted">
          No respondiste a esta pregunta.
        </p>
      ) : null}

      <div className="rounded-xl bg-neutral-soft p-3 text-sm sm:p-4">
        <p className="font-semibold text-night">Explicación</p>
        <p className="mt-1 leading-relaxed text-muted">{q.explanation}</p>
        <p className="mt-2 text-xs text-muted">
          Referencia legal:{" "}
          <span className="font-medium text-night">{q.legalReference}</span>
        </p>
      </div>
    </div>
  );
}
