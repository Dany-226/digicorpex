'use client'

import { useEffect, useState } from 'react'

const SEQUENCE = [
  { text: 'Analyse des appels entrants...', delay: 500 },
  { text: '3 prospects qualifiés détectés', delay: 1200 },
  { text: 'Création fiches CRM...', delay: 2000 },
  { text: 'Devis générés : 3/3', delay: 2800 },
  { text: 'Notification envoyée au commercial', delay: 3500 },
  { text: '✓ Temps total : 47 secondes', delay: 4200 },
]

const CYCLE_DURATION = 8000

export default function AgentAnimation() {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    const runCycle = () => {
      setVisibleCount(0)
      SEQUENCE.forEach((step, index) => {
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
        agent actif — traitement en cours
      </span>
    </div>
  )
}
