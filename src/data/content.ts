/**
 * Editorial content for About, QHSE, Approach, Trust and FAQ.
 * Every statement here is drawn from the supplied company profile, policies,
 * certificates, drawing or consultant submittals.
 */

/* ------------------------------------------------------------------ Team
 * Names and licence roles come from Dubai DET commercial licence 1480963
 * (partners annex). Experience and bios were NOT supplied: replace the
 * bracketed placeholders before launch.
 * Photos: put a portrait in /public/images/team/ and set `photo`, e.g.
 *   photo: 'images/team/rameez.webp'
 * Until then a neutral placeholder portrait is shown.
 */
export interface TeamMember {
  name: string;
  position: string;
  experience: string;
  expertise: string[];
  bio: string;
  responsibilities: string[];
  photo: string | null;
  placeholder: boolean;
}

export const team: TeamMember[] = [
  {
    name: 'Rameez Ahmad Sajid Ahmad',
    position: 'Partner and Manager',
    experience: '[EXPERIENCE]',
    expertise: ['[TECHNICAL EXPERTISE]'],
    bio: '[PROFESSIONAL BIO]',
    responsibilities: ['[RESPONSIBILITIES]'],
    photo: null,
    placeholder: true,
  },
  {
    name: 'Waziha Ahmad Tausif Ahmad',
    position: 'Partner',
    experience: '[EXPERIENCE]',
    expertise: ['[TECHNICAL EXPERTISE]'],
    bio: '[PROFESSIONAL BIO]',
    responsibilities: ['[RESPONSIBILITIES]'],
    photo: null,
    placeholder: true,
  },
];

/* ------------------------------------------------------------------ About */
export const about = {
  whoWeAre: [
    'Optima Star Technical Services L.L.C. is a Dubai-registered company working on waterproofing and thermal insulation problems in the construction industry.',
    'Most of our work is delivered as a specialist sub-contractor to main contractors, under the review of the project consultant: pre-qualification, material submittals, method statements and inspections before anything is covered.',
  ],
  technicalApproach: [
    'We execute both sheet membranes and liquid-applied systems, with experience in APP and SBS modified bitumen membranes, acrylic, cementitious and fibrated liquid systems.',
    'Our team of civil and chemical engineers works with the design team to meet the specific requirements of each project. Materials used meet the prescribed technical specifications.',
  ],
  supervision:
    'We believe jobsite supervision is fundamental to a successful project. Non-working superintendents manage field personnel on each site to make sure the installation is right, and we aim for one non-working superintendent for every 5–10 field workers.',
  people:
    'We set stringent measures for recruiting and developing people, and invest in training so each person knows their field in depth.',
  commitment:
    'Professionalism is the principle that governs our work: keeping our promises to customers, partners and employees.',
};

/** From the company organisation chart. */
export const orgChart = [
  { level: 'Management', roles: ['Managing Director', 'Operations Manager', 'General Manager'] },
  { level: 'Departments', roles: ['HR Manager', 'Sales', 'Accounts', 'Site Manager'] },
  { level: 'Site team', roles: ['HSE Team', 'Site Engineer', 'QA/QC Engineer'] },
  { level: 'Execution', roles: ['Supervisor', 'Skilled technicians', 'Helpers'] },
];

/* ------------------------------------------------------------------ Trust */
export type TrustIcon = 'badge' | 'file' | 'hardhat' | 'shield' | 'ruler' | 'flask' | 'target';

