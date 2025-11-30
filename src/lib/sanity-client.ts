import { createClient } from "sanity";

export const projectId = "9x2bbr6u";
export const dataset = "production";
export const apiVersion = "2024-01-01";

// This is the SANITY CLIENT for FETCHING DATA on the SERVER
// It is NOT configured for perspectives, stega, or live updates
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
