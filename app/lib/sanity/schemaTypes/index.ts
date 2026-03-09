import { type SchemaTypeDefinition } from 'sanity'
import company from './company'
import engineer from './engineer'
import job from './job'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [company, engineer, job],
}
