import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import { Button, Logo } from '../ui';
import { cx } from '../../lib/asset';
import { primaryPhone } from '../../data/company';

export const navItems = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/systems', label: 'Systems' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const solid = scrolled && !open;

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500',
        solid ? 'bg-white/85 shadow-[0_1px_0_rgb(19_45_76/0.08)] backdrop-blur-xl backdrop-saturate-150' : 'bg-transparent',
      )}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link to="/" className="relative z-10 shrink-0" aria-label="Optima Star home">
          <Logo dark={!solid} className="h-11 w-auto sm:h-12" />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cx(
                      'relative block rounded-full px-3.5 py-2 text-[0.94rem] font-semibold transition-colors',
                      solid ? 'text-graphite hover:text-blue' : 'text-white/80 hover:text-white',
                      isActive && (solid ? '!text-navy' : '!text-white'),
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.span layoutId="nav-active" className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-aqua" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <a
            href={`tel:${primaryPhone.tel}`}
            className={cx('hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold lg:inline-flex', solid ? 'text-navy' : 'text-white/85 hover:text-white')}
          >
            <Phone className="h-4 w-4" aria-hidden /> {primaryPhone.display}
          </a>
          <span className="hidden lg:block">
            <Button to="/quote" variant={solid ? 'secondary' : 'primary'} arrow>
              Request a quote
            </Button>
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={cx('grid h-11 w-11 place-items-center rounded-full xl:hidden', solid ? 'text-navy hover:bg-mist' : 'text-white hover:bg-white/10')}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="blueprint fixed inset-0 -z-0 flex flex-col overflow-y-auto pt-[calc(var(--header-h)+env(safe-area-inset-top))] xl:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex-1 py-8">
              <ol className="space-y-1">
                {navItems.map((item, i) => (
                  <motion.li key={item.to} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.04 }}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cx('flex items-baseline gap-4 border-b border-white/10 py-3.5 font-display text-3xl font-medium', isActive ? 'text-aqua' : 'text-white')
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ol>
              <div className="mt-10 flex flex-col gap-3 pb-28 sm:flex-row">
                <Button to="/quote" size="lg" arrow>Request a quote</Button>
                <Button href={`tel:${primaryPhone.tel}`} variant="outline-light" size="lg">Call {primaryPhone.display}</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
