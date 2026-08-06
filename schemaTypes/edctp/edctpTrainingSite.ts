import { defineType, defineField } from 'sanity'
import { localeText } from './_localeHelpers'

export default defineType({
  name: 'edctpTrainingSite',
  title: 'Training Site',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Site Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'institution', title: 'Host Institution', type: 'string' }),
    defineField({ name: 'country', title: 'Country', type: 'string' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    localeText('description', 'Description', 3),
  ],
})
