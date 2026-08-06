// Approximate country centroids + continent, used as a map-pin fallback for
// edctp-idm collaborator/site/beneficiary records that don't have explicit
// latitude/longitude set in Sanity, and to derive the "Countries" /
// "Continents" stat counts. Covers African countries plus the non-African
// countries EDCTP consortia commonly partner with.
const AFRICA = 'Africa'
const EUROPE = 'Europe'
const NORTH_AMERICA = 'North America'

const COUNTRY_DATA = {
  algeria: [28.0339, 1.6596, AFRICA],
  angola: [-11.2027, 17.8739, AFRICA],
  benin: [9.3077, 2.3158, AFRICA],
  botswana: [-22.3285, 24.6849, AFRICA],
  'burkina faso': [12.2383, -1.5616, AFRICA],
  burundi: [-3.3731, 29.9189, AFRICA],
  cameroon: [7.3697, 12.3547, AFRICA],
  'cape verde': [16.5388, -23.0418, AFRICA],
  'central african republic': [6.6111, 20.9394, AFRICA],
  chad: [15.4542, 18.7322, AFRICA],
  comoros: [-11.6455, 43.3333, AFRICA],
  'congo, dr': [-4.0383, 21.7587, AFRICA],
  'democratic republic of the congo': [-4.0383, 21.7587, AFRICA],
  'dr congo': [-4.0383, 21.7587, AFRICA],
  drc: [-4.0383, 21.7587, AFRICA],
  congo: [-0.228, 15.8277, AFRICA],
  'republic of congo': [-0.228, 15.8277, AFRICA],
  djibouti: [11.8251, 42.5903, AFRICA],
  egypt: [26.8206, 30.8025, AFRICA],
  'equatorial guinea': [1.6508, 10.2679, AFRICA],
  eritrea: [15.1794, 39.7823, AFRICA],
  eswatini: [-26.5225, 31.4659, AFRICA],
  swaziland: [-26.5225, 31.4659, AFRICA],
  ethiopia: [9.145, 40.4897, AFRICA],
  gabon: [-0.8037, 11.6094, AFRICA],
  gambia: [13.4432, -15.3101, AFRICA],
  ghana: [7.9465, -1.0232, AFRICA],
  guinea: [9.9456, -9.6966, AFRICA],
  'guinea-bissau': [11.8037, -15.1804, AFRICA],
  'ivory coast': [7.539989, -5.54708, AFRICA],
  "cote d'ivoire": [7.539989, -5.54708, AFRICA],
  "côte d'ivoire": [7.539989, -5.54708, AFRICA],
  kenya: [-0.0236, 37.9062, AFRICA],
  lesotho: [-29.61, 28.2336, AFRICA],
  liberia: [6.4281, -9.4295, AFRICA],
  libya: [26.3351, 17.2283, AFRICA],
  madagascar: [-18.7669, 46.8691, AFRICA],
  malawi: [-13.2543, 34.3015, AFRICA],
  mali: [17.5707, -3.9962, AFRICA],
  mauritania: [21.0079, -10.9408, AFRICA],
  mauritius: [-20.3484, 57.5522, AFRICA],
  morocco: [31.7917, -7.0926, AFRICA],
  mozambique: [-18.6657, 35.5296, AFRICA],
  namibia: [-22.9576, 18.4904, AFRICA],
  niger: [17.6078, 8.0817, AFRICA],
  nigeria: [9.082, 8.6753, AFRICA],
  rwanda: [-1.9403, 29.8739, AFRICA],
  'sao tome and principe': [0.1864, 6.6131, AFRICA],
  senegal: [14.4974, -14.4524, AFRICA],
  seychelles: [-4.6796, 55.492, AFRICA],
  'sierra leone': [8.4606, -11.7799, AFRICA],
  somalia: [5.1521, 46.1996, AFRICA],
  'south africa': [-30.5595, 22.9375, AFRICA],
  'south sudan': [6.877, 31.307, AFRICA],
  sudan: [12.8628, 30.2176, AFRICA],
  tanzania: [-6.369, 34.8888, AFRICA],
  togo: [8.6195, 0.8248, AFRICA],
  tunisia: [33.8869, 9.5375, AFRICA],
  uganda: [1.3733, 32.2903, AFRICA],
  zambia: [-13.1339, 27.8493, AFRICA],
  zimbabwe: [-19.0154, 29.1549, AFRICA],
  // Non-African EDCTP consortium partner countries
  belgium: [50.5039, 4.4699, EUROPE],
  france: [46.6034, 1.8883, EUROPE],
  germany: [51.1657, 10.4515, EUROPE],
  ireland: [53.4129, -8.2439, EUROPE],
  italy: [41.8719, 12.5674, EUROPE],
  netherlands: [52.1326, 5.2913, EUROPE],
  norway: [60.472, 8.4689, EUROPE],
  portugal: [39.3999, -8.2245, EUROPE],
  spain: [40.4637, -3.7492, EUROPE],
  sweden: [60.1282, 18.6435, EUROPE],
  switzerland: [46.8182, 8.2275, EUROPE],
  'united kingdom': [55.3781, -3.436, EUROPE],
  uk: [55.3781, -3.436, EUROPE],
  'united states': [37.0902, -95.7129, NORTH_AMERICA],
  usa: [37.0902, -95.7129, NORTH_AMERICA],
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
