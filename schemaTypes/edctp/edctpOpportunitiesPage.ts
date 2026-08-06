import { defineType } from 'sanity'
import { localeText } from './_localeHelpers'

export default defineType({
  name: 'edctpOpportunitiesPage',
  title: 'Opportunities Page',
  type: 'document',
  fields: [
    {
      ...localeText('subtitle', 'Page Subtitle', 3, 'Shown under the page title in the blue header. Individual opportunities are managed under "Opportunity".'),
      initialValue: {
        en: 'Calls for applications, fellowships, and training opportunities',
        fr: 'Appels à candidatures, bourses et opportunités de formation',
      },
    },
    localeText('intro', 'Intro Paragraph', 4, 'Optional paragraph shown above the opportunities list.'),
  ],
  preview: {
    prepare() {
      return { title: 'Opportunities Page' }
    },
  },
})
