/**
 * Generación del informe de evaluación en PDF.
 *
 * Todo ocurre en el navegador con pdf-lib: sin servidor y sin fuentes
 * externas (solo Helvetica / Helvetica-Bold estándar). El informe incluye:
 * título y nombre del simulador, nombre del usuario (si hay), fecha y hora,
 * resultado APTO/NO APTO destacado, aciertos, errores, en blanco,
 * porcentaje y duración, análisis por materias, listado de preguntas
 * falladas y en blanco (enunciado, tu respuesta, respuesta correcta,
 * explicación y referencia legal), recomendación de repaso y pie con
 * el disclaimer y la fecha de revisión normativa.
 *
 * Diseño sobrio: azul noche #0A1F3C, acento #1D6FF2; verde/rojo SOLO para
 * la insignia APTO/NO APTO. Tablas y barras dibujadas con rectángulos y
 * líneas; paginación multi-página con pie en todas las páginas.
 */
import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";
import type { ExamRecord } from "../services/history";
import type { Question } from "../types/question";
import { CATEGORIES, CATEGORY_LABELS } from "../types/question";
import { formatDurationSec, formatExamDateTime } from "./format";

export interface PdfReportInput {
  record: ExamRecord;
  questions: Question[]; // preguntas del examen, en orden
  userName?: string;
  appName: string; // "DGT Test Simulator — Permiso B"
  legalReviewDate: string; // de EXAM_CONFIG
}

/* —————————————————————————— constantes de diseño —————————————————————————— */

const PAGE_W = 595.28; // A4
const PAGE_H = 841.89;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;
const FOOTER_RESERVE = 72;

type Color = ReturnType<typeof rgb>;

const NIGHT = rgb(10 / 255, 31 / 255, 60 / 255);
const ACCENT = rgb(29 / 255, 111 / 255, 242 / 255);
const GREEN = rgb(21 / 255, 128 / 255, 61 / 255);
const RED = rgb(220 / 255, 38 / 255, 38 / 255);
const MUTED = rgb(91 / 255, 107 / 255, 130 / 255);
const LINE = rgb(226 / 255, 232 / 255, 242 / 255);
const TRACK = rgb(238 / 255, 241 / 255, 246 / 255);
const WHITE = rgb(1, 1, 1);
const SOFT_WHITE = rgb(0.78, 0.84, 0.94);
const AMBER = rgb(180 / 255, 83 / 255, 9 / 255);

interface PdfCtx {
  doc: PDFDocument;
  font: PDFFont;
  bold: PDFFont;
  page: PDFPage;
  y: number; // borde superior del próximo bloque
}

/* —————————————————————————— primitivas de maquetación —————————————————————————— */

function addPage(ctx: PdfCtx): void {
  ctx.page = ctx.doc.addPage([PAGE_W, PAGE_H]);
  ctx.y = PAGE_H - MARGIN;
}

/** Garantiza `h` puntos libres; si no caben, abre una página nueva. */
function need(ctx: PdfCtx, h: number): void {
  if (ctx.y - h < FOOTER_RESERVE) addPage(ctx);
}

function wrapText(
  text: string,
  font: PDFFont,
  size: number,
  maxWidth: number,
): string[] {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const trial = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(trial, size) <= maxWidth || current === "") {
      current = trial;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current !== "") lines.push(current);
  return lines;
}

interface ParagraphOpts {
  size?: number;
  font?: PDFFont;
  color?: Color;
  maxWidth?: number;
  x?: number;
  gapAfter?: number;
}

function paragraph(ctx: PdfCtx, text: string, opts: ParagraphOpts = {}): void {
  const {
    size = 10,
    color = NIGHT,
    maxWidth = CONTENT_W,
    x = MARGIN,
    gapAfter = 6,
  } = opts;
  const font = opts.font ?? ctx.font;
  const lines = wrapText(text, font, size, maxWidth);
  const lineH = size * 1.45;
  for (const line of lines) {
    need(ctx, lineH);
    ctx.page.drawText(line, { x, y: ctx.y - size, font, size, color });
    ctx.y -= lineH;
  }
  ctx.y -= gapAfter;
}

