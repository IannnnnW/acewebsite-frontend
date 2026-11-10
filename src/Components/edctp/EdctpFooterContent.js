'use client'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { useI18n } from '@/lib/idmI18n'
import { SOCIAL_ICONS, LINK_ICON, getSocialIcon } from '@/lib/socialIcons'

const ACE_SOCIAL_LABELS = {
  twitter: 'X (Twitter)',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  instagram: 'Instagram',
  github: 'GitHub',
}

// The uploaded EDCTP artwork has a sentence with the grant number baked into its
// lower part. Trim only this file, so a replacement upload is never cropped by mistake.
const ACK_LOGO_WITH_CAPTION = '5805300243a61b2c78c29dfe8b3b6f360df6bd6b-2000x1297.png'

function ackLogoSrc(url) {
  return url?.endsWith(ACK_LOGO_WITH_CAPTION) ? `${url}?rect=0,0,2000,944&w=480` : url
}

function SocialLink({ href, label, icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-idblue-100 hover:text-white transition-colors">
      <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox={icon.viewBox} aria-hidden="true">
        <path d={icon.path} />
      </svg>
      {label}
    </a>
  )
}

export default function EdctpFooterContent({ siteSettings, edctpSettings }) {
  const { t } = useI18n()

  const aceSocials = siteSettings?.socials
    ? Object.entries(siteSettings.socials).filter(([, url]) => !!url)
    : []
  const idiSocials = (edctpSettings?.idiSocials || []).filter((s) => s?.url)

  const phone = edctpSettings?.contactPhone || '0312 211 444'

  return (
    <footer className="bg-idblue-900 text-idblue-100">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Zone 1 — EDCTP funding acknowledgement / contact */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 pb-10 border-b border-idblue-800">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {edctpSettings?.edctpAcknowledgementLogo?.url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={ackLogoSrc(edctpSettings.edctpAcknowledgementLogo.url)}
                alt="Global Health EDCTP3, co-funded by the European Union"
                className="h-24 w-fit shrink-0 object-contain bg-white rounded-md p-2"
              />
            )}
            <p className="max-w-sm text-sm text-white leading-snug">
              {t('footer.acknowledgement')}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white mb-2">{t('footer.contactTitle')}</p>
            {phone && <p className="inline-flex items-center gap-1.5 text-sm text-idblue-100"><LocalPhoneOutlinedIcon sx={{ fontSize: 14 }} />{phone}</p>}
            {siteSettings?.contactEmail && (
              <a href={`mailto:${siteSettings.contactEmail}`} className="flex items-center gap-1.5 text-sm text-idblue-100 hover:text-white transition-colors">
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
              <div className="flex flex-col items-start gap-2.5">
                {idiSocials.map((s, i) => (
                  <SocialLink key={i} href={s.url} label={s.platform} icon={getSocialIcon(s.platform, s.url)} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-idblue-300">—</p>
            )}
          </div>

          <div className="sm:text-right">
            <p className="text-xs font-semibold uppercase tracking-widest text-white mb-3">{t('footer.followAce')}</p>
            {aceSocials.length > 0 ? (
              <div className="flex flex-col items-start gap-2.5 sm:items-end">
                {aceSocials.map(([platform, url]) => (
                  <SocialLink key={platform} href={url} label={ACE_SOCIAL_LABELS[platform] || platform} icon={SOCIAL_ICONS[platform] || LINK_ICON} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-idblue-300">—</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
