'use client'

import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ProductImage } from '@/components/product-image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { 
  Anchor, 
  Phone, 
  ChevronRight, 
  Filter, 
  X,
  Loader2,
  Sparkles,
  Clock,
  Tag
} from 'lucide-react'
import boatsData from '@/data/boats.json'
import {
  clearBoatsFiltersStorage,
  loadBoatsFilters,
  saveBoatsFilters,
  type BoatsQuickFilter,
} from '@/lib/product-filters-storage'

// Boat categories (excluding outboards — they live on `/outboards`)
const boatCategoryIds = ['inflatable', 'fiberglass', 'jetski']

// Get all boat brands from the data (excluding outboard brands)
const boatBrands = boatsData.brands.filter(brand => boatCategoryIds.includes(brand.category))

// Category labels in Greek
const categoryLabels: Record<string, string> = {
  inflatable: 'Φουσκωτά',
  fiberglass: 'Πολυεστερικά',
  jetski: 'Jet Ski'
}

// Flatten all boat models with brand info
const allBoats = boatBrands.flatMap(brand => 
  brand.models.map(model => ({
    ...model,
    brandId: brand.id,
    brandName: brand.name,
    brandCountry: brand.country,
    boatCategory: brand.category,
    length: parseFloat(model.specs.length) || 0,
    isOffer: (model as { isOffer?: boolean }).isOffer || false,
    isAvailable: (model as { isAvailable?: boolean }).isAvailable || false,
    isUsed: (model as { isUsed?: boolean }).isUsed || false,
  }))
).sort((a, b) => a.length - b.length)

// Get min/max length for slider
const minLength = Math.floor(Math.min(...allBoats.map(b => b.length)))
const maxLength = Math.ceil(Math.max(...allBoats.map(b => b.length)))

const ITEMS_PER_PAGE = 12

const validBoatBrandIds = boatBrands.map((brand) => brand.id)

