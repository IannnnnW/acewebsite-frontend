import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'

const footerNavigation = {
  about: [
    { name: 'About Us', href: '/about' },
    { name: 'Mission & Vision', href: '/about#mission' },
    { name: 'Our Team', href: '/team' },
    { name: 'Collaborations', href: '/about#collaborations' },
  ],
  research: [
    { name: 'Research Projects', href: '/research' },
    { name: 'Publications', href: '/publications' },
  ],
  academic: [
    { name: 'MSc Programs', href: '/programs' },
    { name: 'PhD Programs', href: '/programs' },
    { name: 'Short Courses', href: '/programs' },
  ],
  facilities: [
    { name: 'HPC Cluster', href: '/hpc' },
    { name: 'VR Laboratory', href: '/vr-lab' },
    { name: 'Events', href: '/events' },
  ],
}

const SOCIAL_ICONS = {
  twitter: {
    label: 'Twitter / X',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    viewBox: '0 0 24 24',
  },
  facebook: {
    label: 'Facebook',
    path: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
    viewBox: '0 0 24 24',
  },
  linkedin: {
    label: 'LinkedIn',
    path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
    viewBox: '0 0 24 24',
  },
  youtube: {
    label: 'YouTube',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    viewBox: '0 0 24 24',
  },
  instagram: {
    label: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    viewBox: '0 0 24 24',
  },
  github: {
    label: 'GitHub',
    path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
    viewBox: '0 0 24 24',
  },
}

async function getSiteSettings() {
  try {
    return await client.fetch(siteSettingsQuery)
  } catch {
    return null
  }
}

export default async function Footer() {
  const settings = await getSiteSettings()
  const socials = settings?.socials || {}

  const activeSocials = Object.entries(SOCIAL_ICONS)
    .filter(([key]) => socials[key])
    .map(([key, icon]) => ({ key, href: socials[key], ...icon }))

  return (
    <footer className="bg-gray-950" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand column */}
          <div className="space-y-8">
            <Link href="/">
              <span className="text-white font-bold text-xl tracking-tight">ACE Uganda</span>
            </Link>
            <p className="text-sm leading-6 text-gray-400">
              Advancing health outcomes through innovative High-Performance Computing,
              Bioinformatics, Visualization, and Data Science.
            </p>

            {/* Social links */}
            {activeSocials.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {activeSocials.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox={item.viewBox} aria-hidden="true">
                      <path d={item.path} />
                    </svg>
                  </a>
                ))}
              </div>
            )}

            {/* Fallback placeholder social icons when no URLs configured yet */}
            {activeSocials.length === 0 && (
              <div className="flex flex-wrap gap-4">
                {Object.entries(SOCIAL_ICONS).slice(0, 4).map(([key, icon]) => (
                  <span key={key} className="text-gray-700" aria-label={`${icon.label} (not configured)`}>
                    <svg className="h-6 w-6" fill="currentColor" viewBox={icon.viewBox} aria-hidden="true">
                      <path d={icon.path} />
                    </svg>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Nav columns */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">About</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.about.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-red-400 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Research</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.research.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-red-400 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Academic</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.academic.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-red-400 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Facilities</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.facilities.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-red-400 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-gray-800 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs leading-5 text-gray-500">
              &copy; {new Date().getFullYear()} African Center of Excellence in Bioinformatics and Data Intensive Sciences. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-xs leading-5 text-gray-500 hover:text-red-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs leading-5 text-gray-500 hover:text-red-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
