import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity'
import { eventBySlugQuery, allEventsQuery } from '@/lib/queries'
import { notFound } from 'next/navigation'
import EventGallery from '@/Components/events/EventGallery'

export const revalidate = 60 // Revalidate every 60 seconds

// Generate static paths for all events
export async function generateStaticParams() {
  const events = await client.fetch(allEventsQuery)

  return events.map((event) => ({
    slug: event.detailsLink.replace('/events/', '')
  }))
}

async function getEventData(slug) {
  try {
    const event = await client.fetch(eventBySlugQuery, { slug })
    return event
  } catch (error) {
    console.error('Error fetching event:', error)
    return null
  }
}

export default async function EventDetailsPage({ params }) {
  const { slug } = await params
  const event = await getEventData(slug)

  if (!event) {
    notFound()
  }

  const getCategoryColor = (category) => {
    const colors = {
      workshop: 'from-blue-600 to-blue-700',
      seminar: 'from-teal-600 to-teal-700',
      conference: 'from-red-600 to-red-700',
      training: 'from-emerald-600 to-emerald-700',
      webinar: 'from-amber-600 to-amber-700',
      networking: 'from-indigo-600 to-indigo-700',
    }
    return colors[category] || 'from-gray-600 to-gray-700'
  }

  const getCategoryIcon = (category) => {
    const icons = {
      workshop: '🔧',
      seminar: '🎤',
      conference: '🎓',
      training: '📚',
      webinar: '💻',
      networking: '🤝',
    }
    return icons[category] || '📅'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className={`relative bg-gradient-to-br ${getCategoryColor(event.category)} py-24 overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 animate-fade-in">
            <ol className="flex items-center space-x-2 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-white font-medium">Event Details</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="animate-slide-in-left">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white">
                  <span className="text-xl">{getCategoryIcon(event.category)}</span>
                  {event.category?.toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                {event.title}
              </h1>

              {/* Date & Location */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-white/90">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <div>
                    <div className="font-semibold">{formatDate(event.date)}</div>
                    <div className="text-sm">{formatTime(event.date)}</div>
                  </div>
                </div>

                {event.location && (
                  <div className="flex items-center gap-3 text-white/90">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span className="font-medium">{event.location}</span>
                  </div>
                )}

                {event.capacity && (
                  <div className="flex items-center gap-3 text-white/90">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                    <span className="font-medium">Capacity: {event.capacity} attendees</span>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              {!event.isPast && event.registrationLink && (
                <div className="flex gap-4 flex-wrap">
                  <Link
                    href={event.registrationLink}
                    className="inline-flex items-center rounded-md bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-100 transition-all hover:scale-105"
                  >
                    Register Now
                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-md bg-white/10 backdrop-blur-sm border-2 border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/20 transition-all"
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </div>

            {/* Event Image */}
            {event.image && (
              <div className="animate-slide-in-right">
                <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Description */}
      <div className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Event</h2>
            <div className="prose prose-lg text-gray-700">
              <p>{event.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Speakers Section */}
      {event.speakers && event.speakers.length > 0 && (
        <div className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Speakers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.speakers.map((speaker, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white text-2xl font-bold">
                        {speaker.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{speaker}</h3>
                        <p className="text-sm text-gray-600">Speaker</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Topics Section */}
      {event.topics && event.topics.length > 0 && (
        <div className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Topics Covered</h2>
              <div className="flex flex-wrap gap-3">
                {event.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-medium hover:bg-red-100 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Gallery */}
      {event.gallery && event.gallery.length > 0 && (
        <div className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <EventGallery images={event.gallery} title={event.galleryTitle} />
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {event.isPast ? 'Interested in Similar Events?' : 'Ready to Join Us?'}
            </h2>
            <p className="mt-4 text-lg text-red-100">
              {event.isPast
                ? 'Check out our upcoming events and opportunities'
                : 'Register now to secure your spot at this exciting event'}
            </p>
            <div className="mt-8 flex gap-4 justify-center flex-wrap">
              <Link
                href="/events"
                className="rounded-md bg-white px-6 py-3 text-base font-semibold text-red-700 shadow-sm hover:bg-gray-100 transition-all hover:scale-105"
              >
                View All Events
              </Link>
              <Link
                href="/contact"
                className="rounded-md bg-white/10 backdrop-blur-sm border-2 border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/20 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
