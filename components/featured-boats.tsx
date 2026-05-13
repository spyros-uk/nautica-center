'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProductImage } from '@/components/product-image'
import { ArrowRight, Ruler, Users, Gauge } from 'lucide-react'
import { getBoatsPageHref } from '@/lib/product-filters-storage'
import { getHighlightedBoats, getModelPathFromHome } from '@/lib/boats'
import type { BoatModel } from '@/lib/boats'
import { useTranslation } from '@/lib/i18n/context'

const boatsCatalogHref = getBoatsPageHref('available')

function getFeaturedBadge(model: BoatModel, t: (key: string) => string): string {
  if (model.isOffer) return t('featured.badgeOffer')
  if (model.isUsed) return t('featured.badgeUsed')
  return t('featured.badgeReady')
}

export function FeaturedBoats() {
  const { t } = useTranslation()
  const highlightedBoats = getHighlightedBoats()

  if (highlightedBoats.length === 0) {
    return null
  }

  return (
    <section id="featured-boats" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">{t('featured.eyebrow')}</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 text-pretty">{t('featured.title')}</h2>
          </div>
          <Button variant="outline" className="self-start md:self-auto" asChild>
            <Link href={boatsCatalogHref}>
              {t('featured.viewAll')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlightedBoats.map(({ brand, model }) => {
            const detailHref = getModelPathFromHome(brand, model)
            const badge = getFeaturedBadge(model, t)
            const power = model.specs.maxPower ?? model.specs.motor

            return (
              <Card
                key={`${brand.id}-${model.id}`}
                className="group overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <CardHeader className="p-0 relative">
                  <Link href={detailHref} className="block relative h-52 overflow-hidden">
                    <ProductImage
                      src={model.image}
                      alt={model.name}
                      category={brand.category}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="font-semibold">
                        {badge}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="flex items-center gap-1.5 text-xs font-medium bg-green-500/90 text-white px-2 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        {t('featured.available')}
                      </span>
                    </div>
                  </Link>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-xs font-medium text-muted-foreground mb-1">{brand.name}</div>
                  <Link href={detailHref}>
                    <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                      {model.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    {model.specs.length && (
                      <div className="flex items-center gap-1">
                        <Ruler className="h-3.5 w-3.5" />
                        <span>{model.specs.length}</span>
                      </div>
                    )}
                    {model.specs.passengers != null && (
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        <span>{model.specs.passengers}</span>
                      </div>
                    )}
                    {power && (
                      <div className="flex items-center gap-1">
                        <Gauge className="h-3.5 w-3.5" />
                        <span>{power}</span>
                      </div>
                    )}
                  </div>

                  {(model.price || model.priceNote) && (
                    <div className="border-t pt-3">
                      {model.price && (
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-foreground">{model.price}</span>
                        </div>
                      )}
                      {model.priceNote && (
                        <span className="text-xs text-muted-foreground">{model.priceNote}</span>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" variant="default" asChild>
                    <Link href={detailHref}>{t('featured.more')}</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
