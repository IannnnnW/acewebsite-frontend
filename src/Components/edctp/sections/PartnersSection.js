'use client'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useI18n } from '@/lib/idmI18n'
import { loc } from '@/lib/edctpLocalize'

function PartnerCard({ partner, t, locale }) {
  const role = loc(partner.role, locale)

  const card = (
    <div className="group relative h-40 w-full overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-idblue-500 transition-all duration-300 cursor-pointer">
      <div className="flex h-full items-center justify-center p-5">
        {partner.logo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={partner.logo.url} alt={partner.name} className="w-28 h-16 object-contain" />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-idblue-100 flex items-center justify-center">
              <span className="text-lg font-bold text-idblue-500">{partner.name.charAt(0)}</span>
            </div>
            <span className="text-xs text-gray-500 text-center line-clamp-2">{partner.name}</span>
          </div>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-idblue-900 to-idblue-900 p-4 flex flex-col justify-end">
        <p className="text-sm font-semibold text-white mb-1 leading-tight">{partner.name}</p>
        {partner.country && <p className="text-xs text-idblue-300 mb-1">{partner.country}</p>}
        {role && <p className="text-xs text-idblue-200 line-clamp-2">{role}</p>}
        {partner.website && <span className="inline-flex items-center gap-1 text-xs text-idred-300 font-medium mt-1">{t('partners.visit')} <OpenInNewIcon sx={{ fontSize: 12 }} /></span>}
      </div>
    </div>
  )

  if (partner.website) {
    return (
      <a href={partner.website} target="_blank" rel="noopener noreferrer" className="block h-40">
        {card}
      </a>
    )
  }
  return <div className="h-40">{card}</div>
}

function CollaboratorBadge({ partner }) {
  const badge = (
    <div className="flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-4 py-2.5 hover:border-idblue-500 hover:shadow-md transition-all">
      {partner.logo?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={partner.logo.url} alt={partner.name} className="h-6 w-6 object-contain shrink-0" />
      ) : (
        <div className="h-6 w-6 rounded-full bg-idblue-50 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-idblue-500">{partner.name.charAt(0)}</span>
        </div>
      )}
      <span className="text-sm font-medium text-gray-800 whitespace-nowrap">{partner.name}</span>
      {partner.country && <span className="text-xs text-gray-400">· {partner.country}</span>}
    </div>
  )

  if (partner.website) {
    return <a href={partner.website} target="_blank" rel="noopener noreferrer">{badge}</a>
  }
  return badge
}

function PartnerGroup({ id, title, partners, t, locale }) {
  if (!partners?.length) return null
  return (
    <div id={id} className="mb-10 last:mb-0 scroll-mt-24">
      <p className="text-xs font-bold uppercase tracking-widest text-idblue-500 mb-4">{title}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {partners.map((p) => <PartnerCard key={p._id} partner={p} t={t} locale={locale} />)}
      </div>
    </div>
  )
}

export default function PartnersSection({ partners, collaborators }) {
  const { t, locale } = useI18n()

  const beneficiaries = (partners || []).filter((p) => (p.group || 'beneficiary') === 'beneficiary')
  const partnerSites = (partners || []).filter((p) => p.group === 'partnerSite')

  const isEmpty = beneficiaries.length === 0 && partnerSites.length === 0 && !collaborators?.length

  if (isEmpty) {
    return <p className="text-center text-gray-400 py-12">{t('partners.empty')}</p>
  }

  return (
    <div>
      <PartnerGroup id="beneficiaries" title={t('partners.beneficiaries')} partners={beneficiaries} t={t} locale={locale} />

      {collaborators?.length > 0 && (
        <div id="collaborators" className="mb-10 last:mb-0 scroll-mt-24">
          <p className="text-xs font-bold uppercase tracking-widest text-idblue-500 mb-4">{t('partners.collaborators')}</p>
          <div className="flex flex-wrap gap-3">
            {collaborators.map((c) => <CollaboratorBadge key={c._id} partner={c} />)}
          </div>
        </div>
      )}

      <PartnerGroup id="sites" title={t('partners.partnerSites')} partners={partnerSites} t={t} locale={locale} />
    </div>
  )
}
