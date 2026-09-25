import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { CertificateGrid } from '../components/Documents';
import { SectionHeading } from '../components/ui';
import { applicatorCertificates, registrationDocs } from '../data/documents';

export default function Certifications() {
  return (
    <>
      <Seo
        title="Certifications & Approvals | Approved Waterproofing Applicator Dubai | Optima Star"
        description="Approved applicator certificates from SOPREMA, Petrozo Energy, MAPEI, Geobit, Royal Industries, Innochem and Corrotech, plus Dubai commercial licence, Chamber and VAT registration."
        breadcrumbs={[{ name: 'Certifications', path: '/certifications' }]}
      />
      <PageHero
        kicker="Certifications and approvals"
        title="The original certificates, open to read"
        intro="Each card opens the actual document. Zoom in to check the scope, reference and validity for yourself."
        crumbs={[{ label: 'Certifications' }]}
      />
      <section className="section-y">
        <div className="container-x">
          <SectionHeading kicker="Approved applicator" title="Manufacturer certificates" intro="Issued by waterproofing manufacturers for the systems we apply. Validity is shown exactly as printed on each certificate." align="split" className="mb-12" />
          <CertificateGrid items={applicatorCertificates} />
        </div>
      </section>
      <section className="section-y border-t border-line bg-paper">
        <div className="container-x">
          <SectionHeading kicker="Company registration" title="Licence and registrations" align="split" intro="Dubai Department of Economy and Tourism, Dubai Chamber of Commerce & Industry, and the UAE Federal Tax Authority." className="mb-12" />
          <CertificateGrid items={registrationDocs} />
        </div>
      </section>
      <CtaBand title="Need our pre-qualification documents for a tender?" text="We can send the full pre-qualification pack, including certificates, licence, equipment list and project list, for your consultant’s review." />
    </>
  );
}
