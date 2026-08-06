import { client } from '@/lib/sanity'
import { personBySlugQuery } from '@/lib/queries'
import { allStaffQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { getStaffCategoryLabel } from '@/lib/staffCategories'
import Image from 'next/image'
import Link from 'next/link'

export async function generateStaticParams() {
  const people = await client.fetch(allStaffQuery)
  
  return people.map((person) => ({
    slug: person.slug.current,
  }))
}

async function getPerson(slug) {
  const person = await client.fetch(personBySlugQuery, { slug })
  return person
}

export default async function StaffDetailPage({ params }) {
  const { slug } = await params
  const person = await getPerson(slug)

  if (!person) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Staff Member Not Found</h1>
          <Link href="/about#team" className="text-red-700 hover:text-red-600">
            ← Back to Staff
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-700 to-red-900 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link 
            href="/team" 
            className="inline-flex items-center text-red-100 hover:text-white mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Staff
          </Link>
        </div>
      </div>

      {/* Profile Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="lg:grid lg:grid-cols-3">
            {/* Profile Image Section */}
            <div className="lg:col-span-1 bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg mb-6">
                {person.image ? (
                  <Image
                    src={urlFor(person.image).width(500).height(500).url()}
                    alt={person.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-red-100 to-red-200">
                    <svg className="h-32 w-32 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Quick Info */}
              <div className="space-y-4">
                {person.staffCategory && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{getStaffCategoryLabel(person.staffCategory)}</span>
                  </div>
                )}

                {person.email && (
                  <a
                    href={`mailto:${person.email}`}
                    className="flex items-center text-sm text-red-700 hover:text-red-600 transition-colors"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {person.email}
                  </a>
                )}

                {(person.googleScholarUrl || person.linkedin || person.twitter) && (
                  <div className="mt-4 flex flex-col gap-2">
                    {person.googleScholarUrl && (
                      <a
                        href={person.googleScholarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-red-700 transition-colors"
                      >
                        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/>
                        </svg>
                        Google Scholar
                      </a>
                    )}
                    {person.linkedin && (
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-red-700 transition-colors"
                      >
                        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </a>
                    )}
                    {person.twitter && (
                      <a
                        href={person.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-red-700 transition-colors"
                      >
                        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        X (Twitter)
                      </a>
                    )}
                  </div>
                )}

                {person.researchInterests && person.researchInterests.length > 0 && (
                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Research Interests</p>
                    <div className="flex flex-wrap gap-2">
                      {person.researchInterests.map((interest) => (
                        <span
                          key={interest}
                          className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-200"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bio and Details Section */}
            <div className="lg:col-span-2 p-8 lg:p-12">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {person.name}
                </h1>
                <p className="text-xl text-red-700 font-medium">
                  {person.role}
                </p>
              </div>

              {person.bio && (
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Biography</h2>
                  <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {person.bio}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Related Team Members */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="text-center">
          <Link
            href="/team"
            className="inline-flex items-center rounded-md bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            View All Staff
          </Link>
        </div>
      </div>
    </div>
  )
}