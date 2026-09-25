import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import { company } from '../data/company';

/**
 * ⚠ Starter text only. Have both pages reviewed against UAE PDPL and the company's
 * actual data handling before launch.
 */
export default function Legal({ kind }: { kind: 'privacy' | 'terms' }) {
  const privacy = kind === 'privacy';
  return (
    <>
      <Seo title={`${privacy ? 'Privacy policy' : 'Terms of use'} | Optima Star`} description={`${privacy ? 'Privacy policy' : 'Terms of use'} for the Optima Star Technical Services website.`} noindex />
      <PageHero kicker="Legal" title={privacy ? 'Privacy policy' : 'Terms of use'} crumbs={[{ label: privacy ? 'Privacy policy' : 'Terms' }]} />
      <section className="section-y">
        <div className="container-x max-w-3xl space-y-5 text-[1.02rem] leading-relaxed">
          {privacy ? (
            <>
              <p>{company.legalName} uses the details you send through this website (name, company, phone, email, project information and any files you upload) only to respond to your enquiry and prepare a quotation.</p>
              <p>We do not sell your information. Files and messages are shared only with staff who need them to prepare the quotation.</p>
              <p>To ask what we hold about you, or to have it deleted, email <a className="font-semibold text-navy underline" href={`mailto:${company.email}`}>{company.email}</a>.</p>
              <p>The map on the contact page is provided by Google and is subject to Google’s privacy policy.</p>
            </>
          ) : (
            <>
              <p>Information on this website describes the services of {company.legalName} in general terms. It is not a specification or an offer. Scope, system, price and warranty for any project are set only in a written quotation and contract.</p>
              <p>Certificates, drawings and project documents are shown for information. They remain the property of their issuers and may not be reused without permission.</p>
              <p>Warranty durations mentioned on this site depend on the structure, approved system, project conditions, specification and the written warranty issued for the specific project.</p>
            </>
          )}
          <p className="text-sm text-steel">Last updated: to be confirmed before publication.</p>
        </div>
      </section>
    </>
  );
}
