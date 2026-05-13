export const BOATS_FILTERS_STORAGE_KEY = 'nautica-center:boats-filters'
export const OUTBOARDS_FILTERS_STORAGE_KEY = 'nautica-center:outboards-filters'
export const PARTS_FILTERS_STORAGE_KEY = 'nautica-center:parts-filters'

export type BoatsQuickFilter = 'all' | 'offers' | 'available' | 'used'

export type BoatsFiltersState = {
  selectedBrands: string[]
  selectedCategories: string[]
  lengthRange: [number, number]
  quickFilter: BoatsQuickFilter
}

export type OutboardsFiltersState = {
  selectedBrands: string[]
  hpRange: [number, number]
}

export type PartsFiltersState = {
  selectedBrands: string[]
}

const BOATS_QUICK_FILTERS: BoatsQuickFilter[] = ['all', 'offers', 'available', 'used']

export const BOAT_CATALOG_CATEGORY_IDS = ['inflatable', 'fiberglass', 'jetski'] as const
export type BoatsCategoryFilter = (typeof BOAT_CATALOG_CATEGORY_IDS)[number]

export function parseBoatsQuickFilter(value: string | null | undefined): BoatsQuickFilter | null {
  if (!value || !BOATS_QUICK_FILTERS.includes(value as BoatsQuickFilter)) return null
  return value as BoatsQuickFilter
}

export function parseBoatsCategoryFilter(value: string | null | undefined): BoatsCategoryFilter | null {
  if (!value || !BOAT_CATALOG_CATEGORY_IDS.includes(value as BoatsCategoryFilter)) return null
  return value as BoatsCategoryFilter
}

type BoatsPageHrefOptions = {
  quickFilter?: BoatsQuickFilter
  category?: BoatsCategoryFilter
}

function buildBoatsPageHref({ quickFilter, category }: BoatsPageHrefOptions = {}): string {
  const params = new URLSearchParams()
  if (quickFilter && quickFilter !== 'all') {
    params.set('filter', quickFilter)
  }
  if (category) {
    params.set('category', category)
  }
  const query = params.toString()
  return query ? `/boats?${query}` : '/boats'
}

/** Build `/boats` URL with optional quick filter and/or category (from homepage links). */
export function getBoatsPageHref(
  quickFilterOrOptions?: BoatsQuickFilter | BoatsPageHrefOptions,
): string {
  if (quickFilterOrOptions === undefined) {
    return buildBoatsPageHref()
  }
  if (typeof quickFilterOrOptions === 'string') {
    return buildBoatsPageHref({ quickFilter: quickFilterOrOptions })
  }
  return buildBoatsPageHref(quickFilterOrOptions)
}

function readJson<T>(key: string): T | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore quota / private mode errors
  }
}

function removeKey(key: string) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(key)
  } catch {
    // Ignore
  }
}

function clampRange(
  range: unknown,
  min: number,
  max: number,
): [number, number] {
  if (!Array.isArray(range) || range.length !== 2) {
    return [min, max]
  }
  const low = Number(range[0])
  const high = Number(range[1])
  if (!Number.isFinite(low) || !Number.isFinite(high)) {
    return [min, max]
  }
  const start = Math.max(min, Math.min(low, max))
  const end = Math.max(min, Math.min(high, max))
  return [Math.min(start, end), Math.max(start, end)]
}

function sanitizeStringArray(value: unknown, allowed: Set<string>): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string' && allowed.has(item))
}

export function loadBoatsFilters(
  validBrandIds: string[],
  validCategoryIds: string[],
  minLength: number,
  maxLength: number,
): BoatsFiltersState | null {
  const saved = readJson<Partial<BoatsFiltersState>>(BOATS_FILTERS_STORAGE_KEY)
  if (!saved) return null

  const quickFilter = BOATS_QUICK_FILTERS.includes(saved.quickFilter as BoatsQuickFilter)
    ? (saved.quickFilter as BoatsQuickFilter)
    : 'all'

  return {
    selectedBrands: sanitizeStringArray(saved.selectedBrands, new Set(validBrandIds)),
    selectedCategories: sanitizeStringArray(saved.selectedCategories, new Set(validCategoryIds)),
    lengthRange: clampRange(saved.lengthRange, minLength, maxLength),
    quickFilter,
  }
}

export function saveBoatsFilters(state: BoatsFiltersState) {
  writeJson(BOATS_FILTERS_STORAGE_KEY, state)
}

export function clearBoatsFiltersStorage() {
  removeKey(BOATS_FILTERS_STORAGE_KEY)
}

export function loadOutboardsFilters(
  validBrandIds: string[],
  minHP: number,
  maxHP: number,
): OutboardsFiltersState | null {
  const saved = readJson<Partial<OutboardsFiltersState>>(OUTBOARDS_FILTERS_STORAGE_KEY)
  if (!saved) return null

  return {
    selectedBrands: sanitizeStringArray(saved.selectedBrands, new Set(validBrandIds)),
    hpRange: clampRange(saved.hpRange, minHP, maxHP),
  }
}

export function saveOutboardsFilters(state: OutboardsFiltersState) {
  writeJson(OUTBOARDS_FILTERS_STORAGE_KEY, state)
}

export function clearOutboardsFiltersStorage() {
  removeKey(OUTBOARDS_FILTERS_STORAGE_KEY)
}

export function loadPartsFilters(validBrandIds: string[]): PartsFiltersState | null {
  const saved = readJson<Partial<PartsFiltersState>>(PARTS_FILTERS_STORAGE_KEY)
  if (!saved) return null

  return {
    selectedBrands: sanitizeStringArray(saved.selectedBrands, new Set(validBrandIds)),
  }
}

export function savePartsFilters(state: PartsFiltersState) {
  writeJson(PARTS_FILTERS_STORAGE_KEY, state)
}

export function clearPartsFiltersStorage() {
  removeKey(PARTS_FILTERS_STORAGE_KEY)
}
