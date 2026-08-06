import { defineType, defineField } from 'sanity'
import { localeString, localeText } from './_localeHelpers'

export default defineType({
  name: 'edctpEvent',
  title: 'Training Event',
  type: 'document',
  fields: [
    localeString('title', 'Title'),
    localeText('description', 'Description', 3),
    defineField({ name: 'startDateTime', title: 'Start Date & Time', type: 'datetime', validation: (Rule) => Rule.required() }),
    defineField({ name: 'endDateTime', title: 'End Date & Time', type: 'datetime' }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Physical address or "Virtual"',
    }),
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'location' },
    prepare({ title, subtitle }) {
      return { title: title || 'Untitled', subtitle }
    },
  },
})
