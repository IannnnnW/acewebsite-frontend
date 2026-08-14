import { client } from '@/lib/sanity'
import { edctpCallsQuery, edctpOpportunitiesPageQuery } from '@/lib/edctpQueries'
import OpportunitiesPage from '@/Components/edctp/pages/OpportunitiesPage'

export const revalidate = 60

export const metadata = { title: 'Opportunities | IDM-Africa' }

export default async function Page() {
  const [calls, pageDoc] = await Promise.all([
    client.fetch(edctpCallsQuery),
    client.fetch(edctpOpportunitiesPageQuery),
  ])
  return <OpportunitiesPage calls={calls} pageDoc={pageDoc} />
}
