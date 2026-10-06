import type { Question } from "./schema";
import { CATEGORY_KEYS } from "./schema";
import { normasCirculacionQuestions } from "./normas-circulacion";
import { accidentesCausasQuestions } from "./accidentes-causas";
import { convivenciaQuestions } from "./convivencia";
import { percepcionQuestions } from "./percepcion";
import { distanciasQuestions } from "./distancias";
import { calzadaClimaQuestions } from "./calzada-clima";
import { laViaQuestions } from "./la-via";
import { vulnerablesQuestions } from "./vulnerables";
import { tiposVehiculosQuestions } from "./tipos-vehiculos";
import { documentacionQuestions } from "./documentacion";
import { auxilioQuestions } from "./auxilio";
import { cargaQuestions } from "./carga";
import { abandonoQuestions } from "./abandono";
import { mecanicaQuestions } from "./mecanica";
import { retencionQuestions } from "./retencion";
import { medioAmbienteQuestions } from "./medio-ambiente";

/**
 * Versión del banco de preguntas. Se incrementa (semver) cada vez que se
 * añaden, modifican o retiran preguntas de forma relevante.
 */
export const BANK_VERSION = "1.0.0";

/**
 * Todas las preguntas del banco, sin filtrar (incluye las inactivas).
 * Útil para validación y herramientas de autoría.
 */
export const allQuestions: Question[] = [
  ...normasCirculacionQuestions,
  ...accidentesCausasQuestions,
  ...convivenciaQuestions,
  ...percepcionQuestions,
  ...distanciasQuestions,
  ...calzadaClimaQuestions,
  ...laViaQuestions,
  ...vulnerablesQuestions,
  ...tiposVehiculosQuestions,
  ...documentacionQuestions,
  ...auxilioQuestions,
  ...cargaQuestions,
  ...abandonoQuestions,
  ...mecanicaQuestions,
  ...retencionQuestions,
  ...medioAmbienteQuestions,
];

/**
 * Banco de preguntas listo para la app: solo preguntas activas.
 * Escalar a cientos de preguntas solo requiere añadir ficheros por categoría
 * (o más preguntas en los existentes) e importarlos aquí.
 */
export const questionBank: Question[] = allQuestions.filter((q) => q.active);

export { CATEGORY_KEYS };
export type { Question };
