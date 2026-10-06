import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EXAM_CONFIG } from "../config/exam";
import { questionBank } from "../data/questions";
import { buildRecommendation, createSession, scoreExam, type ExamSession } from "../lib/exam";
import { saveExamRecord } from "../services/history";
import { CATEGORY_LABELS } from "../types/question";
import ExamRunner from "../components/exam/ExamRunner";

/**
 * Clave de localStorage donde se guarda el nombre opcional del alumno.
 * La página de resultado (otro agente) lo usa para personalizar el PDF.
 */
export const STUDENT_NAME_KEY = "dgt-sim:studentName";

/**
 * /simulacro — Pantalla previa con explicación y botón "Comenzar".
 * El temporizador NO corre hasta pulsar comenzar: la sesión se crea
 * en ese momento y entonces se monta el ExamRunner.
 */
export default function ExamPage() {
  const navigate = useNavigate();
  const [name, setName] = useState(() => localStorage.getItem(STUDENT_NAME_KEY) ?? "");
  const [session, setSession] = useState<ExamSession | null>(null);
  const [saving, setSaving] = useState(false);

  const start = () => {
    const trimmed = name.trim();
    if (trimmed) localStorage.setItem(STUDENT_NAME_KEY, trimmed);
    else localStorage.removeItem(STUDENT_NAME_KEY);
    setSession(
      createSession(questionBank, EXAM_CONFIG.questionCount, EXAM_CONFIG.timeLimitMinutes * 60),
    );
    window.scrollTo({ top: 0 });
  };

  const handleFinish = async (finalSession: ExamSession) => {
    if (saving) return;
    setSaving(true);
    try {
      const scored = scoreExam(finalSession, Date.now(), EXAM_CONFIG.maxErrors);
      const record = await saveExamRecord({
        mode: "simulacro",
        questionIds: finalSession.questions.map((q) => q.id),
        answers: finalSession.answers.map((a) => a.selected),
        correct: scored.correct,
        errors: scored.errors,
        blank: scored.blank,
        total: scored.total,
        durationSec: scored.durationSec,
        passed: scored.passed,
        byCategory: Object.fromEntries(
          Object.entries(scored.byCategory).map(([k, v]) => [
            k,
            { correct: v.correct, total: v.total },
          ]),
        ),
        recommendation: buildRecommendation(scored, CATEGORY_LABELS),
      });
      navigate(`/resultado/${record.id}`);
    } finally {
      setSaving(false);
    }
  };

  if (session) {
    return (
      <>
        <h1 className="sr-only">Simulacro de examen</h1>
        <ExamRunner session={session} onFinish={handleFinish} />
      </>
    );
  }

  return (
    <section aria-labelledby="simulacro-title" className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Examen teórico · Permiso B
        </p>
        <h1 id="simulacro-title" className="mt-2 text-3xl font-extrabold tracking-tight">
          Simulacro de examen
        </h1>
        <p className="mt-3 leading-relaxed text-muted">
          Un examen completo con el formato oficial: <strong className="text-night">30 preguntas</strong> en{" "}
          <strong className="text-night">30 minutos</strong>, con un máximo de{" "}
          <strong className="text-night">3 errores</strong> para obtener el APTO. Las preguntas en blanco
          cuentan como error.
        </p>

        <ul className="mt-6 flex flex-col gap-3 text-sm">
          {[
            ["⏱", "El temporizador empieza al pulsar «Comenzar», no antes."],
            ["⚑", "Puedes marcar preguntas para revisarlas antes de entregar."],
            ["⌨", "Teclas 1/2/3 para responder y ←/→ para moverte entre preguntas."],
            ["📝", "Al entregar verás la corrección completa con explicaciones."],
          ].map(([icon, text]) => (
            <li key={text} className="flex items-start gap-3 rounded-xl bg-offwhite px-4 py-3">
              <span aria-hidden="true" className="text-lg">{icon}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <label htmlFor="student-name" className="block text-sm font-semibold">
            Tu nombre <span className="font-normal text-muted">(opcional, aparecerá en tu certificado PDF)</span>
          </label>
          <input
            id="student-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej.: María García"
            autoComplete="name"
            maxLength={80}
            className="transition-soft mt-2 min-h-[48px] w-full rounded-xl border-2 border-line bg-white px-4 py-2 text-base focus:border-electric"
          />
        </div>

        <button
          type="button"
          onClick={start}
          className="transition-soft mt-6 min-h-[56px] w-full rounded-xl bg-electric px-6 py-3 text-lg font-bold text-white hover:bg-electric-dark"
        >
          Comenzar
        </button>
        <p className="mt-3 text-center text-xs text-muted">
          Tienes {questionBank.length} preguntas en el banco · El examen elige 30 al azar
        </p>
      </div>
    </section>
  );
}
