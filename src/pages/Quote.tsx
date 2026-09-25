import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import QuoteForm from '../components/QuoteForm';
import { company, primaryPhone } from '../data/company';
import { warranty } from '../config/site';

export default function Quote() {
  return (
    <>
      <Seo title="Request a Waterproofing Quote | Optima Star Dubai" description="Request a quotation for SBS membrane, substructure, pile head, roof or wet area waterproofing in Dubai and the UAE. Upload drawings, specifications and site photos." breadcrumbs={[{ name: 'Request a quote', path: '/quote' }]} />
      <PageHero kicker="Request a quote" title="Tell us about the structure" intro="Eight short steps. Drawings, specifications and site photos help us quote accurately." crumbs={[{ label: 'Request a quote' }]} />
      <section className="section-y paper-grid">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8"><QuoteForm /></div>
          <aside className="space-y-8 lg:col-span-4">
            <div>
              <h2 className="text-xl font-semibold">What helps us quote</h2>
              <ul className="mt-4 space-y-2 text-[0.97rem] text-graphite/85">
                {['Structural and waterproofing drawings', 'Specification or BOQ, including any specified manufacturer', 'Approximate quantities', 'Programme or required start date', 'Site photos for existing structures'].map((x) => (
                  <li key={x} className="flex gap-3"><span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-aqua" />{x}</li>
                ))}
              </ul>
            </div>
            {warranty.enabled && (
              <div className="rounded-xl bg-navy p-6 text-white">
                <p className="font-display text-3xl font-semibold">{warranty.range} years*</p>
                <p className="mt-2 text-sm text-white/75">{warranty.title}. {warranty.statement}</p>
                <p className="mt-3 text-xs text-white/50">{warranty.footnote}</p>
              </div>
            )}
            <div className="text-[0.97rem]">
              <p className="text-steel">Prefer to talk?</p>
              <a href={`tel:${primaryPhone.tel}`} className="mt-1 block font-display text-2xl font-semibold text-navy">{primaryPhone.display}</a>
              <a href={`mailto:${company.email}`} className="link-u mt-1 inline-block text-navy">{company.email}</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
