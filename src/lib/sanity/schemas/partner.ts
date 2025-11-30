
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
})
