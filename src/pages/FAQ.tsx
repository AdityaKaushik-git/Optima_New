import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import FAQList from '../components/FAQList';
import CtaBand from '../components/CtaBand';
import { faqs } from '../data/content';

export default function FAQ() {
  return (
    <>
      <Seo
        title="Waterproofing FAQ | SBS Membrane, Pile Head, Warranty | Optima Star Dubai"
        description="Answers about SBS membrane waterproofing, pile head treatment, bitumen primer, protection layers, warranty and quotations from Optima Star, Dubai."
        breadcrumbs={[{ name: 'FAQ', path: '/faq' }]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />
      <PageHero kicker="FAQ" title="Waterproofing questions, answered plainly" crumbs={[{ label: 'FAQ' }]} />
      <section className="section-y">
        <div className="container-x max-w-4xl"><FAQList /></div>
      </section>
      <CtaBand title="Question not answered here?" text="Call or send the details of your project and our team will respond." />
    </>
  );
}
