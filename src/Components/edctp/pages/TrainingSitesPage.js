'use client'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import { useI18n } from '@/lib/idmI18n'
import { loc } from '@/lib/edctpLocalize'
import IdmPageHeader from '@/Components/edctp/IdmPageHeader'

export default function TrainingSitesPage({ sites }) {
  const { t, locale } = useI18n()

  return (
    <>
      <IdmPageHeader
        eyebrow={t('nav.training')}
        title={t('nav.trainingSites')}
        breadcrumb={[
          { label: t('nav.training'), href: '/edctp-idm/training' },
          { label: t('nav.trainingSites'), href: '/edctp-idm/training/sites' },
        ]}
      />

      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {!sites?.length ? (
            <p className="text-center text-gray-400 py-12">{t('training.emptySites')}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sites.map((site) => (
                <div key={site._id} className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md hover:border-idblue-500 transition-all">
                  {site.image?.url ? (
                    <div className="relative h-44 bg-idblue-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={site.image.url} alt={site.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-44 bg-gradient-to-br from-idblue-700 to-idblue-900 flex items-center justify-center">
                      <svg className="h-12 w-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  )}
                  <div className="p-5">
                    <h2 className="font-semibold text-gray-900 mb-1">{site.name}</h2>
                    {site.institution && <p className="text-sm text-idblue-500 mb-1">{site.institution}</p>}
                    {site.country && (
                      <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                        <PlaceOutlinedIcon sx={{ fontSize: 14 }} className="text-idblue-500" />
                        {site.country}
                      </p>
                    )}
                    {loc(site.description, locale) && (
                      <p className="text-sm text-gray-600 leading-relaxed">{loc(site.description, locale)}</p>
                    )}
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
