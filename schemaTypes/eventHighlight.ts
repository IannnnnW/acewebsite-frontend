// sanity/schemas/eventHighlight.ts
import { defineField, defineType } from 'sanity'

export const eventHighlightType = defineType({
  name: 'eventHighlight',
  title: 'Event Highlight',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Recommended: 1200 × 675px (16:9 ratio), max 2MB. Shown on the homepage event highlight section.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'keyPoints',
      title: 'Key Points',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which highlights should be displayed',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      badge: 'badge',
      date: 'date',
      media: 'image',
    },
    prepare(selection) {
      const { title, badge, date } = selection
      return {
        title: title,
        subtitle: `${badge} - ${new Date(date).toLocaleDateString()}`,
        media: selection.media,
      }
    },
  },
  
})