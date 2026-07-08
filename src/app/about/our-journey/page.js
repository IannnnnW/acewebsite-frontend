import Link from 'next/link'
import { client } from '@/lib/sanity'
import { fetchWithFallback } from '@/lib/fallback'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'
import AnimatedTimeline from '@/Components/about/AnimatedTimeline'

export const metadata = {
  title: 'Our Journey | ACE Uganda',
  description: 'Explore the milestones and history of the African Center of Excellence in Bioinformatics and Data Intensive Sciences since 2015.',
}

async function getAboutData() {
  return fetchWithFallback(
    () => client.fetch(`*[_type == "aboutPage"][0]`),
    'about'
  )
}

export default async function OurJourneyPage() {
  const aboutData = await getAboutData()

  const milestones = aboutData?.timelineSection?.milestones || []
  const sectionTitle = aboutData?.timelineSection?.sectionTitle || 'Our Journey'

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
            <p className="mt-4 text-lg text-red-100 max-w-2xl">
              A decade of advancing computational science and building capacity across Africa.
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Timeline */}
      <div className="mx-auto max-w-5xl px-6 lg:px-8 py-20">
        {milestones.length > 0 ? (
          <AnimatedTimeline milestones={milestones} />
        ) : (
          <div className="text-center py-16 text-gray-400">No milestones available yet.</div>
        )}

        {/* CTA */}
        <AnimateOnScroll variant="fade-up" delay={100} className="mt-20 flex flex-wrap gap-4">
          <Link href="/about/who-we-are" className="rounded-md bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition-colors">
            Who We Are →
          </Link>
          <Link href="/about/thematic-areas" className="rounded-md border border-red-700 px-5 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50 transition-colors">
            Thematic Areas
          </Link>
          <Link href="/research" className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            Our Research
          </Link>
        </AnimateOnScroll>
      </div>
    </div>
  )
}
