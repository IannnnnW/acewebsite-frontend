import { defineType, defineField } from 'sanity'
import { localeString, localeText } from './_localeHelpers'

export default defineType({
  name: 'edctpHomePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Shown beside the headline, CEMA-style. Recommended: 1200×900px, JPG. A field research, training, or team photo works best.',
      options: { hotspot: true },
    }),
    {
      ...localeString('tagline', 'Hero Headline'),
      initialValue: {
        en: "Building Africa's Capacity to Model Infectious Disease",
        fr: "Renforcer la capacité de l'Afrique à modéliser les maladies infectieuses",
      },
    },
    {
      ...localeText('intro', 'Hero Intro Paragraph', 4, 'Short paragraph under the headline (~40 words max).'),
      initialValue: {
        en: 'To equip 35 researchers with foundational modelling skills through hands-on workshops and support 12 advanced modellers through a 1-year fellowship with mentorship, ensuring equitable geographic representation and gender balance across sub-Saharan Africa.',
        fr: "Doter 35 chercheurs de compétences fondamentales en modélisation à travers des ateliers pratiques et soutenir 12 modélisateurs avancés dans le cadre d'une bourse d'un an avec mentorat, en garantissant une représentation géographique équitable et l'équilibre entre les genres en Afrique subsaharienne.",
      },
    },
    defineField({
      name: 'stats',
      title: 'Impact Stats',
      type: 'array',
      description: 'The numbers band under the hero. Keep to 3–4 entries.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. "47" or "35+"' }),
            localeString('label', 'Label'),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label.en' },
          },
        },
      ],
      initialValue: [
        { value: '47', label: { en: 'Researchers to be Trained', fr: 'Chercheurs à former' } },
        { value: '5', label: { en: 'Annual Training Cohorts', fr: 'Cohortes annuelles de formation' } },
        { value: '12', label: { en: 'Advanced Fellowships', fr: 'Bourses avancées' } },
        { value: '10', label: { en: 'Work Packages', fr: 'Lots de travaux' } },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
})
