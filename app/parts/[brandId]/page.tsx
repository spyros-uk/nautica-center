import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBrandById } from '@/lib/boats'
import {
  getPartBrands,
  getPartBrandById,
  getPartsByBrand,
  getPartPath,
  getPartCategoryLabel,
  PARTS_CATALOG,
} from '@/lib/parts'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductImage } from '@/components/product-image'
import { Badge } from '@/components/ui/badge'
import { TranslatedText } from '@/components/translated-text'
import { PartsCatalogBackLink } from '@/components/parts-catalog-back-link'
import { ArrowRight, Globe, Phone, ExternalLink, Wrench, Tag } from 'lucide-react'

type Params = Promise<{ brandId: string }>

export async function generateStaticParams() {
  return getPartBrands().map((brand) => ({
    brandId: brand.id,
  }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { brandId } = await params
  const brand = getPartBrandById(brandId)
  if (!brand) return { title: 'Μάρκα δεν βρέθηκε' }

  const outboardBrand = getBrandById(brandId)
  const description =
    outboardBrand?.category === 'outboards'
      ? outboardBrand.description
      : `Ανταλλακτικά εξωλέμβιων ${brand.name} — προπέλες, φίλτρα, ψύξη και συντήρηση.`

  return {
    title: `${brand.name} - Ανταλλακτικά | Nautica Center`,
    description,
  }
}

function getQuickSpecs(part: ReturnType<typeof getPartsByBrand>[number]): string | undefined {
  return (
    part.specs.diameter ??
    part.specs.material ??
    part.specs.filtration ??
    part.specs.serviceInterval ??
    part.specs.quantity
  )
}

export default async function PartBrandPage({ params }: { params: Params }) {
  const { brandId } = await params
  const brand = getPartBrandById(brandId)

  if (!brand) {
    notFound()
  }

  const parts = getPartsByBrand(brandId)
  const outboardBrand = getBrandById(brandId)

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="bg-primary text-primary-foreground py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex items-center justify-between gap-4">
              <nav className="flex min-w-0 items-center gap-2 overflow-x-auto whitespace-nowrap text-sm text-primary-foreground/60">
                <Link href={PARTS_CATALOG.href} className="hover:text-primary-foreground transition-colors">
                  <TranslatedText messageKey="nav.parts" />
                </Link>
                <span>/</span>
                <span className="text-primary-foreground">{brand.name}</span>
              </nav>
              <PartsCatalogBackLink
                href={PARTS_CATALOG.href}
                className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold">{brand.name}</h1>
                  {outboardBrand?.featured && (
                    <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-primary-foreground/70 mb-4">
                  {outboardBrand?.country && <span>{outboardBrand.country}</span>}
                  {outboardBrand?.country && <span>•</span>}
                  <TranslatedText messageKey="parts.outboardParts" />
                  <span>•</span>
                  <span>
                    {parts.length}{' '}
                    <TranslatedText
                      messageKey={parts.length === 1 ? 'catalog.product' : 'catalog.products'}
                    />
                  </span>
                </div>
                <p className="text-lg text-primary-foreground/80 leading-relaxed">
                  {outboardBrand?.category === 'outboards'
                    ? outboardBrand.description
                    : `Γνήσια και συμβατά ανταλλακτικά για κινητήρες ${brand.name}. Επικοινωνήστε μαζί μας για διαθεσιμότητα και τιμές.`}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {outboardBrand?.website && (
                  <a
                    href={outboardBrand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-colors"
                  >
                    <Globe className="h-5 w-5" />
                    <TranslatedText messageKey="catalog.officialSite" />
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-semibold hover:bg-accent/90 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <TranslatedText messageKey="catalog.contact" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              <TranslatedText messageKey="parts.available" />
            </h2>

            {parts.length === 0 ? (
              <div className="text-center py-16 bg-muted/30 rounded-2xl border border-border">
                <Wrench className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  <TranslatedText messageKey="parts.noProducts" />
                </h3>
                <p className="text-muted-foreground mb-6">
                  <TranslatedText messageKey="parts.noProductsHelp" as="span" /> {brand.name}.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <TranslatedText messageKey="catalog.contact" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {parts.map((part) => {
                  const quickSpec = getQuickSpecs(part)
                  return (
                    <Link
                      key={part.id}
                      href={getPartPath(brandId, part.id)}
                      className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent transition-all hover:shadow-xl"
                    >
                      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
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
                            {part.inStock ? (
                              <TranslatedText messageKey="catalog.inStock" />
                            ) : (
                              <TranslatedText messageKey="catalog.onOrder" />
                            )}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          {part.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {part.sku}
                        </p>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{part.description}</p>

                        {quickSpec && (
                          <div className="text-center p-2 bg-muted rounded-lg mb-4">
                            <span className="text-xs text-muted-foreground block">Χαρακτηριστικό</span>
                            <span className="text-sm font-semibold">{quickSpec}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="text-sm font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                            <TranslatedText messageKey="catalog.more" />
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
