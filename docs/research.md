# Investigación: examen teórico del permiso B (DGT)

**Fecha de verificación de los datos:** 2026-10-06
**Informe completo:** `/home/hatch/workspace/research_notes/dgt-examen-teorico-permiso-b-20261006-0639/report.md`
**Revisión normativa del simulador (`EXAM_CONFIG.legalReviewDate`):** 2026-10-06

Fuentes prioritarias: dgt.es y boe.es (textos consolidados). Ante discrepancias
entre prensa y fuentes oficiales, prevalecen dgt.es y el BOE.

---

## Formato del examen

| Concepto | Dato | Fuente |
|---|---|---|
| Nº de preguntas | 30 (la norma fija un mínimo de 30 y un máximo de 50; la DGT aplica 30) | RD 818/2009, Anexo VI, B) 1 a); DGT a *El Mundo* (sept. 2026) |
| Opciones por pregunta | 3, una sola correcta | Formato de los test oficiales DGT (la norma permite «de una a cuatro») |
| Tiempo disponible | 30 minutos (1 min/pregunta) | RD 818/2009, Anexo VI, B) 2 |
| Máximo de errores para APTO | 3 (los errores no pueden superar el 10 %; con 4 se suspende) | RD 818/2009, Anexo VI, B) 3 |
| Navegación | Una pregunta por pantalla; «Anterior»/«Siguiente» o botones numerados; «finalizar test» al terminar | App oficial «TEST DE EXÁMEN TEÓRICOS» (dgt.es) |
| Preguntas con imagen | Fotografías reales, ilustraciones/esquemas y señales; la DGT no publica la proporción exacta | dgt.es |
| Corrección | Al finalizar se muestra la corrección con fallos y respuestas correctas | dgt.es |

> **Nota sobre las preguntas en blanco:** la normativa habla de «errores cometidos»
> sin regular expresamente las preguntas sin responder. No hay confirmación
> oficial de si cuentan como error. **Decisión de este simulador:** las preguntas
> en blanco cuentan como error (documentado en `EXAM_CONFIG.blankCountsAsError`).

---

## Las 16 materias oficiales (RD 818/2009, Anexo V, B) 1)

Prueba de control de conocimientos común para el permiso B:

1. Disposiciones legales y reglamentarias: señalización, prioridad y velocidad
2. Accidentes de circulación: factores y causas más frecuentes
3. Vigilancia y actitudes respecto a los demás usuarios
4. Percepción, reacción, alcohol, drogas, fatiga y sueño
5. Distancias de seguridad, frenado y estabilidad
6. Estado de la calzada, climatología y túneles
7. La vía: clases y partes
8. Usuarios vulnerables (peatones, ciclistas, motoristas…)
9. Riesgos de los distintos tipos de vehículos
10. Documentación
11. Accidentes y primeros auxilios
12. Carga y pasajeros
13. Abandono del vehículo
14. Mecánica y seguridad
15. Cinturones, reposacabezas y retención infantil
16. Vehículo y medio ambiente

---

## Estado de las preguntas con vídeo (a 2026-10-06)

**La DGT no usa preguntas con vídeo en el examen a fecha de hoy.**

- La norma ya las permite (Anexo VI, B) 1 del RD 818/2009, redacción del
  RD 971/2020: «las preguntas podrán estar precedidas por la visualización […]
  de vídeos sobre situaciones del tráfico»), pero es una posibilidad habilitada,
  no una obligación.
- Declaración oficial DGT (septiembre 2026): «se está estudiando incluir vídeos
  de percepción del riesgo […] pero todavía no hay nada»; no hay fecha ni
  procedimiento normativo iniciado (requeriría modificar el Reglamento de
  Conductores).
- Por eso el simulador tiene `videoQuestions.enabled: false`, aunque el formato
  de configuración ya contempla `maxViews: 2` y `lockUntilWatched: true` por si
  la DGT los introduce en el futuro.

---

## Cambios normativos recientes (impacto en el contenido)

| Norma | Cambio | Vigencia |
|---|---|---|
| **RD 518/2026** (BOE-A-2026-13889) | Reforma del Reglamento de Circulación «de protección a los usuarios vulnerables»: definición de usuario vulnerable; VMP (15 años, casco obligatorio); adelantamientos (1,5 m lateral, −20 km/h fuera de poblado, cambio completo de carril); prohibición total de auriculares; cinturón también para taxistas/repartidores/profesores | En vigor **1/10/2026** |
| **RD 465/2025** (BOE-A-2025-12199) | Nuevo catálogo oficial de señales y marcas viales | En vigor **1/7/2025** |
| **RD 159/2021** (mod. RD 1030/2022) | Baliza **V16 conectada**: único medio legal de preseñalización de peligro (sustituye a los triángulos) | Obligatoria **1/1/2026** |
| Ley 18/2021 | Reforma del permiso por puntos | En vigor 21/03/2022 (marco vigente) |

La DGT confirmó (sept. 2026) que la entrada en vigor del RD 518/2026 **no cambia
el formato** del examen, pero sí obliga a actualizar preguntas.

---

## Fuentes oficiales

### DGT
- Preparación del examen y test oficiales (ficha actualizada 09/07/2026):
  https://www.dgt.es/nuestros-servicios/permisos-de-conducir/obtener-un-nuevo-permiso-de-conducir/requisitos-preparacion-y-presentacion-a-examen
- Sede electrónica — exámenes y pruebas de aptitud:
  https://sede.dgt.gob.es/es/permisos-de-conducir/examenes-y-pruebas/
- Consulta de notas de examen:
  https://sede.dgt.gob.es/es/permisos-de-conducir/examenes-y-pruebas/consulta-de-notas-de-examen/
- Nota de examen teórico en la app MiDGT:
  https://www.dgt.es/comunicacion/notas-de-prensa/ya-se-puede-consultar-la-nota-del-examen-teorico-del-permiso-de-conducir-en-la-app-midgt

### BOE
- RD 818/2009, Reglamento General de Conductores (consolidado):
  https://www.boe.es/buscar/act.php?id=BOE-A-2009-9481&tn=1
- RD 1428/2003, Reglamento General de Circulación (consolidado):
  https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514&tn=1
- RDL 6/2015, Ley sobre Tráfico, Circulación y Seguridad Vial (consolidado):
  https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722&tn=1
- RD 518/2026, reforma de usuarios vulnerables:
  https://www.boe.es/buscar/doc.php?id=BOE-A-2026-13889
- RD 465/2025, nuevo catálogo de señalización:
  https://www.boe.es/buscar/doc.php?id=BOE-A-2025-12199

---

## Preguntas abiertas (no verificadas en fuente oficial)

- Proporción exacta de preguntas con imagen en el examen real.
- Si las preguntas sin responder cuentan como error en el examen real.
- Existencia de «marcar para revisar» y comportamiento exacto al agotarse el tiempo.
- La DGT **sí** publica test oficiales de práctica gratuitos con preguntas reales
  (mismo formato que el examen), pero **no** publica el banco completo de preguntas.
