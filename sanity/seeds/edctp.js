/**
 * Seed data for the IDM Africa microsite.
 *
 * These are NOT auto-imported — Sanity document arrays can't take a single
 * `initialValue` for multiple distinct documents, so this file exists purely
 * as a reference for manually creating the documents below in Sanity Studio
 * (workspace: IDM Africa Microsite).
 *
 * All localized fields use the { en, fr } locale-object shape that the
 * schemas now expect.
 *
 * ⚠️ TRANSLATION NOTE: the French values below are machine-drafted because
 * IDM_Africa_EN_FR_Translations.xlsx was not available at build time.
 * Review them against the official Excel before entering in Studio.
 *
 * Grant No. 101249031 — IDM-Africa — HORIZON-JU-GH-EDCTP3-2025-02
 */

// Page singletons are pre-filled by schema initialValue on first open in Studio.
// `edctpHomePage` carries the hero (tagline, intro, heroImage) and stats;
// `edctpAboutPage` carries subtitle, mission, objectives, goals;
// `edctpOpportunitiesPage` / `edctpNewsletterPage` carry page subtitles/intros.
// `edctpSettings` now holds only site-wide identity and contact:
export const settingsSeed = {
  _type: 'edctpSettings',
  programName: 'IDM Africa',
  contactPhone: '0312 211 444',
}

// Create these as `edctpConsortiumPartner` documents
export const consortiumPartnerSeeds = [
  {
    _type: 'edctpConsortiumPartner',
    name: 'EDCTP Association',
    country: 'Netherlands',
    role: { en: 'Coordinator', fr: 'Coordinateur' },
    group: 'beneficiary',
    order: 1,
  },
  {
    _type: 'edctpConsortiumPartner',
    name: 'IDI — Infectious Diseases Institute',
    country: 'Uganda',
    role: { en: 'Beneficiary', fr: 'Bénéficiaire' },
    group: 'beneficiary',
    order: 2,
  },
  {
    _type: 'edctpConsortiumPartner',
    name: 'USTTB — Université des Sciences des Techniques et des Technologies de Bamako',
    country: 'Mali',
    role: { en: 'Beneficiary', fr: 'Bénéficiaire' },
    group: 'beneficiary',
    order: 3,
  },
  {
    _type: 'edctpConsortiumPartner',
    name: 'AIGHD — Amsterdam Institute for Global Health and Development',
    country: 'Netherlands',
    role: { en: 'Beneficiary', fr: 'Bénéficiaire' },
    group: 'beneficiary',
    order: 4,
  },
  {
    _type: 'edctpConsortiumPartner',
    name: 'ACE Uganda — African Centre of Excellence in Bioinformatics, Makerere University',
    country: 'Uganda',
    role: { en: 'Partner Site', fr: 'Site partenaire' },
    group: 'partnerSite',
    order: 5,
  },
  {
    _type: 'edctpConsortiumPartner',
    name: 'ACE Mali',
    country: 'Mali',
    role: { en: 'Partner Site', fr: 'Site partenaire' },
    group: 'partnerSite',
    order: 6,
  },
]

// Create these as `edctpDataCollaborator` documents
export const dataCollaboratorSeeds = [
  {
    _type: 'edctpDataCollaborator',
    name: 'Africa CDC',
    role: { en: 'Collaborator', fr: 'Collaborateur' },
    order: 1,
  },
]
