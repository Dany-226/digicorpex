'use client'

import { useEffect, useState } from 'react'

const NAVY = '#141a2e'
const MINT = '#5eca8a'
const CYCLE_DURATION = 6000

interface UseCaseLogPanelProps {
  processLines: string[]
  resultLine: string
  lineStagger?: number
  initialDelay?: number
}

export default function UseCaseLogPanel({
  processLines,
  resultLine,
  lineStagger = 200,
  initialDelay = 0,
}: UseCaseLogPanelProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    let interval: ReturnType<typeof setInterval> | undefined

    const runCycle = () => {
      setVisibleCount(0)
      processLines.forEach((_, i) => {
        timers.push(setTimeout(() => setVisibleCount(i + 1), (i + 1) * lineStagger))
      })
      timers.push(
        setTimeout(() => setShowResult(true), (processLines.length + 1) * lineStagger)
      )
    }

    // The initial delay only offsets the first cycle - once started, the loop
    // keeps its normal cadence, so this panel's cascade never re-syncs with
    // panels that started at t=0.
    const startTimer = setTimeout(() => {
      runCycle()
      interval = setInterval(runCycle, CYCLE_DURATION)
    }, initialDelay)

    return () => {
      clearTimeout(startTimer)
      timers.forEach(clearTimeout)
      if (interval) clearInterval(interval)
    }
  }, [processLines, lineStagger, initialDelay])

  return (
    <div
      className="h-56 flex flex-col justify-center gap-1.5 px-6 font-mono text-xs"
      style={{
        backgroundColor: NAVY,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
      }}
    >
      {processLines.slice(0, visibleCount).map((line) => (
        <p
          key={line}
          className="leading-relaxed"
          style={{ color: MINT, animation: 'line-in 0.35s ease-out both' }}
        >
          &gt; {line}
        </p>
      ))}

      {showResult && (
        <p className="leading-relaxed" style={{ color: MINT, animation: 'line-in 0.35s ease-out both' }}>
          &gt; {resultLine}
        </p>
      )}

      <span className="inline-block w-2 h-4 animate-pulse" style={{ backgroundColor: MINT }} />
    </div>
  )
}
