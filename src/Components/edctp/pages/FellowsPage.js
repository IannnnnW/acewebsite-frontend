'use client'
import Link from 'next/link'
import { useI18n } from '@/lib/idmI18n'
import { loc } from '@/lib/edctpLocalize'
import IdmPageHeader from '@/Components/edctp/IdmPageHeader'

function FellowCard({ fellow, locale }) {
  const inner = (
    <>
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-idblue-50 mb-3">
        {fellow.photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={fellow.photo.url} alt={fellow.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-idblue-100 to-idblue-200">
            <svg className="h-12 w-12 text-idblue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </div>
      <p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-idblue-500 transition-colors">{fellow.name}</p>
      {fellow.homeInstitution && <p className="text-xs text-idblue-500 mt-0.5 line-clamp-2">{fellow.homeInstitution}</p>}
      {fellow.country && <p className="text-xs text-gray-400 mt-0.5">{fellow.country}</p>}
      {loc(fellow.researchFocus, locale) && (
        <p className="text-xs text-gray-500 mt-1 line-clamp-2 italic">{loc(fellow.researchFocus, locale)}</p>
      )}
    </>
  )

  if (fellow.slug?.current) {
    return (
      <Link href={`/edctp-idm/training/fellows/${fellow.slug.current}`} className="group text-center block">
        {inner}
      </Link>
    )
  }
  return <div className="group text-center">{inner}</div>
}

export default function FellowsPage({ fellows }) {
  const { t, locale } = useI18n()

  // Group by cohort
  const cohorts = {}
  ;(fellows || []).forEach((f) => {
    const key = f.cohort || 'Other'
    if (!cohorts[key]) cohorts[key] = []
    cohorts[key].push(f)
  })

  return (
    <>
      <IdmPageHeader
        eyebrow={t('nav.training')}
        title={t('nav.fellows')}
        breadcrumb={[
          { label: t('nav.training'), href: '/edctp-idm/training' },
          { label: t('nav.fellows'), href: '/edctp-idm/training/fellows' },
        ]}
      />

      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {!fellows?.length ? (
            <p className="text-center text-gray-400 py-12">{t('training.emptyFellows')}</p>
          ) : (
            <div className="space-y-12">
              {Object.entries(cohorts).map(([cohort, members]) => (
                <div key={cohort}>
                  {Object.keys(cohorts).length > 1 && (
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-sm font-semibold text-idblue-500 bg-idblue-50 px-3 py-1 rounded-full">{cohort}</span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {members.map((fellow) => (
                      <FellowCard key={fellow._id} fellow={fellow} locale={locale} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
