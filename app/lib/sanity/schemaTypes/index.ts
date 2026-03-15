import { type SchemaTypeDefinition } from 'sanity'
import company from './company'
import engineer from './engineer'
import job from './job'
import cooperation from './cooperation'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [company, engineer, job, cooperation],
}
