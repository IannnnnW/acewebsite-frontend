import Link from 'next/link'
import Image from 'next/image'
import EventHighlight from '@/Components/events/EventHighlight'
import EventsHeroCarousel from '@/Components/events/EventsHeroCarousel'
import { client } from '@/lib/sanity'
import { upcomingEventsQuery, pastEventsQuery, eventHighlightsQuery, eventsPageSettingsQuery } from '@/lib/queries'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'

export const revalidate = 60 // Revalidate every 60 seconds

async function getEventsData() {
  try {
    const [upcomingEvents, pastEvents, eventHighlights] = await Promise.all([
      client.fetch(upcomingEventsQuery),
      client.fetch(pastEventsQuery),
      client.fetch(eventHighlightsQuery)
    ])

    return {
      upcomingEvents: upcomingEvents || [],
      pastEvents: pastEvents || [],
      eventHighlights: eventHighlights || []
    }
  } catch (error) {
    console.error('Error fetching events:', error)
    return {
      upcomingEvents: [],
      pastEvents: [],
      eventHighlights: []
    }
  }
}

export default async function EventsPage() {
  const [{ upcomingEvents, pastEvents, eventHighlights }, pageSettings] = await Promise.all([
    getEventsData(),
    client.fetch(eventsPageSettingsQuery),
  ])

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-900 py-24 sm:py-32 overflow-hidden">
        <EventsHeroCarousel images={pageSettings?.heroImages} />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up" className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-block">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
                Events & Happenings
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Discover Our Events
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              Join us for workshops, conferences, seminars, and networking events that shape the future of bioinformatics and data science in Africa
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Event Highlights Section */}
      {eventHighlights.length > 0 && (
        <div className="bg-gradient-to-b from-gray-50 to-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Event Highlights
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Key moments and milestones from our most impactful events
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fade-up" delay={100}>
              <EventHighlight highlights={eventHighlights} />
            </AnimateOnScroll>
          </div>
        </div>
      )}

      {/* Upcoming + Past Events */}
      <div className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Upcoming Events — section header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-700 mb-2">
                What's On
              </p>
              <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
            </div>
            <Link
              href="/events"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:text-red-900 transition-colors group"
            >
              View all events
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {upcomingEvents.length > 0 ? (
            <>
              {/* Featured event — first upcoming event, full-width landscape card */}
              <Link
                href={upcomingEvents[0].detailsLink}
                className="group block rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 mb-8"
              >
                <div className="flex flex-col lg:flex-row">

                  {/* Image — left on desktop, top on mobile */}
                  <div className="relative lg:w-3/5 aspect-[16/9] lg:aspect-auto lg:min-h-[360px] overflow-hidden bg-gray-100">
                    {upcomingEvents[0].image ? (
                      <Image
                        src={upcomingEvents[0].image}
                        alt={upcomingEvents[0].title}
                        fill
                        priority
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center">
                        <svg className="h-16 w-16 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    {/* "Featured" label on image */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-700 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-200 animate-pulse" />
                        Next Up
                      </span>
                    </div>
                  </div>

                  {/* Content — right on desktop, below on mobile */}
                  <div className="lg:w-2/5 p-8 lg:p-10 flex flex-col justify-center">

                    {/* Date · Category */}
                    <div className="flex items-center gap-2.5 mb-4">
                      <time className="text-sm font-medium text-gray-500">
                        {new Date(upcomingEvents[0].date).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </time>
                      {upcomingEvents[0].category && (
                        <>
                          <span className="text-gray-300">·</span>
                          <span className="text-sm font-semibold text-red-700 capitalize">
                            {upcomingEvents[0].category}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-snug group-hover:text-red-700 transition-colors mb-4">
                      {upcomingEvents[0].title}
                    </h3>

                    {/* Description — short excerpt */}
                    {upcomingEvents[0].description && (
                      <p className="text-gray-500 leading-relaxed line-clamp-3 mb-6">
                        {upcomingEvents[0].description}
                      </p>
                    )}

                    {/* Location */}
                    {upcomingEvents[0].location && (
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {upcomingEvents[0].location}
                      </div>
                    )}

                    {/* CTA */}
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 group-hover:text-red-900 transition-colors">
                      Learn more
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>

              {/* Remaining upcoming events — 3-column grid */}
              {upcomingEvents.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.slice(1).map((event) => (
                    <Link
                      key={event._id}
                      href={event.detailsLink}
                      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      {/* Square image */}
                      <div className="relative aspect-square overflow-hidden bg-gray-100 shrink-0">
                        {event.image ? (
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-red-800 to-red-950 flex items-center justify-center">
                            <svg className="h-10 w-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-5">

                        {/* Date · Category */}
                        <div className="flex items-center gap-2 mb-3">
                          <time className="text-xs font-medium text-gray-400">
                            {new Date(event.date).toLocaleDateString('en-GB', {
                              day: 'numeric', month: 'short', year: 'numeric'
                            })}
                          </time>
                          {event.category && (
                            <>
                              <span className="text-gray-200">·</span>
                              <span className="text-xs font-semibold text-red-700 capitalize">
                                {event.category}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-red-700 transition-colors line-clamp-3 flex-1 mb-4">
                          {event.title}
                        </h3>

                        {/* Location */}
                        {event.location && (
                          <p className="text-xs text-gray-400 flex items-center gap-1.5 mb-4">
                            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            {event.location}
                          </p>
                        )}

                        {/* Learn more */}
                        <span className="text-sm font-semibold text-red-700 group-hover:text-red-900 transition-colors inline-flex items-center gap-1.5 mt-auto">
                          Learn more
                          <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="py-16 text-center">
              <p className="text-gray-400 text-sm">No upcoming events at this time.</p>
              <p className="text-gray-400 text-sm mt-1">
                See our <a href="#past" className="text-red-700 font-medium">past events</a> below.
              </p>
            </div>
          )}

          {/* Past Events */}
          <div className="border-t border-gray-100 pt-16 mt-16" id="past">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400 mb-2">Archive</p>
                <h2 className="text-3xl font-bold text-gray-900">Past Events</h2>
              </div>
            </div>

            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <Link
                    key={event._id}
                    href={event.detailsLink}
                    className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 opacity-90 hover:opacity-100"
                  >
                    {/* Image — grayscale for past events, colour on hover */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100 shrink-0">
                      {event.image ? (
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                          <svg className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      {/* Past badge */}
                      <div className="absolute top-3 left-3">
                        <span className="rounded-full bg-black/40 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-white/80">
                          Past
                        </span>
                      </div>
                    </div>

                    {/* Content — identical structure to upcoming cards */}
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <time className="text-xs font-medium text-gray-400">
                          {new Date(event.date).toLocaleDateString('en-GB', {
                            day: 'numeric', month: 'short', year: 'numeric'
                          })}
                        </time>
                        {event.category && (
                          <>
                            <span className="text-gray-200">·</span>
                            <span className="text-xs font-medium text-gray-500 capitalize">{event.category}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-gray-700 leading-snug group-hover:text-red-700 transition-colors line-clamp-3 flex-1 mb-4">
                        {event.title}
                      </h3>
                      {event.location && (
                        <p className="text-xs text-gray-400 flex items-center gap-1.5 mb-4">
                          <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          {event.location}
                        </p>
                      )}
                      <span className="text-sm font-semibold text-gray-400 group-hover:text-red-700 transition-colors inline-flex items-center gap-1.5 mt-auto">
                        View details
                        <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-gray-400 text-sm">No past events to show yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stay Updated on Our Events
            </h2>
            <p className="mt-4 text-lg text-red-100">
              Subscribe to our newsletter to receive notifications about upcoming events and opportunities
            </p>
            <div className="mt-8 flex gap-4 justify-center flex-wrap">
              <Link
                href="/contact"
                className="rounded-md bg-white px-6 py-3 text-base font-semibold text-red-700 shadow-sm hover:bg-gray-100 transition-all hover:scale-105"
              >
                Get in Touch
              </Link>
              <Link
                href="/programs"
                className="rounded-md bg-white/10 backdrop-blur-sm border-2 border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/20 transition-all"
              >
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
