'use client'

import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslation } from '@/lib/i18n/context'

type ContactLine = {
  text: string
  href?: string
}

export function ContactSection() {
  const { t } = useTranslation()

  const contactInfo: {
    icon: typeof MapPin
    titleKey: string
    lines: ContactLine[]
  }[] = [
    {
      icon: MapPin,
      titleKey: 'contact.store',
      lines: [
        { text: 'Αστέρια Αγριάς' },
        { text: 'Βόλος, Τ.Κ. 37300' },
      ],
    },
    {
      icon: Phone,
      titleKey: 'contact.phones',
      lines: [
        { text: '+30 24280 91700', href: 'tel:+302428091700' },
        { text: '+30 6957 046616 (Χρήστος)', href: 'tel:+306957046616' },
      ],
    },
    {
      icon: MapPin,
      titleKey: 'contact.trailerFactory',
      lines: [
        { text: "Α' ΒΙ.ΠΕ. Βόλου" },
        { text: '+30 24210 96888', href: 'tel:+302421096888' },
      ],
    },
    {
      icon: Clock,
      titleKey: 'contact.hours',
      lines: [
        { text: t('contact.hoursWeek') },
        { text: t('contact.hoursSat') },
      ],
    },
  ]

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30 scroll-mt-28 md:scroll-mt-36">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mb-12 md:mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">{t('contact.eyebrow')}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item) => (
                <Card key={item.titleKey} className="bg-card border-0 shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{t(item.titleKey)}</h4>
                        {item.lines.map((line) =>
                          line.href ? (
                            <a
                              key={line.text}
                              href={line.href}
                              className="block text-sm text-muted-foreground hover:text-accent transition-colors"
                            >
                              {line.text}
                            </a>
                          ) : (
                            <p key={line.text} className="text-sm text-muted-foreground">
                              {line.text}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 rounded-xl overflow-hidden shadow-lg h-64 bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3085.215394111304!2d22.99043387721869!3d39.351358619789394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a76cacef23cbe7%3A0x1d636d9cb793f9a7!2sNautica%20Center!5e0!3m2!1sen!2sus!4v1778458837664!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('contact.mapTitle')}
              />
            </div>
          </div>

          <div>
            <Card className="bg-card border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">{t('contact.formTitle')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('contact.formSubtitle')}
                </p>

                <form className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">{t('contact.name')}</label>
                      <Input id="name" placeholder={t('contact.namePlaceholder')} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">{t('contact.phone')}</label>
                      <Input id="phone" placeholder={t('contact.phonePlaceholder')} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">{t('contact.email')}</label>
                    <Input id="email" type="email" placeholder={t('contact.emailPlaceholder')} />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">{t('contact.subject')}</label>
                    <Input id="subject" placeholder={t('contact.subjectPlaceholder')} />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">{t('contact.message')}</label>
                    <Textarea id="message" placeholder={t('contact.messagePlaceholder')} rows={5} />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    {t('contact.submit')}
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
