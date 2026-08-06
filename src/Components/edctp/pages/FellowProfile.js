'use client'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useI18n } from '@/lib/idmI18n'
import { loc } from '@/lib/edctpLocalize'
import IdmPageHeader from '@/Components/edctp/IdmPageHeader'

export default function FellowProfile({ fellow }) {
  const { t, locale } = useI18n()

  const facts = [
    { label: t('fellow.cohort'), value: fellow.cohort },
    { label: t('fellow.institution'), value: fellow.homeInstitution },
    { label: t('fellow.country'), value: fellow.country },
    { label: t('fellow.researchFocus'), value: loc(fellow.researchFocus, locale) },
    { label: t('fellow.projectTitle'), value: loc(fellow.projectTitle, locale) },
  ].filter((f) => f.value)

  return (
    <>
      <IdmPageHeader
        eyebrow={t('nav.fellows')}
        title={fellow.name}
        subtitle={loc(fellow.researchFocus, locale)}
        breadcrumb={[
          { label: t('nav.training'), href: '/edctp-idm/training' },
          { label: t('nav.fellows'), href: '/edctp-idm/training/fellows' },
          { label: fellow.name, href: '#' },
        ]}
      />

      <div className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-10">

            {/* Photo */}
            <div className="md:w-72 shrink-0">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-idblue-50 shadow-md">
                {fellow.photo?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={fellow.photo.url} alt={fellow.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-idblue-100 to-idblue-200">
                    <svg className="h-16 w-16 text-idblue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1">
              {facts.length > 0 && (
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mb-8">
                  {facts.map((f) => (
                    <div key={f.label}>
                      <dt className="text-xs font-bold uppercase tracking-widest text-idblue-500 mb-1">{f.label}</dt>
                      <dd className="text-gray-800">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {loc(fellow.bio, locale) && (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{loc(fellow.bio, locale)}</p>
              )}

              <Link
                href="/edctp-idm/training/fellows"
                className="inline-flex items-center gap-1.5 mt-10 text-sm font-semibold text-idred-600 hover:text-idred-800 transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4" />{t('fellow.backToFellows')}
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
