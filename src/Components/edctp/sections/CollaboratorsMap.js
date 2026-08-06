'use client'
import { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useI18n } from '@/lib/idmI18n'
import { getCountryCoords, getContinent, getGeoName, CONTINENT_BOUNDS } from '@/lib/edctpCountryCoords'

const AFRICA_CENTER = [1, 20]
const AFRICA_ZOOM = 3
const BADGE_W = 64
const BADGE_H = 52
const TAIL = 8
const DECLUTTER_OFFSET_DEG = 1.1

const GROUPS = [
  { key: 'beneficiaries', color: '#003366', labelKey: 'partners.beneficiaries' },
  { key: 'collaborators', color: '#a71c20', labelKey: 'partners.collaborators' },
  { key: 'sites', color: '#00AEEF', labelKey: 'partners.partnerSites' },
]

// Rest/hover fill for a partner country's boundary — "light blue" per the
// site's idblue theme scale (idblue-500 base outline, idblue-300 on hover).
const COUNTRY_BASE_STYLE = { fillColor: '#00AEEF', fillOpacity: 0.08, color: '#00AEEF', weight: 1.5, opacity: 0.6 }
const COUNTRY_HOVER_STYLE = { fillColor: '#66CDF3', fillOpacity: 0.55, color: '#0092C9', weight: 2, opacity: 0.9 }

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

