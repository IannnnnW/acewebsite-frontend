'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'About',
    href: '/about',
    submenu: [
      { name: 'Who Are We', href: '/about/who-we-are' },
      { name: 'Our Journey', href: '/about/our-journey' },
      { name: 'Facilities', href: '/facilities' },
    ],
  },
  { name: 'Projects', href: '/research' },
  { name: 'Publications', href: '/publications' },
  { name: 'Events', href: '/events' },
  { name: 'Blog', href: '/blog' },
  { name: 'Our Staff', href: '/team' },
]

const HPC_WIKI_URL = 'https://ace-bioinformatics.github.io/ace-ug-hpc-wiki/'

function CpuIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3m8 0h3a2 2 0 002-2v-3M8 8h8v8H8V8z" />
    </svg>
  )
}

function ChevronDown({ open }) {
  return (
    <svg
      className={`ml-1 h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const closeTimerRef = useRef(null)
  const pathname = usePathname()

  function handleSubmenuEnter(name) {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setOpenSubmenu(name)
  }
  function handleSubmenuLeave() {
    closeTimerRef.current = setTimeout(() => setOpenSubmenu(null), 150)
  }
  function handleSubmenuKeyDown(e, name) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpenSubmenu((prev) => (prev === name ? null : name))
    }
    if (e.key === 'Escape') {
      setOpenSubmenu(null)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/ace-logo.png"
                alt="ACE Uganda — African Center of Excellence in Bioinformatics and Data Intensive Sciences"
                width={280}
                height={60}
                className="h-14 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-0.5">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.submenu && item.submenu.some((sub) => pathname.startsWith(sub.href))) ||
                (item.href !== '/' && pathname.startsWith(item.href))

              if (item.submenu) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => handleSubmenuEnter(item.name)}
                    onMouseLeave={handleSubmenuLeave}
                  >
                    <button
                      aria-haspopup="true"
                      aria-expanded={openSubmenu === item.name}
                      onKeyDown={(e) => handleSubmenuKeyDown(e, item.name)}
                      onClick={() => setOpenSubmenu((prev) => (prev === item.name ? null : item.name))}
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? 'text-red-700 bg-red-50'
                          : 'text-gray-700 hover:text-red-700 hover:bg-red-50'
                      }`}
                    >
                      {item.name}
                      <ChevronDown open={openSubmenu === item.name} />
                    </button>

                    {openSubmenu === item.name && (
                      <div
                        role="menu"
                        className="absolute left-0 top-full mt-0.5 w-52 rounded-xl bg-white shadow-lg ring-1 ring-gray-200 overflow-hidden z-50"
                      >
                        {/* Link to the parent /about page itself */}
                        <Link
                          href={item.href}
                          role="menuitem"
                          className={`block px-4 py-2.5 text-sm border-b border-gray-100 font-medium ${
                            pathname === item.href
                              ? 'text-red-700 bg-red-50'
                              : 'text-gray-500 hover:bg-red-50 hover:text-red-700'
                          }`}
                          onClick={() => setOpenSubmenu(null)}
                        >
                          Overview
                        </Link>
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            role="menuitem"
                            className={`block px-4 py-2.5 text-sm ${
                              pathname === subItem.href || pathname.startsWith(subItem.href + '/')
                                ? 'text-red-700 bg-red-50 font-medium'
                                : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                            }`}
                            onClick={() => setOpenSubmenu(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-red-700 bg-red-50'
                      : 'text-gray-700 hover:text-red-700 hover:bg-red-50'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}

            {/* HPC Wiki — special pill */}
            <a
              href={HPC_WIKI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-red-600 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-700 hover:text-white transition-colors"
            >
              <CpuIcon />
              HPC Wiki
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex lg:items-center">
            <Link
              href="/contact"
              className="rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 transition-colors"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4" role="dialog" aria-modal="true">
            <div className="space-y-0.5">
              {navigation.map((item) => {
                if (item.submenu) {
                  const isExpanded = mobileExpanded === item.name
                  return (
                    <div key={item.name}>
                      <button
                        aria-expanded={isExpanded}
                        onClick={() => setMobileExpanded((prev) => (prev === item.name ? null : item.name))}
                        className="flex w-full items-center justify-between px-3 py-2.5 text-base font-medium text-gray-700 rounded-md hover:bg-red-50 hover:text-red-700"
                      >
                        {item.name}
                        <ChevronDown open={isExpanded} />
                      </button>
                      {isExpanded && (
                        <div className="mt-0.5 ml-3 border-l-2 border-red-100 pl-3 space-y-0.5">
                          <Link
                            href={item.href}
                            className="block py-2 text-sm text-gray-500 hover:text-red-700"
                            onClick={() => { setMobileMenuOpen(false); setMobileExpanded(null) }}
                          >
                            Overview
                          </Link>
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block py-2 text-sm ${
                                pathname === subItem.href
                                  ? 'text-red-700 font-medium'
                                  : 'text-gray-700 hover:text-red-700'
                              }`}
                              onClick={() => { setMobileMenuOpen(false); setMobileExpanded(null) }}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2.5 text-base font-medium rounded-md ${
                      pathname === item.href
                        ? 'text-red-700 bg-red-50'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}

              {/* HPC Wiki mobile */}
              <a
                href={HPC_WIKI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2.5 text-base font-medium text-red-700 hover:bg-red-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <CpuIcon />
                HPC Wiki
                <svg className="h-3.5 w-3.5 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              {/* Get in Touch CTA */}
              <Link
                href="/contact"
                className="block mx-3 mt-3 px-4 py-2.5 text-center text-base font-semibold text-white bg-red-700 rounded-md hover:bg-red-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
