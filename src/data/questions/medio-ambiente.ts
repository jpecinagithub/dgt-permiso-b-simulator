import type { Question } from "./schema";

/**
 * Bloque 16 — medio-ambiente
 * Vehículo y medio ambiente: uso de señales acústicas, conducción económica
 * y ahorro de combustible, limitación de emisiones y medidas anticontaminación
 * (materia 16.ª del Anexo V, B) 1 del RD 818/2009).
 */
export const medioAmbienteQuestions: Question[] = [
  {
    id: "med-001",
    question: "Para una conducción eficiente, con menor consumo y menos emisiones, se recomienda...",
    answers: [
      "circular en marchas largas a bajas revoluciones, anticiparse al tráfico y mantener una velocidad uniforme.",
      "acelerar y frenar bruscamente para no perder tiempo en los desplazamientos.",
      "circular siempre en marchas cortas para que el motor vaya «alegre».",
    ],
    correctAnswer: 0,
    explanation:
      "La conducción eficiente consiste en usar marchas largas a bajas revoluciones, anticiparse (levantar el pie antes de frenar), mantener velocidad uniforme y evitar acelerones y frenazos: se ahorra combustible y se contamina menos.",
    category: "medio-ambiente",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2009-9481&tn=1",
    legalReference: "Anexo V RD 818/2009",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["conducción eficiente", "consumo"],
  },
  {
    id: "med-002",
    question: "¿Cuándo está permitido usar las señales acústicas (bocina)?",
    answers: [
      "Siempre que se quiera, también para saludar a otros conductores.",
      "Nunca: están prohibidas en todo caso.",
      "Solo para advertir un peligro o evitar un posible accidente; en poblado, únicamente en esos casos.",
    ],
    correctAnswer: 2,
    explanation:
      "La bocina solo puede usarse para advertir un peligro o evitar un accidente; el uso inmotivado o por molestia está prohibido (y en poblado solo se permite en esos supuestos). Trampa de absolutos: ni «siempre» ni «nunca».",
    category: "medio-ambiente",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1",
    legalReference: "RD 1428/2003 (RGC)",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["bocina", "señales acústicas", "trampas"],
  },
  {
    id: "med-003",
    question: "¿Qué aumenta el consumo de combustible?",
    answers: [
      "Los acelerones, la velocidad excesiva y llevar carga innecesaria o la baca puesta.",
      "Circular a velocidad moderada y uniforme.",
      "Apagar el motor en las paradas largas.",
    ],
    correctAnswer: 0,
    explanation:
      "Aumentan el consumo: los acelerones y frenazos, la velocidad excesiva, el exceso de carga, la baca o el cofre (resistencia aerodinámica), la presión baja de neumáticos y el uso innecesario del climatizador. La conducción suave y uniforme lo reduce.",
    category: "medio-ambiente",
    difficulty: "easy",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2009-9481&tn=1",
    legalReference: "Anexo V RD 818/2009",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["consumo", "conducción eficiente"],
  },
  {
    id: "med-004",
    question: "Al arrancar el motor en frío, ¿qué debe hacer?",
    answers: [
      "Dejar el motor al ralentí varios minutos hasta que se caliente.",
      "Acelerar en vacío para calentarlo cuanto antes.",
      "Iniciar la marcha enseguida, con suavidad, sin calentar el motor al ralentí.",
    ],
    correctAnswer: 2,
    explanation:
      "Calentar el motor al ralentí contamina, consume y desgasta sin necesidad: lo correcto es iniciar la marcha de inmediato con suavidad hasta que alcance su temperatura de funcionamiento.",
    category: "medio-ambiente",
    difficulty: "medium",
    sourceType: "equivalent-practice",
    sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
    sourceReference: "https://www.boe.es/buscar/act.php?id=BOE-A-2009-9481&tn=1",
    legalReference: "Anexo V RD 818/2009",
    lastVerified: "2026-10-06",
    active: true,
    tags: ["arranque en frío", "emisiones"],
  },
];
