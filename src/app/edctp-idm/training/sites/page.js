import { client } from '@/lib/sanity'
import { edctpTrainingSitesQuery } from '@/lib/edctpQueries'
import TrainingSitesPage from '@/Components/edctp/pages/TrainingSitesPage'

export const revalidate = 60

export const metadata = { title: 'Training Sites | IDM Africa' }

export default async function Page() {
  const sites = await client.fetch(edctpTrainingSitesQuery)
  return <TrainingSitesPage sites={sites} />
}
