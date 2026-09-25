import { forwardRef, type ReactNode, type AnchorHTMLAttributes, type ImgHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { asset, cx } from '../../lib/asset';
import type { ProjectStatus } from '../../data/projects';

/* ---------------------------------------------------------------- Button */
type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outline-light';
type Size = 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-display font-semibold tracking-[-0.01em] transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] min-h-11 whitespace-nowrap';
const variants: Record<Variant, string> = {
  primary: 'bg-aqua text-ink hover:bg-white hover:shadow-[0_10px_30px_-10px_rgb(0_174_231/0.7)]',
  secondary: 'bg-navy text-white hover:bg-blue',
  ghost: 'text-navy hover:text-blue',
  light: 'bg-white text-navy hover:bg-aqua hover:text-ink',
  'outline-light': 'border border-white/35 text-white hover:border-white hover:bg-white/10',
};
const sizes: Record<Size, string> = { md: 'px-5 py-2.5 text-[0.95rem]', lg: 'px-7 py-3.5 text-base' };

interface BtnProps {
  to?: string;
  href?: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean | 'external';
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  target?: string;
  ariaLabel?: string;
}

export function Button({ to, href, variant = 'primary', size = 'md', arrow = false, className, children, onClick, type = 'button', disabled, target, ariaLabel }: BtnProps) {
  const cls = cx(base, variants[variant], sizes[size], disabled && 'pointer-events-none opacity-50', className);
  const inner = (
    <>
      <span className="relative">{children}</span>
      {arrow === 'external' ? (
        <ArrowUpRight aria-hidden className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      ) : arrow ? (
        <ArrowRight aria-hidden className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      ) : null}
    </>
  );
  if (to) return <Link to={to} className={cls} onClick={onClick} aria-label={ariaLabel}>{inner}</Link>;
  if (href)
    return (
      <a href={href} className={cls} onClick={onClick} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  return <button type={type} className={cls} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>{inner}</button>;
}

/* ---------------------------------------------------------------- Image */
interface ImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string; // path inside /public, e.g. images/site/x.webp
  small?: boolean; // there is a "-800" variant
  priority?: boolean;
}
export const Img = forwardRef<HTMLImageElement, ImgProps>(function Img({ src, small, priority, alt = '', className, sizes = '100vw', ...rest }, ref) {
  const hasVariant = small && src.startsWith('images/site/');
  const srcSet = hasVariant ? `${asset(src.replace('.webp', '-800.webp'))} 800w, ${asset(src)} 1800w` : undefined;
  return (
    <img
      ref={ref}
      src={asset(src)}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      // @ts-expect-error fetchpriority is valid HTML, not yet in React 18 types
      fetchpriority={priority ? 'high' : undefined}
      className={className}
      {...rest}
    />
  );
});

/* ---------------------------------------------------------------- Section heading */
export function SectionHeading({
  kicker,
  title,
  intro,
  dark,
  className,
  as: As = 'h2',
  align = 'left',
}: {
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  className?: string;
  as?: 'h1' | 'h2';
  align?: 'left' | 'split';
}) {
  return (
    <div className={cx(align === 'split' ? 'grid gap-6 lg:grid-cols-12 lg:items-end' : 'max-w-3xl', className)}>
      <div className={align === 'split' ? 'lg:col-span-7' : undefined}>
        {kicker && <p className={cx('anno mb-4 flex items-center gap-3', dark ? 'text-aqua' : 'text-blue')}><span aria-hidden className="h-px w-8 bg-current" />{kicker}</p>}
        <As className={cx(As === 'h1' ? 'text-[length:var(--text-h1)]' : 'text-[length:var(--text-h2)]', 'font-semibold', dark && 'text-white')}>{title}</As>
      </div>
      {intro && <div className={cx(align === 'split' ? 'lg:col-span-5' : 'mt-5', 'lede', dark && '!text-white/70')}>{intro}</div>}
    </div>
  );
}

/* ---------------------------------------------------------------- Status */
export function StatusBadge({ status, recordType }: { status: ProjectStatus; recordType?: 'register' | 'document' }) {
  if (recordType === 'document' && !status)
    return <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs font-semibold text-steel">Project document</span>;
  if (!status) return <span className="text-xs font-medium text-steel">Available on request</span>;
  const done = status === 'Completed';
  return (
    <span className={cx('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold', done ? 'bg-success/10 text-success' : 'bg-aqua/12 text-blue')}>
      <span aria-hidden className={cx('h-1.5 w-1.5 rounded-full', done ? 'bg-success' : 'bg-aqua animate-pulse')} />
      {status}
    </span>
  );
}

/* ---------------------------------------------------------------- Logo */
const LOGO_W = 570;
const LOGO_H = 205;
export function Logo({ dark, className }: { dark?: boolean; className?: string }) {
  return (
    <img
      src={asset(dark ? 'brand/logo-dark.png' : 'brand/logo-light.png')}
      alt="Optima Star Technical Services LLC"
      width={LOGO_W}
      height={LOGO_H}
      className={cx('h-11 w-auto', className)}
      decoding="async"
    />
  );
}

/* ---------------------------------------------------------------- External link */
export function ExtLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}
