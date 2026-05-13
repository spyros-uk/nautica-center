'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md text-primary-foreground">
      {/* Top bar with contact info */}
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
              <span>Αστέρια Αγριάς, Βόλος</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <svg viewBox="0 0 40 40" className="h-10 w-10 md:h-12 md:w-12" fill="none">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
                <path d="M12 28 L20 10 L28 28 L20 24 Z" fill="currentColor" />
                <path d="M20 28 L20 32" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold tracking-tight">NAUTICA</span>
              <span className="text-xs md:text-sm font-medium tracking-widest opacity-80">CENTER</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Αρχική
            </Link>

            <Link
              href="/boats"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Σκάφη
            </Link>

            <Link
              href="/outboards"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Εξωλέμβιες
            </Link>

            {/* Ανταλλακτικά */}
            <Link
              href="/parts"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Ανταλλακτικά
            </Link>

            <Link
              href="/#services"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Υπηρεσίες
            </Link>

            <Link
              href="/#companies"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Οι Εταιρείες μας
            </Link>

            <Link
              href="/#contact"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Επικοινωνία
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/#contact">
              <Button variant="secondary" className="font-semibold">
                Ζητήστε Προσφορά
              </Button>
            </Link>
          </div>

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-primary-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Άνοιγμα μενού</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[min(100vw-1rem,20rem)] flex-col gap-0 border-primary-foreground/10 bg-primary px-6 pb-8 pt-14 text-primary-foreground sm:max-w-xs [&_[data-slot=sheet-close]]:text-primary-foreground [&_[data-slot=sheet-close]]:opacity-80 [&_[data-slot=sheet-close]]:hover:opacity-100"
            >
              <div className="flex h-full min-h-0 flex-col">
                <div className="mb-6 pr-10">
                  <span className="text-lg font-bold">Μενού</span>
                </div>
                <nav className="flex flex-col">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium py-3.5 border-b border-primary-foreground/10 hover:text-accent transition-colors"
                  >
                    Αρχική
                  </Link>

                  <Link
                    href="/boats"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium py-3.5 border-b border-primary-foreground/10 hover:text-accent transition-colors"
                  >
                    Σκάφη
                  </Link>

                  <Link
                    href="/outboards"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium py-3.5 border-b border-primary-foreground/10 hover:text-accent transition-colors"
                  >
                    Εξωλέμβιες
                  </Link>

                  <Link
                    href="/parts"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium py-3.5 border-b border-primary-foreground/10 hover:text-accent transition-colors"
                  >
                    Ανταλλακτικά
                  </Link>

                  <Link
                    href="/#services"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium py-3.5 border-b border-primary-foreground/10 hover:text-accent transition-colors"
                  >
                    Υπηρεσίες
                  </Link>

                  <Link
                    href="/#companies"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium py-3.5 border-b border-primary-foreground/10 hover:text-accent transition-colors"
                  >
                    Οι Εταιρείες μας
                  </Link>

                  <Link
                    href="/#contact"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium py-3.5 border-b border-primary-foreground/10 hover:text-accent transition-colors"
                  >
                    Επικοινωνία
                  </Link>
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
                      Ζητήστε Προσφορά
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
