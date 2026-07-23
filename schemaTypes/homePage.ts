import { defineType } from "sanity"

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title (Internal)',
      type: 'string',
      description: 'For internal reference only',
      validation: Rule => Rule.required()
    },
    // Hero Section
    {
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Main Heading',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          rows: 3
        },
        {
          name: 'ctaText',
          title: 'Call to Action Text',
          type: 'string'
        },
        {
          name: 'ctaLink',
          title: 'Call to Action Link',
          type: 'string'
        }
      ]
    },
    // Mission Section
    {
      name: 'missionSection',
      title: 'Mission Section',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'mission',
          title: 'Mission Statement',
          type: 'text',
          rows: 4,
          validation: Rule => Rule.required()
        },
        {
          name: 'coreMissionAreas',
          title: 'Core Mission Areas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                  validation: Rule => Rule.required()
                },
                {
                  name: 'icon',
                  title: 'Icon Name',
                  type: 'string',
                  description: 'e.g., beaker, cpu-chip, academic-cap, chart-bar'
                },
                {
                  name: 'image',
                  title: 'Card Image',
                  type: 'image',
                  description: 'Shown at the top of the card on the homepage. Recommended: landscape photo, at least 800px wide.',
                  options: { hotspot: true },
                  fields: [
                    { name: 'alt', title: 'Alt Text', type: 'string' }
                  ]
                },
                {
                  name: 'link',
                  title: 'Link',
                  type: 'string',
                  description: 'Optional — where this card links to on the site (e.g., /vr-lab, /hpc, /research). Leave empty for a non-clickable card.'
                }
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description',
                  media: 'image'
                }
              }
            }
          ]
        }
      ]
    },
    // Focus Areas Section
    {
      name: 'focusAreasSection',
      title: 'Focus Areas Section',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'sectionDescription',
          title: 'Section Description',
          type: 'text',
          rows: 3
        },
        {
          name: 'focusAreas',
          title: 'Focus Areas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                  validation: Rule => Rule.required()
                },
                {
                  name: 'icon',
                  title: 'Icon Name',
                  type: 'string',
                  description: 'e.g., beaker, cpu-chip, academic-cap, chart-bar'
                },
                {
                  name: 'image',
                  title: 'Card Image',
                  type: 'image',
                  description: 'Shown as the card background on the homepage. Recommended: landscape or portrait photo, at least 800px wide.',
                  options: { hotspot: true },
                  fields: [
                    { name: 'alt', title: 'Alt Text', type: 'string' }
                  ]
                },
                {
                  name: 'link',
                  title: 'Link',
                  type: 'string',
                  description: 'Optional — where this card links to on the site (e.g., /research, /research?area=Genomics). Leave empty for a non-clickable card.'
                }
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description',
                  media: 'image'
                }
              }
            }
          ]
        }
      ]
    },
    // Stats Section
    {
      name: 'statsSection',
      title: 'Statistics Section',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string'
        },
        {
          name: 'stats',
          title: 'Statistics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 2
                }
              ],
              preview: {
                select: {
                  title: 'label',
                  subtitle: 'value'
                }
              }
            }
          ]
        }
      ]
    },
    // Partnership Section
    {
      name: 'partnershipSection',
      title: 'Partnership Section',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3
        },
        {
          name: 'partnershipVideoUrl',
          title: 'Partnership Announcement Video URL',
          type: 'url',
          description: 'Paste the full YouTube URL (e.g. https://www.youtube.com/watch?v=VIDEOID)'
        },
        {
          name: 'partnerCategories',
          title: 'Partner Categories',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'category',
                  title: 'Category Name',
                  type: 'string',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'partners',
                  title: 'Partners',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'name',
                          title: 'Partner Name',
                          type: 'string',
                          validation: Rule => Rule.required()
                        },
                        {
                          name: 'description',
                          title: 'Description',
                          type: 'text',
                          rows: 2
                        },
                        {
                          name: 'website',
                          title: 'Website URL',
                          type: 'url'
                        }
                      ],
                      preview: {
                        select: {
                          title: 'name'
                        }
                      }
                    }
                  ]
                }
              ],
              preview: {
                select: {
                  title: 'category',
                  subtitle: 'partners'
                },
                prepare(selection) {
                  const {title, subtitle} = selection
                  return {
                    title: title,
                    subtitle: `${subtitle?.length || 0} partners`
                  }
                }
              }
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(selection) {
      return {
        title: selection.title || 'Home Page Configuration'
      }
    }
  }
})
