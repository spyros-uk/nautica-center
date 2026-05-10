'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { 
  Settings, 
  Phone, 
  ChevronRight, 
  Filter, 
  X,
  Loader2 
} from 'lucide-react'
import boatsData from '@/data/boats.json'

// Get all engine brands from the data
const engineBrands = boatsData.brands.filter(brand => brand.category === 'engines')

// Flatten all engine models with brand info
const allEngines = engineBrands.flatMap(brand => 
  brand.models.map(model => ({
    ...model,
    brandId: brand.id,
    brandName: brand.name,
    brandCountry: brand.country,
    hp: parseInt(model.specs.power) || 0
  }))
).sort((a, b) => a.hp - b.hp)

// Get min/max HP for slider
const minHP = Math.min(...allEngines.map(e => e.hp))
const maxHP = Math.max(...allEngines.map(e => e.hp))

const ITEMS_PER_PAGE = 12

export default function EnginesPage() {
  // Mount state to prevent hydration flash
  const [isMounted, setIsMounted] = useState(false)
  
  // Filter state
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [hpRange, setHpRange] = useState<[number, number]>([minHP, maxHP])
  const [showFilters, setShowFilters] = useState(false)
  
  // Pagination state
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)
  
  // Set mounted on client and reset state
  useEffect(() => {
    // Reset all filter state on mount to ensure clean state
    setSelectedBrands([])
    setHpRange([minHP, maxHP])
    setDisplayCount(ITEMS_PER_PAGE)
    setIsMounted(true)
    
    return () => {
      setIsMounted(false)
    }
  }, [])

  // Filter engines based on selections
  const filteredEngines = useMemo(() => {
    return allEngines.filter(engine => {
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(engine.brandId)) {
        return false
      }
      // HP filter
      if (engine.hp < hpRange[0] || engine.hp > hpRange[1]) {
        return false
      }
      return true
    })
  }, [selectedBrands, hpRange])

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE)
  }, [selectedBrands, hpRange])

  // Get currently displayed engines
  const displayedEngines = filteredEngines.slice(0, displayCount)
  const hasMore = displayCount < filteredEngines.length

  // Infinite scroll handler
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return
    setIsLoading(true)
    // Simulate network delay for smooth UX
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredEngines.length))
      setIsLoading(false)
    }, 300)
  }, [isLoading, hasMore, filteredEngines.length])

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

    const sentinel = document.getElementById('outboards-load-more-sentinel')
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

  // Clear all filters
  const clearFilters = () => {
    setSelectedBrands([])
    setHpRange([minHP, maxHP])
  }

  const hasActiveFilters = selectedBrands.length > 0 || hpRange[0] > minHP || hpRange[1] < maxHP

  // Show loading state until mounted to prevent flash
  if (!isMounted) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <section className="relative pt-32 pb-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="h-8 w-32 bg-primary-foreground/20 rounded animate-pulse mb-4" />
              <div className="h-12 w-80 bg-primary-foreground/20 rounded animate-pulse mb-4" />
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
    <main className="min-h-screen bg-background" data-page="outboards">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-primary overflow-hidden" data-section="outboards-hero">
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
              <span className="text-primary-foreground">Εξωλέμβιες Μηχανές</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Εξωλέμβιες Μηχανές
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-6">
              Ανακαλύψτε τη μεγαλύτερη γκάμα εξωλέμβιων μηχανών από τις κορυφαίες μάρκες. 
              Από 2.5HP έως 350HP για κάθε ανάγκη.
            </p>
            <div className="flex items-center gap-4 text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <span>{allEngines.length} μοντέλα</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{engineBrands.length} μάρκες</span>
              </div>
            </div>
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

                {/* Brand Filter */}
                <div>
                  <h4 className="font-medium mb-3">Μάρκα</h4>
                  <div className="space-y-2">
                    {engineBrands.map(brand => (
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

                {/* HP Range Filter */}
                <div>
                  <h4 className="font-medium mb-3">Ιπποδύναμη (HP)</h4>
                  <div className="px-2">
                    <Slider
                      value={hpRange}
                      onValueChange={(value) => setHpRange(value as [number, number])}
                      min={minHP}
                      max={maxHP}
                      step={5}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{hpRange[0]} HP</span>
                      <span>{hpRange[1]} HP</span>
                    </div>
                  </div>
                </div>

                {/* Results count */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {filteredEngines.length} {filteredEngines.length === 1 ? 'αποτέλεσμα' : 'αποτελέσματα'}
                  </p>
                </div>
              </div>
            </aside>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {filteredEngines.length} αποτελέσματα
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
                    {selectedBrands.length + (hpRange[0] > minHP || hpRange[1] < maxHP ? 1 : 0)}
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
                  
                  {/* Brand Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Μάρκα</h4>
                    <div className="space-y-2">
                      {engineBrands.map(brand => (
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

                  {/* HP Range Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Ιπποδύναμη (HP)</h4>
                    <div className="px-2">
                      <Slider
                        value={hpRange}
                        onValueChange={(value) => setHpRange(value as [number, number])}
                        min={minHP}
                        max={maxHP}
                        step={5}
                        className="mb-4"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{hpRange[0]} HP</span>
                        <span>{hpRange[1]} HP</span>
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

            {/* Engine Grid */}
            <div className="flex-1">
              {filteredEngines.length === 0 ? (
                <div className="text-center py-16">
                  <Settings className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Δεν βρέθηκαν μηχανές</h3>
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
                    {displayedEngines.map((engine) => (
                      <Link
                        key={`${engine.brandId}-${engine.id}`}
                        href={`/outboards/${engine.brandId}/${engine.id}`}
                      >
                        <Card className="group h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                            <Image
                              src={engine.image || '/images/placeholder-engine.jpg'}
                              alt={engine.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = '/images/placeholder-engine.jpg'
                              }}
                            />
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-accent text-accent-foreground font-bold">
                                {engine.specs.power}
                              </Badge>
                            </div>
                            <div className="absolute top-3 right-3">
                              <Badge variant="secondary" className="bg-white/90 text-foreground">
                                {engine.brandName}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                              {engine.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {engine.description}
                            </p>
                            
                            {/* Quick Specs */}
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              {engine.specs.cylinders && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Κύλινδροι:</span>
                                  <span className="font-medium">{engine.specs.cylinders}</span>
                                </div>
                              )}
                              {engine.specs.displacement && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Κυβικά:</span>
                                  <span className="font-medium">{engine.specs.displacement}</span>
                                </div>
                              )}
                              {engine.specs.weight && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Βάρος:</span>
                                  <span className="font-medium">{engine.specs.weight}</span>
                                </div>
                              )}
                              {engine.specs.fuelSystem && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Τροφοδοσία:</span>
                                  <span className="font-medium">{engine.specs.fuelSystem}</span>
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
                      id="outboards-load-more-sentinel"
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
                          Φόρτωση περισσότερων ({filteredEngines.length - displayCount} ακόμα)
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
            Οι ειδικοί μας μπορούν να σας συμβουλεύσουν για την ιδανική μηχανή 
            ανάλογα με το σκάφος σας και τις ανάγκες σας.
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
