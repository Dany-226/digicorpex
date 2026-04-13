import type { ReactNode } from 'react'

/* Used in MDX files as:
 *
 *   <StatGrid>
 *     <StatItem number="01" title="Titre">Corps du texte</StatItem>
 *     <StatItem number="02" title="Titre">Corps du texte</StatItem>
 *   </StatGrid>
 */

export function StatGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-12">
      {children}
    </div>
  )
}

export function StatItem({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: ReactNode
}) {
  return (
    <div className="bg-surface-container-lowest p-8 editorial-shadow">
      <span className="block font-headline font-black text-4xl text-secondary/20 leading-none mb-4 select-none">
        {number}
      </span>
      <h4 className="font-headline font-bold text-on-surface mb-2 text-base">
        {title}
      </h4>
      <p className="text-sm text-on-surface-variant leading-relaxed">{children}</p>
    </div>
  )
}

/* Default export kept for backwards compat — unused */
export default StatGrid
