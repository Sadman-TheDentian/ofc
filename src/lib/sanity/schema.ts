import { type SchemaTypeDefinition } from 'sanity'
import blockContent from './schemas/blockContent'
import post from './schemas/post'
import author from './schemas/author'
import caseStudy from './schemas/caseStudy'
import news from './schemas/news'
import partner from './schemas/partner'
import threatReport from './schemas/threatReport'
import whitePaper from './schemas/whitePaper'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, caseStudy, news, partner, threatReport, whitePaper, blockContent],
}
