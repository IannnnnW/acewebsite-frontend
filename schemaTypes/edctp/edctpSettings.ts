import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'edctpSettings',
  title: 'Site Settings',
  type: 'document',
  description: 'Site-wide identity and contact details. Page content lives in the per-page documents (Home Page, About Page, …).',
  fields: [
    defineField({ name: 'programName', title: 'Program Name', type: 'string', initialValue: 'IDM Africa' }),
    defineField({ name: 'logo', title: 'Program Logo', type: 'image', description: 'IDI + Makerere logo. Recommended: 400×160px PNG, transparent background.' }),
    defineField({
      name: 'edctpAcknowledgementLogo',
      title: 'EDCTP Acknowledgement Logo',
      type: 'image',
      description: 'The official EDCTP logo, shown in the footer as a funding acknowledgement.',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      initialValue: '0312 211 444',
    }),
    defineField({
      name: 'idiSocials',
      title: 'IDI Uganda Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
