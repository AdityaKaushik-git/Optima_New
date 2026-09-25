import { company } from '../data/company';

/**
 * Runtime configuration. Anything that differs between environments comes from Vite
 * env variables (see .env.example). No secrets belong here: every VITE_ variable is
 * shipped to the browser.
 */
const env = import.meta.env;

export const siteConfig = {
  siteUrl: (env.VITE_SITE_URL || company.website).replace(/\/$/, ''),
  apiBaseUrl: (env.VITE_API_BASE_URL || '').replace(/\/$/, ''),
  quotePath: env.VITE_QUOTE_PATH || '/quote',
  /** International format, digits only. */
  whatsappNumber: (env.VITE_WHATSAPP_NUMBER || '971568180793').replace(/\D/g, ''),
};

export const whatsappUrl = (text = 'Hello Optima Star, I would like to discuss a waterproofing requirement.') =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;

/**
 * SBS membrane warranty statement.
 * ⚠ Confirm with Optima Star management before launch. The supplied documents do not
 * contain a company warranty policy (consultant comments on some projects require
 * "not less than 10 years"). Set `enabled: false` to hide every warranty mention.
 */
export const warranty = {
  enabled: true,
  range: '10–20',
  title: 'SBS membrane warranty',
  statement:
    'Warranty duration may range from 10 to 20 years depending on the structure, approved waterproofing system, project conditions, specification and applicable warranty terms.',
  footnote:
    '*Final warranty duration is subject to the approved project specification and the written warranty issued for the specific project.',
};

/** Individual (private) client names stay hidden unless this is true. Company clients always show. */
export const showIndividualClientNames = false;

/** Show consultant submittal and approval forms on project pages. Confirm main contractors are happy for these to be public. */
export const showProjectDocuments = true;

export const uploadRules = {
  maxFiles: 6,
  maxFileBytes: 10 * 1024 * 1024,
  maxTotalBytes: 30 * 1024 * 1024,
  extensions: ['pdf', 'jpg', 'jpeg', 'png', 'dwg'],
};
