import type { Question } from "./schema";

/**
 * Bloque 10 — documentacion
 * Documentos administrativos necesarios para circular (conductor, vehículo
 * y, en su caso, carga) (materia 10.ª del Anexo V, B) 1 del RD 818/2009).
 */
export const documentacionQuestions: Question[] = [
  {
    id: "doc-001",
    question: "Para circular, el conductor debe llevar consigo...",
    answers: [
      "el permiso de conducción y la documentación del vehículo: permiso de circulación, tarjeta ITV y seguro obligatorio.",
      "solamente el permiso de conducción.",
      "solamente el documento de identidad.",
    ],
    correctAnswer: 0,
    explanation:
      "Para circular se necesita la documentación del conductor (permiso de conducción en vigor) y la del vehículo (permiso de circulación, tarjeta de inspección técnica y seguro obligatorio). Circular sin seguro o sin la ITV en vigor es sancionable.",
    category: "documentacion",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722&tn=1",
    legalReference: "RDL 6/2015 (Ley de Tráfico y Seguridad Vial)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["documentación", "permiso", "ITV", "seguro"],
  },
  {
    id: "doc-002",
    question: "¿Con cuántos puntos inicia su permiso un conductor novel?",
    answers: [
      "Con 12 puntos.",
      "Con 6 puntos.",
      "Con 8 puntos.",
    ],
    correctAnswer: 2,
    explanation:
      "Los conductores noveles (menos de 3 años de antigüedad en el permiso) inician con 8 puntos; los conductores experimentados sin sanciones, con 12. Trampa típica: 12 es el saldo inicial del conductor no novel.",
    category: "documentacion",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722&tn=1",
    legalReference: "RDL 6/2015 (permiso por puntos; reforma Ley 18/2021)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["puntos", "noveles"],
  },
  {
    id: "doc-003",
    question: "¿Con cuántos puntos inicia su permiso un conductor experimentado que no ha sido sancionado?",
    answers: [
      "Con 15 puntos.",
      "Con 12 puntos.",
      "Con 8 puntos.",
    ],
    correctAnswer: 1,
    explanation:
      "El saldo inicial del conductor experimentado es 12 puntos. Los 15 puntos son el máximo que puede alcanzar un buen conductor con el tiempo (bonificaciones), no el saldo inicial; 8 es el saldo inicial del novel.",
    category: "documentacion",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722&tn=1",
    legalReference: "RDL 6/2015 (permiso por puntos)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["puntos"],
  },
  {
    id: "doc-004",
    question: "¿Cuándo debe pasar un turismo nuevo su primera inspección técnica (ITV)?",
    answers: [
      "Al año de su matriculación.",
      "A los 4 años desde su matriculación.",
      "A los 2 años desde su matriculación.",
    ],
    correctAnswer: 1,
    explanation:
      "Los turismos pasan su primera ITV a los 4 años de la matriculación; después, cada 2 años hasta los 10 años, y anualmente a partir de entonces (RD 920/2017). Trampa de cifras cercanas típica del examen.",
    category: "documentacion",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.dgt.es",
    legalReference: "RD 920/2017 (inspección técnica de vehículos)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["ITV", "inspección"],
  },
  {
    id: "doc-005",
    question: "El seguro obligatorio del automóvil cubre...",
    answers: [
      "los daños causados a terceros, pero no los daños propios ni los del conductor responsable del accidente.",
      "todos los daños, incluidos los del propio vehículo y los de su conductor aunque sea culpable.",
      "solamente los daños materiales, nunca los daños personales.",
    ],
    correctAnswer: 0,
    explanation:
      "El seguro obligatorio cubre la responsabilidad civil frente a terceros (daños personales y materiales causados a otros). No cubre los daños propios del vehículo asegurado ni los del conductor responsable: para eso existen los seguros voluntarios (a todo riesgo, de conductor...).",
    category: "documentacion",
    difficulty: "hard",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.dgt.es",
    legalReference: "RDL 8/2004 (seguro obligatorio de automóviles)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["seguro", "responsabilidad civil"],
  },
];
