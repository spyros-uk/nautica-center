'use client'

import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n/context'
import type { Locale } from '@/lib/i18n/types'

type LanguageToggleProps = {
  className?: string
  variant?: 'header' | 'default'
}

export function LanguageToggle({ className, variant = 'default' }: LanguageToggleProps) {
  const { locale, setLocale, t } = useTranslation()

  const buttonClass = (active: boolean) =>
    cn(
      'px-2 py-1 text-xs font-semibold rounded transition-colors',
      variant === 'header'
        ? active
          ? 'bg-primary-foreground text-primary'
          : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10'
        : active
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted',
    )

  const set = (next: Locale) => {
    if (next !== locale) setLocale(next)
  }

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className={cn('inline-flex items-center gap-1 rounded-full border p-0.5', className,
        variant === 'header' ? 'border-primary-foreground/20' : 'border-border')}
    >
      <button type="button" className={buttonClass(locale === 'el')} onClick={() => set('el')}>
        {t('language.el')}
      </button>
      <button type="button" className={buttonClass(locale === 'en')} onClick={() => set('en')}>
        {t('language.en')}
      </button>
    </div>
  )
}
