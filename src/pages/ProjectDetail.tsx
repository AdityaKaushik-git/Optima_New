import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { DocGallery } from '../components/Documents';
import { Img, StatusBadge } from '../components/ui';
import { projectBySlug, projects, type Project } from '../data/projects';
import { drawingById } from '../data/documents';
import { services } from '../data/services';
import { stages } from '../data/systems';
import { showIndividualClientNames, showProjectDocuments } from '../config/site';
import { pad2 } from '../lib/asset';
import NotFound from './NotFound';

const relatedFor = (p: Project) => {
  const map: Record<string, string[]> = {
    Substructure: ['substructure-foundation-basement-waterproofing', 'pile-head-treatment', 'sbs-membrane-waterproofing'],
    Superstructure: ['membrane-waterproofing', 'roof-waterproofing-combo-roof', 'wet-area-waterproofing'],
    'Wet area': ['wet-area-waterproofing', 'cementitious-fibrated-waterproofing'],
    Roof: ['roof-waterproofing-combo-roof', 'thermal-insulation-pu-foam'],
    Other: [],
  };
  return (map[p.category] ?? []).map((s) => services.find((x) => x.slug === s)!).filter(Boolean);
};

export default function ProjectDetail() {
  const { slug = '' } = useParams();
  const p = projectBySlug(slug);
  if (!p) return <NotFound />;
  const idx = projects.indexOf(p);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const client = p.client && (!p.clientIsIndividual || showIndividualClientNames) ? p.client : p.client ? 'Private client' : null;
  const drawings = (p.drawings ?? []).map(drawingById).filter((d): d is NonNullable<typeof d> => !!d);
  const docs = showProjectDocuments ? p.documents ?? [] : [];
  const related = relatedFor(p);
  const hasDrawnSystem = drawings.length > 0;

  const facts: [string, string | null][] = [
    ['Location', p.location],
    ['Plot', p.plot],
    ['Project type', p.projectType],
    ['Waterproofing scope', p.scope],
    ['System', p.system],
    ['Year', p.year],
    ['Main contractor', p.contractor],
    ['Consultant', p.consultant],
    ['Developer', p.developer ?? null],
    ['Client', client],
  ];

  return (
    <>
      <Seo
        title={`${p.title}${p.location ? `, ${p.location}` : ''} | ${p.category} Waterproofing | Optima Star`}
        description={`${p.scope} for ${p.building}${p.location ? ` in ${p.location}` : ''}. Main contractor ${p.contractor ?? 'on request'}, consultant ${p.consultant ?? 'on request'}.`.slice(0, 160)}
        breadcrumbs={[{ name: 'Projects', path: '/projects' }, { name: p.title, path: `/projects/${p.slug}` }]}
      />
      <PageHero
        kicker={p.recordType === 'document' ? 'Project document' : `Project ${pad2(p.no)}`}
        title={p.title}
        crumbs={[{ label: 'Projects', to: '/projects' }, { label: p.title }]}
      >
        <dl className="grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Location', p.location ?? 'On request'],
            ['Year', p.year ?? 'On request'],
            ['Project type', p.projectType],
            ['Scope', p.category],
          ].map(([k, v]) => (
            <div key={k} className="border-l border-white/15 pl-4">
              <dt className="anno text-white/50">{k}</dt>
              <dd className="mt-1.5 text-white">{v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <div className="container-x section-y grid gap-14 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="rounded-[var(--radius-card)] border border-line bg-paper p-6 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <div className="flex items-center justify-between">
              <h2 className="anno text-steel">Project status</h2>
              <StatusBadge status={p.status} recordType={p.recordType} />
            </div>
            <dl className="mt-6 space-y-4 text-[0.95rem]">
              {facts.filter(([, v]) => v).map(([k, v]) => (
                <div key={k}><dt className="text-sm text-steel">{k}</dt><dd className="mt-0.5 font-medium text-navy">{v}</dd></div>
              ))}
            </dl>
          </div>
        </aside>

        <article className="space-y-14 lg:col-span-8">
          <section aria-labelledby="ov">
            <h2 id="ov" className="text-[length:var(--text-h3)] font-semibold">Project overview</h2>
            <p className="mt-4 text-lg leading-relaxed">
              {p.status ? `Optima Star ${p.status === 'Completed' ? 'carried out' : 'is carrying out'}` : 'Optima Star’s submittals cover'} {p.scope.charAt(0).toLowerCase() + p.scope.slice(1)} on the {p.building.charAt(0).toLowerCase() + p.building.slice(1)}
              {p.location ? `, ${p.location}` : ''}
              {p.contractor ? `, as waterproofing sub-contractor to ${p.contractor}` : ''}
              {p.consultant ? ` under the review of ${p.consultant}` : ''}.
            </p>
            {p.notes?.map((n) => <p key={n} className="mt-3 text-[1.02rem] text-steel">{n}</p>)}
          </section>

          {p.system && (
            <section aria-labelledby="sys">
              <h2 id="sys" className="text-[length:var(--text-h3)] font-semibold">Waterproofing system and materials</h2>
              <p className="mt-4 text-[1.05rem]">{p.system}</p>
              {hasDrawnSystem && (
                <ol className="mt-8 grid gap-3 sm:grid-cols-2">
                  {stages.map((s, i) => (
                    <li key={s.key} className="flex gap-4 rounded-xl border border-line p-4">
                      <span aria-hidden className="mt-1 h-4 w-4 shrink-0 rounded-sm ring-1 ring-black/10" style={{ background: s.swatch }} />
                      <div>
                        <p className="font-display font-semibold text-navy"><span className="mr-2 text-sm tabular-nums text-blue">{pad2(i + 1)}</span>{s.label}</p>
                        <p className="mt-1 text-sm text-steel">{s.note}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          )}

          {drawings.length > 0 && (
            <section aria-labelledby="dw">
              <h2 id="dw" className="text-[length:var(--text-h3)] font-semibold">Technical drawings</h2>
              <div className="mt-6"><DocGallery items={drawings} cols="sm:grid-cols-2" /></div>
            </section>
          )}

          {p.photos && p.photos.length > 0 && (
            <section aria-labelledby="ph">
              <h2 id="ph" className="text-[length:var(--text-h3)] font-semibold">Site photos</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {p.photos.map((src) => <li key={src} className="aspect-[4/3] overflow-hidden rounded-xl"><Img src={src} alt={`${p.title} site photo`} className="h-full w-full object-cover" /></li>)}
              </ul>
            </section>
          )}

          {docs.length > 0 && (
            <section aria-labelledby="qc">
              <h2 id="qc" className="text-[length:var(--text-h3)] font-semibold">Quality control and approvals</h2>
              <p className="mt-3 text-[1.02rem] text-steel">Pre-qualification, submittal and inspection records for this project, with the consultant’s review status.</p>
              <div className="mt-6">
                <DocGallery
                  items={docs}
                  cols="sm:grid-cols-2"
                  meta={(d) => (
                    <p className="mt-1 text-xs text-steel">
                      {[d.date, d.outcome].filter(Boolean).join('. ')}
                    </p>
                  )}
                />
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section aria-labelledby="rs">
              <h2 id="rs" className="text-[length:var(--text-h3)] font-semibold">Related services</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug}><Link to={`/services/${r.slug}`} className="group flex h-full items-center justify-between gap-3 rounded-xl border border-line p-4 font-semibold text-navy transition hover:border-aqua">{r.title}<span aria-hidden className="transition-transform group-hover:translate-x-1">→</span></Link></li>
                ))}
              </ul>
            </section>
          )}

          <nav aria-label="More projects" className="flex items-stretch justify-between gap-4 border-t border-line pt-8">
            <Link to={`/projects/${prev.slug}`} className="group flex min-h-11 items-center gap-3 text-sm font-semibold text-navy">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden />
              <span><span className="block text-xs font-normal text-steel">Previous</span>{prev.title}</span>
            </Link>
            <Link to={`/projects/${next.slug}`} className="group flex min-h-11 items-center gap-3 text-right text-sm font-semibold text-navy">
              <span><span className="block text-xs font-normal text-steel">Next</span>{next.title}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </nav>
        </article>
      </div>
      <CtaBand title="Have a similar scope? Send us the drawings." />
    </>
  );
}
