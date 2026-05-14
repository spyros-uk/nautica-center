'use client'

import { Check } from 'lucide-react'
import { messages } from '@/lib/i18n/messages'
import { useTranslation } from '@/lib/i18n/context'

const serviceKeys = ['sales', 'trailers', 'workshop', 'storage'] as const

const serviceImages = [
  '/images/placeholder/boat-sales.png',
  '/images/placeholder/trailers-category-hero.jpeg',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  '/images/placeholder/parking-category.jpeg',
]

export function ServicesSection() {
  const { t, locale } = useTranslation()

  return (
    <section id="services" className="py-20 md:py-32 bg-background scroll-mt-28 md:scroll-mt-36">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">{t('services.eyebrow')}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {serviceKeys.map((key, index) => {
            const title = t(`services.${key}.title`)
            const features = messages[locale].services[key].features

            return (
              <div
                key={key}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                    <img
                      src={serviceImages[index]}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{title}</h3>
                  <p className="text-muted-foreground text-lg mb-6">{t(`services.${key}.description`)}</p>

                  <ul className="space-y-3">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                          <Check className="h-3 w-3 text-accent" />
                        </span>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
