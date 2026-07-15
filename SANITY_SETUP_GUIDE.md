# ACE Website - Sanity CMS Setup Guide

This guide explains the complete Sanity CMS setup for the ACE Uganda website, including schemas, fallback data, and implementation instructions.

## Table of Contents

1. [Overview](#overview)
2. [Sanity Schemas](#sanity-schemas)
3. [Fallback Data System](#fallback-data-system)
4. [Getting Started](#getting-started)
5. [Content Structure](#content-structure)
6. [Implementation Guide](#implementation-guide)
7. [Best Practices](#best-practices)

---

## Overview

The ACE website uses Sanity CMS as a headless content management system. This setup includes:

- **Page Schemas**: Separate schemas for Home, About, HPC, and Contact pages
- **Collection Schemas**: Schemas for reusable content (Team, Projects, Events, etc.)
- **Fallback Data**: JSON files with dummy data that display when Sanity API is unavailable
- **Utility Functions**: Helper functions to seamlessly switch between Sanity and fallback data

---

## Sanity Schemas

All schemas are located in `sanity/schemaTypes/` directory.

### Page Schemas

These schemas define the structure for individual pages:

#### 1. Home Page (`homePage.js`)
**Document Type:** `homePage`

**Sections:**
- Hero Section (heading, subheading, CTA)
- Mission Section (mission & vision statements)
- Focus Areas Section (array of focus areas with descriptions)
- Statistics Section (array of stats)
- Partnership Section (partner categories and partners)

#### 2. About Page (`aboutPage.js`)
**Document Type:** `aboutPage`

**Sections:**
- Introduction Section
- Mission & Vision
- Core Values (array)
- Services Section (array of services)
- Education & Training Section
- Timeline Section (array of milestones)
- Partners Section (categorized partners)

#### 3. HPC Page (`hpcPage.js`)
**Document Type:** `hpcPage`

**Sections:**
- Hero Section
- Cluster Specifications (array)
- Hardware Details (array of components)
- Research Capabilities (array)
- Software & Tools (categorized)
- Access Information
- Use Cases/Success Stories (array)

#### 4. Contact Page (`contactPage.js`)
**Document Type:** `contactPage`

**Sections:**
- Hero Section
- Contact Information (emails, phones)
- Physical Address
- Office Hours
- Social Media Links
- Map Information
- Departments/Offices (array)
- Contact Form Settings
- Additional Information

### Collection Schemas

These schemas define reusable content types:

#### 1. Team Members (`person.js`)
**Document Type:** `person`

**Key Fields:**
- Name, slug, role, department
- Biography, email, phone, office location
- Specializations (array)
- Education (array of degrees)
- Publications (array)
- Social links (LinkedIn, Twitter, Google Scholar, etc.)
- Display order, isActive flag

#### 2. Research Projects (`project.js`)
**Document Type:** `project`

**Key Fields:**
- Title, slug, excerpt, description
- Category, status (active/completed/on-hold)
- Start date, end date
- Team members (references to person documents)
- Objectives, methodology, outcomes
- Publications (references)
- Funding information
- Partners, tags
- Featured flag

#### 3. Academic Programs (`academicProgram.js`)
**Document Type:** `academicProgram`

**Key Fields:**
- Title, slug, type (MSc/PhD/short-course/workshop)
- Level (undergraduate/graduate/postgraduate)
- Description, overview, duration
- Eligibility, requirements
- Curriculum (array of modules)
- Learning outcomes
- Fees information
- Application details
- Mode of delivery
- Instructors (references)
- isActive, featured flags

#### 4. Events (`event.js`)
**Document Type:** `event`

**Key Fields:**
- Title, slug, description, excerpt
- Date, end date
- Category (workshop/seminar/conference/training)
- Location (venue, address, virtual/physical)
- Speakers (array)
- Topics, agenda
- Capacity, registration details
- Fee information
- Target audience, prerequisites
- isPast, featured flags

#### 5. Publications (`publication.js`)
**Document Type:** `publication`

**Key Fields:**
- Title, authors (array), journal
- Year, volume, issue, pages
- DOI, URL
- Abstract
- Category (journal/conference/book-chapter/report)
- Publication type (peer-reviewed/non-peer-reviewed)
- Keywords, research area
- Related project (reference)
- Featured, open access flags
- PDF URL

#### 6. Hero Slides (`heroSlide.js`)
**Document Type:** `heroSlide`

**Key Fields:**
- Title, subtitle, description
- Category
- CTA text and link
- Display order
- isActive flag

#### 7. Event Highlights (`eventHighlight.js`)
**Document Type:** `eventHighlight`

**Key Fields:**
- Title, description, date
- Category, badge text
- Statistics (array)
- Key points (array)
- Related event (reference)
- Display order, isActive flag

#### 8. Site Settings (`settings.js`)
**Document Type:** `settings`

**Key Fields:**
- Site title, description
- Homepage statistics (array)
- Contact email, phone, address
- Social media links
- Announcement banner settings

---

## Fallback Data System

When the Sanity API is unavailable, the website uses static JSON files as fallback data. This ensures the site remains functional even during API downtime.

### Fallback Files Location

All fallback data files are located in `src/data/`:

- `fallback-home.json` - Home page content
- `fallback-about.json` - About page content
- `fallback-hpc.json` - HPC page content
- `fallback-contact.json` - Contact page content
- `fallback-programs.json` - Academic programs
- `fallback-team.json` - Team members
- `fallback-projects.json` - Research projects
- `fallback-events.json` - Events
- `fallback-publications.json` - Publications

### Fallback Utility Functions

The `src/lib/fallback.js` module provides utility functions for working with fallback data:

```javascript
import { getFallbackData, fetchWithFallback } from '@/lib/fallback'

// Get fallback data directly
const homeData = getFallbackData('home')

// Fetch with automatic fallback
const data = await fetchWithFallback(
  () => client.fetch(query),
  'home'
)
```

**Available Functions:**

- `getFallbackData(type)` - Get fallback data by type
- `getFallbackItemBySlug(collectionType, slug)` - Get single item by slug
- `filterFallbackCollection(collectionType, property, value)` - Filter collection
- `getFeaturedFallbackItems(collectionType)` - Get featured items
- `fetchWithFallback(sanityFetchFn, fallbackType, options)` - Fetch with automatic fallback
- `isSanityAvailable(client)` - Check if Sanity API is available
- `getAvailableFallbackTypes()` - List available fallback types

---

## Getting Started

### 1. Start Sanity Studio

Navigate to the Sanity directory and start the studio:

```bash
cd sanity
npm install
npm run dev
```

The Sanity Studio will be available at `http://localhost:3333`

### 2. Create Content Documents

In Sanity Studio, create one document for each page type:

1. **Site Settings** - Create one `settings` document
2. **Home Page** - Create one `homePage` document
3. **About Page** - Create one `aboutPage` document
4. **HPC Page** - Create one `hpcPage` document
5. **Contact Page** - Create one `contactPage` document

### 3. Add Collection Content

Create multiple documents for collection types:

- Add team members (`person` documents)
- Add research projects (`project` documents)
- Add academic programs (`academicProgram` documents)
- Add events (`event` documents)
- Add publications (`publication` documents)
- Add hero slides (`heroSlide` documents) for homepage carousel

### 4. Deploy Sanity Studio (Optional)

To deploy your Sanity Studio for remote access:

```bash
cd sanity
sanity deploy
```

---

## Content Structure

### Single Document Pages

These pages should have **exactly one** document in Sanity:

- Site Settings
- Home Page
- About Page
- HPC Page
- Contact Page

**Example query for single documents:**

```javascript
const homeData = await client.fetch(`*[_type == "homePage"][0]`)
```

### Collection Pages

These content types can have **multiple documents**:

- Team Members (`person`)
- Research Projects (`project`)
- Academic Programs (`academicProgram`)
- Events (`event`)
- Publications (`publication`)
- Hero Slides (`heroSlide`)
- Event Highlights (`eventHighlight`)

**Example query for collections:**

```javascript
// Get all programs
const programs = await client.fetch(`*[_type == "academicProgram"]`)

// Get single program by slug
const program = await client.fetch(
  `*[_type == "academicProgram" && slug.current == $slug][0]`,
  { slug: 'msc-bioinformatics' }
)

// Get featured programs
const featuredPrograms = await client.fetch(
  `*[_type == "academicProgram" && featured == true]`
)
```

---

## Implementation Guide

### Step 1: Update Your Page Components

Modify your page components to fetch from Sanity with fallback:

**Example: Home Page**

```javascript
// src/app/page.js
import { client } from '@/lib/sanity'
import { fetchWithFallback } from '@/lib/fallback'

export default async function HomePage() {
  // Fetch home page data with automatic fallback
  const homeData = await fetchWithFallback(
    () => client.fetch(`*[_type == "homePage"][0]`),
    'home'
  )

  // Use the data (from Sanity or fallback)
  return (
    <div>
      <h1>{homeData.heroSection.heading}</h1>
      <p>{homeData.heroSection.subheading}</p>
      {/* Rest of your component */}
    </div>
  )
}
```

**Example: Programs Page**

```javascript
// src/app/training-programs/page.js
import { client } from '@/lib/sanity'
import { fetchWithFallback } from '@/lib/fallback'

export default async function ProgramsPage() {
  const programs = await fetchWithFallback(
    () => client.fetch(`*[_type == "academicProgram"] | order(type asc)`),
    'programs'
  )

  return (
    <div>
      {programs.map(program => (
        <ProgramCard key={program.slug} program={program} />
      ))}
    </div>
  )
}
```

**Example: Dynamic Program Page**

```javascript
// src/app/training-programs/[slug]/page.js
import { client } from '@/lib/sanity'
import { getFallbackItemBySlug } from '@/lib/fallback'

export default async function ProgramPage({ params }) {
  const { slug } = params

  let program
  try {
    program = await client.fetch(
      `*[_type == "academicProgram" && slug.current == $slug][0]`,
      { slug }
    )

    if (!program) {
      // If Sanity returns nothing, use fallback
      program = getFallbackItemBySlug('programs', slug)
    }
  } catch (error) {
    console.error('Error fetching program:', error)
    program = getFallbackItemBySlug('programs', slug)
  }

  if (!program) {
    return <div>Program not found</div>
  }

  return (
    <div>
      <h1>{program.title}</h1>
      <p>{program.description}</p>
      {/* Rest of your component */}
    </div>
  )
}

// Generate static params from both Sanity and fallback
export async function generateStaticParams() {
  try {
    const programs = await client.fetch(
      `*[_type == "academicProgram"]{ "slug": slug.current }`
    )
    return programs.map(p => ({ slug: p.slug }))
  } catch (error) {
    // Use fallback data for static generation
    const { getFallbackData } = await import('@/lib/fallback')
    const programs = getFallbackData('programs')
    return programs.map(p => ({ slug: p.slug }))
  }
}
```

### Step 2: Update Existing Components

If you have existing components with hardcoded data, replace them with Sanity-fetched data:

**Before (hardcoded):**

```javascript
const stats = [
  { label: 'Students', value: '150+' },
  { label: 'Projects', value: '50+' }
]
```

**After (from Sanity/fallback):**

```javascript
const homeData = await fetchWithFallback(
  () => client.fetch(`*[_type == "homePage"][0]`),
  'home'
)

const stats = homeData.statsSection.stats
```

### Step 3: Handle Images (When You Add Them Later)

When you're ready to add images, update schemas to include image fields:

```javascript
// In schema file
{
  name: 'image',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true
  }
}
```

Then use Sanity's image URL builder:

```javascript
import { urlFor } from '@/lib/sanity'

const imageUrl = urlFor(person.image).width(400).height(400).url()
```

---

## Best Practices

### 1. Content Organization

- **One document per page type** - Home, About, HPC, Contact should each have exactly one document
- **Use slugs consistently** - Always use URL-friendly slugs for dynamic content
- **Set display order** - Use the `order` field for controlling content order
- **Use active/inactive flags** - Toggle content visibility with `isActive` fields

### 2. Error Handling

Always wrap Sanity fetches in try-catch and provide fallback:

```javascript
try {
  const data = await client.fetch(query)
  return data || getFallbackData('type')
} catch (error) {
  console.error('Sanity error:', error)
  return getFallbackData('type')
}
```

### 3. Data Validation

- Use Sanity's built-in validation rules
- Require essential fields with `validation: Rule => Rule.required()`
- Provide helpful descriptions for editors
- Use appropriate field types (string, text, array, reference)

### 4. Performance Optimization

- Use ISR (Incremental Static Regeneration) for dynamic pages
- Cache Sanity queries appropriately
- Minimize the number of API calls per page
- Use projections in GROQ queries to fetch only needed fields

### 5. Updating Fallback Data

When you add real content to Sanity, consider updating the fallback JSON files to match:

```bash
# Export data from Sanity
sanity dataset export production fallback-export.tar.gz

# Parse and format as JSON for fallback files
```

Or manually update the JSON files to match your real content structure.

---

## Next Steps

1. **Start Sanity Studio** and create your first documents
2. **Fill in page content** for Home, About, HPC, and Contact pages
3. **Add collection content** - team members, projects, programs, events
4. **Update page components** to fetch from Sanity using the utility functions
5. **Test fallback behavior** by temporarily disabling Sanity to ensure fallback data displays correctly
6. **Add images** when ready (update schemas and implement image handling)

---

## Troubleshooting

### Sanity Studio not starting
```bash
cd sanity
rm -rf node_modules
npm install
npm run dev
```

### Schema errors
- Check that all schema files are properly imported in `sanity/schemaTypes/index.js`
- Verify schema field syntax matches Sanity v3 format

### Fallback data not loading
- Check file paths in `src/lib/fallback.js`
- Verify JSON files are valid (no syntax errors)
- Ensure JSON structure matches schema structure

### Query returning null
- Check document exists in Sanity Studio
- Verify `_type` matches schema name
- Use Sanity Vision plugin to test queries

---

## Support

For questions or issues:
- Check Sanity documentation: https://www.sanity.io/docs
- Review schema files in `sanity/schemaTypes/`
- Examine fallback data in `src/data/`
- Test queries in Sanity Vision plugin

---

**Created:** December 2024
**Last Updated:** December 2024
**Version:** 1.0.0
