import { client } from '@/lib/sanity'
import { edctpUpcomingEventsQuery } from '@/lib/edctpQueries'
import TrainingEventsPage from '@/Components/edctp/pages/TrainingEventsPage'

export const revalidate = 60

export const metadata = { title: 'Training Events | IDM-Africa' }

export default async function Page() {
  const events = await client.fetch(edctpUpcomingEventsQuery)
  return <TrainingEventsPage events={events} />
}
