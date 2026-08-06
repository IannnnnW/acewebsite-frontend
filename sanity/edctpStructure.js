// Structure for the IDM Africa workspace: page singletons pinned at the top,
// content collections below, site settings at the bottom.
const PAGE_SINGLETONS = [
  { type: 'edctpHomePage', title: 'Home Page' },
  { type: 'edctpAboutPage', title: 'About Page' },
  { type: 'edctpOpportunitiesPage', title: 'Opportunities Page' },
  { type: 'edctpNewsletterPage', title: 'Newsletter Page' },
]

const SETTINGS_SINGLETON = { type: 'edctpSettings', title: 'Site Settings' }

const SINGLETON_TYPES = [...PAGE_SINGLETONS, SETTINGS_SINGLETON].map((s) => s.type)

export const edctpStructure = (S) =>
  S.list()
    .title('IDM Africa')
    .items([
      ...PAGE_SINGLETONS.map((s) =>
        S.listItem()
          .title(s.title)
          .id(s.type)
          .child(S.document().schemaType(s.type).documentId(s.type))
      ),
      S.divider(),
      ...S.documentTypeListItems().filter((listItem) => !SINGLETON_TYPES.includes(listItem.getId())),
      S.divider(),
      S.listItem()
        .title(SETTINGS_SINGLETON.title)
        .id(SETTINGS_SINGLETON.type)
        .child(S.document().schemaType(SETTINGS_SINGLETON.type).documentId(SETTINGS_SINGLETON.type)),
    ])
