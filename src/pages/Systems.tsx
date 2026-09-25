import { lazy, Suspense } from 'react';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import MaterialsTable from '../components/MaterialsTable';
import WarrantySection from '../components/WarrantySection';
import CtaBand from '../components/CtaBand';
import { DocGallery } from '../components/Documents';
import { SectionHeading } from '../components/ui';
import { drawings } from '../data/documents';
import { drawingInfo, suppliers } from '../data/systems';
import { pad2 } from '../lib/asset';

const TechnicalDiagram = lazy(() => import('../components/diagram/TechnicalDiagram'));

const chapters = [
  {
    title: 'System overview',
    body: 'A substructure waterproofing system is a sequence, not a product: pile head treatment, a prepared and primed substrate, a two-layer SBS membrane, and protection, all installed before the structural concrete is cast. Each layer depends on the one beneath it.',
  },
  {
    title: 'Structural application',
    body: 'The issued details cover typical pile caps (two variants), typical pile heads and typical strap beams, each wrapped on the base and the sides up to grade slab level.',
  },
  {
    title: 'Surface preparation',
    body: 'Surfaces are cleaned with pressure washers, grinders, vacuum cleaners, scrapers and wire brushes as needed, and a moisture meter confirms the substrate is ready before primer is applied.',
  },
  {
    title: 'Primer',
    body: 'One coat of Rheoprime D41 bitumen primer on the blinding, the block work and the pile head perimeter. Consultants may require more coats on a specific project; the approved submittal governs.',
  },
  {
    title: 'Waterproofing membrane',
    body: 'Two layers of Rheoseal 4S 180-10, a 4 mm thick SBS modified black membrane, torch-applied with lapped joints, dressed up the block work and lapped onto the treated pile heads.',
  },
  {
    title: 'Protection',
    body: 'Rheoboard 6 mm protection board on vertical faces. On the base, protection screed laid over polythene sheet (by the main contractor on the issued details).',
  },
  {
    title: 'Structural interface',
    body: 'At grade slab the membrane upstand is terminated with Rheomastic sealant. Angle fillets at the pile cap to column junction are formed by the main contractor before membrane application.',
  },
  {
    title: 'Quality control',
    body: 'Material inspection request for each delivery, inspection and test plan with the method statement, mock-ups where the consultant requires them, and consultant inspection before any layer is covered.',
  },
];

export default function Systems() {
  return (
    <>
      <Seo
        title="Waterproofing Systems | SBS Membrane Substructure System | Optima Star Dubai"
        description="How Optima Star builds a substructure waterproofing system: pile head epoxy grout, bitumen primer, two-layer 4 mm SBS membrane and protection board, from an issued-for-construction drawing."
        breadcrumbs={[{ name: 'Waterproofing systems', path: '/systems' }]}
      />
      <PageHero
        kicker="Waterproofing systems"
        title="A substructure system, layer by layer"
        intro={`Taken from our issued-for-construction drawing ${drawingInfo.number}: ${drawingInfo.title.toLowerCase()}.`}
        crumbs={[{ label: 'Systems' }]}
        image="images/site/pile-cap-membrane.webp"
      />

      <section className="section-y">
        <div className="container-x">
          <ol className="grid gap-x-12 gap-y-12 md:grid-cols-2">
            {chapters.map((c, i) => (
              <li key={c.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line pt-6">
                <span className="font-display text-sm tabular-nums text-blue">{pad2(i + 1)}</span>
                <div>
                  <h2 className="text-[length:var(--text-h3)] font-semibold">{c.title}</h2>
                  <p className="mt-3 text-[1.02rem] leading-relaxed text-graphite/85">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Suspense fallback={<div className="blueprint h-screen" />}>
        <TechnicalDiagram />
      </Suspense>

      <section className="section-y" aria-labelledby="details-h">
        <div className="container-x">
          <SectionHeading kicker="Technical details" title={<span id="details-h">The drawing and its details</span>} intro={`${drawingInfo.number} rev ${drawingInfo.revision}. ${drawingInfo.issued}. Scale ${drawingInfo.scale}. Consultant: ${drawingInfo.consultant}.`} align="split" className="mb-12" />
          <DocGallery items={drawings} cols="sm:grid-cols-2 lg:grid-cols-3" />
          <div className="mt-16"><MaterialsTable /></div>
        </div>
      </section>

      <section className="section-y border-t border-line bg-paper" aria-labelledby="suppliers-h">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading kicker="Material suppliers" title={<span id="suppliers-h">Manufacturers we work with</span>} intro="From the suppliers page of our company profile. Applicator certificates are on the certifications page." />
          </div>
          <ul className="flex flex-wrap content-start gap-2 lg:col-span-8">
            {suppliers.map((s) => <li key={s} className="rounded-full border border-line bg-white px-4 py-2 font-display text-[0.95rem] font-medium text-navy">{s}</li>)}
          </ul>
        </div>
      </section>

      <WarrantySection />
      <CtaBand />
    </>
  );
}
