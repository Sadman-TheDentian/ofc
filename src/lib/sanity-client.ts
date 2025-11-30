
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const projectId = '9x2bbr6u';
export const dataset = 'production';
export const apiVersion = '2024-01-01';
export const useCdn = process.env.NODE_ENV === 'production';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  if (!source) {
    return undefined;
  }
  return builder.image(source);
}
