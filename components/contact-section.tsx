'use client'

import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Κατάστημα',
    lines: ['Αστέρια Αγριάς', 'Βόλος, Τ.Κ. 37300'],
  },
  {
    icon: Phone,
    title: 'Τηλέφωνα',
    lines: ['+30 24280 91700', '+30 6957 046616 (Χρήστος)'],
  },
  {
    icon: MapPin,
    title: 'Εργοστάσιο Τρέιλερ',
    lines: ["Α' ΒΙ.ΠΕ. Βόλου", '+30 24210 96888'],
  },
  {
    icon: Clock,
    title: 'Ωράριο',
    lines: ['Δευ - Παρ: 09:00 - 18:00', 'Σάβ: 09:00 - 14:00'],
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left side - Info */}
          <div>
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Επικοινωνία</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
              Ελάτε να τα πούμε
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Επισκεφθείτε το κατάστημά μας στον Βόλο ή επικοινωνήστε μαζί μας για οποιαδήποτε πληροφορία.
            </p>

            {/* Contact cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item) => (
                <Card key={item.title} className="bg-card border-0 shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        {item.lines.map((line) => (
                          <p key={line} className="text-sm text-muted-foreground">{line}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mt-8 rounded-xl overflow-hidden shadow-lg h-64 bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.8!2d22.9833!3d39.3167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDE5JzAwLjEiTiAyMsKwNTknMDAuMCJF!5e0!3m2!1sen!2sgr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nautica Center Location"
              />
            </div>
          </div>

          {/* Right side - Form */}
          <div>
            <Card className="bg-card border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">Στείλτε μας μήνυμα</h3>
                <p className="text-muted-foreground mb-6">
                  Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε μαζί σας σύντομα.
                </p>

                <form className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Όνομα</label>
                      <Input id="name" placeholder="Το όνομά σας" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Τηλέφωνο</label>
                      <Input id="phone" placeholder="Το τηλέφωνό σας" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="Το email σας" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Θέμα</label>
                    <Input id="subject" placeholder="πχ. Ενδιαφέρομαι για σκάφος" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Μήνυμα</label>
                    <Textarea id="message" placeholder="Γράψτε το μήνυμά σας..." rows={5} />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Αποστολή Μηνύματος
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
