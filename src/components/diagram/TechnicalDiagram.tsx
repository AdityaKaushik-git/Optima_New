import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import CrossSection from './CrossSection';
import { stages, type StageKey } from '../../data/systems';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { cx, pad2 } from '../../lib/asset';

const Intro = ({ compact }: { compact?: boolean }) => (
  <div>
    <p className="anno mb-4 flex items-center gap-3 text-aqua"><span aria-hidden className="h-px w-8 bg-current" />A systematic approach to waterproofing</p>
    <h2 className={cx('font-semibold text-white', compact ? 'text-[length:var(--text-h2)]' : 'text-[clamp(2rem,1.2rem+2.4vw,3.4rem)]')}>
      From groundwater to protected structure
    </h2>
  </div>
);

const Footnote = () => (
  <p className="mt-6 text-xs leading-relaxed text-white/45">
    Schematic, not to scale. Based on drawing OPT-JAZ-WP-SD-STR-002 (substructure waterproofing details). Materials and thicknesses on each project follow its approved drawings and specification.
  </p>
);

/** Desktop: the section pins while the cross-section builds one layer per scroll step. */
function PinnedDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [shown, setShown] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // 7 build steps plus a hold on the completed structure
    const n = Math.min(stages.length, Math.max(0, Math.floor(v * (stages.length + 1.4) + 0.35)));
    setShown(n);
  });

  const current = shown > 0 ? stages[Math.min(shown, stages.length) - 1] : null;
  const complete = shown >= stages.length;

  return (
    <div ref={ref} className="relative" style={{ height: `${(stages.length + 2) * 70}vh` }}>
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden pt-[var(--header-h)]">
        <div className="container-x grid w-full grid-cols-12 items-center gap-10">
          <div className="col-span-4">
            <Intro />
            <ol className="relative mt-10 space-y-0.5 border-l border-white/12 pl-6">
              <motion.span aria-hidden className="absolute -left-px top-0 w-px origin-top bg-aqua" style={{ height: '100%', scaleY: smooth }} />
              {stages.map((s, i) => {
                const on = shown > i;
                const isCurrent = current?.key === s.key && !complete;
                return (
                  <li key={s.key} className={cx('transition-colors duration-500', on ? 'text-white' : 'text-white/35')}>
                    <div className="flex items-baseline gap-3 py-1.5">
                      <span className={cx('font-display text-xs tabular-nums', on ? 'text-aqua' : 'text-white/30')}>{pad2(i + 1)}</span>
                      <span className={cx('font-display text-[1.05rem] font-medium', isCurrent && 'text-aqua')}>{s.label}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="mt-8 min-h-[9.5rem]" aria-live="polite">
              <AnimatePresence mode="wait">
                {complete ? (
                  <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-4">
                    <ShieldCheck className="mt-1 h-8 w-8 shrink-0 text-aqua" aria-hidden />
                    <div>
                      <p className="font-display text-2xl font-semibold text-white">Structure protected</p>
                      <p className="mt-2 text-[0.95rem] text-white/65">Every face of the pile cap sits inside a primed, two-layer membrane envelope, protected before concrete.</p>
                    </div>
                  </motion.div>
                ) : current ? (
                  <motion.div key={current.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                    <p className="text-[0.98rem] text-white/80">{current.purpose}</p>
                    <p className="mt-3 border-l-2 border-aqua/60 pl-3 text-sm text-white/55">{current.note}</p>
                  </motion.div>
                ) : (
                  <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[0.98rem] text-white/60">
                    Scroll to build the waterproofing system one layer at a time, in the order it is installed on site.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="col-span-8">
            <CrossSection shown={shown} current={complete ? null : current?.key} className="h-auto max-h-[78dvh] w-full" />
            <Footnote />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile, tablet and reduced motion: full diagram, then a vertical tap-through sequence. */
function SequenceDiagram() {
  const [open, setOpen] = useState<StageKey | null>(null);
  return (
    <div className="container-x">
      <Intro compact />
      <p className="lede mt-5">Tap a stage to see its purpose, how it is applied and the note on the drawing.</p>
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
        <CrossSection shown={stages.length} active={open} labels={false} className="h-auto w-full" title="Cross-section with all waterproofing layers" />
      </div>
      <ol className="mt-8">
        {stages.map((s, i) => {
          const isOpen = open === s.key;
          return (
            <li key={s.key} className="relative pl-10">
              {i < stages.length - 1 && <span aria-hidden className="absolute left-[0.9rem] top-10 bottom-0 w-px bg-white/15" />}
              <span aria-hidden className="absolute left-0 top-3 grid h-7 w-7 place-items-center rounded-full border border-white/20 font-display text-[0.7rem] text-aqua" style={{ background: 'var(--color-ink)' }}>
                {pad2(i + 1)}
              </span>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : s.key)}
                aria-expanded={isOpen}
                aria-controls={`stage-${s.key}`}
                className="flex min-h-12 w-full items-center justify-between gap-3 py-3 text-left"
              >
                <span className="flex items-center gap-3">
                  <span aria-hidden className="h-3 w-3 rounded-sm ring-1 ring-white/30" style={{ background: s.swatch }} />
                  <span className={cx('font-display text-lg font-medium', isOpen ? 'text-aqua' : 'text-white')}>{s.label}</span>
                </span>
                <ChevronDown className={cx('h-5 w-5 text-white/60 transition-transform', isOpen && 'rotate-180')} aria-hidden />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`stage-${s.key}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <dl className="space-y-3 pb-6 text-[0.95rem]">
                      {[
                        ['Purpose', s.purpose],
                        ['Application', s.application],
                        ['Technical note', `${s.note} (${s.drawingRef})`],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <dt className="anno text-aqua/90">{k}</dt>
                          <dd className="mt-1 text-white/75">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
      <div className="mt-6 flex items-center gap-3 rounded-xl bg-aqua/10 px-4 py-3 text-white">
        <ShieldCheck className="h-6 w-6 shrink-0 text-aqua" aria-hidden />
        <p className="font-display font-medium">Structure protected</p>
      </div>
      <Footnote />
    </div>
  );
}

export default function TechnicalDiagram() {
  const desktop = useMediaQuery('(min-width: 1024px) and (min-height: 640px)');
  const reduce = useReducedMotion();
  return (
    <section id="system" aria-label="Waterproofing system cross-section" className="blueprint on-dark relative">
      {desktop && !reduce ? (
        <PinnedDiagram />
      ) : (
        <div className="section-y">
          <SequenceDiagram />
        </div>
      )}
    </section>
  );
}
