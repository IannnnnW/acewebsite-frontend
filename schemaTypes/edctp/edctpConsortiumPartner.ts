import { defineType, defineField } from 'sanity'
import { localeString, localeText } from './_localeHelpers'

export default defineType({
  name: 'edctpConsortiumPartner',
  title: 'Consortium Partner',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Institution Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'group',
      title: 'Partner Group',
      type: 'string',
      description: 'Which group this partner appears under in the Partners section.',
      options: {
        list: [
          { title: 'Beneficiary', value: 'beneficiary' },
          { title: 'Partner Site', value: 'partnerSite' },
          { title: 'Training Site', value: 'trainingSite' },
        ],
        layout: 'radio',
      },
      initialValue: 'beneficiary',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', description: 'Recommended: 400×200px, max 500KB.' }),
    defineField({ name: 'country', title: 'Country', type: 'string' }),
    defineField({ name: 'latitude', title: 'Latitude', type: 'number', description: 'Exact map pin location. If left blank, the map falls back to the country’s approximate center.' }),
    defineField({ name: 'longitude', title: 'Longitude', type: 'number', description: 'Exact map pin location. If left blank, the map falls back to the country’s approximate center.' }),
    localeString('role', 'Role / Contribution'),
    defineField({ name: 'website', title: 'Website', type: 'url' }),
    localeText('description', 'Short Description', 2),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
