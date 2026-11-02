'use client'
import { useEffect } from 'react'
import { GoogleAnalytics, sendGAEvent } from '@next/third-parties/google'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

// Renders the GA4 tag only when a Measurement ID is configured, so local dev stays untracked.
export function Analytics() {
  if (!GA_ID) return null
  return <GoogleAnalytics gaId={GA_ID} />
}

// Sends a GA4 `search` event once the user stops typing, so each search counts once
// rather than once per keystroke. Shows up under Reports → Engagement → Events → search.
export function useSearchTracking(term, params = {}, delay = 1000) {
  const paramsKey = JSON.stringify(params)

  useEffect(() => {
    const q = term?.trim()
    if (!GA_ID || !q || q.length < 2) return
    const timer = setTimeout(() => {
      sendGAEvent('event', 'search', { search_term: q.toLowerCase(), ...JSON.parse(paramsKey) })
    }, delay)
    return () => clearTimeout(timer)
  }, [term, paramsKey, delay])
}

// One-off GA4 event (e.g. newsletter read/download). No-op when analytics isn't configured.
export function trackEvent(name, params = {}) {
  if (!GA_ID) return
  sendGAEvent('event', name, params)
}
