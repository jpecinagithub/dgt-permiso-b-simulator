import type { Question } from "./schema";

/**
 * Bloque 2 — accidentes-causas
 * Factores que intervienen en los accidentes de circulación y causas más
 * frecuentes (materia 2.ª del Anexo V, B) 1 del RD 818/2009).
 */
export const accidentesCausasQuestions: Question[] = [
  {
    id: "acc-001",
    question:
      "¿Cuál es la tasa máxima de alcohol en aire espirado permitida para un conductor con más de dos años de antigüedad en el permiso?",
    answers: [
      "0,15 mg/l.",
      "0,25 mg/l.",
      "0,50 mg/l.",
    ],
    correctAnswer: 1,
    explanation:
      "La tasa general es 0,5 g/l en sangre y 0,25 mg/l en aire espirado (Art. 20 RGC). Trampas típicas: 0,15 es la tasa de conductores noveles y profesionales, y 0,50 es la tasa en sangre (g/l), no en aire.",
    category: "accidentes-causas",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "Art. 20 RGC",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["alcohol", "tasas"],
  },
  {
    id: "acc-002",
    question:
      "Un conductor novel (menos de 2 años de permiso) da 0,20 mg/l en un control de aire espirado. ¿Supera la tasa máxima permitida para él?",
    answers: [
      "No, porque el máximo general es 0,25 mg/l.",
      "No, porque aún no llega a 0,50 mg/l.",
      "Sí, porque para los noveles el máximo es 0,15 mg/l.",
    ],
    correctAnswer: 2,
    explanation:
      "Los conductores noveles (menos de 2 años) y los profesionales tienen una tasa reducida: 0,3 g/l en sangre y 0,15 mg/l en aire (Art. 20 RGC). Por tanto, 0,20 mg/l supera su límite aunque esté por debajo del general.",
    category: "accidentes-causas",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "Art. 20 RGC",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["alcohol", "noveles", "tasas"],
  },
  {
    id: "acc-003",
    question: "Respecto al consumo de drogas y la conducción, ¿qué establece la normativa?",
    answers: [
      "Se permite una cantidad mínima siempre que no afecte a la conducción.",
      "Está prohibido conducir con presencia de drogas en el organismo, sin que exista ninguna tasa mínima permitida.",
      "Solo está prohibido si se mezcla con alcohol.",
    ],
    correctAnswer: 1,
    explanation:
      "Con las drogas no hay «tasa legal» como con el alcohol: está prohibido conducir con presencia de drogas en el organismo (tolerancia cero). La única excepción tasada son sustancias prescritas médicamente que no afecten a la conducción.",
    category: "accidentes-causas",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722&tn=1",
    legalReference: "RDL 6/2015 (Ley de Tráfico y Seguridad Vial)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["drogas"],
  },
  {
    id: "acc-004",
    question: "¿Qué efecto produce el alcohol sobre la conducción?",
    answers: [
      "Mejora los reflejos si se consume en pequeñas cantidades.",
      "Aumenta el tiempo de reacción y disminuye la atención y la percepción del riesgo.",
      "Solo afecta a la visión nocturna.",
    ],
    correctAnswer: 1,
    explanation:
      "El alcohol, incluso en pequeñas cantidades, aumenta el tiempo de reacción, reduce la atención y genera una falsa sensación de seguridad (subestimación del riesgo). Es uno de los principales factores concurrentes en los accidentes graves.",
    category: "accidentes-causas",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "Art. 20 RGC",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["alcohol", "efectos"],
  },
  {
    id: "acc-005",
    question: "La fatiga y la somnolencia al volante...",
    answers: [
      "Disminuyen la atención y aumentan el tiempo de reacción, por lo que hay que detenerse y descansar.",
      "Se combaten eficazmente abriendo la ventanilla y subiendo el volumen de la música.",
      "Solo son peligrosas durante la conducción nocturna.",
    ],
    correctAnswer: 0,
    explanation:
      "La fatiga reduce la capacidad de atención y alarga el tiempo de reacción de forma similar al alcohol. Ni el aire fresco ni la música la eliminan: la única medida segura es detenerse en un lugar adecuado y descansar.",
    category: "accidentes-causas",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722&tn=1",
    legalReference: "RDL 6/2015 (Ley de Tráfico y Seguridad Vial)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["fatiga", "sueño"],
  },
];
