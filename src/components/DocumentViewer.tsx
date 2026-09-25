import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Maximize2, Minimize2, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';
import { asset, cx } from '../lib/asset';
import { docSrc } from '../data/documents';
import { useLockBody } from '../hooks/useLockBody';

export interface ViewerItem {
  file: string;
  title: string;
  caption?: string;
}

interface Props {
  items: ViewerItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}

const MIN = 1;
const MAX = 6;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/**
 * Full-screen viewer for certificates and technical drawings. Supports wheel and
 * button zoom, drag to pan, pinch zoom on touch, double-tap, keyboard
 * (arrows, +, -, 0, Esc) and the Fullscreen API.
 */
export default function DocumentViewer({ items, index, onClose, onIndex }: Props) {
  const open = index !== null;
  const item = open ? items[index] : null;
  const stageRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isFs, setIsFs] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ dist: number; scale: number; x: number; y: number; px: number; py: number } | null>(null);
  const lastTap = useRef(0);

  useLockBody(open);

  const reset = useCallback(() => { setScale(1); setPos({ x: 0, y: 0 }); }, []);

  useEffect(() => { reset(); setLoaded(false); }, [index, reset]);

  const zoomAt = useCallback((next: number, cx0?: number, cy0?: number) => {
    const el = stageRef.current;
    setScale((prev) => {
      const s = clamp(next, MIN, MAX);
      if (s === 1) { setPos({ x: 0, y: 0 }); return 1; }
      if (el && cx0 !== undefined && cy0 !== undefined) {
        const r = el.getBoundingClientRect();
        const ox = cx0 - (r.left + r.width / 2);
        const oy = cy0 - (r.top + r.height / 2);
        setPos((p) => ({ x: ox - ((ox - p.x) * s) / prev, y: oy - ((oy - p.y) * s) / prev }));
      }
      return s;
    });
  }, []);

  const go = useCallback((d: number) => {
    if (index === null) return;
    onIndex((index + d + items.length) % items.length);
  }, [index, items.length, onIndex]);

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === '+' || e.key === '=') setScale((s) => clamp(s * 1.4, MIN, MAX));
      else if (e.key === '-') setScale((s) => { const n = clamp(s / 1.4, MIN, MAX); if (n === 1) setPos({ x: 0, y: 0 }); return n; });
      else if (e.key === '0') reset();
      else if (e.key === 'Tab' && rootRef.current) {
        const f = rootRef.current.querySelectorAll<HTMLElement>('button, a[href]');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const onFs = () => setIsFs(!!document.fullscreenElement);
    window.addEventListener('keydown', onKey);
    document.addEventListener('fullscreenchange', onFs);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('fullscreenchange', onFs);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      prevFocus?.focus?.();
    };
  }, [open, onClose, go, reset]);

  // Non-passive wheel listener so the page does not scroll behind the viewer
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomAt(scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15), e.clientX, e.clientY);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [scale, zoomAt, open]);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];
    if (pts.length === 2) {
      gesture.current = { dist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y), scale, x: pos.x, y: pos.y, px: 0, py: 0 };
    } else if (pts.length === 1) {
      gesture.current = { dist: 0, scale, x: pos.x, y: pos.y, px: e.clientX, py: e.clientY };
      const now = Date.now();
      if (now - lastTap.current < 280) { if (scale > 1) reset(); else zoomAt(2.5, e.clientX, e.clientY); }
      lastTap.current = now;
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId) || !gesture.current) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];
    const g = gesture.current;
    if (pts.length === 2 && g.dist) {
      const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const s = clamp(g.scale * (d / g.dist), MIN, MAX);
      setScale(s);
      if (s === 1) setPos({ x: 0, y: 0 });
    } else if (pts.length === 1 && scale > 1) {
      setPos({ x: g.x + (e.clientX - g.px), y: g.y + (e.clientY - g.py) });
    }
  };
  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    const pts = [...pointers.current.values()];
    gesture.current = pts.length === 1 ? { dist: 0, scale, x: pos.x, y: pos.y, px: pts[0].x, py: pts[0].y } : null;
  };

  const toggleFs = () => {
    if (!document.fullscreenElement) rootRef.current?.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  };

  const btn = 'grid h-11 w-11 place-items-center rounded-full text-white/85 transition hover:bg-white/10 hover:text-white disabled:opacity-30';

  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          ref={rootRef}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/97 text-white backdrop-blur"
          style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2 sm:px-5">
            <div className="min-w-0 pl-1">
              <p className="truncate font-display text-[0.98rem] font-semibold">{item.title}</p>
              <p className="truncate text-xs text-white/55">
                {items.length > 1 && <span className="tabular-nums">{index! + 1} of {items.length}. </span>}
                {item.caption}
              </p>
            </div>
            <div className="flex shrink-0 items-center">
              <button type="button" className={cx(btn, 'hidden sm:grid')} onClick={() => setScale((s) => { const n = clamp(s / 1.4, MIN, MAX); if (n === 1) setPos({ x: 0, y: 0 }); return n; })} disabled={scale <= MIN} aria-label="Zoom out"><ZoomOut className="h-5 w-5" /></button>
              <span className="hidden w-12 text-center text-xs tabular-nums text-white/60 sm:inline">{Math.round(scale * 100)}%</span>
              <button type="button" className={cx(btn, 'hidden sm:grid')} onClick={() => setScale((s) => clamp(s * 1.4, MIN, MAX))} disabled={scale >= MAX} aria-label="Zoom in"><ZoomIn className="h-5 w-5" /></button>
              <button type="button" className={btn} onClick={reset} disabled={scale === 1} aria-label="Reset zoom"><RotateCcw className="h-5 w-5" /></button>
              <button type="button" className={cx(btn, 'hidden md:grid')} onClick={toggleFs} aria-label={isFs ? 'Exit full screen' : 'Full screen'}>
                {isFs ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </button>
              <a className={btn} href={asset(docSrc(item.file))} target="_blank" rel="noopener noreferrer" aria-label="Open original image in a new tab"><ExternalLink className="h-5 w-5" /></a>
              <button ref={closeRef} type="button" className={btn} onClick={onClose} aria-label="Close viewer"><X className="h-6 w-6" /></button>
            </div>
          </div>

          <div
            ref={stageRef}
            className={cx('relative flex-1 touch-none select-none overflow-hidden', scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in')}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {!loaded && <div className="absolute inset-0 grid place-items-center text-sm text-white/50">Loading document…</div>}
            <img
              key={item.file}
              src={asset(docSrc(item.file))}
              alt={item.title}
              draggable={false}
              onLoad={() => setLoaded(true)}
              className="absolute inset-0 m-auto max-h-[calc(100%-2rem)] max-w-[calc(100%-2rem)] rounded-sm bg-white shadow-2xl transition-opacity duration-300"
              style={{
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${scale})`,
                transition: gesture.current ? 'none' : 'transform 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.3s',
                opacity: loaded ? 1 : 0,
              }}
            />
          </div>

          {items.length > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous document" className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:left-5">
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next document" className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:right-5">
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          <p className="px-4 pb-2 pt-1 text-center text-[0.7rem] text-white/40 sm:hidden">Pinch or double-tap to zoom. Drag to pan.</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
