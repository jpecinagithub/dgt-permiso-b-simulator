import type * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  clearHistory,
  deleteExamRecord,
  listExamRecords,
} from "../services/history";
import type { ExamRecord } from "../services/history";
import ConfirmDialog from "../components/results/ConfirmDialog";
import HistoryCard from "../components/results/HistoryCard";
import {
  downloadExamRecordPdf,
  readUserName,
} from "../components/results/questionLookup";
import { formatExamDate } from "../lib/format";

/**
 * Página de historial (/historial): últimos 10 exámenes con acciones por
 * tarjeta (ver, revisar, PDF, eliminar) y borrado total con confirmación.
 * Todo vive en IndexedDB en este dispositivo.
 */
export default function HistoryPage(): React.ReactElement {
  const navigate = useNavigate();
  const [records, setRecords] = useState<ExamRecord[] | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ExamRecord | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [userName] = useState<string | undefined>(readUserName);

  const refresh = useCallback(async (): Promise<void> => {
    setRecords(await listExamRecords());
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const handleDownload = async (record: ExamRecord): Promise<void> => {
    setBusyId(record.id);
    try {
      await downloadExamRecordPdf(record, userName);
    } finally {
      setBusyId(null);
    }
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!pendingDelete) return;
    await deleteExamRecord(pendingDelete.id);
    setPendingDelete(null);
    await refresh();
  };

  const handleConfirmClear = async (): Promise<void> => {
    await clearHistory();
    setConfirmClear(false);
    setRecords([]);
  };

  const visible = (records ?? []).slice(0, 10);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-night sm:text-3xl">
            Historial de exámenes
          </h1>
          <p className="mt-1 text-sm text-muted">
            Tus últimos 10 exámenes, con su revisión y su informe en PDF.
          </p>
        </div>
        {visible.length > 0 ? (
          <button
            type="button"
            onClick={() => setConfirmClear(true)}
            className="transition-soft inline-flex min-h-[44px] items-center rounded-xl border border-danger/40 bg-white px-5 py-2.5 text-sm font-bold text-danger hover:bg-danger/10"
          >
            Borrar historial
          </button>
        ) : null}
      </div>

      {records === null ? (
        <p role="status" className="text-sm text-muted">
          Cargando historial…
        </p>
      ) : visible.length === 0 ? (
        <div className="rounded-2xl border border-line bg-white p-8 text-center">
          <p className="text-lg font-bold text-night">
            Aún no tienes exámenes guardados
          </p>
          <p className="mt-1 text-sm text-muted">
            Haz tu primer simulacro y aquí verás tu evolución hacia el APTO.
          </p>
          <Link
            to="/simulacro"
            className="transition-soft mt-4 inline-flex min-h-[44px] items-center rounded-xl bg-electric px-5 py-2.5 text-sm font-bold text-white hover:bg-electric-dark"
          >
            Empezar simulacro
          </Link>
        </div>
      ) : (
        <ul className="flex list-none flex-col gap-4 p-0">
          {visible.map((record) => (
            <li key={record.id}>
              <HistoryCard
                record={record}
                downloading={busyId === record.id}
                onView={() => navigate(`/resultado/${record.id}`)}
                onReview={() => navigate(`/resultado/${record.id}?review=1`)}
                onDownload={() => void handleDownload(record)}
                onDelete={() => setPendingDelete(record)}
              />
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-muted">
        Tu historial se guarda únicamente en este dispositivo.
      </p>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Eliminar examen"
        description={
          pendingDelete
            ? `Se eliminará el examen del ${formatExamDate(pendingDelete.date)} de este dispositivo. Esta acción no se puede deshacer.`
            : ""
        }
        confirmLabel="Eliminar"
        danger
        onConfirm={() => void handleConfirmDelete()}
        onCancel={() => setPendingDelete(null)}
      />
      <ConfirmDialog
        open={confirmClear}
        title="Borrar historial"
        description="Se eliminarán todos los exámenes guardados en este dispositivo. Esta acción no se puede deshacer."
        confirmLabel="Borrar todo"
        danger
        onConfirm={() => void handleConfirmClear()}
        onCancel={() => setConfirmClear(false)}
      />
    </div>
  );
}
