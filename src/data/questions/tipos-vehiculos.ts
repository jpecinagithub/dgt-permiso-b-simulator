import type { Question } from "./schema";

/**
 * Bloque 9 — tipos-vehiculos
 * Riesgos inherentes a la circulación y conducción de los diversos tipos de
 * vehículos y condiciones de visibilidad de sus conductores
 * (materia 9.ª del Anexo V, B) 1 del RD 818/2009).
 */
export const tiposVehiculosQuestions: Question[] = [
  {
    id: "tv-001",
    question: "El conductor de un camión, respecto al conductor de un turismo, tiene...",
    answers: [
      "mejor visibilidad en todas direcciones.",
      "la misma distancia de frenado.",
      "mayores ángulos muertos y necesita más espacio y tiempo para maniobrar.",
    ],
    correctAnswer: 2,
    explanation:
      "Los vehículos pesados tienen ángulos muertos mucho mayores (laterales y traseros), necesitan más distancia para frenar y más espacio para girar o cambiar de carril. Por eso hay que extremar la precaución al circular junto a ellos y no situarse en sus zonas no visibles.",
    category: "tipos-vehiculos",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["vehículos pesados", "ángulos muertos"],
  },
  {
    id: "tv-002",
    question: "¿Por qué los conductores de ciclomotores y motocicletas son usuarios especialmente vulnerables?",
    answers: [
      "Porque circulan siempre a velocidad excesiva.",
      "Porque carecen de carrocería protectora y son menos visibles para los demás conductores.",
      "Porque no están obligados a respetar las señales de tráfico.",
    ],
    correctAnswer: 1,
    explanation:
      "Las motocicletas y ciclomotores no tienen carrocería que proteja a sus ocupantes y, por su tamaño, son menos visibles (ángulos muertos, intersecciones). Por eso la normativa los considera usuarios vulnerables con protección reforzada (RD 518/2026).",
    category: "tipos-vehiculos",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/doc.php?id=BOE-A-2026-13889",
    legalReference: "RD 518/2026 (BOE-A-2026-13889)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["motocicletas", "ciclomotores", "vulnerables"],
  },
  {
    id: "tv-003",
    question: "Antes de cruzar un paso a nivel sin barreras ni semáforos, ¿qué debe hacer?",
    answers: [
      "Cruzar rápidamente sin mirar, para no entorpecer la circulación.",
      "Detenerse siempre sobre las vías y tocar la bocina.",
      "Asegurarse de que no se aproxima ningún tren, mirando a ambos lados.",
    ],
    correctAnswer: 2,
    explanation:
      "En los pasos a nivel sin barreras el conductor debe cerciorarse de que no se acerca ningún vehículo ferroviario antes de cruzar, y hacerlo sin detenerse innecesariamente sobre las vías. La imprudencia en los pasos a nivel tiene consecuencias gravísimas.",
    category: "tipos-vehiculos",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    image: "level-crossing",
    active: true,
    tags: ["paso a nivel", "ferrocarril"],
  },
  {
    id: "tv-004",
    question:
      "En vías interurbanas, el conductor de una motocicleta debe llevar obligatoriamente...",
    answers: [
      "guantes y calzado cerrado, además del casco.",
      "solo el casco.",
      "casco y chaleco reflectante en todo caso.",
    ],
    correctAnswer: 0,
    explanation:
      "Novedad del RD 518/2026 (en vigor 1/10/2026): en vías interurbanas los motoristas deben usar guantes y calzado cerrado, además del casco obligatorio. El chaleco reflectante no es obligatorio para motoristas con carácter general.",
    category: "tipos-vehiculos",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/doc.php?id=BOE-A-2026-13889",
    legalReference: "RD 518/2026 (BOE-A-2026-13889)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["RD 518/2026", "motocicletas", "equipamiento"],
  },
];
