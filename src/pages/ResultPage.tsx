import type * as React from "react";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getExamRecord } from "../services/history";
import type { ExamRecord } from "../services/history";
import type { Question } from "../types/question";
import ExamResult from "../components/results/ExamResult";
import {
  downloadExamRecordPdf,
  readUserName,
  resolveExamQuestions,
} from "../components/results/questionLookup";

/**
 * Página de resultado de un examen (/resultado/:id).
 *
 * Carga el ExamRecord del historial, resuelve sus preguntas desde el banco
 * y delega la visualización en <ExamResult/>. Con `?review=1` la revisión
 * aparece desplegada desde el inicio (lo usa el historial).
 */
export default function ResultPage(): React.ReactElement {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [record, setRecord] = useState<ExamRecord | null>(null);
  const [missing, setMissing] = useState(false);
  const [reviewOpen, setReviewOpen] = useState<boolean>(
    () => searchParams.get("review") === "1",
  );
  const [downloading, setDownloading] = useState(false);
  const [userName] = useState<string | undefined>(readUserName);

  useEffect(() => {
    let cancelled = false;
    if (!id) {
      setMissing(true);
      return;
    }
    getExamRecord(id)
      .then((r) => {
        if (cancelled) return;
        if (r) setRecord(r);
        else setMissing(true);
      })
      .catch(() => {
        if (!cancelled) setMissing(true);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (missing) {
    return (
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-night">
          Examen no encontrado
        </h1>
        <p className="text-sm text-muted">
          Este resultado no existe o fue eliminado de este dispositivo.
        </p>
        <Link
          to="/historial"
          className="transition-soft inline-flex min-h-[44px] items-center rounded-xl bg-electric px-5 py-2.5 text-sm font-bold text-white hover:bg-electric-dark"
        >
          Volver al historial
        </Link>
      </div>
    );
  }

  if (!record) {
    return (
      <p role="status" className="text-sm text-muted">
        Cargando resultado…
      </p>
    );
  }

  const questions: Question[] = resolveExamQuestions(record.questionIds);

  const handleDownload = async (): Promise<void> => {
    setDownloading(true);
    try {
      await downloadExamRecordPdf(record, userName);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-night sm:text-3xl">
        Resultado del simulacro
      </h1>
      <ExamResult
        record={record}
        questions={questions}
        userName={userName}
        reviewOpen={reviewOpen}
        onToggleReview={() => setReviewOpen((v) => !v)}
        onDownloadPdf={() => void handleDownload()}
        downloading={downloading}
      />
    </div>
  );
}
