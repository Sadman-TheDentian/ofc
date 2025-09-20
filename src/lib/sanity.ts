import { createClient } from 'next-sanity'

export const projectId = "xep9w436"
export const dataset = "production"
export const apiVersion = "2024-05-01"


export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // if you're using ISR or only static generation, set this to false
})
