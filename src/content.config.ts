/**
 * Content collections: each service, project and guide is a Markdown file with
 * "frontmatter" (the YAML block between --- lines at the top). The schemas below
 * check that every file has the fields the page templates need, so a typo fails
 * the build instead of silently breaking a page.
 *
 * Add a page = add a .md file in src/content/<collection>/. No HTML needed.
 * Docs: https://docs.astro.build/en/guides/content-collections/
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.object({
  q: z.string(),
  a: z.string(),
  // todo: true = the answer needs Esquire's facts. Shown only in `npm run dev`,
  // hidden on the live site and left out of FAQ schema.
  todo: z.boolean().default(false),
});

const services = defineCollection({
  // The file name becomes the URL: kitchen-cabinets-nairobi.md -> /kitchen-cabinets-nairobi
  loader: glob({ pattern: '*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(), // "Kitchen cabinets" — used in nav, cards, WhatsApp text
      order: z.number(), // position in menus and the services hub
      metaTitle: z.string(), // <title>, about 50–60 characters
      metaDescription: z.string(), // about 140–160 characters
      h1: z.string(),
      // TODO(esquire) prices: e.g. "From KES 18,000 per running metre". Empty = not shown.
      priceCue: z.string().default(''),
      summary: z.string(), // one or two sentences for cards
      heroImage: image().optional(),
      heroAlt: z.string().default(''),
      included: z.array(z.object({ title: z.string(), text: z.string() })),
      // Price table rows. Leave empty until Esquire supplies real prices.
      prices: z
        .array(z.object({ item: z.string(), unit: z.string(), price: z.string() }))
        .default([]),
      priceFactors: z.array(z.string()).default([]),
      faqs: z.array(faq).default([]),
      related: z.array(z.string()).default([]), // slugs of related services
      guide: z.string().optional(), // slug of the matching cost guide
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      draft: z.boolean().default(true), // draft projects are not built
      services: z.array(z.string()), // service slugs this project shows on
      location: z.string().default(''), // e.g. "Kileleshwa, Nairobi"
      area: z.string().default(''), // e.g. "14 m²"
      scope: z.string().default(''),
      year: z.number().nullish(),
      summary: z.string().default(''),
      cover: image(),
      coverAlt: z.string(),
      gallery: z.array(z.object({ src: image(), alt: z.string() })).default([]),
    }),
});

const guides = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    service: z.string(), // slug of the related service page
    draft: z.boolean().default(true),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { services, projects, guides };
