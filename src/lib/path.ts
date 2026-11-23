/**
 * Clean URL path for the current page: "/kitchen-cabinets-nairobi" (no .html, no trailing slash).
 * Astro builds files as page.html, so Astro.url.pathname can include ".html" at build time.
 */
export function cleanPath(pathname: string): string {
  return pathname.replace(/\.html$/, '').replace(/\/index$/, '').replace(/\/$/, '') || '/';
}
