import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'
import { SOCIAL_ICONS } from '@/lib/socialIcons'

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
    { name: 'Newsletter', href: '/newsletter' },
  ],
  academic: [
    { name: 'MSc Programs', href: '/training-programs' },
    { name: 'PhD Programs', href: '/training-programs' },
    { name: 'Short Courses', href: '/training-programs' },
  ],
  facilities: [
    { name: 'HPC Cluster', href: '/hpc' },
    { name: 'VR Laboratory', href: '/vr-lab' },
    { name: 'Tele-learning Center', href: '/facilities/ace-telelearning-center' },
  ],
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
