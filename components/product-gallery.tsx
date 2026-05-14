'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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

const SWIPE_THRESHOLD_PX = 48

function useSwipeNavigation(
  onPrev: () => void,
  onNext: () => void,
  enabled: boolean,
) {
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const onTouchStart = useCallback(
    (event: React.TouchEvent) => {
      if (!enabled) return
      const touch = event.touches[0]
      if (!touch) return
      touchStart.current = { x: touch.clientX, y: touch.clientY }
    },
    [enabled],
  )

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (!enabled || !touchStart.current) return
      const touch = event.changedTouches[0]
      if (!touch) return

      const deltaX = touch.clientX - touchStart.current.x
      const deltaY = touch.clientY - touchStart.current.y
      touchStart.current = null

      if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX || Math.abs(deltaX) <= Math.abs(deltaY)) {
        return
      }

      if (deltaX < 0) {
        onNext()
      } else {
        onPrev()
      }
    },
    [enabled, onNext, onPrev],
  )

  return { onTouchStart, onTouchEnd }
}

function GalleryNavButton({
  direction,
  onClick,
  className,
  minimal = false,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
  className?: string
  minimal?: boolean
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
        minimal
          ? 'h-7 w-7 rounded-full border-0 bg-white/10 text-white shadow-none backdrop-blur-[2px] hover:bg-white/20 md:h-10 md:w-10 md:bg-background/90 md:text-foreground md:shadow-md md:backdrop-blur-sm md:hover:bg-background'
          : 'h-10 w-10 rounded-full bg-background/90 shadow-md backdrop-blur-sm hover:bg-background',
        className,
      )}
    >
      <Icon className={cn(minimal ? 'h-3.5 w-3.5 md:h-5 md:w-5' : 'h-5 w-5')} />
    </Button>
  )
}

function GalleryIndexIndicator({
  current,
  total,
  className,
}: {
  current: number
  total: number
  className?: string
}) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 rounded-full text-xs font-medium',
        'bottom-3 bg-black/25 px-2 py-0.5 text-white backdrop-blur-[2px]',
        'md:bottom-3 md:bg-background/85 md:px-3 md:py-1 md:text-foreground md:shadow-sm md:backdrop-blur-sm',
        className,
      )}
    >
      {current} / {total}
    </div>
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

  const swipe = useSwipeNavigation(goPrev, goNext, hasMultiple)

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
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted touch-pan-y"
          onTouchStart={swipe.onTouchStart}
          onTouchEnd={swipe.onTouchEnd}
        >
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
                minimal
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 md:left-3"
              />
              <GalleryNavButton
                direction="next"
                onClick={goNext}
                minimal
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 md:right-3"
              />
              <GalleryIndexIndicator current={safeIndex + 1} total={resolved.length} />
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

          <div
            className="relative min-h-0 flex-1 touch-pan-y"
            onTouchStart={swipe.onTouchStart}
            onTouchEnd={swipe.onTouchEnd}
          >
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
                  minimal
                  className="absolute left-2 top-1/2 z-10 -translate-y-1/2 md:left-4"
                />
                <GalleryNavButton
                  direction="next"
                  onClick={goNext}
                  minimal
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 md:right-4"
                />
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
