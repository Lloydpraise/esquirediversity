import { SITE } from '../data/site';

/**
 * Builds a wa.me link with a pre-filled message, so every WhatsApp chat arrives labelled
 * with the service and the page it came from.
 *
 * Example:
 *   waLink({ service: 'Kitchen cabinets', page: '/kitchen-cabinets-nairobi' })
 *   -> https://wa.me/254722326329?text=Hello%20Esquire%20Diversity...
 */
export function waMessage(opts: { service?: string; page?: string; extra?: string } = {}): string {
  const parts = ['Hello Esquire Diversity!'];
  if (opts.service) {
    parts.push(`I'm interested in ${opts.service}.`);
  } else {
    parts.push("I'd like to discuss a project.");
  }
  if (opts.extra) parts.push(opts.extra);
  // The page tag lets Esquire see which page a chat came from.
  if (opts.page) parts.push(`(via ${SITE.url.replace('https://', '')}${opts.page === '/' ? '' : opts.page})`);
  return parts.join(' ');
}

export function waLink(opts: { service?: string; page?: string; extra?: string } = {}): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(waMessage(opts))}`;
}

export const telLink = `tel:${SITE.phoneE164}`;
