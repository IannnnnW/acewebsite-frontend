import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { newsletterBySlugQuery, allNewsletterSlugsQuery } from '@/lib/queries'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'
import NewsletterReader from '@/Components/newsletter/NewsletterReader'
import NewsletterCard, { formatIssueDate } from '@/Components/newsletter/NewsletterCard'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await client.fetch(allNewsletterSlugsQuery)
  return slugs.map((s) => ({ slug: s.slug }))
}

async function getIssue(slug) {
  try { return await client.fetch(newsletterBySlugQuery, { slug }) }
  catch { return null }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const issue = await getIssue(slug)
  if (!issue) return {}
  const title = `${issue.title} | ACE Uganda Newsletter`
  return {
    title,
    description: issue.summary,
    openGraph: {
      title,
      description: issue.summary,
      type: 'article',
      images: issue.cover?.url ? [{ url: `${issue.cover.url}?w=1200&h=630&fit=crop&crop=top` }] : undefined,
    },
  }
}

export default async function NewsletterIssuePage({ params }) {
  const { slug } = await params
  const issue = await getIssue(slug)
  if (!issue) notFound()

  const highlights = (issue.highlights || []).filter(Boolean)

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-red-700 to-red-900 py-20 sm:py-24 overflow-hidden">
        <ACEPattern rows={6} cols={12} opacity={0.08} className="absolute top-6 right-6" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up">
            <Link href="/newsletter" className="text-sm font-medium text-red-200 hover:text-white transition-colors">
              ← All issues
            </Link>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">{issue.title}</h1>
            <time className="mt-4 block text-red-100">{formatIssueDate(issue.publishedDate)}</time>
          </AnimateOnScroll>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-14">
        {/* Summary + highlights: plain text so the issue is findable and skimmable */}
        {(issue.summary || highlights.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,360px)] gap-10 mb-12">
            {issue.summary && <p className="text-lg leading-8 text-gray-700">{issue.summary}</p>}
            {highlights.length > 0 && (
              <div className="rounded-2xl bg-gray-50 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700 mb-4">In this issue</p>
                <ul className="space-y-3">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-700" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <NewsletterReader title={issue.title} pdf={issue.pdf} />

        {/* More issues */}
        {issue.otherIssues?.length > 0 && (
          <div className="mt-24 border-t border-gray-100 pt-14">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">More issues</h2>
              <Link href="/newsletter" className="text-sm font-medium text-red-700 hover:underline">View all →</Link>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3">
              {issue.otherIssues.map((other) => <NewsletterCard key={other._id} issue={other} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
