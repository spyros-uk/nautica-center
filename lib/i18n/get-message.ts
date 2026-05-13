import type { Locale } from '@/lib/i18n/types'
import { messages } from '@/lib/i18n/messages'

type MessageTree = (typeof messages)['el']

function getNestedValue(tree: MessageTree, key: string): unknown {
  return key.split('.').reduce<unknown>((value, part) => {
    if (value && typeof value === 'object' && part in value) {
      return (value as Record<string, unknown>)[part]
    }
    return undefined
  }, tree)
}

export function getMessage(locale: Locale, key: string): string {
  const value = getNestedValue(messages[locale], key) ?? getNestedValue(messages.el, key)
  return typeof value === 'string' ? value : key
}
