import { client } from '@/lib/sanity'
import {
  settingsQuery,
  featuredPostsQuery,
  heroSlidesQuery,
  siteSettingsQuery,
  socialPostsQuery,
  recentBlogPostsQuery,
} from '@/lib/queries'
import HeroCarousel from '@/Components/home/HeroCarousel'
import MissionSection from '@/Components/home/MissionSection'
import FocusAreasSection from '@/Components/home/FocusAreasSection'
import StatsSection from '@/Components/home/StatsSection'
import PartnershipsSection from '@/Components/home/PartnershipSection'
import SocialFeedSection from '@/Components/home/SocialFeedSection'

async function getData() {
  const settings = await client.fetch(settingsQuery)
  const siteSettings = await client.fetch(siteSettingsQuery)
  const featuredPosts = await client.fetch(featuredPostsQuery)
  const heroSlides = await client.fetch(heroSlidesQuery)
  const socialPosts = await client.fetch(socialPostsQuery)
  const recentBlogPosts = await client.fetch(recentBlogPostsQuery)

  return { settings, siteSettings, featuredPosts, heroSlides, socialPosts, recentBlogPosts }
}

export default async function Home() {
  const { settings, siteSettings, featuredPosts, heroSlides, socialPosts, recentBlogPosts } = await getData()

  return (
    <>
      <HeroCarousel
        slides={heroSlides || []}
        tagline={siteSettings?.heroTagline}
        institutionLine={siteSettings?.heroInstitutionLine}
      />
      <MissionSection />
      <FocusAreasSection />
      <StatsSection stats={settings?.stats} />
      <PartnershipsSection />
      
      {/* Latest News Section */}
      {featuredPosts && featuredPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Latest News & Updates
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Stay informed about our recent achievements and upcoming events
              </p>
            </div>
            
            <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <article
                  key={post._id}
                  className="flex flex-col items-start bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.publishedAt} className="text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    {post.category && (
                      <span className="relative z-10 rounded-full bg-red-50 px-3 py-1.5 font-medium text-red-700">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <div className="group relative mt-4">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-red-700">
                      <a href={`/news/${post.slug.current}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Running social posts + stories */}
      <SocialFeedSection socialPosts={socialPosts} blogPosts={recentBlogPosts} />
    </>
  )
}