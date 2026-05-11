'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src="/images/hero-boat.jpg" 
          alt="Σκάφος στην θάλασσα" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
      </div>
      
      {/* Animated wave pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="absolute bottom-0 w-full h-64" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="currentColor" 
            className="text-primary-foreground animate-wave"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <svg className="absolute bottom-0 w-full h-48" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ animationDelay: '0.5s' }}>
          <path 
            fill="currentColor" 
            className="text-primary-foreground/50 animate-wave"
            d="M0,256L48,261.3C96,267,192,277,288,272C384,267,480,245,576,224C672,203,768,181,864,186.7C960,192,1056,224,1152,229.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-32">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Από το 1985 στη θάλασσα
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
            Η Πύλη σας στη
            <span className="block text-accent">Θάλασσα</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8 text-pretty">
            Αντιπροσωπεία κορυφαίων σκαφών, κατασκευή τρέιλερ και πλήρης ναυτιλιακός εξοπλισμός. 
            Η εμπιστοσύνη σας στη θάλασσα ξεκινά από εδώ.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base font-semibold px-8">
              Δείτε τα Σκάφη μας
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto text-base font-semibold px-8 border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
            >
              <Link href="/#contact">Επικοινωνήστε μαζί μας</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-24 pt-8 border-t border-primary-foreground/20">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">40+</div>
              <div className="text-sm text-primary-foreground/70 mt-1">Χρόνια Εμπειρίας</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">15+</div>
              <div className="text-sm text-primary-foreground/70 mt-1">Μάρκες Σκαφών</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">500+</div>
              <div className="text-sm text-primary-foreground/70 mt-1">Ικανοποιημένοι Πελάτες</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">100%</div>
              <div className="text-sm text-primary-foreground/70 mt-1">Γνήσια Ανταλλακτικά</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
