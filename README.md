# Optima Star Technical Services — website

Waterproofing-only website for **OPTIMA STAR TECHNICAL SERVICES L.L.C.**, Dubai.
React 18 + Vite 5 + TypeScript + Tailwind CSS 4 + Framer Motion + Lucide.

All company facts come from two source documents: the pre-qualification pack 2026–2027 and drawing OPT-JAZ-WP-SD-STR-002. Every content file says where its facts came from. Nothing on the site is invented; where information was missing, the site says "On request" or shows a clearly marked `[PLACEHOLDER]`.

---

## 1. Run it

```bash
npm install
cp .env.example .env      # optional, see section 8
npm run dev               # http://localhost:5173
npm run build             # type-check + production build into /dist
npm run preview           # serve /dist locally
```

Node 18+ required.

### Deploy

| Host | Command / setting |
|---|---|
| Vercel | Import the repo. `vercel.json` already handles SPA routing and caching. |
| Netlify | Build `npm run build`, publish `dist`. `public/_redirects` handles routing. |
| GitHub Pages (`/Optima/`) | `npm run deploy` (builds with `VITE_BASE_PATH=/Optima/` and publishes). |

---

## 2. Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/services` | Service explorer + typical project approach |
| `/services/:slug` | 12 service pages (overview, what it solves, areas, materials, process, considerations, QC, protection, drawings, related) |
| `/systems` | Waterproofing systems: 8 technical chapters, animated diagram, drawing viewer, materials table, suppliers, warranty |
| `/projects` | Project register with filters |
| `/projects/:slug` | 20 project pages (facts, system, drawings, consultant submittals, related services) |
| `/about` | Who we are, approach, trust, supervision + org chart, team, applicator experience, QHSE, commitment |
| `/certifications` | 7 applicator certificates + licence, Chamber, VAT |
| `/faq` | 14 questions (FAQPage structured data) |
| `/contact` | Address, phones, email, WhatsApp, Google Map, directions |
| `/quote` | 8-step quotation form with uploads |
| `/privacy`, `/terms` | Starter legal text (have it reviewed) |

---

## 3. Folder structure

```
src/
  config/site.ts          env config, warranty switch, privacy switches, upload rules
  data/
    company.ts            name, phones, email, address, licence numbers
    services.ts           12 services + quote form service options
    systems.ts            7 diagram stages, drawing materials, suppliers
    projects.ts           20 project records + their submittal documents
    documents.ts          certificates, registrations, drawings
    content.ts            team, about, trust points, QHSE, approach, FAQ
  components/
    layout/               Header, Footer, MobileActionBar, Layout
    diagram/              CrossSection (SVG), TechnicalDiagram (scroll + mobile)
    ui/                   Button, Img, SectionHeading, StatusBadge, Logo
    Hero, ServiceExplorer, ProjectTable, Documents (certificate grid + gallery),
    DocumentViewer, WarrantySection, MaterialsTable, TeamSection, QHSESection,
    ApproachSection, TrustGrid, FAQList, QuoteForm, ContactBlock, CtaBand, PageHero, Seo
  pages/                  one file per route (lazy loaded)
  styles/index.css        design tokens (@theme) + base styles
public/
  brand/                  logo-light.png, logo-dark.png (transparent), favicons
  documents/              certificates, drawing, submittals (.webp) + thumbs/
  images/site/            photos (.webp, with -800 variants)
```

---

## 4. Animation system

- **Signature diagram** (`components/diagram/`): an SVG cross-section drawn after details 1 and 3 of the issued drawing. On desktop (≥1024 × 640 px) the section pins and builds one layer per scroll step. The order is groundwater, pile head treatment, block work, bitumen primer, SBS membrane, protection, concrete structure, and it ends with "Structure protected". Paths draw with `pathLength`, and the current stage's label lights up. On mobile, tablets and with reduced motion it becomes a full diagram plus a tap-through list: tapping a stage highlights that layer and dims the rest.
- **Hero:** masked headline reveal, image un-clip, parallax, a dimension line drawing in, CTA entrance.
- **Elsewhere:** active-nav underline, service image clip transitions, project rows entering, row accent and hover preview, warranty ring drawing once, QHSE icon pulse, form step transitions and progress bar, success check.
- `MotionConfig reducedMotion="user"` plus a CSS fallback reduce motion for visitors who have "reduce motion" on.

## 5. Responsive behaviour

- Checked at 375, 390, 768, 1024, 1280, 1440 and 1920 px with no horizontal overflow and no console errors.
- **Project register:** a table on desktop and expandable cards on mobile and tablet.
- **Service explorer:** a split list and panel on desktop, an accordion on mobile.
- **Mobile action bar:** Call / WhatsApp / Quote, fixed to the bottom. It uses `env(safe-area-inset-bottom)` and the page reserves space for it.
- **iOS Safari:** `viewport-fit=cover` with safe-area padding, `100svh` / `100dvh` heights, touch targets of at least 44 px.

---

## 6. How to replace team photos

1. Save the portraits as `public/images/team/rameez.webp` and `public/images/team/waziha.webp`. Use a 4:5 ratio, about 800 × 1000 px.
2. In `src/data/content.ts`, in each `team` entry:
   - set `photo: 'images/team/rameez.webp'` (or the Waziha file)
   - fill `experience`, `expertise`, `bio` and `responsibilities`
   - set `placeholder: false`
3. Anything still in `[BRACKETS]` shows with an orange dashed outline so it can't go live unnoticed.

