'use client'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import { useI18n } from '@/lib/idmI18n'
import { loc, locBlock } from '@/lib/edctpLocalize'
import IdmPageHeader from '@/Components/edctp/IdmPageHeader'

function formatDate(dt, locale) {
  if (!dt) return null
  return new Date(dt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPostPage({ post }) {
  const { t, locale } = useI18n()

  const title = loc(post.title, locale)
  const body = locBlock(post.body, locale)
  const related = (post.related || []).filter((r) => r.slug?.current)

  return (
    <>
      <IdmPageHeader
        eyebrow={t('nav.blog')}
        title={title}
        subtitle={formatDate(post.publishedAt, locale)}
        breadcrumb={[
          { label: t('nav.blog'), href: '/edctp-idm/blog' },
          { label: title, href: '#' },
        ]}
      />

      <div className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {post.featuredImage?.url && (
            <div className="relative rounded-2xl overflow-hidden shadow-md mb-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.featuredImage.url} alt={title} className="w-full h-auto object-cover" />
            </div>
          )}

          {body.length > 0 ? (
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-idred-600 prose-a:no-underline hover:prose-a:underline text-gray-700 leading-relaxed">
              <PortableText value={body} />
            </div>
          ) : (
            loc(post.excerpt, locale) && (
              <p className="text-lg text-gray-700 leading-relaxed">{loc(post.excerpt, locale)}</p>
            )
          )}

          <Link
            href="/edctp-idm/blog"
            className="inline-flex items-center gap-1.5 mt-12 text-sm font-semibold text-idred-600 hover:text-idred-800 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />{t('blog.backToBlog')}
          </Link>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-20 pt-12 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('blog.relatedPosts')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r._id}
                  href={`/edctp-idm/blog/${r.slug.current}`}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-idblue-500 transition-all duration-300"
                >
                  <div className="relative h-40 overflow-hidden bg-gray-100 shrink-0">
                    {r.featuredImage?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.featuredImage.url} alt={loc(r.title, locale)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-idblue-700 to-idblue-950" />
                    )}
                  </div>
                  <div className="p-5">
                    {r.publishedAt && (
                      <p className="text-xs text-gray-400 mb-1.5">{formatDate(r.publishedAt, locale)}</p>
                    )}
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-idblue-500 transition-colors leading-snug line-clamp-2">
                      {loc(r.title, locale)}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
