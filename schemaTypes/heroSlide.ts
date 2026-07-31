import { defineType, defineField } from 'sanity'

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Carousel Slides',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Slide Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Short tagline or description',
    }),
    defineField({
      name: 'description',
      title: 'Slide Context',
      type: 'text',
      rows: 2,
      description: 'One or two sentences describing what is shown in the background image for this slide (e.g. "Researchers at ACE\'s HPC facility analyse genomic data to accelerate disease research across Africa."). Keep it under 180 characters.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'VR Lab', value: 'vr' },
          { title: 'HPC Cluster', value: 'hpc' },
          { title: 'Research', value: 'research' },
          { title: 'Training & Learning', value: 'training' },
          { title: 'Announcements', value: 'announcement' },
          { title: 'Partnerships', value: 'partnership' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Slide Image',
      type: 'image',
      description: 'Recommended: 1920 × 1080px (16:9 ratio), max 3MB. This image fills the full-width homepage hero — use high-resolution, wide landscape photos.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
      validation: (Rule) => Rule.custom((value, context) => {
        const parent = context.parent as { mediaType?: string }
        if (!parent?.mediaType || parent.mediaType === 'image') {
          return value ? true : 'Image is required for Image slides'
        }
        return true
      }),
    }),
    defineField({
      name: 'video',
      title: 'Background Video',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      description: 'MP4 or WebM, no audio track, max ~10MB, ideally 1280px wide. Compress before uploading — Sanity does not transcode video.',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image (Video Fallback)',
      type: 'image',
      description: 'Shown while the video loads, on slow connections, and for visitors with reduced-motion settings enabled. Required when Media Type is Video.',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'stickerImage',
      title: 'Sticker / Badge',
      type: 'image',
      description: 'Optional logo or badge overlaid on this slide\'s image or video (e.g. the GitHub logo on a slide showcasing ACE\'s open-source work, or a partner/event logo like "Google I/O"). Leave empty for no sticker. Recommended: transparent PNG, roughly 300x150px.',
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Learn More',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'URL or path (e.g., /vr-lab, /hpc, /research)',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which slides appear (lower numbers first)',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this slide in the carousel',
      initialValue: true,
      }),
      ],
      orderings: [
        {
          title: 'Order',
          name: 'order',
          by: [{ field: 'order', direction: 'asc' }],
        },
      ],
    preview: {
      select: {
        title: 'title',
        subtitle: 'category',
        media: 'image',
        order: 'order',
      },
      prepare(selection) {
        const { title, subtitle, media, order } = selection
        return {
          title: `${order}. ${title}`,
          subtitle: subtitle,
          media: media,
        }
      },
  },
})