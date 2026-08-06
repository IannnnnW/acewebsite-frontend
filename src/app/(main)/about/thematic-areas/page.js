import Link from 'next/link'
import { client } from '@/lib/sanity'
import { fetchWithFallback } from '@/lib/fallback'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

export const metadata = {
  title: 'Thematic Areas | ACE Uganda',
  description: 'Explore the core research and training thematic areas at the African Center of Excellence in Bioinformatics and Data Intensive Sciences.',
}

const iconMap = {

  // ─── ORIGINAL SIX ─────────────────────────────────────────────────────────

  'academic-cap': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),

  beaker: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01-2.14 1.5H6.34A2.25 2.25 0 014.2 15m15.6 0H4.2" />
    </svg>
  ),

  presentation: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
    </svg>
  ),

  server: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v.75a.75.75 0 01-.75.75H3a.75.75 0 01-.75-.75v-.75m19.5 0a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75H3a.75.75 0 00-.75.75v6.75a.75.75 0 00.75.75m19.5 0H2.25M12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    </svg>
  ),

  users: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),

  chart: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),

  // ─── THEMATIC AREA ICONS ──────────────────────────────────────────────────

  /**
   * Human Genomics & Cancer
   * A DNA double helix — two opposing sinusoidal strands with horizontal rungs
   */
  dna: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      {/* Left strand — curves left → right → left going down */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 2C15 5 15 9 9 12C3 15 3 19 9 22" />
      {/* Right strand — mirror: curves right → left → right going down */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 2C9 5 9 9 15 12C21 15 21 19 15 22" />
      {/* Horizontal rungs — 5 cross-links at evenly spaced intervals */}
      <path strokeLinecap="round" d="M10.2 4.8L13.8 4.8" />
      <path strokeLinecap="round" d="M8.2 8.5L15.8 8.5" />
      <path strokeLinecap="round" d="M8.2 15.5L15.8 15.5" />
      <path strokeLinecap="round" d="M10.2 19.2L13.8 19.2" />
    </svg>
  ),

  /**
   * Malaria Computational Biology
   * A simplified insect/mosquito — oval body, round head, antennae, 3 pairs of legs
   */
  bug: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      {/* Body */}
      <ellipse cx="12" cy="14.5" rx="2.75" ry="4.5" />
      {/* Head */}
      <circle cx="12" cy="8.5" r="2.25" />
      {/* Antennae */}
      <path strokeLinecap="round" d="M10.5 6.8L8 4" />
      <path strokeLinecap="round" d="M13.5 6.8L16 4" />
      {/* Left legs — upper, middle, lower */}
      <path strokeLinecap="round" d="M9.3 11.5L5.5 10.5" />
      <path strokeLinecap="round" d="M9.3 14.5L5.5 14.5" />
      <path strokeLinecap="round" d="M9.3 17.5L5.5 18.5" />
      {/* Right legs — upper, middle, lower */}
      <path strokeLinecap="round" d="M14.7 11.5L18.5 10.5" />
      <path strokeLinecap="round" d="M14.7 14.5L18.5 14.5" />
      <path strokeLinecap="round" d="M14.7 17.5L18.5 18.5" />
    </svg>
  ),

  /**
   * High Performance Computing
   * CPU chip with external pin connectors — Heroicons 2.x cpu-chip
   */
  'cpu-chip': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
    </svg>
  ),

  /**
   * Enhanced Visualization
   * VR / immersive headset — visor with two lenses, side straps
   */
  'vr-headset': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      {/* Main visor body */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 9.75A3 3 0 015.25 7h13.5a3 3 0 013 3v4a3.5 3.5 0 01-3.5 3.5H5.75A3.5 3.5 0 012.25 14v-4.25z" />
      {/* Left lens */}
      <circle cx="8.5" cy="12" r="2" />
      {/* Right lens */}
      <circle cx="15.5" cy="12" r="2" />
      {/* Nose bridge between lenses */}
      <path strokeLinecap="round" d="M10.5 12h3" />
      {/* Left strap */}
      <path strokeLinecap="round" d="M2.25 12H1" />
      {/* Right strap */}
      <path strokeLinecap="round" d="M21.75 12H23" />
    </svg>
  ),

  /**
   * Responsible AI & Digital Health Innovation
   * Sparkles / generative AI symbol — Heroicons 2.x sparkles
   */
  sparkles: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),

  /**
   * Responsible AI — ethics / safety emphasis variant
   * Shield with checkmark — Heroicons 2.x shield-check
   */
  'shield-check': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),

  /**
   * Sustainable Digital Data Infrastructure
   * Stacked database cylinders — Heroicons 2.x circle-stack
   */
  'circle-stack': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),

  /**
   * One Health, Pathogen Intelligence & AMR
   * Globe with latitude/longitude lines suggesting global surveillance
   * Heroicons 2.x globe-alt
   */
  'globe-health': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),

  /**
   * Disease Modelling and Pandemic Preparedness
   * Coronavirus-style pathogen — central nucleus with 8 radiating spikes,
   * each tipped with a small filled circle
   */
  virus: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      {/* Nucleus */}
      <circle cx="12" cy="12" r="3.5" />
      {/* Cardinal spikes */}
      <path strokeLinecap="round" d="M12 3.5V7.5" />
      <path strokeLinecap="round" d="M12 16.5V20.5" />
      <path strokeLinecap="round" d="M3.5 12H7.5" />
      <path strokeLinecap="round" d="M16.5 12H20.5" />
      {/* Diagonal spikes */}
      <path strokeLinecap="round" d="M5.808 5.808L8.636 8.636" />
      <path strokeLinecap="round" d="M15.364 15.364L18.192 18.192" />
      <path strokeLinecap="round" d="M18.192 5.808L15.364 8.636" />
      <path strokeLinecap="round" d="M8.636 15.364L5.808 18.192" />
      {/* Spike tips — small filled circles */}
      <circle cx="12" cy="3" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="12" cy="21" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="3" cy="12" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="21" cy="12" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="5.1" cy="5.1" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="18.9" cy="5.1" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="5.1" cy="18.9" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="18.9" cy="18.9" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),

  /**
   * Training & Capacity Strengthening
   * Group of people — Heroicons 2.x user-group
   */
  'user-group': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),

  // ─── GENERAL PURPOSE ADDITIONS ────────────────────────────────────────────

  /**
   * Bioinformatics / coding / computational work
   * Code angle brackets with slash — Heroicons 2.x code-bracket
   */
  'code-bracket': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),

  /**
   * Research / lab science
   * Microscope — custom outline
   */
  microscope: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      {/* Eyepiece */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 3h4v3h-4z" />
      {/* Barrel */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v5" />
      {/* Objective lens */}
      <ellipse cx="12" cy="12" rx="3" ry="1.5" />
      {/* Stage */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.5h9" />
      {/* Arm */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v3.5" />
      {/* Base */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 19.5h11" />
      {/* Pillar */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14.5L8.5 19.5M14 14.5L15.5 19.5" />
    </svg>
  ),

  /**
   * Research / discovery / analysis
   * Magnifying glass — Heroicons 2.x magnifying-glass
   */
  'magnifying-glass': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),

  /**
   * Global health / care / public health
   * Heart — Heroicons 2.x heart
   */
  heart: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),

  /**
   * Health pulse / clinical monitoring
   * Heartbeat / ECG line — custom path
   */
  'heart-pulse': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3l2.5-6 3.5 12 3-9 2 3h4" />
    </svg>
  ),

  /**
   * Warning / emergency / risk
   * Shield with exclamation — Heroicons 2.x shield-exclamation
   */
  'shield-exclamation': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
    </svg>
  ),

  /**
   * Global scope / international
   * Globe — Heroicons 2.x globe-americas
   */
  'globe-alt': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
    </svg>
  ),

  /**
   * Publications / documents
   * Document with text lines — Heroicons 2.x document-text
   */
  'document-text': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),

  /**
   * Events / scheduling
   * Calendar — Heroicons 2.x calendar-days
   */
  calendar: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
    </svg>
  ),

  /**
   * Data analytics / proportions
   * Pie chart — Heroicons 2.x chart-pie
   */
  'chart-pie': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
    </svg>
  ),

  /**
   * Genomics / unique identity
   * Fingerprint — Heroicons 2.x finger-print
   */
  fingerprint: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.954 11.954 0 0010.5 21c1.254 0 2.463-.19 3.6-.54m-9.9-8.206a11.96 11.96 0 01-.42-3.254c0-3.313 1.35-6.31 3.526-8.465m12.24 9.78a11.96 11.96 0 01-1.35 5.184m-6.65 3.276a11.95 11.95 0 01-5.034-2.265m12.29-2.48a11.952 11.952 0 004.2-5.504" />
    </svg>
  ),

  /**
   * Growth / trends / outcomes
   * Upward trending line — Heroicons 2.x arrow-trending-up
   */
  'arrow-trending-up': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  ),

  /**
   * Navigation / forward direction
   * Arrow right — Heroicons 2.x arrow-right
   */
  'arrow-right': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),

  /**
   * Navigation / back direction
   * Arrow left — Heroicons 2.x arrow-left
   */
  'arrow-left': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  ),

  /**
   * Confirmation / success / done
   * Check inside circle — Heroicons 2.x check-circle
   */
  'check-circle': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),

  /**
   * Info / about / context
   * Information circle — Heroicons 2.x information-circle
   */
  'information-circle': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  ),

  /**
   * Location / geography / field sites
   * Map pin — Heroicons 2.x map-pin
   */
  'map-pin': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),

  /**
   * Contact / communication
   * Envelope — Heroicons 2.x envelope
   */
  envelope: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),

  /**
   * Phone / contact
   * Phone — Heroicons 2.x phone
   */
  phone: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),

  /**
   * Download / export
   * Arrow down into tray — Heroicons 2.x arrow-down-tray
   */
  download: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  ),

  /**
   * External link / open in new tab
   * Arrow top-right from square — Heroicons 2.x arrow-top-right-on-square
   */
  'external-link': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  ),

  /**
   * News / blog / feed
   * Newspaper — Heroicons 2.x newspaper
   */
  newspaper: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
    </svg>
  ),

  /**
   * Network / partnership / connections
   * Share / network node — Heroicons 2.x share
   */
  network: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path strokeLinecap="round" d="M8.37 10.87l7.26-4.24M8.37 13.13l7.26 4.24" />
    </svg>
  ),

  /**
   * Fellowship / award / achievement
   * Trophy — custom outline
   */
  trophy: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.496m0 0L9 9m5.007 0L14.25 9M9 9l-.75-4.5H6.75m5.25 4.5H15L15.75 4.5H17.25M6.75 4.5h10.5a.75.75 0 01.75.75v.75a6.75 6.75 0 01-6.75 6.75H12a6.75 6.75 0 01-6.75-6.75V5.25a.75.75 0 01.75-.75z" />
    </svg>
  ),

  /**
   * Policy / governance / compliance
   * Scale of justice — Heroicons 2.x scale
   */
  scale: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" />
    </svg>
  ),

}

