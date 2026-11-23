/**
 * Builders for JSON-LD structured data (schema.org). Pages pass the result to <Schema />.
 * Every page links back to ONE business entity via its @id, so Google sees a single company.
 * Test pages with https://search.google.com/test/rich-results after deploying.
 */
import { SITE } from '../data/site';

export const BUSINESS_ID = `${SITE.url}/#business`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export type FaqItem = { q: string; a: string; todo?: boolean };
export const publicFaqs = (faqs: FaqItem[]) => faqs.filter((f) => !f.todo);

const abs = (path: string) => new URL(path, SITE.url).href;

/** The sitewide business entity. Included on every page by <Schema />. */
export function businessNode() {
  return {
    '@type': ['GeneralContractor', 'HomeAndConstructionBusiness'],
    '@id': BUSINESS_ID,
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phoneE164,
    email: SITE.email,
    // TODO(esquire): replace with the real logo file once Esquire sends it.
    logo: abs('/logo.png'),
    image: abs('/og-default.jpg'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: { '@type': 'City', name: SITE.areaServed },
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
    // TODO(esquire): add openingHoursSpecification, geo and priceRange once confirmed.
  };
}

export function websiteNode() {
  return { '@type': 'WebSite', '@id': WEBSITE_ID, url: SITE.url, name: SITE.shortName, publisher: { '@id': BUSINESS_ID } };
}

export function breadcrumbNode(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: abs(item.path) })),
  };
}

export function faqNode(faqs: FaqItem[]) {
  const list = publicFaqs(faqs);
  if (!list.length) return null; // no FAQ schema until there are real answers
  return {
    '@type': 'FAQPage',
    mainEntity: list.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function serviceNode(opts: { name: string; description: string; path: string }) {
  return {
    '@type': 'Service',
    '@id': `${abs(opts.path)}#service`,
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: abs(opts.path),
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'City', name: SITE.areaServed },
    // Offers/prices are added only when Esquire supplies real prices (see service .md files).
  };
}
