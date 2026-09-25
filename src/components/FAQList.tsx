import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '../data/content';
import { cx } from '../lib/asset';

export default function FAQList({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<number | null>(0);
  const list = limit ? faqs.slice(0, limit) : faqs;
  return (
    <ul className="border-t border-line">
      {list.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q} className="border-b border-line">
            <h3 className="text-base">
              <button
                type="button"
                id={`faq-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-14 w-full items-center justify-between gap-6 py-5 text-left font-display text-[1.12rem] font-medium text-navy hover:text-blue"
              >
                {f.q}
                <Plus className={cx('h-5 w-5 shrink-0 text-aqua transition-transform duration-300', isOpen && 'rotate-45')} aria-hidden />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-6 text-[1.02rem] leading-relaxed text-graphite/85">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
