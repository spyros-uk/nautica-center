import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBrands, getBrandById, getModelById, getCatalogBreadcrumb, getCategoryName, getSpecLabel } from '@/lib/boats'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Phone, Mail, Check, Globe, ExternalLink, MessageCircle } from 'lucide-react'

type Params = Promise<{ brandId: string; modelId: string }>

export async function generateStaticParams() {
  const brands = getBrands()
  const params: { brandId: string; modelId: string }[] = []
  
  for (const brand of brands) {
    for (const model of brand.models) {
      params.push({
        brandId: brand.id,
        modelId: model.id,
      })
    }
  }
  
  return params
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { brandId, modelId } = await params
  const brand = getBrandById(brandId)
  const model = getModelById(brandId, modelId)
  
  if (!brand || !model) return { title: 'Μοντέλο δεν βρέθηκε' }
  
  return {
    title: `${model.name} - ${brand.name} | Nautica Center`,
    description: model.description,
  }
}

export default async function ModelPage({ params }: { params: Params }) {
  const { brandId, modelId } = await params
  const brand = getBrandById(brandId)
  const model = getModelById(brandId, modelId)
  
  if (!brand || !model) {
    notFound()
  }

  const isOutboard = brand.category === 'outboards'
  const catalogCrumb = getCatalogBreadcrumb(brand)

  // Convert specs object to array for display
  const specsArray = Object.entries(model.specs).filter(([_, value]) => value !== undefined)

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        {/* Breadcrumb */}
        <section className="bg-muted/50 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
              <Link href={catalogCrumb.href} className="hover:text-foreground transition-colors">
                {catalogCrumb.label}
              </Link>
              <span>/</span>
              <Link href={`/boats/${brand.id}`} className="hover:text-foreground transition-colors">
                {brand.name}
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{model.name}</span>
            </nav>
          </div>
        </section>

        {/* Model Hero */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image Gallery */}
              <div>
                <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-3xl md:text-4xl font-bold text-muted-foreground/30 block mb-2">
                        {model.name}
                      </span>
                      <span className="text-muted-foreground/50">{brand.name}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Model Info */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="secondary">{brand.name}</Badge>
                  <Badge variant="outline">{getCategoryName(brand.category)}</Badge>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{model.name}</h1>
                
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {model.description}
                </p>

                {/* Quick specs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  {isOutboard ? (
                    <>
                      {model.specs.power && (
                        <div className="bg-muted p-4 rounded-xl text-center">
                          <span className="text-sm text-muted-foreground block mb-1">Ισχύς</span>
                          <span className="text-xl font-bold text-accent">{model.specs.power}</span>
                        </div>
                      )}
                      {model.specs.cylinders && (
                        <div className="bg-muted p-4 rounded-xl text-center">
                          <span className="text-sm text-muted-foreground block mb-1">Κύλινδροι</span>
                          <span className="text-xl font-bold">{model.specs.cylinders}</span>
                        </div>
                      )}
                      {model.specs.displacement && (
                        <div className="bg-muted p-4 rounded-xl text-center">
                          <span className="text-sm text-muted-foreground block mb-1">Κυβισμός</span>
                          <span className="text-xl font-bold">{model.specs.displacement}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {model.specs.length && (
                        <div className="bg-muted p-4 rounded-xl text-center">
                          <span className="text-sm text-muted-foreground block mb-1">Μήκος</span>
                          <span className="text-xl font-bold text-accent">{model.specs.length}</span>
                        </div>
                      )}
                      {model.specs.passengers && (
                        <div className="bg-muted p-4 rounded-xl text-center">
                          <span className="text-sm text-muted-foreground block mb-1">Επιβάτες</span>
                          <span className="text-xl font-bold">{model.specs.passengers}</span>
                        </div>
                      )}
                      {model.specs.maxPower && (
                        <div className="bg-muted p-4 rounded-xl text-center">
                          <span className="text-sm text-muted-foreground block mb-1">Μέγ. Ισχύς</span>
                          <span className="text-xl font-bold">{model.specs.maxPower}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Price CTA */}
                <Card className="bg-accent/10 border-accent/20 mb-6">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="font-semibold text-lg mb-1">Ζητήστε Προσφορά</p>
                        <p className="text-sm text-muted-foreground">
                          Επικοινωνήστε μαζί μας για την καλύτερη τιμή
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href="tel:+302428091700"
                          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
                        >
                          <Phone className="h-5 w-5" />
                          Καλέστε μας
                        </a>
                        <a
                          href="mailto:info@nautica-center.gr"
                          className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 rounded-full font-semibold hover:bg-muted transition-colors"
                        >
                          <Mail className="h-5 w-5" />
                          Email
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Features */}
                {model.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Χαρακτηριστικά</h3>
                    <div className="flex flex-wrap gap-2">
                      {model.features.map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-sm"
                        >
                          <Check className="h-3.5 w-3.5 text-accent" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Full Specifications */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Τεχνικά Χαρακτηριστικά</h2>
            
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {specsArray.map(([key, value], index) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between p-4 ${
                      index !== specsArray.length - 1 ? 'border-b border-border' : ''
                    } ${index % 2 === 0 ? 'md:border-r md:border-border' : ''}`}
                  >
                    <span className="text-muted-foreground">{getSpecLabel(key)}</span>
                    <span className="font-semibold">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Brand info */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Σχετικά με την {brand.name}</h3>
                    <p className="text-muted-foreground text-sm">{brand.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/boats/${brand.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm font-medium hover:bg-accent/20 transition-colors"
                    >
                      Όλα τα {brand.name}
                    </Link>
                    {brand.website && (
                      <a
                        href={brand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors"
                      >
                        <Globe className="h-4 w-4" />
                        Website
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Navigation */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Link
                href={`/boats/${brand.id}`}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Πίσω στα {brand.name}
              </Link>
              <Link
                href={catalogCrumb.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {isOutboard ? 'Όλες οι εξωλέμβιες' : 'Όλα τα σκάφη'}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
