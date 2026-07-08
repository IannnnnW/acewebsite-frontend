import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'socials',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({name: 'twitter', title: 'Twitter / X', type: 'url'}),
        defineField({name: 'facebook', title: 'Facebook', type: 'url'}),
        defineField({name: 'linkedin', title: 'LinkedIn', type: 'url'}),
        defineField({name: 'youtube', title: 'YouTube', type: 'url'}),
        defineField({name: 'instagram', title: 'Instagram', type: 'url'}),
        defineField({name: 'github', title: 'GitHub', type: 'url'}),
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'email',
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      description: 'The permanent tagline shown on the homepage hero. This text never changes between slides. Default: "Advancing Health through Innovation"',
      initialValue: 'Advancing Health through Innovation',
    }),
    defineField({
      name: 'heroInstitutionLine',
      title: 'Hero Institution Label',
      type: 'string',
      description: 'The small label shown above the tagline. Default: "African Center of Excellence in Bioinformatics & Data Intensive Sciences"',
      initialValue: 'African Center of Excellence in Bioinformatics & Data Intensive Sciences',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
