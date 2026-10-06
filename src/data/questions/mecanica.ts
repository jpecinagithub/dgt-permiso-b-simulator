import type { Question } from "./schema";

/**
 * Bloque 14 — mecanica
 * Elementos mecánicos relacionados con la seguridad: detección de los defectos
 * corrientes en dirección, suspensión, ruedas, frenos, neumáticos, alumbrado y
 * señalización óptica, retrovisores, lavaparabrisas y limpiaparabrisas,
 * cinturones de seguridad y señales acústicas
 * (materia 14.ª del Anexo V, B) 1 del RD 818/2009).
 */
export const mecanicaQuestions: Question[] = [
  {
    id: "mec-001",
    question: "¿Cuándo debe comprobar la presión de los neumáticos?",
    answers: [
      "En caliente, justo después de circular.",
      "En frío y con regularidad, siguiendo las indicaciones del fabricante.",
      "Solo cuando se pincha un neumático.",
    ],
    correctAnswer: 1,
    explanation:
      "La presión se mide en frío (antes de circular o tras un reposo), porque en caliente el aire se dilata y la medición sale falsamente alta. Una presión incorrecta aumenta el consumo, el desgaste y la distancia de frenado.",
    category: "mecanica",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    image: "tyre",
    active: true,
    tags: ["neumáticos", "presión", "mantenimiento"],
  },
  {
    id: "mec-002",
    question: "¿Cuál es la profundidad mínima legal del dibujo de los neumáticos de un turismo?",
    answers: [
      "1,6 mm.",
      "1 mm.",
      "2,5 mm.",
    ],
    correctAnswer: 0,
    explanation:
      "El dibujo de los neumáticos debe tener una profundidad mínima de 1,6 mm en toda la banda de rodadura. Por debajo, el neumático no evacua el agua y el riesgo de aquaplaning se dispara. Trampa de cifras cercanas típica.",
    category: "mecanica",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["neumáticos", "dibujo", "1,6 mm"],
  },
  {
    id: "mec-003",
    question: "Si durante la marcha se enciende el testigo rojo del sistema de frenos, ¿qué debe hacer?",
    answers: [
      "Continuar hasta el taller más cercano, aunque esté lejos.",
      "Acelerar suavemente para que el testigo se apague.",
      "Detener el vehículo lo antes posible en un lugar seguro y no continuar circulando.",
    ],
    correctAnswer: 2,
    explanation:
      "Un testigo rojo indica una avería grave que compromete la seguridad: hay que detener el vehículo en cuanto sea posible hacerlo con seguridad y no seguir circulando. Los testigos amarillos o naranjas permiten continuar con precaución hasta revisarlo.",
    category: "mecanica",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["frenos", "testigos", "avería"],
  },
  {
    id: "mec-004",
    question: "Un desgaste irregular de los neumáticos (más por un lado o por zonas) puede indicar...",
    answers: [
      "que la presión es siempre la correcta.",
      "que los frenos funcionan perfectamente.",
      "un defecto en la suspensión, la dirección o la alineación de las ruedas.",
    ],
    correctAnswer: 2,
    explanation:
      "El desgaste irregular no es normal: suele deberse a una presión incorrecta, a defectos de alineado/dirección o a problemas de suspensión o amortiguadores. Conviene revisar el vehículo en un taller.",
    category: "mecanica",
    difficulty: "hard",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["neumáticos", "suspensión", "dirección"],
  },
  {
    id: "mec-005",
    question: "Antes de iniciar un viaje largo es recomendable comprobar...",
    answers: [
      "solamente el nivel de combustible.",
      "nada: si el vehículo tiene la ITV en vigor está todo en orden.",
      "los niveles (aceite, refrigerante, líquido de frenos), los neumáticos, las luces y el limpiaparabrisas.",
    ],
    correctAnswer: 2,
    explanation:
      "Antes de un viaje largo hay que revisar los niveles de líquidos, el estado y presión de los neumáticos (incluida la rueda de repuesto), el alumbrado y la señalización, los limpiaparabrisas y los frenos. La ITV no sustituye al mantenimiento del conductor.",
    category: "mecanica",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["mantenimiento", "niveles", "viaje"],
  },
];
