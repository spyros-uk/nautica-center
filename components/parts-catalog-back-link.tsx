'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/context'

type PartsCatalogBackLinkProps = {
  href: string
  brandName?: string
  className?: string
}

export function PartsCatalogBackLink({
  href,
  brandName,
  className = 'inline-flex shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors',
}: PartsCatalogBackLinkProps) {
  const { t } = useTranslation()
  const label = brandName ? `${t('catalog.backBrand')} ${brandName}` : t('catalog.backParts')

  return (
    <Link href={href} className={className}>
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Link>
  )
}
