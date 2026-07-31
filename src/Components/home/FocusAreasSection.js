import Link from 'next/link'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import { fetchWithFallback } from '@/lib/fallback'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

export default async function FocusAreasSection() {
  const homeData = await fetchWithFallback(
    () => client.fetch(`*[_type == "homePage"][0]`),
    'home'
  )
  return (
    <section className="relative py-24 sm:py-32 bg-gray-50 overflow-hidden">
      <ACEPattern rows={5} cols={7} opacity={0.09} className="absolute bottom-8 left-8 hidden lg:block" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-red-900">Thematic Areas</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {homeData.focusAreasSection.sectionTitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {homeData.focusAreasSection.sectionDescription}
          </p>
        </AnimateOnScroll>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {homeData.focusAreasSection.focusAreas.map((area, index) => {
            const CardTag = area.link ? Link : 'div'
            const cardProps = area.link ? { href: area.link } : {}
            return (
            <AnimateOnScroll key={area._key} variant="fade-up" delay={index * 100}>
              {/*
                Card: title is always visible; the description reveals on
                hover via a 0fr -> 1fr grid-rows transition (no JS needed).
                The scrim under the text is tuned so both states stay
                readable regardless of what the background photo looks like.
                Renders as a link when the card has one configured, otherwise
                a plain non-interactive div.
              */}
              <CardTag {...cardProps} className="group relative flex flex-col justify-end overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 aspect-[4/5] sm:aspect-[16/11]">

                {/* Background image, or a brand-red gradient when no image is set yet */}
                {area.image ? (
                  <Image
                    src={urlFor(area.image).width(900).height(700).quality(80).url()}
                    alt={area.image?.alt || area.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-900 transition-transform duration-500 ease-out group-hover:scale-105" />
                )}

                {/* Scrim — deepens on hover so the newly-revealed description stays legible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5 transition-all duration-300 group-hover:from-black/90 group-hover:via-black/60" />

                {/* Icon badge */}
                <div className="absolute top-5 left-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm ring-1 ring-white/25 group-hover:bg-red-700 transition-colors">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={area.icon} />
                  </svg>
                </div>

                {/* Text — title always shown; description grows in on hover */}
                <div className="relative z-10 p-6">
                  <h3 className="text-xl font-bold text-white drop-shadow-sm">
                    {area.title}
                  </h3>
                  <div className="grid transition-all duration-300 ease-out grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                    <p className="overflow-hidden text-sm leading-relaxed text-gray-100 mt-0 group-hover:mt-3">
                      {area.description}
                    </p>
                  </div>
                </div>
              </CardTag>
            </AnimateOnScroll>
            )
          })}
        </div>

        <AnimateOnScroll variant="fade-up" delay={200} className="mt-16 flex justify-center">
          <Link
            href="/research"
            className="rounded-md bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-800 transition-colors"
          >
            Explore All Research Projects
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
