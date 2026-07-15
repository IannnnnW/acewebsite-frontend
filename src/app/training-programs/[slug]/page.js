import { client } from '@/lib/sanity'
import { programBySlugQuery, allProgramsQuery } from '@/lib/queries'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

export async function generateStaticParams() {
  const programs = await client.fetch(allProgramsQuery)
  return programs.map((program) => ({ slug: program.slug.current }))
}

async function getProgram(slug) {
  return client.fetch(programBySlugQuery, { slug })
}

export default async function ProgramPage({ params }) {
  const program = await getProgram(params.slug)

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Program Not Found</h1>
          <Link href="/training-programs" className="text-red-700 hover:text-red-600">
            ← Back to Programs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-red-700 to-red-900 py-16 sm:py-24 overflow-hidden">
        <ACEPattern rows={6} cols={9} opacity={0.08} className="absolute top-4 right-4 hidden lg:block" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link href="/training-programs" className="inline-flex items-center text-red-100 hover:text-white mb-8">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Programs
            </Link>

            {program.type && (
              <span className="inline-flex items-center rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white mb-4">
                {program.type.toUpperCase()}
              </span>
            )}

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {program.name}
            </h1>

            {program.duration && (
              <p className="mt-4 text-lg text-red-100">Duration: {program.duration}</p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 space-y-16">
        {program.description && (
          <AnimateOnScroll variant="fade-up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Program</h2>
            <p className="text-gray-700 leading-relaxed">{program.description}</p>
          </section>
          </AnimateOnScroll>
        )}

        {program.requirements && (
          <AnimateOnScroll variant="fade-up">
          <section className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <PortableText value={program.requirements} />
            </div>
          </section>
          </AnimateOnScroll>
        )}

        {program.eligibility && program.eligibility.length > 0 && (
          <AnimateOnScroll variant="fade-up">
          <section className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Eligibility</h2>
            <ul className="space-y-3">
              {program.eligibility.map((req, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-red-700 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </section>
          </AnimateOnScroll>
        )}

        {/* Research Activities */}
        {program.researchActivities && program.researchActivities.length > 0 && (
          <AnimateOnScroll variant="fade-up">
          <section className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-10">Research Activities</h2>
            <div className="space-y-14">
              {program.researchActivities.map((activity) => (
                <div key={activity._key} className="group">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-red-700 flex-shrink-0" />
                    {activity.title}
                  </h3>

                  {activity.description && (
                    <div className="prose prose-gray max-w-none mb-6 text-gray-700">
                      <PortableText value={activity.description} />
                    </div>
                  )}

                  {activity.photos && activity.photos.length > 0 && (
                    <div className={`grid gap-4 ${
                      activity.photos.length === 1
                        ? 'grid-cols-1'
                        : activity.photos.length === 2
                        ? 'grid-cols-2'
                        : 'grid-cols-2 sm:grid-cols-3'
                    }`}>
                      {activity.photos.map((photo, idx) => (
                        <figure key={idx} className="overflow-hidden rounded-xl">
                          <div className="relative aspect-video bg-gray-100">
                            <Image
                              src={photo.url}
                              alt={photo.caption || activity.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          {photo.caption && (
                            <figcaption className="mt-2 text-xs text-gray-500 text-center">
                              {photo.caption}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
          </AnimateOnScroll>
        )}

        {program.applyUrl && (
          <AnimateOnScroll variant="fade-up">
          <div className="border-t border-gray-200 pt-12">
            <a
              href={program.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-800 transition-colors"
            >
              Apply Now
            </a>
          </div>
          </AnimateOnScroll>
        )}
      </div>
    </div>
  )
}
