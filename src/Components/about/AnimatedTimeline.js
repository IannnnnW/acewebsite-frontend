'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

export default function AnimatedTimeline({ milestones }) {
  const [visibleItems, setVisibleItems] = useState(new Set())
  const itemRefs = useRef([])

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, index]))
            }
          })
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -100px 0px',
        }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [milestones.length])

  return (
    <div className="relative">
      {/* Center Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-red-200 via-red-400 to-red-200 hidden lg:block"></div>

      <div className="space-y-16">
        {milestones.map((milestone, index) => {
          const isVisible = visibleItems.has(index)
          const isEven = index % 2 === 0
          const hasImage = !!milestone.image

          return (
            <div
              key={milestone.year}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              className={`relative flex items-center ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } flex-col lg:gap-8`}
            >
              {/* Content Card */}
              <div
                className={`flex-1 ${
                  isEven ? 'lg:text-right' : 'lg:text-left'
                } text-center lg:text-inherit transition-all duration-1000 ${
                  isVisible
                    ? 'opacity-100 translate-x-0'
                    : `opacity-0 ${isEven ? 'translate-x-20' : '-translate-x-20'}`
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group overflow-hidden">
                  {/* Image — sits above the text when set for this milestone */}
                  {hasImage && (
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={urlFor(milestone.image).width(700).height(394).url()}
                        alt={milestone.image?.alt || milestone.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="p-8">
                    {/* Year Badge */}
                    <div className={`mb-4 ${isEven ? 'lg:justify-end' : 'lg:justify-start'} flex justify-center`}>
                      <span className="inline-block px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-full shadow-md group-hover:scale-105 transition-transform">
                        {milestone.year}
                      </span>
                    </div>

                    {/* Event Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-700 transition-colors">
                      {milestone.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Center Dot */}
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 hidden lg:flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700 ring-8 ring-white shadow-lg transition-all duration-700 ${
                  isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150 + 200}ms` }}
              >
                <div className="h-4 w-4 rounded-full bg-white animate-pulse"></div>
              </div>

              {/* Mobile Dot */}
              <div
                className={`lg:hidden mt-4 h-8 w-8 rounded-full bg-gradient-to-br from-red-600 to-red-700 ring-4 ring-white shadow-lg transition-all duration-700 ${
                  isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
              >
                <div className="h-full w-full rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                </div>
              </div>

              {/* Spacer for alignment */}
              <div className="flex-1 hidden lg:block"></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
