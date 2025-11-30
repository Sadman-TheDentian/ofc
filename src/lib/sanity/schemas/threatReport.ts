
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'threatReport',
  title: 'Threat Report',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'blockContent',
    }),
    defineField({
        name: 'fileURL',
        title: 'File URL',
        type: 'file',
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
