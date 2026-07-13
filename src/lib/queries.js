export const settingsQuery = `*[_type == "settings"][0]`

export const allBlogPostsQuery = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "featuredImage": images[0] { "url": asset->url },
    "author": author->{ name, "image": image }
  }
`

export const blogPostBySlugQuery = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    images[] { "url": asset->url },
    "author": author->{ name, role, bio, "image": image }
  }
`

export const allBlogSlugsQuery = `*[_type == "blogPost"]{ "slug": slug.current }`

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  title,
  socials,
  contactEmail,
  address,
  heroTagline,
  heroInstitutionLine
}`

export const heroSlidesQuery = `
  *[_type == "heroSlide" && isActive == true] | order(order asc) {
    _id,
    title,
    subtitle,
    description,
    category,
    mediaType,
    image,
    "videoUrl": video.asset->url,
    "posterImage": posterImage{ ..., "url": asset->url },
    ctaText,
    ctaLink,
    order
  }
`

export const teamPageSettingsQuery = `*[_type == "teamPageSettings"][0]{
  "heroImage": heroImage{ ..., "url": asset->url }
}`

export const aboutPageSettingsQuery = `*[_type == "aboutPageSettings"][0]{
  "heroImages": heroImages[]{ ..., "url": asset->url, alt, caption }
}`

export const eventsPageSettingsQuery = `*[_type == "eventsPageSettings"][0]{
  "heroImages": heroImages[]{ ..., "url": asset->url, alt, caption }
}`
export const allStaffQuery = `*[_type == "person"] | order(order asc, name asc) {
  _id,
  name,
  slug,
  role,
  staffCategory,
  bio,
  image,
  email,
  order
}`

export const personBySlugQuery = `
  *[_type == "person" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    role,
    department,
    bio,
    researchInterests,
    image,
    email,
    linkedin,
    twitter,
    googleScholarUrl
  }
`

export const featuredPostsQuery = `
  *[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    publishedAt
  }
`

export const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    publishedAt
  }
`

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    featuredImage,
    category,
    publishedAt
  }
`

export const allProjectsQuery = `
  *[_type == "project"] | order(priority asc, _createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    thematicAreas,
    priority,
    "featuredImage": featuredImage { ..., "url": asset->url },
    status
  }
`

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    abstract,
    aimsAndObjectives,
    keyOutcomes,
    relevanceToSector,
    category,
    thematicAreas,
    "featuredImage": featuredImage { ..., "url": asset->url },
    status,
    startDate,
    endDate,
    "team": team[]->{ 
      _id, 
      name, 
      role, 
      slug,
      "image": image { "url": asset->url }
    },
    "funders": funders[]->{ 
      _id, 
      name, 
      website, 
      description,
      "logo": logo { "url": asset->url, alt }
    },
    "pi": pi->{ name, role, slug, "image": image { "url": asset->url } },
    "coPrincipalInvestigators": coPrincipalInvestigators[]->{ _id, name, role, slug, "image": image { "url": asset->url } },
    "fellows": fellows[]->{ _id, name, role, slug, "image": image { "url": asset->url } }
  }
`

export const allFacilitiesQuery = `
  *[_type == "facility"] | order(order asc, name asc) {
    _id,
    name,
    slug,
    type,
    summary,
    order,
    "heroImage": heroImage { ..., "url": asset->url, alt }
  }
`

export const facilityBySlugQuery = `
  *[_type == "facility" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    type,
    summary,
    body,
    specs,
    potentialUses,
    "heroImage": heroImage { ..., "url": asset->url, alt },
    "gallery": gallery[] { ..., "url": asset->url, caption, alt }
  }
`

export const allPartnersQuery = `
  *[_type == "partner"] | order(name asc) {
    _id,
    name,
    slug,
    type,
    description,
    url,
    "logo": logo { ..., "url": asset->url, alt }
  }
`

export const allFundersQuery = `
  *[_type == "funder"] | order(order asc) {
    _id,
    name,
    website,
    description,
    "logo": logo { "url": asset->url, alt }
  }
`

