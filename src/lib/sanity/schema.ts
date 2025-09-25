
import { type SchemaTypeDefinition } from 'sanity'

import author from './schemas/author'
import blockContent from './schemas/blockContent'
import caseStudy from './schemas/case-study'
import post from './schemas/post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, caseStudy, blockContent],
}
