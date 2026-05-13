'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/i18n/context'

export function NotFoundClient() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 pt-32 pb-24 text-center">
      <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">
        {t('notFound.code')}
      </p>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('notFound.title')}</h1>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        {t('notFound.description')}
      </p>
      <Button asChild>
        <Link href="/">{t('notFound.home')}</Link>
      </Button>
    </div>
  )
}
