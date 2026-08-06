import { defineType, defineField } from 'sanity'
import { localeString, localeText } from './_localeHelpers'

export default defineType({
  name: 'edctpFellow',
  title: 'Fellow',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'cohort', title: 'Cohort / Year', type: 'string' }),
    defineField({ name: 'homeInstitution', title: 'Home Institution', type: 'string' }),
    defineField({ name: 'country', title: 'Country', type: 'string' }),
    localeString('researchFocus', 'Research Focus'),
    localeString('projectTitle', 'Training Project Title'),
    localeText('bio', 'Short Bio', 3),
  ],
})
