import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { getFallbackData } from '@/lib/fallback'
import { PortableText } from '@portabletext/react'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

export const revalidate = 60

const typeLabels = {
  computing: 'High-Performance Computing',
  vr: 'Visualization & VR',
  learning: 'Learning Center',
}

async function getFacility(slug) {
  try {
    const data = await client.fetch(
      `*[_type == "facility" && slug.current == $slug][0] {
        _id, name, slug, type, summary, body, specs, potentialUses,
        "heroImage": heroImage { ..., "url": asset->url, alt },
        "gallery": gallery[] { ..., "url": asset->url, caption, alt }
      }`,
      { slug }
    )
    if (data) return data
  } catch {
    // fall through to fallback
  }
  const all = getFallbackData('facilities')
  return Array.isArray(all) ? all.find((f) => f.slug?.current === slug) ?? null : null
}

export async function generateStaticParams() {
  try {
    const facilities = await client.fetch(`*[_type == "facility"]{ "slugStr": slug.current }`)
    if (Array.isArray(facilities) && facilities.length > 0) {
      const params = facilities
        .map((f) => f.slugStr)
        .filter((s) => typeof s === 'string' && s.length > 0)
        .map((s) => ({ slug: s }))
      if (params.length > 0) return params
    }
  } catch {
    // fall through to hardcoded fallback
  }
  return [
    { slug: 'hpc-compute-core' },
    { slug: 'visualization-lab' },
    { slug: 'tele-learning-center' },
  ]
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const facility = await getFacility(slug)
  if (!facility) return { title: 'Facility Not Found | ACE Uganda' }
  return {
    title: `${facility.name} | ACE Uganda`,
    description: facility.summary,
  }
}

const portableComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    h2: ({ children }) => <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{children}</h3>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
}

export default async function FacilityDetailPage({ params }) {
  const { slug } = await params
  const facility = await getFacility(slug)

  if (!facility) notFound()

  const hasPortableBody = Array.isArray(facility.body)
  const bodyText = !hasPortableBody && typeof facility.body === 'string' ? facility.body : null

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className={`relative py-20 sm:py-28 overflow-hidden ${facility.heroImage?.url ? '' : 'bg-gradient-to-br from-red-700 to-red-900'}`}>
        {facility.heroImage?.url ? (
          <>
            <div className="absolute inset-0">
              <img
                src={facility.heroImage.url}
                alt={facility.heroImage.alt || facility.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gray-900/65" />
            </div>
          </>
        ) : (
          <ACEPattern rows={6} cols={9} opacity={0.08} className="absolute top-4 right-4 hidden lg:block" />
        )}
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up">
            <Link href="/facilities" className="inline-flex items-center text-red-200 hover:text-white text-sm mb-6 transition-colors">
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Facilities
            </Link>
            {facility.type && (
              <div className="mb-3">
                <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                  {typeLabels[facility.type] || facility.type}
                </span>
              </div>
            )}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {facility.name}
            </h1>
            {facility.summary && (
              <p className="mt-4 text-lg text-red-100 max-w-3xl leading-relaxed">
                {facility.summary}
              </p>
            )}
          </AnimateOnScroll>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Body text */}
            {(hasPortableBody || bodyText) && (
              <AnimateOnScroll variant="fade-up">
                <div className="prose prose-lg text-gray-700 max-w-none">
                  {hasPortableBody ? (
                    <PortableText value={facility.body} components={portableComponents} />
                  ) : (
                    bodyText.split(/\n\n+/).filter(Boolean).map((para, i) => (
                      <p key={i} className="mb-4 leading-relaxed">{para}</p>
                    ))
                  )}
                </div>
              </AnimateOnScroll>
            )}

            {/* Gallery */}
            {facility.gallery && facility.gallery.length > 0 && (
              <AnimateOnScroll variant="fade-up" delay={80}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {facility.gallery.map((img, i) => (
                    <div key={i} className="group relative overflow-hidden rounded-xl aspect-video bg-gray-100">
                      <img
                        src={img.url}
                        alt={img.alt || facility.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {img.caption && (
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {img.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </AnimateOnScroll>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Specs */}
            {facility.specs && facility.specs.length > 0 && (
              <AnimateOnScroll variant="fade-up" delay={60}>
                <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-gray-900 mb-4">Specifications</h2>
                  <dl className="space-y-3">
                    {facility.specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between gap-4">
                        <dt className="text-sm text-gray-500 shrink-0">{spec.label}</dt>
                        <dd className="text-sm font-medium text-gray-900 text-right">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </AnimateOnScroll>
            )}

            {/* Potential uses */}
            {facility.potentialUses && facility.potentialUses.length > 0 && (
              <AnimateOnScroll variant="fade-up" delay={100}>
                <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-gray-900 mb-4">What you can do here</h2>
                  <ul className="space-y-2.5">
                    {facility.potentialUses.map((use) => (
                      <li key={use} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="h-4 w-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            )}

            {/* Access CTA */}
            <AnimateOnScroll variant="fade-up" delay={140}>
              <div className="rounded-2xl bg-red-700 p-6 text-white">
                <h3 className="font-semibold mb-2">Get in Touch</h3>
                <p className="text-sm text-red-100 mb-4 leading-relaxed">
                  This facility is available to ACE students, researchers, and approved collaborators.
                </p>
                <Link
                  href={slug == "ace-computer-core" ? "https://forms.gle/6CGEUX3DDLAMksDR6" : "https://forms.gle/LYytHaK4p7kEnQwR8"}
                  className="inline-block rounded-md bg-white text-red-700 px-4 py-2 text-sm font-semibold hover:bg-red-50 transition-colors"
                >
                  Request Access
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </div>
  )
}