export const allPublicationsQuery = `
  *[_type == "publication"] | order(publishedAt desc, date desc) {
    _id,
    title,
    authors,
    journal,
    publishedAt,
    "year": coalesce(publishedAt, date)[0..3],
    date,
    doi,
    url,
    abstract,
    type,
    publisherName,
    thematicAreas,
    featured
  }
`

export const allProgramsQuery = `
  *[_type == "academicProgram"] | order(level) {
    _id,
    slug,
    type,
    description,
    duration,
  }
`

export const programBySlugQuery = `
  *[_type == "academicProgram" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    type,
    description,
    eligibility,
    duration,
    requirements,
    researchActivities[] {
      _key,
      title,
      description,
      photos[] {
        ...,
        "url": asset->url,
        caption
      }
    }
  }
`

// Query for all upcoming events
export const upcomingEventsQuery = `
  *[_type == "event" && isPast == false && date >= now()] | order(date asc) {
    _id,
    title,
    description,
    date,
    category,
    location,
    "image": image.asset->url,
    isPast,
    speakers,
    topics,
    capacity,
    registrationLink,
    "detailsLink": "/events/" + slug.current
  }
`

// Query for all past events
export const pastEventsQuery = `
  *[_type == "event" && (isPast == true || date < now())] | order(date desc) {
    _id,
    title,
    description,
    date,
    category,
    location,
    "image": image.asset->url,
    isPast,
    speakers,
    topics,
    "detailsLink": "/events/" + slug.current
  }
`

// Query for event highlights
export const eventHighlightsQuery = `
  *[_type == "eventHighlight"] | order(order asc, date desc) {
    _id,
    title,
    description,
    date,
    category,
    badge,
    "image": image.asset->url,
    stats,
    keyPoints
  }
`

// Query for a single event by slug
export const eventBySlugQuery = `
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    description,
    date,
    category,
    location,
    "image": image.asset->url,
    isPast,
    speakers,
    topics,
    capacity,
    registrationLink,
    "agendaFile": agendaFile.asset->url,
    "conceptNoteFile": conceptNoteFile.asset->url,
    outputs[] { _key, title, type, url, description },
    "relatedBlogs": relatedBlogs[]->{
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      "featuredImage": images[0] { "url": asset->url }
    },
    tweetUrls,
    galleryTitle,
    gallery[] {
      _key,
      caption,
      alt,
      credit,
      "url": image.asset->url,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
      "blurDataURL": image.asset->metadata.lqip
    },
    "detailsLink": "/events/" + slug.current
  }
`

// Latest social media posts for the homepage running feed
export const socialPostsQuery = `
  *[_type == "socialPost"] | order(postDate desc) [0...4] {
    _id,
    platform,
    url,
    caption,
    postDate
  }
`

// Latest blog stories for the homepage running feed
export const recentBlogPostsQuery = `
  *[_type == "blogPost"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "featuredImage": images[0] { "url": asset->url }
  }
`

// Query for featured events
export const featuredEventsQuery = `
  *[_type == "event" && featured == true && isPast == false] | order(date asc) [0...3] {
    _id,
    title,
    description,
    date,
    category,
    location,
    "image": image.asset->url,
    speakers,
    topics,
    capacity,
    registrationLink,
    "detailsLink": "/events/" + slug.current
  }
`

// Query for events by category
export const eventsByCategoryQuery = `
  *[_type == "event" && category == $category] | order(date desc) {
    _id,
    title,
    description,
    date,
    category,
    location,
    "image": image.asset->url,
    isPast,
    speakers,
    topics,
    capacity,
    registrationLink,
    "detailsLink": "/events/" + slug.current
  }
`

// Query for all events (for filtering on client-side)
export const allEventsQuery = `
  *[_type == "event"] | order(date desc) {
    _id,
    title,
    description,
    date,
    category,
    location,
    "image": image.asset->url,
    isPast,
    speakers,
    topics,
    capacity,
    registrationLink,
    "detailsLink": "/events/" + slug.current
  }
`