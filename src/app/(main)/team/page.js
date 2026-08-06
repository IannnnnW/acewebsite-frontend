import { client } from '@/lib/sanity'
import { allStaffQuery, teamPageSettingsQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { STAFF_CATEGORIES, getStaffCategoryLabel } from '@/lib/staffCategories'
import Image from 'next/image'
import Link from 'next/link'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'

function groupStaffByCategory(staff) {
  const grouped = {}
  staff.forEach((person) => {
    const cat = person.staffCategory || 'other'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(person)
  })
  return grouped
}

function PersonCard({ person }) {
  return (
    <Link href={`/team/${person.slug?.current}`} className="group relative">
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square">
        {person.image ? (
          <Image
            src={urlFor(person.image).width(300).height(300).url()}
            alt={person.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-red-100 to-red-200">
            <svg className="h-20 w-20 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white text-sm font-medium">View Profile</p>
          </div>
        </div>
      </div>
      <div className="mt-3 text-center">
        <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-700 transition-colors">
          {person.name}
        </h3>
        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{person.role}</p>
      </div>
    </Link>
  )
}

export default async function TeamPage() {
  const [staff, pageSettings] = await Promise.all([
    client.fetch(allStaffQuery),
    client.fetch(teamPageSettingsQuery),
  ])
  const grouped = groupStaffByCategory(staff || [])

  const orderedCategories = [
    ...STAFF_CATEGORIES.filter((c) => grouped[c.value]),
    ...Object.keys(grouped)
      .filter((k) => !STAFF_CATEGORIES.find((c) => c.value === k))
      .map((k) => ({ value: k, label: getStaffCategoryLabel(k) })),
  ]

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
          <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Our Team</h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              Meet the experts driving innovation and excellence at ACE Uganda
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Grouped Staff Sections */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 space-y-20">
        {orderedCategories.map(({ value, label }) => (
          <AnimateOnScroll key={value} variant="fade-up">
          <section>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{label}</h2>
              <div className="flex-1 h-px bg-red-100" />
              <span className="text-sm text-gray-500 shrink-0">
                {grouped[value].length} {grouped[value].length === 1 ? 'member' : 'members'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {grouped[value].map((person, i) => (
                <AnimateOnScroll key={person._id} variant="zoom" delay={i * 60}>
                  <PersonCard person={person} />
                </AnimateOnScroll>
              ))}
            </div>
          </section>
          </AnimateOnScroll>
        ))}

        {(!staff || staff.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500">Team members will appear here soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
