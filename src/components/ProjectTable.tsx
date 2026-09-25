import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { projectCategories, projects, type Project, type ScopeCategory } from '../data/projects';
import { Img, StatusBadge } from './ui';
import { cx, pad2 } from '../lib/asset';

const dash = (v: string | null, fallback = 'On request') => v ?? fallback;

function Preview({ p }: { p: Project }) {
  return p.image ? (
    <Img src={p.image} small sizes="320px" alt="" className="h-full w-full object-cover" />
  ) : (
    <div className="blueprint flex h-full w-full flex-col justify-end p-4">
      <p className="anno text-aqua">{p.category}</p>
      <p className="mt-1 font-display text-lg leading-tight text-white">{p.building}</p>
      {p.plot && <p className="mt-1 text-xs text-white/55">Plot {p.plot}</p>}
    </div>
  );
}

export default function ProjectTable({ limit, showFilters = true }: { limit?: number; showFilters?: boolean }) {
  const [filter, setFilter] = useState<ScopeCategory | 'All'>('All');
  const [hover, setHover] = useState<Project | null>(null);
  const [openCard, setOpenCard] = useState<string | null>(null);
  const navigate = useNavigate();

  const list = useMemo(() => {
    const f = filter === 'All' ? projects : projects.filter((p) => p.category === filter);
    return limit ? f.slice(0, limit) : f;
  }, [filter, limit]);

  const counts = useMemo(() => Object.fromEntries(projectCategories.map((c) => [c, projects.filter((p) => p.category === c).length])), []);

  return (
    <div>
      {showFilters && (
        <div role="group" aria-label="Filter projects by scope" className="no-scrollbar -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {(['All', ...projectCategories] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cx(
                'min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition',
                filter === c ? 'border-navy bg-navy text-white' : 'border-line bg-white text-graphite hover:border-navy',
              )}
            >
              {c} <span className={cx('ml-1 tabular-nums', filter === c ? 'text-aqua' : 'text-steel')}>{c === 'All' ? projects.length : counts[c]}</span>
            </button>
          ))}
        </div>
      )}

      {/* Desktop register */}
      <div className="relative hidden lg:block" onMouseLeave={() => setHover(null)}>
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Project register: waterproofing projects by Optima Star</caption>
          <thead>
            <tr className="anno border-b-2 border-navy text-steel">
              <th scope="col" className="w-14 py-4 pr-3 font-semibold">No.</th>
              <th scope="col" className="py-4 pr-4 font-semibold">Project</th>
              <th scope="col" className="py-4 pr-4 font-semibold">Location</th>
              <th scope="col" className="py-4 pr-4 font-semibold">Type</th>
              <th scope="col" className="py-4 pr-4 font-semibold">Waterproofing scope</th>
              <th scope="col" className="py-4 pr-4 font-semibold">System</th>
              <th scope="col" className="py-4 pr-4 font-semibold">Year</th>
              <th scope="col" className="py-4 pr-4 font-semibold">Status</th>
              <th scope="col" className="py-4 font-semibold"><span className="sr-only">View</span></th>
            </tr>
          </thead>
          <motion.tbody layout>
            <AnimatePresence initial={false}>
              {list.map((p, i) => (
                <motion.tr
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.03 }}
                  onMouseEnter={() => setHover(p)}
                  onClick={() => navigate(`/projects/${p.slug}`)}
                  className="group relative cursor-pointer border-b border-line align-top text-[0.94rem] transition-colors hover:bg-paper"
                >
                  <td className="relative py-5 pr-3 font-display tabular-nums text-steel">
                    <span aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-aqua transition-transform duration-500 group-hover:scale-y-100" />
                    <span className="pl-3">{pad2(p.no)}</span>
                  </td>
                  <td className="py-5 pr-4">
                    <Link to={`/projects/${p.slug}`} className="font-display text-[1.02rem] font-semibold text-navy transition-transform group-hover:text-blue" onClick={(e) => e.stopPropagation()}>
                      {p.title}
                    </Link>
                    {p.plot && <p className="mt-0.5 text-xs text-steel">Plot {p.plot}</p>}
                  </td>
                  <td className="py-5 pr-4 text-graphite/85">{dash(p.location)}</td>
                  <td className="py-5 pr-4 text-graphite/85">{p.projectType}</td>
                  <td className="py-5 pr-4">{p.scope.split(/;| \(/)[0]}</td>
                  <td className="max-w-[14rem] py-5 pr-4 text-graphite/85">{dash(p.system)}</td>
                  <td className="whitespace-nowrap py-5 pr-4 text-steel">{dash(p.year)}</td>
                  <td className="py-5 pr-4"><StatusBadge status={p.status} recordType={p.recordType} /></td>
                  <td className="py-5 text-right">
                    <span className="inline-grid h-9 w-9 place-items-center rounded-full border border-line text-navy transition group-hover:border-aqua group-hover:bg-aqua">
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </motion.tbody>
        </table>
        <AnimatePresence>
          {hover && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              aria-hidden
              className="pointer-events-none fixed bottom-8 right-8 z-30 hidden h-48 w-72 overflow-hidden rounded-xl shadow-[0_30px_60px_-20px_rgb(10_26_46/0.6)] xl:block"
            >
              <AnimatePresence mode="popLayout">
                <motion.div key={hover.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full">
                  <Preview p={hover} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile and tablet cards */}
      <ul className="grid gap-4 md:grid-cols-2 lg:hidden">
        {list.map((p) => {
          const open = openCard === p.slug;
          return (
            <li key={p.slug} className="rounded-[var(--radius-card)] border border-line bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="anno text-steel">Project {pad2(p.no)}</p>
                <StatusBadge status={p.status} recordType={p.recordType} />
              </div>
              <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
              <p className="mt-1 text-[0.95rem] text-steel">{dash(p.location, 'Location on request')}</p>
              <p className="mt-3 text-[0.95rem] font-medium text-navy">{p.scope.split(/;| \(/)[0]}</p>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.dl initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 overflow-hidden pt-4 text-sm">
                    <dt className="text-steel">Type</dt><dd>{p.projectType}</dd>
                    <dt className="text-steel">System</dt><dd>{dash(p.system)}</dd>
                    <dt className="text-steel">Year</dt><dd>{dash(p.year)}</dd>
                    {p.plot && (<><dt className="text-steel">Plot</dt><dd>{p.plot}</dd></>)}
                    {p.contractor && (<><dt className="text-steel">Main contractor</dt><dd>{p.contractor}</dd></>)}
                  </motion.dl>
                )}
              </AnimatePresence>
              <div className="mt-5 flex items-center justify-between gap-3">
                <button type="button" onClick={() => setOpenCard(open ? null : p.slug)} aria-expanded={open} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-steel">
                  {open ? 'Less' : 'Details'} <ChevronDown className={cx('h-4 w-4 transition-transform', open && 'rotate-180')} aria-hidden />
                </button>
                <Link to={`/projects/${p.slug}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy">
                  View project <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
