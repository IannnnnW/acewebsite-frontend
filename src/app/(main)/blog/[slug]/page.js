import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity'
import { blogPostBySlugQuery, allBlogSlugsQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await client.fetch(allBlogSlugsQuery)
  return slugs.map(s => ({ slug: s.slug }))
}

async function getPost(slug) {
  try { return await client.fetch(blogPostBySlugQuery, { slug }) }
  catch { return null }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

const ptComponents = {
  block: {
    normal: ({ children }) => <p className="mb-5 leading-relaxed text-gray-700">{children}</p>,
    h2: ({ children }) => <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-2">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-red-700 pl-5 italic text-gray-600 my-6">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-red-700 hover:underline">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-5 space-y-1 text-gray-700">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-5 space-y-1 text-gray-700">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt || ''}
              fill className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
  },
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-red-700 to-red-900 py-20 sm:py-28 overflow-hidden">
        <ACEPattern rows={6} cols={10} opacity={0.08} className="absolute top-6 right-8 hidden sm:block" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <AnimateOnScroll variant="fade-left">
            <Link href="/blog" className="inline-flex items-center text-red-200 hover:text-white mb-8 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.image && (
                    <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-white/30">
                      <Image
                        src={urlFor(post.author.image).width(72).height(72).url()}
                        alt={post.author.name}
                        fill className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-white text-sm font-medium">{post.author.name}</p>
                    {post.author.role && <p className="text-red-200 text-xs">{post.author.role}</p>}
                  </div>
                </div>
              )}
              <time className="text-red-200 text-sm">{formatDate(post.publishedAt)}</time>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-6 lg:px-8 py-16">
        {post.excerpt && (
          <AnimateOnScroll variant="fade-up">
            <p className="text-xl text-gray-600 leading-relaxed mb-10 border-l-4 border-red-700 pl-5">
              {post.excerpt}
            </p>
          </AnimateOnScroll>
        )}

        <AnimateOnScroll variant="fade-up" delay={100}>
          <div className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-red-700 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl max-w-none">
            <PortableText value={post.body} components={ptComponents} />
          </div>
        </AnimateOnScroll>

        {/* Extra images grid */}
        {post.images && post.images.length > 1 && (
          <AnimateOnScroll variant="fade-up" delay={150} className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Photos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {post.images.map((img, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={img.url}
                    alt={`Photo ${i + 1}`}
                    fill className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width:640px) 50vw,33vw"
                  />
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        )}

        {/* Author card */}
        {post.author && (
          <AnimateOnScroll variant="fade-up" delay={200} className="mt-16 border-t border-gray-200 pt-12">
            <div className="flex items-start gap-5 bg-gray-50 rounded-2xl p-6">
              {post.author.image && (
                <div className="relative h-16 w-16 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={urlFor(post.author.image).width(128).height(128).url()}
                    alt={post.author.name}
                    fill className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-bold text-gray-900">{post.author.name}</p>
                {post.author.role && <p className="text-sm text-red-700">{post.author.role}</p>}
                {post.author.bio && <p className="text-sm text-gray-600 mt-2 line-clamp-3">{post.author.bio}</p>}
              </div>
            </div>
          </AnimateOnScroll>
        )}

        {/* Back link */}
        <div className="mt-12">
          <Link href="/blog" className="inline-flex items-center text-red-700 hover:text-red-800 font-medium text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
