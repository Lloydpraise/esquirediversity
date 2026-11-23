// Astro configuration. Docs: https://docs.astro.build/en/reference/configuration-reference/
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // The canonical host. Used for canonical URLs, Open Graph URLs and the sitemap.
  site: 'https://esquirediversity.co.ke',

  // Static HTML output, the same as the old site. Netlify just serves the files.
  output: 'static',

  // URLs without a trailing slash: /kitchen-cabinets-nairobi (not /kitchen-cabinets-nairobi/).
  // 'file' builds kitchen-cabinets-nairobi.html, which Netlify serves at the clean URL.
  trailingSlash: 'never',
  build: { format: 'file' },

  integrations: [
    sitemap({
      // Keep thank-you style or utility pages out of the sitemap here if we add any.
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
