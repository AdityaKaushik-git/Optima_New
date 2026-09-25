import { Button } from './ui';
import { primaryPhone } from '../data/company';

export default function CtaBand({
  title = 'Send us your drawings. We will come back with a system and a quotation.',
  text = 'Share the structure, the scope and any drawings, specifications or site photos. Consultants and main contractors are welcome to send tender documents.',
}: { title?: string; text?: string }) {
  return (
    <section className="paper-grid border-y border-line">
      <div className="container-x grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:py-24">
        <div className="lg:col-span-8">
          <h2 className="text-[length:var(--text-h2)] font-semibold">{title}</h2>
          <p className="lede mt-5">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
          <Button to="/quote" variant="secondary" size="lg" arrow>Request a quote</Button>
          <Button href={`tel:${primaryPhone.tel}`} variant="ghost" size="lg">Call {primaryPhone.display}</Button>
        </div>
      </div>
    </section>
  );
}
