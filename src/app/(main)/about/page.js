import Link from 'next/link'
import PartnerCarousel from '@/Components/about/PartnerCarousel'
import { client } from '@/lib/sanity'
import { fetchWithFallback } from '@/lib/fallback'
import { aboutPageSettingsQuery } from '@/lib/queries'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'
import AboutHeroCarousel from '@/Components/about/AboutHeroCarousel'

export const metadata = {
  title: 'About | ACE Uganda',
  description: 'Learn about the African Center of Excellence in Bioinformatics and Data Intensive Sciences — our mission, values, education programmes, and collaborations.',
}

async function getAboutData() {
  return fetchWithFallback(
    () => client.fetch(`*[_type == "aboutPage"][0]`),
    'about'
  )
}

const subPages = [
  {
    href: '/about/who-we-are',
    title: 'Who We Are',
    description: 'Our founding partnership, physical infrastructure, and what makes ACE unique on the African continent.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    href: '/about/thematic-areas',
    title: 'Thematic Areas',
    description: 'The core research and training programmes that drive our scientific impact — from genomics to AI and data science.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    href: '/about/our-journey',
    title: 'Our Journey',
    description: 'A decade of milestones — from our 2015 founding to becoming a continental leader in computational sciences.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const coreValueIcons = [
  <svg key="excellence" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>,
  <svg key="collab" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
  <svg key="innovation" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  <svg key="capacity" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>,
  <svg key="impact" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
]

export default async function AboutPage() {
  const [aboutData, pageSettings] = await Promise.all([
    getAboutData(),
    client.fetch(aboutPageSettingsQuery),
  ])

  const coreValues = aboutData?.coreValues?.values || []
  const missionVision = aboutData?.missionVision
  const strategicObjectives = aboutData?.strategicObjectives

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-red-700 to-red-900 py-24 sm:py-32 overflow-hidden">
        <AboutHeroCarousel images={pageSettings?.heroImages} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {aboutData?.introSection?.heading || 'About ACE'}
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              {aboutData?.introSection?.description || 'The African Center of Excellence in Bioinformatics and Data Intensive Sciences.'}
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Sub-page cards */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <AnimateOnScroll variant="fade-up" className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Learn more about ACE</h2>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {subPages.map((page, i) => (
            <AnimateOnScroll key={page.href} variant="fade-up" delay={i * 80}>
              <Link
                href={page.href}
                className="group flex flex-col h-full rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-md hover:border-red-200 transition-all"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-700 mb-5 shrink-0">
                  {page.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-700 transition-colors mb-2">
                  {page.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{page.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-red-700">
                  Learn more
                  <svg className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-gray-50 py-24" id="mission">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimateOnScroll variant="fade-right">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-red-700 text-white mb-6">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600">
                {missionVision?.mission || 'To advance computational research and capacity building in bioinformatics, data science, and high-performance computing across Africa.'}
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fade-left" delay={100}>
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-red-700 text-white mb-6">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Our Vision</h2>
              <p className="text-lg text-gray-600">
                {missionVision?.vision || 'To be a leading center of excellence in computational sciences, driving transformative research and producing world-class graduates.'}
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </div>

      {/* Core Values */}
      {coreValues.length > 0 && (
        <div className="relative py-24 overflow-hidden">
          <ACEPattern rows={5} cols={8} opacity={0.07} className="absolute top-8 left-8 hidden xl:block" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {aboutData?.coreValues?.sectionTitle || 'Our Core Values'}
              </h2>
              <p className="mt-4 text-lg text-gray-600">Guiding principles that shape our work and culture</p>
            </AnimateOnScroll>
            <div className="flex flex-wrap justify-center gap-8">
              {coreValues.map((value, i) => (
                <AnimateOnScroll
                  key={value.title}
                  variant="zoom"
                  delay={i * 80}
                  className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[220px]">
                  <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow h-full">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-red-700 mb-4">
                      {coreValueIcons[i] || coreValueIcons[0]}
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Strategic Objectives */}
      {strategicObjectives?.objectives?.length > 0 && (
        <div className="bg-gray-900 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl text-center mb-16">
              <span className="inline-block rounded-full bg-red-700/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-400 mb-4">
                Strategy
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {strategicObjectives.sectionTitle || 'Strategic Objectives'}
              </h2>
              {strategicObjectives.sectionDescription && (
                <p className="mt-4 text-lg text-gray-400 leading-relaxed">
                  {strategicObjectives.sectionDescription}
                </p>
              )}
            </AnimateOnScroll>


            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {strategicObjectives.objectives.map((obj, i) => (
                <AnimateOnScroll key={obj.title} variant="fade-up" delay={i * 70}>
                  <div className="group relative flex flex-col h-full rounded-2xl border border-white/10 bg-white/5 p-7 hover:bg-white/10 hover:border-red-700/50 transition-all">
                    <div className="mb-5 flex items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-700 text-sm font-bold text-white">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="h-px flex-1 bg-white/10 group-hover:bg-red-700/40 transition-colors" />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-3 leading-snug">
                      {obj.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed flex-1">
                      {obj.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Collaborations */}
      <div className="bg-red-50 py-20" id="collaborations">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up" className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-6">Collaborations</h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              To optimise productivity and value creation, ACE leverages partners across the local and international bioinformatics research and development ecosystem.
            </p>
            <PartnerCarousel />
          </AnimateOnScroll>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Join Our Mission</h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore opportunities to study, research, or collaborate with ACE Uganda
            </p>
            <div className="mt-8 flex gap-4 justify-center flex-wrap">
              <Link href="/training-programs" className="rounded-md bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-800 transition-colors">
                View Programs
              </Link>
              <Link href="/research" className="rounded-md border border-red-700 px-6 py-3 text-base font-semibold text-red-700 shadow-sm hover:bg-red-50 transition-colors">
                Explore Research
              </Link>
              <Link href="/contact" className="rounded-md border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
