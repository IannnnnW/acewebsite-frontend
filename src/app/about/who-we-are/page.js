import Link from 'next/link'
import { client } from '@/lib/sanity'
import { fetchWithFallback } from '@/lib/fallback'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

export const metadata = {
  title: 'Who We Are | ACE Uganda',
  description: 'Learn about the African Center of Excellence in Bioinformatics and Data Intensive Sciences — our founding partnership, facilities, and mission.',
}

async function getAboutData() {
  return fetchWithFallback(
    () => client.fetch(`*[_type == "aboutPage"][0]`),
    'about'
  )
}

export default async function WhoWeArePage() {
  const aboutData = await getAboutData()

  const bodyText = aboutData?.whoWeAreSection?.body ||
    'The Infectious Diseases Institute (IDI), Makerere University\'s College of Computing & Health Sciences in partnership with the US Government National Institute of Allergy and Infectious Diseases and the Office of Cyber Infrastructure and Computational Biology (NIH/NIAID/OCICB) have established the African Center of Excellence in Bioinformatics and Data Intensive Sciences — one of only two such centers on the African continent.\n\nFirst of its kind on the Makerere campus, the ACE is a center for Computational Biology and Big Data analysis. It houses a dedicated High-Performance Computing cluster, a Tele-learning Center, collaborative rooms, and a Virtual Reality room for the latest 3D & VR pedagogical and diagnostic approaches. Layered over those facilities are professionally curated long-term (MSc & PhD) and short-term (Certificate) academic programmes, as well as research and development support units.'

  const paragraphs = bodyText.split(/\n\n+/).filter(Boolean)

  const highlights = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
      ),
      label: 'Host Institution',
      value: 'Makerere University, Kampala',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      label: 'Founded',
      value: '2015 — NIH/NIAID/OCICB partnership',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      label: 'Distinction',
      value: 'One of 2 such centers in Africa',
    },
  ]

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
              Who We Are
            </h1>
            <p className="mt-4 text-lg text-red-100 max-w-2xl">
              {aboutData?.introSection?.description || 'One of only two African Centers of Excellence in Bioinformatics and Data Intensive Sciences on the continent.'}
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Highlight strip */}
      <div className="bg-red-700">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 divide-y divide-red-600 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {highlights.map((h) => (
              <div key={h.label} className="flex items-center gap-4 py-5 px-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-white shrink-0">
                  {h.icon}
                </div>
                <div>
                  <dt className="text-xs text-red-200 uppercase tracking-wide">{h.label}</dt>
                  <dd className="text-sm font-semibold text-white mt-0.5">{h.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-20">
        <AnimateOnScroll variant="fade-up">
          <div className="prose prose-lg text-gray-700 max-w-none space-y-6">
            {paragraphs.map((para, i) => (
              <p key={i} className="leading-relaxed">{para}</p>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Facilities overview */}
        <AnimateOnScroll variant="fade-up" delay={100} className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Facilities</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { name: 'HPC Compute Core', href: '/facilities/hpc-compute-core', desc: '320 cores · 1.25 TB RAM · 1.5 PB storage' },
              { name: 'Visualization Lab', href: '/facilities/visualization-lab', desc: 'GPU-backed 3D / VR · unique in Uganda' },
              { name: 'Tele-Learning Center', href: '/facilities/tele-learning-center', desc: '24 workstations · 1 Gbps research link' },
            ].map((f) => (
              <Link key={f.name} href={f.href} className="group rounded-xl border border-gray-200 p-5 hover:border-red-300 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-700 transition-colors">{f.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{f.desc}</p>
                <span className="mt-3 inline-flex items-center text-xs font-medium text-red-700">
                  Learn more
                  <svg className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </AnimateOnScroll>

        {/* CTA */}
        <AnimateOnScroll variant="fade-up" delay={150} className="mt-16 flex flex-wrap gap-4">
          <Link href="/about/our-journey" className="rounded-md bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition-colors">
            Our Journey →
          </Link>
          <Link href="/about/thematic-areas" className="rounded-md border border-red-700 px-5 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50 transition-colors">
            Thematic Areas →
          </Link>
          <Link href="/contact" className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            Get in Touch
          </Link>
        </AnimateOnScroll>
      </div>
    </div>
  )
}
