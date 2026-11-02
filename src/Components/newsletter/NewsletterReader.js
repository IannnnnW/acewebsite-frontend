'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

function formatSize(bytes) {
  if (!bytes) return null
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
}

function downloadName(title, originalFilename) {
  if (originalFilename) return originalFilename
  return `${(title || 'ACE-Uganda-Newsletter').replace(/[^\w-]+/g, '-')}.pdf`
}

// Inline PDF viewing only works reliably in desktop browsers: Android Chrome
// can't render PDFs in an iframe at all, and iOS Safari shows just the first
// page. Phones/tablets get a button that opens the device's own PDF viewer.
function useCanEmbedPdf() {
  const [canEmbed, setCanEmbed] = useState(null)
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches
    setCanEmbed(desktop && navigator.pdfViewerEnabled !== false)
  }, [])
  return canEmbed
}

function ShareButton({ title }) {
  const [copied, setCopied] = useState(false)

  async function share() {
    const url = window.location.href
    trackEvent('newsletter_share', { newsletter_title: title })
    if (navigator.share) {
      try { await navigator.share({ title, url }) } catch { /* dismissed */ }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard unavailable */ }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-red-700 hover:text-red-700 transition-colors"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      {copied ? 'Link copied' : 'Share'}
    </button>
  )
}

export default function NewsletterReader({ title, pdf }) {
  const canEmbed = useCanEmbedPdf()

  if (!pdf?.url) {
    return <p className="rounded-2xl border border-dashed border-gray-200 py-12 text-center text-gray-400">The PDF for this issue isn&apos;t available yet.</p>
  }

  const size = formatSize(pdf.size)
  const downloadUrl = `${pdf.url}?dl=${encodeURIComponent(downloadName(title, pdf.originalFilename))}`
  const onRead = () => trackEvent('newsletter_read', { newsletter_title: title })
  const onDownload = () => trackEvent('newsletter_download', { newsletter_title: title })

  return (
    <div>
      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <a
          href={pdf.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onRead}
          className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {canEmbed ? 'Open full screen' : 'Read newsletter'}
        </a>
        <a
          href={downloadUrl}
          onClick={onDownload}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-red-700 hover:text-red-700 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF{size && <span className="font-normal text-gray-400">· {size}</span>}
        </a>
        <ShareButton title={title} />
      </div>

      {/* Desktop: read in the page */}
      {canEmbed && (
        <iframe
          src={`${pdf.url}#view=FitH`}
          title={title}
          onLoad={onRead}
          className="w-full rounded-2xl border border-gray-200 bg-gray-100 shadow-sm"
          style={{ height: '85vh', minHeight: 600 }}
        />
      )}

      {/* Phones/tablets: hand off to the device's PDF viewer (no PDF is loaded until they tap) */}
      {canEmbed === false && (
        <p className="text-sm text-gray-500">
          &ldquo;Read newsletter&rdquo; opens the issue in your device&apos;s PDF viewer.
        </p>
      )}

      {/* Before detection runs (first paint), reserve the space on large screens to avoid a layout jump */}
      {canEmbed === null && (
        <div className="hidden lg:block w-full animate-pulse rounded-2xl bg-gray-100" style={{ height: '85vh', minHeight: 600 }} />
      )}
    </div>
  )
}
