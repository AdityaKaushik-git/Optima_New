import { lazy, Suspense } from 'react';
import Seo, { organizationLd } from '../components/Seo';
import Hero from '../components/Hero';
import ServiceExplorer from '../components/ServiceExplorer';
import TrustGrid from '../components/TrustGrid';
import WarrantySection from '../components/WarrantySection';
import MaterialsTable from '../components/MaterialsTable';
import ProjectTable from '../components/ProjectTable';
import TeamSection from '../components/TeamSection';
import QHSESection from '../components/QHSESection';
import FAQList from '../components/FAQList';
import ContactBlock from '../components/ContactBlock';
import { CertificateGrid, DocGallery } from '../components/Documents';
import { Button, SectionHeading } from '../components/ui';
import { applicatorCertificates, drawings } from '../data/documents';
import { consultants } from '../data/content';
import { projects } from '../data/projects';

const TechnicalDiagram = lazy(() => import('../components/diagram/TechnicalDiagram'));

export default function Home() {
  const completed = projects.filter((p) => p.status === 'Completed').length;
  const ongoing = projects.filter((p) => p.status === 'Ongoing').length;
  return (
    <>
      <Seo
        title="Optima Star Technical Services L.L.C. | Waterproofing Company Dubai"
        description="Waterproofing contractor in Dubai. SBS membrane, pile head, pile cap and substructure waterproofing, roofs, wet areas, GRP lining and injection treatment. Approved applicator."
        jsonLd={organizationLd()}
      />
      <Hero />

      <section className="section-y" aria-labelledby="services-h">
        <div className="container-x">
          <SectionHeading
            kicker="Waterproofing services"
            title={<span id="services-h">Specialist systems for every part of the structure</span>}
            intro="Below ground, on the roof and in wet areas. Each service is delivered to the approved drawing and the manufacturer’s data sheet."
            align="split"
            className="mb-14"
          />
          <ServiceExplorer />
        </div>
      </section>

      <section className="paper-grid section-y border-y border-line" aria-labelledby="why-h">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading kicker="Why system design matters" title={<span id="why-h">Waterproofing is judged by details no one sees again</span>} />
              <div className="lede mt-6 space-y-4">
                <p>Once concrete is cast or tiles are laid, the membrane is out of reach. Most leaks start at a lap, an upturn, a pile head or a pipe penetration, not in the middle of a sheet.</p>
                <p>That is why the system is chosen from the specification, detailed on shop drawings, inspected before it is covered and protected before the next trade arrives.</p>
              </div>
            </div>
            <div className="lg:col-span-7 lg:pt-4">
              <TrustGrid cols="sm:grid-cols-2" />
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="blueprint h-screen" />}>
        <TechnicalDiagram />
      </Suspense>

      <WarrantySection />

      <section className="section-y" aria-labelledby="materials-h">
        <div className="container-x">
          <SectionHeading
            kicker="Materials and systems"
            title={<span id="materials-h">What goes into the substructure detail</span>}
            intro="Every material below is named on our issued-for-construction substructure drawing. Open the drawing to read the details yourself."
            align="split"
            className="mb-12"
          />
          <MaterialsTable />
          <div className="mt-12">
            <DocGallery items={drawings.slice(1)} cols="sm:grid-cols-2 lg:grid-cols-4" />
          </div>
          <div className="mt-8"><Button to="/systems" variant="secondary" arrow>Waterproofing systems in detail</Button></div>
        </div>
      </section>

      <section className="section-y border-t border-line bg-paper" aria-labelledby="projects-h">
        <div className="container-x">
          <SectionHeading
            kicker="Recent projects"
            title={<span id="projects-h">Project register</span>}
            intro={`${projects.filter((p) => p.recordType === 'register').length} projects on record: ${completed} completed and ${ongoing} ongoing, for main contractors under consultants including ${consultants.slice(0, 3).join(', ')}.`}
            align="split"
            className="mb-12"
          />
          <ProjectTable limit={6} showFilters={false} />
          <div className="mt-10"><Button to="/projects" variant="secondary" arrow>View the full register</Button></div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="certs-h">
        <div className="container-x">
          <SectionHeading
            kicker="Certifications and approvals"
            title={<span id="certs-h">Approved by the manufacturers whose systems we install</span>}
            intro="The original certificates, not badges. Open any certificate to read it in full."
            align="split"
            className="mb-12"
          />
          <CertificateGrid items={applicatorCertificates} compact />
          <div className="mt-10"><Button to="/certifications" variant="secondary" arrow>All certificates and registrations</Button></div>
        </div>
      </section>

      <section className="section-y border-t border-line bg-paper" aria-labelledby="team-h">
        <div className="container-x">
          <SectionHeading kicker="Meet our team" title={<span id="team-h">The people behind the systems</span>} className="mb-14" />
          <TeamSection />
        </div>
      </section>

      <section className="section-y" aria-labelledby="qhse-h">
        <div className="container-x">
          <SectionHeading
            kicker="QHSE"
            title={<span id="qhse-h">Quality, health, safety and environment</span>}
            intro="From our QHSE and Health & Safety policies, signed by the Managing Director."
            align="split"
            className="mb-12"
          />
          <QHSESection />
        </div>
      </section>

      <section className="section-y border-t border-line bg-paper" aria-labelledby="faq-h">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading kicker="FAQ" title={<span id="faq-h">Questions consultants and owners ask</span>} />
            <div className="mt-8"><Button to="/faq" variant="ghost" arrow>All questions</Button></div>
          </div>
          <div className="lg:col-span-8"><FAQList limit={6} /></div>
        </div>
      </section>

      <section className="blueprint on-dark section-y" aria-labelledby="quote-h">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionHeading dark kicker="Request a quote" title={<span id="quote-h">Send the drawings. We will propose the system and price it.</span>} intro="Tell us the scope, the stage and the location. Attach drawings, specifications or site photos." />
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Button to="/quote" size="lg" arrow>Start your request</Button>
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="contact-h">
        <div className="container-x">
          <SectionHeading kicker="Contact" title={<span id="contact-h">Visit or call our Deira office</span>} className="mb-12" />
          <ContactBlock />
        </div>
      </section>
    </>
  );
}
