/**
 * Waterproofing services. Only services supported by the supplied company documents
 * are listed. Epoxy flooring, painting and general maintenance appear in the company
 * profile but are intentionally left off this waterproofing-only website.
 *
 * `sources` records where each service is evidenced, so future edits stay honest.
 * Product names only appear where a supplied certificate, drawing or approved
 * submittal names them.
 */

export type ServiceIcon =
  | 'layers' | 'flame' | 'pile' | 'box' | 'building' | 'roof' | 'droplets'
  | 'brush' | 'container' | 'grid' | 'syringe' | 'thermometer';

export interface Material {
  name: string;
  note?: string;
}

export interface Service {
  slug: string;
  title: string;
  icon: ServiceIcon;
  short: string;
  overview: string;
  solves: string[];
  applicationAreas: string[];
  materials: Material[];
  process: string[];
  considerations: string[];
  quality: string[];
  protection: string;
  related: string[];
  image: string;
  /** false = small brochure photo, shown inset rather than full-bleed */
  imageHiRes: boolean;
  drawings?: string[];
  warranty?: boolean;
  keyword: string;
  sources: string[];
}

export const services: Service[] = [
  {
    slug: 'sbs-membrane-waterproofing',
    title: 'SBS membrane waterproofing',
    icon: 'flame',
    keyword: 'SBS membrane waterproofing Dubai',
    short: 'Torch-applied SBS modified bitumen membranes for substructures, foundations and roofs.',
    overview:
      'SBS (styrene-butadiene-styrene) modified bitumen membranes are torch-applied sheets that bond to a primed substrate and to each other at the laps, forming a continuous barrier. On the substructure detail Optima Star has issued for construction, the build-up is one coat of bitumen primer, two layers of 4 mm SBS modified black membrane and a protection layer before concrete.',
    solves: [
      'Groundwater and hydrostatic pressure against below-ground concrete',
      'Water ingress through foundations, pile caps, strap beams and retaining walls',
      'Exposed or buried roof decks that need a robust bituminous barrier',
    ],
    applicationAreas: ['Pile caps and strap beams', 'Raft and isolated foundations', 'Basement and retaining walls', 'Flat concrete roofs and decks'],
    materials: [
      { name: 'Rheoseal 4S 180-10, 4 mm SBS modified black membrane (two layers)', note: 'Substructure drawing OPT-JAZ-WP-SD-STR-002' },
      { name: 'Rheoprime D41 bitumen primer (one coat)', note: 'Substructure drawing OPT-JAZ-WP-SD-STR-002' },
      { name: 'Rheoboard 6 mm protection board', note: 'Substructure drawing OPT-JAZ-WP-SD-STR-002' },
      { name: 'SOPREMA conventional torch-applied waterproofing systems', note: 'Approved installer certificate' },
      { name: 'Betoflex 4S & 5S / 4P & 5P membranes', note: 'Geobit approved applicator certificate' },
      { name: 'Polybit Bituplus E4180 with Bituboard', note: 'Consultant-reviewed material submittal' },
    ],
    process: [
      'Review the approved drawing and specification, and confirm the membrane build-up with the consultant.',
      'Prepare the substrate: clean, sound and dry, with fillets formed at internal corners where detailed.',
      'Apply bitumen primer and allow it to dry to the manufacturer’s stated condition.',
      'Torch-apply the first membrane layer with lapped joints, pressing laps with a seam roller.',
      'Apply the second layer with joints staggered from the first, as specified.',
      'Install the protection layer (protection board on walls, protection screed on horizontal surfaces).',
      'Inspection with the consultant before the protection is covered and concrete is cast.',
    ],
    considerations: [
      'Hot works: torch application needs a fire-safety plan, extinguishers on hand and gas cylinder storage agreed with the main contractor.',
      'Laps, upturns, terminations and penetrations are where membranes fail. They are detailed on shop drawings before work starts.',
      'Low-temperature flexibility and other properties are checked against the product data sheet and project specification.',
    ],
    quality: [
      'Material inspection request (MIR) for each delivery on site',
      'Substrate moisture checked before priming',
      'Lap and seam inspection during application',
      'Consultant inspection before the membrane is covered',
    ],
    protection:
      'The membrane is never left exposed to follow-on trades. Protection board or protection screed is installed as detailed before backfilling or casting concrete.',
    related: ['pile-head-treatment', 'pile-cap-strap-beam-waterproofing', 'substructure-foundation-basement-waterproofing'],
    image: 'images/site/sbs-torch-applied.webp',
    imageHiRes: true,
    drawings: ['drawing-substructure'],
    warranty: true,
    sources: ['Company profile (SBS and APP membranes)', 'SOPREMA approved installer certificate', 'Drawing OPT-JAZ-WP-SD-STR-002', 'Equipment list: gas torch, seam roller'],
  },
  {
    slug: 'membrane-waterproofing',
    title: 'Membrane waterproofing',
    icon: 'layers',
    keyword: 'membrane waterproofing Dubai',
    short: 'Sheet membranes (SBS and APP) and liquid-applied membranes, selected to suit the structure.',
    overview:
      'Optima Star executes both sheet membranes and liquid-applied membrane systems. The company profile records experience with APP (atactic polypropylene) and SBS modified bitumen membranes as well as acrylic, cementitious and fibrated liquid systems. The system is selected from the project specification and the approved manufacturer, not from habit.',
    solves: [
      'Water ingress through horizontal and vertical concrete surfaces',
      'Detailing around complex geometry where sheet or liquid systems suit better',
      'Projects where the consultant has specified a particular membrane system',
    ],
    applicationAreas: ['Substructures', 'Roofs and terraces', 'Podium and deck areas', 'Planters and landscaped areas'],
    materials: [
      { name: 'SBS and APP modified bitumen sheet membranes', note: 'Company profile' },
      { name: 'Liquid-applied membranes (airless spray or roller applied)', note: 'Equipment list' },
      { name: 'Neo Combo Roofing System & membrane waterproofing', note: 'Royal Industries approved applicator certificate' },
      { name: 'Betoflex, Betocoat and Betoseal ranges', note: 'Geobit approved applicator certificate' },
    ],
    process: [
      'Confirm the specified system and obtain consultant approval of the material submittal.',
      'Substrate preparation with pressure washing, grinding and vacuum cleaning as required.',
      'Moisture check before application.',
      'Primer, then membrane application by sheet (torch) or liquid method (airless spray, roller, brush).',
      'Detailing at upturns, drains, joints and penetrations.',
      'Protection layer and inspection before covering.',
    ],
    considerations: [
      'Liquid systems depend on achieving the specified dry film thickness; sheet systems depend on laps and bonding.',
      'Compatibility between primer, membrane, protection and sealants is confirmed with the manufacturer.',
    ],
    quality: ['Approved material submittal before work', 'Moisture meter reading before application', 'Inspection of details before covering'],
    protection: 'A protection layer suited to the next trade is installed so the membrane is not damaged during construction.',
    related: ['sbs-membrane-waterproofing', 'roof-waterproofing-combo-roof', 'cementitious-fibrated-waterproofing'],
    image: 'images/site/sbs-membrane-laying.webp',
    imageHiRes: true,
    sources: ['Company profile', 'Royal Industries certificate', 'Geobit certificate', 'Equipment list: liquid-applied membranes'],
  },
  {
    slug: 'pile-head-treatment',
    title: 'Pile head treatment',
    icon: 'pile',
    keyword: 'pile head waterproofing Dubai',
    short: 'Epoxy grout to the top and sides of pile heads, tied into the substructure membrane.',
    overview:
      'Pile heads pass straight through the substructure waterproofing, which makes them one of the most critical details below ground. On Optima Star’s typical pile head detail, the top and sides of each pile head receive an epoxy grout layer and the SBS membrane is dressed up to the pile head and lapped onto it.',
    solves: [
      'A break in the waterproofing where piles penetrate the blinding',
      'Water tracking along the pile-to-pile-cap interface',
    ],
    applicationAreas: ['Bored and driven pile heads', 'Pile groups under pile caps', 'Piles under rafts'],
    materials: [
      { name: 'Rheogrout EP 102, three-component epoxy grout, 15–20 mm to top and sides of pile head', note: 'Drawing detail 3' },
      { name: 'Rheocrete MC, single-component epoxy grout, 15–20 mm to top and sides of pile head', note: 'Drawing detail 3' },
      { name: 'Betogrout EP 102 and Betocrete MC', note: 'Geobit approved applicator certificate' },
    ],
    process: [
      'Pile head cut to level by others and cleaned; loose material removed.',
      'Epoxy grout applied to the top and sides of the pile head at the thickness shown on the approved drawing.',
      'Bitumen primer to the blinding and the pile head perimeter.',
      'SBS membrane dressed up the pile head and lapped onto it as detailed.',
      'Protection screed laid over polythene sheet around the pile head (by main contractor, per drawing).',
    ],
    considerations: [
      'Reinforcement projecting from the pile must be kept clean of grout where it is to be cast into the pile cap.',
      'Grout selection (three-component or single-component) follows the approved drawing and specification.',
    ],
    quality: ['Pile head surface inspected before grout', 'Grout thickness checked against the drawing', 'Membrane lap at pile head inspected before protection'],
    protection: 'Protection screed over polythene sheet is placed around the treated pile head before the pile cap reinforcement is fixed.',
    related: ['pile-cap-strap-beam-waterproofing', 'sbs-membrane-waterproofing', 'substructure-foundation-basement-waterproofing'],
    image: 'images/site/pile-head-treatment.webp',
    imageHiRes: true,
    drawings: ['detail-pile-head', 'drawing-substructure'],
    sources: ['Company profile: Pile Head Treatment Systems', 'Drawing OPT-JAZ-WP-SD-STR-002, detail 3', 'Coral Isle pre-qualification (pile head treatment)'],
  },
  {
    slug: 'pile-cap-strap-beam-waterproofing',
    title: 'Pile cap and strap beam waterproofing',
    icon: 'box',
    keyword: 'pile cap waterproofing Dubai',
    short: 'Fully wrapped pile caps and strap beams using block work, primer, two-layer SBS membrane and protection.',
    overview:
      'Pile caps and strap beams are wrapped on the base and sides before concrete is cast. The typical details use block work as the side formwork, a primed surface, two layers of 4 mm SBS membrane, a 6 mm protection board on vertical faces, and protection screed over polythene on the base. At grade slab level the membrane is terminated with a sealant.',
    solves: ['Groundwater reaching foundation concrete from below and from the sides', 'Weak points at pile cap to column and grade slab junctions'],
    applicationAreas: ['Pile caps (single and multi-pile)', 'Strap beams and tie beams', 'Column stubs up to grade slab'],
    materials: [
      { name: 'Rheoprime D41 primer, one coat', note: 'Drawing details 1, 2 and 4' },
      { name: 'Rheoseal 4S 180-10, two layers of 4 mm SBS modified black membrane', note: 'Drawing details 1, 2 and 4' },
      { name: 'Rheoboard 6 mm protection board', note: 'Drawing details 1, 2 and 4' },
      { name: 'Rheomastic sealant at grade slab termination', note: 'Drawing details 1 and 2' },
    ],
    process: [
      'Concrete blinding and block work side walls (block work, angle fillets and protection screed by main contractor where shown).',
      'Prime the blinding and the inner face of the block work.',
      'Two layers of SBS membrane across the base and up the block work.',
      'Protection board to the vertical faces; protection screed over polythene sheet to the base.',
      'Reinforcement fixing and concrete casting by the main contractor.',
      'Membrane upstand at the column stub terminated with sealant at grade slab level.',
    ],
    considerations: [
      'Continuity between the pile head treatment and the pile cap membrane is detailed on the shop drawing.',
      'Angle fillets at the pile cap to column junction are formed before membrane application (by main contractor on the issued detail).',
    ],
    quality: ['Block work and blinding surface inspected before priming', 'Lap and corner inspection', 'Consultant inspection before protection and concrete'],
    protection: 'Rheoboard 6 mm protection board on vertical faces and protection screed over polythene sheet on the base, as drawn.',
    related: ['pile-head-treatment', 'sbs-membrane-waterproofing', 'substructure-foundation-basement-waterproofing'],
    image: 'images/site/pile-cap-membrane.webp',
    imageHiRes: true,
    drawings: ['detail-pile-cap-1', 'detail-pile-cap-2', 'detail-strap-beam'],
    warranty: true,
    sources: ['Drawing OPT-JAZ-WP-SD-STR-002, details 1, 2 and 4'],
  },
  {
    slug: 'substructure-foundation-basement-waterproofing',
    title: 'Substructure, foundation and basement waterproofing',
    icon: 'building',
    keyword: 'substructure waterproofing Dubai',
    short: 'Waterproofing for everything below ground, from pile heads to basement walls.',
    overview:
      'Substructure waterproofing is the largest share of Optima Star’s project register, delivered for main contractors under consultant review on residential, commercial and utility buildings in Dubai. The scope typically combines pile head treatment, pile cap and strap beam wrapping, and membrane to raft, foundation and basement elements.',
    solves: ['Groundwater ingress into basements', 'Damage to foundation concrete and reinforcement from water exposure', 'Leaks at construction joints and junctions below ground'],
    applicationAreas: ['Rafts and foundations', 'Basement walls and slabs', 'Retaining walls', 'Lift pits and sumps', 'Central cooling plant substructures'],
    materials: [
      { name: 'Petrozo Energy system: Rheoprime D41, Rheoseal 4S membranes, Rheoboard 6 mm', note: 'Approved-as-noted submittals, Hills View project' },
      { name: 'Rheoseal FBW fully bonded system', note: 'Proposed on Mashreq Elite Residence (under consultant review)' },
      { name: 'Corrotech waterproofing materials', note: 'Corrotech certificate; submittal on JVC project' },
      { name: 'Polybit Bituplus E4180 and Bituboard', note: 'Approved-as-noted submittal' },
    ],
    process: [
      'Pre-qualification and material submittals to the consultant through the main contractor.',
      'Method statement and shop drawings for critical junctions (raft to wall, pile heads, construction joints).',
      'MEP clearance before waterproofing starts, where required by the consultant.',
      'Surface preparation, primer and membrane application.',
      'Protection and inspection before backfill or concrete.',
    ],
    considerations: [
      'Consultants commonly require detailed drawings for raft-to-wall junctions, pile heads, construction and expansion joints.',
      'Groundwater level and exposure conditions come from the project’s geotechnical information and are not assumed.',
    ],
    quality: ['Material inspection request per delivery', 'Third-party sampling where the consultant requires it', 'Inspection and test plan submitted with the method statement'],
    protection: 'Protection board or screed on every membrane surface before the next trade, as per the approved section details.',
    related: ['pile-head-treatment', 'pile-cap-strap-beam-waterproofing', 'injection-treatment'],
    image: 'images/site/block-work.webp',
    imageHiRes: true,
    drawings: ['drawing-substructure'],
    warranty: true,
    sources: ['Project register (substructure scopes)', 'Consultant submittals and comments', 'Company profile'],
  },
  {
    slug: 'roof-waterproofing-combo-roof',
    title: 'Roof waterproofing and combo roof system',
    icon: 'roof',
    keyword: 'roof waterproofing Dubai',
    short: 'Waterproofing, thermal insulation and screed to falls, delivered as one roof build-up.',
    overview:
      'The company profile describes waterproofing and thermal insulation solutions for RCC flat roofs, metal roofs and sloped and garden roofs. A combo roof system combines the waterproofing layer with insulation, a separation layer and a protective screed laid to falls. Optima Star holds approved applicator certificates for combo roof systems from Royal Industries and Innochem International.',
    solves: ['Roof leaks at outlets, parapets and joints', 'Heat gain through the roof slab', 'Ponding from roofs without proper falls'],
    applicationAreas: ['RCC flat roofs', 'Villa and building roofs', 'Terraces', 'Metal and sloped roofs (system dependent)', 'Garden roofs'],
    materials: [
      { name: 'Neo Combo Roofing System', note: 'Royal Industries approved applicator certificate' },
      { name: 'Combo roof systems', note: 'Innochem International approved applicator certificate' },
      { name: 'Roof combo waterproofing system by Sheridan Specialized Materials', note: 'Pre-qualification approved as noted, 16 villas project' },
      { name: 'Foam concrete at 400–600 kg/m³ density range', note: 'Company profile' },
    ],
    process: [
      'Surface preparation with pressure washing, grinding and vacuum cleaning.',
      'Waterproofing layer, including rubberised bitumen emulsion or acrylic coatings where the system calls for them.',
      'Thermal insulation, such as PU spray foam, as specified.',
      'Geotextile separation layer.',
      'Flexcell boards for expansion joints and to guide screed slopes.',
      'Protective screed laid to falls and finished with a power trowel; joints sealed with polyurethane sealant.',
    ],
    considerations: [
      'Falls to outlets are set out before screed so water does not pond.',
      'Upturns at parapets, plant bases and outlets are detailed before application.',
    ],
    quality: ['Moisture check before application', 'Inspection of upturns and outlets', 'Screed levels checked against falls'],
    protection: 'The protective screed laid to falls acts as the wearing and protection layer over the waterproofing and insulation.',
    related: ['thermal-insulation-pu-foam', 'membrane-waterproofing', 'wet-area-waterproofing'],
    image: 'images/site/combo-roof-buildup.webp',
    imageHiRes: true,
    sources: ['Company profile (roof waterproofing and insulation)', 'Royal Industries certificate', 'Innochem certificate', 'Equipment list: PU foam system', 'BDA / Jaseera pre-qualification'],
  },
  {
    slug: 'wet-area-waterproofing',
    title: 'Wet area waterproofing',
    icon: 'droplets',
    keyword: 'wet area waterproofing Dubai',
    short: 'Flexible cementitious waterproofing for bathrooms, kitchens and balconies before screed and tiles.',
    overview:
      'Wet area waterproofing is applied to bathrooms, kitchens, balconies and similar areas before screed and tiling. Optima Star has delivered wet area scopes on multiple residential towers in Dubai using consultant-approved systems, and holds certificates for Mapei, Innochem and Corrotech products used in these areas.',
    solves: ['Leaks from bathrooms and kitchens into the floor below', 'Water tracking at wall-to-floor junctions, drains and pipe penetrations'],
    applicationAreas: ['Bathrooms and shower areas', 'Kitchens and pantries', 'Balconies', 'Laundry and utility rooms'],
    materials: [
      { name: 'Nitocote CM210 (Fosroc)', note: 'Approved-as-noted submittals on three projects' },
      { name: 'Mapelastic Smart with Mapetex Sel N', note: 'Mapei approved applicator certificate' },
      { name: 'Wet area applications', note: 'Innochem International approved applicator certificate' },
    ],
    process: [
      'MEP clearance and surface preparation.',
      'Reinforcement at internal corners, drains and pipe penetrations where the system requires it.',
      'Waterproofing coats applied with wall upturns as specified.',
      'Mock-up and leakage testing where the consultant requires them before final approval.',
    ],
    considerations: [
      'Consultant approvals on recent projects were subject to mock-up and leakage test completion.',
      'Material storage and application follow the manufacturer’s data sheet.',
    ],
    quality: ['Material inspection report with each delivery order', 'Mock-up for consultant approval', 'Leakage test before screed and tiles'],
    protection: 'The finished wet area is protected until the screed and tiling trades take over.',
    related: ['cementitious-fibrated-waterproofing', 'water-tank-swimming-pool-waterproofing', 'roof-waterproofing-combo-roof'],
    image: 'images/site/wet-area.webp',
    imageHiRes: false,
    sources: ['Project register (wet area scopes)', 'Nitocote CM210 submittals', 'Mapei certificate', 'Innochem certificate'],
  },
  {
    slug: 'cementitious-fibrated-waterproofing',
    title: 'Cementitious and fibrated waterproofing',
    icon: 'brush',
    keyword: 'cementitious waterproofing Dubai',
    short: 'Cementitious and fibre-reinforced liquid coatings for wet areas, tanks and below-ground walls.',
    overview:
      'Cementitious waterproofing is mixed to a uniform consistency and applied by trowel, roller or brush. It suits areas where a thin, bonded coating is preferred over sheet membranes. The company profile lists cementitious and fibrated liquid systems among its areas of expertise.',
    solves: ['Waterproofing of wet areas and small, detailed spaces', 'Bonded coatings on concrete and masonry'],
    applicationAreas: ['Wet areas', 'Water tanks', 'Below-ground walls', 'Planters and balconies'],
    materials: [
      { name: 'Nitocote CM210 (Fosroc)', note: 'Approved-as-noted submittals' },
      { name: 'Mapelastic Smart', note: 'Mapei approved applicator certificate' },
      { name: 'Betoflex CM and Betoflex CXL', note: 'Geobit approved applicator certificate' },
    ],
    process: [
      'Prepare the substrate and pre-wet where the product requires it.',
      'Mix with a paddle and drill to a uniform consistency.',
      'Apply by trowel, roller or brush in the number of coats specified.',
      'Cure and protect as per the manufacturer’s data sheet.',
    ],
    considerations: ['Coat thickness and number of coats follow the data sheet and project specification.'],
    quality: ['Batch mixing checks', 'Coverage and coat count checked', 'Inspection before covering'],
    protection: 'Protected from damage and early drying until covered by screed, tiles or finishes.',
    related: ['wet-area-waterproofing', 'water-tank-swimming-pool-waterproofing'],
    image: 'images/site/cementitious.webp',
    imageHiRes: false,
    sources: ['Company profile', 'Equipment list: cementitious waterproofing', 'Mapei, Geobit certificates'],
  },
  {
    slug: 'water-tank-swimming-pool-waterproofing',
    title: 'Water tank and swimming pool waterproofing',
    icon: 'container',
    keyword: 'water tank waterproofing Dubai',
    short: 'Waterproofing for concrete water tanks and swimming pools, including GRP lining.',
    overview:
      'Water tanks and swimming pools are listed in the company’s areas of specialization, and swimming pool installation works are an active activity on its Dubai trade licence. The lining or coating is selected for the water the structure will hold and the project specification.',
    solves: ['Leakage from concrete tanks and pools', 'Deterioration of concrete in permanently wet conditions'],
    applicationAreas: ['Water tanks', 'Swimming pools', 'Balancing tanks', 'Water features'],
    materials: [
      { name: 'GRP lining', note: 'Company profile' },
      { name: 'Cementitious systems', note: 'Company profile' },
    ],
    process: [
      'Inspect and repair the concrete substrate.',
      'Select the lining or coating to suit the stored water and the specification.',
      'Apply the system, with attention to corners, joints and penetrations.',
      'Test before handover as specified.',
    ],
    considerations: ['Products in contact with potable water must be approved for that use by the relevant authority. This is confirmed per project.'],
    quality: ['Substrate inspection', 'Detail inspection at joints and penetrations', 'Testing as specified'],
    protection: 'The finished lining is protected until the tank or pool is commissioned.',
    related: ['grp-lining', 'cementitious-fibrated-waterproofing'],
    image: 'images/site/water-tank-pool.webp',
    imageHiRes: false,
    sources: ['Company profile: Water Tanks & Swimming Pools', 'Trade licence activity: Swimming Pools Installation Works'],
  },
  {
    slug: 'grp-lining',
    title: 'GRP lining',
    icon: 'grid',
    keyword: 'GRP lining Dubai',
    short: 'Glass-reinforced plastic laminated in place as a seamless lining.',
    overview:
      'GRP (glass-reinforced plastic) lining is built up on site from glass-fibre reinforcement and resin to form a seamless lining with no joints. It is one of the core services listed throughout the company profile.',
    solves: ['Joints and cracks in concrete tanks and pits', 'Surfaces that need a seamless, cleanable lining'],
    applicationAreas: ['Water tanks', 'Swimming pools', 'Pits and channels'],
    materials: [{ name: 'GRP lining system as specified per project', note: 'Company profile' }],
    process: [
      'Grind and clean the concrete, and repair defects.',
      'Apply the lining in layers of reinforcement and resin to the specified build-up.',
      'Finish corners and penetrations.',
      'Apply the final coat suited to the service conditions.',
    ],
    considerations: ['Resin type and top coat are selected for the stored liquid and approvals required.'],
    quality: ['Surface preparation inspection', 'Laminate checks during build-up', 'Final inspection'],
    protection: 'Cured before filling, as per the system requirements.',
    related: ['water-tank-swimming-pool-waterproofing'],
    image: 'images/site/grp-lining.webp',
    imageHiRes: false,
    sources: ['Company profile: GRP Lining'],
  },
  {
    slug: 'injection-treatment',
    title: 'Injection treatment',
    icon: 'syringe',
    keyword: 'injection waterproofing Dubai',
    short: 'Polyurethane injection through packers to seal leaking cracks and joints.',
    overview:
      'Injection treatment seals water paths inside existing concrete. Holes are drilled to intersect the crack or joint, injection packers are fixed, and polyurethane is pumped in under pressure to fill the path.',
    solves: ['Active leaks through cracks in basements and tanks', 'Leaking construction joints', 'Water at pipe penetrations'],
    applicationAreas: ['Basement walls and slabs', 'Water tanks', 'Construction joints', 'Existing structures and renovations'],
    materials: [{ name: 'Polyurethane injection', note: 'Equipment list: PU injection pump, injection packers' }],
    process: [
      'Locate and mark the leak path.',
      'Drill injection points and fix injection packers.',
      'Inject polyurethane with a PU injection pump until the crack is filled.',
      'Remove packers, seal holes and clean the equipment after application.',
    ],
    considerations: ['Injection treats a specific water path. Where leaks are widespread, the cause is investigated first.'],
    quality: ['Leak mapping before injection', 'Visual check after injection'],
    protection: 'Treated areas are made good and left clean for the finishing trades.',
    related: ['substructure-foundation-basement-waterproofing', 'water-tank-swimming-pool-waterproofing'],
    image: 'images/site/injection.webp',
    imageHiRes: false,
    sources: ['Company profile: Injection Treatment', 'Equipment list: PU injection waterproofing'],
  },
  {
    slug: 'thermal-insulation-pu-foam',
    title: 'Thermal insulation and PU foam spray',
    icon: 'thermometer',
    keyword: 'PU foam roof insulation Dubai',
    short: 'Sprayed polyurethane foam insulation and coatings, usually as part of a roof system.',
    overview:
      'PU foam spray is listed on every page of the company profile, and insulation contracting is an active activity on the company’s trade licence. Sprayed polyurethane foam insulates the roof and is covered with coatings or built into a combo roof system.',
    solves: ['Heat gain through roofs', 'Insulation over irregular surfaces where boards are difficult to fit'],
    applicationAreas: ['Flat roofs', 'Metal roofs', 'Combo roof build-ups'],
    materials: [
      { name: 'Polyurethane spray foam', note: 'Equipment list: PU spray foam machine' },
      { name: 'Rubberised bitumen emulsion and acrylic coatings', note: 'Equipment list' },
      { name: 'Betofoam', note: 'Geobit approved applicator certificate' },
    ],
    process: [
      'Surface preparation with pressure washing, grinding and vacuum cleaning.',
      'Moisture check before application.',
      'Spray-apply polyurethane foam insulation.',
      'Apply coatings or continue with the combo roof build-up as specified.',
    ],
    considerations: ['Exposed foam must be protected from UV with the specified coating.'],
    quality: ['Substrate readiness check', 'Foam thickness checked against the specification'],
    protection: 'A coating or the combo roof screed protects the foam.',
    related: ['roof-waterproofing-combo-roof', 'membrane-waterproofing'],
    image: 'images/site/pu-foam-roof.webp',
    imageHiRes: false,
    sources: ['Company profile: PU foam spray, thermal insulation', 'Trade licence: Insulation Contracting', 'Equipment list: PU foam system'],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

/** Options offered in the quotation form (step 1). */
export const quoteServiceOptions = [
  'SBS membrane waterproofing',
  'Membrane waterproofing',
  'Pile head waterproofing',
  'Pile cap waterproofing',
  'Substructure waterproofing',
  'Foundation waterproofing',
  'Basement waterproofing',
  'Roof waterproofing',
  'Wet area waterproofing',
  'Water tank waterproofing',
  'Swimming pool waterproofing',
  'GRP lining',
  'Cementitious waterproofing',
  'Injection treatment',
  'Other waterproofing requirement',
];
