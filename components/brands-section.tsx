'use client'

import { useTranslation } from '@/lib/i18n/context'

const brands = [
  { name: 'Quicksilver', typeKey: 'fiberglass' },
  { name: 'ZAR Formenti', typeKey: 'inflatable' },
  { name: 'MV Marine', typeKey: 'inflatable' },
  { name: 'ZAR Mini', typeKey: 'inflatable' },
  { name: 'Mercury', typeKey: 'outboards' },
  { name: 'Yamaha', typeKey: 'outboardsJetski' },
  { name: 'Honda', typeKey: 'outboards' },
  { name: 'Marinello', typeKey: 'fiberglass' },
  { name: 'Eolo', typeKey: 'fiberglass' },
  { name: 'BMA', typeKey: 'fiberglass' },
  { name: 'Suzuki', typeKey: 'outboards' },
  { name: 'Jobe', typeKey: 'sup' },
  { name: 'SeaFlow', typeKey: 'supKayak' },
  { name: 'Aquablue', typeKey: 'ebikes' },
  { name: 'ΔΡΟΜΕΥΣ', typeKey: 'trailers' },
  { name: 'Olympic', typeKey: 'fiberglass' },
  { name: 'YAM', typeKey: 'inflatable' },
] as const

export function BrandsSection() {
  const { t } = useTranslation()

  return (
    <section id="brands" className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">{t('brands.eyebrow')}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            {t('brands.title')}
          </h2>
          <p className="text-lg text-primary-foreground/70">
            {t('brands.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group flex flex-col items-center justify-center p-6 rounded-lg bg-primary-foreground/5 hover:bg-primary-foreground/10 border border-primary-foreground/10 hover:border-accent/50 transition-all duration-300"
            >
              <span className="text-lg md:text-xl font-bold text-center mb-1">{brand.name}</span>
              <span className="text-xs text-primary-foreground/50">{t(`brands.types.${brand.typeKey}`)}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-accent mb-2">100%</div>
            <div className="text-sm text-primary-foreground/70">{t('brands.genuine')}</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-accent mb-2">{t('brands.warrantyYears')}</div>
            <div className="text-sm text-primary-foreground/70">{t('brands.warranty')}</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-accent mb-2">{t('brands.supportBadge')}</div>
            <div className="text-sm text-primary-foreground/70">{t('brands.support')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
