'use client'
import { useI18n } from '@/lib/idmI18n'
import { loc } from '@/lib/edctpLocalize'
import IdmPageHeader from '@/Components/edctp/IdmPageHeader'
import CallsSection from '@/Components/edctp/sections/CallsSection'

export default function OpportunitiesPage({ calls, pageDoc }) {
  const { t, locale } = useI18n()

  const active = (calls || []).filter((c) => c.status !== 'closed')
  const past = (calls || []).filter((c) => c.status === 'closed')
  const intro = loc(pageDoc?.intro, locale)

  return (
    <>
      <IdmPageHeader
        eyebrow={t('nav.opportunities')}
        title={t('opportunities.title')}
        subtitle={loc(pageDoc?.subtitle, locale) || t('opportunities.subtitle')}
        breadcrumb={[{ label: t('nav.opportunities'), href: '/edctp-idm/opportunities' }]}
      />

      <div className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {intro && (
            <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-3xl">{intro}</p>
          )}

          <CallsSection calls={active} />

          {past.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('opportunities.pastTitle')}</h2>
              <div className="opacity-80">
                <CallsSection calls={past} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
