'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

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
    <section
      className="relative w-full overflow-hidden bg-gray-900"
      style={{ height: 'calc(100svh - 80px)', minHeight: '520px' }}
    >

      {/*
       * ── BACKGROUND — full-bleed image/video crossfade ──────────────────
       * The photo/video fills the entire hero; text sits on top of it.
       */}
      {slides.map((slide, i) => (
        <div
          key={slide._id}
          className="absolute inset-0 transition-opacity duration-[1200ms]"
          style={{ opacity: i === activeIndex ? 1 : 0 }}
          aria-hidden={i !== activeIndex}
        >
          {slide.mediaType === 'github' ? (
            /* GitHub slides need no photo — a branded dark panel stands in
               for the background; the real link lives in the CTA button
               below, driven by the slide's existing ctaLink field. */
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black">
              <svg
                className="h-40 w-40 sm:h-56 sm:w-56 lg:h-72 lg:w-72 text-white/10"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </div>
          ) : slide.videoUrl && slide.mediaType === 'video' ? (
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
              src={urlFor(slide.image).width(2000).height(1500).quality(85).url()}
              alt={slide.description || ''}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
          ) : null}

          {/* Optional sticker/badge (e.g. a partner or event logo) for this slide */}
          {slide.stickerImage && (
            <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-10 rounded-xl bg-white/95 shadow-lg ring-1 ring-black/5 p-3">
              <div className="relative h-10 w-24 sm:h-12 sm:w-32">
                <Image
                  src={urlFor(slide.stickerImage).width(300).url()}
                  alt={slide.stickerImage?.alt || `${slide.title} badge`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Scrim — strongest where the text sits (left), fading out to the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

      {/*
       * ── TEXT OVERLAY ─────────────────────────────────────────────────
       * Same left-aligned position and content as before — sized up for
       * the full-bleed canvas, with room reserved at the bottom for the
       * navigation cluster below.
       */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-24 pb-24 sm:pb-20 max-w-3xl">

        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-red-400 mb-6">
          {institutionLine || 'African Center of Excellence in Bioinformatics & Data Intensive Sciences'}
        </p>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] tracking-tight drop-shadow-sm">
          {tagline || 'Advancing Health through Innovation'}
        </h1>

        <div className="mt-8 mb-8 flex items-center gap-2" aria-hidden="true">
          <div className="h-[3px] w-12 bg-red-600 rounded-full" />
          <div className="h-[3px] w-4 bg-red-400/50 rounded-full" />
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
            <p className="text-lg lg:text-xl text-gray-200 leading-relaxed max-w-lg mb-10">
              {activeSlide.description}
            </p>
          )}

          {activeSlide.ctaText && activeSlide.ctaLink && (
            <Link
              href={activeSlide.ctaLink}
              {...(/^https?:\/\//.test(activeSlide.ctaLink) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="inline-flex items-center gap-2 rounded-md bg-red-700 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-red-800 hover:shadow-md"
            >
              {activeSlide.ctaText}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* ── NAVIGATION — bottom-center, independent of the text column ── */}
      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-8 sm:bottom-10 z-10 flex items-center justify-center gap-5 sm:gap-6 px-6">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="rounded-full border border-white/30 bg-black/20 backdrop-blur-sm p-2.5 text-white/80 transition-colors hover:border-red-500 hover:text-red-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Slide ${i + 1}`}
                onClick={() => goToSlide(i)}
                className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                style={{
                  height: '6px',
                  width: i === activeIndex ? '28px' : '6px',
                  backgroundColor: i === activeIndex ? '#dc2626' : 'rgba(255,255,255,0.35)',
                }}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="rounded-full border border-white/30 bg-black/20 backdrop-blur-sm p-2.5 text-white/80 transition-colors hover:border-red-500 hover:text-red-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

    </section>
  )
}