function heading(ctx: PdfCtx, text: string): void {
  const size = 14;
  need(ctx, size * 1.5 + 22);
  ctx.page.drawText(text, {
    x: MARGIN,
    y: ctx.y - size,
    font: ctx.bold,
    size,
    color: NIGHT,
  });
  ctx.y -= size * 1.5;
  ctx.page.drawLine({
    start: { x: MARGIN, y: ctx.y },
    end: { x: MARGIN + 64, y: ctx.y },
    thickness: 3,
    color: ACCENT,
  });
  ctx.y -= 16;
}

/* —————————————————————————— secciones del informe —————————————————————————— */

function coverHeader(ctx: PdfCtx, input: PdfReportInput): void {
  addPage(ctx);
  const bandH = 104;
  ctx.page.drawRectangle({
    x: 0,
    y: PAGE_H - bandH,
    width: PAGE_W,
    height: bandH,
    color: NIGHT,
  });
  ctx.page.drawText(input.appName.toUpperCase(), {
    x: MARGIN,
    y: PAGE_H - 38,
    font: ctx.bold,
    size: 10,
    color: SOFT_WHITE,
  });
  ctx.page.drawText("Informe de evaluación", {
    x: MARGIN,
    y: PAGE_H - 66,
    font: ctx.bold,
    size: 20,
    color: WHITE,
  });
  ctx.page.drawText("Simulacro del examen teórico · Permiso B", {
    x: MARGIN,
    y: PAGE_H - 87,
    font: ctx.font,
    size: 11,
    color: SOFT_WHITE,
  });
  ctx.y = PAGE_H - bandH - 26;

  if (input.userName) {
    paragraph(ctx, `Realizado por: ${input.userName}`, { size: 11 });
  }
  paragraph(ctx, `Fecha y hora: ${formatExamDateTime(input.record.date)}`, {
    size: 11,
  });
  const mode =
    input.record.mode === "practica" ? "Práctica por temas" : "Simulacro de examen";
  paragraph(ctx, `Modalidad: ${mode}`, { size: 11, gapAfter: 12 });
}

function resultBadge(ctx: PdfCtx, passed: boolean): void {
  const w = 212;
  const h = 54;
  need(ctx, h + 8);
  const color = passed ? GREEN : RED;
  const label = passed ? "APTO" : "NO APTO";
  const top = ctx.y;

  ctx.page.drawRectangle({
    x: MARGIN,
    y: top - h,
    width: w,
    height: h,
    color,
  });

  // Icono dibujado con líneas (la fuente estándar no incluye ✓/✗).
  const ix = MARGIN + 32;
  const iy = top - h / 2;
  if (passed) {
    ctx.page.drawLine({
      start: { x: ix - 12, y: iy + 1 },
      end: { x: ix - 4, y: iy - 7 },
      thickness: 4,
      color: WHITE,
    });
    ctx.page.drawLine({
      start: { x: ix - 4, y: iy - 7 },
      end: { x: ix + 12, y: iy + 9 },
      thickness: 4,
      color: WHITE,
    });
  } else {
    ctx.page.drawLine({
      start: { x: ix - 9, y: iy - 9 },
      end: { x: ix + 9, y: iy + 9 },
      thickness: 4,
      color: WHITE,
    });
    ctx.page.drawLine({
      start: { x: ix - 9, y: iy + 9 },
      end: { x: ix + 9, y: iy - 9 },
      thickness: 4,
      color: WHITE,
    });
  }

  const size = 22;
  const tw = ctx.bold.widthOfTextAtSize(label, size);
  ctx.page.drawText(label, {
    x: MARGIN + 54 + (w - 54 - tw) / 2,
    y: top - h / 2 - size * 0.36,
    font: ctx.bold,
    size,
    color: WHITE,
  });
  ctx.y = top - h - 16;
}

