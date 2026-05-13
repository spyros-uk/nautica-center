'use client'

import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ProductImage } from '@/components/product-image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Wrench,
  Phone,
  ChevronRight,
  Filter,
  X,
  Loader2,
} from 'lucide-react'
import {
  getPartBrands,
  getParts,
  getPartPath,
  getPartCategoryLabel,
  type Part,
} from '@/lib/parts'
import {
  clearPartsFiltersStorage,
  loadPartsFilters,
  savePartsFilters,
} from '@/lib/product-filters-storage'

const partBrands = getPartBrands()

const allParts = getParts()
  .map((part) => {
    const brand = partBrands.find((b) => b.id === part.brandId)
    return {
      ...part,
      brandName: brand?.name ?? part.brandId,
    }
  })
  .sort((a, b) => a.brandName.localeCompare(b.brandName) || a.name.localeCompare(b.name))

const brandPartCounts = Object.fromEntries(
  partBrands.map((brand) => [
    brand.id,
    allParts.filter((part) => part.brandId === brand.id).length,
  ]),
)

const ITEMS_PER_PAGE = 12
const validPartBrandIds = partBrands.map((brand) => brand.id)

function getQuickSpecs(part: Part): { label: string; value: string }[] {
  const entries: { label: string; value: string }[] = []
  if (part.specs.diameter) entries.push({ label: 'Διάμετρος', value: part.specs.diameter })
  if (part.specs.pitch) entries.push({ label: 'Βήμα', value: part.specs.pitch })
  if (part.specs.material) entries.push({ label: 'Υλικό', value: part.specs.material })
  if (part.specs.quantity) entries.push({ label: 'Ποσότητα', value: part.specs.quantity })
  if (part.specs.filtration) entries.push({ label: 'Φίλτρο', value: part.specs.filtration })
  if (part.specs.serviceInterval) entries.push({ label: 'Service', value: part.specs.serviceInterval })
  return entries.slice(0, 4)
}

