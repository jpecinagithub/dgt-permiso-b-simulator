import type { Question } from "./schema";

/**
 * Bloque 3 — convivencia
 * Vigilancia y actitudes respecto a los demás usuarios: no molestar,
 * no sorprender, advertir, comprender y prever los movimientos de los demás
 * (materia 3.ª del Anexo V, B) 1 del RD 818/2009).
 */
export const convivenciaQuestions: Question[] = [
  {
    id: "con-001",
    question: "Una conducción basada en la convivencia vial exige...",
    answers: [
      "circular siempre por el centro de la calzada para ser más visible.",
      "utilizar la bocina para advertir todas las maniobras.",
      "no molestar ni sorprender a los demás usuarios, advertir las maniobras y prever sus movimientos.",
    ],
    correctAnswer: 2,
    explanation:
      "La convivencia vial se resume en: no molestar, no sorprender, advertir (señalizar) las maniobras propias, comprender y prever los movimientos de los demás usuarios (Anexo V del RD 818/2009).",
    category: "convivencia",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2009-9481&tn=1",
    legalReference: "Anexo V RD 818/2009",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["convivencia", "actitudes"],
  },
  {
    id: "con-002",
    question: "Antes de cambiar de carril, el conductor debe...",
    answers: [
      "cambiar de carril lo más rápido posible para no molestar.",
      "señalizar la maniobra con antelación suficiente mediante el intermitente y comprobar que puede hacerla sin peligro.",
      "tocar la bocina y cambiar de carril inmediatamente.",
    ],
    correctAnswer: 1,
    explanation:
      "Toda maniobra (cambio de carril, giro, adelantamiento...) debe advertirse con antelación suficiente y solo ejecutarse cuando no suponga peligro ni molestia para los demás. La bocina no sustituye al intermitente.",
    category: "convivencia",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["maniobras", "intermitentes"],
  },
  {
    id: "con-003",
    question:
      "Un vehículo circula detrás de usted queriendo adelantarle en una vía de un carril por sentido. ¿Qué debe hacer?",
    answers: [
      "Aumentar la velocidad para no ser adelantado.",
      "Mantenerse a la derecha, sin aumentar la velocidad ni obstaculizar el adelantamiento.",
      "Desplazarse al arcén para dejarle pasar.",
    ],
    correctAnswer: 1,
    explanation:
      "El conductor adelantado debe facilitar la maniobra: mantenerse a la derecha y no aumentar la velocidad (aumentarla cuando le adelantan está prohibido). El arcén no es para circular: desplazarse a él sería incorrecto y peligroso.",
    category: "convivencia",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["adelantamiento", "convivencia"],
  },
  {
    id: "con-004",
    question: "Un peatón se dispone a cruzar por un paso de peatones señalizado. ¿Qué debe hacer?",
    answers: [
      "Reducir la velocidad y, si es necesario, detenerse para dejarle pasar.",
      "Acelerar para pasar antes de que el peatón inicie el cruce.",
      "Tocar la bocina para que el peatón se dé prisa.",
    ],
    correctAnswer: 0,
    explanation:
      "Los peatones tienen prioridad en los pasos señalizados: hay que moderar la velocidad y detenerse para permitir el cruce. Acelerar o usar la bocina para intimidar al peatón vulnera la convivencia vial y la protección de los usuarios vulnerables.",
    category: "convivencia",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    image: "zebra",
    active: true,
    tags: ["peatones", "prioridad"],
  },
];