function statGrid(ctx: PdfCtx, stats: { label: string; value: string }[]): void {
  const h = 58;
  need(ctx, h + 8);
  const cw = CONTENT_W / stats.length;
  stats.forEach((s, i) => {
    const x = MARGIN + i * cw;
    ctx.page.drawRectangle({
      x,
      y: ctx.y - h,
      width: cw,
      height: h,
      borderColor: LINE,
      borderWidth: 1,
    });
    const labelSize = 8;
    const lw = ctx.font.widthOfTextAtSize(s.label, labelSize);
    ctx.page.drawText(s.label, {
      x: x + (cw - lw) / 2,
      y: ctx.y - 21,
      font: ctx.font,
      size: labelSize,
      color: MUTED,
    });
    const valueSize = 15;
    const vw = ctx.bold.widthOfTextAtSize(s.value, valueSize);
    ctx.page.drawText(s.value, {
      x: x + (cw - vw) / 2,
      y: ctx.y - 44,
      font: ctx.bold,
      size: valueSize,
      color: NIGHT,
    });
  });
  ctx.y -= h + 16;
}

function categorySection(ctx: PdfCtx, record: ExamRecord): void {
  heading(ctx, "Rendimiento por materias");
  const labelMaxW = CONTENT_W - 180;

  for (const cat of CATEGORIES) {
    const stat = record.byCategory[cat.key];
    if (!stat || stat.total === 0) continue;
    const pct = Math.round((stat.correct / stat.total) * 100);
    const labelLines = wrapText(cat.label, ctx.font, 10, labelMaxW);
    const rowH = labelLines.length * 14.5 + 24;
    need(ctx, rowH);

    labelLines.forEach((line, li) => {
      ctx.page.drawText(line, {
        x: MARGIN,
        y: ctx.y - 10 - li * 14.5,
        font: ctx.font,
        size: 10,
        color: NIGHT,
      });
    });

    const pctText = `${pct} %`;
    const pw = ctx.bold.widthOfTextAtSize(pctText, 11);
    ctx.page.drawText(pctText, {
      x: PAGE_W - MARGIN - pw,
      y: ctx.y - 11,
      font: ctx.bold,
      size: 11,
      color: NIGHT,
    });
    const frac = `${stat.correct}/${stat.total}`;
    const fw = ctx.font.widthOfTextAtSize(frac, 9);
    ctx.page.drawText(frac, {
      x: PAGE_W - MARGIN - fw,
      y: ctx.y - 25,
      font: ctx.font,
      size: 9,
      color: MUTED,
    });

    const barY = ctx.y - labelLines.length * 14.5 - 17;
    const barW = 170;
    ctx.page.drawRectangle({
      x: MARGIN,
      y: barY,
      width: barW,
      height: 7,
      color: TRACK,
    });
    if (pct > 0) {
      ctx.page.drawRectangle({
        x: MARGIN,
        y: barY,
        width: Math.max(5, (barW * pct) / 100),
        height: 7,
        color: ACCENT,
      });
    }
    ctx.y -= rowH;
  }
  ctx.y -= 8;
}

interface ReviewItem {
  index: number;
  q: Question;
  selected: number | null;
}

function reviewSection(
  ctx: PdfCtx,
  record: ExamRecord,
  questions: Question[],
): void {
  const byId = new Map(questions.map((q) => [q.id, q]));
  const toReview: ReviewItem[] = [];
  record.questionIds.forEach((id, i) => {
    const q = byId.get(id);
    if (!q) return;
    const selected = record.answers[i] ?? null;
    if (selected === null || selected !== q.correctAnswer) {
      toReview.push({ index: i, q, selected });
    }
  });

  heading(
    ctx,
    toReview.length > 0
      ? `Preguntas a repasar (${toReview.length})`
      : "Preguntas a repasar",
  );

  if (toReview.length === 0) {
    paragraph(
      ctx,
      "Pleno: no has fallado ninguna pregunta ni has dejado ninguna en blanco. ¡Enhorabuena!",
      { size: 11 },
    );
    return;
  }

  for (const { index, q, selected } of toReview) {
    need(ctx, 120);
    const blank = selected === null;
    const status = blank ? "Sin responder" : "Respuesta incorrecta";
    const catLabel = CATEGORY_LABELS[q.category] ?? q.category;

    paragraph(ctx, `Pregunta ${index + 1} · ${catLabel} · ${status}`, {
      size: 9,
      font: ctx.bold,
      color: blank ? AMBER : MUTED,
      gapAfter: 4,
    });
    paragraph(ctx, q.question, { size: 11, font: ctx.bold, gapAfter: 4 });

    const yourAnswer =
      selected === null ? "Sin responder" : q.answers[selected];
    paragraph(ctx, `Tu respuesta: ${yourAnswer}`, { size: 10, gapAfter: 2 });
    paragraph(ctx, `Respuesta correcta: ${q.answers[q.correctAnswer]}`, {
      size: 10,
      font: ctx.bold,
      color: ACCENT,
      gapAfter: 4,
    });
    paragraph(ctx, q.explanation, { size: 9.5, color: MUTED, gapAfter: 2 });
    paragraph(ctx, `Referencia legal: ${q.legalReference}`, {
      size: 9,
      color: MUTED,
      gapAfter: 12,
    });
  }
}