export const trustPoints: { title: string; text: string; icon: TrustIcon }[] = [
  {
    title: 'Approved applicator',
    icon: 'badge',
    text: 'Applicator certificates from SOPREMA, Petrozo Energy, MAPEI, Geobit, Royal Industries, Innochem International and Corrotech.',
  },
  {
    title: 'Consultant-reviewed work',
    icon: 'file',
    text: 'Pre-qualifications and material submittals reviewed by EDMAC, National Engineering Bureau, AREC, BDA and FACE Architecture + Design.',
  },
  {
    title: 'Technical expertise',
    icon: 'flask',
    text: 'Civil and chemical engineers, experienced in SBS and APP membranes and in acrylic, cementitious and fibrated liquid systems.',
  },
  {
    title: 'Site supervision',
    icon: 'hardhat',
    text: 'Non-working superintendents on each site, aiming for one for every 5–10 field workers.',
  },
  {
    title: 'Technical documentation',
    icon: 'ruler',
    text: 'Shop drawings, method statements and inspection and test plans prepared for consultant review.',
  },
  {
    title: 'QHSE commitment',
    icon: 'shield',
    text: 'A signed QHSE policy, risk assessment and coordinated safety action plans throughout the construction process.',
  },
  {
    title: 'Project-specific systems',
    icon: 'target',
    text: 'The system follows the project specification and the approved manufacturer, not a one-size-fits-all product.',
  },
];

export const trustBar = ['Approved applicator', 'Waterproofing specialist', 'Consultant-reviewed submittals', 'Project supervision', 'QHSE policy'];

export const consultants = ['EDMAC Engineering Consultant', 'National Engineering Bureau', 'AREC Engineering Consultant', 'BDA Engineering Consultants', 'FACE Architecture + Design'];

/* ------------------------------------------------------------------ QHSE
 * Source: QHSE policy (dated 31-08-2025, signed by the Managing Director) and
 * Health & Safety policy in the company profile.
 */
export const qhse = [
  {
    key: 'quality',
    title: 'Quality',
    text: 'Work is carried out in compliance with technical standards and the legal framework, with customer satisfaction as the main objective and measurable targets. Performance standards are continually improved.',
    points: ['Materials meeting prescribed technical specifications', 'Consultant inspection before covering', 'Continual improvement of performance standards'],
  },
  {
    key: 'health',
    title: 'Health',
    text: 'Safe and healthy working conditions for all employees, who the company regards as its most valuable asset. Occupational health and safety hazards are identified and managed.',
    points: ['OH&S hazards and opportunities identified', 'Appropriate tools, equipment and safe systems of work', 'Training in OH&S matters'],
  },
  {
    key: 'safety',
    title: 'Safety',
    text: 'Comprehensive risk assessment and coordinated safety action plans are in place throughout the construction process, protecting employees, sub-contractors, customers and the community.',
    points: ['Pre-bid safety review of site hazards', 'Daily morning safety review with foremen and crews', 'Weekly toolbox talks'],
  },
  {
    key: 'environment',
    title: 'Environment',
    text: 'The company commits to preventing environmental impacts, assessing environmental aspects where risks exist, and implementing the actions those assessments show are necessary.',
    points: ['Environmental aspects assessed', 'Awareness training for employees', 'Policy monitored and reviewed regularly'],
  },
];

/* ------------------------------------------------------------------ Approach
 * Labelled "typical" on the site: this sequence reflects the consultant submittal
 * and inspection workflow seen in the supplied documents.
 */
export const approach = [
  { title: 'Drawing and site review', text: 'Review of drawings, specification and site conditions for the structure.' },
  { title: 'Pre-qualification and submittals', text: 'Company pre-qualification, material submittals and certificates to the consultant through the main contractor.' },
  { title: 'System selection', text: 'The system follows the specification and approved manufacturer. Shop drawings and method statement are submitted for review.' },
  { title: 'Material inspection', text: 'A material inspection request is raised for each delivery on site.' },
  { title: 'Surface preparation', text: 'Cleaning, grinding and moisture checks so the substrate is ready for primer.' },
  { title: 'Waterproofing application', text: 'Application by trained applicators to the approved details, under site supervision.' },
  { title: 'Protection', text: 'Protection board or screed installed before follow-on trades.' },
  { title: 'Inspection and handover', text: 'Consultant inspection, and testing or mock-ups where specified, before handover.' },
];

