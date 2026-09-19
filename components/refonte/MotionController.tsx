'use client'

import { useEffect, useState } from 'react'

/** One shared CSS timeline per workflow; no independent timers to drift on reset. */
export default function MotionController() {
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.refonte')
    if (!root) return
    root.dataset.paused = String(paused)
    return () => { delete root.dataset.paused }
  }, [paused])
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-motion-section]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        (target as HTMLElement).dataset.offscreen = String(!isIntersecting)
      })
    }, { rootMargin: '80px' })
    sections.forEach(section => observer.observe(section))
    const onVisibility = () => {
      const root = document.querySelector<HTMLElement>('.refonte')
      if (root) root.dataset.hidden = String(document.hidden)
    }
    document.addEventListener('visibilitychange', onVisibility)
    onVisibility()
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility) }
  }, [])
  return <button className="motion-control" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
    {paused ? 'Reprendre les animations' : 'Mettre les animations en pause'}
  </button>
}
