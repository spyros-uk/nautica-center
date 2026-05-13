'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getProductPlaceholder, resolveProductImageSrc } from '@/lib/product-images'
import type { Brand } from '@/lib/boats'

type ProductGalleryProps = {
  images: string[]
  alt: string
  category?: Brand['category'] | string
}

function useResolvedImages(images: string[], category?: Brand['category'] | string) {
  const fallback = getProductPlaceholder(category)
  const normalized = images.length > 0 ? images : [fallback]
  const [failed, setFailed] = useState<Set<number>>(() => new Set())

  const markFailed = useCallback((index: number) => {
    setFailed((prev) => {
      const next = new Set(prev)
      next.add(index)
      return next
    })
  }, [])

  const resolved = normalized.map((src, index) => {
    if (failed.has(index)) return fallback
    return resolveProductImageSrc(src, category)
  })

  return { resolved, markFailed, fallback }
}

function GalleryNavButton({
  direction,
  onClick,
  className,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
  className?: string
}) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  const label = direction === 'prev' ? 'Προηγούμενη εικόνα' : 'Επόμενη εικόνα'

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
      className={cn(
        'h-10 w-10 rounded-full bg-background/90 shadow-md backdrop-blur-sm hover:bg-background',
        className,
      )}
    >
      <Icon className="h-5 w-5" />
    </Button>
  )
}

function GalleryFrame({
  src,
  alt,
  onError,
  onClick,
  className,
  sizes,
  priority,
  fit = 'cover',
}: {
  src: string
  alt: string
  onError: () => void
  onClick?: () => void
  className?: string
  sizes?: string
  priority?: boolean
  fit?: 'cover' | 'contain'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative block h-full w-full overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        onClick ? 'cursor-zoom-in' : 'cursor-default',
        className,
      )}
      aria-label={onClick ? 'Μεγέθυνση εικόνας' : undefined}
    >
      <Image
        key={src}
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? '(max-width: 1024px) 100vw, 50vw'}
        priority={priority}
        unoptimized
        className={fit === 'contain' ? 'object-contain' : 'object-cover'}
        onError={onError}
      />
    </button>
  )
}

export function ProductGallery({ images, alt, category }: ProductGalleryProps) {
  const { resolved, markFailed, fallback } = useResolvedImages(images, category)
  const [index, setIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const hasMultiple = resolved.length > 1
  const safeIndex = index % resolved.length

  const goPrev = useCallback(() => {
    setIndex((current) => (current - 1 + resolved.length) % resolved.length)
  }, [resolved.length])

  const goNext = useCallback(() => {
    setIndex((current) => (current + 1) % resolved.length)
  }, [resolved.length])

  useEffect(() => {
    if (!lightboxOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNext()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxOpen, goPrev, goNext])

  return (
    <>
      <div className="space-y-3">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
          <GalleryFrame
            src={resolved[safeIndex]}
            alt={`${alt} — εικόνα ${safeIndex + 1} από ${resolved.length}`}
            onError={() => markFailed(safeIndex)}
            onClick={() => setLightboxOpen(true)}
            priority
          />

          {hasMultiple && (
            <>
              <GalleryNavButton
                direction="prev"
                onClick={goPrev}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2"
              />
              <GalleryNavButton
                direction="next"
                onClick={goNext}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2"
              />
              <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-background/85 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur-sm">
                {safeIndex + 1} / {resolved.length}
              </div>
            </>
          )}
        </div>

        {hasMultiple && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {resolved.map((src, thumbIndex) => (
              <button
                key={`${src}-${thumbIndex}`}
                type="button"
                onClick={() => setIndex(thumbIndex)}
                className={cn(
                  'relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors',
                  thumbIndex === safeIndex ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100',
                )}
                aria-label={`Εμφάνιση εικόνας ${thumbIndex + 1}`}
                aria-current={thumbIndex === safeIndex}
              >
                <Image
                  key={src}
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  unoptimized
                  className="object-cover"
                  onError={() => markFailed(thumbIndex)}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          showCloseButton={false}
          className="flex h-[98vh] max-h-[98vh] w-[98vw] max-w-[98vw] flex-col gap-0 overflow-hidden rounded-lg border-0 bg-black p-0 sm:max-w-[98vw]"
        >
          <DialogTitle className="sr-only">{alt}</DialogTitle>

          <div className="flex shrink-0 items-center justify-between border-b border-primary-foreground/10 bg-primary/95 px-4 py-3 text-primary-foreground backdrop-blur-md">
            <p className="text-sm text-primary-foreground/80">
              {hasMultiple ? `${safeIndex + 1} / ${resolved.length}` : alt}
            </p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Κλείσιμο"
              onClick={() => setLightboxOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="relative min-h-0 flex-1">
            <GalleryFrame
              src={resolved[safeIndex]}
              alt={`${alt} — εικόνα ${safeIndex + 1} από ${resolved.length}`}
              onError={() => markFailed(safeIndex)}
              className="cursor-default"
              sizes="96vw"
              fit="contain"
            />

            {hasMultiple && (
              <>
                <GalleryNavButton
                  direction="prev"
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2"
                />
                <GalleryNavButton
                  direction="next"
                  onClick={goNext}
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2"
                />
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
