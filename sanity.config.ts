import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './app/lib/sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3zj7lp5d'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool(),
  ],
  cors: {
    allowOrigins: ['http://localhost:3008'],
  },
})
