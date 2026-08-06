/**
 * Extracts the correct language version from a Sanity locale field.
 * Falls back to English if the requested locale has no content.
 * Falls back to the raw value if the field was not yet migrated to a locale object.
 */
export function loc(field, locale) {
  if (!field) return ''
  if (typeof field === 'string') return field // legacy non-locale field
  return field[locale] || field.en || ''
}

export function locBlock(field, locale) {
  if (!field) return []
  if (Array.isArray(field)) return field // legacy
  return field[locale] || field.en || []
}

export function locArray(field, locale) {
  if (!field) return []
  if (Array.isArray(field)) return field // legacy
  return field[locale] || field.en || []
}
