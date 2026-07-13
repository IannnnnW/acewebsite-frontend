import Link from 'next/link'
import Image from 'next/image'
import { Tweet } from 'react-tweet'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'

export function tweetIdFromUrl(url) {
  const match = url?.match(/status(?:es)?\/(\d+)/)
  return match ? match[1] : null
}

function ExternalPostCard({ post }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-red-200 transition-all"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
        {post.platform === 'linkedin' ? 'LinkedIn' : 'Social Post'}
      </p>
      <p className="text-sm font-medium text-gray-900">{post.caption || post.url}</p>
      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-red-700">
        View post
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </span>
    </a>
  )
}

function StoryCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug?.current}`}
      className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md hover:border-red-200 transition-all"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        {post.featuredImage?.url ? (
          <Image src={post.featuredImage.url} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-900" />
        )}
      </div>
      <div className="min-w-0">
        {post.publishedAt && (
          <p className="text-xs text-gray-400 mb-1">
            {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        )}
        <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-700 transition-colors leading-snug line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && <p className="mt-1 text-xs text-gray-500 line-clamp-2">{post.excerpt}</p>}
      </div>
    </Link>
  )
}

export default function SocialFeedSection({ socialPosts, blogPosts }) {
  const hasSocial = socialPosts?.length > 0
  const hasStories = blogPosts?.length > 0

  if (!hasSocial && !hasStories) return null

  return (
    <section className="bg-white py-16 border-t border-gray-100" data-theme="light">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Social &amp; Stories
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            What we&apos;re sharing and writing about right now
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Running social media posts */}
          {hasSocial && (
            <div className={hasStories ? '' : 'lg:col-span-2'}>
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">From Our Socials</h3>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              <div className="space-y-4 [&_.react-tweet-theme]:!my-0 [&_.react-tweet-theme]:!max-w-none">
                {socialPosts.map((post) => {
                  const tweetId = post.platform === 'twitter' ? tweetIdFromUrl(post.url) : null
                  return tweetId ? (
                    <div className="my-4">
                      <Tweet key={post._id} id={tweetId} />
                    </div>
                  ) : (
                    <div className="my-4">
                      <ExternalPostCard key={post._id} post={post} />
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Running stories (blogs) */}
          {hasStories && (
            <div className={hasSocial ? '' : 'lg:col-span-2'}>
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Running Stories</h3>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <StoryCard key={post._id} post={post} />
                ))}
              </div>
              <Link
                href="/blog"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:text-red-600 transition-colors group"
              >
                View all stories
                <svg className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
