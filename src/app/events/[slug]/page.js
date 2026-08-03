import Link from 'next/link'
import Image from 'next/image'
import SafeTweet from '@/Components/shared/SafeTweet'
import { client } from '@/lib/sanity'
import { eventBySlugQuery, allEventsQuery } from '@/lib/queries'
import { notFound } from 'next/navigation'
import EventGallery from '@/Components/events/EventGallery'

const OUTPUT_TYPE_META = {
  github: { label: 'GitHub Repository', icon: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12', fill: true },
  paper: { label: 'Published Paper', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
  dataset: { label: 'Dataset', icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375' },
  slides: { label: 'Slides', icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5' },
  report: { label: 'Report', icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z' },
  other: { label: 'Resource', icon: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244' },
}

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
      workshop: 'from-red-700 to-red-900',
      seminar: 'from-red-800 to-red-950',
      conference: 'from-red-700 to-red-800',
      training: 'from-red-600 to-red-800',
      webinar: 'from-red-900 to-red-950',
      networking: 'from-red-700 to-red-900',
    }
    return colors[category] || 'from-red-700 to-red-900'
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
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
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
              {event.status !== 'past' && event.registrationLink && (
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

            {/* Event Documents — Agenda & Concept Note */}
            {(event.agendaFile || event.conceptNoteFile) && (
              <div className="mt-10 flex flex-wrap gap-4">
                {event.agendaFile && (
                  <a
                    href={event.agendaFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white hover:bg-red-800 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    Download Agenda
                  </a>
                )}
                {event.conceptNoteFile && (
                  <a
                    href={event.conceptNoteFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-xl border border-red-300 px-5 py-3 text-sm font-semibold text-red-700 hover:bg-red-50 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    Concept Note
                  </a>
                )}
              </div>
            )}
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

      {/* Event Outputs — what came out of the event */}
      {event.outputs && event.outputs.length > 0 && (
        <div className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Event Outputs</h2>
              <p className="text-gray-600 mb-8">Resources and results produced from this event</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.outputs.map((output) => {
                  const meta = OUTPUT_TYPE_META[output.type] || OUTPUT_TYPE_META.other
                  return (
                    <a
                      key={output._key}
                      href={output.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-red-200 transition-all"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-700">
                        {meta.fill ? (
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d={meta.icon} /></svg>
                        ) : (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d={meta.icon} /></svg>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">{meta.label}</p>
                        <p className="font-semibold text-gray-900 group-hover:text-red-700 transition-colors leading-snug">{output.title}</p>
                        {output.description && <p className="mt-1 text-sm text-gray-500 line-clamp-2">{output.description}</p>}
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related Stories — blog posts about this event */}
      {event.relatedBlogs && event.relatedBlogs.length > 0 && (
        <div className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Stories</h2>
              <div className="space-y-4">
                {event.relatedBlogs.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug?.current}`}
                    className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md hover:border-red-200 transition-all"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                      {post.featuredImage?.url ? (
                        <Image src={post.featuredImage.url} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-900" />
                      )}
                    </div>
                    <div className="min-w-0">
                      {post.publishedAt && (
                        <p className="text-xs text-gray-400 mb-1">
                          {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      )}
                      <h3 className="font-bold text-gray-900 group-hover:text-red-700 transition-colors leading-snug line-clamp-2">{post.title}</h3>
                      {post.excerpt && <p className="mt-1 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tweet feed — social coverage of the event */}
      {event.tweetUrls && event.tweetUrls.length > 0 && (
        <div className="py-16 bg-white" data-theme="light">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">From the Conversation</h2>
              <p className="text-gray-600 mb-8">Highlights from X about this event</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 [&_.react-tweet-theme]:!my-0 [&_.react-tweet-theme]:!max-w-none">
                {event.tweetUrls.map((url, i) => (
                  <SafeTweet key={i} url={url} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-red-700 to-red-900 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {event.status === 'past' ? 'Interested in Similar Events?' : 'Ready to Join Us?'}
            </h2>
            <p className="mt-4 text-lg text-red-100">
              {event.status === 'past'
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
