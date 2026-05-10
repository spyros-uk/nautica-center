import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { BoatCategories } from '@/components/boat-categories'
import { FeaturedBoats } from '@/components/featured-boats'
import { SisterSites } from '@/components/sister-sites'
import { ServicesSection } from '@/components/services-section'
import { BrandsSection } from '@/components/brands-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <BoatCategories />
      <FeaturedBoats />
      <SisterSites />
      <ServicesSection />
      <BrandsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
