import Link from 'next/link'
import { client } from '@/lib/sanity'
import { fetchWithFallback } from '@/lib/fallback'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

export const metadata = {
  title: 'Facilities | ACE Uganda',
  description: 'Explore the world-class computing, visualization, and learning facilities at the African Center of Excellence in Bioinformatics and Data Intensive Sciences.',
}

const typeLabels = {
  computing: 'High-Performance Computing',
  vr: 'Visualization & VR',
  learning: 'Learning Center',
}

const typeIcons = {
  computing: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v.75a.75.75 0 01-.75.75H3a.75.75 0 01-.75-.75v-.75m19.5 0a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75H3a.75.75 0 00-.75.75v6.75a.75.75 0 00.75.75m19.5 0H2.25m8.25-9.75h3m-3 3h3" />
    </svg>
  ),
  vr: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  learning: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
}

async function getFacilities() {
  return fetchWithFallback(
    () => client.fetch(`
      *[_type == "facility"] | order(order asc, name asc) {
        _id, name, slug, type, summary, order,
        "heroImage": heroImage { ..., "url": asset->url, alt }
      }
    `),
    'facilities'
  )
}

export default async function FacilitiesPage() {
  const facilities = await getFacilities()

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-red-700 to-red-900 py-20 sm:py-28 overflow-hidden">
        <ACEPattern rows={6} cols={9} opacity={0.08} className="absolute top-4 right-4 hidden lg:block" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Our Facilities
            </h1>
            <p className="mt-4 text-lg text-red-100 max-w-2xl">
              World-class infrastructure purpose-built for computational biology, data science, and collaborative research across Africa.
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Facility Cards */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {facilities.map((facility, i) => (
            <AnimateOnScroll key={facility._id} variant="fade-up" delay={i * 100}>
              <Link
                href={`/facilities/${facility.slug?.current || facility._id}`}
                className="group flex flex-col h-full rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-red-200 transition-all"
              >
                {/* Image or placeholder */}
                <div className="relative h-52 bg-gradient-to-br from-red-700 to-red-900 overflow-hidden">
                  {facility.heroImage?.url ? (
                    <img
                      src={facility.heroImage.url}
                      alt={facility.heroImage.alt || facility.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/40">
                      <ACEPattern rows={4} cols={6} opacity={0.15} />
                      <div className="absolute text-white">
                        {typeIcons[facility.type] || typeIcons['computing']}
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                      {typeLabels[facility.type] || facility.type}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-700 shrink-0">
                      {typeIcons[facility.type] || typeIcons['computing']}
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-red-700 transition-colors leading-tight">
                      {facility.name}
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3">
                    {facility.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-red-700">
                    Explore facility
                    <svg className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        {/* CTA strip */}
        <AnimateOnScroll variant="fade-up" delay={200} className="mt-16 rounded-2xl bg-red-50 border border-red-100 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Access our facilities</h3>
            <p className="text-sm text-gray-600 mt-1">ACE facilities are available to students, researchers, and authorised collaborators.</p>
          </div>
          <Link href="/contact" className="shrink-0 rounded-md bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition-colors">
            Get in Touch
          </Link>
        </AnimateOnScroll>
      </div>
    </div>
  )
}
