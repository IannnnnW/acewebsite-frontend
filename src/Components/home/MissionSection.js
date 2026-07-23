import Link from 'next/link'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import { fetchWithFallback } from '@/lib/fallback'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

export default async function MissionSection() {
  const homeData = await fetchWithFallback(
    () => client.fetch(`*[_type == "homePage"][0]`),
    'home'
  )
  return (
    <section className="relative sm:py-32 bg-white overflow-hidden">
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
          {/*
            Static, image-topped cards — no hover reveal. Everything (image,
            title, description) is visible all the time; the only thing
            hover is allowed to do here is nothing, by design.
          */}
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
            {homeData.missionSection.coreMissionAreas.map((area, index) => {
              const CardTag = area.link ? Link : 'div'
              const cardProps = area.link ? { href: area.link } : {}
              return (
              <AnimateOnScroll key={area._key || index} variant="fade-up" delay={index * 120}>
                {/* Renders as a link when the card has one configured, otherwise a plain non-interactive div */}
                <CardTag {...cardProps} className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100 hover:shadow-lg transition-shadow">

                  {/* Image block */}
                  <div className="relative aspect-[4/3] w-full">
                    {area.image ? (
                      <Image
                        src={urlFor(area.image).width(700).height(525).quality(85).url()}
                        alt={area.image?.alt || area.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 33vw, 100vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-900" />
                    )}
                  </div>

                  {/* Text underneath the image — icon badge straddles the seam for a bit of vibrancy */}
                  <div className="relative flex-1 px-6 pb-7 pt-8">
                    <div className="absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-xl bg-red-700 text-white shadow-md ring-4 ring-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d={area.icon} />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {area.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {area.description}
                    </p>
                  </div>
                </CardTag>
              </AnimateOnScroll>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
