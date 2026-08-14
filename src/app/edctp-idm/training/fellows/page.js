import { client } from '@/lib/sanity'
import { edctpFellowsQuery } from '@/lib/edctpQueries'
import FellowsPage from '@/Components/edctp/pages/FellowsPage'

export const revalidate = 60

export const metadata = { title: 'Fellows | IDM-Africa' }

export default async function Page() {
  const fellows = await client.fetch(edctpFellowsQuery)
  return <FellowsPage fellows={fellows} />
}
