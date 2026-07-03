'use client'

import { useEffect, useState } from 'react'

const SEQUENCE = [
  { text: 'Analyse des appels entrants...' },
  { text: '3 prospects qualifiés détectés' },
  { text: 'Création fiches CRM...', delay: 300 },
  { text: 'Devis générés : 3/3', delay: 600 },
  { text: 'Notification envoyée au commercial', delay: 900 },
  { text: '✓ Temps total : 47 secondes', delay: 1200 },
]

// The first 2 lines are visible from mount and cycle restart (instead of
// building from 0) so the fixed-height terminal reads as active rather than
// empty during the fill-in - the box height doesn't track content, only the
// fill speed changed.
const INITIAL_VISIBLE = 2
const CYCLE_DURATION = 8000

export default function AgentAnimation() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    const runCycle = () => {
      setVisibleCount(INITIAL_VISIBLE)
      SEQUENCE.slice(INITIAL_VISIBLE).forEach((step, i) => {
        const index = INITIAL_VISIBLE + i
        timers.push(setTimeout(() => setVisibleCount(index + 1), step.delay))
      })
    }

    runCycle()
    const interval = setInterval(runCycle, CYCLE_DURATION)

    return () => {
      timers.forEach(clearTimeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-slate-900 rounded-sm p-6 font-mono text-sm min-h-[480px] flex flex-col gap-2">
        {SEQUENCE.slice(0, visibleCount).map((step) => (
          <p key={step.text} className="text-green-400 leading-relaxed">
            &gt; {step.text}
          </p>
        ))}
        <span className="inline-block w-2 h-4 bg-green-400 animate-pulse" />
      </div>

      <span className="inline-flex items-center gap-2 self-end text-xs text-green-400 animate-pulse">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        agent actif - traitement en cours
      </span>
    </div>
  )
}
