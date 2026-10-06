import type { Question } from "./schema";

/**
 * Bloque 15 — retencion
 * Equipos de seguridad de los vehículos: cinturones, reposacabezas y equipos
 * de seguridad para niños (materia 15.ª del Anexo V, B) 1 del RD 818/2009).
 */
export const retencionQuestions: Question[] = [
  {
    id: "ret-001",
    question: "El uso del cinturón de seguridad es obligatorio...",
    answers: [
      "solo para el conductor y el acompañante delantero.",
      "para el conductor y todos los pasajeros, también en los asientos traseros.",
      "solo fuera de poblado.",
    ],
    correctAnswer: 1,
    explanation:
      "El cinturón es obligatorio para todos los ocupantes del vehículo, en asientos delanteros y traseros, en poblado y fuera de poblado (Art. 117 RGC). No usarlo multiplica el riesgo de lesiones graves en caso de accidente.",
    category: "retencion",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "Art. 117 RGC",
    lastVerified: "2026-10-06",
    image: "seatbelt",
    active: true,
    tags: ["cinturón", "seguridad"],
  },
  {
    id: "ret-002",
    question: "Desde la reforma del RD 518/2026, ¿qué colectivos han perdido la exención del uso del cinturón de seguridad?",
    answers: [
      "Los taxistas, los repartidores y los profesores de autoescuela, entre otros.",
      "Los conductores de autobuses urbanos.",
      "Nadie: las exenciones se mantienen exactamente igual.",
    ],
    correctAnswer: 0,
    explanation:
      "El RD 518/2026 (en vigor 1/10/2026) elimina exenciones históricas: el cinturón pasa a ser obligatorio también para taxistas, repartidores, profesores y examinadores durante el servicio, entre otros colectivos que antes estaban exentos.",
    category: "retencion",
    difficulty: "hard",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/doc.php?id=BOE-A-2026-13889",
    legalReference: "RD 518/2026 (BOE-A-2026-13889)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["RD 518/2026", "cinturón", "exenciones"],
  },
  {
    id: "ret-003",
    question: "¿Cómo debe regularse el reposacabezas?",
    answers: [
      "Lo más bajo posible, para no molestar la visión trasera.",
      "No es necesario regularlo: viene fijo de fábrica.",
      "Con el borde superior a la altura de la parte superior de la cabeza y lo más cerca posible de ella.",
    ],
    correctAnswer: 2,
    explanation:
      "El reposacabezas protege del «latigazo cervical» en colisiones traseras, pero solo si está bien regulado: borde superior a la altura de la coronilla y pegado a la cabeza. Mal regulado, no protege e incluso puede lesionar.",
    category: "retencion",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["reposacabezas", "latigazo cervical"],
  },
  {
    id: "ret-004",
    question: "Los menores de 135 cm de estatura deben viajar...",
    answers: [
      "con el cinturón de adulto directamente.",
      "en brazos de un adulto en el asiento trasero.",
      "en un sistema de retención infantil (SRI) homologado y adaptado a su talla y peso, en los asientos traseros.",
    ],
    correctAnswer: 2,
    explanation:
      "Los menores que no alcancen 135 cm deben usar un SRI homologado adecuado a su talla y peso, instalado en los asientos traseros (Art. 116 RGC). El cinturón de adulto no les protege: les queda a la altura del cuello.",
    category: "retencion",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "Art. 116 RGC",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["SRI", "niños", "135 cm"],
  },
  {
    id: "ret-005",
    question: "¿Puede un menor de 135 cm viajar en el asiento delantero con su sistema de retención infantil?",
    answers: [
      "Solo cuando los asientos traseros ya estén ocupados por otros menores con SRI o no sea posible instalar el SRI en ellos.",
      "Siempre que quiera, si lleva su SRI.",
      "Nunca, en ningún caso.",
    ],
    correctAnswer: 0,
    explanation:
      "La norma general es el asiento trasero; el delantero con SRI solo se permite excepcionalmente: cuando los asientos traseros estén ocupados por otros menores con sus SRI o no sea posible instalarlo en ellos (Art. 116 RGC). Trampa de absolutos («siempre»/«nunca»).",
    category: "retencion",
    difficulty: "hard",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "Art. 116 RGC",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["SRI", "niños", "asiento delantero", "trampas"],
  },
];
