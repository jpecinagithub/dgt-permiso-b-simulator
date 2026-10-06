import type { Question } from "./schema";

/**
 * Bloque 7 — la-via
 * La vía: clases y partes, características y disposiciones legales
 * (materia 7.ª del Anexo V, B) 1 del RD 818/2009).
 */
export const laViaQuestions: Question[] = [
  {
    id: "via-001",
    question: "¿Qué es una autopista?",
    answers: [
      "Cualquier vía con más de dos carriles por sentido.",
      "Una vía urbana de gran capacidad.",
      "Una vía de circulación rápida, sin cruces a nivel y con accesos controlados.",
    ],
    correctAnswer: 2,
    explanation:
      "La autopista es una vía rápida reservada a vehículos a motor, sin cruces a nivel, con calzadas separadas por sentido y accesos mediante carriles de aceleración/deceleración (Anexo I del RDL 6/2015). El número de carriles no la define.",
    category: "la-via",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722&tn=1",
    legalReference: "Anexo I RDL 6/2015",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["autopista", "definiciones"],
  },
  {
    id: "via-002",
    question: "¿En qué se diferencia una autovía de una autopista?",
    answers: [
      "En que la autovía puede tener cruces a nivel y accesos a propiedades colindantes, y la autopista no.",
      "En que no hay ninguna diferencia: son sinónimos.",
      "En que la autopista siempre es de peaje y la autovía siempre es gratuita.",
    ],
    correctAnswer: 0,
    explanation:
      "Ambas son vías rápidas de calzadas separadas, pero la autopista no admite cruces a nivel ni accesos directos a propiedades colindantes; la autovía sí puede tenerlos (con limitaciones). El peaje no define la autopista: trampa típica.",
    category: "la-via",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722&tn=1",
    legalReference: "Anexo I RDL 6/2015",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["autovía", "autopista", "definiciones"],
  },
  {
    id: "via-003",
    question: "¿Qué es el arcén?",
    answers: [
      "La franja longitudinal contigua a la calzada, no destinada a la circulación normal de vehículos.",
      "La zona que separa los dos sentidos de circulación.",
      "La parte de la vía destinada a los peatones en poblado.",
    ],
    correctAnswer: 0,
    explanation:
      "El arcén es la franja junto a la calzada, fuera de ella: no se circula por él salvo casos tasados (p. ej., inmovilización por emergencia). La zona que separa sentidos es la mediana y la destinada a peatones en poblado es la acera: no confundirlas.",
    category: "la-via",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722&tn=1",
    legalReference: "Anexo I RDL 6/2015",
    lastVerified: "2026-10-06",
    image: "road-anatomy",
    active: true,
    tags: ["arcén", "definiciones"],
  },
  {
    id: "via-004",
    question: "¿Qué es la mediana?",
    answers: [
      "La línea que divide los carriles del mismo sentido.",
      "La zona longitudinal que separa los dos sentidos de circulación en algunas vías.",
      "El espacio entre el arcén y la cuneta.",
    ],
    correctAnswer: 1,
    explanation:
      "La mediana es la zona (a veces con barrera o vegetación) que separa físicamente las calzadas de cada sentido, propia de autopistas, autovías y vías desdobladas. La línea entre carriles del mismo sentido es la marca vial longitudinal discontinua o continua.",
    category: "la-via",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722&tn=1",
    legalReference: "Anexo I RDL 6/2015",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["mediana", "definiciones"],
  },
];
