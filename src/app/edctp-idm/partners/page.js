import { client } from '@/lib/sanity'
import { edctpConsortiumPartnersQuery, edctpDataCollaboratorsQuery } from '@/lib/edctpQueries'
import PartnersPage from '@/Components/edctp/pages/PartnersPage'

export const revalidate = 60

export const metadata = { title: 'Collaborators | IDM Africa' }

export default async function Page() {
  const [partners, collaborators] = await Promise.all([
    client.fetch(edctpConsortiumPartnersQuery),
    client.fetch(edctpDataCollaboratorsQuery),
  ])
  return <PartnersPage partners={partners} collaborators={collaborators} />
}
