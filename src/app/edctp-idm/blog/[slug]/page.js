import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { edctpBlogPostBySlugQuery } from '@/lib/edctpQueries'
import BlogPostPage from '@/Components/edctp/pages/BlogPostPage'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "edctpBlogPost" && defined(slug.current)]{ "slug": slug.current }`)
  return posts.map((p) => ({ slug: p.slug }))
}

export default async function Page({ params }) {
  const { slug } = await params
  const post = await client.fetch(edctpBlogPostBySlugQuery, { slug })
  if (!post) notFound()
  return <BlogPostPage post={post} />
}