## 7. How to update projects

In `src/data/projects.ts`, copy an entry and change the fields.

- `slug` is used in the URL, so keep it unique.
- `status` is `'Completed'`, `'Ongoing'` or `null`.
- `year`: `null` shows "On request".
- `category` drives the filters. They only show categories that have projects.
- `clientIsIndividual: true` hides private client names unless `showIndividualClientNames` in `config/site.ts` is `true`.
- `documents`: add submittal images to `public/documents/` and `public/documents/thumbs/`, then list them.
- `photos`: real site photos of that project. Only these show as "Site photos".
- `image` is only an illustrative hover preview in the register.

## 8. Environment variables

| Variable | Purpose | Default |
|---|---|---|
| `VITE_SITE_URL` | Canonical URLs, sitemap, structured data | `https://www.optimastaruae.com` |
| `VITE_BASE_PATH` | Base path (`/Optima/` for GitHub Pages) | `/` |
| `VITE_API_BASE_URL` | Quote form backend | empty, which uses the email fallback |
| `VITE_QUOTE_PATH` | Endpoint path | `/quote` |
| `VITE_WHATSAPP_NUMBER` | WhatsApp buttons, digits only | `971568180793` |

Everything prefixed `VITE_` is public. Never put API keys here.

## 9. How to update certificates

1. Export the certificate page as an image. Save it as `public/documents/cert-name.webp` (about 1800 px on the long side) and `public/documents/thumbs/cert-name.webp` (about 520 px).
2. Add or edit the entry in `src/data/documents.ts` with issuer, type, scope, reference, issued date, validity, file name and orientation.
3. Copy dates exactly as printed.

## 10. How to update services

Edit `src/data/services.ts`. Each service has overview, solves, application areas, materials (with a `note` saying where each is evidenced), process, considerations, quality, protection, related slugs, image and `sources`. Product names should only appear if a certificate, drawing or approved submittal names them. New services get a page and a sitemap entry automatically. Quote form options are in `quoteServiceOptions`.

## 11. How to update the warranty text

Everything is in `warranty` in `src/config/site.ts`: range, title, statement and footnote. Set `enabled: false` to remove every warranty mention across the site (home section, service pages, systems page, quote page, service explorer) in one place. The FAQ answers about warranty are in `src/data/content.ts`.

## 12. Quote form backend

The form sends `multipart/form-data` to `${VITE_API_BASE_URL}${VITE_QUOTE_PATH}` with these fields:

- `services`, `projectType`, `location`, `locationDetail`, `stage`, `area`
- `projectName`, `details`, `name`, `company`, `phone`, `email`, `summary`
- `files` (repeated)

A timeout of 60 seconds applies. Any 2xx response shows the success screen; anything else shows an error with the email address.

Without a backend, it opens the visitor's email app with the details filled in and asks them to attach their files.

The browser checks files (PDF/JPG/PNG/DWG, 10 MB each, 6 files, 30 MB total). **The backend must repeat these checks**, because browser validation can be bypassed. There is also a hidden honeypot field for bots. Options for the backend: a small serverless function (Vercel/Netlify) that emails the files, Formspree, or similar.

## 13. SEO

- Each page sets its own title, description, canonical URL and Open Graph tags through `components/Seo.tsx`.
- Structured data: Organization + LocalBusiness, Service, FAQPage, ItemList and BreadcrumbList. There is no review or rating schema.
- `sitemap.xml` and `robots.txt` are generated from the data on every build (`vite.config.ts`).
- This is a single-page app. If search visibility becomes a priority, add prerendering (for example `vite-plugin-prerender` or moving to a static framework) so crawlers get full HTML.

---

## 14. Must be confirmed before launch

1. **Warranty (10–20 years).** The supplied documents contain no company warranty policy. Some consultants require "not less than 10 years". Confirm the wording or set `enabled: false`.
2. **Certificate dates.** Three are printed with dates in the future and are shown "as printed":
   - Geobit: 08 April 2027
   - SOPREMA: 1 January 2027
   - Innochem: 2 October 2026
3. **Team.** Names and licence roles come from the trade licence; everything else is a placeholder. No real or AI portraits were available, so neutral placeholders are shown.
4. **Project documents.** Consultant submittal forms (with engineers' signatures) are shown on project pages. Get the main contractors' OK, or set `showProjectDocuments = false`.
5. **Registration documents.** The licence page lists activities beyond waterproofing (plumbing, electrical, AC) and a Dubai Municipality remark. Decide whether to keep it public.
6. **Missing data.** No project years were supplied. Projects 3 and 5 have no location. Business hours and social links are empty, so they are hidden.
7. **Photos.** The site uses the photos from the company brochure. Several are low resolution, and those are shown inset rather than full-bleed. Real site photos of Optima Star crews would be a big upgrade. Add them to `public/images/site/`, or to `photos` on each project.
8. **Privacy policy and terms** are starter text; have them reviewed.

### Deliberately left out

- The "zero accident rate" claim, which can't be verified.
- Epoxy flooring, painting, general maintenance and lightweight concrete, as non-waterproofing services.
- The old site's unsupported claims: "every system carries a written warranty", flood tests on every job, and project challenge stories.
- Any statistics, testimonials or ratings.

## 15. Remaining external integrations

- A quote form backend (section 12).
- Real team portraits and site photos.
- A WhatsApp number confirmation.
- Analytics, if wanted (none is included).
- Optional prerendering for SEO.
- Search Console submission of `sitemap.xml`.
