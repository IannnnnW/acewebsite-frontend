// Approximate country centroids + continent, used as a map-pin fallback for
// edctp-idm collaborator/site/beneficiary records that don't have explicit
// latitude/longitude set in Sanity, and to derive the "Countries" /
// "Continents" stat counts. Covers African countries plus the non-African
// countries EDCTP consortia commonly partner with.
//
// The 4th element is the exact `properties.name` string used in
// public/geo/world-countries.geo.json, so the collaborators map can match a
// Sanity `country` value to its country-boundary polygon for the hover
// highlight. `null` means that country isn't present in that (simplified,
// small-island-dropping) dataset, so it gets a pin but no hover shape.
const AFRICA = 'Africa'
const EUROPE = 'Europe'
const NORTH_AMERICA = 'North America'

const COUNTRY_DATA = {
  algeria: [28.0339, 1.6596, AFRICA, 'Algeria'],
  angola: [-11.2027, 17.8739, AFRICA, 'Angola'],
  benin: [9.3077, 2.3158, AFRICA, 'Benin'],
  botswana: [-22.3285, 24.6849, AFRICA, 'Botswana'],
  'burkina faso': [12.2383, -1.5616, AFRICA, 'Burkina Faso'],
  burundi: [-3.3731, 29.9189, AFRICA, 'Burundi'],
  cameroon: [7.3697, 12.3547, AFRICA, 'Cameroon'],
  'cape verde': [16.5388, -23.0418, AFRICA, null],
  'central african republic': [6.6111, 20.9394, AFRICA, 'Central African Republic'],
  chad: [15.4542, 18.7322, AFRICA, 'Chad'],
  comoros: [-11.6455, 43.3333, AFRICA, null],
  'congo, dr': [-4.0383, 21.7587, AFRICA, 'Democratic Republic of the Congo'],
  'democratic republic of the congo': [-4.0383, 21.7587, AFRICA, 'Democratic Republic of the Congo'],
  'dr congo': [-4.0383, 21.7587, AFRICA, 'Democratic Republic of the Congo'],
  drc: [-4.0383, 21.7587, AFRICA, 'Democratic Republic of the Congo'],
  congo: [-0.228, 15.8277, AFRICA, 'Republic of the Congo'],
  'republic of congo': [-0.228, 15.8277, AFRICA, 'Republic of the Congo'],
  djibouti: [11.8251, 42.5903, AFRICA, 'Djibouti'],
  egypt: [26.8206, 30.8025, AFRICA, 'Egypt'],
  'equatorial guinea': [1.6508, 10.2679, AFRICA, 'Equatorial Guinea'],
  eritrea: [15.1794, 39.7823, AFRICA, 'Eritrea'],
  eswatini: [-26.5225, 31.4659, AFRICA, 'Swaziland'],
  swaziland: [-26.5225, 31.4659, AFRICA, 'Swaziland'],
  ethiopia: [9.145, 40.4897, AFRICA, 'Ethiopia'],
  gabon: [-0.8037, 11.6094, AFRICA, 'Gabon'],
  gambia: [13.4432, -15.3101, AFRICA, 'Gambia'],
  ghana: [7.9465, -1.0232, AFRICA, 'Ghana'],
  guinea: [9.9456, -9.6966, AFRICA, 'Guinea'],
  'guinea-bissau': [11.8037, -15.1804, AFRICA, 'Guinea Bissau'],
  'ivory coast': [7.539989, -5.54708, AFRICA, 'Ivory Coast'],
  "cote d'ivoire": [7.539989, -5.54708, AFRICA, 'Ivory Coast'],
  "côte d'ivoire": [7.539989, -5.54708, AFRICA, 'Ivory Coast'],
  kenya: [-0.0236, 37.9062, AFRICA, 'Kenya'],
  lesotho: [-29.61, 28.2336, AFRICA, 'Lesotho'],
  liberia: [6.4281, -9.4295, AFRICA, 'Liberia'],
  libya: [26.3351, 17.2283, AFRICA, 'Libya'],
  madagascar: [-18.7669, 46.8691, AFRICA, 'Madagascar'],
  malawi: [-13.2543, 34.3015, AFRICA, 'Malawi'],
  mali: [17.5707, -3.9962, AFRICA, 'Mali'],
  mauritania: [21.0079, -10.9408, AFRICA, 'Mauritania'],
  mauritius: [-20.3484, 57.5522, AFRICA, null],
  morocco: [31.7917, -7.0926, AFRICA, 'Morocco'],
  mozambique: [-18.6657, 35.5296, AFRICA, 'Mozambique'],
  namibia: [-22.9576, 18.4904, AFRICA, 'Namibia'],
  niger: [17.6078, 8.0817, AFRICA, 'Niger'],
  nigeria: [9.082, 8.6753, AFRICA, 'Nigeria'],
  rwanda: [-1.9403, 29.8739, AFRICA, 'Rwanda'],
  'sao tome and principe': [0.1864, 6.6131, AFRICA, null],
  senegal: [14.4974, -14.4524, AFRICA, 'Senegal'],
  seychelles: [-4.6796, 55.492, AFRICA, null],
  'sierra leone': [8.4606, -11.7799, AFRICA, 'Sierra Leone'],
  somalia: [5.1521, 46.1996, AFRICA, 'Somalia'],
  'south africa': [-30.5595, 22.9375, AFRICA, 'South Africa'],
  'south sudan': [6.877, 31.307, AFRICA, 'South Sudan'],
  sudan: [12.8628, 30.2176, AFRICA, 'Sudan'],
  tanzania: [-6.369, 34.8888, AFRICA, 'United Republic of Tanzania'],
  togo: [8.6195, 0.8248, AFRICA, 'Togo'],
  tunisia: [33.8869, 9.5375, AFRICA, 'Tunisia'],
  uganda: [1.3733, 32.2903, AFRICA, 'Uganda'],
  zambia: [-13.1339, 27.8493, AFRICA, 'Zambia'],
  zimbabwe: [-19.0154, 29.1549, AFRICA, 'Zimbabwe'],
  // Non-African EDCTP consortium partner countries
  belgium: [50.5039, 4.4699, EUROPE, 'Belgium'],
  france: [46.6034, 1.8883, EUROPE, 'France'],
  germany: [51.1657, 10.4515, EUROPE, 'Germany'],
  ireland: [53.4129, -8.2439, EUROPE, 'Ireland'],
  italy: [41.8719, 12.5674, EUROPE, 'Italy'],
  netherlands: [52.1326, 5.2913, EUROPE, 'Netherlands'],
  norway: [60.472, 8.4689, EUROPE, 'Norway'],
  portugal: [39.3999, -8.2245, EUROPE, 'Portugal'],
  spain: [40.4637, -3.7492, EUROPE, 'Spain'],
  sweden: [60.1282, 18.6435, EUROPE, 'Sweden'],
  switzerland: [46.8182, 8.2275, EUROPE, 'Switzerland'],
  'united kingdom': [55.3781, -3.436, EUROPE, 'United Kingdom'],
  uk: [55.3781, -3.436, EUROPE, 'United Kingdom'],
  'united states': [37.0902, -95.7129, NORTH_AMERICA, 'United States of America'],
  usa: [37.0902, -95.7129, NORTH_AMERICA, 'United States of America'],
}

export function getCountryCoords(countryName) {
  if (!countryName) return null
  const entry = COUNTRY_DATA[countryName.trim().toLowerCase()]
  return entry ? [entry[0], entry[1]] : null
}

export function getContinent(countryName) {
  if (!countryName) return null
  const entry = COUNTRY_DATA[countryName.trim().toLowerCase()]
  return entry ? entry[2] : null
}

export function getGeoName(countryName) {
  if (!countryName) return null
  const entry = COUNTRY_DATA[countryName.trim().toLowerCase()]
  return entry ? entry[3] : null
}

// Rough continent bounding boxes ([[south, west], [north, east]]), used to
// cap the collaborators map's pannable/zoomable area to only the continents
// that actually have at least one collaborator — not arbitrary padding
// around the data points, which can bleed into a neighboring continent.
export const CONTINENT_BOUNDS = {
  Africa: [[-35, -18], [38, 52]],
  Europe: [[34, -25], [71, 45]],
  'North America': [[5, -170], [75, -50]],
}
