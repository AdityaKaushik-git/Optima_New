import Seo, { organizationLd } from '../components/Seo';
import PageHero from '../components/PageHero';
import ContactBlock from '../components/ContactBlock';
import { Button } from '../components/ui';

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Optima Star | Waterproofing Contractor, Deira, Dubai"
        description="Contact Optima Star Technical Services L.L.C., Office No. 29, 9th Floor, Creek Tower Car Parking Building, Riggat Al Buteen, Deira, Dubai. Tel +971 4 392 3663."
        breadcrumbs={[{ name: 'Contact', path: '/contact' }]}
        jsonLd={organizationLd()}
      />
      <PageHero kicker="Contact" title="Talk to our waterproofing team" intro="Call, email or visit our office in Deira. For a priced proposal, the quote form lets you attach drawings and photos." crumbs={[{ label: 'Contact' }]}>
        <Button to="/quote" size="lg" arrow>Request a quote</Button>
      </PageHero>
      <section className="section-y"><div className="container-x"><ContactBlock /></div></section>
    </>
  );
}
