'use client'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { useI18n } from '@/lib/idmI18n'
import { loc, locArray } from '@/lib/edctpLocalize'
import IdmPageHeader from '@/Components/edctp/IdmPageHeader'

export default function AboutPage({ aboutPage }) {
  const { t, locale } = useI18n()

  const mission = loc(aboutPage?.mission, locale)
  const goals = locArray(aboutPage?.goals, locale)

  const STATS = [
    { value: '47', label: t('stats.researchers') },
    { value: '5', label: t('stats.cohorts') },
    { value: '12', label: t('stats.fellowships') },
    { value: '10', label: t('stats.workPackages') },
  ]

  return (
    <>
      <IdmPageHeader
        eyebrow={t('nav.about')}
        title={t('about.title')}
        subtitle={loc(aboutPage?.subtitle, locale)}
        breadcrumb={[{ label: t('nav.about'), href: '/edctp-idm/about' }]}
      />

      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

            {/* Left — mission / goals */}
            <div className="lg:flex-1 space-y-12">
              {mission && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('about.mission')}</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">{mission}</p>
                </div>
              )}

              {goals.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-5">{t('about.goals')}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {goals.map((goal, i) => (
                      <div key={i} className="rounded-xl border border-idblue-100 bg-idblue-50 p-4 flex items-start gap-3">
                        <ArrowRightIcon className="h-4 w-4 text-idblue-500 mt-1 shrink-0" />
                        <p className="text-idblue-900 text-sm leading-relaxed">{goal}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right — stat card panel */}
            <aside className="lg:w-80 shrink-0">
              <div className="rounded-2xl bg-idblue-900 p-8 lg:sticky lg:top-24">
                <div className="h-1 w-12 bg-idblue-500 rounded-full mb-6" />
                <div className="space-y-8">
                  {STATS.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-4xl font-extrabold text-idblue-500 tabular-nums">{stat.value}</p>
                      <p className="text-sm text-idblue-200 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-8 pt-6 border-t border-idblue-800 text-xs text-idblue-300 leading-relaxed">
                  {t('footer.grantNumber')} — HORIZON-JU-GH-EDCTP3-2025-02
                </p>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  )
}
