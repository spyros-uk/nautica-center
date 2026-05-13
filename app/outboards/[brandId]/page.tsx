import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBrands, getBrandById, getCatalogBreadcrumb, getModelPath, getCategoryName, getSpecLabel } from '@/lib/boats'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductImage } from '@/components/product-image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Globe, Phone, Users, Ruler, Gauge, ExternalLink } from 'lucide-react'

type Params = Promise<{ brandId: string }>

export async function generateStaticParams() {
  const brands = getBrands()
  return brands
    .filter((brand) => brand.category === 'outboards')
    .map((brand) => ({
    brandId: brand.id,
  }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { brandId } = await params
  const brand = getBrandById(brandId)
  if (!brand) return { title: 'Μάρκα δεν βρέθηκε' }
  
  return {
    title: `${brand.name} - Εξωλέμβιες | Nautica Center`,
    description: brand.description,
  }
}

export default async function BrandPage({ params }: { params: Params }) {
  const { brandId } = await params
  const brand = getBrandById(brandId)
  
  if (!brand || brand.category !== 'outboards') {
    notFound()
  }

  const isOutboard = brand.category === 'outboards'
  const catalogCrumb = getCatalogBreadcrumb(brand)

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-12 md:py-20">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-6">
              <Link href={catalogCrumb.href} className="hover:text-primary-foreground transition-colors">
                {catalogCrumb.label}
              </Link>
              <span>/</span>
              <span className="text-primary-foreground">{brand.name}</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold">{brand.name}</h1>
                  {brand.featured && (
                    <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-primary-foreground/70 mb-4">
                  <span>{brand.country}</span>
                  <span>•</span>
                  <span>{getCategoryName(brand.category)}</span>
                  <span>•</span>
                  <span>{brand.models.length} {isOutboard ? 'εξωλέμβιες' : 'μοντέλα'}</span>
                </div>
                <p className="text-lg text-primary-foreground/80 leading-relaxed">
                  {brand.description}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {brand.website && (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-colors"
                  >
                    <Globe className="h-5 w-5" />
                    Επίσημη Ιστοσελίδα
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-semibold hover:bg-accent/90 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  Επικοινωνία
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Models Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {isOutboard ? 'Διαθέσιμες εξωλέμβιες' : 'Διαθέσιμα Μοντέλα'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brand.models.map((model) => (
                <Link
                  key={model.id}
                  href={getModelPath(brand, model)}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent transition-all hover:shadow-xl"
                >
                  {/* Model image */}
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    <ProductImage src={model.image} alt={model.name} category={brand.category} />
                  </div>

                  {/* Model info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {model.description}
                    </p>

                    {/* Quick specs */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {isOutboard ? (
                        <>
                          {model.specs.power && (
                            <div className="text-center p-2 bg-muted rounded-lg">
                              <Gauge className="h-4 w-4 mx-auto mb-1 text-accent" />
                              <span className="text-xs text-muted-foreground block">Ισχύς</span>
                              <span className="text-sm font-semibold">{model.specs.power}</span>
                            </div>
                          )}
                          {model.specs.cylinders && (
                            <div className="text-center p-2 bg-muted rounded-lg">
                              <span className="text-xs text-muted-foreground block">Κύλινδροι</span>
                              <span className="text-sm font-semibold">{model.specs.cylinders}</span>
                            </div>
                          )}
                          {model.specs.weight && (
                            <div className="text-center p-2 bg-muted rounded-lg">
                              <span className="text-xs text-muted-foreground block">Βάρος</span>
                              <span className="text-sm font-semibold">{model.specs.weight}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {model.specs.length && (
                            <div className="text-center p-2 bg-muted rounded-lg">
                              <Ruler className="h-4 w-4 mx-auto mb-1 text-accent" />
                              <span className="text-xs text-muted-foreground block">Μήκος</span>
                              <span className="text-sm font-semibold">{model.specs.length}</span>
                            </div>
                          )}
                          {model.specs.passengers && (
                            <div className="text-center p-2 bg-muted rounded-lg">
                              <Users className="h-4 w-4 mx-auto mb-1 text-accent" />
                              <span className="text-xs text-muted-foreground block">Άτομα</span>
                              <span className="text-sm font-semibold">{model.specs.passengers}</span>
                            </div>
                          )}
                          {model.specs.maxPower && (
                            <div className="text-center p-2 bg-muted rounded-lg">
                              <Gauge className="h-4 w-4 mx-auto mb-1 text-accent" />
                              <span className="text-xs text-muted-foreground block">Ισχύς</span>
                              <span className="text-sm font-semibold">{model.specs.maxPower}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                        Περισσότερα
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Back link */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <Link
              href={catalogCrumb.href}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {isOutboard ? 'Πίσω στις εξωλέμβιες' : 'Πίσω στα σκάφη'}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
