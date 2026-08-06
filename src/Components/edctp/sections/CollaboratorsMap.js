'use client'
import { useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useI18n } from '@/lib/idmI18n'
import { getCountryCoords } from '@/lib/edctpCountryCoords'

const AFRICA_CENTER = [1, 20]
const AFRICA_ZOOM = 3

const GROUPS = [
  { key: 'beneficiaries', color: '#003366', labelKey: 'partners.beneficiaries' },
  { key: 'collaborators', color: '#a71c20', labelKey: 'partners.collaborators' },
  { key: 'sites', color: '#00AEEF', labelKey: 'partners.partnerSites' },
]

function dotIcon(color) {
  return L.divIcon({
    className: '',
    html: `<span style="display:block;width:14px;height:14px;border-radius:9999px;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -8],
  })
}

function resolveCoords(item) {
  if (typeof item.latitude === 'number' && typeof item.longitude === 'number') {
    return [item.latitude, item.longitude]
  }
  return getCountryCoords(item.country)
}

function FitToMarkers({ points }) {
  const map = useMap()
  useMemo(() => {
    if (points.length === 0) return
    if (points.length === 1) {
      map.setView(points[0], 5)
      return
    }
    map.fitBounds(points, { padding: [32, 32], maxZoom: 6 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points.length])
  return null
}

export default function CollaboratorsMap({ beneficiaries = [], collaborators = [], sites = [] }) {
  const { t } = useI18n()

  const pinned = useMemo(() => {
    const byGroup = { beneficiaries, collaborators, sites }
    return GROUPS.flatMap((group) =>
      (byGroup[group.key] || [])
        .map((item) => ({ item, coords: resolveCoords(item), group }))
        .filter((entry) => entry.coords)
    )
  }, [beneficiaries, collaborators, sites])

  const allPoints = pinned.map((p) => p.coords)

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
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='Map <a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
        />
        <FitToMarkers points={allPoints} />
        {pinned.map(({ item, coords, group }) => (
          <Marker key={`${group.key}-${item._id}`} position={coords} icon={dotIcon(group.color)}>
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
