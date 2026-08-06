import { client } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'
import { edctpSettingsQuery } from '@/lib/edctpQueries'
import EdctpFooterContent from './EdctpFooterContent'

export default async function EdctpFooter() {
  const [siteSettings, edctpSettings] = await Promise.all([
    client.fetch(siteSettingsQuery),
    client.fetch(edctpSettingsQuery),
  ])

  return <EdctpFooterContent siteSettings={siteSettings} edctpSettings={edctpSettings} />
}
