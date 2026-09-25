import { motion } from 'framer-motion';
import { Leaf, HeartPulse, HardHat, BadgeCheck } from 'lucide-react';
import { qhse } from '../data/content';

const icons = { quality: BadgeCheck, health: HeartPulse, safety: HardHat, environment: Leaf } as const;

export default function QHSESection() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
      {qhse.map((q, i) => {
        const Icon = icons[q.key as keyof typeof icons];
        return (
          <li key={q.key} className="group relative flex flex-col bg-white p-7 transition-colors duration-500 hover:bg-paper">
            <div className="flex items-center justify-between">
              <span className="relative grid h-12 w-12 place-items-center rounded-full bg-mist text-navy transition group-hover:bg-navy group-hover:text-aqua">
                <Icon className="h-6 w-6" aria-hidden strokeWidth={1.6} />
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-aqua"
                  initial={{ scale: 1, opacity: 0 }}
                  whileInView={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.2 + i * 0.15 }}
                />
              </span>
              <span className="font-display text-5xl font-semibold text-mist transition-colors group-hover:text-aqua/25" aria-hidden>{q.title[0]}</span>
            </div>
            <h3 className="mt-6 text-2xl font-semibold">{q.title}</h3>
            <p className="mt-3 text-[0.96rem] leading-relaxed text-graphite/85">{q.text}</p>
            <ul className="mt-5 space-y-1.5 border-t border-line pt-5 text-sm text-steel">
              {q.points.map((p) => (<li key={p} className="flex gap-2.5"><span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-aqua" />{p}</li>))}
            </ul>
          </li>
        );
      })}
    </ol>
  );
}
