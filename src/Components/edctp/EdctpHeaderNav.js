'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { HamburgerMenuIcon, Cross2Icon, ArrowLeftIcon } from '@radix-ui/react-icons'
import { useI18n } from '@/lib/idmI18n'

function LanguageToggle() {
  const { locale, setLocale } = useI18n()
  return (
    <div className="flex items-center rounded-full border border-idblue-800 overflow-hidden text-xs font-semibold shrink-0">
      <button
        onClick={() => setLocale('en')}
        className={`px-3 py-1.5 transition-colors ${
          locale === 'en' ? 'bg-idblue-500 text-white' : 'text-idblue-200 hover:bg-idblue-800'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale('fr')}
        className={`px-3 py-1.5 transition-colors ${
          locale === 'fr' ? 'bg-idblue-500 text-white' : 'text-idblue-200 hover:bg-idblue-800'
        }`}
      >
        FR
      </button>
    </div>
  )
}

export default function EdctpHeaderNav({ logoUrl, programName }) {
  const { t } = useI18n()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const NAV_ITEMS = [
    { href: '/edctp-idm/about', label: t('nav.about') },
    { href: '/edctp-idm/partners', label: t('nav.partners') },
    { href: '/edctp-idm/training', label: t('nav.training') },
    { href: '/edctp-idm/publications', label: t('nav.publications') },
    { href: '/edctp-idm/opportunities', label: t('nav.opportunities') },
    { href: '/edctp-idm/newsletter', label: t('nav.newsletter') },
    { href: '/edctp-idm/blog', label: t('nav.blog') },
  ]

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/')

  const linkClass = (href) =>
    `relative px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
      isActive(href)
        ? 'text-idblue-500 font-semibold after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-idblue-500 after:rounded-full'
        : 'text-idblue-200 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-30 bg-idblue-900 border-b border-idblue-800 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between gap-4">
        <Link href="/edctp-idm" className="flex items-center shrink-0">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={programName} className="h-[120px] w-auto object-contain" />
          ) : (
            <span className="font-bold text-white text-lg tracking-tight">{programName}</span>
          )}
        </Link>

        <button
          className="lg:hidden text-idblue-100 p-1.5 rounded-md hover:bg-idblue-800 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <Cross2Icon className="h-5 w-5" /> : <HamburgerMenuIcon className="h-5 w-5" />}
        </button>

        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <LanguageToggle />
          <Link href="/" className="inline-flex items-center gap-1 text-xs text-idblue-300 hover:text-idblue-500 transition-colors">
            <ArrowLeftIcon className="h-3 w-3" />{t('nav.backToAce')}
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t border-idblue-800 flex flex-col px-6 py-3 gap-1 bg-idblue-900">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`py-2 text-sm font-medium border-b border-idblue-800 last:border-0 ${
                isActive(item.href) ? 'text-white' : 'text-idblue-100 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-3 flex items-center justify-between">
            <LanguageToggle />
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-idblue-300 hover:text-idblue-500">
              <ArrowLeftIcon className="h-3 w-3" />{t('nav.backToAce')}
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
