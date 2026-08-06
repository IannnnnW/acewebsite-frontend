'use client'
import Link from 'next/link'
import { useI18n } from '@/lib/idmI18n'
import { loc } from '@/lib/edctpLocalize'
import IdmPageHeader from '@/Components/edctp/IdmPageHeader'

function MentorCard({ mentor, locale }) {
  const inner = (
    <>
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-idblue-50 mb-3">
        {mentor.photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={mentor.photo.url} alt={mentor.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-idblue-100 to-idblue-200">
            <svg className="h-12 w-12 text-idblue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </div>
      <p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-idblue-500 transition-colors">{mentor.name}</p>
      {mentor.institution && <p className="text-xs text-idblue-500 mt-0.5 line-clamp-2">{mentor.institution}</p>}
      {mentor.country && <p className="text-xs text-gray-400 mt-0.5">{mentor.country}</p>}
      {loc(mentor.expertise, locale) && (
        <p className="text-xs text-gray-500 mt-1 line-clamp-2 italic">{loc(mentor.expertise, locale)}</p>
      )}
    </>
  )

  if (mentor.slug?.current) {
    return (
      <Link href={`/edctp-idm/training/mentors/${mentor.slug.current}`} className="group text-center block">
        {inner}
      </Link>
    )
  }
  return <div className="group text-center">{inner}</div>
}

export default function MentorsPage({ mentors }) {
  const { t, locale } = useI18n()

  return (
    <>
      <IdmPageHeader
        eyebrow={t('nav.training')}
        title={t('nav.mentors')}
        breadcrumb={[
          { label: t('nav.training'), href: '/edctp-idm/training' },
          { label: t('nav.mentors'), href: '/edctp-idm/training/mentors' },
        ]}
      />

      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {!mentors?.length ? (
            <p className="text-center text-gray-400 py-12">{t('training.emptyMentors')}</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {mentors.map((mentor) => (
                <MentorCard key={mentor._id} mentor={mentor} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
