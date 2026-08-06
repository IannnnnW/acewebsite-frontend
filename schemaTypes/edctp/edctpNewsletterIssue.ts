import { defineType, defineField } from 'sanity'
import { localeString, localeText } from './_localeHelpers'

export default defineType({
  name: 'edctpNewsletterIssue',
  title: 'Newsletter Issue',
  type: 'document',
  fields: [
    localeString('issueTitle', 'Issue Title', 'e.g. "Issue 3 — January 2026"'),
    defineField({ name: 'publishedDate', title: 'Published Date', type: 'date', validation: (Rule) => Rule.required() }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    localeText('summary', 'Summary', 3),
    defineField({ name: 'pdfFile', title: 'Newsletter PDF', type: 'file', validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: 'issueTitle.en', media: 'coverImage' },
    prepare({ title, media }) {
      return { title: title || 'Untitled', media }
    },
  },
})
