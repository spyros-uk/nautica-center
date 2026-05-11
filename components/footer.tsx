import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, ExternalLink } from 'lucide-react'

const footerLinks = {
  products: [
    { name: 'Πολυεστερικά Σκάφη', href: '/boats' },
    { name: 'Φουσκωτά Σκάφη', href: '/boats' },
    { name: 'Εξωλέμβιες', href: '/outboards' },
    { name: 'Μεταχειρισμένα', href: '#' },
  ],
  watersports: [
    { name: 'Jet Ski Yamaha', href: 'https://ewatersports.gr/', external: true },
    { name: 'SUP', href: 'https://ewatersports.gr/', external: true },
    { name: 'Kayak', href: 'https://ewatersports.gr/', external: true },
    { name: 'Sea Scooters', href: 'https://ewatersports.gr/', external: true },
    { name: 'Ποδήλατα Θαλάσσης', href: 'https://ewatersports.gr/', external: true },
    { name: 'Σωσίβια & Γιλέκα', href: 'https://ewatersports.gr/', external: true },
  ],
  services: [
    { name: 'Συνεργείο', href: '#' },
    { name: 'Ανταλλακτικά', href: '#' },
    { name: 'Φύλαξη Σκαφών', href: '#' },
    { name: 'Ανέλκυση/Καθέλκυση', href: '#' },
    { name: 'Τρέιλερ ΔΡΟΜΕΥΣ', href: 'https://dromeys.gr/', external: true },
  ],
  brands: [
    { name: 'Quicksilver', href: '#' },
    { name: 'ZAR Formenti', href: '#' },
    { name: 'MV Marine', href: '#' },
    { name: 'Mercury', href: '#' },
    { name: 'Yamaha', href: '#' },
  ],
}

const sisterSites = [
  { name: 'EWater Sports', description: 'Θαλάσσια σπορ & Jet Ski', url: 'https://ewatersports.gr/' },
  { name: 'Dromeys Trailers', description: 'Τρέιλερ Σκαφών', url: 'https://dromeys.gr/' },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Sister sites banner */}
      <div className="bg-accent/10 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-sm font-medium">Επισκεφθείτε τις εξειδικευμένες ιστοσελίδες μας:</span>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {sisterSites.map((site) => (
                <a
                  key={site.name}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 hover:bg-accent transition-colors text-sm font-medium"
                >
                  <span>{site.name}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative">
                <svg viewBox="0 0 40 40" className="h-12 w-12" fill="none">
                  <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 28 L20 10 L28 28 L20 24 Z" fill="currentColor" />
                  <path d="M20 28 L20 32" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">NAUTICA</span>
                <span className="text-sm font-medium tracking-widest opacity-80">CENTER</span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Από το 1985, ο αξιόπιστος συνεργάτης σας στη θάλασσα. 
              Αντιπροσωπεία σκαφών, κατασκευή τρέιλερ, θαλάσσια σπορ και πλήρης ναυτιλιακός εξοπλισμός.
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

          {/* Products */}
          <div>
            <h4 className="font-bold text-lg mb-4">Σκάφη</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Water Sports */}
          <div>
            <h4 className="font-bold text-lg mb-4">Θαλάσσια Σπορ</h4>
            <ul className="space-y-3">
              {footerLinks.watersports.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Υπηρεσίες</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  {'external' in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                    >
                      {link.name}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <Link href={link.href} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Επικοινωνία</h4>
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
                    <p>Αστέρια Αγριάς</p>
                    <p>Βόλος, Τ.Κ. 37300</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/50">
              © {new Date().getFullYear()} Nautica Center. Όλα τα δικαιώματα κατοχυρωμένα.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors">
                Όροι Χρήσης
              </Link>
              <Link href="#" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors">
                Πολιτική Απορρήτου
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-primary-foreground/40">
              Designed & Developed by{' '}
              <a 
                href="https://www.spyros.uk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-accent transition-colors"
              >
                Spyros Papaioannou
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
