# Guía de autoría de preguntas — DGT Test Simulator (Permiso B)

Cómo añadir preguntas al banco (`src/data/questions/`) manteniendo el estilo del
examen real de la DGT y la calidad normativa del banco.

## 1. Dónde va cada cosa

| Qué | Dónde |
|---|---|
| Preguntas, un fichero por bloque temático | `src/data/questions/<categoria>.ts` |
| Contrato de datos (schema Zod) | `src/data/questions/schema.ts` |
| Índice que concatena y filtra `active` | `src/data/questions/index.ts` |
| Ilustraciones SVG | `src/components/QuestionArt.tsx` |
| Validador | `scripts/validate-questions.ts` |

Cada fichero de categoría exporta un array tipado, p. ej.
`export const normasCirculacionQuestions: Question[] = [...]`, y `index.ts` lo
importa, lo concatena en `allQuestions` y expone `questionBank` (solo `active: true`)
más `BANK_VERSION`. Para escalar a cientos de preguntas basta con añadir ficheros
o entradas y registrar el import en `index.ts`: la app no cambia.

Las 16 categorías (keys exactas, no inventar otras):

`normas-circulacion`, `accidentes-causas`, `convivencia`, `percepcion`,
`distancias`, `calzada-clima`, `la-via`, `vulnerables`, `tipos-vehiculos`,
`documentacion`, `auxilio`, `carga`, `abandono`, `mecanica`, `retencion`,
`medio-ambiente`

Corresponden a las 16 materias de la prueba común del Anexo V, B) 1 del RD 818/2009.

## 2. Formato de una pregunta

```ts
{
  id: "norm-009",                    // único, kebab-case: <prefijo>-<nnn>
  question: "¿...?",                  // enunciado conciso, estilo DGT
  answers: ["...", "...", "..."],     // EXACTAMENTE 3, una sola correcta
  correctAnswer: 1,                  // índice 0, 1 o 2
  explanation: "...",                // por qué es correcta (+ trampa del distractor)
  category: "normas-circulacion",     // una de las 16 keys
  difficulty: "medium",              // easy | medium | hard
  sourceType: "equivalent-practice", // ver §5
  sourceTitle: "DGT Test Simulator · Banco de práctica equivalente",
  sourceReference: "https://www.boe.es/...", // URL del BOE o de dgt.es
  legalReference: "Art. 20 RGC",     // norma concreta; ver §4
  lastVerified: "2026-10-06",        // YYYY-MM-DD de la última verificación
  image: "stop-sign",                // opcional: clave de QUESTION_ART
  active: true,
  tags: ["alcohol", "tasas"],
}
```

## 3. Estilo DGT: cómo redactar

- **Enunciados concisos**, una sola idea por pregunta. El examen real no hace
  preguntas compuestas ni con doble negación enrevesada.
- **3 opciones plausibles.** Los distractores deben recoger errores típicos de
  los aspirantes, no opciones absurdas de relleno.
- **Trampas habituales del examen real** (usar con moderación, 1 de cada 4–5):
  - Negaciones y matices: «salvo», «excepto», «únicamente», «siempre/nunca».
  - Cifras cercanas: 14/15/16 años, 1/1,5/2 m, 0,15/0,25/0,50.
  - Confusión de unidades: g/l en sangre vs mg/l en aire.
  - Conceptos que se confunden: tiempo de reacción vs distancia de frenado,
    stop vs ceda el paso, arcén vs mediana, distancia de seguridad vs detención.
- **Una sola respuesta inequívoca.** Si dos opciones son defendibles, la pregunta
  es mala: reescríbela. Evita «todas las anteriores son correctas».
- **Reparte la posición correcta** entre 0, 1 y 2 de forma equilibrada en el
  conjunto del banco (el validador avisa si una posición supera el 60 %).
- **Explicación útil**: 1–3 frases que digan por qué la correcta lo es y, cuando
  aplique, qué trampa esconde el distractor más tentador.
- Las respuestas deben ser **distintas entre sí** (el validador lo comprueba).

## 4. Cómo citar la norma (`legalReference` y `sourceReference`)

- `legalReference` debe citar una **norma real**. Usa el artículo solo cuando
  estés seguro del número; **prohibido inventar artículos**: mejor la norma
  genérica («RD 1428/2003 (RGC)») que un artículo falso.
- Referencias verificadas que puedes usar con confianza (verificadas 2026-10-06):
  - `Art. 20 RGC` — tasas de alcohol (0,5/0,25 general; 0,3/0,15 noveles y profesionales).
  - `Art. 48 RGC` — velocidades máximas genéricas (120/90/50/30).
  - `Art. 57 RGC` — normas generales de prioridad (intersecciones, glorietas).
  - `Art. 54 RGC` — distancias entre vehículos.
  - `Art. 116 RGC` — sistemas de retención infantil (<135 cm).
  - `Art. 117 RGC` — cinturón de seguridad obligatorio.
  - `Anexo VI RD 818/2009` — formato del examen (30 preguntas, 3 errores máx.).
  - `Anexo V RD 818/2009` — las 16 materias del temario.
  - `Anexo I RDL 6/2015` — definiciones (vía, calzada, arcén, mediana...).
  - `RD 518/2026 (BOE-A-2026-13889)` — usuarios vulnerables, VMP, adelantamientos
    (en vigor 1/10/2026). Sin número de artículo salvo verificación.
  - `RD 465/2025 (BOE-A-2025-12199)` — Catálogo oficial de señales (1/7/2025).
  - `RD 159/2021` — baliza V16 conectada, único medio legal desde 1/1/2026.
  - `RD 920/2017` — ITV (primera a los 4 años en turismos).
  - `RDL 6/2015` / `RD 1428/2003 (RGC)` — cita genérica cuando no hay artículo seguro.
