import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import WarrantySection from '../components/WarrantySection';
import { DocGallery } from '../components/Documents';
import { Button, Img } from '../components/ui';
import { serviceBySlug } from '../data/services';
import { drawingById } from '../data/documents';
import { serviceIcons } from '../components/icons';
import { siteConfig } from '../config/site';
import { pad2 } from '../lib/asset';
import NotFound from './NotFound';

function Block({ title, children, id }: { title: string; children: React.ReactNode; id: string }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-10 first:border-t-0 first:pt-0">
      <h2 id={id} className="text-[length:var(--text-h3)] font-semibold">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5 text-[1.02rem]">
    {items.map((x) => (<li key={x} className="flex gap-3"><span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-aqua" />{x}</li>))}
  </ul>
);

export default function ServiceDetail() {
  const { slug = '' } = useParams();
  const s = serviceBySlug(slug);
  if (!s) return <NotFound />;
  const Icon = serviceIcons[s.icon];
  const drawings = (s.drawings ?? []).map(drawingById).filter((d): d is NonNullable<typeof d> => !!d);
  const toc = ['Overview', 'What it solves', 'Application areas', 'Systems and materials', 'Application process', 'Technical considerations', 'Quality control', 'Protection', ...(drawings.length ? ['Technical drawings'] : [])];
  const tocId = (t: string) => t.toLowerCase().replace(/[^a-z]+/g, '-');

  return (
    <>
      <Seo
        title={`${s.title} Dubai | Optima Star Technical Services`}
        description={`${s.short} ${s.keyword.replace(' Dubai', '')} by Optima Star, Dubai.`.slice(0, 158)}
        image={`/${s.image}`}
        breadcrumbs={[{ name: 'Services', path: '/services' }, { name: s.title, path: `/services/${s.slug}` }]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: s.title,
          serviceType: s.title,
          description: s.overview,
          areaServed: { '@type': 'City', name: 'Dubai' },
          provider: { '@id': `${siteConfig.siteUrl}/#organization` },
          url: `${siteConfig.siteUrl}/services/${s.slug}`,
        }}
      />
      <PageHero kicker="Waterproofing service" title={s.title} intro={s.short} crumbs={[{ label: 'Services', to: '/services' }, { label: s.title }]} image={s.imageHiRes ? s.image : undefined}>
        <div className="flex flex-wrap gap-3">
          <Button to={`/quote?service=${encodeURIComponent(s.title)}`} size="lg" arrow>Request a quote</Button>
          <Button href="#overview" size="lg" variant="outline-light">Technical detail</Button>
        </div>
      </PageHero>

      <div className="container-x section-y grid gap-12 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <nav aria-label="On this page" className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <Icon className="h-8 w-8 text-aqua" aria-hidden strokeWidth={1.5} />
            <ol className="mt-6 hidden space-y-2 text-sm lg:block">
              {toc.map((t, i) => (
                <li key={t}><a href={`#${tocId(t)}`} className="flex gap-3 text-steel hover:text-navy"><span className="tabular-nums text-blue/70">{pad2(i + 1)}</span>{t}</a></li>
              ))}
            </ol>
          </nav>
        </aside>
        <article className="lg:col-span-9">
          <Block title="Overview" id={tocId('Overview')}>
            <p className="max-w-3xl text-lg leading-relaxed">{s.overview}</p>
            <div className="mt-8 aspect-[16/8] overflow-hidden rounded-[var(--radius-card)] bg-ink">
              {s.imageHiRes ? <Img src={s.image} small alt={s.title} className="h-full w-full object-cover" /> : (
                <div className="blueprint grid h-full place-items-center"><Img src={s.image} alt={s.title} className="h-[70%] w-auto rounded-md border-4 border-white/90 shadow-2xl" /></div>
              )}
            </div>
          </Block>
          <Block title="What it solves" id={tocId('What it solves')}><List items={s.solves} /></Block>
          <Block title="Application areas" id={tocId('Application areas')}>
            <ul className="flex flex-wrap gap-2">{s.applicationAreas.map((a) => <li key={a} className="rounded-full border border-line bg-paper px-4 py-2 text-[0.95rem]">{a}</li>)}</ul>
          </Block>
          <Block title="Systems and materials" id={tocId('Systems and materials')}>
            <ul className="divide-y divide-line rounded-[var(--radius-card)] border border-line">
              {s.materials.map((m) => (
                <li key={m.name} className="grid gap-1 px-5 py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
                  <span className="font-semibold text-navy">{m.name}</span>
                  {m.note && <span className="text-sm text-steel">{m.note}</span>}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-steel">Named materials come from our certificates, issued drawings or consultant-reviewed submittals. The system for your project follows its specification.</p>
          </Block>
          <Block title="Application process" id={tocId('Application process')}>
            <ol className="space-y-4">
              {s.process.map((p, i) => (
                <li key={p} className="grid grid-cols-[2.5rem_1fr] gap-3">
                  <span className="font-display text-sm tabular-nums text-blue pt-0.5">{pad2(i + 1)}</span>
                  <span className="text-[1.02rem]">{p}</span>
                </li>
              ))}
            </ol>
          </Block>
          <Block title="Technical considerations" id={tocId('Technical considerations')}><List items={s.considerations} /></Block>
          <Block title="Quality control" id={tocId('Quality control')}><List items={s.quality} /></Block>
          <Block title="Protection" id={tocId('Protection')}><p className="max-w-3xl text-[1.02rem]">{s.protection}</p></Block>
          {drawings.length > 0 && (
            <Block title="Technical drawings" id={tocId('Technical drawings')}>
              <DocGallery items={drawings} cols="sm:grid-cols-2" />
            </Block>
          )}
          <section className="border-t border-line pt-10">
            <h2 className="text-[length:var(--text-h3)] font-semibold">Related systems</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {s.related.map(serviceBySlug).filter(Boolean).map((r) => (
                <li key={r!.slug}><Link to={`/services/${r!.slug}`} className="group flex h-full items-center justify-between gap-3 rounded-xl border border-line p-4 font-semibold text-navy transition hover:border-aqua">{r!.title}<span aria-hidden className="transition-transform group-hover:translate-x-1">→</span></Link></li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-steel">Basis for this page: {s.sources.join('; ')}.</p>
          </section>
        </article>
      </div>
      {s.warranty && <WarrantySection compact />}
      <CtaBand title={`Request a quote for ${s.title.toLowerCase()}`} />
    </>
  );
}
