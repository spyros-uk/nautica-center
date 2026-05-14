'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, ExternalLink } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/context'

const footerLinks = {
  products: [
    { key: 'fiberglass' as const, href: '/boats' },
    { key: 'inflatable' as const, href: '/boats' },
    { key: 'outboards' as const, href: '/outboards' },
    { key: 'used' as const, href: '#' },
  ],
  watersports: [
    { key: 'jetski' as const, href: 'https://ewatersports.gr/', external: true },
    { key: 'sup' as const, href: 'https://ewatersports.gr/', external: true },
    { key: 'kayak' as const, href: 'https://ewatersports.gr/', external: true },
    { key: 'scooters' as const, href: 'https://ewatersports.gr/', external: true },
    { key: 'ebikes' as const, href: 'https://ewatersports.gr/', external: true },
    { key: 'safety' as const, href: 'https://ewatersports.gr/', external: true },
  ],
  services: [
    { key: 'workshop' as const, href: '#' },
    { key: 'parts' as const, href: '#' },
    { key: 'storage' as const, href: '#' },
    { key: 'lift' as const, href: '#' },
    { key: 'dromeys' as const, href: 'https://dromeys.gr/', external: true },
  ],
}

const sisterSites = [
  { key: 'ewater' as const, url: 'https://ewatersports.gr/' },
  { key: 'dromeys' as const, url: 'https://dromeys.gr/' },
]

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="bg-accent/10 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-sm font-medium">{t('footer.sisterBanner')}</span>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {sisterSites.map((site) => (
                <a
                  key={site.key}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 hover:bg-accent transition-colors text-sm font-medium"
                >
                  <span>{t(`sisterSites.${site.key}.name`)}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <img
                src="/logo.jpeg"
                alt="Nautica Center"
                className="h-14 w-auto md:h-16 object-contain"
              />
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              {t('footer.about')}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.boats')}</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                    {t(`footer.products.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.watersports')}</h4>
            <ul className="space-y-3">
              {footerLinks.watersports.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {t(`footer.watersportsLinks.${link.key}`)}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.services')}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.key}>
                  {'external' in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                    >
                      {t(`footer.servicesLinks.${link.key}`)}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <Link href={link.href} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                      {t(`footer.servicesLinks.${link.key}`)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+302428091700" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>+30 24280 91700</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@nautica-center.gr" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>info@nautica-center.gr</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-primary-foreground/70 text-sm">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <p>{t('footer.addressLine1')}</p>
                    <p>{t('footer.addressLine2')}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="grid grid-cols-1 gap-3 text-center md:grid-cols-3 md:items-center md:gap-6 md:text-left">
            <p className="text-sm text-primary-foreground/50 md:self-center">
              © {new Date().getFullYear()} Nautica Center. {t('footer.rights')}
            </p>
            <a
              href="https://www.spyros.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-foreground/50 hover:text-accent transition-colors md:justify-self-center md:text-center"
            >
              {t('footer.credit')}
            </a>
            <div className="flex items-center justify-center gap-6 md:justify-self-end">
              <Link href="#" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors">
                {t('footer.terms')}
              </Link>
              <Link href="#" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors">
                {t('footer.privacy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
