import {defineField, defineType} from 'sanity'

export const personType = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
    }),
    defineField({
      name: 'role',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'researchInterests',
      title: 'Research Interests',
      type: 'array',
      description: 'Add each research interest as a separate tag (e.g. "Human Genomics", "Cancer Genomics", "AMR")',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'bio',
      type: 'text',
    }),
    defineField({
      name: 'image',
      type: 'image',
      description: 'Recommended: 500 × 500px (1:1 square), max 1MB. Use a professional headshot with a neutral background.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'staffCategory',
      title: 'Staff Category',
      type: 'string',
      options: {
        list: [
          {title: 'Admin', value: 'admin'},
          {title: 'HPC Engineering', value: 'it'},
          {title: 'Software Development', value: 'software_development'},
          {title: 'Interns', value: 'interns'},
          {title: 'PostDoc Fellows', value: 'postdoc_fellows'},
          {title: 'MSc Fellows', value: 'msc_fellows'},
          {title: 'PhD Fellows', value: 'phd_fellows'},
          {title: 'Bioinformatics Researchers', value: 'bioinformatics_researchers'},
          {title: 'AI', value: 'ai'},
          {title: 'Alumni', value: 'alumni'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'email',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn Profile URL',
      type: 'url',
    }),
    defineField({
      name: 'twitter',
      title: 'X (Twitter) Profile URL',
      type: 'url',
    }),
    defineField({
      name: 'googleScholarUrl',
      title: 'Google Scholar Profile URL',
      type: 'url',
      description: 'Link to the person\'s Google Scholar profile (e.g. https://scholar.google.com/citations?user=…)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Leave empty to sort alphabetically.',
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'},
        {field: 'name', direction: 'asc'}
      ]
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}]
    },
  ],
})
