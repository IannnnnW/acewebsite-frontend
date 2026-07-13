import {defineField, defineType} from 'sanity'

export const socialPostType = defineType({
  name: 'socialPost',
  title: 'Social Media Post',
  type: 'document',
  description: 'A link to a post on X (Twitter), LinkedIn, etc. shown in the running social feed on the homepage.',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'X (Twitter)', value: 'twitter'},
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'radio',
      },
      initialValue: 'twitter',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Post URL',
      type: 'url',
      description: 'Full link to the post (e.g. https://x.com/ACEUganda/status/1234567890). X posts render as embedded tweets; other platforms render as link cards.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Short label for the post. Required for non-X platforms (shown on the link card).',
    }),
    defineField({
      name: 'postDate',
      title: 'Post Date',
      type: 'datetime',
      description: 'Used to order the feed (newest first).',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'postDateDesc',
      by: [{field: 'postDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'caption', subtitle: 'platform', url: 'url'},
    prepare({title, subtitle, url}) {
      return {title: title || url || 'Untitled post', subtitle}
    },
  },
})
