'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function EventCard({ event, index = 0 }) {
  const [timeLeft, setTimeLeft] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setIsVisible(true), index * 100)
    return () => clearTimeout(timer)
  }, [index])

  useEffect(() => {
    if (!event.date || event.isPast) return

    const calculateTimeLeft = () => {
      const difference = new Date(event.date) - new Date()
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        }
      }
      return null
    }

    setTimeLeft(calculateTimeLeft())
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [event.date, event.isPast])

  const getCategoryColor = (category) => {
    const colors = {
      workshop: 'bg-blue-600',
      seminar: 'bg-teal-600',
      conference: 'bg-red-600',
      training: 'bg-emerald-600',
      webinar: 'bg-amber-600',
      networking: 'bg-indigo-600',
    }
    return colors[category] || 'bg-gray-600'
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

  return (
    <div
      className={`group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="card-flip-container h-[450px]">
        <div className="card-flip-inner relative w-full h-full">
          {/* Front of Card */}
          <div className="card-flip-front absolute inset-0 bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Image */}
            <div className="relative h-45 overflow-hidden">
              <Image
                src={event.image || '/acewebsite-frontend/images/default-event.jpg'}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center gap-1 rounded-full ${getCategoryColor(event.category)} px-3 py-1 text-xs font-semibold text-white shadow-lg`}>
                  <span>{getCategoryIcon(event.category)}</span>
                  {event.category}
                </span>
              </div>

              {/* Status Badge */}
              {!event.isPast && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-lg animate-pulse-slow">
                    Upcoming
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span className="font-medium">{new Date(event.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-700 transition-colors">
                {event.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {event.description}
              </p>

              {/* Location */}
              {event.location && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              )}

              {/* Countdown Timer for Upcoming Events */}
              {!event.isPast && timeLeft && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-700">{timeLeft.days}</div>
                      <div className="text-xs text-gray-500">Days</div>
                    </div>
                    <div className="text-gray-300">:</div>
                    <div>
                      <div className="text-2xl font-bold text-red-700">{timeLeft.hours}</div>
                      <div className="text-xs text-gray-500">Hours</div>
                    </div>
                    <div className="text-gray-300">:</div>
                    <div>
                      <div className="text-2xl font-bold text-red-700">{timeLeft.minutes}</div>
                      <div className="text-xs text-gray-500">Minutes</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Back of Card */}
          <div className="card-flip-back absolute inset-0 bg-gradient-to-br from-red-700 to-red-900 rounded-xl shadow-lg p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {event.title}
              </h3>

              <div className="space-y-3 text-white/90">
                {event.speakers && event.speakers.length > 0 && (
                  <div>
                    <div className="font-semibold text-white mb-1">Speakers:</div>
                    <ul className="text-sm space-y-1">
                      {event.speakers.map((speaker, idx) => (
                        <li key={idx}>• {speaker}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.topics && event.topics.length > 0 && (
                  <div>
                    <div className="font-semibold text-white mb-1">Topics:</div>
                    <ul className="text-sm space-y-1">
                      {event.topics.slice(0, 3).map((topic, idx) => (
                        <li key={idx}>• {topic}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.capacity && (
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                    <span className="text-sm">Capacity: {event.capacity} attendees</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              {!event.isPast && event.registrationLink && (
                <Link
                  href={event.registrationLink}
                  className="block w-full text-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-red-700 shadow-sm hover:bg-gray-100 transition-colors"
                >
                  Register Now
                </Link>
              )}
              {event.detailsLink && (
                <Link
                  href={event.detailsLink}
                  className="block w-full text-center rounded-md bg-white/10 border-2 border-white px-4 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  {event.isPast ? 'View Summary' : 'Learn More'}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
