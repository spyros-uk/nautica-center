import partsData from '@/data/parts.json'

export type PartCategory =
  | 'propeller'
  | 'maintenance'
  | 'cooling'
  | 'fuel'
  | 'electrical'
  | 'ignition'
  | 'trim'
  | 'gaskets'

export interface PartBrand {
  id: string
  name: string
}

export interface Part {
  id: string
  brandId: string
  name: string
  sku: string
  category: PartCategory
  image: string
  description: string
  compatibility: string[]
  specs: Record<string, string>
  inStock: boolean
}

const categoryLabels: Record<PartCategory, string> = {
  propeller: 'Προπέλες',
  maintenance: 'Συντήρηση',
  cooling: 'Ψύξη',
  fuel: 'Καύσιμο',
  electrical: 'Ηλεκτρικά',
  ignition: 'Ανάφλεξη',
  trim: 'Trim / Tilt',
  gaskets: 'Φλάντζες',
}

export function getPartBrands(): PartBrand[] {
  return partsData.brands as PartBrand[]
}

export function getPartBrandById(brandId: string): PartBrand | undefined {
  return getPartBrands().find((brand) => brand.id === brandId)
}

export function getParts(): Part[] {
  return partsData.parts as Part[]
}

export function getPartById(brandId: string, partId: string): Part | undefined {
  return getParts().find((part) => part.brandId === brandId && part.id === partId)
}

export function getPartsByBrand(brandId: string): Part[] {
  return getParts().filter((part) => part.brandId === brandId)
}

export function getRelatedParts(brandId: string, excludePartId: string, limit = 3): Part[] {
  return getPartsByBrand(brandId)
    .filter((part) => part.id !== excludePartId)
    .slice(0, limit)
}

export function getPartCategoryLabel(category: PartCategory): string {
  return categoryLabels[category] ?? category
}

export function getPartSpecLabel(key: string): string {
  const labels: Record<string, string> = {
    diameter: 'Διάμετρος',
    pitch: 'Βήμα (pitch)',
    blades: 'Πτερύγια',
    material: 'Υλικό',
    rotation: 'Περιστροφή',
    contents: 'Περιεχόμενα',
    serviceInterval: 'Διάστημα service',
    filtration: 'Φιλτράρισμα',
    type: 'Τύπος',
    quantity: 'Ποσότητα',
    gap: 'Κενό μπουζιού',
    thread: 'Σπείρωμα',
    includes: 'Περιλαμβάνει',
    voltage: 'Τάση',
    mounting: 'Βάση',
    pieces: 'Τεμάχια',
    pressure: 'Πίεση',
    openingTemp: 'Θερμοκρασία ανοίγματος',
    housing: 'Κάλυμμα',
    skill: 'Εγκατάσταση',
    length: 'Μήκος',
    handle: 'Χειρολαβή',
    hoseDiameter: 'Διάμετρος σωλήνου',
    bulb: 'Bulb primer',
    cylinders: 'Κύλινδροι',
    heatRange: 'Θερμικό εύρος',
    reach: 'Reach',
  }
  return labels[key] ?? key
}

export function getPartPath(brandId: string, partId: string): string {
  return `/parts/${brandId}/${partId}`
}

export function getPartBrandPath(brandId: string): string {
  return `/parts/${brandId}`
}

export const PARTS_CATALOG = { href: '/parts', label: 'Ανταλλακτικά' } as const
