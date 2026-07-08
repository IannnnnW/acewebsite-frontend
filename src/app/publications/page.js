'use client'
import { useState, useEffect, useMemo } from 'react'
import { client } from '@/lib/sanity'
import { allPublicationsQuery } from '@/lib/queries'

const THEMATIC_AREAS = [
  { value: 'all', label: 'All Areas' },
  { value: 'amr', label: 'AMR' },
  { value: 'human_genomics', label: 'Human Genomics' },
  { value: 'malaria', label: 'Malaria' },
  { value: 'hpc', label: 'High Performance Computing' },
  { value: 'mathematical_modelling', label: 'Mathematical Modelling' },
  { value: 'capacity_building_and_training', label: 'Capacity Building & Training' },
  { value: 'machine_learning', label: 'AI & Machine Learning' },
  { value: 'databases_and_pipelines', label: 'Databases & Pipelines' },
  { value: 'reviews_and_perspectives', label: 'Reviews and Perspectives' },
  { value: 'visualization', label: 'Visualization' },
  { value: 'other_bioinformatics', label: 'Other Bioinformatics' },
]

const ITEMS_PER_PAGE = 10

export default function PublicationsPage() {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeArea, setActiveArea] = useState('all')
  const [activeYear, setActiveYear] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function getPublications() {
      const data = await client.fetch(allPublicationsQuery)
      setPublications(data)
      setLoading(false)
    }
    getPublications()
  }, [])

  const availableYears = useMemo(() => {
    const years = publications
      .map((p) => {
        const raw = p.publishedAt || p.date
        if (!raw) return null
        return new Date(raw).getFullYear()
      })
      .filter(Boolean)
    return [...new Set(years)].sort((a, b) => b - a)
  }, [publications])

  const filtered = useMemo(() => {
    let result = publications || []
    if (activeArea !== 'all') {
      result = result.filter((p) => p.thematicAreas?.includes(activeArea))
    }
    if (activeYear !== 'all') {
      result = result.filter((p) => {
        const raw = p.publishedAt || p.date
        if (!raw) return false
        return new Date(raw).getFullYear() === Number(activeYear)
      })
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.authors?.some((a) => a.toLowerCase().includes(q)) ||
          p.abstract?.toLowerCase().includes(q) ||
          p.journal?.toLowerCase().includes(q) ||
          p.publisherName?.toLowerCase().includes(q)
      )
    }
    return result
  }, [publications, activeArea, activeYear, search])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  function handleSearchChange(e) {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  function handleAreaChange(area) {
    setActiveArea(area)
    setCurrentPage(1)
  }

  function handleYearChange(year) {
    setActiveYear(year)
    setCurrentPage(1)
  }

  function handlePageChange(page) {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function getPageNumbers() {
    const pages = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages)
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
    }
    return pages
  }

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading publications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-700 to-red-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Publications
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              Peer-reviewed research contributing to scientific knowledge and health advancement in Africa
            </p>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4 space-y-3">
          {/* Search bar */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by title, author, journal, or abstract…"
              className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            {search && (
              <button
                onClick={() => { setSearch(''); setCurrentPage(1) }}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Thematic area tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {THEMATIC_AREAS.map((area) => (
              <button
                key={area.value}
                onClick={() => handleAreaChange(area.value)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeArea === area.value
                    ? 'bg-red-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-700'
                }`}
              >
                {area.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Two-column layout: publications list + year sidebar */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">

        {/* Simple section heading — sits above both columns */}
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Publications
          </h2>
          <p className="text-sm text-gray-400">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            {activeArea !== 'all' && ` · ${THEMATIC_AREAS.find((a) => a.value === activeArea)?.label}`}
            {activeYear !== 'all' && ` · ${activeYear}`}
          </p>
        </div>

        <div className="flex gap-10 items-start">

          {/* LEFT — Publications list */}
          <div className="flex-1 min-w-0">

            {/* Mobile year filter — hidden on lg+ */}
            {availableYears.length > 1 && (
              <div className="lg:hidden mb-6 flex items-center gap-3">
                <label htmlFor="year-select" className="text-xs font-bold uppercase tracking-widest text-gray-400 shrink-0">
                  Year
                </label>
                <select
                  id="year-select"
                  value={activeYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option value="all">All Years</option>
                  {availableYears.map((year) => (
                    <option key={year} value={String(year)}>{year}</option>
                  ))}
                </select>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-end mb-4">
                <p className="text-sm text-gray-500">Page {currentPage} of {totalPages}</p>
              </div>
            )}

            {paginated.length > 0 ? (
              <>
                <YearGroupedList publications={paginated} startIndex={startIndex} thematicAreas={THEMATIC_AREAS} activeYear={activeYear} />

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        currentPage === 1
                          ? 'text-gray-400 bg-gray-100 border border-gray-300 cursor-not-allowed'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>

                    <div className="hidden sm:flex gap-2">
                      {getPageNumbers().map((page, idx) =>
                        page === '...' ? (
                          <span key={`ellipsis-${idx}`} className="px-4 py-2 text-gray-500">...</span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                              page === currentPage
                                ? 'bg-red-700 text-white'
                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>

                    <div className="sm:hidden px-4 py-2 text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        currentPage === totalPages
                          ? 'text-gray-400 bg-gray-100 border border-gray-300 cursor-not-allowed'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Next
                      <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </nav>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500">No publications match your search.</p>
                <button
                  onClick={() => { setSearch(''); setActiveArea('all'); setActiveYear('all'); setCurrentPage(1) }}
                  className="mt-4 text-sm text-red-700 hover:text-red-600 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* RIGHT — Sticky year sidebar (lg+ only) */}
          <aside
            className="hidden lg:block w-56 shrink-0 self-start"
            style={{ position: 'sticky', top: '8rem' }}
          >
            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">

              {/* Sidebar header */}
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Filter by Year
                </p>
              </div>

              {/* Year options */}
              <div className="p-2 flex flex-col gap-0.5">

                {/* All Years */}
                <button
                  onClick={() => handleYearChange('all')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeYear === 'all'
                      ? 'bg-red-700 text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span>All Years</span>
                  {activeYear === 'all' && (
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                <div className="h-px bg-gray-100 mx-2 my-1" />

                {/* Individual year buttons with per-year count badge */}
                {availableYears.map((year) => {
                  const yearCount = publications.filter((p) => {
                    const raw = p.publishedAt || p.date
                    return raw && new Date(raw).getFullYear() === year
                  }).length

                  return (
                    <button
                      key={year}
                      onClick={() => handleYearChange(String(year))}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                        activeYear === String(year)
                          ? 'bg-red-50 text-red-700 font-semibold border-l-[3px] border-red-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium border-l-[3px] border-transparent'
                      }`}
                    >
                      <span>{year}</span>
                      <span className={`text-xs rounded-full px-2 py-0.5 font-medium ${
                        activeYear === String(year)
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {yearCount}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Footer — live result count */}
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                <p className="text-xs text-gray-400 leading-relaxed">
                  <span className="font-bold text-gray-700">{filtered.length}</span>
                  {' '}publication{filtered.length !== 1 ? 's' : ''}
                  {activeYear !== 'all' ? ` in ${activeYear}` : ' total'}
                </p>
                {(activeArea !== 'all' || activeYear !== 'all') && (
                  <button
                    onClick={() => { handleAreaChange('all'); handleYearChange('all') }}
                    className="mt-1.5 text-xs text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear filters ×
                  </button>
                )}
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* CTA */}
      <div className="bg-red-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Collaborate with Us</h2>
            <p className="mt-4 text-lg text-gray-600">
              Interested in collaborative research? Let&apos;s work together to advance science
            </p>
            <div className="mt-8">
              <a
                href="/contact"
                className="rounded-md bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-800 transition-colors inline-block"
              >
                Start a Conversation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatPubDate(dateStr) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
}

function getPubYear(pub) {
  const src = pub.publishedAt || pub.date
  return src ? src.slice(0, 4) : 'Undated'
}

function YearGroupedList({ publications, startIndex, thematicAreas, activeYear }) {
  // Group into ordered years
  const groups = []
  const seen = new Map()
  publications.forEach((pub, idx) => {
    const year = getPubYear(pub)
    if (!seen.has(year)) {
      seen.set(year, groups.length)
      groups.push({ year, items: [] })
    }
    groups[seen.get(year)].items.push({ pub, globalIdx: startIndex + idx })
  })

  return (
    <div className="space-y-12">
      {groups.map(({ year, items }) => (
        <div key={year}>
          {/* Year heading — only when showing all years */}
          {activeYear === 'all' && (
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-bold text-gray-400 shrink-0">{year}</span>
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-xs text-gray-400 shrink-0">{items.length} publication{items.length !== 1 ? 's' : ''}</span>
            </div>
          )}

          <div className="space-y-4">
            {items.map(({ pub, globalIdx }) => (
              <article
                key={pub._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {pub.thematicAreas?.map((area) => (
                        <span key={area} className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                          {thematicAreas.find((a) => a.value === area)?.label || area}
                        </span>
                      ))}
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {pub.type && (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                            {{'journal': 'Journal Article', 'book': 'Book', 'conference': 'Conference Paper'}[pub.type] || pub.type}
                          </span>
                        )}
                        {pub.publisherName && pub.type && (
                          <span className="text-gray-300">·</span>
                        )}
                        {pub.publisherName && (
                          <span className="text-xs text-gray-500">{pub.publisherName}</span>
                        )}
                      </div>
                      {pub.featured && (
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                          Featured
                        </span>
                      )}
                      {(pub.publishedAt || pub.date) && (
                        <span className="text-xs text-gray-400">
                          {formatPubDate(pub.publishedAt || pub.date)}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{pub.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{pub.authors?.join(', ')}</p>

                    {pub.journal && (
                      <p className="text-sm text-gray-700 italic mb-3">{pub.journal}</p>
                    )}
                    {pub.abstract && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{pub.abstract}</p>
                    )}

                    <div className="flex items-center gap-4">
                      {pub.doi && (
                        <a
                          href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-red-700 hover:text-red-600"
                        >
                          DOI ↗
                        </a>
                      )}
                      {pub.url && (
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-red-700 hover:text-red-600"
                        >
                          View Publication
                          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <div className="text-3xl font-bold text-gray-200">
                      {(globalIdx + 1).toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