async function getAboutData() {
  return fetchWithFallback(
    () => client.fetch(`*[_type == "aboutPage"][0]`),
    'about'
  )
}

export default async function ThematicAreasPage() {
  const aboutData = await getAboutData()

  const services = aboutData?.thematicAreasSection?.thematicAreas || []
  const sectionTitle = aboutData?.thematicAreasSection?.sectionTitle || 'Thematic Areas'
  const sectionDescription = aboutData?.thematicAreasSection?.sectionDescription || ''

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-red-700 to-red-900 py-20 sm:py-28 overflow-hidden">
        <ACEPattern rows={6} cols={9} opacity={0.08} className="absolute top-4 right-4 hidden lg:block" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up">
            <Link href="/about" className="inline-flex items-center text-red-200 hover:text-white text-sm mb-6 transition-colors">
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              About ACE Uganda
            </Link>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {sectionTitle}
            </h1>
            {sectionDescription && (
              <p className="mt-4 text-lg text-red-100 max-w-2xl">
                {sectionDescription}
              </p>
            )}
          </AnimateOnScroll>
        </div>
      </div>

      {/* Services / Thematic Areas Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        {services.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <AnimateOnScroll key={service.title} variant="fade-up" delay={i * 80} className="h-full">
                <Link
                  href={`/research?area=${encodeURIComponent(service.title)}`}
                  className="group flex flex-col h-full rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-md hover:border-red-200 transition-all"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-700 mb-5 shrink-0 group-hover:bg-red-100 transition-colors">
                    {iconMap[service.icon] || iconMap['beaker']}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-red-700 transition-colors">{service.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{service.description}</p>
                  {service.features && service.features.length > 0 && (
                    <ul className="mt-5 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-gray-500">
                          <svg className="h-4 w-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 group-hover:text-red-600">
                    View related projects
                    <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">No thematic areas available yet.</div>
        )}

        {/* CTA */}
        <AnimateOnScroll variant="fade-up" delay={100} className="mt-16 flex flex-wrap gap-4">
          <Link href="/research" className="rounded-md bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition-colors">
            View Research Projects →
          </Link>
          <Link href="/about/who-we-are" className="rounded-md border border-red-700 px-5 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50 transition-colors">
            Who We Are
          </Link>
          <Link href="/about/our-journey" className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            Our Journey
          </Link>
        </AnimateOnScroll>
      </div>
    </div>
  )
}
