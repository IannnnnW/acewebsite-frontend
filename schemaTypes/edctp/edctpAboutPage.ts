import { defineType } from 'sanity'
import { localeText, localeStringArray } from './_localeHelpers'

export default defineType({
  name: 'edctpAboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      ...localeText('subtitle', 'Page Subtitle', 3, 'Shown under the page title in the blue header.'),
      initialValue: {
        en: 'To equip 35 researchers with foundational modelling skills through hands-on workshops and support 12 advanced modellers through a 1-year fellowship with mentorship, ensuring equitable geographic representation and gender balance across sub-Saharan Africa.',
        fr: "Doter 35 chercheurs de compétences fondamentales en modélisation à travers des ateliers pratiques et soutenir 12 modélisateurs avancés dans le cadre d'une bourse d'un an avec mentorat, en garantissant une représentation géographique équitable et l'équilibre entre les genres en Afrique subsaharienne.",
      },
    },
    {
      ...localeText('mission', 'Mission', 4),
      initialValue: {
        en: 'IDM-Africa addresses the critical shortage of infectious disease modellers in sub-Saharan Africa by establishing a Strategic Training Hub that delivers immersive short-term trainings grounded in strong theory and practical application.',
        fr: "IDM Afrique s'attaque à la pénurie critique de modélisateurs de maladies infectieuses en Afrique subsaharienne en créant un pôle stratégique de formation qui dispense des formations immersives de courte durée, fondées sur une théorie solide et une application pratique.",
      },
    },
    localeStringArray('goals', 'Goals'),
  ],
  preview: {
    prepare() {
      return { title: 'About Page' }
    },
  },
})
