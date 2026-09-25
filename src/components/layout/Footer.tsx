import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Logo, Button } from '../ui';
import { company, mapsDirectionsUrl } from '../../data/company';
import { services } from '../../data/services';

const cols = [
  {
    title: 'Company',
    links: [
      { to: '/systems', label: 'Waterproofing systems' },
      { to: '/projects', label: 'Projects' },
      { to: '/about', label: 'About' },
      { to: '/certifications', label: 'Certifications' },
      { to: '/faq', label: 'FAQ' },
      { to: '/contact', label: 'Contact' },
      { to: '/quote', label: 'Request a quote' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="blueprint relative overflow-hidden text-white/75">
      <div className="container-x pt-20 pb-10 lg:pt-28">
        <div className="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo dark className="h-14 w-auto" />
            <p className="mt-6 max-w-sm text-[0.98rem] leading-relaxed">
              Specialist waterproofing contractor in Dubai. Substructure, pile head, roof and wet area waterproofing, delivered to approved
              drawings and under consultant review.
            </p>
            <div className="mt-8">
              <Button to="/quote" arrow>Request a quote</Button>
            </div>
          </div>

          <nav aria-label="Waterproofing services" className="lg:col-span-3">
            <h2 className="anno mb-5 text-aqua">Services</h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              {services.slice(0, 9).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="link-u hover:text-white">{s.title}</Link>
                </li>
              ))}
              <li><Link to="/services" className="link-u font-semibold text-white">All services</Link></li>
            </ul>
          </nav>

          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title} className="lg:col-span-2">
              <h2 className="anno mb-5 text-aqua">{c.title}</h2>
              <ul className="space-y-2.5 text-[0.95rem]">
                {c.links.map((l) => (
                  <li key={l.to}><Link to={l.to} className="link-u hover:text-white">{l.label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <h2 className="anno mb-5 text-aqua">Contact</h2>
            <ul className="space-y-4 text-[0.95rem]">
              {company.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="flex items-center gap-3 hover:text-white">
                    <Phone className="h-4 w-4 shrink-0 text-aqua" aria-hidden />
                    <span><span className="text-white/50">{p.label} </span>{p.display}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${company.email}`} className="flex items-center gap-3 hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-aqua" aria-hidden /> {company.email}
                </a>
              </li>
              <li>
                <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-aqua" aria-hidden />
                  <address className="not-italic">{company.address.lines.join(', ')}</address>
                </a>
              </li>
            </ul>
            {company.social.length > 0 && (
              <ul className="mt-6 flex gap-4 text-sm">
                {company.social.map((s) => (
                  <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer" className="link-u hover:text-white">{s.label}</a></li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {year} {company.legalName} Dubai licence no. {company.registration.licenceNo}.</p>
          <ul className="flex gap-6">
            <li><Link to="/privacy" className="link-u hover:text-white">Privacy policy</Link></li>
            <li><Link to="/terms" className="link-u hover:text-white">Terms</Link></li>
          </ul>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none select-none whitespace-nowrap px-4 pb-4 font-display text-[18vw] font-semibold leading-[0.8] tracking-[-0.05em] text-white/[0.035]">
        Optima Star
      </p>
    </footer>
  );
}