- `sourceReference`: URL del BOE o de dgt.es correspondiente. URLs base verificadas:
  - RGC: `https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1`
  - RD 818/2009: `https://www.boe.es/buscar/act.php?id=BOE-A-2009-9481&tn=1`
  - RDL 6/2015: `https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722&tn=1`
  - RD 518/2026: `https://www.boe.es/buscar/doc.php?id=BOE-A-2026-13889`
  - RD 465/2025: `https://www.boe.es/buscar/doc.php?id=BOE-A-2025-12199`
  - Examen (DGT): `https://www.dgt.es/nuestros-servicios/permisos-de-conducir/obtener-un-nuevo-permiso-de-conducir/requisitos-preparacion-y-presentacion-a-examen`
- **No verifiques contra blogs de autoescuelas**: ante discrepancias, prevalecen
  BOE y dgt.es. Si una norma cambia, actualiza `legalReference` y `lastVerified`.
- Hechos con fecha que conviene repasar periódicamente: V16 (1/1/2026),
  catálogo de señales (1/7/2025), RD 518/2026 (1/10/2026), alumbrado VMP permanente
  obligatorio desde el 1/10/2027, estado de las preguntas con vídeo en el examen
  (a 2026-10-06: no se aplican; si cambian, revisar el campo `video`).

## 5. Política de `sourceType`

- **Todo es `equivalent-practice`** por defecto: preguntas originales de práctica
  equivalente, rigurosamente fundamentadas en normativa vigente.
- **NUNCA** presentes una pregunta como «oficial DGT».
- Solo usa `official-published` si citas literalmente una pregunta publicada por
  la DGT, con su URL oficial en `sourceReference`. En caso de duda,
  `equivalent-practice`. (El validador avisa de cada `official-published`.)

## 6. Ilustraciones SVG (`QuestionArt.tsx`)

- Registro: `export const QUESTION_ART: Record<string, React.FC>`.
- Clave en kebab-case (`"stop-sign"`). Cada pregunta con `image` debe usar una
  clave existente: el validador falla si no.
- Convenciones de dibujo: estilo sobrio tipo examen (nada infantil); paleta
  asfalto `#4B5563`, marcas blancas, cielo claro, señales con colores
  reglamentarios; `viewBox` propio; responsive (`width: 100%` vía el wrapper
  `Art`); `<title>` accesible; sin dependencias remotas ni texto innecesario.
- Para añadir una: crea el componente `React.FC` con el wrapper `Art`,
  regístralo en `QUESTION_ART` y úsalo en la pregunta con `image: "<clave>"`.
- Claves disponibles (18): `stop-sign`, `yield-sign`, `no-entry`, `speed-120`,
  `roundabout`, `intersection-right`, `overtake`, `zebra`, `tunnel`, `v16`,
  `rain`, `bike-lane`, `parking`, `level-crossing`, `road-anatomy`,
  `safe-distance`, `seatbelt`, `tyre`.

## 7. Validación

```bash
npx tsx scripts/validate-questions.ts
# o, cuando el andamiaje lo defina:
npm run validate:questions
```

Comprueba: schema Zod completo, 3 respuestas distintas, `correctAnswer` en
rango, IDs únicos en kebab-case, `category` válida, `image` existente en
`QUESTION_ART`, `lastVerified` con formato `YYYY-MM-DD`, coherencia de
`questionBank` con el filtrado de activas. **Exit code 1 si hay errores.**
Avisa (sin fallar) de: preguntas inactivas, ilustraciones sin usar, preguntas
con `video`, `official-published` sin revisar y distribuciones sospechosas de
la respuesta correcta.

Flujo recomendado al añadir preguntas:

1. Escribe la pregunta en el fichero de su categoría (IDs correlativos).
2. Si necesita ilustración nueva, añádela a `QuestionArt.tsx` primero.
3. Ejecuta el validador: debe quedar en verde antes de dar por hecho el trabajo.
4. Si tocas normativa, actualiza `legalReference`, `sourceReference` y
   `lastVerified`; si el cambio es relevante, sube `BANK_VERSION` en `index.ts`.

## 8. Convenciones de IDs y versionado

- Prefijos por categoría: `norm-`, `acc-`, `con-`, `per-`, `dis-`, `cli-`,
  `via-`, `vul-`, `tv-`, `doc-`, `aux-`, `car-`, `abn-`, `mec-`, `ret-`, `med-`,
  seguidos de número correlativo con ceros (`-001`).
- Los IDs son estables: nunca reutilices un ID retirado (marca `active: false`
  en su lugar).
- `BANK_VERSION` (`"1.0.0"`, en `index.ts`): súbela con semver cuando añadas,
  modifiques o retires preguntas de forma relevante.
