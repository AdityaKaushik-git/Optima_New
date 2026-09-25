import { useId } from 'react';
import { motion } from 'framer-motion';
import type { StageKey } from '../../data/systems';
import { stages } from '../../data/systems';

/**
 * Schematic cross-section of a pile cap with pile head treatment, drawn after
 * details 1 and 3 of drawing OPT-JAZ-WP-SD-STR-002. Not to scale and carrying no
 * dimensions of its own: material notes are the drawing's.
 *
 * `shown`   number of stages visible (0–7), in the fixed sequence.
 * `active`  stage to emphasise; other layers are dimmed (used on tap, mobile).
 * `current` stage whose label is highlighted (used while scrolling, desktop).
 */
interface Props {
  shown: number;
  active?: StageKey | null;
  current?: StageKey | null;
  labels?: boolean;
  className?: string;
  title?: string;
}

const order: StageKey[] = stages.map((s) => s.key);
const ease = [0.16, 1, 0.3, 1] as const;

const labelSpec: Record<StageKey, { from: [number, number]; y: number; note: string }> = {
  concrete: { from: [520, 215], y: 190, note: 'Cast by main contractor' },
  protection: { from: [616, 262], y: 250, note: 'Rheoboard 6 mm, screed' },
  membrane: { from: [624, 298], y: 305, note: '2 layers Rheoseal 4S 180-10' },
  primer: { from: [630, 336], y: 360, note: 'One coat Rheoprime D41' },
  blockwork: { from: [652, 385], y: 415, note: 'On concrete blinding' },
  pileHead: { from: [562, 348], y: 470, note: 'Epoxy grout, 15–20 mm' },
  groundwater: { from: [690, 540], y: 540, note: 'Project-specific level' },
};

// Primer on the prepared surface, in three runs (it laps onto the pile heads, not across them).
const primerPaths = ['M170 160 V399 H237 V339 H262', 'M298 339 H323 V399 H477 V339 H502', 'M538 339 H563 V399 H630 V160'];
// Membrane, offset 6 units towards the structure.
const membranePaths = ['M176 160 V393 H231 V333 H262', 'M298 333 H329 V393 H471 V333 H502', 'M538 333 H569 V393 H624 V160'];

