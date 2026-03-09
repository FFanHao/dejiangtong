import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImage } from './types'
import { dataset, projectId } from './client'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: SanityImage | undefined | null) => {
  if (!source) return null
  return imageBuilder.image(source as any).auto('format').fit('max')
}
