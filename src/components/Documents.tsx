import { useState, type ReactNode } from 'react';
import { Expand, FileText } from 'lucide-react';
import DocumentViewer from './DocumentViewer';
import { asset, cx } from '../lib/asset';
import { docThumb, type Certificate, type DocImage } from '../data/documents';

export function CertificateGrid({ items, compact }: { items: Certificate[]; compact?: boolean }) {
  const [idx, setIdx] = useState<number | null>(null);
  return (
    <>
      <ul className={cx('grid gap-5 sm:grid-cols-2', compact ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}>
        {items.map((c, i) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => setIdx(i)}
              className="group flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white text-left transition duration-500 hover:-translate-y-1 hover:border-aqua/60 hover:shadow-[0_24px_50px_-28px_rgb(19_45_76/0.45)]"
              aria-label={`View certificate: ${c.title}`}
            >
              <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-mist p-5">
                <img
                  src={asset(docThumb(c.file))}
                  alt=""
                  loading="lazy"
                  className={cx('max-h-full rounded-sm bg-white shadow-md transition duration-700 group-hover:scale-[1.04]', c.orientation === 'landscape' ? 'w-full' : 'h-full')}
                />
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-navy/80 text-white opacity-0 transition group-hover:opacity-100">
                  <Expand className="h-4 w-4" aria-hidden />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-sm font-semibold text-blue">{c.issuer}</p>
                <h3 className="mt-1 text-lg font-semibold">{c.type}</h3>
                {!compact && <p className="mt-2 text-[0.93rem] leading-relaxed text-steel">{c.scope}</p>}
                <dl className="mt-auto grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 pt-4 text-sm">
                  {c.issued && (<><dt className="text-steel">Issued</dt><dd className="text-graphite">{c.issued}</dd></>)}
                  <dt className="text-steel">Validity</dt>
                  <dd className="text-graphite">{c.validity}</dd>
                  {!compact && c.reference && (<><dt className="text-steel">Ref.</dt><dd className="break-words text-graphite">{c.reference}</dd></>)}
                </dl>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy">
                  View certificate <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <DocumentViewer items={items.map((c) => ({ file: c.file, title: c.title, caption: `${c.issuer}. ${c.validity}.` }))} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
    </>
  );
}

export function DocGallery({
  items,
  dark,
  cols = 'sm:grid-cols-2 lg:grid-cols-3',
  meta,
}: {
  items: (DocImage & { date?: string; outcome?: string })[];
  dark?: boolean;
  cols?: string;
  meta?: (d: DocImage & { date?: string; outcome?: string }) => ReactNode;
}) {
  const [idx, setIdx] = useState<number | null>(null);
  return (
    <>
      <ul className={cx('grid gap-4', cols)}>
        {items.map((d, i) => (
          <li key={d.id}>
            <button
              type="button"
              onClick={() => setIdx(i)}
              className={cx(
                'group flex h-full w-full flex-col overflow-hidden rounded-xl border text-left transition duration-500',
                dark ? 'border-white/12 bg-white/[0.03] hover:border-aqua/60' : 'border-line bg-white hover:border-aqua/60 hover:shadow-[0_20px_40px_-28px_rgb(19_45_76/0.5)]',
              )}
              aria-label={`Open ${d.title}`}
            >
              <div className={cx('relative overflow-hidden bg-white', d.orientation === 'landscape' ? 'aspect-[16/10]' : 'aspect-[4/3]')}>
                <img src={asset(docThumb(d.file))} alt="" loading="lazy" className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.05]" />
              </div>
              <div className="flex flex-1 items-start gap-3 p-4">
                <FileText className={cx('mt-0.5 h-4 w-4 shrink-0', dark ? 'text-aqua' : 'text-blue')} aria-hidden />
                <div>
                  <p className={cx('text-[0.93rem] font-semibold leading-snug', dark ? 'text-white' : 'text-navy')}>{d.title}</p>
                  {meta ? meta(d) : d.caption && <p className={cx('mt-1 text-xs', dark ? 'text-white/55' : 'text-steel')}>{d.caption}</p>}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <DocumentViewer
        items={items.map((d) => ({ file: d.file, title: d.title, caption: [d.caption, d.date, d.outcome].filter(Boolean).join('. ') }))}
        index={idx}
        onClose={() => setIdx(null)}
        onIndex={setIdx}
      />
    </>
  );
}
