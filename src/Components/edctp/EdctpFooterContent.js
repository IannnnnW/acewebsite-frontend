'use client'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import Link from 'next/link'
import { useI18n } from '@/lib/idmI18n'

const ACE_SOCIAL_LABELS = {
  twitter: 'X (Twitter)',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  instagram: 'Instagram',
  github: 'GitHub',
}

export default function EdctpFooterContent({ siteSettings, edctpSettings }) {
  const { t } = useI18n()

  const aceSocials = siteSettings?.socials
    ? Object.entries(siteSettings.socials).filter(([, url]) => !!url)
    : []
  const idiSocials = (edctpSettings?.idiSocials || []).filter((s) => s?.url)

  const programName = edctpSettings?.programName || 'IDM-Africa'
  const phone = edctpSettings?.contactPhone || '0312 211 444'
  const footerLogo = edctpSettings?.logoLight?.url || edctpSettings?.logo?.url

  return (
    <footer className="bg-idblue-900 text-idblue-100">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Zone 1 — brand + grant number / contact */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 pb-10 border-b border-idblue-800">
          <div className="flex items-center gap-3">
            {footerLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={footerLogo} alt={programName} className="h-[120px] w-auto object-contain" />
            ) : (
              <p className="font-bold text-white text-lg leading-tight">{programName}</p>
            )}
            <div>
              <p className="text-xs text-idblue-300">{t('footer.grantNumber')}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white mb-2">{t('footer.contactTitle')}</p>
            {phone && <p className="inline-flex items-center gap-1.5 text-sm text-idblue-200"><LocalPhoneOutlinedIcon sx={{ fontSize: 14 }} />{phone}</p>}
            {siteSettings?.contactEmail && (
              <a href={`mailto:${siteSettings.contactEmail}`} className="flex items-center gap-1.5 text-sm text-idblue-200 hover:text-idblue-500 transition-colors">
                <EmailOutlinedIcon sx={{ fontSize: 14 }} />
                {siteSettings.contactEmail}
              </a>
            )}
          </div>
        </div>

        {/* Zone 2 — IDI socials (left) / ACE socials (right) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 py-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white mb-3">{t('footer.followIdi')}</p>
            {idiSocials.length > 0 ? (
              <div className="flex flex-col gap-1.5">
                {idiSocials.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-idblue-200 hover:text-idblue-500 transition-colors">
                    {s.platform}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-idblue-500">—</p>
            )}
          </div>

          <div className="sm:text-right">
            <p className="text-xs font-semibold uppercase tracking-widest text-white mb-3">{t('footer.followAce')}</p>
            {aceSocials.length > 0 ? (
              <div className="flex flex-col gap-1.5 sm:items-end">
                {aceSocials.map(([platform, url]) => (
                  <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-idblue-200 hover:text-idblue-500 transition-colors">
                    {ACE_SOCIAL_LABELS[platform] || platform}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-idblue-500">—</p>
            )}
          </div>
        </div>
      </div>

      {/* Zone 3 — EDCTP funding acknowledgement */}
      <div className="bg-idblue-950 border-t border-idblue-800">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          {edctpSettings?.edctpAcknowledgementLogo?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={edctpSettings.edctpAcknowledgementLogo.url}
              alt="EDCTP"
              className="h-10 shrink-0 object-contain bg-white/10 rounded p-1.5"
            />
          )}
          <p className="text-xs text-idblue-200 leading-relaxed text-center sm:text-left">
            {t('footer.acknowledgement')}
          </p>
        </div>
      </div>

      {/* Zone 4 — copyright */}
      <div className="border-t border-idblue-800">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-idblue-300">
          <p>{t('footer.copyright')}</p>
          <Link href="/" className="hover:text-idblue-500 transition-colors">
            {t('footer.backToAce')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
