import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { edctpMentorBySlugQuery } from '@/lib/edctpQueries'
import MentorProfile from '@/Components/edctp/pages/MentorProfile'

export const revalidate = 60

export async function generateStaticParams() {
  const mentors = await client.fetch(`*[_type == "edctpMentor" && defined(slug.current)]{ "slug": slug.current }`)
  return mentors.map((m) => ({ slug: m.slug }))
}

export default async function Page({ params }) {
  const { slug } = await params
  const mentor = await client.fetch(edctpMentorBySlugQuery, { slug })
  if (!mentor) notFound()
  return <MentorProfile mentor={mentor} />
}
