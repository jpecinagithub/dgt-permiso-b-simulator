# DGT Test Simulator — Permiso B

Simulador educativo del **examen teórico del permiso de conducción B** en
España: 30 preguntas tipo test, 30 minutos y un máximo de 3 errores para
obtener el APTO, con corrección explicada y referencias legales.

> **DISCLAIMER — Proyecto educativo independiente. No es oficial ni está
> afiliado a la Dirección General de Tráfico.** Las preguntas son de
> elaboración propia con fines de práctica; no constituyen el examen oficial
> ni garantizan su superación.

Creado por **Jon Peciña Iturbe**.

---

## Stack

- **Vite 8 + React 19 + TypeScript** (strict) + **React Router 7**
- **Tailwind CSS v4** (vía `@tailwindcss/vite`)
- **zod** (validación del banco de preguntas), **idb** (historial en IndexedDB)
- **vite-plugin-pwa** (app instalable, 100 % offline)
- **@vercel/analytics** (métricas anónimas)
- **pdf-lib** (generación de informes PDF en el navegador)
- **vitest** + Testing Library (tests unitarios), **Playwright** (e2e), **tsx**
  (scripts)

Sin backend: SPA estática. UI 100 % en español.

---

## Puesta en marcha

```bash
npm install
npm run dev        # http://localhost:5173
```

### Scripts

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Chequeo de tipos + build de producción |
| `npm run preview` | Sirve el build de producción (puerto 4173) |
| `npm test` | Tests unitarios (vitest, una pasada) |
| `npm run test:watch` | Tests en modo watch |
| `npm run validate:questions` | Valida el banco de preguntas (`tsx scripts/validate-questions.ts`) |
| `npm run e2e` | Tests end-to-end (Playwright, usa `npm run preview`) |

> **Nota sobre TypeScript:** la plantilla Vite usa un tsconfig de estilo
> «solución» (`"files": []` en el `tsconfig.json` raíz), así que un simple
> `npx tsc --noEmit` **no comprueba nada**. Verifica siempre con:
>
> ```bash
> npx tsc --noEmit -p tsconfig.app.json
> ```
>
> El script `npm run build` ya lo hace antes de empaquetar.

---

## Estructura del proyecto

```
src/
  app/router.tsx            # Rutas (/, /simulacro, /practica, /fallos, /historial,
                            # /resultado/:id, /privacidad, /acerca-de)
  config/exam.ts            # EXAM_CONFIG: formato del examen (30/30/3), isPassed()
  types/question.ts         # Schema Zod + tipo Question + las 16 categorías oficiales
  data/questions/           # Banco de preguntas (agente del banco)
  components/
    layout/Layout.tsx       # Header, nav, footer, skip-link, <Analytics />
    UpdatePrompt.tsx         # Aviso de «actualización disponible» (PWA)
    QuestionArt.tsx          # Arte de preguntas (agente del banco)
  pages/
    LandingPage.tsx          # Hero «¿Aprobarías hoy el teórico?»
    PrivacidadPage.tsx       # Política de privacidad
    AcercaDePage.tsx         # Normativa, criterio APTO, autor, disclaimer
    StubPage.tsx             # Marcador «En construcción» (fase 2)
docs/
  research.md                # Resumen de la investigación DGT/BOE (2026-10-06)
  question-authoring-guide.md# Guía de redacción del banco (agente del banco)
scripts/
  validate-questions.ts      # Valida el banco contra QuestionSchema (agente del banco)
```

### Banco de preguntas

Cada pregunta sigue el contrato de `src/types/question.ts` (schema Zod):

- `id`, `question`, `answers` (tupla de 3), `correctAnswer` (0–2),
  `explanation`, `category` (una de las 16 claves oficiales), `difficulty`
  (`easy`/`medium`/`hard`), `sourceType` (`equivalent-practice` |
  `official-published`), `sourceTitle`, `sourceReference`, `legalReference`,
  `lastVerified` (`YYYY-MM-DD`), `image?`, `video?`, `active`, `tags`.

Para validar el banco:

```bash
npm run validate:questions
```

---

## PWA y modo offline

La app es instalable (manifest: nombre «DGT Test Simulator — Permiso B»,
`short_name` «DGT Test Sim», color `#0A1F3C`, `display: standalone`) y funciona
**100 % sin conexión**: el service worker precachea la app shell y el banco de
preguntas (empaquetado en el bundle).

- **Aviso de actualización:** con `registerType: 'prompt'`, cuando hay una
  versión nueva el componente `UpdatePrompt.tsx` muestra «Hay una
  actualización disponible» y el usuario decide cuándo recargar.
- **Versionado del banco:** el service worker se identifica con
  `EXAM_CONFIG.bankVersion` (`cacheId: dgt-test-sim-v<bankVersion>`). Al hacer
  bump de `bankVersion`, el build genera un service worker nuevo con hashes de
  precache nuevos, lo que **invalida la caché vieja** automáticamente.

---

## Almacenamiento local

- El historial de simulacros se guarda en **IndexedDB** del dispositivo
  (últimos 10 resultados).
- No hay cuentas ni servidores: nada sale del dispositivo (ver `/privacidad`).
- El nombre usado en el PDF es opcional y solo se usa en local.

## PDF en el navegador

Los informes/certificados se generan 100 % en cliente con **pdf-lib**; no se
sube ningún dato a ningún servidor.

---

## Fuentes (verificación 2026-10-06)

Formato del examen y temario verificados contra fuentes oficiales
(detalle en `docs/research.md`):

- DGT — preparación del examen y test oficiales:
  https://www.dgt.es/nuestros-servicios/permisos-de-conducir/obtener-un-nuevo-permiso-de-conducir/requisitos-preparacion-y-presentacion-a-examen
- BOE — RD 818/2009 (Reglamento General de Conductores):
  https://www.boe.es/buscar/act.php?id=BOE-A-2009-9481&tn=1
- BOE — RD 1428/2003 (Reglamento General de Circulación):
  https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1
- BOE — RD 518/2026 (usuarios vulnerables, en vigor 1/10/2026):
  https://www.boe.es/buscar/doc.php?id=BOE-A-2026-13889
- BOE — RD 465/2025 (nuevo catálogo de señales, en vigor 1/7/2025):
  https://www.boe.es/buscar/doc.php?id=BOE-A-2025-12199

Cambios recientes incorporados: RD 518/2026, RD 465/2025 y baliza V16
obligatoria desde el 1/1/2026. Las preguntas con vídeo están permitidas por la
norma pero **la DGT no las usa** (en estudio, sin fecha): el simulador las tiene
desactivadas (`videoQuestions.enabled: false`).

---

## Despliegue en Vercel

1. Sube el repo a GitHub e impórtalo en Vercel (framework: Vite).
2. Build command: `npm run build` · Output: `dist`.
3. `vercel.json` ya incluye el rewrite SPA (`/(.*)` → `/index.html`) y las
   cabeceras de caché (assets inmutables, `sw.js` sin caché, iconos 1 día).

---

## Accesibilidad

- HTML semántico, skip-link, foco visible de alto contraste, contraste AA.
- Se respeta `prefers-reduced-motion` (sin animaciones ni transiciones).
- Botones con área táctil mínima de 44 px; diseño móvil-primero.
