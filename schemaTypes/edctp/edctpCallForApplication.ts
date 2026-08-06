import { defineType, defineField } from 'sanity'
import { localeString, localeText, localeStringArray } from './_localeHelpers'

export default defineType({
  name: 'edctpCallForApplication',
  title: 'Opportunity',
  type: 'document',
  fields: [
    localeString('title', 'Title'),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Open', value: 'open' },
          { title: 'Closed', value: 'closed' },
          { title: 'Upcoming', value: 'upcoming' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    localeText('description', 'Description', 4),
    localeStringArray('eligibility', 'Eligibility Criteria'),
    defineField({ name: 'deadline', title: 'Application Deadline', type: 'datetime' }),
    defineField({ name: 'applicationLink', title: 'Application Link', type: 'url' }),
    defineField({ name: 'callDocument', title: 'Call Document (PDF)', type: 'file' }),
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'status' },
    prepare({ title, subtitle }) {
      return { title: title || 'Untitled', subtitle }
    },
  },
})
