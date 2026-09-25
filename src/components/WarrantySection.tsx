import { motion } from 'framer-motion';
import { warranty } from '../config/site';
import { Button } from './ui';

/** SBS membrane warranty statement. Hidden everywhere when warranty.enabled is false. */
export default function WarrantySection({ compact }: { compact?: boolean }) {
  if (!warranty.enabled) return null;
  return (
    <section aria-labelledby="warranty-title" className="membrane-texture relative overflow-hidden bg-navy text-white">
      <div className={compact ? 'container-x py-16' : 'container-x section-y'}>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="relative mx-auto aspect-square w-full max-w-[26rem] lg:col-span-5">
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
              <circle cx="100" cy="100" r="92" fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="1" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="6" strokeDasharray="1 3" />
              <motion.circle
                cx="100" cy="100" r="92" fill="none" stroke="var(--color-aqua)" strokeWidth="1.6" strokeLinecap="round"
                transform="rotate(-90 100 100)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 0.82 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="font-display text-[clamp(4rem,10vw,7.5rem)] font-semibold leading-none tracking-[-0.05em]">{warranty.range}</p>
                <p className="mt-2 font-display text-xl tracking-[0.3em] text-aqua">YEARS*</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="anno mb-4 flex items-center gap-3 text-aqua"><span aria-hidden className="h-px w-8 bg-current" />Warranty statement</p>
            <h2 id="warranty-title" className="text-[length:var(--text-h2)] font-semibold text-white">{warranty.title}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{warranty.statement}</p>
            <p className="mt-6 max-w-2xl border-l border-white/25 pl-4 text-sm leading-relaxed text-white/55">{warranty.footnote}</p>
            {!compact && (
              <div className="mt-9 flex flex-wrap gap-3">
                <Button to="/services/sbs-membrane-waterproofing" variant="light" arrow>SBS membrane waterproofing</Button>
                <Button to="/quote" variant="outline-light">Discuss your project</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
