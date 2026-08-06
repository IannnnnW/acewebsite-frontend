'use client'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useMemo, useState } from 'react'
import { useI18n } from '@/lib/idmI18n'
import { loc } from '@/lib/edctpLocalize'
import IdmPageHeader from '@/Components/edctp/IdmPageHeader'

function getPubYear(pub) {
  return pub.publishedAt ? pub.publishedAt.slice(0, 4) : null
}

export default function PublicationsPage({ publications }) {
  const { t, locale } = useI18n()
  const [activeYear, setActiveYear] = useState('all')

  const TYPE_LABELS = {
    journal: t('publications.typeJournal'),
    book: t('publications.typeBook'),
    conference: t('publications.typeConference'),
    report: t('publications.typeReport'),
  }

  const availableYears = useMemo(() => {
    const years = (publications || []).map(getPubYear).filter(Boolean)
    return [...new Set(years)].sort((a, b) => b - a)
  }, [publications])

  const filtered = useMemo(() => {
    if (activeYear === 'all') return publications || []
    return (publications || []).filter((p) => getPubYear(p) === activeYear)
  }, [publications, activeYear])

  return (
    <>
      <IdmPageHeader
        eyebrow={t('nav.publications')}
        title={t('publications.title')}
        breadcrumb={[{ label: t('nav.publications'), href: '/edctp-idm/publications' }]}
      />

      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {!publications?.length ? (
            <p className="text-center text-gray-400 py-12">{t('publications.empty')}</p>
          ) : (
            <div className="flex gap-10 items-start">

              {/* Publications list */}
              <div className="flex-1 min-w-0">
                {/* Mobile year select */}
                {availableYears.length > 1 && (
                  <div className="lg:hidden mb-6 flex items-center gap-3">
                    <label htmlFor="pub-year" className="text-xs font-bold uppercase tracking-widest text-gray-400 shrink-0">
                      {t('publications.filterByYear')}
                    </label>
                    <select
                      id="pub-year"
                      value={activeYear}
                      onChange={(e) => setActiveYear(e.target.value)}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-idblue-500 focus:outline-none focus:ring-1 focus:ring-idblue-500"
                    >
                      <option value="all">{t('publications.allYears')}</option>
                      {availableYears.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                )}

                <div className="space-y-4">
                  {filtered.map((pub) => (
                    <article key={pub._id} className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-sm hover:border-idblue-500 transition-all">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {pub.type && (
                          <span className="text-xs bg-idblue-50 text-idblue-500 rounded-full px-2.5 py-0.5 font-medium">
                            {TYPE_LABELS[pub.type] || pub.type}
                          </span>
                        )}
                        {getPubYear(pub) && <span className="text-xs text-gray-400">{getPubYear(pub)}</span>}
                      </div>
                      <h2 className="font-semibold text-gray-900 mb-1 leading-snug">{loc(pub.title, locale)}</h2>
                      {pub.authors && <p className="text-sm text-gray-600 mb-2">{pub.authors}</p>}
                      {loc(pub.abstract, locale) && (
                        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{loc(pub.abstract, locale)}</p>
                      )}
                      <div className="flex gap-4">
                        {pub.doi && (
                          <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-sm text-idred-600 font-medium hover:text-idred-800">
                            <span className="inline-flex items-center gap-1">{t('publications.doi')} <OpenInNewIcon sx={{ fontSize: 13 }} /></span>
                          </a>
                        )}
                        {pub.url && (
                          <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-sm text-idred-600 font-medium hover:text-idred-800">
                            <span className="inline-flex items-center gap-1">{t('publications.viewPublication')} <OpenInNewIcon sx={{ fontSize: 13 }} /></span>
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Year filter sidebar (lg+) */}
              {availableYears.length > 1 && (
                <aside className="hidden lg:block w-48 shrink-0 sticky top-24 self-start">
                  <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        {t('publications.filterByYear')}
                      </p>
                    </div>
                    <div className="p-2 flex flex-col gap-0.5">
                      <button
                        onClick={() => setActiveYear('all')}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                          activeYear === 'all' ? 'bg-idred-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {t('publications.allYears')}
                      </button>
                      {availableYears.map((year) => (
                        <button
                          key={year}
                          onClick={() => setActiveYear(year)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                            activeYear === year
                              ? 'bg-idred-50 text-idred-600 font-semibold'
                              : 'text-gray-600 hover:bg-gray-50 font-medium'
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>
                </aside>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
