import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { AppProviders } from '@/components/app-providers'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin', 'greek'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Nautica Center | Σκάφη, Τρέιλερ & Ναυτιλιακός Εξοπλισμός - Βόλος',
  description: 'Αντιπροσωπεία σκαφών Quicksilver, ZAR, MV Marine. Τρέιλερ ΔΡΟΜΕΥΣ, εξωλέμβιες Mercury, Yamaha, Honda. Ναυτιλιακός εξοπλισμός στον Βόλο.',
  keywords: ['σκάφη', 'τρέιλερ', 'εξωλέμβιες', 'Βόλος', 'Quicksilver', 'ZAR', 'MV Marine', 'Mercury', 'Yamaha', 'φουσκωτά σκάφη', 'ναυτιλιακός εξοπλισμός'],
  authors: [{ name: 'Nautica Center' }],
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    type: 'website',
    locale: 'el_GR',
    url: 'https://nautica-center.gr',
    title: 'Nautica Center | Σκάφη & Ναυτιλιακός Εξοπλισμός',
    description: 'Η μεγαλύτερη γκάμα σκαφών και ναυτιλιακού εξοπλισμού στον Βόλο',
    siteName: 'Nautica Center',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a365d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="el" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
