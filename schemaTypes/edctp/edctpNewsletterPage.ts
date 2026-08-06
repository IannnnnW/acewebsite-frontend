import { defineType } from 'sanity'
import { localeText } from './_localeHelpers'

export default defineType({
  name: 'edctpNewsletterPage',
  title: 'Newsletter Page',
  type: 'document',
  fields: [
    localeText('subtitle', 'Page Subtitle', 3, 'Shown under the page title in the blue header. Individual issues are managed under "Newsletter Issue".'),
    localeText('intro', 'Intro Paragraph', 4, 'Optional paragraph shown above the issue grid.'),
  ],
  preview: {
    prepare() {
      return { title: 'Newsletter Page' }
    },
  },
})
