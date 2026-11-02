import { defineField, defineType } from 'sanity'

export const newsletterIssueType = defineType({
  name: 'newsletterIssue',
  title: 'Newsletter Issue',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Issue Title',
      type: 'string',
      description: 'e.g. "Issue 3: Genomics in Focus". The month and year are shown automatically from the Published Date.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'The issue\'s web address, e.g. /newsletter/issue-3-genomics-in-focus. Click "Generate".',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pdfFile',
      title: 'Newsletter PDF',
      type: 'file',
      description: 'Export with real (selectable) text and compress for the web — aim for 5–8 MB so readers on mobile data can open it.',
      options: { accept: 'application/pdf' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Usually the newsletter\'s front page. Shown on the newsletter list and when the issue is shared on social media.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Two or three sentences on what this issue covers. Helps readers and search engines find it.',
    }),
    defineField({
      name: 'highlights',
      title: 'In This Issue',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Optional: the main stories, one per line (up to 6).',
      validation: (rule) => rule.max(6),
    }),
  ],
  orderings: [
    { title: 'Published Date, Newest', name: 'publishedDesc', by: [{ field: 'publishedDate', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', date: 'publishedDate', media: 'coverImage' },
    prepare({ title, date, media }) {
      return { title: title || 'Untitled issue', subtitle: date, media }
    },
  },
})
