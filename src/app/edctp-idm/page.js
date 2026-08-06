import { client } from '@/lib/sanity'
import {
  edctpHomePageQuery,
  edctpSettingsQuery,
  edctpRecentBlogPostsQuery,
  edctpConsortiumPartnersQuery,
} from '@/lib/edctpQueries'
import IdmHome from '@/Components/edctp/pages/IdmHome'

export const revalidate = 60

export default async function EdctpIdmPage() {
  const [homePage, settings, posts, partners] = await Promise.all([
    client.fetch(edctpHomePageQuery),
    client.fetch(edctpSettingsQuery),
    client.fetch(edctpRecentBlogPostsQuery),
    client.fetch(edctpConsortiumPartnersQuery),
  ])

  return <IdmHome homePage={homePage} settings={settings} posts={posts} partners={partners} />
}
