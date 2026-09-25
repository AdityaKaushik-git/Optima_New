/** Resolve a file in /public so it works under any base path (e.g. GitHub Pages /Optima/). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

export const pad2 = (n: number) => String(n).padStart(2, '0');
