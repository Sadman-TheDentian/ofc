'use client'

/**
 * This route is responsible for the Sanity Studio user interface
 *
 * It's a client component because it specifies the use of React hooks, which are only available in the browser
 */

import {NextStudio} from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
