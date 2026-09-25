import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Img } from './ui';

interface Props {
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: { label: string; to?: string }[];
  image?: string;
  children?: ReactNode;
}

/** Dark page header shared by every inner page. The fixed header sits transparent over it. */
export default function PageHero({ kicker, title, intro, crumbs, image, children }: Props) {
  return (
    <section className="blueprint on-dark relative isolate overflow-hidden pt-[calc(var(--header-h)+env(safe-area-inset-top)+3.5rem)] pb-16 lg:pb-24">
      {image && (
        <div aria-hidden className="absolute inset-0 -z-10">
          <Img src={image} small priority className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </div>
      )}
      <svg aria-hidden className="pointer-events-none absolute right-0 bottom-0 -z-10 hidden h-full w-1/2 text-aqua/15 lg:block" viewBox="0 0 400 300" preserveAspectRatio="none">
        <path d="M0 260 H400 M0 220 H400" stroke="currentColor" strokeDasharray="2 6" />
        <path d="M320 40 V300" stroke="currentColor" />
      </svg>
      <div className="container-x">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/55">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                  {c.to ? <Link to={c.to} className="hover:text-white">{c.label}</Link> : <span aria-current="page" className="text-white/85">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="anno mb-5 flex items-center gap-3 text-aqua"><span aria-hidden className="h-px w-8 bg-current" />{kicker}</p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl text-[length:var(--text-h1)] font-semibold text-white"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.8 }} className="lede mt-6">
            {intro}
          </motion.div>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
