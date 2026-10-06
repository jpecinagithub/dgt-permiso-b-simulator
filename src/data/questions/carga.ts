import type { Question } from "./schema";

/**
 * Bloque 12 — carga
 * Factores de seguridad relativos a la carga del vehículo y a las personas
 * transportadas (materia 12.ª del Anexo V, B) 1 del RD 818/2009).
 */
export const cargaQuestions: Question[] = [
  {
    id: "car-001",
    question: "¿Cómo debe ir colocada la carga en un turismo?",
    answers: [
      "Suelta en el maletero, para poder acceder a ella fácilmente.",
      "Bien sujeta, sin comprometer la estabilidad del vehículo ni ocultar luces, espejos o matrícula.",
      "Repartida solamente en el lado derecho para equilibrar al conductor.",
    ],
    correctAnswer: 1,
    explanation:
      "La carga debe ir bien sujeta para que no se desplace con los movimientos del vehículo, sin comprometer su estabilidad ni ocultar los dispositivos de alumbrado, señalización o la placa de matrícula.",
    category: "carga",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["carga", "estabilidad"],
  },
  {
    id: "car-002",
    question: "Si la carga transportada sobresale por la parte trasera del vehículo, ¿cómo debe señalizarse?",
    answers: [
      "Con un pañuelo rojo atado al extremo de la carga.",
      "No es necesario señalizarla si se circula de día.",
      "Con el panel V-20 de franjas rojas y blancas.",
    ],
    correctAnswer: 2,
    explanation:
      "La carga que sobresale por detrás debe señalizarse con el panel V-20 (franjas diagonales rojas y blancas reflectantes), colocado en el extremo posterior de la carga. El pañuelo rojo no es un medio reglamentario.",
    category: "carga",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["carga", "V-20", "señalización"],
  },
  {
    id: "car-003",
    question: "¿Cuántas personas pueden viajar en un turismo?",
    answers: [
      "Como máximo, el número de plazas autorizadas que figura en la documentación del vehículo.",
      "Las que quepan con comodidad, aunque superen las plazas autorizadas.",
      "Siempre cinco personas, sea cual sea el turismo.",
    ],
    correctAnswer: 0,
    explanation:
      "No puede viajar un número de personas superior al de plazas autorizadas en la ficha técnica del vehículo (en turismos, un máximo de 9 incluido el conductor). Llevar un niño «en brazos» para meter más ocupantes está prohibido.",
    category: "carga",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722&tn=1",
    legalReference: "RDL 6/2015 (Ley de Tráfico y Seguridad Vial)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["pasajeros", "plazas"],
  },
  {
    id: "car-004",
    question: "Al colocar equipaje en la baca del vehículo debe...",
    answers: [
      "sujetarlo firmemente y no superar la altura ni el peso que permite mantener la estabilidad del vehículo.",
      "colocarlo suelto para repartir mejor el peso.",
      "cubrirlo con una lona sin sujetarlo, para no dañar la pintura del techo.",
    ],
    correctAnswer: 0,
    explanation:
      "La carga en la baca debe ir firmemente sujeta (correas, red o cofre) y sin exceder la carga máxima del techo: una carga suelta o excesiva eleva el centro de gravedad, compromete la estabilidad y puede desprenderse en marcha.",
    category: "carga",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["carga", "baca", "estabilidad"],
  },
];
