'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import ACEPattern from '@/Components/shared/ACEPattern'

const SLIDE_DURATION = 7000

export default function HeroCarousel({ slides, tagline, institutionLine }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideContentVisible, setSlideContentVisible] = useState(true)
  const timerRef = useRef(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      // Fade out the rotating description, swap the slide, fade back in
      setSlideContentVisible(false)
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length)
        setSlideContentVisible(true)
      }, 400)
    }, SLIDE_DURATION)
  }, [slides.length])

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer])

  const goToSlide = (index) => {
    setSlideContentVisible(false)
    setTimeout(() => {
      setActiveIndex(index)
      setSlideContentVisible(true)
    }, 400)
    startTimer()
  }

  if (!slides || slides.length === 0) return null

  const nextSlide = () => goToSlide((activeIndex + 1) % slides.length)
  const prevSlide = () => goToSlide((activeIndex - 1 + slides.length) % slides.length)

  const activeSlide = slides[activeIndex]

  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="mx-auto max-w-[1600px] flex flex-col lg:flex-row">

        {/*
         * ── LEFT — TEXT PANEL ───────────────────────────────────────────
         * Tagline + institution label are permanent. Only the description
         * and CTA rotate with the image on the right.
         */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-20 lg:w-[46%] shrink-0 bg-white">

          <ACEPattern
            rows={5}
            cols={7}
            opacity={0.06}
            className="hidden lg:block absolute top-10 right-10 pointer-events-none"
          />

          <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-700 mb-5">
            {institutionLine || 'African Center of Excellence in Bioinformatics & Data Intensive Sciences'}
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-extrabold text-gray-900 leading-[1.12] tracking-tight max-w-xl">
            {tagline || 'Advancing Health through Innovation'}
          </h1>

          <div className="mt-6 mb-6 flex items-center gap-2" aria-hidden="true">
            <div className="h-[3px] w-10 bg-red-700 rounded-full" />
            <div className="h-[3px] w-3 bg-red-200 rounded-full" />
          </div>

          {/* Rotating per-slide description + CTA */}
          <div
            key={activeSlide._id}
            className="transition-all duration-500"
            style={{
              opacity: slideContentVisible ? 1 : 0,
              transform: slideContentVisible ? 'translateY(0)' : 'translateY(8px)',
            }}
          >
            {activeSlide.description && (
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-md mb-8">
                {activeSlide.description}
              </p>
            )}

            {activeSlide.ctaText && activeSlide.ctaLink && (
              <Link
                href={activeSlide.ctaLink}
                className="inline-flex items-center gap-2 rounded-md bg-red-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-800 hover:shadow-md"
              >
                {activeSlide.ctaText}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </div>

          {/* Navigation — dots + arrows, understated and professional */}
          {slides.length > 1 && (
            <div className="mt-12 flex items-center gap-6">
              <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === activeIndex}
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => goToSlide(i)}
                    className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
                    style={{
                      height: '6px',
                      width: i === activeIndex ? '28px' : '6px',
                      backgroundColor: i === activeIndex ? '#a71c20' : '#e5e7eb',
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="rounded-full border border-gray-300 p-2 text-gray-500 transition-colors hover:border-red-700 hover:text-red-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="rounded-full border border-gray-300 p-2 text-gray-500 transition-colors hover:border-red-700 hover:text-red-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/*
         * ── RIGHT — IMAGE PANEL ─────────────────────────────────────────
         * Completely free of overlaid text. Images/video crossfade;
         * a thin red accent bar ties it back to the brand.
         */}
        <div className="relative h-[320px] sm:h-[420px] lg:h-auto lg:flex-1 overflow-hidden bg-gray-100">
          {slides.map((slide, i) => (
            <div
              key={slide._id}
              className="absolute inset-0 transition-opacity duration-[1200ms]"
              style={{ opacity: i === activeIndex ? 1 : 0 }}
              aria-hidden={i !== activeIndex}
            >
              {slide.videoUrl && slide.mediaType === 'video' ? (
                <video
                  autoPlay={i === activeIndex}
                  muted
                  loop
                  playsInline
                  poster={slide.posterImage?.url}
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src={slide.videoUrl} type="video/mp4" />
                </video>
              ) : slide.image ? (
                <Image
                  src={urlFor(slide.image).width(1600).height(1300).quality(85).url()}
                  alt={slide.description || ''}
                  fill
                  priority={i === 0}
                  className="object-cover"
                  sizes="(min-width: 1024px) 54vw, 100vw"
                />
              ) : null}
            </div>
          ))}

          {/* Subtle vignette for photographic depth — not for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

          {/* Brand accent — thin red edge where the two panels meet */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-1.5 bg-red-700" />
        </div>

      </div>
    </section>
  )
}
