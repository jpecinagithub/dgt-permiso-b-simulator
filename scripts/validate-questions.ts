/**
 * Validador del banco de preguntas del DGT Test Simulator.
 *
 * Uso:
 *   npx tsx scripts/validate-questions.ts
 *   (el package.json expone además el script `npm run validate:questions`)
 *
 * Comprueba:
 *  - Cada pregunta valida contra el schema Zod (src/data/questions/schema.ts).
 *  - Exactamente 3 respuestas distintas, correctAnswer en [0, 2].
 *  - IDs únicos y en kebab-case.
 *  - Explicación y campos de fuente/legales presentes.
 *  - lastVerified con formato YYYY-MM-DD.
 *  - category dentro de las 16 materias oficiales.
 *  - image referencia una clave existente en QUESTION_ART.
 *  - Avisa (sin fallar) de preguntas inactivas, ilustraciones sin usar,
 *    preguntas con vídeo y distribuciones sospechosas.
 *
 * Exit code 1 si hay errores; 0 si solo hay avisos (o todo está en verde).
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { QuestionSchema, CATEGORY_KEYS } from "../src/data/questions/schema";
import { allQuestions, questionBank, BANK_VERSION } from "../src/data/questions/index";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const errors: string[] = [];
const warnings: string[] = [];
const fail = (msg: string): void => {
  errors.push(msg);
};
const warn = (msg: string): void => {
  warnings.push(msg);
};

/** Claves del registro QUESTION_ART (import dinámico con fallback a parseo del fuente). */
async function getArtKeys(): Promise<string[]> {
  try {
    const mod = await import("../src/components/QuestionArt");
    const record = mod.QUESTION_ART as Record<string, unknown>;
    if (!record || typeof record !== "object") throw new Error("QUESTION_ART no es un objeto");
    return Object.keys(record);
  } catch {
    // Fallback: extraer las claves "kebab-case": del literal del fichero fuente.
    const src = readFileSync(join(root, "src/components/QuestionArt.tsx"), "utf8");
    const body = src.slice(src.indexOf("QUESTION_ART"));
    const keys = [...body.matchAll(/"([a-z0-9-]+)"\s*:/g)].map((m) => m[1]);
    return [...new Set(keys)];
  }
}

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

async function main(): Promise<void> {
  const artKeys = await getArtKeys();
  if (artKeys.length === 0) fail("No se encontró ninguna clave en QUESTION_ART");

  const seenIds = new Set<string>();
  const perCategory = new Map<string, number>();
  const perDifficulty = new Map<string, number>();
  const correctDist = [0, 0, 0];
  const usedImages = new Set<string>();

  for (const q of allQuestions) {
    const label = typeof q?.id === "string" && q.id.length > 0 ? q.id : "(sin id)";
    const parsed = QuestionSchema.safeParse(q);
    if (!parsed.success) {
      fail(
        `[${label}] no valida el schema:\n` +
          parsed.error.issues.map((i) => `    - ${i.path.join(".")}: ${i.message}`).join("\n"),
      );
      continue; // sin shape válido no se puede seguir comprobando esta pregunta
    }

    if (seenIds.has(q.id)) fail(`ID duplicado: "${q.id}"`);
    seenIds.add(q.id);
    if (!KEBAB.test(q.id)) fail(`[${q.id}] el id debe ser kebab-case (ej. "norm-001")`);

    if (!(CATEGORY_KEYS as readonly string[]).includes(q.category)) {
      fail(`[${q.id}] category "${q.category}" no es una de las 16 materias oficiales`);
    } else {
      perCategory.set(q.category, (perCategory.get(q.category) ?? 0) + 1);
    }
    perDifficulty.set(q.difficulty, (perDifficulty.get(q.difficulty) ?? 0) + 1);
    correctDist[q.correctAnswer]++;

    const normalized = q.answers.map((a) => a.trim().toLowerCase());
    if (new Set(normalized).size !== 3) {
      fail(`[${q.id}] las 3 respuestas deben ser distintas entre sí`);
    }

    if (q.image !== undefined) {
      usedImages.add(q.image);
      if (!artKeys.includes(q.image)) {
        fail(`[${q.id}] image="${q.image}" no existe en QUESTION_ART`);
      }
    }
    if (q.video !== undefined) {
      warn(`[${q.id}] define video (el examen no incluye preguntas con vídeo a 2026-10-06)`);
    }
    if (!q.active) warn(`[${q.id}] inactiva: no se incluye en questionBank`);
    if (q.tags.length === 0) warn(`[${q.id}] no tiene tags`);
    if (q.sourceType === "official-published") {
      warn(`[${q.id}] marcada como official-published: verificar cita literal + URL DGT`);
    }
  }

  // Todas las categorías deben tener al menos una pregunta.
  for (const c of CATEGORY_KEYS) {
    if (!perCategory.has(c)) fail(`La categoría "${c}" no tiene ninguna pregunta`);
  }

  // questionBank debe ser exactamente el filtrado de activas.
  const expectedActive = allQuestions.filter((q) => {
    const p = QuestionSchema.safeParse(q);
    return p.success && p.data.active;
  }).length;
  if (questionBank.length !== expectedActive) {
    fail(`questionBank tiene ${questionBank.length} preguntas pero hay ${expectedActive} activas`);
  }

  // Ilustraciones sin usar.
  for (const key of artKeys) {
    if (!usedImages.has(key)) warn(`Ilustración "${key}" registrada en QUESTION_ART pero sin usar`);
  }

  // Distribución de la respuesta correcta (sospechoso si una posición domina).
  const total = correctDist[0] + correctDist[1] + correctDist[2];
  if (total > 0) {
    correctDist.forEach((n, i) => {
      if (n / total > 0.6) {
        warn(`La respuesta correcta está en la posición ${i} en el ${(100 * (n / total)).toFixed(0)} % de los casos: repartir mejor`);
      }
    });
  }

  // ---- informe ----
  console.log("=== Validación del banco de preguntas ===");
  console.log(`BANK_VERSION : ${BANK_VERSION}`);
  console.log(`Preguntas    : ${allQuestions.length} totales · ${questionBank.length} activas`);
  console.log(`Categorías   : ${perCategory.size}/16 con preguntas`);
  for (const c of CATEGORY_KEYS) {
    console.log(`  - ${c}: ${perCategory.get(c) ?? 0}`);
  }
  console.log(
    `Dificultad    : ${["easy", "medium", "hard"].map((d) => `${d}=${perDifficulty.get(d) ?? 0}`).join(" ")}`,
  );
  console.log(`correctAnswer : pos0=${correctDist[0]} pos1=${correctDist[1]} pos2=${correctDist[2]}`);
  console.log(`Ilustraciones : ${artKeys.length} en QUESTION_ART · ${usedImages.size} usadas`);

  if (warnings.length > 0) {
    console.log(`\n⚠ Avisos (${warnings.length}):`);
    for (const w of warnings) console.log(`  ⚠ ${w}`);
  }
  if (errors.length > 0) {
    console.log(`\n✗ Errores (${errors.length}):`);
    for (const e of errors) console.log(`  ✗ ${e}`);
    console.log("\nValidación FALLIDA.");
    process.exit(1);
  }
  console.log("\n✓ Validación superada: el banco está en verde.");
}

main().catch((err) => {
  console.error("✗ Error inesperado en la validación:", err);
  process.exit(1);
});
