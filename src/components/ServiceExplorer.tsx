import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { services, type Service } from '../data/services';
import { serviceIcons } from './icons';
import { Button, Img } from './ui';
import { cx, pad2 } from '../lib/asset';
import { warranty } from '../config/site';

function Visual({ s }: { s: Service }) {
  return s.imageHiRes ? (
    <Img src={s.image} small sizes="(min-width:1024px) 55vw, 100vw" alt={s.title} className="h-full w-full object-cover" />
  ) : (
    <div className="blueprint relative grid h-full w-full place-items-center">
      <Img src={s.image} alt={s.title} className="relative z-10 h-[62%] w-auto rounded-md border-4 border-white/90 object-cover shadow-2xl" />
      <p className="anno absolute bottom-4 left-5 text-white/40">Company brochure photo</p>
    </div>
  );
}

function Detail({ s, index }: { s: Service; index: number }) {
  const Icon = serviceIcons[s.icon];
  return (
    <div>
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-display text-sm tabular-nums text-blue">{pad2(index + 1)} / {pad2(services.length)}</p>
          <h3 className="mt-2 text-[length:var(--text-h3)] font-semibold">{s.title}</h3>
        </div>
        <Icon className="mt-2 h-7 w-7 shrink-0 text-aqua" aria-hidden strokeWidth={1.6} />
      </div>
      <p className="mt-4 text-[1.02rem] leading-relaxed text-graphite/85">{s.overview}</p>
      <div className="mt-7 grid gap-7 md:grid-cols-2">
        <div>
          <h4 className="anno text-steel">Application areas</h4>
          <ul className="mt-3 space-y-1.5 text-[0.95rem]">
            {s.applicationAreas.map((a) => (<li key={a} className="flex gap-2.5"><span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-aqua" />{a}</li>))}
          </ul>
        </div>
        <div>
          <h4 className="anno text-steel">Systems and materials</h4>
          <ul className="mt-3 space-y-1.5 text-[0.95rem]">
            {s.materials.slice(0, 4).map((m) => (<li key={m.name} className="flex gap-2.5"><span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-aqua" />{m.name}</li>))}
          </ul>
        </div>
      </div>
      {s.warranty && warranty.enabled && (
        <p className="mt-6 rounded-lg bg-mist px-4 py-3 text-sm text-navy">
          SBS membrane systems may carry a {warranty.range} year warranty, depending on the structure, system and project specification.*
        </p>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button to={`/services/${s.slug}`} variant="secondary" arrow>Full technical detail</Button>
        <Button to={`/quote?service=${encodeURIComponent(s.title)}`} variant="ghost" arrow>Request a quote</Button>
      </div>
    </div>
  );
}

export default function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const s = services[active];

  return (
    <>
      {/* Desktop */}
      <div className="hidden gap-10 lg:grid lg:grid-cols-12">
        <div className="lg:col-span-4" role="tablist" aria-label="Waterproofing services" aria-orientation="vertical">
          {services.map((sv, i) => (
            <button
              key={sv.slug}
              role="tab"
              id={`svc-tab-${i}`}
              aria-selected={i === active}
              aria-controls="svc-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                  e.preventDefault();
                  const n = (active + (e.key === 'ArrowDown' ? 1 : -1) + services.length) % services.length;
                  setActive(n);
                  document.getElementById(`svc-tab-${n}`)?.focus();
                }
              }}
              className={cx(
                'group relative flex w-full items-baseline gap-4 border-b border-line py-3.5 pl-5 text-left transition-colors',
                i === active ? 'text-navy' : 'text-steel hover:text-navy',
              )}
            >
              {i === active && <motion.span layoutId="svc-accent" className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-aqua" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className="font-display text-xs tabular-nums text-blue/80">{pad2(i + 1)}</span>
              <span className={cx('font-display text-[1.08rem] font-medium transition-transform duration-300', i === active ? 'translate-x-1' : 'group-hover:translate-x-1')}>{sv.title}</span>
            </button>
          ))}
        </div>
        <div className="lg:col-span-8" role="tabpanel" id="svc-panel" aria-labelledby={`svc-tab-${active}`}>
          <div className="sticky top-[calc(var(--header-h)+1.5rem)]">
            <div className="relative aspect-[16/8] overflow-hidden rounded-[var(--radius-card)] bg-ink">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={s.slug}
                  initial={{ clipPath: 'inset(0 0 0 100%)' }}
                  animate={{ clipPath: 'inset(0 0 0 0%)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Visual s={s} />
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={s.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="pt-8">
                <Detail s={s} index={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile and tablet */}
      <ul className="divide-y divide-line border-y border-line lg:hidden">
        {services.map((sv, i) => {
          const open = openMobile === i;
          const Icon = serviceIcons[sv.icon];
          return (
            <li key={sv.slug}>
              <button
                type="button"
                onClick={() => setOpenMobile(open ? null : i)}
                aria-expanded={open}
                aria-controls={`svc-m-${i}`}
                className="flex min-h-14 w-full items-center gap-4 py-4 text-left"
              >
                <Icon className="h-5 w-5 shrink-0 text-aqua" aria-hidden />
                <span className="flex-1 font-display text-lg font-medium text-navy">{sv.title}</span>
                <ChevronDown className={cx('h-5 w-5 text-steel transition-transform', open && 'rotate-180')} aria-hidden />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div id={`svc-m-${i}`} initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                    <div className="pb-8">
                      <div className="mb-6 aspect-[16/10] overflow-hidden rounded-xl bg-ink"><Visual s={sv} /></div>
                      <Detail s={sv} index={i} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-sm text-steel">
        Looking for something specific? <Link to="/services" className="link-u font-semibold text-navy">Compare all services</Link>
        {warranty.enabled && <span className="block mt-1 text-xs">{warranty.footnote}</span>}
      </p>
    </>
  );
}
