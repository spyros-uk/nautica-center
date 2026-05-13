'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { Brand } from '@/lib/boats'
import { cn } from '@/lib/utils'
import {
  getProductFallbackImage,
  resolveProductImageSrc,
} from '@/lib/product-images'

type ProductImageProps = {
  src?: string
  alt: string
  category?: Brand['category'] | string
  className?: string
  sizes?: string
  priority?: boolean
}

export function ProductImage({ src, alt, category, className, sizes, priority }: ProductImageProps) {
  const [currentSrc, setCurrentSrc] = useState(() => resolveProductImageSrc(src, category))

  useEffect(() => {
    setCurrentSrc(resolveProductImageSrc(src, category))
  }, [src, category])

  return (
    <Image
      key={currentSrc}
      src={currentSrc}
      alt={alt}
      fill
      sizes={sizes ?? '(max-width: 768px) 100vw, 33vw'}
      priority={priority}
      unoptimized
      className={cn('object-cover', className)}
      onError={() => {
        setCurrentSrc((prev) => getProductFallbackImage(prev, category))
      }}
    />
  )
}
