'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/context'

type BoatCatalogBackLinkProps = {
  catalogHref: string
}

export function BoatCatalogBackLink({ catalogHref }: BoatCatalogBackLinkProps) {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const fromHome = searchParams.get('from') === 'home'

  const href = fromHome ? '/#featured-boats' : catalogHref
  const label = fromHome ? t('catalog.backHome') : t('catalog.backBoats')

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
