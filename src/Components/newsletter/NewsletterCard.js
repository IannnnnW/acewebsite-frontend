import Link from 'next/link'
import Image from 'next/image'

export function formatIssueDate(date) {
  if (!date) return null
  // `publishedDate` is a plain YYYY-MM-DD; pin to UTC so it never shifts a day
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}

// Portrait (A4-ish) cover, with a branded placeholder when no cover was uploaded
export function NewsletterCover({ issue, sizes, priority = false, className = '' }) {
  return (
    <div className={`relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-red-700 to-red-900 ${className}`}>
      {issue.cover?.url ? (
        <Image
          src={issue.cover.url}
          alt={issue.cover.alt || `${issue.title} cover`}
          fill
          priority={priority}
          sizes={sizes}
          placeholder={issue.cover.lqip ? 'blur' : 'empty'}
          blurDataURL={issue.cover.lqip || undefined}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-white">
          <svg className="h-12 w-12 text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-200">ACE Uganda Newsletter</span>
          <span className="text-lg font-bold leading-snug">{issue.title}</span>
        </div>
      )}
    </div>
  )
}

export default function NewsletterCard({ issue }) {
  return (
    <Link href={`/newsletter/${issue.slug.current}`} className="group flex flex-col h-full">
      <NewsletterCover
        issue={issue}
        sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
        className="border border-gray-100 shadow-sm group-hover:shadow-lg transition-shadow"
      />
      <div className="pt-4">
        <time className="text-xs text-gray-400">{formatIssueDate(issue.publishedDate)}</time>
        <h3 className="mt-1 text-base font-bold text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2">
          {issue.title}
        </h3>
        {issue.summary && <p className="mt-2 text-sm text-gray-600 line-clamp-2">{issue.summary}</p>}
      </div>
    </Link>
  )
}
