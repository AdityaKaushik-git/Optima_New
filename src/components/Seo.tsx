import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { company } from '../data/company';

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  jsonLd?: object | object[];
  breadcrumbs?: { name: string; path: string }[];
  noindex?: boolean;
}

const abs = (path: string) => `${siteConfig.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${siteConfig.siteUrl}/#organization`,
  name: company.legalName,
  alternateName: company.name,
  url: siteConfig.siteUrl,
  logo: abs('/brand/logo-light.png'),
  image: abs('/images/site/sbs-torch-applied.webp'),
  email: company.email,
  telephone: company.phones[0].tel,
  description: company.shortDescription,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    addressLocality: company.address.locality,
    addressRegion: 'Dubai',
    addressCountry: company.address.country,
  },
  areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
  contactPoint: company.phones.map((p) => ({ '@type': 'ContactPoint', telephone: p.tel, contactType: 'sales', areaServed: 'AE' })),
});

export default function Seo({ title, description, image = '/images/site/sbs-torch-applied.webp', jsonLd, breadcrumbs, noindex }: SeoProps) {
  const { pathname } = useLocation();
  const url = abs(pathname === '/' ? '/' : pathname);
  const blocks: object[] = [];
  if (jsonLd) blocks.push(...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]));
  if (breadcrumbs?.length) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ name: 'Home', path: '/' }, ...breadcrumbs].map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: abs(b.path) })),
    });
  }
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={company.legalName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={abs(image)} />
      <meta name="twitter:card" content="summary_large_image" />
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(b)}</script>
      ))}
    </Helmet>
  );
}
