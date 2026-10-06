import type { Question } from "./schema";

/**
 * Bloque 11 — auxilio
 * Comportamiento en caso de accidente (señalizar, alertar) y primeros
 * auxilios a las víctimas (materia 11.ª del Anexo V, B) 1 del RD 818/2009).
 */
export const auxilioQuestions: Question[] = [
  {
    id: "aux-001",
    question: "¿Qué significan las siglas PAS en caso de accidente de circulación?",
    answers: [
      "Proteger, Avisar y Socorrer.",
      "Parar, Aparcar y Señalizar.",
      "Prevenir, Actuar y Salvar.",
    ],
    correctAnswer: 0,
    explanation:
      "PAS es el protocolo de actuación ante un accidente: Proteger la zona (evitar nuevos accidentes), Avisar a los servicios de emergencia (112) y Socorrer a las víctimas, en ese orden.",
    category: "auxilio",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["PAS", "accidente"],
  },
  {
    id: "aux-002",
    question: "Ante un accidente con heridos, ¿cuál es la primera actuación (la P de PAS)?",
    answers: [
      "Mover a los heridos fuera de los vehículos cuanto antes.",
      "Proteger la zona: señalizar el accidente para evitar nuevos riesgos.",
      "Ir a buscar ayuda dejando a los heridos solos.",
    ],
    correctAnswer: 1,
    explanation:
      "Lo primero es Proteger: señalizar y asegurar la zona para no provocar otro accidente (luces de emergencia, baliza V16, chaleco). Mover a los heridos sin necesidad puede agravar sus lesiones, y dejarlos solos retrasa el socorro.",
    category: "auxilio",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["PAS", "proteger"],
  },
  {
    id: "aux-003",
    question:
      "Desde el 1 de enero de 2026, ¿cuál es el medio legal de preseñalización de peligro en caso de accidente o avería?",
    answers: [
      "La baliza luminosa V16 conectada, colocada preferiblemente en el techo del vehículo.",
      "Los triángulos de preseñalización.",
      "Solamente las luces de emergencia.",
    ],
    correctAnswer: 0,
    explanation:
      "Desde el 1/1/2026 la baliza V16 conectada es el ÚNICO medio legal de preseñalización: sustituye a los triángulos (RD 159/2021). Se coloca preferiblemente en el techo, sin necesidad de salir del vehículo, y emite su posición a la DGT.",
    category: "auxilio",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference:
      "https://www.dgt.es/export/sites/web-DGT/.galleries/downloads/muevete-con-seguridad/normas-de-trafico/MOV-gestion-trafico/2025/2025.01.20-Instruccion-MOV-25-1-V-16-CIRCULACION-INTERNACIONALfin.pdf.xsig.pdf",
    legalReference: "RD 159/2021 (baliza V16 conectada)",
    lastVerified: "2026-10-06",
    image: "v16",
    active: true,
    tags: ["V16", "preseñalización", "avería"],
  },
  {
    id: "aux-004",
    question: "¿Está obligado un conductor a auxiliar a las víctimas de un accidente de circulación?",
    answers: [
      "No, solo están obligados los servicios de emergencia.",
      "Sí, siempre que no exista peligro para él o para terceros.",
      "Solo si el accidente lo ha causado él.",
    ],
    correctAnswer: 1,
    explanation:
      "Todo usuario de la vía implicado o que presencie un accidente está obligado a auxiliar a las víctimas, salvo que hacerlo suponga peligro para él o para terceros. La omisión del deber de socorro está castigada por la ley.",
    category: "auxilio",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722&tn=1",
    legalReference: "RDL 6/2015 (obligación de auxilio)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["auxilio", "deber de socorro"],
  },
  {
    id: "aux-005",
    question: "Al socorrer a un herido en un accidente de circulación, ¿qué NO debe hacer nunca?",
    answers: [
      "Aflojarle la ropa que le oprima.",
      "Moverle si no existe un peligro inminente, ni darle de comer o beber.",
      "Taparle con una manta para evitar que se enfríe.",
    ],
    correctAnswer: 1,
    explanation:
      "Al herido no se le mueve (salvo peligro inminente: fuego, riesgo de atropello...) porque podría tener lesiones medulares, ni se le da de comer o beber (podría necesitar cirugía urgente). Aflojar la ropa y abrigarle sí son actuaciones correctas.",
    category: "auxilio",
    difficulty: "hard",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["primeros auxilios", "heridos"],
  },
];
