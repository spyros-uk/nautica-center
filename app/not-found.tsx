import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-24 text-center">
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">
          404
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Η σελίδα δεν βρέθηκε</h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Ο σύνδεσμος μπορεί να είναι λανθασμένος ή η σελίδα να έχει μετακινηθεί.
        </p>
        <Button asChild>
          <Link href="/">Επιστροφή στην αρχική</Link>
        </Button>
      </div>
      <Footer />
    </main>
  )
}
