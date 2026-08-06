'use client'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { useI18n } from '@/lib/idmI18n'
import { loc } from '@/lib/edctpLocalize'

function formatDate(d, locale) {
  if (!d) return null
  return new Date(d).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function NewsletterSection({ issues }) {
  const { t, locale } = useI18n()

  if (!issues?.length) return (
    <p className="text-center text-gray-400 py-12">{t('newsletter.empty')}</p>
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {issues.map((issue) => {
        const issueTitle = loc(issue.issueTitle, locale)
        return (
          <div key={issue._id} className="rounded-2xl border border-gray-200 overflow-hidden bg-white hover:shadow-md hover:border-idblue-500 transition-all">
            {issue.coverImage?.url ? (
              <div className="relative h-52">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={issue.coverImage.url} alt={issueTitle} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="h-52 bg-gradient-to-br from-idblue-600 to-idblue-900 flex flex-col items-center justify-center gap-2">
                <svg className="h-10 w-10 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-white/60 text-xs font-medium">{t('newsletter.title')}</span>
              </div>
            )}
            <div className="p-5">
              <p className="text-xs text-gray-400 mb-1">{formatDate(issue.publishedDate, locale)}</p>
              <h3 className="font-semibold text-gray-900 mb-2 leading-snug">{issueTitle}</h3>
              {loc(issue.summary, locale) && (
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{loc(issue.summary, locale)}</p>
              )}
              {issue.pdfFile && (
                <a
                  href={issue.pdfFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-idred-600 px-4 py-2 text-sm font-semibold text-white hover:bg-idred-800 transition-colors"
                >
                  <FileDownloadOutlinedIcon sx={{ fontSize: 16 }} />
                  {t('newsletter.downloadPdf')}
                </a>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
