/**
 * Company facts. Sources: Optima Star pre-qualification document 2026–2027 and
 * Dubai DET commercial licence 1480963. Edit here, never inside components.
 */
export const company = {
  name: 'Optima Star Technical Services',
  legalName: 'OPTIMA STAR TECHNICAL SERVICES L.L.C.',
  arabicName: 'اوبتيما ستار للخدمات الفنية ش.ذ.م.م',
  shortDescription:
    'Waterproofing contractor in Dubai: SBS membrane, substructure and pile head waterproofing, wet areas, roofs, GRP lining and injection treatment.',
  website: 'https://www.optimastaruae.com',
  email: 'info@optimastaruae.com',
  phones: [
    { label: 'Office', display: '+971 4 392 3663', tel: '+97143923663' },
    { label: 'Mobile', display: '+971 56 818 0793', tel: '+971568180793' },
    { label: 'Mobile', display: '+971 55 182 8836', tel: '+971551828836' },
  ],
  address: {
    lines: ['Office No. 29, 9th Floor', 'Creek Tower Car Parking Building', 'Riggat Al Buteen, Deira', 'Dubai, U.A.E.'],
    street: 'Office No. 29, 9th Floor, Creek Tower Car Parking Building, Riggat Al Buteen',
    locality: 'Deira, Dubai',
    country: 'AE',
  },
  mapQuery: 'Creek Tower Car Parking Building, Riggat Al Buteen, Deira, Dubai',
  registration: {
    licenceNo: '1480963',
    licenceAuthority: 'Dubai Department of Economy and Tourism',
    legalForm: 'Limited Liability Company (LLC)',
    chamberNo: '604011',
    registerNo: '2553288',
    vatTrn: '104925931800003',
  },
  /** Business hours are not in the supplied documents. Set a string to show them. */
  hours: null as string | null,
  /** Add real profile URLs to show social links in the footer. */
  social: [] as { label: string; href: string }[],
};

export const primaryPhone = company.phones[0];
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(company.mapQuery)}`;
