import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { edctpSchemaTypes } from './schemaTypes/edctp'
import { structure } from './sanity/structure'
import { edctpStructure } from './sanity/edctpStructure'
import { apiVersion, dataset, projectId } from './sanity/env'
import { WorkspaceBanner } from './sanity/components/WorkspaceBanner'

const shared = { projectId, dataset }

const navbarWithBanner = (props) => (
  <>
    <WorkspaceBanner />
    {props.renderDefault(props)}
  </>
)

export default defineConfig([
  {
    ...shared,
    // All workspace basePaths must have the same segment count (Sanity constraint),
    // so both live one level below the /acewebsite-backend catch-all route.
    basePath: '/acewebsite-backend/main',
    name: 'acewebsite',
    title: 'ACE Uganda Content Studio',
    schema: {
      types: schemaTypes,
    },
    plugins: [
      structureTool({ structure }),
      visionTool({ defaultApiVersion: apiVersion }),
    ],
    studio: {
      components: { navbar: navbarWithBanner },
    },
  },
  {
    ...shared,
    name: 'edctp-idm',
    title: 'IDM Africa — Infectious Diseases Modelling Africa',
    basePath: '/acewebsite-backend/edctp-idm',
    schema: { types: edctpSchemaTypes },
    plugins: [structureTool({ structure: edctpStructure })],
    studio: {
      components: { navbar: navbarWithBanner },
    },
  },
])
