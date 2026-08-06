import { defineType, defineField } from 'sanity'
import { localeString, localeText } from './_localeHelpers'

export default defineType({
  name: 'edctpProjectType',
  title: 'Project / Data Type',
  type: 'document',
  fields: [
    localeString('title', 'Title'),
    localeText('description', 'Description', 3),
    defineField({
      name: 'icon',
      title: 'Icon Reference',
      type: 'string',
      description: 'A short keyword (e.g. "genomics", "epidemiology") used to pick a matching icon on the frontend.',
    }),
    defineField({ name: 'exampleDatasets', title: 'Example Datasets', type: 'array', of: [{ type: 'string' }] }),
  ],
  preview: {
    select: { title: 'title.en' },
    prepare({ title }) {
      return { title: title || 'Untitled' }
    },
  },
})
