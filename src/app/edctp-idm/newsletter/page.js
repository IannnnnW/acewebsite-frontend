import { client } from '@/lib/sanity'
import { edctpNewsletterIssuesQuery, edctpNewsletterPageQuery } from '@/lib/edctpQueries'
import NewsletterPage from '@/Components/edctp/pages/NewsletterPage'

export const revalidate = 60

export const metadata = { title: 'Newsletter | IDM Africa' }

export default async function Page() {
  const [issues, pageDoc] = await Promise.all([
    client.fetch(edctpNewsletterIssuesQuery),
    client.fetch(edctpNewsletterPageQuery),
  ])
  return <NewsletterPage issues={issues} pageDoc={pageDoc} />
}
