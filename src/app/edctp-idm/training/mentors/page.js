import { client } from '@/lib/sanity'
import { edctpMentorsQuery } from '@/lib/edctpQueries'
import MentorsPage from '@/Components/edctp/pages/MentorsPage'

export const revalidate = 60

export const metadata = { title: 'Mentors | IDM-Africa' }

export default async function Page() {
  const mentors = await client.fetch(edctpMentorsQuery)
  return <MentorsPage mentors={mentors} />
}