export default function BoatsPage() {
  // Mount state to prevent hydration flash
  const [isMounted, setIsMounted] = useState(false)
  const filtersHydrated = useRef(false)
  
  // Filter state
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [lengthRange, setLengthRange] = useState<[number, number]>([minLength, maxLength])
  const [quickFilter, setQuickFilter] = useState<BoatsQuickFilter>('all')
  const [showFilters, setShowFilters] = useState(false)
  
  // Pagination state
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)
  
  // Restore persisted filters on mount
  useEffect(() => {
    const saved = loadBoatsFilters(validBoatBrandIds, boatCategoryIds, minLength, maxLength)
    if (saved) {
      setSelectedBrands(saved.selectedBrands)
      setSelectedCategories(saved.selectedCategories)
      setLengthRange(saved.lengthRange)
      setQuickFilter(saved.quickFilter)
    }
    filtersHydrated.current = true
    setIsMounted(true)
  }, [])

  // Persist filters when they change (only while filters are active)
  useEffect(() => {
    if (!filtersHydrated.current) return

    const isDefault =
      selectedBrands.length === 0 &&
      selectedCategories.length === 0 &&
      lengthRange[0] === minLength &&
      lengthRange[1] === maxLength &&
      quickFilter === 'all'

    if (isDefault) {
      clearBoatsFiltersStorage()
      return
    }

    saveBoatsFilters({
      selectedBrands,
      selectedCategories,
      lengthRange,
      quickFilter,
    })
  }, [selectedBrands, selectedCategories, lengthRange, quickFilter])

  // Filter boats based on selections
  const filteredBoats = useMemo(() => {
    return allBoats.filter(boat => {
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(boat.brandId)) {
        return false
      }
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(boat.boatCategory)) {
        return false
      }
      // Length filter
      if (boat.length < lengthRange[0] || boat.length > lengthRange[1]) {
        return false
      }
      // Quick filters
      if (quickFilter === 'offers' && !boat.isOffer) {
        return false
      }
      if (quickFilter === 'available' && !boat.isAvailable) {
        return false
      }
      if (quickFilter === 'used' && !boat.isUsed) {
        return false
      }
      return true
    })
  }, [selectedBrands, selectedCategories, lengthRange, quickFilter])

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE)
  }, [selectedBrands, selectedCategories, lengthRange, quickFilter])

  // Get currently displayed boats
  const displayedBoats = filteredBoats.slice(0, displayCount)
  const hasMore = displayCount < filteredBoats.length

  // Infinite scroll handler
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return
    setIsLoading(true)
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredBoats.length))
      setIsLoading(false)
    }, 300)
  }, [isLoading, hasMore, filteredBoats.length])

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    const sentinel = document.getElementById('boats-load-more-sentinel')
    if (sentinel) {
      observer.observe(sentinel)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading, loadMore])

  // Toggle brand filter
  const toggleBrand = (brandId: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    )
  }

  // Toggle category filter
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setLengthRange([minLength, maxLength])
    setQuickFilter('all')
    clearBoatsFiltersStorage()
  }

  const hasActiveFilters = selectedBrands.length > 0 || selectedCategories.length > 0 || lengthRange[0] > minLength || lengthRange[1] < maxLength || quickFilter !== 'all'

  // Count boats by quick filter
  const offerCount = allBoats.filter(b => b.isOffer).length
  const availableCount = allBoats.filter(b => b.isAvailable).length
  const usedCount = allBoats.filter(b => b.isUsed).length

  // Show loading state until mounted to prevent flash
  if (!isMounted) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <section className="relative pt-32 pb-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="h-8 w-32 bg-primary-foreground/20 rounded animate-pulse mb-4" />
              <div className="h-12 w-64 bg-primary-foreground/20 rounded animate-pulse mb-4" />
              <div className="h-6 w-96 bg-primary-foreground/20 rounded animate-pulse" />
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background" data-page="boats">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-primary overflow-hidden" data-section="boats-hero">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary-foreground/70 mb-4">
              <Link href="/" className="hover:text-primary-foreground transition-colors">
                Αρχική
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary-foreground">Σκάφη</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Σκάφη
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-6">
              Ανακαλύψτε τη μεγαλύτερη γκάμα σκαφών στην Ελλάδα. 
              Φουσκωτά, πολυεστερικά και Jet Ski από τις κορυφαίες μάρκες.
            </p>
            <div className="flex items-center gap-4 text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Anchor className="h-5 w-5" />
                <span>{allBoats.length} μοντέλα</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{boatBrands.length} μάρκες</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Filters */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-4">
            <Button
              variant={quickFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setQuickFilter('all')}
              className="gap-2"
            >
              Όλα
              <Badge variant="secondary" className="ml-1 bg-background/50">
                {allBoats.length}
              </Badge>
            </Button>
            <Button
              variant={quickFilter === 'offers' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setQuickFilter('offers')}
              className="gap-2"
            >
              <Tag className="h-4 w-4" />
              Προσφορές
              <Badge variant="secondary" className="ml-1 bg-background/50">
                {offerCount}
              </Badge>
            </Button>
            <Button
              variant={quickFilter === 'available' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setQuickFilter('available')}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Ετοιμοπαράδοτα
              <Badge variant="secondary" className="ml-1 bg-background/50">
                {availableCount}
              </Badge>
            </Button>
            <Button
              variant={quickFilter === 'used' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setQuickFilter('used')}
              className="gap-2"
            >
              <Clock className="h-4 w-4" />
              Μεταχειρισμένα
              <Badge variant="secondary" className="ml-1 bg-background/50">
                {usedCount}
              </Badge>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-xl border border-border p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Φίλτρα</h3>
                  {hasActiveFilters && (
                    <button 
                      onClick={clearFilters}
                      className="text-sm text-accent hover:underline"
                    >
                      Καθαρισμός
                    </button>
                  )}
                </div>

                {/* Type Filter */}
                <div>
                  <h4 className="font-medium mb-3">Τύπος</h4>
                  <div className="space-y-2">
                    {boatCategoryIds.map(categoryId => {
                      const count = boatBrands.filter(b => b.category === categoryId).reduce((acc, b) => acc + b.models.length, 0)
                      return (
                        <label 
                          key={categoryId}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(categoryId)}
                            onChange={() => toggleCategory(categoryId)}
                            className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                          />
                          <span className="text-sm group-hover:text-accent transition-colors">
                            {categoryLabels[categoryId]}
                          </span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            ({count})
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <h4 className="font-medium mb-3">Μάρκες</h4>
                  <div className="space-y-2">
                    {boatBrands.map(brand => (
                      <label 
                        key={brand.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.id)}
                          onChange={() => toggleBrand(brand.id)}
                          className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                        />
                        <span className="text-sm group-hover:text-accent transition-colors">
                          {brand.name}
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          ({brand.models.length})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Length Range Filter */}
                <div>
                  <h4 className="font-medium mb-3">Μήκος (m)</h4>
                  <div className="px-2">
                    <Slider
                      value={lengthRange}
                      onValueChange={(value) => setLengthRange(value as [number, number])}
                      min={minLength}
                      max={maxLength}
                      step={0.5}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{Math.round(lengthRange[0])} m</span>
                      <span>{Math.round(lengthRange[1])} m</span>
                    </div>
                  </div>
                </div>

                {/* Results count */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {filteredBoats.length} {filteredBoats.length === 1 ? 'αποτέλεσμα' : 'αποτελέσματα'}
                  </p>
                </div>
              </div>
            </aside>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {filteredBoats.length} αποτελέσματα
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilters(true)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Φίλτρα
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedBrands.length + selectedCategories.length + (lengthRange[0] > minLength || lengthRange[1] < maxLength ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Mobile Filters Modal */}
            {showFilters && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div 
                  className="absolute inset-0 bg-black/50"
                  onClick={() => setShowFilters(false)}
                />
                <div className="absolute right-0 top-0 bottom-0 w-80 bg-background p-6 overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg">Φίλτρα</h3>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Type Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Τύπος</h4>
                    <div className="space-y-2">
                      {boatCategoryIds.map(categoryId => (
                        <label 
                          key={categoryId}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(categoryId)}
                            onChange={() => toggleCategory(categoryId)}
                            className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                          />
                          <span className="text-sm">{categoryLabels[categoryId]}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Brand Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Μάρκα</h4>
                    <div className="space-y-2">
                      {boatBrands.map(brand => (
                        <label 
                          key={brand.id}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand.id)}
                            onChange={() => toggleBrand(brand.id)}
                            className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                          />
                          <span className="text-sm">{brand.name}</span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            ({brand.models.length})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Length Range Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Μήκος (m)</h4>
                    <div className="px-2">
                      <Slider
                        value={lengthRange}
                        onValueChange={(value) => setLengthRange(value as [number, number])}
                        min={minLength}
                        max={maxLength}
                        step={0.5}
                        className="mb-4"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
<span>{Math.round(lengthRange[0])} m</span>
                      <span>{Math.round(lengthRange[1])} m</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="flex-1"
                    >
                      Καθαρισμός
                    </Button>
                    <Button 
                      onClick={() => setShowFilters(false)}
                      className="flex-1"
                    >
                      Εφαρμογή
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Boat Grid */}
            <div className="flex-1">
              {filteredBoats.length === 0 ? (
                <div className="text-center py-16">
                  <Anchor className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Δεν βρέθηκαν σκάφη</h3>
                  <p className="text-muted-foreground mb-4">
                    Δοκιμάστε να αλλάξετε τα φίλτρα αναζήτησης
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Καθαρισμός φίλτρων
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {displayedBoats.map((boat) => (
                      <Link
                        key={`${boat.brandId}-${boat.id}`}
                        href={`/boats/${boat.brandId}/${boat.id}`}
                      >
                        <Card className="group h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                            <ProductImage
                              src={boat.image}
                              alt={boat.name}
                              category={boat.boatCategory}
                              className="group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Length Badge */}
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-accent text-accent-foreground font-bold">
                                {boat.specs.length}
                              </Badge>
                            </div>
                            {/* Brand Badge */}
                            <div className="absolute top-3 right-3">
                              <Badge variant="secondary" className="bg-white/90 text-foreground">
                                {boat.brandName}
                              </Badge>
                            </div>
                            {/* Special badges */}
                            <div className="absolute bottom-3 left-3 flex gap-2">
                              {boat.isOffer && (
                                <Badge className="bg-red-500 text-white">
                                  <Tag className="h-3 w-3 mr-1" />
                                  Προσφορά
                                </Badge>
                              )}
                              {boat.isAvailable && (
                                <Badge className="bg-green-500 text-white">
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  Ετοιμοπαράδοτο
                                </Badge>
                              )}
                              {boat.isUsed && (
                                <Badge className="bg-amber-500 text-white">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Μεταχειρισμένο
                                </Badge>
                              )}
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {categoryLabels[boat.boatCategory]}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                              {boat.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {boat.description}
                            </p>
                            
                            {/* Quick Specs */}
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                              {boat.specs.beam && (
                                <div className="flex gap-1">
                                  <span className="text-muted-foreground">Πλάτος:</span>
                                  <span className="font-medium">{boat.specs.beam}</span>
                                </div>
                              )}
                              {boat.specs.passengers && (
                                <div className="flex gap-1">
                                  <span className="text-muted-foreground">Άτομα:</span>
                                  <span className="font-medium">{boat.specs.passengers}</span>
                                </div>
                              )}
                              {boat.specs.maxPower && (
                                <div className="flex gap-1">
                                  <span className="text-muted-foreground">Max HP:</span>
                                  <span className="font-medium">{boat.specs.maxPower}</span>
                                </div>
                              )}
                              {boat.specs.weight && (
                                <div className="flex gap-1">
                                  <span className="text-muted-foreground">Βάρος:</span>
                                  <span className="font-medium">{boat.specs.weight}</span>
                                </div>
                              )}
                            </div>

                            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                              <span className="text-sm font-medium text-accent flex items-center gap-1">
                                Λεπτομέρειες
                                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>

                  {/* Load More Sentinel & Loading Indicator */}
                  {hasMore && (
                    <div 
                      id="boats-load-more-sentinel"
                      className="flex justify-center py-8"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Φόρτωση...</span>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={loadMore}
                          className="px-8"
                        >
                          Φόρτωση περισσότερων ({filteredBoats.length - displayCount} ακόμα)
                        </Button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Χρειάζεστε βοήθεια στην επιλογή;
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Οι ειδικοί μας μπορούν να σας συμβουλεύσουν για το ιδανικό σκάφος 
            ανάλογα με τις ανάγκες σας και τον προϋπολογισμό σας.
          </p>
          <Button size="lg" className="gap-2">
            <Phone className="h-5 w-5" />
            Επικοινωνήστε μαζί μας
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
