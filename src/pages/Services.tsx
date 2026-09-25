import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import ServiceExplorer from '../components/ServiceExplorer';
import ApproachSection from '../components/ApproachSection';
import CtaBand from '../components/CtaBand';
import { SectionHeading } from '../components/ui';
import { services } from '../data/services';
import { siteConfig } from '../config/site';

export default function Services() {
  return (
    <>
      <Seo
        title="Waterproofing Services Dubai | SBS Membrane, Pile Head, Roof, Wet Area | Optima Star"
        description="Waterproofing services in Dubai: SBS membrane, pile head and pile cap waterproofing, substructure and basement, roof and combo roof, wet areas, water tanks, GRP lining and injection treatment."
        breadcrumbs={[{ name: 'Services', path: '/services' }]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.title, url: `${siteConfig.siteUrl}/services/${s.slug}` })),
        }}
      />
      <PageHero
        kicker="Waterproofing services"
        title="Waterproofing, and only waterproofing"
        intro="Twelve services, from pile head treatment to roof systems. Each is applied to approved drawings, with materials from manufacturers who have certified us as an applicator."
        crumbs={[{ label: 'Services' }]}
        image="images/site/membrane-roll.webp"
      />
      <section className="section-y">
        <div className="container-x"><ServiceExplorer /></div>
      </section>
      <section className="section-y border-t border-line bg-paper">
        <div className="container-x">
          <SectionHeading kicker="Typical waterproofing project approach" title="How a waterproofing scope runs on site" intro="The sequence reflects the pre-qualification, submittal and inspection workflow on our consultant-reviewed projects. Each project follows its own specification." align="split" className="mb-14" />
          <ApproachSection />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
