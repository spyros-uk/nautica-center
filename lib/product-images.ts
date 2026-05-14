import type { Brand } from '@/lib/boats'

export const PLACEHOLDER_BOAT_IMAGE = '/images/placeholder-boat.jpg'
export const PLACEHOLDER_RIB_IMAGE = '/images/placeholder/ribs-category.jpeg'
export const PLACEHOLDER_FIBERGLASS_IMAGE = '/images/placeholder/fiberglass-category.jpeg'
export const PLACEHOLDER_JETSKI_IMAGE = '/images/placeholder/jetskis-category.jpg'
export const PLACEHOLDER_OUTBOARD_IMAGE = '/images/placeholder-engine.jpg'
export const PLACEHOLDER_PARTS_IMAGE = '/images/placeholder-engine.jpg'
/** Generic last-resort fallback for boats only (always present in /public). */
export const PLACEHOLDER_PRODUCT_IMAGE = '/placeholder.jpg'

export function getProductPlaceholder(category?: Brand['category'] | string): string {
  if (category === 'parts') return PLACEHOLDER_PARTS_IMAGE
  if (category === 'outboards') return PLACEHOLDER_OUTBOARD_IMAGE
  if (category === 'inflatable') return PLACEHOLDER_RIB_IMAGE
  if (category === 'fiberglass') return PLACEHOLDER_FIBERGLASS_IMAGE
  if (category === 'jetski') return PLACEHOLDER_JETSKI_IMAGE
  return PLACEHOLDER_BOAT_IMAGE
}

export function getProductFallbackImage(
  currentSrc: string,
  category?: Brand['category'] | string,
): string {
  const primary = getProductPlaceholder(category)
  if (currentSrc === primary) {
    return category === 'outboards' ? primary : PLACEHOLDER_PRODUCT_IMAGE
  }
  return primary
}

const OUTBOARD_DISALLOWED_IMAGES = new Set([
  PLACEHOLDER_BOAT_IMAGE,
  '/images/hero-boat.jpg',
  PLACEHOLDER_PRODUCT_IMAGE,
])

export function sanitizeProductImageSrc(
  src: string,
  category?: Brand['category'] | string,
): string {
  if (category === 'outboards' && OUTBOARD_DISALLOWED_IMAGES.has(src)) {
    return PLACEHOLDER_OUTBOARD_IMAGE
  }
  return src
}

export function resolveProductImageSrc(
  src: string | undefined,
  category?: Brand['category'] | string,
): string {
  if (!src?.trim()) {
    return getProductPlaceholder(category)
  }
  return sanitizeProductImageSrc(src, category)
}

export function getModelImages(
  model: { image?: string; images?: string[] },
  category?: Brand['category'] | string,
): string[] {
  if (model.images?.length) {
    return model.images.map((src) => sanitizeProductImageSrc(src, category))
  }
  if (model.image) {
    return [sanitizeProductImageSrc(model.image, category)]
  }
  return [getProductPlaceholder(category)]
}
