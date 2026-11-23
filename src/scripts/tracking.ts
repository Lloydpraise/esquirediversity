/**
 * Tracking helpers, loaded on every page by BaseLayout.
 *
 * Pushes these events to window.dataLayer for Google Tag Manager:
 *   whatsapp_click, phone_click, quote_start, generate_lead
 * Each event carries `service` and `page`. In GTM, create a Custom Event trigger per event name
 * and send it to GA4 (mark generate_lead + whatsapp_click as key events).
 *
 * It also remembers the landing page's referrer and UTM parameters for this visit, so the
 * quote form can save where the lead came from.
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

window.dataLayer = window.dataLayer || [];

/** Push one event. `service` falls back to the page's default service (set on <body data-service>). */
export function track(event: string, params: Record<string, unknown> = {}) {
  const service = (params.service as string) || document.body.dataset.service || '';
  window.dataLayer.push({ event, ...params, service, page: location.pathname });
}

// ---- First-touch attribution for this browser session ----
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
const STORE_KEY = 'ed_attribution';

function safeGet(): Record<string, string> | null {
  try { return JSON.parse(sessionStorage.getItem(STORE_KEY) || 'null'); } catch { return null; }
}

(function rememberAttribution() {
  const params = new URLSearchParams(location.search);
  const hasUtm = UTM_KEYS.some((k) => params.get(k));
  if (safeGet() && !hasUtm) return; // keep the first landing of this visit
  const data: Record<string, string> = {
    landing_page: location.pathname,
    referrer: document.referrer && !document.referrer.startsWith(location.origin) ? document.referrer : '',
  };
  UTM_KEYS.forEach((k) => { data[k] = params.get(k) || ''; });
  try { sessionStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch { /* private mode: ignore */ }
})();

export function getAttribution(): Record<string, string> {
  return safeGet() || { referrer: document.referrer || '' };
}

// ---- Click tracking for every WhatsApp and phone link on the site ----
document.addEventListener('click', (e) => {
  const link = (e.target as HTMLElement).closest('a');
  if (!link) return;
  const href = link.getAttribute('href') || '';
  const service = link.dataset.service || '';
  if (href.startsWith('https://wa.me/')) {
    track('whatsapp_click', { service });
    window.fbq?.('track', 'Contact');
  } else if (href.startsWith('tel:')) {
    track('phone_click', { service });
    window.fbq?.('track', 'Contact');
  }
});
