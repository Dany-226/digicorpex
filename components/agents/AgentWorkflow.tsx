'use client'

import { useEffect, useState } from 'react'
import { Phone, Bot, Database, FileText, Bell } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WorkflowStep {
  icon: LucideIcon
  label: string
}

const STEPS: WorkflowStep[] = [
  { icon: Phone, label: 'Appel entrant' },
  { icon: Bot, label: 'Agent IA' },
  { icon: Database, label: 'CRM enrichi' },
  { icon: FileText, label: 'Devis généré' },
  { icon: Bell, label: 'Commercial notifié' },
]

const STEP_DELAY = 800
const CYCLE_DURATION = 6000

export default function AgentWorkflow() {
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    const runCycle = () => {
      setActiveIndex(-1)
      STEPS.forEach((_, index) => {
        timers.push(setTimeout(() => setActiveIndex(index), (index + 1) * STEP_DELAY))
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
    <div className="flex items-start max-w-4xl mx-auto">
      {STEPS.map((step, i) => {
        const Icon = step.icon
        const isLit = activeIndex >= i
        const isLast = i === STEPS.length - 1

        return (
          <div key={step.label} className={cn('flex items-start', isLast ? 'flex-none' : 'flex-1')}>
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div
                className={cn(
                  'w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-500',
                  isLit ? 'bg-green-500/20 border-green-400' : 'bg-slate-700 border-slate-700'
                )}
              >
                <Icon
                  size={24}
                  strokeWidth={1.75}
                  className={cn('transition-colors duration-500', isLit ? 'text-green-400' : 'text-slate-400')}
                />
              </div>
              <span className="text-xs text-slate-400 whitespace-nowrap">{step.label}</span>
            </div>

            {!isLast && (
              <svg
                className="flex-1 h-0.5 mx-2 mt-8"
                viewBox="0 0 100 2"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line x1="0" y1="1" x2="100" y2="1" stroke="#334155" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                <line
                  x1="0"
                  y1="1"
                  x2="100"
                  y2="1"
                  stroke="#4ade80"
                  strokeWidth="2"
                  strokeDasharray="100"
                  vectorEffect="non-scaling-stroke"
                  className={cn(
                    'transition-all duration-700 ease-linear',
                    isLit ? '[stroke-dashoffset:0]' : '[stroke-dashoffset:100]'
                  )}
                />
              </svg>
            )}
          </div>
        )
      })}
    </div>
  )
}
