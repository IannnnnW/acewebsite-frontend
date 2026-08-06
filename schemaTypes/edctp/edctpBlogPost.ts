import { defineType, defineField } from 'sanity'
import { localeString, localeText, localeBlock } from './_localeHelpers'

export default defineType({
  name: 'edctpBlogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    localeString('title', 'Title'),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      // title is now a locale object — slug generates from the English version
      options: { source: (doc: any) => doc.title?.en },
    }),
    localeText('excerpt', 'Excerpt', 2),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
    localeBlock('body', 'Body'),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'datetime' }),
  ],
  preview: {
    select: { title: 'title.en', media: 'featuredImage' },
    prepare({ title, media }) {
      return { title: title || 'Untitled', media }
    },
  },
})
