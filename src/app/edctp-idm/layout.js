import EdctpHeader from '@/Components/edctp/EdctpHeader'
import EdctpFooter from '@/Components/edctp/EdctpFooter'
import { I18nProvider } from '@/lib/idmI18n'

export const revalidate = 60

export const metadata = {
  title: 'IDM-Africa — Infectious Diseases Modelling Africa | ACE Uganda',
  description: 'Equipping early-to-mid career researchers in sub-Saharan Africa with practical infectious disease modelling skills.',
}

export default function EdctpLayout({ children }) {
  return (
    <I18nProvider>
      <div className="bg-white">
        <EdctpHeader />
        <main>{children}</main>
        <EdctpFooter />
      </div>
    </I18nProvider>
  )
}
