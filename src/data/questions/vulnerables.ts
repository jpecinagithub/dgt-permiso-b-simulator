import type { Question } from "./schema";

/**
 * Bloque 8 — vulnerables
 * Riesgos específicos de la inexperiencia de otros usuarios y de los usuarios
 * más vulnerables (materia 8.ª del Anexo V, B) 1 del RD 818/2009).
 * Incluye la reforma de protección a los usuarios vulnerables (RD 518/2026,
 * en vigor desde el 1/10/2026).
 */
export const vulnerablesQuestions: Question[] = [
  {
    id: "vul-001",
    question:
      "Según la reforma del Reglamento de Circulación (RD 518/2026), ¿quiénes son «usuarios vulnerables de la vía»?",
    answers: [
      "Solo los peatones y los ciclistas.",
      "Todos los conductores de vehículos a motor.",
      "Los peatones, los ciclistas, los usuarios de VMP y los conductores y pasajeros de motocicletas y ciclomotores.",
    ],
    correctAnswer: 2,
    explanation:
      "El RD 518/2026 (BOE-A-2026-13889, en vigor 1/10/2026) define formalmente al «usuario vulnerable de la vía»: peatones (incluidos menores, mayores y personas con discapacidad), ciclistas, usuarios de vehículos de movilidad personal (VMP) y conductores y pasajeros de motocicletas y ciclomotores.",
    category: "vulnerables",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/doc.php?id=BOE-A-2026-13889",
    legalReference: "RD 518/2026 (BOE-A-2026-13889)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["RD 518/2026", "usuario vulnerable"],
  },
  {
    id: "vul-002",
    question: "¿Cuál es la separación lateral mínima al adelantar a un ciclista o a otro usuario vulnerable?",
    answers: [
      "1 metro en poblado y 1,5 metros fuera de poblado.",
      "1,5 metros, en cualquier tipo de vía.",
      "2 metros, en cualquier tipo de vía.",
    ],
    correctAnswer: 1,
    explanation:
      "Desde el 1/10/2026 (RD 518/2026), la separación lateral mínima de 1,5 m al adelantar a ciclistas y demás usuarios vulnerables se exige EN CUALQUIER TIPO DE VÍA, también en poblado. La distinción «1 m en ciudad» es la trampa habitual: ya no es válida.",
    category: "vulnerables",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/doc.php?id=BOE-A-2026-13889",
    legalReference: "RD 518/2026 (BOE-A-2026-13889)",
    lastVerified: "2026-10-06",
    image: "overtake",
    active: true,
    tags: ["RD 518/2026", "adelantamiento", "ciclistas", "1,5 m"],
  },
  {
    id: "vul-003",
    question:
      "Fuera de poblado, al adelantar a un ciclista, además de guardar la separación lateral mínima debe...",
    answers: [
      "tocar la bocina para avisarle de la maniobra.",
      "aumentar la velocidad para adelantarle cuanto antes.",
      "reducir la velocidad al menos 20 km/h respecto al límite máximo de la vía.",
    ],
    correctAnswer: 2,
    explanation:
      "El RD 518/2026 exige, fuera de poblado, reducir la velocidad al menos 20 km/h por debajo del límite de la vía al adelantar a un usuario vulnerable. Tocar la bocina puede asustarle y aumentar la velocidad reduce el margen de seguridad: ambas son incorrectas.",
    category: "vulnerables",
    difficulty: "hard",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/doc.php?id=BOE-A-2026-13889",
    legalReference: "RD 518/2026 (BOE-A-2026-13889)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["RD 518/2026", "adelantamiento", "ciclistas", "velocidad"],
  },
  {
    id: "vul-004",
    question:
      "Si la vía tiene más de un carril por sentido, ¿cómo debe adelantar a un ciclista o usuario vulnerable?",
    answers: [
      "Cambiando por completo de carril.",
      "Sin cambiar de carril, dejando 1 metro de separación.",
      "Circulando por el arcén para no molestar al resto del tráfico.",
    ],
    correctAnswer: 0,
    explanation:
      "Cuando haya más de un carril por sentido, el adelantamiento a un usuario vulnerable debe hacerse cambiando por completo de carril (RD 518/2026). El arcén no es para adelantar: está prohibido circular por él.",
    category: "vulnerables",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/doc.php?id=BOE-A-2026-13889",
    legalReference: "RD 518/2026 (BOE-A-2026-13889)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["RD 518/2026", "adelantamiento", "ciclistas"],
  },
  {
    id: "vul-005",
    question:
      "¿Qué edad mínima se exige para conducir un vehículo de movilidad personal (VMP), como un patinete eléctrico?",
    answers: [
      "14 años.",
      "15 años.",
      "16 años.",
    ],
    correctAnswer: 1,
    explanation:
      "El RD 518/2026 fija en 15 años la edad mínima para conducir un VMP. Trampa de cifras cercanas: ni 14 ni 16. Además, el casco es obligatorio y fuera de poblado solo pueden circular por vías segregadas del tráfico a motor.",
    category: "vulnerables",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/doc.php?id=BOE-A-2026-13889",
    legalReference: "RD 518/2026 (BOE-A-2026-13889)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["RD 518/2026", "VMP", "edad mínima"],
  },
  {
    id: "vul-006",
    question: "¿Qué equipamiento de seguridad es obligatorio para el usuario de un VMP (patinete eléctrico)?",
    answers: [
      "Casco obligatorio y chaleco reflectante de noche o con escasa visibilidad.",
      "Solo el chaleco reflectante, de día y de noche.",
      "Ninguno: el casco solo es recomendable.",
    ],
    correctAnswer: 0,
    explanation:
      "Desde el 1/10/2026 el casco es obligatorio para los usuarios de VMP sin excepciones, y el chaleco reflectante es obligatorio de noche o con escasa visibilidad (RD 518/2026). Además, el alumbrado permanente será obligatorio desde el 1/10/2027.",
    category: "vulnerables",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/doc.php?id=BOE-A-2026-13889",
    legalReference: "RD 518/2026 (BOE-A-2026-13889)",
    lastVerified: "2026-10-06",
    image: "bike-lane",
    active: true,
    tags: ["RD 518/2026", "VMP", "casco"],
  },
];
