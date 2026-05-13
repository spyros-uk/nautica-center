'use client'

import { useTranslation } from '@/lib/i18n/context'

type TranslatedTextProps = {
  messageKey: string
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div'
  className?: string
}

export function TranslatedText({ messageKey, as: Tag = 'span', className }: TranslatedTextProps) {
  const { t } = useTranslation()
  return <Tag className={className}>{t(messageKey)}</Tag>
}
