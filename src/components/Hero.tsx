import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { Button } from './ui';
import { primaryPhone } from '../data/company';
import { trustBar } from '../data/content';

const ease = [0.16, 1, 0.3, 1] as const;

function MaskLine({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span className="block" initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, delay, ease }}>
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
      <motion.div aria-hidden className="absolute inset-0 -z-10" style={{ y }}>
        <motion.div className="h-full w-full" initial={{ clipPath: 'inset(8% 8% 8% 8%)', scale: 1.12 }} animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }} transition={{ duration: 1.8, ease }}>
          <img src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=100&w=3840&auto=format&fit=crop" alt="" className="h-full w-full object-cover object-[50%_50%]" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(10_26_46/0.96)_0%,rgb(10_26_46/0.82)_45%,rgb(10_26_46/0.35)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      </motion.div>

      {/* Technical line work: a dimension line and section marker that draw in once */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-aqua/40" preserveAspectRatio="none" viewBox="0 0 1440 900">
        <motion.path d="M80 760 H1360" stroke="currentColor" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.9, ease }} />
        <motion.path d="M80 748 V772 M1360 748 V772" stroke="currentColor" strokeWidth="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }} />
        <motion.path d="M1260 120 V700" stroke="currentColor" strokeDasharray="4 8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 1.2, ease }} />
      </svg>

      <motion.div style={{ opacity: fade }} className="container-x flex flex-1 flex-col justify-center pt-[calc(var(--header-h)+env(safe-area-inset-top)+2rem)] pb-16">
        <motion.p initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="anno mb-7 flex items-center gap-3 text-aqua">
          <span aria-hidden className="h-px w-8 bg-current" />Waterproofing contractor, Dubai
        </motion.p>
        <h1 className="max-w-5xl font-display text-[length:var(--text-display)] font-semibold leading-[0.98] tracking-[-0.035em] text-white">
          <MaskLine delay={0.4}>Engineered waterproofing.</MaskLine>
          <MaskLine delay={0.55}>Built to protect.</MaskLine>
        </h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.95, ease }} className="mt-8 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
          Specialized waterproofing systems for substructures, pile heads, roofs and wet areas, applied to approved drawings and reviewed by the project consultant.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.1, ease }} className="mt-10 flex flex-wrap items-center gap-3">
          <Button to="/quote" size="lg" arrow>Request a quote</Button>
          <Button to="/services" size="lg" variant="outline-light">Explore waterproofing</Button>
          <a href={`tel:${primaryPhone.tel}`} className="ml-1 inline-flex min-h-11 items-center gap-2 px-2 text-[0.95rem] font-semibold text-white/80 hover:text-white">
            <Phone className="h-4 w-4 text-aqua" aria-hidden /> Call us
          </a>
        </motion.div>
      </motion.div>

      <div className="relative border-t border-white/10 bg-ink/70 backdrop-blur-md">
        <ul className="container-x no-scrollbar flex gap-8 overflow-x-auto py-5 text-sm font-semibold text-white/75 lg:justify-between">
          {trustBar.map((t, i) => (
            <motion.li key={t} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 + i * 0.08 }} className="flex shrink-0 items-center gap-3">
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-aqua" />{t}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
