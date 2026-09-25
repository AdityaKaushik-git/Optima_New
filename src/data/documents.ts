/**
 * Every viewable document on the site. Images live in /public/documents (full size)
 * and /public/documents/thumbs. To add a certificate: export the page as an image,
 * save both sizes as .webp, then add an entry to `certificates`.
 *
 * Dates are copied exactly as printed on each document. Check them before launch:
 * several are printed with 2027 issue dates.
 */

export interface DocImage {
  id: string;
  title: string;
  file: string; // file name without extension in /public/documents
  orientation: 'portrait' | 'landscape';
  caption?: string;
}

export interface Certificate extends DocImage {
  issuer: string;
  type: string;
  scope: string;
  reference?: string;
  issued?: string;
  validity: string;
  group: 'applicator' | 'registration';
}

export const certificates: Certificate[] = [
  {
    id: 'soprema',
    issuer: 'SOPREMA (Middle East)',
    type: 'Certificate of approved applicator',
    title: 'SOPREMA approved applicator certificate',
    scope: 'Approved installer of SOPREMA conventional (torch-applied) waterproofing systems in the UAE, issued after SOPREMA Middle East training programmes.',
    reference: 'SOP-CAQ-2025-101',
    issued: '1 January 2027 (as printed)',
    validity: 'One year from the issuance date',
    file: 'cert-soprema',
    orientation: 'landscape',
    group: 'applicator',
  },
  {
    id: 'petrozo',
    issuer: 'Petrozo Energy FZE',
    type: 'Applicator certificate',
    title: 'Petrozo Energy applicator certificate',
    scope: 'Recommended as an approved applicator for executing waterproofing works using Petrozo Energy products.',
    reference: 'PZE/65/2026/RS/26/OST/AR',
    issued: '11 April 2026',
    validity: 'One year from the date of issue',
    file: 'cert-petrozo',
    orientation: 'portrait',
    group: 'applicator',
  },
  {
    id: 'mapei',
    issuer: 'MAPEI Construction Chemicals LLC',
    type: 'Approved applicator certificate',
    title: 'MAPEI approved applicator certificate',
    scope: 'Mapelastic Smart and Mapetex Sel N.',
    reference: 'TSD/AAC/OSTS/1225-106 (05-12-2025)',
    issued: '5 December 2025',
    validity: 'Valid to 4 June 2027',
    file: 'cert-mapei',
    orientation: 'portrait',
    group: 'applicator',
  },
  {
    id: 'geobit',
    issuer: 'Geobit',
    type: 'Approved applicator certificate',
    title: 'Geobit approved applicator certificate',
    scope: 'Registered approved and experienced applicator for the Betoflex range, including Betoflex 4S & 5S, 4P & 5P, Betoprime, Betoboards, Betocoat, Betoseal PU, Betofoam, Betocrete MC and Betogrout EP 102.',
    issued: '8 April 2027 (as printed)',
    validity: 'One year from the date of issuance',
    file: 'cert-geobit',
    orientation: 'portrait',
    group: 'applicator',
  },
  {
    id: 'royal',
    issuer: 'Royal Industries LLC',
    type: 'Approved applicator certificate',
    title: 'Royal Industries approved applicator certificate',
    scope: 'Neo Combo Roofing System and membrane waterproofing.',
    issued: '11 April 2026',
    validity: '11 April 2026 to 11 April 2027',
    file: 'cert-royal-industries',
    orientation: 'landscape',
    group: 'applicator',
  },
  {
    id: 'innochem',
    issuer: 'Innochem International LLC (Innobuild Solutions)',
    type: 'Approved applicator certificate',
    title: 'Innochem International certificate',
    scope: 'Approved applicator for combo roof systems and wet area applications.',
    reference: 'INN-ROOF-1',
    issued: '2 October 2026 (as printed)',
    validity: 'Not stated on certificate',
    file: 'cert-innochem',
    orientation: 'landscape',
    group: 'applicator',
  },
  {
    id: 'corrotech',
    issuer: 'Corrotech Construction Chemicals LLC',
    type: 'Certified applicator certificate',
    title: 'Corrotech certified applicator certificate',
    scope: 'Certified applicator for all Corrotech waterproofing materials.',
    reference: 'CCC-APP-2026-01-006',
    issued: 'January 2026',
    validity: 'January 2026 to January 2027',
    file: 'cert-corrotech',
    orientation: 'portrait',
    group: 'applicator',
  },
  {
    id: 'licence',
    issuer: 'Dubai Department of Economy and Tourism',
    type: 'Commercial licence',
    title: 'Commercial licence 1480963',
    scope: 'Limited Liability Company. Activities include insulation contracting and swimming pools installation works.',
    reference: 'Licence no. 1480963',
    issued: '23 March 2025',
    validity: 'Expires 22 March 2027',
    file: 'reg-commercial-licence',
    orientation: 'portrait',
    group: 'registration',
  },
  {
    id: 'chamber',
    issuer: 'Dubai Chamber of Commerce & Industry',
    type: 'Membership certificate',
    title: 'Dubai Chamber membership certificate',
    scope: 'Membership no. 604011, registration no. 2553288.',
    reference: 'Membership no. 604011',
    issued: '23 March 2025',
    validity: 'Expires 22 March 2027',
    file: 'reg-dubai-chamber',
    orientation: 'portrait',
    group: 'registration',
  },
  {
    id: 'vat',
    issuer: 'Federal Tax Authority, UAE',
    type: 'VAT registration certificate',
    title: 'VAT registration certificate',
    scope: 'Registered for Value Added Tax in the UAE.',
    reference: 'TRN 104925931800003',
    issued: '10 April 2025',
    validity: 'Effective registration date 1 May 2025',
    file: 'reg-vat',
    orientation: 'portrait',
    group: 'registration',
  },
];

export const applicatorCertificates = certificates.filter((c) => c.group === 'applicator');
export const registrationDocs = certificates.filter((c) => c.group === 'registration');

export const drawings: DocImage[] = [
  {
    id: 'drawing-substructure',
    title: 'Substructure waterproofing details, sheet 1-4',
    caption: 'OPT-JAZ-WP-SD-STR-002 rev 00. Issued for construction 17.04.2026.',
    file: 'drawing-opt-jaz-wp-sd-str-002',
    orientation: 'landscape',
  },
  { id: 'detail-pile-cap-1', title: 'Detail 1: typical pile cap waterproofing', caption: 'Extract from OPT-JAZ-WP-SD-STR-002.', file: 'detail-pile-cap-1', orientation: 'landscape' },
  { id: 'detail-pile-cap-2', title: 'Detail 2: typical pile cap waterproofing', caption: 'Extract from OPT-JAZ-WP-SD-STR-002.', file: 'detail-pile-cap-2', orientation: 'landscape' },
  { id: 'detail-pile-head', title: 'Detail 3: typical pile head waterproofing', caption: 'Extract from OPT-JAZ-WP-SD-STR-002.', file: 'detail-pile-head', orientation: 'landscape' },
  { id: 'detail-strap-beam', title: 'Detail 4: typical strap beam waterproofing', caption: 'Extract from OPT-JAZ-WP-SD-STR-002.', file: 'detail-strap-beam', orientation: 'landscape' },
];

export const drawingById = (id: string) => drawings.find((d) => d.id === id);

export const docSrc = (file: string) => `documents/${file}.webp`;
export const docThumb = (file: string) => `documents/thumbs/${file}.webp`;
