'use client'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useI18n } from '@/lib/idmI18n'
import { getContinent } from '@/lib/edctpCountryCoords'
import IdmPageHeader from '@/Components/edctp/IdmPageHeader'
import PartnersSection from '@/Components/edctp/sections/PartnersSection'

const CollaboratorsMap = dynamic(() => import('@/Components/edctp/sections/CollaboratorsMap'), {
  ssr: false,
  loading: () => <div className="w-full animate-pulse bg-gray-100" style={{ height: '65vh', minHeight: 480 }} />,
})

function StatBand({ stats }) {
  return (
    <div className="flex items-center justify-center gap-0 py-3 bg-idblue-900">
      {stats.map((stat, i) => (
        <div key={stat.label} className="flex items-center">
          {i > 0 && <div className="mx-6 h-5 w-px bg-white/20" />}
          <span className="text-sm font-semibold text-white">
            <span className="text-idblue-500 mr-1">{stat.value}</span>{stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function PartnersPage({ partners, collaborators }) {
  const { t } = useI18n()

  const beneficiaries = (partners || []).filter((p) => (p.group || 'beneficiary') === 'beneficiary')
  const sites = (partners || []).filter((p) => p.group === 'partnerSite')

  const { totalCollaborators, countryCount, continentCount } = useMemo(() => {
    const all = [...(partners || []), ...(collaborators || [])]
    const countries = new Set(all.map((p) => p.country?.trim().toLowerCase()).filter(Boolean))
    const continents = new Set(
      [...countries].map((c) => getContinent(c)).filter(Boolean)
    )
    return { totalCollaborators: all.length, countryCount: countries.size, continentCount: continents.size }
  }, [partners, collaborators])

  const stats = [
    { value: totalCollaborators, label: t('partners.statCollaborators') },
    { value: countryCount, label: t('partners.statCountries') },
    { value: continentCount, label: t('partners.statContinents') },
  ]

  return (
    <>
      <IdmPageHeader
        eyebrow={t('nav.partners')}
        title={t('partners.title')}
        breadcrumb={[{ label: t('nav.partners'), href: '/edctp-idm/partners' }]}
      />

      <StatBand stats={stats} />

      <div className="bg-white py-6 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-idblue-900">
          {t('partners.mapTitle')}
        </h2>
      </div>

      <CollaboratorsMap beneficiaries={beneficiaries} collaborators={collaborators} sites={sites} />

      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <PartnersSection partners={partners} collaborators={collaborators} />
        </div>
      </div>
    </>
  )
}
