import { client } from '@/lib/sanity'
import { allProgramsQuery, trainingProgramsPageSettingsQuery } from '@/lib/queries'
import Link from 'next/link'
import Image from 'next/image'

async function getPrograms() {
  const programs = await client.fetch(allProgramsQuery)
  return programs
}

async function getPageSettings() {
  return client.fetch(trainingProgramsPageSettingsQuery)
}

export default async function ProgramsPage() {
  const [programs, pageSettings] = await Promise.all([getPrograms(), getPageSettings()])

  const TYPE_INFO = {
    msc:   { badge: 'MSc Training',      icon: 'graduation' },
    phd:   { badge: 'Doctoral Training', icon: 'badge'      },
    short: { badge: 'Short Course',     icon: 'book'       },
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-red-700 to-red-900 py-24 sm:py-32 overflow-hidden">
        {pageSettings?.heroImage?.url && (
          <>
            <Image
              src={pageSettings.heroImage.url}
              alt=""
              fill
              priority
              className="absolute inset-0 object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/65" />
          </>
        )}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {pageSettings?.heroHeading || 'Academic Training'}
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              {pageSettings?.heroSubtitle || 'Build your career in bioinformatics and data science with world-class training programs designed for the next generation of African scientists'}
            </p>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        {programs && programs.length > 0 ? (
          <div className="flex flex-col gap-6">
            {programs.map((program, index) => {
              const isEven = index % 2 === 0
              const info = TYPE_INFO[program.type] || { badge: program.type, icon: 'book' }

              return (
                <div
                  key={program._id}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow`}
                >
                  {/* Visual panel — the program's own image when set, else the gradient + icon */}
                  <div className="relative lg:w-2/5 min-h-[220px] overflow-hidden">
                    {program.image?.url ? (
                      <>
                        <Image
                          src={program.image.url}
                          alt={program.image.alt || program.name || info.badge}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <p className="absolute bottom-4 left-4 text-sm font-semibold uppercase tracking-widest text-white">
                          {info.badge}
                        </p>
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center p-12">
                        <div className="text-center">
                          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 mb-4">
                            {info.icon === 'graduation' && (
                              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                              </svg>
                            )}
                            {info.icon === 'badge' && (
                              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg>
                            )}
                            {info.icon === 'book' && (
                              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            )}
                          </div>
                          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
                            {info.badge}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content panel */}
                  <div className="lg:w-3/5 bg-white p-8 lg:p-10 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {program.name || info.badge}
                    </h3>
                    {program.description && (
                      <p className="text-gray-600 leading-relaxed mb-5">{program.description}</p>
                    )}
                    {program.duration && (
                      <div className="flex items-center gap-1.5 mb-6 text-sm text-gray-500">
                        <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {program.duration}
                      </div>
                    )}
                    <Link
                      href={`/training-programs/${program.slug?.current}`}
                      className="self-start inline-flex items-center gap-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
                    >
                      Learn More
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">No programs available at the moment.</p>
          </div>
        )}
      </div>

      {/* Application CTA */}
      <div className="bg-red-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {pageSettings?.ctaHeading || 'Ready to Apply?'}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {pageSettings?.ctaDescription || 'Join our community of researchers and scientists making a difference in Africa'}
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <Link
                href={pageSettings?.ctaPrimaryLink || '/contact'}
                className="rounded-md bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-600 transition-colors"
              >
                {pageSettings?.ctaPrimaryText || 'Contact Admissions'}
              </Link>
              <Link
                href={pageSettings?.ctaSecondaryLink || '/about'}
                className="rounded-md bg-white px-6 py-3 text-base font-semibold text-red-700 shadow-sm border border-red-300 hover:bg-red-50 transition-colors"
              >
                {pageSettings?.ctaSecondaryText || 'Learn More'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
