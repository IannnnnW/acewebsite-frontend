'use client'
import { CheckIcon } from '@radix-ui/react-icons'
import { useI18n } from '@/lib/idmI18n'
import { loc, locArray } from '@/lib/edctpLocalize'

function formatDeadline(dt) {
  if (!dt) return null
  return new Date(dt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function CallsSection({ calls }) {
  const { t, locale } = useI18n()

  const STATUS_STYLES = {
    open: { pill: 'bg-idred-50 text-idred-600 ring-1 ring-idred-200', dot: 'bg-idred-500', label: t('opportunities.statusOpen') },
    closed: { pill: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400', label: t('opportunities.statusClosed') },
    upcoming: { pill: 'bg-idblue-50 text-idblue-900 ring-1 ring-idblue-200', dot: 'bg-idblue-500', label: t('opportunities.statusUpcoming') },
  }

  if (!calls?.length) return (
    <div className="text-center py-16 text-gray-400">
      <p>{t('opportunities.empty')}</p>
    </div>
  )

  return (
    <div className="space-y-6">
      {calls.map((call) => {
        const s = STATUS_STYLES[call.status] || STATUS_STYLES.upcoming
        return (
          <div key={call._id} className="rounded-2xl border border-gray-200 border-l-4 border-l-idred-600 bg-white p-6 shadow-sm hover:shadow-md hover:border-idblue-500 hover:border-l-idred-600 transition-all">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${s.pill}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                  {s.label}
                </span>
                <h3 className="text-lg font-semibold text-gray-900">{loc(call.title, locale)}</h3>
              </div>
              {call.deadline && (
                <p className="text-sm text-gray-500 shrink-0">
                  {t('opportunities.deadline')} <span className="font-medium text-gray-700">{formatDeadline(call.deadline)}</span>
                </p>
              )}
            </div>

            {loc(call.description, locale) && (
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{loc(call.description, locale)}</p>
            )}

            {locArray(call.eligibility, locale).length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">{t('opportunities.eligibility')}</p>
                <ul className="space-y-1">
                  {locArray(call.eligibility, locale).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckIcon className="h-4 w-4 text-idblue-500 mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-4">
              {call.applicationLink && call.status === 'open' && (
                <a href={call.applicationLink} target="_blank" rel="noopener noreferrer"
                  className="rounded-md bg-idred-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-idred-800 transition-colors">
                  {t('opportunities.applyNow')}
                </a>
              )}
              {call.callDocument && (
                <a href={call.callDocument} target="_blank" rel="noopener noreferrer"
                  className="rounded-md border border-idblue-300 px-5 py-2.5 text-sm font-medium text-idblue-500 hover:bg-idblue-50 transition-colors">
                  {t('opportunities.downloadDocument')}
                </a>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
