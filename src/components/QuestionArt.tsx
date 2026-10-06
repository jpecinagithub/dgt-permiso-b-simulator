import type * as React from "react";

/**
 * Registro de ilustraciones SVG originales para las preguntas del examen.
 *
 * Estilo sobrio tipo examen DGT: nada infantil, paleta contenida
 * (asfalto #4B5563, marcas blancas, cielo claro, señales con colores
 * reglamentarios). Sin dependencias remotas, responsive (width 100%) y con
 * <title> accesible en cada ilustración.
 *
 * Convenciones para añadir una ilustración:
 * - Clave en kebab-case (ej. "stop-sign").
 * - viewBox propio; el wrapper Art ya hace el SVG responsive.
 * - No usar texto salvo el imprescindible de la propia señal (STOP, 120, P...).
 */

function Art({
  title,
  viewBox = "0 0 200 140",
  children,
}: {
  title: string;
  viewBox?: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <svg
      viewBox={viewBox}
      style={{ width: "100%", height: "auto", display: "block" }}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}

/* ---------------------------------- señales ---------------------------------- */

const StopSign: React.FC = () => (
  <Art title="Señal de stop (R-2)" viewBox="0 0 120 140">
    <rect x="57" y="98" width="6" height="38" fill="#9CA3AF" />
    <polygon
      points="106.2,79.1 79.1,106.2 40.9,106.2 13.8,79.1 13.8,40.9 40.9,13.8 79.1,13.8 106.2,40.9"
      fill="#C8102E"
      stroke="#FFFFFF"
      strokeWidth="5"
      strokeLinejoin="round"
    />
    <text x="60" y="69" textAnchor="middle" fontSize="21" fontWeight="700" fill="#FFFFFF" fontFamily="sans-serif">
      STOP
    </text>
  </Art>
);

const YieldSign: React.FC = () => (
  <Art title="Señal de ceda el paso (R-1)" viewBox="0 0 120 140">
    <rect x="57" y="106" width="6" height="30" fill="#9CA3AF" />
    <polygon points="60,112 8,18 112,18" fill="#C8102E" />
    <polygon points="60,97 22,30 98,30" fill="#FFFFFF" />
  </Art>
);

const NoEntry: React.FC = () => (
  <Art title="Señal de dirección prohibida (R-101)" viewBox="0 0 120 140">
    <rect x="57" y="100" width="6" height="36" fill="#9CA3AF" />
    <circle cx="60" cy="58" r="46" fill="#C8102E" />
    <rect x="20" y="48" width="80" height="20" rx="2" fill="#FFFFFF" />
  </Art>
);

const Speed120: React.FC = () => (
  <Art title="Señal de velocidad máxima 120 km/h (R-301)" viewBox="0 0 120 140">
    <rect x="57" y="100" width="6" height="36" fill="#9CA3AF" />
    <circle cx="60" cy="58" r="44" fill="#FFFFFF" stroke="#C8102E" strokeWidth="10" />
    <text x="60" y="69" textAnchor="middle" fontSize="27" fontWeight="700" fill="#111827" fontFamily="sans-serif">
      120
    </text>
  </Art>
);

/* ------------------------------- escenarios ---------------------------------- */

const Roundabout: React.FC = () => (
  <Art title="Glorieta vista desde arriba: un vehículo cede el paso al que circula dentro">
    <rect width="200" height="140" fill="#E5E7EB" />
    <rect x="0" y="55" width="200" height="30" fill="#4B5563" />
    <rect x="85" y="0" width="30" height="140" fill="#4B5563" />
    <line x1="6" y1="70" x2="60" y2="70" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 5" />
    <line x1="140" y1="70" x2="194" y2="70" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 5" />
    <line x1="100" y1="6" x2="100" y2="30" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 5" />
    <line x1="100" y1="110" x2="100" y2="134" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 5" />
    <circle cx="100" cy="70" r="34" fill="#4B5563" />
    <circle cx="100" cy="70" r="34" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    <circle cx="100" cy="70" r="24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 5" />
    <circle cx="100" cy="70" r="13" fill="#9CA3AF" />
    {/* vehículo que circula dentro (rojo), en el lado oeste descendiendo */}
    <rect x="62" y="62" width="20" height="12" rx="3" fill="#DC2626" />
    <rect x="64" y="69" width="16" height="4" fill="#FCA5A5" />
    {/* vehículo que accede (azul), cediendo el paso */}
    <rect x="95" y="110" width="14" height="22" rx="3" fill="#2563EB" />
    <rect x="97" y="112" width="10" height="5" fill="#BFDBFE" />
    <line x1="90" y1="104" x2="112" y2="104" stroke="#FFFFFF" strokeWidth="3" />
  </Art>
);

const IntersectionRight: React.FC = () => (
  <Art title="Cruce sin señalizar: el vehículo de la derecha tiene preferencia">
    <rect width="200" height="140" fill="#E5E7EB" />
    <rect x="0" y="55" width="200" height="30" fill="#4B5563" />
    <rect x="85" y="0" width="30" height="140" fill="#4B5563" />
    <line x1="6" y1="70" x2="78" y2="70" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 5" />
    <line x1="122" y1="70" x2="194" y2="70" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 5" />
    <line x1="100" y1="6" x2="100" y2="48" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 5" />
    <line x1="100" y1="92" x2="100" y2="134" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 5" />
    {/* vehículo propio (azul), abajo, debe ceder */}
    <rect x="99" y="108" width="14" height="22" rx="3" fill="#2563EB" />
    <rect x="101" y="110" width="10" height="5" fill="#BFDBFE" />
    <line x1="94" y1="102" x2="114" y2="102" stroke="#FFFFFF" strokeWidth="3" />
    {/* vehículo por la derecha (rojo), con preferencia */}
    <rect x="148" y="71" width="22" height="12" rx="3" fill="#DC2626" />
    <rect x="150" y="73" width="5" height="8" fill="#FCA5A5" />
  </Art>
);

const Overtake: React.FC = () => (
  <Art title="Adelantamiento a un ciclista guardando 1,5 metros de separación lateral">
    <rect width="200" height="140" fill="#E8F0FE" />
    <rect y="90" width="200" height="50" fill="#4B5563" />
    <line x1="0" y1="115" x2="200" y2="115" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="14 12" />
    {/* turismo */}
    <rect x="18" y="76" width="66" height="28" rx="9" fill="#2563EB" />
    <rect x="32" y="80" width="32" height="11" rx="4" fill="#BFDBFE" />
    <circle cx="34" cy="106" r="9" fill="#1F2937" />
    <circle cx="34" cy="106" r="3.5" fill="#9CA3AF" />
    <circle cx="68" cy="106" r="9" fill="#1F2937" />
    <circle cx="68" cy="106" r="3.5" fill="#9CA3AF" />
    {/* ciclista */}
    <circle cx="138" cy="110" r="11" fill="none" stroke="#1F2937" strokeWidth="3" />
    <circle cx="168" cy="110" r="11" fill="none" stroke="#1F2937" strokeWidth="3" />
    <path d="M138,110 L150,94 L164,96 L168,110 M150,94 L146,110" stroke="#1F2937" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="160" cy="80" r="6" fill="#1F2937" />
    <path d="M160,86 L152,96" stroke="#1F2937" strokeWidth="5" strokeLinecap="round" />
    <path d="M153,90 L164,95" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
    {/* cota de 1,5 m */}
    <line x1="86" y1="58" x2="126" y2="58" stroke="#111827" strokeWidth="2" />
    <polygon points="86,58 95,54 95,62" fill="#111827" />
    <polygon points="126,58 117,54 117,62" fill="#111827" />
    <line x1="86" y1="51" x2="86" y2="65" stroke="#111827" strokeWidth="2" />
    <line x1="126" y1="51" x2="126" y2="65" stroke="#111827" strokeWidth="2" />
    <text x="106" y="46" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827" fontFamily="sans-serif">
      1,5 m
    </text>
  </Art>
);

const Zebra: React.FC = () => (
  <Art title="Paso de peatones: el vehículo se detiene para dejar pasar al peatón">
    <rect width="200" height="140" fill="#E8F0FE" />
    <rect y="62" width="200" height="78" fill="#4B5563" />
    <rect x="88" y="70" width="12" height="62" fill="#FFFFFF" opacity="0.92" />
    <rect x="110" y="70" width="12" height="62" fill="#FFFFFF" opacity="0.92" />
    <rect x="132" y="70" width="12" height="62" fill="#FFFFFF" opacity="0.92" />
    <rect x="154" y="70" width="12" height="62" fill="#FFFFFF" opacity="0.92" />
    {/* turismo detenido */}
    <rect x="6" y="96" width="58" height="26" rx="8" fill="#2563EB" />
    <rect x="18" y="100" width="26" height="10" rx="3" fill="#BFDBFE" />
    <circle cx="20" cy="124" r="8" fill="#1F2937" />
    <circle cx="20" cy="124" r="3" fill="#9CA3AF" />
    <circle cx="50" cy="124" r="8" fill="#1F2937" />
    <circle cx="50" cy="124" r="3" fill="#9CA3AF" />
    {/* peatón cruzando */}
    <circle cx="121" cy="58" r="6" fill="#1F2937" />
    <path
      d="M121,64 L121,90 M121,90 L112,110 M121,90 L130,108 M121,72 L111,82 M121,72 L131,80"
      stroke="#1F2937"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
  </Art>
);

const Tunnel: React.FC = () => (
  <Art title="Túnel: vehículo circulando con el alumbrado de cruce encendido">
    <rect width="200" height="140" fill="#DBEAFE" />
    <path d="M15,140 L15,62 Q100,8 185,62 L185,140 Z" fill="#374151" />
    <path d="M42,140 L42,78 Q100,38 158,78 L158,140 Z" fill="#111827" />
    <polygon points="88,140 112,140 106,84 94,84" fill="#4B5563" />
    <line x1="90" y1="140" x2="96" y2="84" stroke="#FFFFFF" strokeWidth="2" />
    <line x1="110" y1="140" x2="104" y2="84" stroke="#FFFFFF" strokeWidth="2" />
    <polygon points="92,118 58,140 80,140 96,118" fill="#FDE68A" opacity="0.5" />
    <polygon points="108,118 142,140 120,140 104,118" fill="#FDE68A" opacity="0.5" />
    <rect x="88" y="102" width="24" height="20" rx="5" fill="#2563EB" />
    <rect x="92" y="106" width="16" height="7" rx="2" fill="#BFDBFE" />
    <circle cx="92" cy="117" r="3" fill="#FEF3C7" />
    <circle cx="108" cy="117" r="3" fill="#FEF3C7" />
  </Art>
);

const V16: React.FC = () => (
  <Art title="Baliza luminosa V16 conectada sobre el techo del vehículo">
    <rect width="200" height="140" fill="#E8F0FE" />
    <rect y="98" width="200" height="42" fill="#4B5563" />
    <line x1="0" y1="119" x2="200" y2="119" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="14 12" />
    <rect x="48" y="66" width="104" height="32" rx="11" fill="#2563EB" />
    <rect x="66" y="71" width="60" height="13" rx="4" fill="#BFDBFE" />
    <circle cx="74" cy="100" r="10" fill="#1F2937" />
    <circle cx="74" cy="100" r="4" fill="#9CA3AF" />
    <circle cx="126" cy="100" r="10" fill="#1F2937" />
    <circle cx="126" cy="100" r="4" fill="#9CA3AF" />
    <circle cx="100" cy="60" r="17" fill="#F59E0B" opacity="0.25" />
    <rect x="91" y="54" width="18" height="13" rx="4" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
    <path
      d="M100,34 L100,44 M82,40 L89,47 M118,40 L111,47 M76,60 L86,60 M114,60 L124,60"
      stroke="#F59E0B"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Art>
);

const Rain: React.FC = () => (
  <Art title="Lluvia intensa sobre la calzada: adherencia reducida">
    <rect width="200" height="140" fill="#CBD5E1" />
    <ellipse cx="60" cy="26" rx="34" ry="14" fill="#94A3B8" />
    <ellipse cx="140" cy="18" rx="40" ry="15" fill="#94A3B8" />
    <path
      d="M30,50 l-4,12 M60,46 l-4,12 M90,52 l-4,12 M120,46 l-4,12 M150,52 l-4,12 M180,48 l-4,12 M45,70 l-4,12 M105,70 l-4,12 M165,70 l-4,12 M75,88 l-4,10 M135,88 l-4,10"
      stroke="#60A5FA"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <rect y="100" width="200" height="40" fill="#4B5563" />
    <rect y="100" width="200" height="9" fill="#93C5FD" opacity="0.55" />
    <rect x="60" y="72" width="80" height="28" rx="9" fill="#2563EB" />
    <rect x="76" y="76" width="36" height="11" rx="4" fill="#BFDBFE" />
    <circle cx="80" cy="102" r="9" fill="#1F2937" />
    <circle cx="80" cy="102" r="3.5" fill="#9CA3AF" />
    <circle cx="120" cy="102" r="9" fill="#1F2937" />
    <circle cx="120" cy="102" r="3.5" fill="#9CA3AF" />
  </Art>
);

const BikeLane: React.FC = () => (
  <Art title="Ciclista con casco circulando por el carril bici">
    <rect width="200" height="140" fill="#E8F0FE" />
    <rect y="66" width="200" height="74" fill="#4B5563" />
    <rect y="66" width="200" height="30" fill="#15803D" />
    <line x1="0" y1="96" x2="200" y2="96" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="8 6" />
    {/* pictograma bici */}
    <g stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.9">
      <circle cx="26" cy="86" r="6" />
      <circle cx="46" cy="86" r="6" />
      <path d="M26,86 L36,74 L44,74 L46,86 M36,74 L34,86" />
    </g>
    {/* ciclista con casco */}
    <circle cx="112" cy="92" r="10" fill="none" stroke="#1F2937" strokeWidth="3" />
    <circle cx="140" cy="92" r="10" fill="none" stroke="#1F2937" strokeWidth="3" />
    <path d="M112,92 L124,76 L136,78 L140,92 M124,76 L120,92" stroke="#1F2937" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="132" cy="62" r="6" fill="#F59E0B" />
    <path d="M132,68 L124,78" stroke="#1F2937" strokeWidth="5" strokeLinecap="round" />
    <path d="M125,72 L136,77" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
  </Art>
);

const Parking: React.FC = () => (
  <Art title="Señal de estacionamiento permitido (P)" viewBox="0 0 120 140">
    <rect width="120" height="140" fill="#E8F0FE" />
    <rect y="92" width="120" height="48" fill="#4B5563" />
    <path d="M14,92 L14,140 M52,92 L52,140 M90,92 L90,140" stroke="#FFFFFF" strokeWidth="3" />
    <rect x="57" y="64" width="6" height="32" fill="#9CA3AF" />
    <rect x="35" y="12" width="50" height="54" rx="7" fill="#1D4ED8" />
    <text x="60" y="53" textAnchor="middle" fontSize="34" fontWeight="700" fill="#FFFFFF" fontFamily="sans-serif">
      P
    </text>
  </Art>
);

const LevelCrossing: React.FC = () => (
  <Art title="Paso a nivel sin barreras: aspa de San Andrés sobre la vía del tren">
    <rect width="200" height="140" fill="#E8F0FE" />
    <path d="M70,140 L92,104 M130,140 L108,104" stroke="#6B7280" strokeWidth="5" />
    <path d="M76,128 L124,128 M82,118 L118,118" stroke="#9CA3AF" strokeWidth="3" />
    <rect x="96" y="96" width="8" height="44" fill="#9CA3AF" />
    <rect x="-9" y="-42" width="18" height="84" rx="4" fill="#FFFFFF" stroke="#C8102E" strokeWidth="3" transform="translate(100,60) rotate(45)" />
    <rect x="-9" y="-42" width="18" height="84" rx="4" fill="#FFFFFF" stroke="#C8102E" strokeWidth="3" transform="translate(100,60) rotate(-45)" />
  </Art>
);

const RoadAnatomy: React.FC = () => (
  <Art title="Partes de la vía: cuneta, arcén, calzada y mediana">
    <rect width="200" height="140" fill="#F3F4F6" />
    <polygon points="4,92 30,92 22,114 4,114" fill="#B9BFC9" />
    <rect x="30" y="90" width="36" height="24" fill="#D8DCE1" />
    <line x1="30" y1="90" x2="30" y2="114" stroke="#FFFFFF" strokeWidth="3" />
    <rect x="66" y="88" width="92" height="28" fill="#4B5563" />
    <line x1="70" y1="102" x2="154" y2="102" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="10 8" />
    <rect x="158" y="82" width="18" height="34" fill="#9AA0A8" />
    <rect x="155" y="74" width="24" height="9" rx="2" fill="#CBD5E1" />
    {/* turismo a escala, sobre la calzada */}
    <rect x="86" y="66" width="44" height="18" rx="6" fill="#2563EB" />
    <rect x="96" y="69" width="22" height="8" rx="3" fill="#BFDBFE" />
    <circle cx="96" cy="86" r="5" fill="#1F2937" />
    <circle cx="120" cy="86" r="5" fill="#1F2937" />
    <text x="17" y="131" textAnchor="middle" fontSize="11" fill="#1F2937" fontFamily="sans-serif">cuneta</text>
    <text x="48" y="131" textAnchor="middle" fontSize="11" fill="#1F2937" fontFamily="sans-serif">arcén</text>
    <text x="112" y="131" textAnchor="middle" fontSize="11" fill="#1F2937" fontFamily="sans-serif">calzada</text>
    <text x="167" y="131" textAnchor="middle" fontSize="11" fill="#1F2937" fontFamily="sans-serif">mediana</text>
  </Art>
);

const SafeDistance: React.FC = () => (
  <Art title="Distancia de seguridad entre dos vehículos">
    <rect width="200" height="140" fill="#E8F0FE" />
    <rect y="78" width="200" height="62" fill="#4B5563" />
    <line x1="0" y1="109" x2="200" y2="109" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="14 12" />
    {/* vehículo precedente */}
    <rect x="126" y="84" width="58" height="26" rx="8" fill="#DC2626" />
    <rect x="140" y="88" width="26" height="10" rx="3" fill="#FCA5A5" />
    <circle cx="140" cy="112" r="8" fill="#1F2937" />
    <circle cx="140" cy="112" r="3" fill="#9CA3AF" />
    <circle cx="170" cy="112" r="8" fill="#1F2937" />
    <circle cx="170" cy="112" r="3" fill="#9CA3AF" />
    {/* vehículo que sigue */}
    <rect x="16" y="84" width="58" height="26" rx="8" fill="#2563EB" />
    <rect x="30" y="88" width="26" height="10" rx="3" fill="#BFDBFE" />
    <circle cx="30" cy="112" r="8" fill="#1F2937" />
    <circle cx="30" cy="112" r="3" fill="#9CA3AF" />
    <circle cx="60" cy="112" r="8" fill="#1F2937" />
    <circle cx="60" cy="112" r="3" fill="#9CA3AF" />
    {/* cota */}
    <line x1="76" y1="58" x2="124" y2="58" stroke="#111827" strokeWidth="2" />
    <polygon points="76,58 85,54 85,62" fill="#111827" />
    <polygon points="124,58 115,54 115,62" fill="#111827" />
    <line x1="76" y1="51" x2="76" y2="65" stroke="#111827" strokeWidth="2" />
    <line x1="124" y1="51" x2="124" y2="65" stroke="#111827" strokeWidth="2" />
    <text x="100" y="44" textAnchor="middle" fontSize="12" fontWeight="700" fill="#111827" fontFamily="sans-serif">
      distancia de seguridad
    </text>
  </Art>
);

const Seatbelt: React.FC = () => (
  <Art title="Cinturón de seguridad correctamente colocado" viewBox="0 0 120 140">
    <rect width="120" height="140" fill="#F3F4F6" />
    <rect x="34" y="22" width="52" height="72" rx="12" fill="#9CA3AF" />
    <rect x="34" y="88" width="66" height="20" rx="9" fill="#9CA3AF" />
    <polygon points="40,26 54,26 92,104 78,104" fill="#1D4ED8" />
    <rect x="70" y="92" width="16" height="11" rx="3" fill="#374151" />
  </Art>
);

const Tyre: React.FC = () => (
  <Art title="Neumático: profundidad mínima del dibujo 1,6 mm" viewBox="0 0 140 140">
    <rect width="140" height="140" fill="#F3F4F6" />
    <circle cx="58" cy="60" r="42" fill="#1F2937" />
    <circle cx="58" cy="60" r="31" fill="none" stroke="#4B5563" strokeWidth="7" />
    <circle cx="58" cy="60" r="19" fill="#D1D5DB" />
    <circle cx="58" cy="60" r="7" fill="#6B7280" />
    <circle cx="71" cy="60" r="2.5" fill="#4B5563" />
    <circle cx="62" cy="72" r="2.5" fill="#4B5563" />
    <circle cx="47.5" cy="67.6" r="2.5" fill="#4B5563" />
    <circle cx="47.5" cy="52.4" r="2.5" fill="#4B5563" />
    <circle cx="62" cy="48" r="2.5" fill="#4B5563" />
    <circle cx="108" cy="98" r="16" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="3" />
    <path d="M102,90 L102,106 M108,90 L108,106 M114,90 L114,106" stroke="#1F2937" strokeWidth="3" />
    <text x="108" y="130" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1F2937" fontFamily="sans-serif">
      1,6 mm
    </text>
  </Art>
);

/* --------------------------------- registro --------------------------------- */

export const QUESTION_ART: Record<string, React.FC> = {
  "stop-sign": StopSign,
  "yield-sign": YieldSign,
  "no-entry": NoEntry,
  "speed-120": Speed120,
  roundabout: Roundabout,
  "intersection-right": IntersectionRight,
  overtake: Overtake,
  zebra: Zebra,
  tunnel: Tunnel,
  v16: V16,
  rain: Rain,
  "bike-lane": BikeLane,
  parking: Parking,
  "level-crossing": LevelCrossing,
  "road-anatomy": RoadAnatomy,
  "safe-distance": SafeDistance,
  seatbelt: Seatbelt,
  tyre: Tyre,
};
