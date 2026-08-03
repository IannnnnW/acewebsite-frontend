// sanity/schemas/event.ts
import { defineField, defineType } from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
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
      title: 'Event Date',
      description: 'The start date/time. For a single-day event this is the only date needed.',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date (for multi-day events)',
      description: 'Optional — set this for events that run over more than one day (e.g. a two-week workshop from 18 March to 1 April). Leave blank for single-day events.',
      type: 'datetime',
      validation: (Rule) => Rule.min(Rule.valueOfField('date')).error('End date must be on or after the event date'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Workshop', value: 'workshop' },
          { title: 'Seminar', value: 'seminar' },
          { title: 'Conference', value: 'conference' },
          { title: 'Training', value: 'training' },
          { title: 'Webinar', value: 'webinar' },
          { title: 'Networking', value: 'networking' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      description: 'Recommended: 1200 × 675px (16:9 ratio), max 2MB. Used as the event banner and card thumbnail.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      description: 'Maximum number of attendees',
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
    }),
    defineField({
      name: 'agendaFile',
      title: 'Agenda (PDF)',
      type: 'file',
      description: 'The event agenda / programme, offered as a download on the event page.',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'conceptNoteFile',
      title: 'Concept Note (PDF)',
      type: 'file',
      description: 'The event concept note, offered as a download on the event page.',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'outputs',
      title: 'Event Outputs',
      type: 'array',
      description: 'Links to what came out of the event — GitHub repos, published papers, datasets, slides. Shown on past events.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'GitHub Repository', value: 'github' },
                  { title: 'Published Paper', value: 'paper' },
                  { title: 'Dataset', value: 'dataset' },
                  { title: 'Slides', value: 'slides' },
                  { title: 'Report', value: 'report' },
                  { title: 'Other', value: 'other' },
                ],
              },
              initialValue: 'other',
            }),
            defineField({ name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Short Description', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'type' },
          },
        },
      ],
    }),
    defineField({
      name: 'relatedBlogs',
      title: 'Related Blog Posts',
      type: 'array',
      description: 'Blog posts about this event — shown as "Related Stories" on the event page.',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
    }),
    defineField({
      name: 'tweetUrls',
      title: 'Tweets (X Posts)',
      type: 'array',
      description: 'Links to X/Twitter posts about this event (e.g. https://x.com/ACEUganda/status/123…). Rendered as an embedded tweet feed, mainly for past events.',
      of: [{ type: 'url' }],
    }),
    defineField({
      name: 'status',
      title: 'Event Status',
      type: 'string',
      description: 'Manually controls which stage this event is shown in on the site — move it through Upcoming → Ongoing → Past yourself as the event progresses. Not derived automatically from the date.',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Past', value: 'past' },
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      initialValue: false,
      description: 'Display this event prominently on the events page',
    }),
    defineField({
      name: 'galleryTitle',
      title: 'Gallery Section Title',
      type: 'string',
      description: 'Optional. Defaults to "Event Gallery" if left blank.',
    }),
    defineField({
      name: 'gallery',
      title: 'Event Gallery',
      type: 'array',
      description: 'Photos from the event. Recommended: JPEG, minimum 1200px wide, max 5MB per image.',
      of: [
        {
          type: 'object',
          name: 'galleryImage',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption shown below the image in the lightbox',
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility and SEO',
              validation: (Rule) => Rule.required().warning('Alt text is important for accessibility'),
            }),
            defineField({
              name: 'credit',
              title: 'Photo Credit',
              type: 'string',
              description: 'Photographer or source (e.g. "Photo: John Doe")',
            }),
          ],
          preview: {
            select: {
              title: 'caption',
              subtitle: 'credit',
              media: 'image',
            },
            prepare({ title, subtitle, media }: { title: string; subtitle: string; media: any }) {
              return {
                title: title || 'Untitled photo',
                subtitle: subtitle || '',
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      category: 'category',
      status: 'status',
      media: 'image',
    },
    prepare(selection) {
      const { title, date, category, status } = selection
      return {
        title: title,
        subtitle: `${status ? `[${status}] ` : ''}${category} - ${new Date(date).toLocaleDateString()}`,
        media: selection.media,
      }
    },
  },
})