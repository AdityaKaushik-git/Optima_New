/**
 * Technical waterproofing system shown in the signature diagram.
 * Source: drawing OPT-JAZ-WP-SD-STR-002 rev 00, "Substructure waterproofing details
 * (sheet 1-4)", issued for construction 17.04.2026. Material notes are copied from the
 * drawing. The website diagram is a schematic: it carries no dimensions of its own.
 */

export type StageKey = 'groundwater' | 'pileHead' | 'blockwork' | 'primer' | 'membrane' | 'protection' | 'concrete';

export interface Stage {
  key: StageKey;
  label: string;
  purpose: string;
  application: string;
  note: string;
  drawingRef: string;
  swatch: string;
}

export const stages: Stage[] = [
  {
    key: 'groundwater',
    label: 'Groundwater',
    purpose: 'The load the system is built to resist. Below-ground concrete sits against soil moisture and, where the water table is high, water under pressure.',
    application: 'Nothing is applied at this stage. The groundwater condition is taken from the project’s geotechnical information and specification.',
    note: 'Water table level and hydrostatic head are project-specific and are never assumed.',
    drawingRef: 'Project geotechnical data',
    swatch: 'var(--c-water)',
  },
  {
    key: 'pileHead',
    label: 'Pile head treatment',
    purpose: 'Seals the point where each pile passes through the waterproofing line.',
    application: 'Epoxy grout to the top and sides of the pile head, with the membrane later dressed up and lapped onto it.',
    note: 'Rheogrout EP 102 three-component or Rheocrete MC single-component epoxy grout, 15–20 mm to top and sides of pile head.',
    drawingRef: 'Detail 3, typical pile head',
    swatch: 'var(--c-grout)',
  },
  {
    key: 'blockwork',
    label: 'Block work',
    purpose: 'Forms the sides of the pile cap or strap beam so the membrane can be applied before concrete is cast.',
    application: 'Block work side walls on concrete blinding. Angle fillets and protection screed are by the main contractor on the issued detail.',
    note: 'Block work and concrete blinding as shown on details 1, 2 and 4.',
    drawingRef: 'Details 1, 2 and 4',
    swatch: 'var(--c-block)',
  },
  {
    key: 'primer',
    label: 'Bitumen primer',
    purpose: 'Seals dust and gives the membrane a surface it can bond to.',
    application: 'One coat applied to the blinding and the inner face of the block work, allowed to dry before torching.',
    note: 'One coat of Rheoprime D41 primer.',
    drawingRef: 'Details 1, 2, 3 and 4',
    swatch: 'var(--c-primer)',
  },
  {
    key: 'membrane',
    label: 'SBS membrane',
    purpose: 'The waterproofing barrier itself: continuous across the base, up the sides and around the pile heads.',
    application: 'Two torch-applied layers with lapped joints, dressed onto the pile head treatment.',
    note: 'Two layers of Rheoseal 4S 180-10, 4 mm thick SBS modified black membrane.',
    drawingRef: 'Details 1, 2, 3 and 4',
    swatch: 'var(--c-membrane)',
  },
  {
    key: 'protection',
    label: 'Protection',
    purpose: 'Keeps the membrane intact while reinforcement is fixed and concrete is poured.',
    application: 'Protection board on vertical faces; protection screed laid over polythene sheet on the base.',
    note: 'Rheoboard 6 mm protection board. Protection screed over polythene sheet by main contractor.',
    drawingRef: 'Details 1, 2, 3 and 4',
    swatch: 'var(--c-protect)',
  },
  {
    key: 'concrete',
    label: 'Concrete structure',
    purpose: 'The pile cap, strap beam or raft is cast inside a fully protected envelope.',
    application: 'Reinforcement and concrete by the main contractor. At grade slab the membrane upstand is terminated with sealant.',
    note: 'Rheomastic sealant at grade slab termination; angle fillet by main contractor.',
    drawingRef: 'Details 1 and 2',
    swatch: 'var(--c-concrete)',
  },
];

export interface SystemMaterial {
  name: string;
  role: string;
  spec: string;
  where: string;
}

/** Materials exactly as named on drawing OPT-JAZ-WP-SD-STR-002. */
export const drawingMaterials: SystemMaterial[] = [
  { name: 'Rheoprime D41', role: 'Bitumen primer', spec: 'One coat', where: 'Blinding, block work, pile head perimeter' },
  { name: 'Rheoseal 4S 180-10', role: 'SBS modified black membrane', spec: 'Two layers, 4 mm thick', where: 'Pile caps, pile heads, strap beams' },
  { name: 'Rheoboard', role: 'Protection board', spec: '6 mm', where: 'Vertical membrane faces' },
  { name: 'Rheomastic', role: 'Sealant', spec: 'At termination', where: 'Membrane upstand at grade slab' },
  { name: 'Rheogrout EP 102', role: 'Three-component epoxy grout', spec: '15–20 mm, top and sides', where: 'Pile head' },
  { name: 'Rheocrete MC', role: 'Single-component epoxy grout', spec: '15–20 mm, top and sides', where: 'Pile head' },
];

/** Materials suppliers named on the company's "Our valuable suppliers" page. */
export const suppliers = [
  'SOPREMA', 'Polybit (Henkel)', 'BASF', 'Awazel', 'Sheridan', 'Bayer', 'Dr. Fixit', 'Conmix', 'Fosroc',
  'Exceed', 'Sika', 'Pidilite', 'Huntsman', 'Jotun', 'Sodamco', 'BCI', 'Pearl Covestro', 'SITCO', 'Weber',
  'Geobit', 'Petrozo Energy', 'Royal Industries',
];

export const drawingInfo = {
  number: 'OPT-JAZ-WP-SD-STR-002',
  revision: '00',
  title: 'Substructure waterproofing details (sheet 1-4)',
  issued: 'Issued for construction, 17.04.2026',
  project: 'Residential building G+2P+8, plot DIA-RE-0220, Nakhlat Deira 101, Dubai Islands',
  consultant: 'EDMAC Engineering Consultant',
  mainContractor: 'Jaseera',
  scale: 'NTS',
};
