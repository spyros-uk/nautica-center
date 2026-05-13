'use client'

import Link from 'next/link'
import { ArrowRight, Sailboat, Anchor, Waves, Car, Wrench, Bike, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getBoatsPageHref } from '@/lib/product-filters-storage'
import { useTranslation } from '@/lib/i18n/context'

const categories = [
  {
    key: 'inflatable' as const,
    icon: Waves,
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=600&q=80',
    href: getBoatsPageHref({ category: 'inflatable' }),
  },
  {
    key: 'fiberglass' as const,
    icon: Sailboat,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
    href: getBoatsPageHref({ category: 'fiberglass' }),
  },
  {
    key: 'outboards' as const,
    icon: Anchor,
    image: '/images/placeholder-engine.jpg',
    href: '/outboards',
  },
  {
    key: 'dromeys' as const,
    icon: Car,
    image: 'https://images.unsplash.com/photo-1600320254374-ce2d293c324e?w=600&q=80',
    href: 'https://dromeys.gr/',
    external: true,
  },
  {
    key: 'watersports' as const,
    icon: Bike,
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80',
    href: 'https://ewatersports.gr/',
    external: true,
  },
  {
    key: 'workshop' as const,
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    href: '/#services',
  },
]

export function BoatCategories() {
  const { t } = useTranslation()

  return (
    <section id="boats" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-4xl mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">{t('homeCategories.eyebrow')}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4 text-pretty">
            {t('homeCategories.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('homeCategories.subtitle')}
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const isExternal = 'external' in category && category.external
            const title = t(`homeCategories.${category.key}.title`)
            const description = t(`homeCategories.${category.key}.description`)

            const CardInner = (
              <>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 p-2 rounded-lg bg-primary-foreground/10 backdrop-blur-sm">
                    <category.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  {isExternal && (
                    <div className="absolute top-4 right-4 px-2 py-1 rounded bg-accent text-accent-foreground text-xs font-semibold flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      {t('homeCategories.externalSite')}
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center text-accent font-semibold group-hover:gap-3 gap-2 transition-all">
                    {isExternal ? t('homeCategories.visit') : t('homeCategories.more')}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </>
            )

            if (isExternal) {
              return (
                <a
                  key={category.key}
                  href={category.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card h-full">
                    {CardInner}
                  </Card>
                </a>
              )
            }

            return (
              <Link
                key={category.key}
                href={category.href}
              >
                <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card h-full">
                  {CardInner}
                </Card>
              </Link>
            )
          })}
        </div>

        {/* View all CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/boats"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            {t('homeCategories.viewAllBoats')}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
