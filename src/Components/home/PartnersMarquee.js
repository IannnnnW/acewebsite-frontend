'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

// Same roster shown on /about via PartnerCarousel — restated here as an
// endless auto-scrolling strip instead of a one-at-a-time slide.
const partners = [
  { name: 'National Institutes of Health', abbreviation: 'NIH', logo: '/images/partners/nih-logo.png' },
  { name: 'NIAID/OCICB', logo: '/images/partners/niaid-logo.png' },
  { name: 'Makerere University', logo: '/images/partners/makerere-logo.png' },
  { name: 'Infectious Diseases Institute', abbreviation: 'IDI', logo: '/images/partners/idi-logo.png' },
  { name: 'CAfGEN Project', logo: '/images/partners/cafgen-logo.png' },
  { name: 'RENU', logo: '/images/partners/renu-logo.png' },
  { name: 'African Research Universities Alliance', abbreviation: 'ARUA', logo: '/images/partners/arua-logo.png' },
]

// Duplicated once so the strip can loop seamlessly — when the scroll
// position passes the halfway point (the end of the first copy) it jumps
// back to 0, which is invisible to the eye since the second copy is
// pixel-identical to the first.
const duplicatedPartners = [...partners, ...partners]

export default function PartnersMarquee() {
  const scrollRef = useRef(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollInterval

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0
        } else {
          scrollContainer.scrollLeft += 1
        }
      }, 20)
    }

    startScroll()

    const handleMouseEnter = () => clearInterval(scrollInterval)
    const handleMouseLeave = () => startScroll()

    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearInterval(scrollInterval)
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="overflow-hidden py-8">
      <div
        ref={scrollRef}
        className="flex gap-16 overflow-x-hidden items-center"
        style={{ scrollBehavior: 'auto' }}
      >
        {duplicatedPartners.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex-shrink-0 w-56 flex items-center justify-center"
          >
            {partner.logo ? (
              <div className="relative w-full h-32">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 224px"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 text-gray-600 font-semibold text-center px-4">
                {partner.abbreviation || partner.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
