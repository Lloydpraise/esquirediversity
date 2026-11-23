/**
 * Real Esquire Diversity project photos (from the old /gallery page).
 * Each photo is tagged with the service pages it should appear on.
 *
 * TODO(esquire): for each photo, get the area (estate/neighbourhood), size and scope,
 * then move the best ones into proper case studies in src/content/projects/.
 * Alt text deliberately does not name an area until Esquire confirms it.
 */
import type { ImageMetadata } from 'astro';
import bathroom from '../assets/projects/bathroom-tiling-toilet-installation.jpeg';
import wardrobeDesk from '../assets/projects/built-in-wardrobe-study-desk.jpeg';
import bedroomWardrobes from '../assets/projects/bedroom-wardrobes-gypsum-ceiling.jpeg';
import uKitchenInstall from '../assets/projects/u-shaped-kitchen-cabinets-installation.jpeg';
import bungalow from '../assets/projects/bungalow-house-construction-in-progress.jpeg';
import greyKitchen from '../assets/projects/grey-kitchen-cabinets-wall-units.jpeg';
import woodKitchen from '../assets/projects/wood-finish-kitchen-cabinets.jpeg';
import galleyKitchen from '../assets/projects/galley-kitchen-gypsum-ceiling.jpeg';
import greyWhiteKitchen from '../assets/projects/grey-white-kitchen-cabinets-fitting.jpeg';
import uGreyKitchen from '../assets/projects/u-shaped-grey-kitchen-fitting.jpeg';
import whiteKitchen from '../assets/projects/white-l-shaped-kitchen-cabinets.jpeg';
import ceiling from '../assets/projects/gypsum-ceiling-led-lighting-tv-wall.jpeg';

export type Photo = {
  src: ImageMetadata;
  alt: string;
  caption: string;
  status: 'completed' | 'in-progress';
  services: string[]; // service slugs
};

export const PHOTOS: Photo[] = [
  {
    src: whiteKitchen,
    alt: 'White L-shaped kitchen cabinets with a dark worktop, fitted by Esquire Diversity',
    caption: 'White L-shaped kitchen with dark worktop',
    status: 'completed',
    services: ['kitchen-cabinets-nairobi', 'home-renovation-nairobi'],
  },
  {
    src: ceiling,
    alt: 'Gypsum ceiling with a circular tray, LED downlights and chandelier above a TV wall, by Esquire Diversity',
    caption: 'Gypsum ceiling, LED downlights and TV wall',
    status: 'completed',
    services: ['gypsum-ceilings-lighting-nairobi', 'interior-design-nairobi'],
  },
  {
    src: bedroomWardrobes,
    alt: 'Built-in white bedroom wardrobes and desk under a gypsum ceiling, by Esquire Diversity',
    caption: 'Bedroom wardrobes, desk and gypsum ceiling',
    status: 'completed',
    services: ['interior-design-nairobi', 'kitchen-cabinets-nairobi', 'gypsum-ceilings-lighting-nairobi'],
  },
  {
    src: wardrobeDesk,
    alt: 'Built-in wardrobe with an attached study desk and drawers, made by Esquire Diversity',
    caption: 'Built-in wardrobe with study desk',
    status: 'completed',
    services: ['kitchen-cabinets-nairobi', 'interior-design-nairobi'],
  },
  {
    src: bathroom,
    alt: 'Bathroom with floor-to-ceiling wall tiles and a new toilet, finished by Esquire Diversity',
    caption: 'Bathroom wall tiling and fittings',
    status: 'completed',
    services: ['bathroom-renovation-nairobi', 'home-renovation-nairobi'],
  },
  {
    src: woodKitchen,
    alt: 'Wood-finish kitchen cabinets with wood-look floor, installed by Esquire Diversity',
    caption: 'Wood-finish kitchen cabinets',
    status: 'in-progress',
    services: ['kitchen-cabinets-nairobi', 'flooring-nairobi'],
  },
  {
    src: galleyKitchen,
    alt: 'Galley kitchen with dark base cabinets, white wall units and gypsum ceiling, by Esquire Diversity',
    caption: 'Galley kitchen with gypsum ceiling',
    status: 'in-progress',
    services: ['kitchen-cabinets-nairobi', 'gypsum-ceilings-lighting-nairobi'],
  },
  {
    src: greyKitchen,
    alt: 'Grey kitchen base cabinets and wall units being installed by Esquire Diversity',
    caption: 'Grey kitchen cabinets and wall units',
    status: 'in-progress',
    services: ['kitchen-cabinets-nairobi'],
  },
  {
    src: uKitchenInstall,
    alt: 'U-shaped kitchen cabinets during installation by Esquire Diversity',
    caption: 'U-shaped kitchen during installation',
    status: 'in-progress',
    services: ['kitchen-cabinets-nairobi', 'home-renovation-nairobi'],
  },
  {
    src: greyWhiteKitchen,
    alt: 'Grey base and white wall kitchen cabinets being fitted by Esquire Diversity',
    caption: 'Grey and white kitchen cabinets being fitted',
    status: 'in-progress',
    services: ['kitchen-cabinets-nairobi'],
  },
  {
    src: uGreyKitchen,
    alt: 'U-shaped grey kitchen with white wall cabinets mid-installation by Esquire Diversity',
    caption: 'U-shaped grey kitchen mid-installation',
    status: 'in-progress',
    services: ['kitchen-cabinets-nairobi'],
  },
  {
    src: bungalow,
    alt: 'Bungalow under construction by Esquire Diversity, walls and roof complete',
    caption: 'Bungalow construction in progress',
    status: 'in-progress',
    services: ['house-construction-kenya'],
  },
];

export const photosFor = (serviceSlug: string) => PHOTOS.filter((p) => p.services.includes(serviceSlug));
