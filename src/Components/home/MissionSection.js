import { client } from '@/lib/sanity'
import { fetchWithFallback } from '@/lib/fallback'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

export default async function MissionSection() {
  const homeData = await fetchWithFallback(
    () => client.fetch(`*[_type == "homePage"][0]`),
    'home'
  )
  return (
    <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
      <ACEPattern rows={7} cols={10} opacity={0.10} className="absolute top-8 right-8 hidden lg:block" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-red-700">{homeData.missionSection.sectionTitle}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Advancing computational research and data science across Africa.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {homeData.missionSection.mission}
          </p>
        </AnimateOnScroll>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {homeData.missionSection.coreMissionAreas.map((area, index) => (
              <AnimateOnScroll key={index} variant="fade-up" delay={index * 120}>
                <div className="flex flex-col group">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <div className="rounded-lg bg-red-700 p-2 ring-1 ring-red-600/10 group-hover:bg-red-800 transition-colors">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d={area.icon} />
                      </svg>
                    </div>
                    {area.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{area.description}</p>
                  </dd>
                </div>
              </AnimateOnScroll>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
