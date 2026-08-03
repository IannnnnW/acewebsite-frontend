// Mirrors the staffCategory options list in schemaTypes/person.ts.
// Shared by /team (grouped listing) and /team/[slug] (category label lookup)
// so the two stay in sync.
export const STAFF_CATEGORIES = [
  { value: 'admin', label: 'Administration' },
  { value: 'bioinformatics_researchers', label: 'Bioinformatics Researchers' },
  { value: 'ai', label: 'AI Researchers' },
  { value: 'postdoc_fellows', label: 'PostDoc Fellows' },
  { value: 'phd_fellows', label: 'PhD Fellows' },
  { value: 'msc_fellows', label: 'MSc Fellows' },
  { value: 'it', label: 'HPC Engineering' },
  { value: 'software_development', label: 'Software Development' },
  { value: 'interns', label: 'Interns' },
  { value: 'alumni', label: 'Alumni' },
]

export function getStaffCategoryLabel(value) {
  const found = STAFF_CATEGORIES.find((c) => c.value === value)
  return found ? found.label : value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