function drawFooters(ctx: PdfCtx, legalReviewDate: string): void {
  const pages = ctx.doc.getPages();
  pages.forEach((page, i) => {
    page.drawLine({
      start: { x: MARGIN, y: 54 },
      end: { x: PAGE_W - MARGIN, y: 54 },
      thickness: 1,
      color: LINE,
    });
    page.drawText(
      "Proyecto educativo independiente. No afiliado a la Dirección General de Tráfico.",
      { x: MARGIN, y: 40, font: ctx.font, size: 7.5, color: MUTED },
    );
    page.drawText(`Normativa revisada por última vez: ${legalReviewDate}`, {
      x: MARGIN,
      y: 29,
      font: ctx.font,
      size: 7.5,
      color: MUTED,
    });
    const num = `Página ${i + 1} de ${pages.length}`;
    const nw = ctx.font.widthOfTextAtSize(num, 7.5);
    page.drawText(num, {
      x: PAGE_W - MARGIN - nw,
      y: 40,
      font: ctx.font,
      size: 7.5,
      color: MUTED,
    });
  });
}

/* —————————————————————————— API pública —————————————————————————— */

/**
 * Genera el informe de evaluación en PDF y lo devuelve como bytes.
 */
export async function generateExamPdf(
  input: PdfReportInput,
): Promise<Uint8Array> {
  const { record } = input;
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const ctx: PdfCtx = {
    doc,
    font,
    bold,
    page: undefined as unknown as PDFPage,
    y: 0,
  };

  coverHeader(ctx, input);
  resultBadge(ctx, record.passed);

  const pct = Math.round((record.correct / Math.max(1, record.total)) * 100);
  paragraph(
    ctx,
    `${record.correct} de ${record.total} correctas · ${record.errors} errores · ${record.blank} sin responder`,
    { size: 12, gapAfter: 10 },
  );
  statGrid(ctx, [
    { label: "Aciertos", value: `${record.correct}/${record.total}` },
    { label: "Errores", value: String(record.errors) },
    { label: "En blanco", value: String(record.blank) },
    { label: "% aciertos", value: `${pct} %` },
    { label: "Duración", value: formatDurationSec(record.durationSec) },
  ]);

  categorySection(ctx, record);
  reviewSection(ctx, record, input.questions);

  heading(ctx, "Recomendación de repaso");
  paragraph(ctx, record.recommendation, { size: 10.5 });

  drawFooters(ctx, input.legalReviewDate);
  return doc.save();
}

/** Nombre de fichero seguro para el informe: dgt-permiso-b-evaluacion-AAAAMMDD-HHMM.pdf */
export function buildPdfFilename(record: ExamRecord): string {
  const d = new Date(record.date);
  const pad = (n: number): string => String(n).padStart(2, "0");
  const stamp =
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `-${pad(d.getHours())}${pad(d.getMinutes())}`;
  return `dgt-permiso-b-evaluacion-${stamp}.pdf`;
}

/**
 * Descarga bytes de PDF en el navegador (Blob + URL de objeto + enlace temporal).
 */
export function downloadPdf(bytes: Uint8Array, filename: string): void {
  const copy = bytes.slice();
  const blob = new Blob([copy.buffer as ArrayBuffer], {
    type: "application/pdf",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 5000);
}