/* ------------------------------------------------------------------ FAQ */
export const faqs: { q: string; a: string }[] = [
  {
    q: 'What is SBS membrane waterproofing?',
    a: 'SBS membranes are sheets of bitumen modified with styrene-butadiene-styrene, a rubber-like polymer that keeps the membrane flexible. They are usually torch-applied to a primed surface, with the joints lapped and sealed, to form a continuous barrier. On our substructure details, two layers of 4 mm SBS membrane are used.',
  },
  {
    q: 'Where is membrane waterproofing used?',
    a: 'Below ground on pile caps, strap beams, rafts, foundations and basement walls, and above ground on roofs, terraces and decks. The specific system is chosen from the project specification.',
  },
  {
    q: 'What is pile head waterproofing?',
    a: 'Piles pass through the waterproofing layer under a pile cap, so each pile head is a potential leak path. On our typical detail, the top and sides of the pile head receive an epoxy grout layer, and the SBS membrane is dressed up to the pile head and lapped onto it.',
  },
  {
    q: 'Why is surface preparation important?',
    a: 'Primers and membranes can only bond to a surface that is clean, sound and at the moisture condition the manufacturer requires. Dust, laitance, sharp edges and moisture all reduce adhesion. We clean, grind and check moisture before priming.',
  },
  {
    q: 'What is a bitumen primer?',
    a: 'A bitumen-based coating applied before the membrane. It binds surface dust and gives the torch-applied membrane a surface to bond to. Our substructure details use one coat of Rheoprime D41 primer unless the consultant specifies otherwise.',
  },
  {
    q: 'What is an SBS modified membrane?',
    a: 'A bitumen membrane whose bitumen has been modified with SBS polymer and reinforced, so it stays flexible and can accommodate movement. The product and thickness are set by the project specification; on our issued substructure drawing it is Rheoseal 4S 180-10, 4 mm thick, in two layers.',
  },
  {
    q: 'What protection is required over a waterproofing membrane?',
    a: 'A protection layer that suits the next activity. On our substructure details, vertical faces receive a 6 mm protection board and horizontal surfaces receive protection screed over polythene sheet. The protection is installed before reinforcement fixing and concrete pouring.',
  },
  {
    q: 'How long can an SBS membrane warranty be?',
    a: 'Warranty duration may range from 10 to 20 years depending on the structure, approved waterproofing system, project conditions, specification and applicable warranty terms. The final duration is set in the written warranty issued for the specific project.',
  },
  {
    q: 'Does the warranty depend on the project structure?',
    a: 'Yes. The structure, the approved system, the project conditions and the specification all affect the warranty that can be issued. We confirm it in writing for each project.',
  },
  {
    q: 'What information is required for a quotation?',
    a: 'The waterproofing scope, the structure or area, approximate quantities, the project stage, the location, and any drawings, specifications or BOQ you have. Site photos help for existing structures.',
  },
  {
    q: 'Can you review drawings before quotation?',
    a: 'Yes. Send the structural and waterproofing drawings and the specification with your request, and we will base the quotation on them.',
  },
  {
    q: 'Can site photographs be uploaded?',
    a: 'Yes. The quotation form accepts PDF, JPG and PNG files, and DWG drawings, up to 10 MB per file.',
  },
  {
    q: 'Do you work with consultants and main contractors?',
    a: 'Yes. Most of our projects are delivered as waterproofing sub-contractor to main contractors, with pre-qualifications, material submittals and method statements reviewed by the project consultant.',
  },
  {
    q: 'What waterproofing services does Optima Star provide?',
    a: 'SBS and other membrane waterproofing, pile head treatment, pile cap and strap beam waterproofing, substructure, foundation and basement waterproofing, roof waterproofing and combo roof systems, wet area waterproofing, cementitious waterproofing, water tank and swimming pool waterproofing, GRP lining, injection treatment, and PU foam thermal insulation.',
  },
];
