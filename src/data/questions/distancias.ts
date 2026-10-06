import type { Question } from "./schema";

/**
 * Bloque 5 — distancias
 * Distancias de seguridad, distancia de frenado y estabilidad del vehículo
 * según condiciones meteorológicas, características de la vía y estado de la calzada
 * (materia 5.ª del Anexo V, B) 1 del RD 818/2009).
 */
export const distanciasQuestions: Question[] = [
  {
    id: "dis-001",
    question: "¿Qué es la distancia de seguridad?",
    answers: [
      "La distancia recorrida durante el tiempo de reacción.",
      "Una distancia fija de 50 metros, válida para toda vía.",
      "La distancia que permite detener el vehículo sin colisionar con el que circula delante si este frena bruscamente.",
    ],
    correctAnswer: 2,
    explanation:
      "La distancia de seguridad es el espacio suficiente para poder detenerse sin alcanzar al vehículo precedente si frena de improviso. No es una cifra fija: depende de la velocidad, la calzada y el estado del vehículo (Art. 54 RGC).",
    category: "distancias",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "Art. 54 RGC",
    lastVerified: "2026-10-06",
    image: "safe-distance",
    active: true,
    tags: ["distancia de seguridad"],
  },
  {
    id: "dis-002",
    question: "¿De qué depende la distancia de frenado?",
    answers: [
      "Solamente de la velocidad.",
      "De la velocidad, del estado de la calzada y del estado de los neumáticos y los frenos.",
      "Solamente del tiempo de reacción del conductor.",
    ],
    correctAnswer: 1,
    explanation:
      "La distancia de frenado (lo que recorre el vehículo desde que se pisa el freno hasta detenerse) depende de la velocidad, la adherencia de la calzada (lluvia, hielo...) y el estado de neumáticos, frenos y suspensión. El tiempo de reacción determina la distancia de reacción, no la de frenado: no confundirlas.",
    category: "distancias",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "Art. 54 RGC",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["distancia de frenado"],
  },
  {
    id: "dis-003",
    question: "Si duplica la velocidad, ¿qué ocurre con la distancia de frenado?",
    answers: [
      "Se duplica.",
      "No varía.",
      "Se multiplica por cuatro.",
    ],
    correctAnswer: 2,
    explanation:
      "Trampa numérica clásica: la distancia de frenado crece con el cuadrado de la velocidad. Al duplicar la velocidad, la distancia de frenado se cuadruplica (2² = 4). Por eso pequeños excesos de velocidad tienen consecuencias tan graves.",
    category: "distancias",
    difficulty: "hard",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "Art. 54 RGC",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["distancia de frenado", "velocidad", "trampas"],
  },
  {
    id: "dis-004",
    question: "La distancia de detención es...",
    answers: [
      "la suma de la distancia de reacción y la distancia de frenado.",
      "exactamente igual a la distancia de seguridad.",
      "la distancia que recorre el vehículo con el motor apagado.",
    ],
    correctAnswer: 0,
    explanation:
      "La distancia de detención (espacio total hasta que el vehículo se para) = distancia de reacción (desde que se percibe el peligro hasta que se frena) + distancia de frenado (desde que se frena hasta detenerse).",
    category: "distancias",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "Art. 54 RGC",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["distancia de detención", "distancia de reacción"],
  },
];
