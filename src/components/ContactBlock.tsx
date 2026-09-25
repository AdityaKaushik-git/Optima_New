import { Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import { company, mapsDirectionsUrl, mapsEmbedUrl, primaryPhone } from '../data/company';
import { whatsappUrl } from '../config/site';
import { Button } from './ui';

export default function ContactBlock() {
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <h3 className="text-2xl font-semibold">{company.legalName}</h3>
        <address className="mt-6 space-y-6 not-italic">
          <div className="flex gap-4">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-aqua" aria-hidden />
            <p className="text-[1.02rem] leading-relaxed">{company.address.lines.map((l) => <span key={l} className="block">{l}</span>)}</p>
          </div>
          <div className="flex gap-4">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-aqua" aria-hidden />
            <ul className="space-y-1.5">
              {company.phones.map((p) => (
                <li key={p.tel}><span className="inline-block w-16 text-sm text-steel">{p.label}</span><a href={`tel:${p.tel}`} className="link-u font-semibold text-navy">{p.display}</a></li>
              ))}
            </ul>
          </div>
          <div className="flex gap-4">
            <Mail className="mt-1 h-5 w-5 shrink-0 text-aqua" aria-hidden />
            <a href={`mailto:${company.email}`} className="link-u font-semibold text-navy">{company.email}</a>
          </div>
          {company.hours && <p className="text-sm text-steel">{company.hours}</p>}
        </address>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={`tel:${primaryPhone.tel}`} variant="secondary">Call now</Button>
          <Button href={`mailto:${company.email}`} variant="ghost">Email us</Button>
          <Button href={whatsappUrl()} target="_blank" variant="ghost"><MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp</Button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-line bg-mist sm:aspect-[16/10]">
          <iframe title="Map: Optima Star office, Creek Tower Car Parking Building, Deira" src={mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0 grayscale-[35%]" />
        </div>
        <div className="mt-4 flex justify-end">
          <Button href={mapsDirectionsUrl} target="_blank" variant="ghost" arrow="external"><Navigation className="h-4 w-4" aria-hidden /> Get directions</Button>
        </div>
      </div>
    </div>
  );
}
