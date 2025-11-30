'use client'

import {createClient} from 'next-sanity'
import { projectId, dataset, apiVersion } from './sanity-client'

// This is the SANITY CLIENT for CLIENT-SIDE QUERIES
export const sanityPreviewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  // useCdn: true,
  token: process.env.SANITY_API_TOKEN,
})
