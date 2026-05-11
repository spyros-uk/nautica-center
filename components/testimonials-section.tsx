'use client'

import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    name: 'Γιώργος Κ.',
    location: 'Βόλος',
    rating: 5,
    text: 'Άψογη εξυπηρέτηση! Αγόρασα το σκάφος μου πριν 3 χρόνια και είμαι απόλυτα ευχαριστημένος. Το συνεργείο τους είναι αξιόπιστο.',
    boat: 'Quicksilver 555',
  },
  {
    name: 'Μαρία Π.',
    location: 'Σκιάθος',
    rating: 5,
    text: 'Εξαιρετική ομάδα με μεγάλη εμπειρία. Με βοήθησαν να βρω το ιδανικό φουσκωτό για τις ανάγκες μου.',
    boat: 'ZAR Mini LUX 14',
  },
  {
    name: 'Νίκος Α.',
    location: 'Αλμυρός',
    rating: 5,
    text: 'Τα τρέιλερ ΔΡΟΜΕΥΣ είναι κορυφαία ποιότητα. Ελληνική κατασκευή με προσοχή στη λεπτομέρεια.',
    boat: 'Τρέιλερ ΔΡΟΜΕΥΣ',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Μαρτυρίες</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Τι λένε οι πελάτες μας
          </h2>
          <p className="text-lg text-muted-foreground">
            Η εμπιστοσύνη των πελατών μας είναι η μεγαλύτερη επιβράβευσή μας.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-0 shadow-lg relative">
              <CardContent className="p-8">
                <Quote className="h-10 w-10 text-accent/20 absolute top-6 right-6" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-foreground mb-6 text-pretty leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="border-t pt-4">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  <div className="text-xs text-accent font-medium mt-1">{testimonial.boat}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
