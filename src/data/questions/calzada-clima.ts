import type { Question } from "./schema";

/**
 * Bloque 6 — calzada-clima
 * Riesgos en función del estado de la calzada (condiciones atmosféricas,
 * hora del día/noche) y seguridad de la conducción en túneles
 * (materia 6.ª del Anexo V, B) 1 del RD 818/2009).
 */
export const calzadaClimaQuestions: Question[] = [
  {
    id: "cli-001",
    question: "Al comenzar a llover, ¿qué es lo primero que debe hacer?",
    answers: [
      "Encender las luces antiniebla delanteras y traseras.",
      "Reducir la velocidad y aumentar la distancia de seguridad.",
      "Frenar bruscamente para comprobar el agarre de los neumáticos.",
    ],
    correctAnswer: 1,
    explanation:
      "Con lluvia disminuye la adherencia y aumenta la distancia de frenado: hay que reducir la velocidad y aumentar la distancia de seguridad. Los primeros minutos son los más peligrosos (la mezcla de agua con polvo y grasa forma una capa muy deslizante). Las antiniebla no son para la lluvia normal y frenar bruscamente puede provocar un derrape.",
    category: "calzada-clima",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    image: "rain",
    active: true,
    tags: ["lluvia", "adherencia"],
  },
  {
    id: "cli-002",
    question: "¿Cuándo se produce el aquaplaning?",
    answers: [
      "Cuando se calientan los frenos en una bajada prolongada.",
      "Cuando los neumáticos pierden el contacto con la calzada por una capa de agua y el vehículo «flota».",
      "Cuando el motor se cala por exceso de agua en la admisión.",
    ],
    correctAnswer: 1,
    explanation:
      "El aquaplaning ocurre cuando entre el neumático y la calzada se interpone una cuña de agua que impide el contacto: el vehículo flota y se pierde la dirección y el frenado. Lo favorecen la velocidad elevada, el agua acumulada y los neumáticos desgastados o con presión incorrecta.",
    category: "calzada-clima",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["lluvia", "aquaplaning"],
  },
  {
    id: "cli-003",
    question: "Al circular por un túnel, ¿qué alumbrado debe llevar encendido?",
    answers: [
      "Solo el alumbrado de posición.",
      "El alumbrado de cruce, además del de posición.",
      "El alumbrado de largo alcance (carretera).",
    ],
    correctAnswer: 1,
    explanation:
      "En túneles y pasos inferiores es obligatorio circular con el alumbrado de cruce encendido, aunque el túnel esté bien iluminado. La luz de carretera (larga) está prohibida porque deslumbraría a los demás conductores.",
    category: "calzada-clima",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    image: "tunnel",
    active: true,
    tags: ["túnel", "alumbrado"],
  },
  {
    id: "cli-004",
    question: "Si la calzada presenta placas de hielo, ¿cómo debe conducir?",
    answers: [
      "Aumentando la velocidad para superar rápido la zona helada.",
      "Frenando con fuerza de forma intermitente para «probar» el hielo.",
      "Con suavidad: sin acelerones, frenazos ni giros bruscos de volante.",
    ],
    correctAnswer: 2,
    explanation:
      "Sobre hielo la adherencia es mínima: cualquier brusquedad (acelerar, frenar o girar de golpe) provoca la pérdida de control. Hay que circular con suavidad, a velocidad muy reducida y con marchas largas, aumentando mucho la distancia de seguridad.",
    category: "calzada-clima",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["hielo", "adherencia"],
  },
];
