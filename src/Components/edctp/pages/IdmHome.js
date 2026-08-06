'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined'
import { useI18n } from '@/lib/idmI18n'
import { loc } from '@/lib/edctpLocalize'

const SECTIONS = [
  { href: '/edctp-idm/opportunities', image: '/images/edctp/opportunity.jpg', icon: <AssignmentOutlinedIcon sx={{ fontSize: 26 }} />, titleKey: 'nav.opportunities', descKey: 'home.sections.opportunities' },
  { href: '/edctp-idm/training', image: '/images/edctp/training.jpg', icon: <SchoolOutlinedIcon sx={{ fontSize: 26 }} />, titleKey: 'nav.training', descKey: 'home.sections.training' },
  { href: '/edctp-idm/partners', image: '/images/edctp/collaborators.jpg', icon: <HandshakeOutlinedIcon sx={{ fontSize: 26 }} />, titleKey: 'nav.partners', descKey: 'home.sections.partners' },
  { href: '/edctp-idm/publications', image: '/images/edctp/publications.jpg', icon: <ArticleOutlinedIcon sx={{ fontSize: 26 }} />, titleKey: 'nav.publications', descKey: 'home.sections.publications' },
  { href: '/edctp-idm/blog', image: '/images/edctp/blog.jpg', icon: <FeedOutlinedIcon sx={{ fontSize: 26 }} />, titleKey: 'nav.blog', descKey: 'home.sections.blog' },
  { href: '/edctp-idm/newsletter', image: '/images/edctp/newsletter.jpg', icon: <MailOutlinedIcon sx={{ fontSize: 26 }} />, titleKey: 'nav.newsletter', descKey: 'home.sections.newsletter' },
]

const FALLBACK_STATS = [
  { value: '47', labelKey: 'stats.researchers' },
  { value: '5', labelKey: 'stats.cohorts' },
  { value: '12', labelKey: 'stats.fellowships' },
  { value: '10', labelKey: 'stats.workPackages' },
]

function formatDate(dt, locale) {
  if (!dt) return null
  return new Date(dt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function IdmHome({ homePage, settings, posts, partners }) {
  const { t, locale } = useI18n()

  // CMS-managed stats with hardcoded fallback until the Home Page doc exists
  const stats = homePage?.stats?.length
    ? homePage.stats.map((s) => ({ value: s.value, label: loc(s.label, locale) }))
    : FALLBACK_STATS.map((s) => ({ value: s.value, label: t(s.labelKey) }))

  const partnerLogos = (partners || []).filter((p) => p.logo?.url)

  return (
    <>
      {/* Hero — full-bleed photo background with navy overlay, left-aligned content */}
      <section className="relative bg-idblue-900 overflow-hidden">
        {/* Background photo */}
        {homePage?.heroImage?.url && (
          <Image src={homePage.heroImage.url} alt="" fill className="object-cover" priority />
        )}
        {/* Navy overlay — heavier on the left where the text sits, lighter on the right so the photo reads */}
        <div className="absolute inset-0 bg-gradient-to-r from-idblue-950/95 via-idblue-900/80 to-idblue-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-idblue-950/60 to-transparent" />

        {/* Signature tri-color accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-idred-600 via-idblue-500 to-idblue-900 z-10" />
        {!homePage?.heroImage?.url && (
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        )}

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-idblue-500" />
              <span className="text-idblue-500 text-xs font-bold uppercase tracking-[0.25em]">
                {settings?.programName || 'IDM Africa'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
              {loc(homePage?.tagline, locale) || "Building Africa's Capacity to Model Infectious Disease"}
            </h1>

            {loc(homePage?.intro, locale) && (
              <p className="text-lg text-idblue-100 leading-relaxed mb-10 max-w-xl">
                {loc(homePage?.intro, locale)}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/edctp-idm/opportunities" className="rounded-full bg-idred-600 hover:bg-idred-800 px-8 py-3.5 text-sm font-bold text-white transition-all hover:scale-105 shadow-lg shadow-idred-600/30">
                {t('hero.ctaOpportunities')}
              </Link>
              <Link href="/edctp-idm/about" className="rounded-full border-2 border-idblue-500 text-white hover:bg-idblue-500/10 px-8 py-3.5 text-sm font-bold transition-all">
                {t('common.learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact stats — bright blue numbers on deeper navy band */}
      {stats.length > 0 && (
        <section className="bg-idblue-950 py-14">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <span className="text-5xl sm:text-6xl font-extrabold text-idblue-500 tabular-nums">
                    {stat.value}
                  </span>
                  <span className="text-sm font-medium text-idblue-200 leading-snug max-w-[160px]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section overview cards */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-idblue-500 mb-3">
              {t('home.sectionsTitle')}
            </p>
            <h2 className="text-3xl font-bold text-gray-900">{t('home.sectionsSubtitle')}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTIONS.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-idblue-500 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-40 overflow-hidden bg-gray-100 shrink-0">
                  <Image src={section.image} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-idblue-950/70 via-idblue-950/10 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">{section.icon}</div>
                </div>
                <div className="flex flex-col flex-1 p-7">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-idblue-500 transition-colors mb-2">
                    {t(section.titleKey)}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{t(section.descKey)}</p>
                  <span className="text-sm font-semibold text-idred-600 group-hover:text-idred-800 inline-flex items-center gap-1.5">
                    {t('common.learnMore')}
                    <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest blog posts teaser */}
      {posts?.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-idblue-500 mb-2">{t('nav.blog')}</p>
                <h2 className="text-3xl font-bold text-gray-900">{t('home.latestPosts')}</h2>
              </div>
              <Link
                href="/edctp-idm/blog"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-idred-600 hover:text-idred-800 transition-colors group"
              >
                {t('home.viewAllPosts')}
                <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={post.slug?.current ? `/edctp-idm/blog/${post.slug.current}` : '/edctp-idm/blog'}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-idblue-500 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100 shrink-0">
                    {post.featuredImage?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.featuredImage.url} alt={loc(post.title, locale)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-idblue-700 to-idblue-950" />
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    {post.publishedAt && (
                      <p className="text-xs text-gray-400 mb-2">{formatDate(post.publishedAt, locale)}</p>
                    )}
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-idblue-500 transition-colors leading-snug line-clamp-2 mb-2">
                      {loc(post.title, locale)}
                    </h3>
                    {loc(post.excerpt, locale) && (
                      <p className="text-sm text-gray-500 line-clamp-2 flex-1 mb-4">{loc(post.excerpt, locale)}</p>
                    )}
                    <span className="text-sm font-semibold text-idred-600 group-hover:text-idred-800 inline-flex items-center gap-1.5 mt-auto">
                      {t('common.readMore')}
                      <ArrowRightIcon className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partner logo strip — CEMA-style quiet band */}
      {partnerLogos.length > 0 && (
        <section className="bg-gray-50 py-14 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-idblue-500 mb-8">
              {t('nav.partners')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {partnerLogos.map((p) => (
                <Link key={p._id} href="/edctp-idm/partners" className="opacity-70 hover:opacity-100 transition-opacity">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.logo.url} alt={p.name} className="h-12 w-auto max-w-[140px] object-contain" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
