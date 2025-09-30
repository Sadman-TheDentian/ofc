
import { type SchemaTypeDefinition } from 'sanity'

import author from './schemas/author'
import blockContent from './schemas/blockContent'
import caseStudy from './schemas/case-study'
import news from './schemas/news'
import partner from './schemas/partner'
import post from './schemas/post'
import threatReport from './schemas/threat-report'
import whitePaper from './schemas/white-paper'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, news, author, caseStudy, threatReport, whitePaper, partner, blockContent],
}
