import { approach } from '../data/content';
import { pad2 } from '../lib/asset';

export default function ApproachSection() {
  return (
    <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {approach.map((a, i) => (
        <li key={a.title} className="relative border-t-2 border-navy/15 pt-5">
          <span aria-hidden className="absolute -top-0.5 left-0 h-0.5 w-10 bg-aqua" />
          <p className="font-display text-sm tabular-nums text-blue">{pad2(i + 1)}</p>
          <h3 className="mt-2 text-xl font-semibold">{a.title}</h3>
          <p className="mt-2 text-[0.96rem] leading-relaxed text-graphite/80">{a.text}</p>
        </li>
      ))}
    </ol>
  );
}
