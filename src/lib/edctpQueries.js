export const edctpSettingsQuery = `*[_id == "edctpSettings"][0]{
  programName,
  "logo": logo{ "url": asset->url },
  "logoLight": logoLight{ "url": asset->url },
  "edctpAcknowledgementLogo": edctpAcknowledgementLogo{ "url": asset->url },
  contactPhone,
  idiSocials[]{ platform, url }
}`

export const edctpHomePageQuery = `*[_type == "edctpHomePage"][0]{
  "heroImage": heroImage{ "url": asset->url },
  tagline,
  intro,
  stats[]{ value, label }
}`

export const edctpAboutPageQuery = `*[_type == "edctpAboutPage"][0]{
  subtitle,
  mission,
  goals
}`

export const edctpOpportunitiesPageQuery = `*[_type == "edctpOpportunitiesPage"][0]{
  subtitle,
  intro
}`

export const edctpNewsletterPageQuery = `*[_type == "edctpNewsletterPage"][0]{
  subtitle,
  intro
}`

export const edctpCallsQuery = `*[_type == "edctpCallForApplication"] | order(deadline desc){
  _id, title, status, description, eligibility, deadline, applicationLink,
  "callDocument": callDocument.asset->url
}`

export const edctpConsortiumPartnersQuery = `*[_type == "edctpConsortiumPartner"] | order(order asc){
  _id, name, group, "logo": logo{ "url": asset->url }, country, latitude, longitude, role, website, description
}`

export const edctpDataCollaboratorsQuery = `*[_type == "edctpDataCollaborator"] | order(order asc){
  _id, name, "logo": logo{ "url": asset->url }, country, latitude, longitude, role, website, description
}`

export const edctpTrainingSitesQuery = `*[_type == "edctpTrainingSite"]{
  _id, name, institution, country,
  "image": image{ "url": asset->url },
  description
}`

export const edctpPublicationsQuery = `*[_type == "edctpPublication"] | order(publishedAt desc){
  _id, title, authors, type, publishedAt, doi, url, abstract
}`

export const edctpProjectTypesQuery = `*[_type == "edctpProjectType"]{
  _id, title, description, icon, exampleDatasets
}`

export const edctpUpcomingEventsQuery = `*[_type == "edctpEvent" && startDateTime >= now()] | order(startDateTime asc){
  _id, title, description, startDateTime, endDateTime, location
}`

export const edctpNewsletterIssuesQuery = `*[_type == "edctpNewsletterIssue"] | order(publishedDate desc){
  _id, issueTitle, publishedDate,
  "coverImage": coverImage{ "url": asset->url },
  summary,
  "pdfFile": pdfFile.asset->url
}`

export const edctpBlogPostsQuery = `*[_type == "edctpBlogPost"] | order(publishedAt desc){
  _id, title, slug, excerpt,
  "featuredImage": featuredImage{ "url": asset->url },
  publishedAt
}`

export const edctpRecentBlogPostsQuery = `*[_type == "edctpBlogPost"] | order(publishedAt desc) [0...3]{
  _id, title, slug, excerpt,
  "featuredImage": featuredImage{ "url": asset->url },
  publishedAt
}`

export const edctpBlogPostBySlugQuery = `*[_type == "edctpBlogPost" && slug.current == $slug][0]{
  _id, title, slug, excerpt, body,
  "featuredImage": featuredImage{ "url": asset->url },
  publishedAt,
  "related": *[_type == "edctpBlogPost" && slug.current != $slug] | order(publishedAt desc) [0...3]{
    _id, title, slug, "featuredImage": featuredImage{ "url": asset->url }, publishedAt
  }
}`

export const edctpFellowsQuery = `*[_type == "edctpFellow"]{
  _id, name, slug,
  "photo": photo{ "url": asset->url },
  cohort, homeInstitution, country, researchFocus, projectTitle, bio
}`

export const edctpFellowBySlugQuery = `*[_type == "edctpFellow" && slug.current == $slug][0]{
  _id, name, slug,
  "photo": photo{ "url": asset->url },
  cohort, homeInstitution, country, researchFocus, projectTitle, bio
}`

export const edctpMentorsQuery = `*[_type == "edctpMentor"] | order(order asc, name asc){
  _id, name, slug,
  "photo": photo{ "url": asset->url },
  institution, country, expertise, bio
}`

export const edctpMentorBySlugQuery = `*[_type == "edctpMentor" && slug.current == $slug][0]{
  _id, name, slug,
  "photo": photo{ "url": asset->url },
  institution, country, expertise, bio
}`
