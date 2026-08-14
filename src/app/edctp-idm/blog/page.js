import { client } from '@/lib/sanity'
import { edctpBlogPostsQuery } from '@/lib/edctpQueries'
import BlogListPage from '@/Components/edctp/pages/BlogListPage'

export const revalidate = 60

export const metadata = { title: 'Blog | IDM-Africa' }

export default async function Page() {
  const posts = await client.fetch(edctpBlogPostsQuery)
  return <BlogListPage posts={posts} />
}
