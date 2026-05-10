'use client'

const brands = [
  { name: 'Quicksilver', type: 'Πολυεστερικά Σκάφη' },
  { name: 'ZAR Formenti', type: 'Φουσκωτά Σκάφη' },
  { name: 'MV Marine', type: 'Φουσκωτά Σκάφη' },
  { name: 'ZAR Mini', type: 'Φουσκωτά Σκάφη' },
  { name: 'Mercury', type: 'Εξωλέμβιες' },
  { name: 'Yamaha', type: 'Εξωλέμβιες & Jet Ski' },
  { name: 'Honda', type: 'Εξωλέμβιες' },
  { name: 'Marinello', type: 'Πολυεστερικά Σκάφη' },
  { name: 'Eolo', type: 'Πολυεστερικά Σκάφη' },
  { name: 'BMA', type: 'Πολυεστερικά Σκάφη' },
  { name: 'Suzuki', type: 'Εξωλέμβιες' },
  { name: 'Jobe', type: 'SUP & Water Sports' },
  { name: 'Seaflo', type: 'Kayak' },
  { name: 'Cobo', type: 'Kayak' },
  { name: 'Aquablue', type: 'Ποδήλατα Θαλάσσης' },
  { name: 'ΔΡΟΜΕΥΣ', type: 'Τρέιλερ Σκαφών' },
  { name: 'Olympic', type: 'Πολυεστερικά Σκάφη' },
  { name: 'YAM', type: 'Φουσκωτά Σκάφη' },
]

export function BrandsSection() {
  return (
    <section id="brands" className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Συνεργασίες</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Επίσημοι Αντιπρόσωποι
          </h2>
          <p className="text-lg text-primary-foreground/70">
            Συνεργαζόμαστε αποκλειστικά με τους κορυφαίους κατασκευαστές σκαφών και ναυτιλιακού εξοπλισμού παγκοσμίως.
          </p>
        </div>

        {/* Brands grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group flex flex-col items-center justify-center p-6 rounded-lg bg-primary-foreground/5 hover:bg-primary-foreground/10 border border-primary-foreground/10 hover:border-accent/50 transition-all duration-300"
            >
              <span className="text-lg md:text-xl font-bold text-center mb-1">{brand.name}</span>
              <span className="text-xs text-primary-foreground/50">{brand.type}</span>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-accent mb-2">100%</div>
            <div className="text-sm text-primary-foreground/70">Γνήσια Προϊόντα</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-accent mb-2">2 Χρόνια</div>
            <div className="text-sm text-primary-foreground/70">Εργοστασιακή Εγγύηση</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-accent mb-2">Άμεση</div>
            <div className="text-sm text-primary-foreground/70">Τεχνική Υποστήριξη</div>
          </div>
        </div>
      </div>
    </section>
  )
}
