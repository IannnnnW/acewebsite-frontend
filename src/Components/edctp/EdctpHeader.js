import { client } from '@/lib/sanity'
import { edctpSettingsQuery } from '@/lib/edctpQueries'
import EdctpHeaderNav from './EdctpHeaderNav'

export default async function EdctpHeader() {
  const settings = await client.fetch(edctpSettingsQuery)

  return <EdctpHeaderNav logoUrl={settings?.logo?.url} programName={settings?.programName || 'IDM Africa'} />
}
