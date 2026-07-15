'use client'
import { useState, useEffect, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { client } from '@/lib/sanity'
import { allProjectsQuery, allPartnersQuery, allFundersQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { getFallbackData } from '@/lib/fallback'
import Link from 'next/link'
import Image from 'next/image'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

const THEMATIC_AREAS = [
  { value: 'all', label: 'All Areas' },
  { value: 'amr', label: 'One Health, Pathogen Intelligence and AMR' },
  { value: 'human_genomics', label: 'Human Genomics & Cancer' },
  { value: 'malaria', label: 'Malaria Computational Biology' },
  { value: 'hpc', label: 'High Performance Computing' },
  { value: 'pandemic_preparedness', label: 'Pandemic Preparedness' },
  { value: 'capacity_building_and_training', label: 'Training and Capacity Strengthening' },
  { value: 'machine_learning', label: 'Responsible AI and Digital Health Innovation' },
  { value: 'visualization', label: 'Enhanced Visualization' },
  { value: 'sustainable_digital_data_infrastructure', label: 'Sustainable Digital Data Infrastructure' },
]

const AREA_COLORS = {
  amr: 'bg-orange-50 text-orange-700 ring-orange-200',
  human_genomics: 'bg-blue-50 text-blue-700 ring-blue-200',
  malaria: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  hpc: 'bg-cyan-50 text-cyan-700 ring-cyan-200',
  pandemic_preparedness: 'bg-rose-50 text-rose-700 ring-rose-200',
  capacity_building_and_training: 'bg-teal-50 text-teal-700 ring-teal-200',
  machine_learning: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  visualization: 'bg-pink-50 text-pink-700 ring-pink-200',
  sustainable_digital_data_infrastructure: 'bg-amber-50 text-amber-700 ring-amber-200',
}

// Resolve an incoming ?area= param — which may be a canonical value (e.g. "amr")
// or a human title passed from the About page (e.g. "Human Genomics & Cancer") —
// to a canonical thematic-area value. Text matching keeps the About cards working
// even though thematic areas aren't their own documents in the backend.
function resolveAreaParam(raw) {
  if (!raw) return 'all'
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
  const target = norm(raw)
  const byValue = THEMATIC_AREAS.find((a) => a.value === raw)
  if (byValue) return byValue.value
  const byLabel = THEMATIC_AREAS.find((a) => norm(a.label) === target)
  if (byLabel) return byLabel.value
  // Loose contains match (either direction) as a final fallback
  const byPartial = THEMATIC_AREAS.find(
    (a) => a.value !== 'all' && (norm(a.label).includes(target) || target.includes(norm(a.label)))
  )
  return byPartial ? byPartial.value : 'all'
}

function ResearchPageInner() {
  const searchParams = useSearchParams()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeArea, setActiveArea] = useState('all')
  const [partners, setPartners] = useState([])
  const [funders, setFunders] = useState([])

  // Apply a thematic-area filter passed in the URL (?area=…) — e.g. from the
  // clickable cards on the About → Thematic Areas page. Accepts a value or a title.
  useEffect(() => {
    const areaParam = searchParams.get('area')
    if (areaParam) setActiveArea(resolveAreaParam(areaParam))
  }, [searchParams])

  useEffect(() => {
    async function getProjects() {
      const data = await client.fetch(allProjectsQuery)
      setProjects(data || [])
      setLoading(false)
    }
    async function getPartners() {
      try {
        const data = await client.fetch(allPartnersQuery)
        setPartners(data && data.length > 0 ? data : getFallbackData('partners') || [])
      } catch {
        setPartners(getFallbackData('partners') || [])
      }
    }
    async function getFunders() {
      try {
        const data = await client.fetch(allFundersQuery)
        setFunders(data || [])
      } catch {
        setFunders([])
      }
    }
    getProjects()
    getPartners()
    getFunders()
  }, [])

  const filtered = useMemo(() => {
    if (activeArea === 'all') return projects
    return projects.filter((p) => p.thematicAreas?.includes(activeArea))
  }, [projects, activeArea])

  const areaLabel = THEMATIC_AREAS.find((a) => a.value === activeArea)?.label

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-red-700 to-red-900 py-24 sm:py-32 overflow-hidden">
        <ACEPattern rows={6} cols={10} opacity={0.08} className="absolute top-6 right-6 hidden lg:block" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Research Projects
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              Advancing health outcomes through innovative computational research
              addressing critical challenges across Africa
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Thematic Area Filter — same tab styling as the Events page */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">Thematic Areas</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {THEMATIC_AREAS.map((area) => (
              <button
                key={area.value}
                onClick={() => setActiveArea(area.value)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeArea === area.value
                    ? 'bg-red-700 text-white shadow-md scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                {area.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Research Portfolio
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {activeArea === 'all'
              ? `${projects.length} project${projects.length !== 1 ? 's' : ''} across all thematic areas`
              : `${filtered.length} project${filtered.length !== 1 ? 's' : ''} in ${areaLabel}`}
          </p>
        </AnimateOnScroll>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-700 border-t-transparent" />
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => {
              const firstArea = project.thematicAreas?.[0]
              const firstAreaName = firstArea ? THEMATIC_AREAS.find((a) => a.value === firstArea)?.label : null

              return (
                <AnimateOnScroll key={project._id} variant="fade-up" delay={i * 60} className="h-full">
                  <Link
                    href={`/research/${project.slug?.current || project._id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all h-full"
                  >
                    {/* Fixed-height image area — always present */}
                    <div className="relative h-48 w-full shrink-0 overflow-hidden">
                      {project.featuredImage ? (
                        <Image
                          src={urlFor(project.featuredImage).width(600).height(384).url()}
                          alt={project.featuredImage.alt || project.title}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-700 to-red-900">
                          <div className="opacity-10">
                            <svg className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01-2.14 1.5H6.34A2.25 2.25 0 014.2 15m15.6 0H4.2" />
                            </svg>
                          </div>
                          {firstAreaName && (
                            <span className="absolute bottom-3 left-3 rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-white">
                              {firstAreaName}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {project.thematicAreas?.map((area) => {
                          const color = AREA_COLORS[area]
                          const label = THEMATIC_AREAS.find((a) => a.value === area)?.label
                          return label ? (
                            <span key={area} className={`rounded-full px-3 py-0.5 text-xs font-semibold ring-1 ring-inset ${color}`}>
                              {label}
                            </span>
                          ) : null
                        })}
                        {project.status && (
                          <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${
                            project.status === 'active' || project.status === 'ongoing'
                              ? 'bg-emerald-50 text-emerald-700'
                              : project.status === 'completed'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}>
                            {project.status}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-700 transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm text-gray-600 line-clamp-3 flex-1">
                        {project.excerpt}
                      </p>
                      <div className="mt-4 flex items-center text-sm font-semibold text-red-700 group-hover:text-red-600">
                        Learn more
                        <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-24">
            <ACEPattern rows={4} cols={6} opacity={0.06} className="mx-auto mb-6" />
            <p className="text-gray-500 text-lg">
              No research projects found{activeArea !== 'all' ? ` in ${areaLabel}` : ''}.
            </p>
            {activeArea !== 'all' && (
              <button
                onClick={() => setActiveArea('all')}
                className="mt-4 text-red-700 hover:text-red-600 text-sm font-medium"
              >
                View all projects →
              </button>
            )}
          </div>
        )}
      </div>

      {/* Partners & Collaborators */}
      {(funders.length > 0 || partners.filter((p) => p.type === 'collaborator').length > 0) && (
        <section className="bg-white py-24 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimateOnScroll variant="fade-up" className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Partners &amp; Collaborators</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our research is powered by strong partnerships with leading funders and collaborating institutions.
              </p>
            </AnimateOnScroll>

            {/* Funders */}
            {funders.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Funders</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {funders.map((funder, i) => (
                    <AnimateOnScroll key={funder._id} variant="zoom" delay={i * 60} className="h-full">
                      <FunderCard funder={funder} />
                    </AnimateOnScroll>
                  ))}
                </div>
              </div>
            )}

            {/* Collaborators */}
            {partners.filter((p) => p.type === 'collaborator').length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Collaborators</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {partners.filter((p) => p.type === 'collaborator').map((partner, i) => (
                    <AnimateOnScroll key={partner._id} variant="zoom" delay={i * 60}>
                      <CollaboratorBadge partner={partner} />
                    </AnimateOnScroll>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <AnimateOnScroll variant="fade-up">
        <div className="bg-red-50 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Interested in Collaboration?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We welcome partnerships and research collaborations from institutions worldwide
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="rounded-md bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-600 transition-colors inline-block"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  )
}

export default function ResearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ResearchPageInner />
    </Suspense>
  )
}

function PartnerCard({ partner }) {
  const inner = (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm hover:border-red-200 hover:shadow-md transition-all min-w-[180px]">
      {partner.logo?.url ? (
        <img src={partner.logo.url} alt={partner.logo.alt || partner.name} className="h-8 w-8 object-contain shrink-0" />
      ) : (
        <div className="h-8 w-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-red-700">{partner.name.charAt(0)}</span>
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-gray-900 leading-tight">{partner.name}</p>
        {partner.description && (
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{partner.description}</p>
        )}
      </div>
    </div>
  )

  if (partner.url) {
    return (
      <a href={partner.url} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }
  return inner
}

function FunderCard({ funder }) {
  const card = (
    <div className="group relative h-52 w-full overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 cursor-pointer">
      <div className="flex h-full items-center justify-center p-6">
        <div className="w-32 h-20 flex items-center justify-center shrink-0">
          {funder.logo?.url ? (
            <img
              src={funder.logo.url}
              alt={funder.logo.alt || funder.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center">
              <span className="text-2xl font-bold text-red-700 select-none">{funder.name.charAt(0)}</span>
            </div>
          )}
        </div>
      </div>
      {/* Slide-up hover overlay */}
      <div className="absolute inset-x-0 bottom-0 h-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-red-900 to-red-700 p-4 flex flex-col justify-end">
        {funder.logo?.url && (
          <div className="w-14 h-10 flex items-center justify-center shrink-0 mb-1">
            <img
              src={funder.logo.url}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain opacity-80 brightness-0 invert"
            />
          </div>
        )}
        <p className="text-sm font-semibold text-white leading-tight mb-1">{funder.name}</p>
        {funder.description && (
          <p className="text-xs text-red-200 line-clamp-2 mb-2">{funder.description}</p>
        )}
        {funder.website && (
          <span className="text-xs font-medium text-white/80">Visit website →</span>
        )}
      </div>
    </div>
  )

  if (funder.website) {
    return (
      <a href={funder.website} target="_blank" rel="noopener noreferrer" className="block h-52">
        {card}
      </a>
    )
  }
  return <div className="h-52">{card}</div>
}

function CollaboratorBadge({ partner }) {
  const badge = (
    <div className="flex items-center gap-2.5 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 hover:border-red-200 hover:shadow-md transition-all">
      {partner.logo?.url ? (
        <img
          src={partner.logo.url}
          alt={partner.logo.alt || partner.name}
          className="h-6 w-6 object-contain shrink-0"
        />
      ) : (
        <div className="h-6 w-6 rounded-full bg-red-50 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-red-700">{partner.name.charAt(0)}</span>
        </div>
      )}
      <span className="text-sm font-medium text-gray-800 whitespace-nowrap">{partner.name}</span>
    </div>
  )

  if (partner.url) {
    return (
      <a href={partner.url} target="_blank" rel="noopener noreferrer">
        {badge}
      </a>
    )
  }
  return badge
}
