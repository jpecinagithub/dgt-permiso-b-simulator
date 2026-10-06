import type { Question } from "./schema";

/**
 * Bloque 13 — abandono
 * Precauciones que deben adoptarse al abandonar el vehículo
 * (materia 13.ª del Anexo V, B) 1 del RD 818/2009).
 */
export const abandonoQuestions: Question[] = [
  {
    id: "abn-001",
    question:
      "Al estacionar en una pendiente descendente, ¿hacia dónde debe orientar las ruedas delanteras?",
    answers: [
      "Hacia el centro de la calzada.",
      "Rectas, sin girar el volante.",
      "Hacia el bordillo de la acera.",
    ],
    correctAnswer: 2,
    explanation:
      "En pendiente descendente las ruedas delanteras se orientan hacia el bordillo: si el vehículo se desplazara, las ruedas tropezarían con el bordillo y lo detendrían. Además, debe dejarse el freno de estacionamiento puesto y una marcha engranada.",
    category: "abandono",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    image: "parking",
    active: true,
    tags: ["estacionamiento", "pendiente"],
  },
  {
    id: "abn-002",
    question: "Antes de abrir la puerta para salir del vehículo, el conductor debe...",
    answers: [
      "asegurarse de que no pone en peligro a otros usuarios, como peatones o ciclistas.",
      "abrirla de golpe para salir lo más rápido posible.",
      "tocar la bocina para avisar de que va a salir.",
    ],
    correctAnswer: 0,
    explanation:
      "Abrir la puerta sin mirar es una causa frecuente de accidentes con ciclistas y motoristas («portazo»). Antes de abrir hay que comprobar por el espejo y girando la cabeza que no se aproxima nadie.",
    category: "abandono",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["abandono", "puertas", "ciclistas"],
  },
  {
    id: "abn-003",
    question:
      "Al abandonar el vehículo en una vía interurbana ocupando la calzada o el arcén, ¿qué debe hacer el conductor al salir?",
    answers: [
      "Salir sin más: el chaleco solo es obligatorio de noche.",
      "Ponerse el chaleco reflectante antes de salir del vehículo.",
      "Apagar todas las luces para no gastar la batería.",
    ],
    correctAnswer: 1,
    explanation:
      "Al salir del vehículo en vías interurbanas ocupando calzada o arcén es obligatorio ponerse el chaleco reflectante de alta visibilidad, de día y de noche: hace visible al conductor para el resto del tráfico.",
    category: "abandono",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["chaleco", "abandono"],
  },
  {
    id: "abn-004",
    question: "Al estacionar el vehículo, ¿dónde debe dejarlo?",
    answers: [
      "Fuera de la calzada y del arcén, siempre que sea posible.",
      "Sobre la calzada, para no molestar a los peatones.",
      "En doble fila si va a ser por poco tiempo.",
    ],
    correctAnswer: 0,
    explanation:
      "La parada y el estacionamiento deben hacerse fuera de la calzada y del arcén siempre que sea posible. La doble fila está prohibida en todo caso: obstaculiza la circulación y genera situaciones de riesgo.",
    category: "abandono",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["estacionamiento", "parada"],
  },
];
