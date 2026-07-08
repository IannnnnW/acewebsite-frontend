import Link from 'next/link'
import { client } from '@/lib/sanity'
import { fetchWithFallback } from '@/lib/fallback'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

export const metadata = {
  title: 'Thematic Areas | ACE Uganda',
  description: 'Explore the core research and training thematic areas at the African Center of Excellence in Bioinformatics and Data Intensive Sciences.',
}

const iconMap = {
  'academic-cap': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
  beaker: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01-2.14 1.5H6.34A2.25 2.25 0 014.2 15m15.6 0H4.2" />
    </svg>
  ),
  presentation: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
    </svg>
  ),
  server: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v.75a.75.75 0 01-.75.75H3a.75.75 0 01-.75-.75v-.75m19.5 0a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75H3a.75.75 0 00-.75.75v6.75a.75.75 0 00.75.75m19.5 0H2.25M12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    </svg>
  ),
  users: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  chart: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
}

async function getAboutData() {
  return fetchWithFallback(
    () => client.fetch(`*[_type == "aboutPage"][0]`),
    'about'
  )
}

export default async function ThematicAreasPage() {
  const aboutData = await getAboutData()

  const services = aboutData?.servicesSection?.services || []
  const sectionTitle = aboutData?.servicesSection?.sectionTitle || 'Thematic Areas'
  const sectionDescription = aboutData?.servicesSection?.sectionDescription || ''

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-red-700 to-red-900 py-20 sm:py-28 overflow-hidden">
        <ACEPattern rows={6} cols={9} opacity={0.08} className="absolute top-4 right-4 hidden lg:block" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up">
            <Link href="/about" className="inline-flex items-center text-red-200 hover:text-white text-sm mb-6 transition-colors">
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              About ACE Uganda
            </Link>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {sectionTitle}
            </h1>
            {sectionDescription && (
              <p className="mt-4 text-lg text-red-100 max-w-2xl">
                {sectionDescription}
              </p>
            )}
          </AnimateOnScroll>
        </div>
      </div>

      {/* Services / Thematic Areas Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        {services.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <AnimateOnScroll key={service.title} variant="fade-up" delay={i * 80} className="h-full">
                <div className="flex flex-col h-full rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-md hover:border-red-200 transition-all">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-700 mb-5 shrink-0">
                    {iconMap[service.icon] || iconMap['beaker']}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{service.description}</p>
                  {service.features && service.features.length > 0 && (
                    <ul className="mt-5 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-gray-500">
                          <svg className="h-4 w-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">No thematic areas available yet.</div>
        )}

        {/* CTA */}
        <AnimateOnScroll variant="fade-up" delay={100} className="mt-16 flex flex-wrap gap-4">
          <Link href="/research" className="rounded-md bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition-colors">
            View Research Projects →
          </Link>
          <Link href="/about/who-we-are" className="rounded-md border border-red-700 px-5 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50 transition-colors">
            Who We Are
          </Link>
          <Link href="/about/our-journey" className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            Our Journey
          </Link>
        </AnimateOnScroll>
      </div>
    </div>
  )
}
