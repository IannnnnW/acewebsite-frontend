import { client } from '@/lib/sanity'
import { fetchWithFallback } from '@/lib/fallback'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

export default async function StatsSection({ stats }) {
  const homeData = await fetchWithFallback(
    () => client.fetch(`*[_type == "homePage"][0]`),
    'home'
  )

  return (
    <section className="relative py-24 sm:py-32 bg-red-700 overflow-hidden">
      {/* subtle light square grid on the red bg */}
      <ACEPattern rows={6} cols={12} opacity={0.07} size={8} gap={14}
        className="absolute inset-x-0 top-0 w-full opacity-100 hidden sm:block"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {homeData.statsSection.sectionTitle}
            </h2>
            <p className="mt-4 text-lg leading-8 text-red-100">
              Building capacity and advancing scientific discovery.
            </p>
          </div>

          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {homeData.statsSection.stats.map((stat, index) => (
              <AnimateOnScroll key={stat._key} variant="zoom" delay={index * 100}>
                <div className="flex flex-col items-center justify-center gap-y-2 bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all group">
                  <dt className="text-base leading-7 text-red-100">{stat.label}</dt>
                  <dd className="text-5xl font-bold tracking-tight text-white group-hover:scale-110 transition-transform">
                    {stat.value}
                  </dd>
                  <p className="text-sm text-red-200 text-center mt-2">{stat.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </dl>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
