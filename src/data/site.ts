/**
 * Business facts used everywhere on the site (header, footer, schema, WhatsApp links).
 * Change them HERE only. Never hard-code the phone number or address in a page.
 */
export const SITE = {
  name: 'Esquire Diversity LTD',
  shortName: 'Esquire Diversity',
  url: 'https://esquirediversity.co.ke',
  phoneDisplay: '0722 326329',
  phoneE164: '+254722326329',
  whatsappNumber: '254722326329', // digits only, used by wa.me links
  email: 'info@esquirediversity.co.ke',
  address: {
    street: 'Mumias Road',
    city: 'Nairobi',
    postalCode: '00200',
    country: 'KE',
    countryName: 'Kenya',
  },
  areaServed: 'Nairobi',
  // TODO(esquire): add Google Maps link / coordinates once the Google Business Profile is verified.
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Esquire+Diversity+LTD+Mumias+Road+Nairobi',
  // TODO(esquire): confirm opening hours before adding them to schema.
  // TODO(esquire): add social profile URLs (Facebook, Instagram, TikTok) for schema sameAs.
  sameAs: [] as string[],
  // TODO(esquire): NCA registration number and category, once Esquire supplies the certificate.
  ncaRegistration: '' as string,
} as const;

/**
 * Claims from the old site. Keep them ONLY until Esquire confirms them.
 * TODO(esquire): confirm "100+ customers served" and "15+ years". Set `confirmed: true` once they do,
 * or delete the line if it is not accurate.
 */
export const CLAIMS = [
  { value: '100+', label: 'customers served', confirmed: false },
  { value: '15+', label: 'years of industry experience', confirmed: false },
];

/** Main navigation. */
export const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

/** Budget and timeline options for the quote form (ranges only, not prices). */
export const BUDGET_RANGES = [
  'Under KES 250,000',
  'KES 250,000 – 750,000',
  'KES 750,000 – 2 million',
  'KES 2 – 5 million',
  'Over KES 5 million',
  'Not sure yet',
];

export const TIMELINES = [
  'As soon as possible',
  'Within 1–3 months',
  'In 3–6 months',
  'Just planning for now',
];

export const PROPERTY_TYPES = [
  'Apartment',
  'House / maisonette',
  'Office',
  'Shop / restaurant / commercial',
  'Plot (new build)',
  'Other',
];

/** How every job runs. Shown on the home page and every service page. */
export const PROCESS = [
  { title: 'Site visit', text: 'We visit, measure and listen to what you want and what budget you are working with.' },
  { title: '3D design', text: 'You see the space in 3D and request changes before any money goes into materials.' },
  { title: 'Itemised quote (BoQ)', text: 'A Bill of Quantities lists every item and cost, so there are no surprises.' },
  { title: 'Build', text: 'Our team does the work and manages every trade, with regular updates.' },
  { title: 'Handover', text: 'We walk through the finished space with you and fix anything that is not right.' },
  { title: 'After-sales support', text: 'We stay available for any issues after handover.' },
];
// TODO(esquire): confirm the site visit is free, and whether the 3D design is charged.