export default function PartsPage() {
  const [isMounted, setIsMounted] = useState(false)
  const filtersHydrated = useRef(false)

  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const saved = loadPartsFilters(validPartBrandIds)
    if (saved) {
      setSelectedBrands(saved.selectedBrands)
    }
    filtersHydrated.current = true
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!filtersHydrated.current) return

    if (selectedBrands.length === 0) {
      clearPartsFiltersStorage()
      return
    }

    savePartsFilters({ selectedBrands })
  }, [selectedBrands])

  const filteredParts = useMemo(() => {
    return allParts.filter((part) => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(part.brandId)) {
        return false
      }
      return true
    })
  }, [selectedBrands])

  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE)
  }, [selectedBrands])

  const displayedParts = filteredParts.slice(0, displayCount)
  const hasMore = displayCount < filteredParts.length

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return
    setIsLoading(true)
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredParts.length))
      setIsLoading(false)
    }, 300)
  }, [isLoading, hasMore, filteredParts.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore()
        }
      },
      { threshold: 0.1 },
    )

    const sentinel = document.getElementById('parts-load-more-sentinel')
    if (sentinel) {
      observer.observe(sentinel)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading, loadMore])

  const toggleBrand = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId],
    )
  }

  const clearFilters = () => {
    setSelectedBrands([])
    clearPartsFiltersStorage()
  }

  const hasActiveFilters = selectedBrands.length > 0

  const brandFilter = (
    <div className="space-y-2">
      {partBrands.map((brand) => (
        <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={selectedBrands.includes(brand.id)}
            onChange={() => toggleBrand(brand.id)}
            className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
          />
          <span className="text-sm group-hover:text-accent transition-colors">{brand.name}</span>
          <span className="text-xs text-muted-foreground ml-auto">
            ({brandPartCounts[brand.id] ?? 0})
          </span>
        </label>
      ))}
    </div>
  )

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
    <main className="min-h-screen bg-background" data-page="parts">
      <Header />

      <section className="relative pt-32 pb-16 bg-primary overflow-hidden" data-section="parts-hero">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary-foreground/70 mb-4">
              <Link href="/" className="hover:text-primary-foreground transition-colors">
                Αρχική
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary-foreground">Ανταλλακτικά</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Ανταλλακτικά Εξωλέμβιων
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-6">
              Γνήσια και συμβατά ανταλλακτικά για Mercury, Yamaha, Honda, Suzuki, Tohatsu και Selva.
              Προπέλες, φίλτρα, ψύξη, ανάφλεξη και πολλά άλλα.
            </p>
            <div className="flex items-center gap-4 text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                <span>{allParts.length} προϊόντα</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{partBrands.length} μάρκες</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-xl border border-border p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Φίλτρα</h3>
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="text-sm text-accent hover:underline">
                      Καθαρισμός
                    </button>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-3">Μάρκα</h4>
                  {brandFilter}
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {filteredParts.length}{' '}
                    {filteredParts.length === 1 ? 'αποτέλεσμα' : 'αποτελέσματα'}
                  </p>
                </div>
              </div>
            </aside>

            <div className="lg:hidden flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{filteredParts.length} αποτελέσματα</p>
              <Button variant="outline" size="sm" onClick={() => setShowFilters(true)} className="gap-2">
                <Filter className="h-4 w-4" />
                Φίλτρα
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedBrands.length}
                  </Badge>
                )}
              </Button>
            </div>

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

                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Μάρκα</h4>
                    {brandFilter}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={clearFilters} className="flex-1">
                      Καθαρισμός
                    </Button>
                    <Button onClick={() => setShowFilters(false)} className="flex-1">
                      Εφαρμογή
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1">
              {filteredParts.length === 0 ? (
                <div className="text-center py-16">
                  <Wrench className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Δεν βρέθηκαν ανταλλακτικά</h3>
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
                    {displayedParts.map((part) => {
                      const quickSpecs = getQuickSpecs(part)
                      return (
                        <Link key={`${part.brandId}-${part.id}`} href={getPartPath(part.brandId, part.id)}>
                          <Card className="group h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                              <ProductImage
                                src={part.image}
                                alt={part.name}
                                category="parts"
                                className="group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-3 left-3">
                                <Badge variant="secondary" className="bg-white/90 text-foreground">
                                  {getPartCategoryLabel(part.category)}
                                </Badge>
                              </div>
                              <div className="absolute top-3 right-3">
                                <Badge
                                  className={
                                    part.inStock
                                      ? 'bg-accent text-accent-foreground'
                                      : 'bg-muted text-muted-foreground'
                                  }
                                >
                                  {part.inStock ? 'Διαθέσιμο' : 'Κατόπιν παραγγελίας'}
                                </Badge>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <p className="text-xs text-muted-foreground mb-1">{part.brandName}</p>
                              <h3 className="font-semibold text-lg mb-1 group-hover:text-accent transition-colors line-clamp-2">
                                {part.name}
                              </h3>
                              <p className="text-xs text-muted-foreground mb-2">SKU: {part.sku}</p>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {part.description}
                              </p>

                              {quickSpecs.length > 0 && (
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  {quickSpecs.map((spec) => (
                                    <div key={spec.label} className="flex justify-between gap-2">
                                      <span className="text-muted-foreground">{spec.label}:</span>
                                      <span className="font-medium text-right truncate">{spec.value}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                                <span className="text-sm font-medium text-accent flex items-center gap-1">
                                  Λεπτομέρειες
                                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      )
                    })}
                  </div>

                  {hasMore && (
                    <div id="parts-load-more-sentinel" className="flex justify-center py-8">
                      {isLoading ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Φόρτωση...</span>
                        </div>
                      ) : (
                        <Button variant="outline" onClick={loadMore} className="px-8">
                          Φόρτωση περισσότερων ({filteredParts.length - displayCount} ακόμα)
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

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Δεν βρίσκετε το ανταλλακτικό που χρειάζεστε;</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Στείλτε μας τον κωδικό ή τη μάρκα του κινητήρα και θα ελέγξουμε διαθεσιμότητα και τιμή.
          </p>
          <Button size="lg" className="gap-2" asChild>
            <a href="tel:+302428091700">
              <Phone className="h-5 w-5" />
              Επικοινωνήστε μαζί μας
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
