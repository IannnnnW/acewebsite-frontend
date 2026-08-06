import { client } from '@/lib/sanity'
import { edctpAboutPageQuery } from '@/lib/edctpQueries'
import AboutPage from '@/Components/edctp/pages/AboutPage'

export const revalidate = 60

export const metadata = { title: 'About | IDM Africa' }

export default async function Page() {
  const aboutPage = await client.fetch(edctpAboutPageQuery)
  return <AboutPage aboutPage={aboutPage} />
}
