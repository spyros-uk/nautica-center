'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Ruler, Users, Gauge } from 'lucide-react'

const featuredBoats = [
  {
    id: 1,
    name: 'MARINELLO FISHERMAN 16',
    brand: 'Marinello',
    price: '€20.500',
    priceNote: 'με Mercury F60 & τρέιλερ',
    length: '4.85m',
    passengers: '5',
    power: '60HP',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80',
    tag: 'Προσφορά',
    available: true,
  },
  {
    id: 2,
    name: 'EOLO 650 DAY',
    brand: 'Eolo',
    price: '€26.000',
    priceNote: 'Ετοιμοπαράδοτο',
    length: '6.50m',
    passengers: '7',
    power: '150HP',
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=600&q=80',
    tag: 'Νέο',
    available: true,
  },
  {
    id: 3,
    name: 'ZAR MINI LUX 18H',
    brand: 'ZAR Formenti',
    price: '€19.000',
    priceNote: 'Hypalon Neopren',
    length: '5.50m',
    passengers: '8',
    power: '115HP',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
    tag: 'Δημοφιλές',
    available: true,
  },
  {
    id: 4,
    name: 'MV MARINE MITO 29',
    brand: 'MV Marine',
    price: 'Κατόπιν',
    priceNote: 'Πλήρως εξοπλισμένο',
    length: '8.90m',
    passengers: '12',
    power: '350HP',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
    tag: 'Premium',
    available: true,
  },
]

export function FeaturedBoats() {
  return (
    <section className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Ετοιμοπαράδοτα</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 text-pretty">
              Διαθέσιμα Σκάφη
            </h2>
          </div>
          <Button variant="outline" className="self-start md:self-auto">
            Δείτε όλα τα σκάφη
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Boats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBoats.map((boat) => (
            <Card key={boat.id} className="group overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-0 relative">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={boat.image}
                    alt={boat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="font-semibold">
                      {boat.tag}
                    </Badge>
                  </div>
                  {boat.available && (
                    <div className="absolute top-3 right-3">
                      <span className="flex items-center gap-1.5 text-xs font-medium bg-green-500/90 text-white px-2 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        Διαθέσιμο
                      </span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-xs font-medium text-muted-foreground mb-1">{boat.brand}</div>
                <h3 className="font-bold text-lg mb-2 line-clamp-1">{boat.name}</h3>
                
                {/* Specs */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Ruler className="h-3.5 w-3.5" />
                    <span>{boat.length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>{boat.passengers}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Gauge className="h-3.5 w-3.5" />
                    <span>{boat.power}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="border-t pt-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-foreground">{boat.price}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{boat.priceNote}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" variant="default">
                  Περισσότερα
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
