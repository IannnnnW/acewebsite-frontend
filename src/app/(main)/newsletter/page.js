import Link from 'next/link'
import { client } from '@/lib/sanity'
import { allNewslettersQuery } from '@/lib/queries'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'
import NewsletterCard, { NewsletterCover, formatIssueDate } from '@/Components/newsletter/NewsletterCard'

export const revalidate = 60

export const metadata = {
  title: 'Newsletter | ACE Uganda',
  description: 'Read and download the ACE Uganda newsletter — news, research highlights and updates from the African Center of Excellence in Bioinformatics and Data-Intensive Sciences.',
}

async function getIssues() {
  try { return await client.fetch(allNewslettersQuery) }
  catch { return [] }
}

export default async function NewsletterPage() {
  const issues = await getIssues()
  const [latest, ...past] = issues

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-red-700 to-red-900 py-24 sm:py-32 overflow-hidden">
        <ACEPattern rows={6} cols={12} opacity={0.08} className="absolute top-6 right-6" />
        <ACEPattern rows={4} cols={6} opacity={0.06} className="absolute bottom-6 left-6" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <AnimateOnScroll variant="fade-up">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Newsletter</h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              News, research highlights and updates from ACE Uganda
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        {!latest ? (
          <div className="text-center py-24">
            <ACEPattern rows={5} cols={8} opacity={0.08} className="mx-auto mb-6" />
            <p className="text-gray-500 text-lg">No newsletter issues published yet — check back soon.</p>
          </div>
        ) : (
          <>
            {/* Latest issue, featured */}
            <AnimateOnScroll variant="fade-up">
              <Link
                href={`/newsletter/${latest.slug.current}`}
                className="group grid grid-cols-1 md:grid-cols-[minmax(0,280px)_1fr] gap-8 lg:gap-14 items-center rounded-3xl bg-gray-50 p-6 sm:p-10 hover:bg-red-50/60 transition-colors"
              >
                <NewsletterCover issue={latest} priority sizes="(max-width:768px) 100vw,280px" className="shadow-xl max-w-[280px] w-full mx-auto md:mx-0" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">Latest issue</p>
                  <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 group-hover:text-red-700 transition-colors">
                    {latest.title}
                  </h2>
                  <time className="mt-2 block text-sm text-gray-500">{formatIssueDate(latest.publishedDate)}</time>
                  {latest.summary && <p className="mt-5 text-lg leading-8 text-gray-600">{latest.summary}</p>}
                  <span className="mt-8 inline-flex items-center gap-2 rounded-lg bg-red-700 px-5 py-3 text-sm font-semibold text-white group-hover:bg-red-800 transition-colors">
                    Read this issue <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </AnimateOnScroll>

            {/* Archive */}
            {past.length > 0 && (
              <div className="mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Past issues</h2>
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                  {past.map((issue, i) => (
                    <AnimateOnScroll key={issue._id} variant="fade-up" delay={i * 60}>
                      <NewsletterCard issue={issue} />
                    </AnimateOnScroll>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
