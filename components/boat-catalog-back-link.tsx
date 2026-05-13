'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

type BoatCatalogBackLinkProps = {
  catalogHref: string
  catalogLabel: string
}

export function BoatCatalogBackLink({ catalogHref, catalogLabel }: BoatCatalogBackLinkProps) {
  const searchParams = useSearchParams()
  const fromHome = searchParams.get('from') === 'home'

  const href = fromHome ? '/#featured-boats' : catalogHref
  const label = fromHome ? 'Πίσω στην αρχική' : catalogLabel

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Link>
  )
}