export default function CrossSection({ shown, active = null, current = null, labels = true, className, title = 'Schematic pile cap waterproofing cross-section' }: Props) {
  const u = useId().replace(/:/g, '');
  const idx = (k: StageKey) => order.indexOf(k);
  const isOn = (k: StageKey) => shown > idx(k);
  const op = (k: StageKey) => (!isOn(k) ? 0 : active && active !== k ? 0.22 : 1);
  const layer = (k: StageKey) => ({ initial: false as const, animate: { opacity: op(k) }, transition: { duration: 0.7, ease } });
  const draw = (k: StageKey) => ({
    initial: false as const,
    animate: { pathLength: isOn(k) ? 1 : 0, opacity: op(k) },
    transition: { pathLength: { duration: 1.1, ease }, opacity: { duration: 0.4 } },
  });

  return (
    <svg viewBox={labels ? '0 0 940 620' : '100 20 600 600'} className={className} role="img" aria-labelledby={`${u}xsec-title ${u}xsec-desc`}>
      <title id={`${u}xsec-title`}>{title}</title>
      <desc id={`${u}xsec-desc`}>
        Layers from the ground up: groundwater, pile head treatment, block work, bitumen primer, SBS membrane, protection, concrete structure.
      </desc>
      <defs>
        <pattern id={`${u}soil`} width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#16273a" />
          <circle cx="3" cy="4" r="0.9" fill="#34506e" />
          <circle cx="10" cy="10" r="0.7" fill="#2a425c" />
        </pattern>
        <pattern id={`${u}block`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="10" height="10" fill="#7d8a97" />
          <line x1="0" y1="0" x2="0" y2="10" stroke="#5c6875" strokeWidth="2" />
        </pattern>
        <pattern id={`${u}concrete`} width="22" height="22" patternUnits="userSpaceOnUse">
          <rect width="22" height="22" fill="#bfc6cd" />
          <path d="M4 5 l3 -2 l1 3 z M15 14 l2 3 l-3 0 z" fill="#98a1ab" />
          <circle cx="12" cy="6" r="0.9" fill="#8c96a0" />
          <circle cx="5" cy="17" r="0.8" fill="#8c96a0" />
        </pattern>
        <linearGradient id={`${u}water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1aa7de" stopOpacity="0.55" />
          <stop offset="1" stopColor="#0e6e9a" stopOpacity="0.2" />
        </linearGradient>
        <marker id={`${u}arrow-up`} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#7fd8f7" />
        </marker>
        <clipPath id={`${u}ground-clip`}><rect x="0" y="110" width="700" height="510" /></clipPath>
      </defs>

      {/* Ground and grade */}
      <rect x="0" y="110" width="700" height="510" fill={`url(#${u}soil)`} />
      <line x1="0" y1="110" x2="700" y2="110" stroke="#7fa0bd" strokeWidth="1.5" strokeDasharray="6 5" />
      <text x="14" y="100" className="fill-white/50" fontSize="11" fontFamily="var(--font-display)" letterSpacing="1.5">GRADE LEVEL</text>

      {/* 01 Groundwater */}
      <motion.g {...layer('groundwater')} clipPath={`url(#${u}ground-clip)`}>
        <rect x="0" y="470" width="700" height="150" fill={`url(#${u}water)`} />
        <g className="wave-drift">
          <path d="M0 470 q 25 -9 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0" fill="none" stroke="#7fd8f7" strokeWidth="2" />
        </g>
        {[90, 190, 400, 610].map((x) => (
          <line key={x} x1={x} y1="590" x2={x} y2="505" stroke="#7fd8f7" strokeWidth="2" markerEnd={`url(#${u}arrow-up)`} />
        ))}
      </motion.g>

      {/* Concrete blinding (block work stage) */}
      <motion.rect {...layer('blockwork')} x="120" y="400" width="560" height="16" fill="#4c5864" stroke="#2c353e" />

      {/* 07 Concrete structure (drawn early so piles read as embedded) */}
      <motion.g {...layer('concrete')}>
        <rect x="188" y="160" width="424" height="219" fill={`url(#${u}concrete)`} />
        <rect x="350" y="40" width="100" height="120" fill={`url(#${u}concrete)`} />
        <rect x="20" y="92" width="330" height="20" fill={`url(#${u}concrete)`} opacity="0.85" />
        <rect x="450" y="92" width="230" height="20" fill={`url(#${u}concrete)`} opacity="0.85" />
        <path d="M188 160 H350 V40 H450 V160 H612" fill="none" stroke="#e8edf2" strokeWidth="1.5" />
      </motion.g>

      {/* Piles, with projecting reinforcement (context, always visible) */}
      <g>
        {[248, 488].map((x) => (
          <g key={x}>
            <path d={`M${x} 350 H${x + 64} V600 q -32 30 -64 0 Z`} fill="#a9b2bb" stroke="#dfe5ea" strokeWidth="1.2" />
            {[14, 32, 50].map((dx) => (
              <line key={dx} x1={x + dx} y1="352" x2={x + dx} y2="236" stroke="#d98a4a" strokeWidth="2.5" strokeLinecap="round" />
            ))}
          </g>
        ))}
      </g>

      {/* 02 Pile head treatment: epoxy grout to top and sides */}
      <motion.g {...layer('pileHead')}>
        {[248, 488].map((x) => (
          <path key={x} d={`M${x - 10} 400 V340 H${x + 74} V400 H${x + 64} V350 H${x} V400 Z`} fill="#a38f33" stroke="#e1cd6a" strokeWidth="1" />
        ))}
      </motion.g>

      {/* 03 Block work */}
      <motion.g {...layer('blockwork')}>
        <rect x="140" y="160" width="30" height="240" fill={`url(#${u}block)`} stroke="#c7d0d8" strokeWidth="1" />
        <rect x="630" y="160" width="30" height="240" fill={`url(#${u}block)`} stroke="#c7d0d8" strokeWidth="1" />
      </motion.g>

      {/* 04 Bitumen primer */}
      {primerPaths.map((d) => (
        <motion.path key={d} d={d} {...draw('primer')} fill="none" stroke="#e0a03a" strokeWidth="3" strokeLinejoin="round" />
      ))}

      {/* 05 SBS membrane: light edge so the black membrane reads on a dark ground */}
      {membranePaths.map((d) => (
        <g key={d}>
          <motion.path d={d} {...draw('membrane')} fill="none" stroke="#dfe7ee" strokeWidth="9" strokeLinejoin="round" />
          <motion.path d={d} {...draw('membrane')} fill="none" stroke="#0b0c0e" strokeWidth="6" strokeLinejoin="round" />
          <motion.path d={d} {...draw('membrane')} fill="none" stroke="#3b4048" strokeWidth="0.8" strokeDasharray="10 6" />
        </g>
      ))}

      {/* 06 Protection: board on vertical faces, screed on the base */}
      <motion.g {...layer('protection')}>
        <rect x="180" y="160" width="8" height="226" fill="#7fa0bd" />
        <rect x="612" y="160" width="8" height="226" fill="#7fa0bd" />
        {[[188, 38], [334, 132], [574, 38]].map(([x, w]) => (
          <rect key={x} x={x} y="379" width={w} height="10" fill="#8fa9c0" stroke="#5f7d98" strokeWidth="0.6" />
        ))}
      </motion.g>

      {/* Labels with leader lines */}
      {labels &&
        stages.map((s, i) => {
          const spec = labelSpec[s.key];
          const on = isOn(s.key);
          const hi = current === s.key;
          return (
            <motion.g key={s.key} initial={false} animate={{ opacity: on ? 1 : 0.14 }} transition={{ duration: 0.5 }}>
              <polyline
                points={`${spec.from[0]},${spec.from[1]} 700,${spec.y} 716,${spec.y}`}
                fill="none"
                stroke={hi ? '#00aee7' : 'rgba(255,255,255,0.45)'}
                strokeWidth={hi ? 1.6 : 1}
              />
              <circle cx={spec.from[0]} cy={spec.from[1]} r={hi ? 4 : 3} fill={hi ? '#00aee7' : '#fff'} />
              <text x="724" y={spec.y - 3} fontFamily="var(--font-display)" fontSize="11.5" fontWeight="600" letterSpacing="1.1" fill={hi ? '#00aee7' : '#ffffff'}>
                {String(i + 1).padStart(2, '0')} {s.label.toUpperCase()}
              </text>
              <text x="724" y={spec.y + 13} fontSize="11" fill="rgba(255,255,255,0.6)" fontFamily="var(--font-sans)">
                {spec.note}
              </text>
            </motion.g>
          );
        })}
    </svg>
  );
}
