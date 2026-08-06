import { defineType, defineField } from 'sanity'
import { localeString, localeText } from './_localeHelpers'

export default defineType({
  name: 'edctpPublication',
  title: 'Publication',
  type: 'document',
  fields: [
    localeString('title', 'Title'),
    defineField({ name: 'authors', title: 'Authors', type: 'string' }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: ['journal', 'book', 'conference', 'report'].map((v) => ({
          title: v.charAt(0).toUpperCase() + v.slice(1),
          value: v,
        })),
        layout: 'radio',
      },
    }),
    defineField({ name: 'publishedAt', title: 'Publication Date', type: 'date' }),
    defineField({ name: 'doi', title: 'DOI', type: 'string' }),
    defineField({ name: 'url', title: 'External Link', type: 'url' }),
    localeText('abstract', 'Abstract', 4),
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'authors' },
    prepare({ title, subtitle }) {
      return { title: title || 'Untitled', subtitle }
    },
  },
})
