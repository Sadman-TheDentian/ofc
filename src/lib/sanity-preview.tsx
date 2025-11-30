'use client'

import {createClient} from 'next-sanity'
import { projectId, dataset, apiVersion } from './sanity-client'

// This is the SANITY CLIENT for CLIENT-SIDE QUERIES
// It is configured for perspectives, stega, and live updates
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
})
