import { defineType, defineField } from 'sanity'

export const trainingProgramsPageSettings = defineType({
  name: 'trainingProgramsPageSettings',
  title: 'Academic Training — Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'Academic Training',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
      initialValue: 'Build your career in bioinformatics and data science with world-class training programs designed for the next generation of African scientists',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'Recommended: 1920×800px, max 2MB. Shown as the backdrop behind the page title.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaHeading',
      title: 'Bottom CTA Heading',
      type: 'string',
      initialValue: 'Ready to Apply?',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'Bottom CTA Description',
      type: 'text',
      rows: 2,
      initialValue: 'Join our community of researchers and scientists making a difference in Africa',
    }),
    defineField({
      name: 'ctaPrimaryText',
      title: 'Primary Button Text',
      type: 'string',
      initialValue: 'Contact Admissions',
    }),
    defineField({
      name: 'ctaPrimaryLink',
      title: 'Primary Button Link',
      type: 'string',
      initialValue: '/contact',
    }),
    defineField({
      name: 'ctaSecondaryText',
      title: 'Secondary Button Text',
      type: 'string',
      initialValue: 'Learn More',
    }),
    defineField({
      name: 'ctaSecondaryLink',
      title: 'Secondary Button Link',
      type: 'string',
      initialValue: '/about',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Academic Training — Page Settings' }
    },
  },
})
