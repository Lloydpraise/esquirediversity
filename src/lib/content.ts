/** Small helpers for reading content collections in pages. */
import { getCollection } from 'astro:content';

// Draft entries are visible in `npm run dev` (so you can preview them) but never built for the live site.
const isLive = (draft: boolean) => import.meta.env.DEV || !draft;

export async function getServices() {
  return (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);
}

export async function getProjects() {
  return (await getCollection('projects')).filter((p) => isLive(p.data.draft));
}

export async function getGuides() {
  return (await getCollection('guides')).filter((g) => isLive(g.data.draft));
}
