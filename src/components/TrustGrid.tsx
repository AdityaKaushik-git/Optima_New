import { trustPoints } from '../data/content';
import { trustIcons } from './icons';

export default function TrustGrid({ cols = 'sm:grid-cols-2 lg:grid-cols-3' }: { cols?: string }) {
  return (
    <ul className={`grid gap-x-10 gap-y-10 ${cols}`}>
      {trustPoints.map((t) => {
        const Icon = trustIcons[t.icon];
        return (
          <li key={t.title} className="flex gap-5">
            <Icon className="mt-1 h-6 w-6 shrink-0 text-aqua" aria-hidden strokeWidth={1.6} />
            <div>
              <h3 className="text-xl font-semibold">{t.title}</h3>
              <p className="mt-2 text-[0.97rem] leading-relaxed text-graphite/80">{t.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
