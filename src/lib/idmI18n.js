'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import enMessages from '@/messages/en.json'
import frMessages from '@/messages/fr.json'

const messages = { en: enMessages, fr: frMessages }

export const I18nContext = createContext({
  locale: 'en',
  t: (k) => k,
  setLocale: () => {},
})

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState('en')

  useEffect(() => {
    const saved = localStorage.getItem('idm-locale')
    if (saved === 'en' || saved === 'fr') setLocaleState(saved)
  }, [])

  const setLocale = (l) => {
    setLocaleState(l)
    localStorage.setItem('idm-locale', l)
  }

  const t = (key) => {
    const parts = key.split('.')
    let val = messages[locale]
    for (const p of parts) val = val?.[p]
    if (typeof val === 'string') return val
    // Fallback to English
    val = messages.en
    for (const p of parts) val = val?.[p]
    return typeof val === 'string' ? val : key
  }

  return <I18nContext.Provider value={{ locale, t, setLocale }}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)
