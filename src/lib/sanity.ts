import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Go to https://www.sanity.io/manage and create a new project.
// Add your project ID here.
// You will also need to add it to sanity.config.ts and sanity.cli.ts.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = '2023-05-03';

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: false, // if you're using ISR or only static generation at build time, you can set this to true
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
