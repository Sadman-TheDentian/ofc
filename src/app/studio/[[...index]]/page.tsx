'use client'

/**
 * This route is responsible for the Sanity Studio user interface
 *
 * You can access it on:
 * - http://localhost:3000/studio
 * - https://YOUR_DOMAIN/studio
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
