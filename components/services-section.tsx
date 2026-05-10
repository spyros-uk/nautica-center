'use client'

import { Check } from 'lucide-react'

const services = [
  {
    title: 'Πωλήσεις Σκαφών',
    description: 'Αποκλειστική αντιπροσώπευση κορυφαίων εργοστασίων. Καινούργια και μεταχειρισμένα σκάφη όλων των τύπων.',
    features: ['Πολυεστερικά σκάφη', 'Φουσκωτά σκάφη', 'Jet Ski', 'Ποδήλατα θαλάσσης'],
    image: 'https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?w=800&q=80',
  },
  {
    title: 'Κατασκευή Τρέιλερ',
    description: 'Ιδιόκτητο εργοστάσιο κατασκευής τρέιλερ ΔΡΟΜΕΥΣ. Προσαρμοσμένα σε κάθε τύπο σκάφους.',
    features: ['Custom κατασκευές', 'Γαλβανισμένος χάλυβας', 'Ανταλλακτικά', 'Επισκευές'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    title: 'Συνεργείο & Service',
    description: 'Πλήρως εξοπλισμένο συνεργείο με έμπειρους τεχνικούς. Συντήρηση και επισκευή όλων των μηχανών.',
    features: ['Εξειδικευμένο προσωπικό', 'Σύγχρονος εξοπλισμός', 'Γρήγορη εξυπηρέτηση', 'Ανταγωνιστικές τιμές'],
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80',
  },
  {
    title: 'Φύλαξη Σκαφών',
    description: 'Στεγασμένος χώρος φύλαξης με 24ωρη επιτήρηση. Ανέλκυση και καθέλκυση σκαφών.',
    features: ['Κλειστός χώρος', '24ωρη φύλαξη', 'Ανέλκυση/Καθέλκυση', 'Χειμερινή συντήρηση'],
    image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&q=80',
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Υπηρεσίες</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Ολοκληρωμένες Λύσεις
          </h2>
          <p className="text-lg text-muted-foreground">
            Από την αγορά του σκάφους σας μέχρι τη συντήρησή του, είμαστε δίπλα σας σε κάθε βήμα.
          </p>
        </div>

        {/* Services list */}
        <div className="space-y-16 md:space-y-24">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground text-lg mb-6">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                        <Check className="h-3 w-3 text-accent" />
                      </span>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
