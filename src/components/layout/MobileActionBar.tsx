import { Link } from 'react-router-dom';
import { FileText, MessageCircle, Phone } from 'lucide-react';
import { primaryPhone } from '../../data/company';
import { whatsappUrl } from '../../config/site';

/** Sticky call / WhatsApp / quote bar, mobile and tablet only. */
export default function MobileActionBar() {
  const item = 'flex min-h-11 flex-1 flex-col items-center justify-center gap-1 text-[0.72rem] font-semibold tracking-wide';
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 text-white backdrop-blur-lg lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex h-[var(--mobile-bar-h)] items-stretch">
        <a href={`tel:${primaryPhone.tel}`} className={item}>
          <Phone className="h-5 w-5 text-aqua" aria-hidden /> Call
        </a>
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={`${item} border-x border-white/10`}>
          <MessageCircle className="h-5 w-5 text-aqua" aria-hidden /> WhatsApp
        </a>
        <Link to="/quote" className={`${item} bg-aqua text-ink`}>
          <FileText className="h-5 w-5" aria-hidden /> Quote
        </Link>
      </div>
    </nav>
  );
}
