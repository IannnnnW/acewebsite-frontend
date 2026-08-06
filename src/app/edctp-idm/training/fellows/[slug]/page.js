import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { edctpFellowBySlugQuery } from '@/lib/edctpQueries'
import FellowProfile from '@/Components/edctp/pages/FellowProfile'

export const revalidate = 60

export async function generateStaticParams() {
  const fellows = await client.fetch(`*[_type == "edctpFellow" && defined(slug.current)]{ "slug": slug.current }`)
  return fellows.map((f) => ({ slug: f.slug }))
}

export default async function Page({ params }) {
  const { slug } = await params
  const fellow = await client.fetch(edctpFellowBySlugQuery, { slug })
  if (!fellow) notFound()
  return <FellowProfile fellow={fellow} />
}
