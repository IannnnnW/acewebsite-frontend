'use client'
import { useI18n } from '@/lib/idmI18n'
import { loc } from '@/lib/edctpLocalize'
import IdmPageHeader from '@/Components/edctp/IdmPageHeader'
import NewsletterSection from '@/Components/edctp/sections/NewsletterSection'

export default function NewsletterPage({ issues, pageDoc }) {
  const { t, locale } = useI18n()
  const intro = loc(pageDoc?.intro, locale)

  return (
    <>
      <IdmPageHeader
        eyebrow={t('nav.newsletter')}
        title={t('newsletter.title')}
        subtitle={loc(pageDoc?.subtitle, locale)}
        breadcrumb={[{ label: t('nav.newsletter'), href: '/edctp-idm/newsletter' }]}
      />

      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {intro && (
            <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-3xl">{intro}</p>
          )}
          <NewsletterSection issues={issues} />
        </div>
      </div>
    </>
  )
}
