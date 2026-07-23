import PartnersMarquee from "./PartnersMarquee"
import { client } from '@/lib/sanity'
import { fetchWithFallback } from '@/lib/fallback'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

function getYouTubeEmbedUrl(url) {
  if (!url) return null
  try {
    const parsed = new URL(url)
    // youtube.com/watch?v=ID
    if (parsed.hostname.includes('youtube.com') && parsed.searchParams.get('v')) {
      return `https://www.youtube.com/embed/${parsed.searchParams.get('v')}`
    }
    // youtu.be/ID
    if (parsed.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed${parsed.pathname}`
    }
    // already an embed URL
    if (parsed.pathname.startsWith('/embed/')) {
      return url
    }
  } catch {
    // invalid URL — ignore
  }
  return null
}

export default async function PartnershipsSection() {
  const homeData = await fetchWithFallback(
      () => client.fetch(`*[_type == "homePage"][0]`),
      'home'
    )

  const embedUrl = getYouTubeEmbedUrl(homeData?.partnershipSection?.partnershipVideoUrl)

  return (
    <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
      <ACEPattern rows={6} cols={8} opacity={0.08} className="absolute top-8 left-8 hidden xl:block" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-red-900">{homeData.partnershipSection.sectionTitle}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Collaborating for Greater Impact
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {homeData.partnershipSection.description}
          </p>
        </AnimateOnScroll>
        <PartnersMarquee/>
        <AnimateOnScroll variant="fade-up" delay={100} className="mx-auto mt-16 max-w-5xl">
          <div className="relative isolate overflow-hidden bg-gradient-to-br from-red-50 to-gray-50 px-6 py-20 sm:rounded-3xl sm:px-10 sm:py-24 lg:py-24 xl:px-24">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-5 lg:items-center">              
              <div className="relative lg:col-span-3">
                {embedUrl ? (
                  <div className="w-full aspect-[16/10] lg:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
                    <iframe
                      src={embedUrl}
                      title="ACE Uganda & Google DeepMind Partnership Announcement"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[16/10] lg:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-gray-900 flex flex-col items-center justify-center gap-4">
                    <svg className="h-14 w-14 text-red-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <p className="text-white text-sm font-medium">Partnership Announcement Video</p>
                    <p className="text-gray-400 text-xs text-center px-6">
                      Add the YouTube URL in the Studio under<br />
                      <span className="text-gray-300">Home Page → Partnership Section → Partnership Announcement Video URL</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="lg:col-span-2 lg:pr-8">
                <div>
                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
                    ACE Uganda & Google DeepMind Partnership
                  </h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">
                    We are proud to partner with Google DeepMind to leverage cutting-edge AI and 
                    machine learning technologies in our research initiatives. This collaboration 
                    enables us to tackle complex health challenges using state-of-the-art computational 
                    methods and advance scientific discovery in Africa.
                  </p>
                  <dl className="mt-8 space-y-4 text-base leading-7 text-gray-600">
                    <div className="flex gap-x-3">
                      <svg className="h-6 w-6 flex-none text-red-900" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Advanced AI & Machine Learning Resources</span>
                    </div>
                    <div className="flex gap-x-3">
                      <svg className="h-6 w-6 flex-none text-red-900" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Collaborative Research Projects</span>
                    </div>
                    <div className="flex gap-x-3">
                      <svg className="h-6 w-6 flex-none text-red-900" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Capacity Building & Training</span>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="pointer-events-none absolute left-12 top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-3xl lg:bottom-[-12rem] lg:top-auto lg:translate-y-0 lg:transform-gpu" aria-hidden="true">
              <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-red-400 to-red-300 opacity-25"></div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}