import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import TeamSection from '../components/TeamSection';
import QHSESection from '../components/QHSESection';
import TrustGrid from '../components/TrustGrid';
import ApproachSection from '../components/ApproachSection';
import CtaBand from '../components/CtaBand';
import { Button, Img, SectionHeading } from '../components/ui';
import { about, consultants, orgChart } from '../data/content';
import { applicatorCertificates } from '../data/documents';
import { company } from '../data/company';

export default function About() {
  return (
    <>
      <Seo
        title="About Optima Star | Waterproofing Contractor Dubai"
        description="Optima Star Technical Services L.L.C. is a Dubai waterproofing contractor delivering substructure, roof and wet area waterproofing as approved applicator, with site supervision and a QHSE policy."
        breadcrumbs={[{ name: 'About', path: '/about' }]}
      />
      <PageHero kicker="About Optima Star" title="Waterproofing contractor, working under consultant review" intro={about.whoWeAre[0]} crumbs={[{ label: 'About' }]} image="images/site/roof-coating-crew.webp" />

      <section className="section-y" aria-labelledby="who">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading kicker="Who we are" title={<span id="who">A specialist sub-contractor</span>} />
          </div>
          <div className="space-y-5 text-lg leading-relaxed lg:col-span-7">
            {about.whoWeAre.map((p) => <p key={p}>{p}</p>)}
            <p className="text-base text-steel">Registered in Dubai as {company.registration.legalForm}, licence no. {company.registration.licenceNo}, Dubai Chamber member no. {company.registration.chamberNo}.</p>
          </div>
        </div>
      </section>

      <section className="paper-grid section-y border-y border-line" aria-labelledby="spec">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="order-2 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] lg:order-1 lg:col-span-6">
            <Img src="images/site/combo-roof-buildup.webp" small alt="Illustration of a layered roof waterproofing build-up" className="h-full w-full object-cover" />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-6">
            <SectionHeading kicker="What we specialise in" title={<span id="spec">Our technical approach</span>} />
            <div className="lede mt-6 space-y-4">{about.technicalApproach.map((p) => <p key={p}>{p}</p>)}</div>
            <div className="mt-8"><Button to="/services" variant="secondary" arrow>Our waterproofing services</Button></div>
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="trust">
        <div className="container-x">
          <SectionHeading kicker="Why a specialist" title={<span id="trust">Why trust a specialist waterproofing contractor?</span>} className="mb-14" />
          <TrustGrid />
        </div>
      </section>

      <section className="blueprint on-dark section-y" aria-labelledby="sup">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading dark kicker="Project supervision" title={<span id="sup">Supervision on every site</span>} intro={about.supervision} />
          </div>
          <div className="lg:col-span-7">
            <h3 className="anno mb-5 text-aqua">Organisation</h3>
            <ol className="space-y-3">
              {orgChart.map((l) => (
                <li key={l.level} className="grid gap-3 border-t border-white/10 pt-3 sm:grid-cols-[9rem_1fr]">
                  <span className="text-sm text-white/50">{l.level}</span>
                  <ul className="flex flex-wrap gap-2">
                    {l.roles.map((r) => <li key={r} className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-white/85">{r}</li>)}
                  </ul>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-white/55">{about.people}</p>
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="team">
        <div className="container-x">
          <SectionHeading kicker="Our people" title={<span id="team">The people behind the work</span>} className="mb-14" />
          <TeamSection />
        </div>
      </section>

      <section className="section-y border-t border-line bg-paper" aria-labelledby="app">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading kicker="Approved applicator experience" title={<span id="app">Certified by {applicatorCertificates.length} manufacturers</span>} intro={`Pre-qualifications and material submittals have been reviewed by ${consultants.join(', ')}.`} />
            <div className="mt-8"><Button to="/certifications" variant="secondary" arrow>View certificates</Button></div>
          </div>
          <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-7">
            {applicatorCertificates.map((c) => (
              <li key={c.id} className="rounded-xl border border-line bg-white p-4">
                <p className="font-semibold text-navy">{c.issuer}</p>
                <p className="mt-1 text-sm text-steel">{c.scope.length > 90 ? `${c.scope.slice(0, 88)}…` : c.scope}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y" aria-labelledby="q">
        <div className="container-x">
          <SectionHeading kicker="Quality and QHSE" title={<span id="q">Quality, health, safety and environment</span>} align="split" intro="Summarised from our QHSE policy (31-08-2025) and Health & Safety policy." className="mb-12" />
          <QHSESection />
        </div>
      </section>

      <section className="section-y border-t border-line bg-paper" aria-labelledby="ap">
        <div className="container-x">
          <SectionHeading kicker="Typical waterproofing project approach" title={<span id="ap">How we work with main contractors and consultants</span>} className="mb-14" />
          <ApproachSection />
        </div>
      </section>

      <section className="section-y" aria-labelledby="c">
        <div className="container-x max-w-4xl">
          <p className="anno text-blue">Our commitment</p>
          <p id="c" className="mt-5 font-display text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] font-medium leading-snug text-navy">“{about.commitment}”</p>
          <p className="mt-4 text-steel">Chairman’s message, company profile</p>
        </div>
      </section>

      <CtaBand title="Request a consultation on your waterproofing scope" />
    </>
  );
}
