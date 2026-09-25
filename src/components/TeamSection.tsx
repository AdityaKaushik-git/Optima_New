import { team, type TeamMember } from '../data/content';
import { Img } from './ui';
import { cx } from '../lib/asset';

const isPh = (s: string) => /^\[.*\]$/.test(s);
function Ph({ children, className }: { children: string; className?: string }) {
  return isPh(children) ? (
    <span className={cx('rounded border border-dashed border-warn/60 bg-warn/5 px-1.5 text-warn', className)} title="Placeholder: replace in src/data/content.ts">{children}</span>
  ) : (
    <span className={className}>{children}</span>
  );
}

/** Neutral stand-in until a real portrait is supplied. */
function PortraitPlaceholder({ name }: { name: string }) {
  const initials = name.split(' ').filter((w) => w.length > 2).slice(0, 2).map((w) => w[0]).join('');
  return (
    <div className="blueprint relative h-full w-full" role="img" aria-label={`Portrait placeholder for ${name}`}>
      <svg viewBox="0 0 300 380" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id={`g-${initials}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a4a6e" />
            <stop offset="1" stopColor="#132d4c" />
          </linearGradient>
        </defs>
        <circle cx="150" cy="150" r="56" fill={`url(#g-${initials})`} />
        <path d="M50 380 C 58 272, 104 238, 150 238 C 196 238, 242 272, 250 380 Z" fill={`url(#g-${initials})`} />
        <path d="M0 330 H300 M40 0 V380 M260 0 V380" stroke="rgb(0 174 231 / 0.18)" strokeDasharray="3 6" />
      </svg>
      <span className="absolute right-4 top-4 font-display text-4xl font-semibold text-white/15">{initials}</span>
      <span className="anno absolute bottom-4 left-4 text-white/45">Photo to be supplied</span>
    </div>
  );
}

function Card({ m }: { m: TeamMember }) {
  return (
    <article className="group grid gap-6 sm:grid-cols-[minmax(0,15rem)_1fr]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-ink">
        <div className="h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
          {m.photo ? <Img src={m.photo} alt={`${m.name}, ${m.position}`} className="h-full w-full object-cover" /> : <PortraitPlaceholder name={m.name} />}
        </div>
        <span aria-hidden className="absolute bottom-0 left-0 h-1 w-0 bg-aqua transition-all duration-700 group-hover:w-full" />
      </div>
      <div>
        <p className="text-sm font-semibold text-blue">{m.position}</p>
        <h3 className="mt-1 text-2xl font-semibold transition-transform duration-500 group-hover:translate-x-1">{m.name}</h3>
        <p className="mt-4 text-[0.98rem] leading-relaxed"><Ph>{m.bio}</Ph></p>
        <dl className="mt-5 space-y-3 text-sm">
          <div><dt className="anno text-steel">Experience</dt><dd className="mt-1"><Ph>{m.experience}</Ph></dd></div>
          <div><dt className="anno text-steel">Technical expertise</dt><dd className="mt-1">{m.expertise.map((e) => <Ph key={e}>{e}</Ph>)}</dd></div>
          <div><dt className="anno text-steel">Responsibilities</dt><dd className="mt-1">{m.responsibilities.map((e) => <Ph key={e}>{e}</Ph>)}</dd></div>
        </dl>
      </div>
    </article>
  );
}

export default function TeamSection() {
  return (
    <div className="grid gap-14 xl:grid-cols-2 xl:gap-12">
      {team.map((m) => <Card key={m.name} m={m} />)}
    </div>
  );
}
