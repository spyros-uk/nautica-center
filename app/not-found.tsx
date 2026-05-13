import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NotFoundClient } from '@/components/not-found-client'

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Header />
      <NotFoundClient />
      <Footer />
    </main>
  )
}
