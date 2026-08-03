import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string', description: 'Describe the image for accessibility' }),
      ],
      description: 'Recommended: 1200 × 675px (16:9 ratio), max 2MB. For logos/graphics, use PNG with transparent background. Shown in the hero section on the project detail page and on the project listing card.',
    }),
    defineField({
      name: 'priority',
      title: 'Display Priority',
      type: 'number',
      description: 'Lower number appears first (e.g. 1 = top). Leave empty to sort by date after prioritised items.',
      validation: (rule) => rule.integer().min(1),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
    }),
    defineField({
      name: 'description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'Ongoing', value: 'ongoing'},
          {title: 'Completed', value: 'completed'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      type: 'date',
    }),
    defineField({
      name: 'partners',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'partner'}]}],
    }),
    // NOTE: Previously this was a single-value string field named `thematicArea`.
    // It was changed to an array to allow a project to span multiple thematic areas.
    // Existing documents with the old `thematicArea` field will need to be re-saved
    // in Sanity Studio to populate `thematicAreas`, or migrated via a Sanity dataset export/import.
    defineField({
      name: 'thematicAreas',
      title: 'Thematic Areas',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          {title: 'One Health, Pathogen Intelligence and AMR', value: 'amr'},
          {title: 'Human Genomics & Cancer', value: 'human_genomics'},
          {title: 'Malaria Computational Biology', value: 'malaria'},
          {title: 'High Performance Computing', value: 'hpc'},
          {title: 'Disease Modelling and Pandemic Preparedness', value: 'pandemic_preparedness'},
          {title: 'Training and Capacity Strengthening', value: 'capacity_building_and_training'},
          {title: 'Responsible AI and Digital Health Innovation', value: 'machine_learning'},
          {title: 'Enhanced Visualization', value: 'visualization'},
          {title: 'Sustainable Digital Data Infrastructure', value: 'sustainable_digital_data_infrastructure'},
        ],
      },
      description: 'Select all thematic areas this project belongs to.',
    }),
    defineField({
      name: 'funders',
      title: 'Funders',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'funder'}]}],
      description: 'List of organizations or agencies funding this project',
    }),
    defineField({
      name: 'pi',
      title: 'Principal Investigator',
      type: 'reference',
      to: [{type: 'person'}],
    }),
    defineField({
      name: 'coPrincipalInvestigators',
      title: 'Co-Principal Investigators',
      type: 'array',
      description: 'Select one or more Co-PIs from ACE staff. Leave empty if none.',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    }),
    defineField({
      name: 'fellows',
      title: 'Fellows',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}],
      description: 'ACE fellows working on this project. Linked from the Staff directory.',
    }),
    defineField({
      name: 'abstract',
      type: 'text',
    }),
    defineField({
      name: 'aimsAndObjectives',
      title: 'Aims & Objectives',
      type: 'array',
      description: 'List each aim or objective as a separate point. Keep each one concise — one sentence per objective works best.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'keyOutcomes',
      title: 'Key Outcomes',
      type: 'array',
      description: 'List the concrete results, findings, or deliverables this project has produced or achieved so far. Add one outcome per entry.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'relevanceToSector',
      title: 'Relevance to the Sector',
      type: 'text',
      rows: 5,
      description: 'A short narrative explaining why this project matters — its broader impact on bioinformatics, public health, data science, or the relevant sector in Africa/Uganda.',
    }),
  ],
})