import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity'
import { allBlogPostsQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

export const revalidate = 60

async function getPosts() {
  try { return await client.fetch(allBlogPostsQuery) }
  catch { return [] }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-red-700 to-red-900 py-24 sm:py-32 overflow-hidden">
        <ACEPattern rows={6} cols={12} opacity={0.08} className="absolute top-6 right-6" />
        <ACEPattern rows={4} cols={6} opacity={0.06} className="absolute bottom-6 left-6" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <AnimateOnScroll variant="fade-up">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Blog</h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              Insights, updates, and stories from the ACE Uganda team
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Posts grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <AnimateOnScroll key={post._id} variant="fade-up" delay={i * 80}>
                <Link href={`/blog/${post.slug.current}`} className="group flex flex-col h-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                  {/* thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-red-50 to-red-100 overflow-hidden">
                    {post.featuredImage?.url ? (
                      <Image
                        src={post.featuredImage.url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="h-12 w-12 text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      </div>
                    )}
                    {/* red corner accent */}
                    <div className="absolute top-0 left-0 h-1 w-12 bg-red-700 group-hover:w-full transition-all duration-500" />
                  </div>

                  {/* body */}
                  <div className="flex flex-col flex-1 p-6">
                    <time className="text-xs text-gray-400 mb-2">{formatDate(post.publishedAt)}</time>
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2 mb-3">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-gray-600 line-clamp-3 flex-1">{post.excerpt}</p>
                    )}
                    <div className="mt-4 flex items-center gap-2">
                      {post.author?.image && (
                        <div className="relative h-7 w-7 rounded-full overflow-hidden bg-gray-100 shrink-0">
                          <Image
                            src={urlFor(post.author.image).width(56).height(56).url()}
                            alt={post.author.name}
                            fill className="object-cover"
                          />
                        </div>
                      )}
                      {post.author?.name && (
                        <span className="text-xs text-gray-500">{post.author.name}</span>
                      )}
                      <span className="ml-auto text-xs font-medium text-red-700 group-hover:underline">
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <ACEPattern rows={5} cols={8} opacity={0.08} className="mx-auto mb-6" />
            <p className="text-gray-500 text-lg">No posts published yet — check back soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