function logoIcon(item, group) {
  const hasLogo = !!item.logo?.url
  const inner = hasLogo
    ? `<img src="${item.logo.url}" alt="" style="display:block;width:100%;height:100%;object-fit:contain;" />`
    : `<span style="color:white;font-weight:700;font-size:18px;">${escapeHtml((item.name || '?').charAt(0).toUpperCase())}</span>`

  return L.divIcon({
    className: '',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.35));">
        <div style="width:${BADGE_W}px;height:${BADGE_H}px;border-radius:8px;background:${hasLogo ? 'white' : group.color};border:2px solid ${group.color};display:flex;align-items:center;justify-content:center;overflow:hidden;padding:4px;box-sizing:border-box;">${inner}</div>
        <div style="width:0;height:0;border-left:${TAIL}px solid transparent;border-right:${TAIL}px solid transparent;border-top:${TAIL}px solid ${group.color};margin-top:-1px;"></div>
      </div>
    `,
    iconSize: [BADGE_W, BADGE_H + TAIL],
    iconAnchor: [BADGE_W / 2, BADGE_H + TAIL],
    popupAnchor: [0, -(BADGE_H + TAIL)],
  })
}

function resolveCoords(item) {
  if (typeof item.latitude === 'number' && typeof item.longitude === 'number') {
    return [item.latitude, item.longitude]
  }
  return getCountryCoords(item.country)
}

// Multiple orgs sharing a country-centroid fallback would otherwise stack
// exactly on top of each other — fan them out in a small circle so every
// logo stays visible.
function declutter(pinned) {
  const byRoundedCoord = new Map()
  pinned.forEach((p) => {
    const key = `${p.coords[0].toFixed(1)},${p.coords[1].toFixed(1)}`
    if (!byRoundedCoord.has(key)) byRoundedCoord.set(key, [])
    byRoundedCoord.get(key).push(p)
  })

  const result = []
  byRoundedCoord.forEach((group) => {
    if (group.length === 1) {
      result.push(group[0])
      return
    }
    const [baseLat, baseLng] = group[0].coords
    group.forEach((p, i) => {
      const angle = (2 * Math.PI * i) / group.length
      result.push({
        ...p,
        coords: [baseLat + DECLUTTER_OFFSET_DEG * Math.sin(angle), baseLng + DECLUTTER_OFFSET_DEG * Math.cos(angle)],
      })
    })
  })
  return result
}

function FitToMarkers({ points }) {
  const map = useMap()
  const key = points.map((p) => p.join(',')).join('|')

  useEffect(() => {
    if (points.length === 0) return
    if (points.length === 1) {
      map.setView(points[0], 6)
      return
    }
    map.fitBounds(points, { padding: [40, 40], maxZoom: 7 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return null
}

// A tight fitBounds() alone isn't enough: when the container is much wider
// than the data's bounding box, Leaflet fills the leftover width with
// whatever's geographically adjacent — which is how unrelated continents
// were sneaking into view. maxBounds hard-locks how far a user can ever
// pan/zoom out, so nothing outside the continents that actually have
// collaborators is reachable, regardless of container aspect ratio.
function boundsForContinents(continents) {
  const boxes = [...continents].map((c) => CONTINENT_BOUNDS[c]).filter(Boolean)
  if (boxes.length === 0) return null
  const bounds = L.latLngBounds(boxes[0])
  boxes.slice(1).forEach((b) => bounds.extend(b))
  return bounds
}

function onEachCountry(feature, layer) {
  layer.setStyle(COUNTRY_BASE_STYLE)
  layer.on('mouseover', () => layer.setStyle(COUNTRY_HOVER_STYLE))
  layer.on('mouseout', () => layer.setStyle(COUNTRY_BASE_STYLE))
}

export default function CollaboratorsMap({ beneficiaries = [], collaborators = [], sites = [] }) {
  const { t } = useI18n()
  const [worldGeo, setWorldGeo] = useState(null)

  useEffect(() => {
    fetch('/geo/world-countries.geo.json')
      .then((res) => res.json())
      .then(setWorldGeo)
      .catch(() => {})
  }, [])

  const pinned = useMemo(() => {
    const byGroup = { beneficiaries, collaborators, sites }
    const withCoords = GROUPS.flatMap((group) =>
      (byGroup[group.key] || [])
        .map((item) => ({ item, coords: resolveCoords(item), group }))
        .filter((entry) => entry.coords)
    )
    return declutter(withCoords)
  }, [beneficiaries, collaborators, sites])

  const allPoints = pinned.map((p) => p.coords)

  const maxBounds = useMemo(() => {
    const continents = new Set(
      [...beneficiaries, ...collaborators, ...sites].map((item) => getContinent(item.country)).filter(Boolean)
    )
    return boundsForContinents(continents)
  }, [beneficiaries, collaborators, sites])

  const partnerCountryFeatures = useMemo(() => {
    if (!worldGeo) return null
    const geoNames = new Set(
      [...beneficiaries, ...collaborators, ...sites].map((item) => getGeoName(item.country)).filter(Boolean)
    )
    return { type: 'FeatureCollection', features: worldGeo.features.filter((f) => geoNames.has(f.properties.name)) }
  }, [worldGeo, beneficiaries, collaborators, sites])

  if (pinned.length === 0) {
    return (
      <div className="w-full flex items-center justify-center bg-gray-50" style={{ height: '65vh', minHeight: 480 }}>
        <p className="text-gray-400">{t('partners.mapEmpty')}</p>
      </div>
    )
  }

  return (
    <div className="relative w-full" style={{ height: '65vh', minHeight: 480 }}>
      <MapContainer
        center={AFRICA_CENTER}
        zoom={AFRICA_ZOOM}
        scrollWheelZoom={false}
        maxBounds={maxBounds}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='Map <a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
        />
        <FitToMarkers points={allPoints} />

        {partnerCountryFeatures && (
          <GeoJSON data={partnerCountryFeatures} style={() => COUNTRY_BASE_STYLE} onEachFeature={onEachCountry} />
        )}

        {pinned.map(({ item, coords, group }) => (
          <Marker key={`${group.key}-${item._id}`} position={coords} icon={logoIcon(item, group)}>
            <Popup>
              <p className="font-semibold text-sm text-gray-900">{item.name}</p>
              {item.country && <p className="text-xs text-gray-500">{item.country}</p>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute bottom-4 left-4 z-[1000] rounded-xl bg-white/95 backdrop-blur-sm shadow-lg px-4 py-3 flex flex-col gap-1.5">
        {GROUPS.map((group) => (
          <div key={group.key} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: group.color }} />
            <span className="text-xs font-medium text-gray-700">{t(group.labelKey)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
