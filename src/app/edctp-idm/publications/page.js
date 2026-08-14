import { client } from '@/lib/sanity'
import { edctpPublicationsQuery } from '@/lib/edctpQueries'
import PublicationsPage from '@/Components/edctp/pages/PublicationsPage'

export const revalidate = 60

export const metadata = { title: 'Publications | IDM-Africa' }

export default async function Page() {
  const publications = await client.fetch(edctpPublicationsQuery)
  return <PublicationsPage publications={publications} />
}
