import boatData from '@/data/boats.json'

export interface BoatSpec {
  length?: string
  beam?: string
  weight?: string
  passengers?: number
  maxPower?: string
  tubes?: string
  category?: string
  fuelCapacity?: string
  power?: string
  cylinders?: string
  displacement?: string
  fuelSystem?: string
  shaft?: string
  /** Jet Ski / PWC powerplant (not an outboard). */
  motor?: string
}

export interface BoatModel {
  id: string
  name: string
  image: string
  specs: BoatSpec
  features: string[]
  description: string
}

export interface Brand {
  id: string
  name: string
  logo: string
  category: 'inflatable' | 'fiberglass' | 'jetski' | 'outboards'
  country: string
  description: string
  website: string
  featured: boolean
  models: BoatModel[]
}

export interface Category {
  id: string
  name: string
  nameEn: string
  description: string
}

export function getCategories(): Category[] {
  return boatData.categories
}

export function getBrands(): Brand[] {
  return boatData.brands as Brand[]
}

export function getFeaturedBrands(): Brand[] {
  return (boatData.brands as Brand[]).filter(brand => brand.featured)
}

export function getBrandsByCategory(categoryId: string): Brand[] {
  return (boatData.brands as Brand[]).filter(brand => brand.category === categoryId)
}

export function getBrandById(brandId: string): Brand | undefined {
  return (boatData.brands as Brand[]).find(brand => brand.id === brandId)
}

export function getModelById(brandId: string, modelId: string): BoatModel | undefined {
  const brand = getBrandById(brandId)
  if (!brand) return undefined
  return brand.models.find(model => model.id === modelId)
}

export function getAllModels(): { brand: Brand; model: BoatModel }[] {
  const result: { brand: Brand; model: BoatModel }[] = []
  for (const brand of boatData.brands as Brand[]) {
    for (const model of brand.models) {
      result.push({ brand, model })
    }
  }
  return result
}

/** Breadcrumb back to the listing that actually lists this brand (boats vs outboards). */
export function getCatalogBreadcrumb(brand: Brand): { href: string; label: string } {
  if (brand.category === 'outboards') {
    return { href: '/outboards', label: 'Εξωλέμβιες' }
  }
  return { href: '/boats', label: 'Σκάφη' }
}

export function getCategoryName(categoryId: string): string {
  const category = boatData.categories.find(c => c.id === categoryId)
  return category?.name || categoryId
}

export function getSpecLabel(key: string): string {
  const labels: Record<string, string> = {
    length: 'Μήκος',
    beam: 'Πλάτος',
    weight: 'Βάρος',
    passengers: 'Επιβάτες',
    maxPower: 'Μέγιστη Ισχύς',
    tubes: 'Διάμετρος Σωλήνων',
    category: 'Κατηγορία CE',
    fuelCapacity: 'Δεξαμενή Καυσίμου',
    power: 'Ισχύς',
    cylinders: 'Κύλινδροι',
    displacement: 'Κυβισμός',
    fuelSystem: 'Σύστημα Τροφοδοσίας',
    shaft: 'Άξονας',
    motor: 'Κινητήρας',
  }
  return labels[key] || key
}
