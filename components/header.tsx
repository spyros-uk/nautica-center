'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { LanguageToggle } from '@/components/language-toggle'
import { useTranslation } from '@/lib/i18n/context'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/boats', label: t('nav.boats') },
    { href: '/outboards', label: t('nav.outboards') },
    { href: '/parts', label: t('nav.parts') },
    { href: '/#services', label: t('nav.services') },
    { href: '/#companies', label: t('nav.companies') },
    { href: '/#contact', label: t('nav.contact') },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md text-primary-foreground">
      <div className="hidden md:block border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+302428091700" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="h-3.5 w-3.5" />
                <span>+30 24280 91700</span>
              </a>
              <a href="mailto:info@nautica-center.gr" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="h-3.5 w-3.5" />
                <span>info@nautica-center.gr</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <MapPin className="h-3.5 w-3.5" />
              <span>{t('header.location')}</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="container mx-auto px-4">
        <div className="flex items-center gap-3 xl:gap-6 h-16 md:h-20">
          <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="relative">
              <svg viewBox="0 0 40 40" className="h-9 w-9 md:h-10 md:w-10 xl:h-12 xl:w-12" fill="none">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
                <path d="M12 28 L20 10 L28 28 L20 24 Z" fill="currentColor" />
                <path d="M20 28 L20 32" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-lg xl:text-xl font-bold tracking-tight">NAUTICA</span>
              <span className="text-[10px] md:text-xs xl:text-sm font-medium tracking-widest opacity-80">CENTER</span>
            </div>
          </Link>

          <div className="hidden xl:flex flex-1 items-center justify-center gap-x-3 2xl:gap-x-5 min-w-0 px-2 2xl:px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium whitespace-nowrap hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex shrink-0 items-center gap-3">
            <LanguageToggle variant="header" />
            <Link href="/#contact">
              <Button variant="secondary" size="sm" className="font-semibold xl:text-sm 2xl:h-9 2xl:px-4">
                {t('nav.requestQuote')}
              </Button>
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-2 xl:hidden">
            <LanguageToggle variant="header" />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">{t('nav.openMenu')}</span>
                </Button>
              </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[min(100vw-1rem,20rem)] flex-col gap-0 border-primary-foreground/10 bg-primary px-6 pb-8 pt-14 text-primary-foreground sm:max-w-xs [&_[data-slot=sheet-close]]:text-primary-foreground [&_[data-slot=sheet-close]]:opacity-80 [&_[data-slot=sheet-close]]:hover:opacity-100"
            >
              <div className="flex h-full min-h-0 flex-col">
                <div className="mb-6 pr-10">
                  <span className="text-lg font-bold">{t('nav.menu')}</span>
                </div>
                <nav className="flex flex-col">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium py-3.5 border-b border-primary-foreground/10 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto space-y-4 border-t border-primary-foreground/10 pt-8">
                  <a href="tel:+302428091700" className="flex items-center gap-3 text-sm text-primary-foreground/90">
                    <Phone className="h-4 w-4" />
                    <span>+30 24280 91700</span>
                  </a>
                  <a href="mailto:info@nautica-center.gr" className="flex items-center gap-3 text-sm text-primary-foreground/90 break-all">
                    <Mail className="h-4 w-4" />
                    <span>info@nautica-center.gr</span>
                  </a>
                  <Link href="/#contact" onClick={() => setIsOpen(false)}>
                    <Button variant="secondary" className="w-full mt-4">
                      {t('nav.requestQuote')}
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
