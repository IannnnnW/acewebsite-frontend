'use client'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useI18n } from '@/lib/idmI18n'
import { loc } from '@/lib/edctpLocalize'
import IdmPageHeader from '@/Components/edctp/IdmPageHeader'

function formatDate(dt, locale) {
  if (!dt) return null
  return new Date(dt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogListPage({ posts }) {
  const { t, locale } = useI18n()

  return (
    <>
      <IdmPageHeader
        eyebrow={t('nav.blog')}
        title={t('blog.title')}
        breadcrumb={[{ label: t('nav.blog'), href: '/edctp-idm/blog' }]}
      />

      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {!posts?.length ? (
            <p className="text-center text-gray-400 py-12">{t('blog.empty')}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={post.slug?.current ? `/edctp-idm/blog/${post.slug.current}` : '#'}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-idblue-500 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100 shrink-0">
                    {post.featuredImage?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.featuredImage.url} alt={loc(post.title, locale)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-idblue-700 to-idblue-950" />
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    {post.publishedAt && (
                      <p className="text-xs text-gray-400 mb-2">{formatDate(post.publishedAt, locale)}</p>
                    )}
                    <h2 className="text-base font-bold text-gray-900 group-hover:text-idblue-500 transition-colors leading-snug line-clamp-2 mb-2">
                      {loc(post.title, locale)}
                    </h2>
                    {loc(post.excerpt, locale) && (
                      <p className="text-sm text-gray-500 line-clamp-3 flex-1 mb-4">{loc(post.excerpt, locale)}</p>
                    )}
                    <span className="text-sm font-semibold text-idred-600 group-hover:text-idred-800 inline-flex items-center gap-1.5 mt-auto">
                      {t('common.readMore')}
                      <ArrowRightIcon className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
