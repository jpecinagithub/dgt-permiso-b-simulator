import type { Question } from "./schema";

/**
 * Bloque 4 — percepcion
 * Percepción, evaluación y toma de decisiones; tiempo de reacción; efectos del
 * alcohol, drogas, medicamentos, fatiga y otros factores
 * (materia 4.ª del Anexo V, B) 1 del RD 818/2009).
 */
export const percepcionQuestions: Question[] = [
  {
    id: "per-001",
    question: "¿Qué es el tiempo de reacción?",
    answers: [
      "El tiempo que tarda el vehículo en detenerse desde que se pisa el freno.",
      "El tiempo que transcurre desde que se percibe un peligro hasta que se empieza a actuar sobre los mandos del vehículo.",
      "El tiempo que se tarda en cambiar de marcha.",
    ],
    correctAnswer: 1,
    explanation:
      "El tiempo de reacción es el que pasa entre percibir el peligro y empezar a actuar (p. ej., llevar el pie al freno); suele estimarse en torno a un segundo. No confundirlo con el tiempo/distancia de frenado, que es lo que tarda el vehículo en detenerse una vez que se frena.",
    category: "percepcion",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2009-9481&tn=1",
    legalReference: "Anexo V RD 818/2009",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["tiempo de reacción", "percepción"],
  },
  {
    id: "per-002",
    question: "¿Qué factores aumentan el tiempo de reacción del conductor?",
    answers: [
      "Solo la velocidad excesiva.",
      "El alcohol, las drogas, la fatiga y algunos medicamentos.",
      "Ninguno: el tiempo de reacción es siempre el mismo en todas las personas.",
    ],
    correctAnswer: 1,
    explanation:
      "El tiempo de reacción no es fijo: lo alargan el alcohol, las drogas, la fatiga, el sueño, algunos medicamentos y los estados emocionales alterados. Por eso estas circunstancias multiplican el riesgo de accidente.",
    category: "percepcion",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "Art. 20 RGC",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["tiempo de reacción", "alcohol", "fatiga"],
  },
  {
    id: "per-003",
    question: "Si está en tratamiento con un medicamento, antes de conducir debe...",
    answers: [
      "leer el prospecto o consultar al médico o farmacéutico, porque puede disminuir su capacidad de conducción.",
      "no hacer nada especial: los medicamentos nunca afectan a la conducción.",
      "duplicar la dosis para estar más alerta al volante.",
    ],
    correctAnswer: 0,
    explanation:
      "Muchos medicamentos (antihistamínicos, ansiolíticos, analgésicos potentes...) producen somnolencia o reducen los reflejos. El prospecto advierte cuando afectan a la conducción; ante la duda, consulte al médico o farmacéutico.",
    category: "percepcion",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722&tn=1",
    legalReference: "RDL 6/2015 (Ley de Tráfico y Seguridad Vial)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["medicamentos", "percepción"],
  },
  {
    id: "per-004",
    question: "¿Qué hace disminuir la tasa de alcoholemia?",
    answers: [
      "Tomar café o bebidas energéticas.",
      "Hacer ejercicio físico intenso.",
      "Únicamente el paso del tiempo.",
    ],
    correctAnswer: 2,
    explanation:
      "Trampa clásica del examen: ni el café, ni ducharse con agua fría, ni el ejercicio aceleran la eliminación del alcohol. Solo el hígado, con el paso del tiempo (aprox. 0,15 g/l por hora), reduce la alcoholemia.",
    category: "percepcion",
    difficulty: "hard",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "Art. 20 RGC",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["alcohol", "trampas"],
  },
  {
    id: "per-005",
    question: "Si durante la conducción nota síntomas de fatiga (bostezos, pesadez en los párpados), ¿qué debe hacer?",
    answers: [
      "Detenerse en un lugar seguro y descansar.",
      "Continuar hasta llegar al destino, aunque falte mucho.",
      "Aumentar la velocidad para llegar antes y descansar en casa.",
    ],
    correctAnswer: 0,
    explanation:
      "Ante los primeros síntomas de fatiga hay que detener el vehículo en un lugar seguro y descansar (una cabezada de 20-30 minutos es lo más eficaz). Seguir conduciendo fatigado es tan peligroso como hacerlo bajo los efectos del alcohol.",
    category: "percepcion",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722&tn=1",
    legalReference: "RDL 6/2015 (Ley de Tráfico y Seguridad Vial)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["fatiga", "descanso"],
  },
];
