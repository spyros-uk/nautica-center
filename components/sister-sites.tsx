'use client'

import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

const sisterSites = [
  {
    name: 'EWater Sports',
    description: 'Θαλάσσια σπορ, Jet Ski Yamaha, SUP, Kayak, σωσίβια και αξεσουάρ',
    url: 'https://ewatersports.gr/',
    color: 'from-cyan-500 to-teal-600',
    features: ['Jet Ski Yamaha', 'SUP Jobe', 'Kayak Seaflo & Cobo', 'Σωσίβια', 'Sea Scooters'],
  },
  {
    name: 'Dromeys Trailers',
    description: 'Τρέιλερ σκαφών ελληνικής κατασκευής - Ποιότητα και αντοχή',
    url: 'https://dromeys.gr/',
    color: 'from-blue-600 to-indigo-700',
    features: ['Τρέιλερ Σκαφών', 'Ελληνική Κατασκευή', 'Ανταλλακτικά', 'Εξαρτήματα'],
  },
]

export function SisterSites() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Οι Εταιρείες μας</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4 text-pretty">
            Ένας όμιλος, πλήρεις λύσεις
          </h2>
          <p className="text-lg text-muted-foreground">
            Εξερευνήστε τις εξειδικευμένες ιστοσελίδες μας για θαλάσσια σπορ και τρέιλερ σκαφών
          </p>
        </div>

        {/* Sister sites cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {sisterSites.map((site) => (
            <a
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${site.color} opacity-95`} />
              
              {/* Content */}
              <div className="relative p-8 md:p-10 text-white min-h-[320px] flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{site.name}</h3>
                    <p className="text-white/80 text-sm md:text-base max-w-sm">
                      {site.description}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                </div>

                {/* Features */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {site.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium backdrop-blur-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                  <span>Επισκεφθείτε το {site.name}</span>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
