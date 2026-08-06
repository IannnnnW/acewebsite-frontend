import { client } from '@/lib/sanity'
import { edctpProjectTypesQuery } from '@/lib/edctpQueries'
import ProjectsPage from '@/Components/edctp/pages/ProjectsPage'

export const revalidate = 60

export const metadata = { title: 'Projects | IDM Africa' }

export default async function Page() {
  const projectTypes = await client.fetch(edctpProjectTypesQuery)
  return <ProjectsPage projectTypes={projectTypes} />
}
