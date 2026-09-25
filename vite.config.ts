import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { services } from './src/data/services';
import { projects } from './src/data/projects';

const staticRoutes = ['/', '/services', '/systems', '/projects', '/about', '/certifications', '/faq', '/contact', '/quote'];

/** Writes sitemap.xml and robots.txt from the content data at build time. */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'optima-seo-files',
    generateBundle() {
      const routes = [
        ...staticRoutes,
        ...services.map((s) => `/services/${s.slug}`),
        ...projects.map((p) => `/projects/${p.slug}`),
      ];
      const today = new Date().toISOString().slice(0, 10);
      const xml =
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        routes.map((r) => `  <url><loc>${siteUrl}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
        `\n</urlset>\n`;
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n` });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.VITE_SITE_URL || 'https://www.optimastaruae.com').replace(/\/$/, '');
  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [react(), tailwindcss(), seoFiles(siteUrl)],
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
            motion: ['framer-motion'],
          },
        },
      },
    },
  };
});
