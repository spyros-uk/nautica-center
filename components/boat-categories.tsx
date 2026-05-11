'use client'

import Link from 'next/link'
import { ArrowRight, Sailboat, Anchor, Waves, Car, Wrench, Shield, Bike, LifeBuoy, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const categories = [
  {
    title: 'Φουσκωτά Σκάφη',
    description: 'ZAR Formenti, ZAR Mini, MV Marine, YAM - Ιταλικής κατασκευής RIB',
    icon: Waves,
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=600&q=80',
    href: '/boats#inflatable',
  },
  {
    title: 'Πολυεστερικά Σκάφη',
    description: 'Quicksilver, Marinello, Eolo, BMA, Olympic - από 4.5 έως 9 μέτρα',
    icon: Sailboat,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
    href: '/boats#fiberglass',
  },
  {
    title: 'Εξωλέμβιες',
    description: 'Mercury, Yamaha, Honda, Tohatsu, Suzuki - Όλες οι ιπποδυνάμεις',
    icon: Anchor,
    image: 'https://images.unsplash.com/photo-1597431362048-94c8ded1a64d?w=600&q=80',
    href: '/outboards',
  },
  {
    title: 'Τρέιλερ ΔΡΟΜΕΥΣ',
    description: 'Ελληνική κατασκευή - Για κάθε τύπο σκάφους',
    icon: Car,
    image: 'https://images.unsplash.com/photo-1600320254374-ce2d293c324e?w=600&q=80',
    href: 'https://dromeys.gr/',
    external: true,
  },
  {
    title: 'Jet Ski & Θαλάσσια Σπορ',
    description: 'Yamaha Jet Ski, SUP, Kayak, Sea Scooters',
    icon: Bike,
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80',
    href: 'https://ewatersports.gr/',
    external: true,
  },
  {
    title: 'Συνεργείο & Service',
    description: 'Εξειδικευμένο προσωπικό - Σύγχρονος εξοπλισμός - Ανταλλακτικά',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    href: '/#services',
  },
]

export function BoatCategories() {
  return (
    <section id="boats" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-4xl mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Κατηγορίες</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4 text-pretty">
            Όλα όσα χρειάζεστε για τη θάλασσα
          </h2>
          <p className="text-lg text-muted-foreground">
            Από μικρά φουσκωτά μέχρι πολυτελή σκάφη αναψυχής, jet ski, SUP, kayak και όλα τα αξεσουάρ για κάθε θαλασσόφιλο.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const isExternal = 'external' in category && category.external
            
            const CardInner = (
              <>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 p-2 rounded-lg bg-primary-foreground/10 backdrop-blur-sm">
                    <category.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  {isExternal && (
                    <div className="absolute top-4 right-4 px-2 py-1 rounded bg-accent text-accent-foreground text-xs font-semibold flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      Εξειδικευμένο Site
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center text-accent font-semibold group-hover:gap-3 gap-2 transition-all">
                    {isExternal ? 'Επισκεφθείτε' : 'Περισσότερα'}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </>
            )

            if (isExternal) {
              return (
                <a
                  key={category.title}
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
                key={category.title}
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
            Δείτε όλα τα σκάφη
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
