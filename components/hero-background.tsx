'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  HERO_CROSSFADE_MS,
  HERO_IMAGE_SRC,
  HERO_VIDEO_MEDIA_QUERY,
  HERO_VIDEO_SRC,
  HERO_VIDEO_ZOOM,
} from '@/lib/hero-media'

type HeroBackgroundProps = {
  imageAlt: string
}

const coverClassName =
  'absolute left-1/2 top-1/2 h-full w-full min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center'

const videoCoverClassName =
  'absolute left-1/2 top-1/2 h-full w-full min-h-full min-w-full object-cover object-center origin-center'

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])

  return matches
}

export function HeroBackground({ imageAlt }: HeroBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isDesktop = useMediaQuery(HERO_VIDEO_MEDIA_QUERY)
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const [pageReady, setPageReady] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const enableVideo = isDesktop && !prefersReducedMotion

  useEffect(() => {
    if (document.readyState === 'complete') {
      setPageReady(true)
      return
    }

    const onLoad = () => setPageReady(true)
    window.addEventListener('load', onLoad, { once: true })
    return () => window.removeEventListener('load', onLoad)
  }, [])

  const startPlayback = useCallback(async (video: HTMLVideoElement) => {
    video.muted = true
    video.loop = true

    try {
      await video.play()
      return true
    } catch {
      return false
    }
  }, [])

  useEffect(() => {
    if (!enableVideo || !pageReady || !videoReady) {
      setShowVideo(false)
      return
    }

    const video = videoRef.current
    if (!video) return

    let cancelled = false

    void (async () => {
      const playing = await startPlayback(video)
      if (!cancelled && playing) {
        setShowVideo(true)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [enableVideo, pageReady, videoReady, startPlayback])

  useEffect(() => {
    if (enableVideo) return

    const video = videoRef.current
    if (!video) return

    video.pause()
    setVideoReady(false)
    setShowVideo(false)
  }, [enableVideo])

  useEffect(() => {
    const video = videoRef.current
    if (!enableVideo || !video) return

    const onCanPlayThrough = () => setVideoReady(true)

    video.addEventListener('canplaythrough', onCanPlayThrough, { once: true })

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      onCanPlayThrough()
    }

    return () => {
      video.removeEventListener('canplaythrough', onCanPlayThrough)
    }
  }, [enableVideo])

  const fadeStyle = { transitionDuration: `${HERO_CROSSFADE_MS}ms` }
  const videoStyle = {
    ...fadeStyle,
    transform: `translate(-50%, -50%) scale(${HERO_VIDEO_ZOOM})`,
  }

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <img
        src={HERO_IMAGE_SRC}
        alt={imageAlt}
        className={cn(coverClassName, 'transition-opacity ease-out', showVideo ? 'opacity-0' : 'opacity-100')}
        style={fadeStyle}
        fetchPriority="high"
      />

      {enableVideo && (
        <video
          ref={videoRef}
          className={cn(videoCoverClassName, 'transition-opacity ease-out', showVideo ? 'opacity-100' : 'opacity-0')}
          style={videoStyle}
          src={HERO_VIDEO_SRC}
          preload="auto"
          playsInline
          loop
          muted
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
    </div>
  )
}
