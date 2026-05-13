import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getPartById,
  getPartBrandById,
  getPartCategoryLabel,
  getPartSpecLabel,
  getPartPath,
  getPartBrandPath,
  getParts,
  getRelatedParts,
  PARTS_CATALOG,
} from '@/lib/parts'
import { getModelImages } from '@/lib/product-images'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductGallery } from '@/components/product-gallery'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ProductImage } from '@/components/product-image'
import { TranslatedText } from '@/components/translated-text'
import { PartsCatalogBackLink } from '@/components/parts-catalog-back-link'
import {
  Phone,
  Mail,
  Check,
  Package,
  Tag,
  ChevronRight,
} from 'lucide-react'

type Params = Promise<{ brandId: string; partId: string }>

export async function generateStaticParams() {
  return getParts().map((part) => ({
    brandId: part.brandId,
    partId: part.id,
  }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { brandId, partId } = await params
  const brand = getPartBrandById(brandId)
  const part = getPartById(brandId, partId)

  if (!brand || !part) return { title: 'Ανταλλακτικό δεν βρέθηκε' }

  return {
    title: `${part.name} - ${brand.name} | Nautica Center`,
    description: part.description,
  }
}

export default async function PartDetailPage({ params }: { params: Params }) {
  const { brandId, partId } = await params
  const brand = getPartBrandById(brandId)
  const part = getPartById(brandId, partId)

  if (!brand || !part) {
    notFound()
  }

  const specsArray = Object.entries(part.specs).filter(([, value]) => value)
  const relatedParts = getRelatedParts(brandId, partId, 3)

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="bg-muted/50 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <nav className="flex min-w-0 items-center gap-2 overflow-x-auto whitespace-nowrap text-sm text-muted-foreground">
                <Link href={PARTS_CATALOG.href} className="hover:text-foreground transition-colors">
                  <TranslatedText messageKey="nav.parts" />
                </Link>
                <span>/</span>
                <Link href={getPartBrandPath(brandId)} className="hover:text-foreground transition-colors">
                  {brand.name}
                </Link>
                <span>/</span>
                <span className="text-foreground font-medium">{part.name}</span>
              </nav>
              <PartsCatalogBackLink href={getPartBrandPath(brandId)} brandName={brand.name} />
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <ProductGallery
                images={getModelImages(part, 'parts')}
                alt={part.name}
                category="parts"
              />

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="secondary">{brand.name}</Badge>
                  <Badge variant="outline">{getPartCategoryLabel(part.category)}</Badge>
                  <Badge
                    className={
                      part.inStock
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-muted-foreground'
                    }
                  >
                    {part.inStock ? (
                      <TranslatedText messageKey="catalog.inStock" />
                    ) : (
                      <TranslatedText messageKey="catalog.onOrder" />
                    )}
                  </Badge>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-3">{part.name}</h1>

                <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  SKU: <span className="font-mono font-medium text-foreground">{part.sku}</span>
                </p>

                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{part.description}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  {specsArray.slice(0, 3).map(([key, value]) => (
                    <div key={key} className="bg-muted p-4 rounded-xl text-center">
                      <span className="text-sm text-muted-foreground block mb-1">
                        {getPartSpecLabel(key)}
                      </span>
                      <span className="text-lg font-bold text-accent">{value}</span>
                    </div>
                  ))}
                </div>

                <Card className="bg-accent/10 border-accent/20 mb-6">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="font-semibold text-lg mb-1">
                          <TranslatedText messageKey="catalog.requestPrice" />
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <TranslatedText messageKey="catalog.quoteSubtitleSku" as="span" /> {part.sku}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href="tel:+302428091700"
                          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
                        >
                          <Phone className="h-5 w-5" />
                          <TranslatedText messageKey="catalog.callUs" />
                        </a>
                        <a
                          href={`mailto:info@nautica-center.gr?subject=${encodeURIComponent(`Αίτημα για ${part.name} (${part.sku})`)}`}
                          className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 rounded-full font-semibold hover:bg-muted transition-colors"
                        >
                          <Mail className="h-5 w-5" />
                          <TranslatedText messageKey="catalog.email" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {part.compatibility.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Package className="h-4 w-4 text-accent" />
                      <TranslatedText messageKey="catalog.compatibility" />
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {part.compatibility.map((engine) => (
                        <span
                          key={engine}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-sm"
                        >
                          <Check className="h-3.5 w-3.5 text-accent" />
                          {engine}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {specsArray.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">
                <TranslatedText messageKey="catalog.specs" />
              </h2>

              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {specsArray.map(([key, value], index) => (
                    <div
                      key={key}
                      className={`flex items-center justify-between p-4 ${
                        index !== specsArray.length - 1 ? 'border-b border-border' : ''
                      } ${index % 2 === 0 ? 'md:border-r md:border-border' : ''}`}
                    >
                      <span className="text-muted-foreground">{getPartSpecLabel(key)}</span>
                      <span className="font-semibold text-right ml-4">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {relatedParts.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">
                <TranslatedText messageKey="parts.otherBrand" as="span" /> {brand.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedParts.map((related) => (
                  <Link key={related.id} href={getPartPath(related.brandId, related.id)}>
                    <Card className="group h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                        <ProductImage
                          src={related.image}
                          alt={related.name}
                          category="parts"
                          className="group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge variant="secondary" className="bg-white/90 text-foreground">
                            {getPartCategoryLabel(related.category)}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          {related.name}
                        </h3>
                        <span className="text-sm font-medium text-accent flex items-center gap-1">
                          <TranslatedText messageKey="catalog.details" />
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      <TranslatedText messageKey="parts.partsFor" as="span" /> {brand.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      <TranslatedText messageKey="parts.partsForSubtitle" as="span" /> {brand.name}
                    </p>
                  </div>
                  <Link
                    href={getPartBrandPath(brandId)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm font-medium hover:bg-accent/20 transition-colors"
                  >
                    <TranslatedText messageKey="catalog.allBrand" as="span" /> {brand.name}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
