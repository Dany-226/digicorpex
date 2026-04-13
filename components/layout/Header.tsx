'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'À propos' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href + '/'))

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="font-headline font-bold tracking-tighter text-xl text-on-surface"
          >
            digicorpex
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-sm font-label transition-colors duration-200',
                  isActive(href)
                    ? 'text-on-surface border-b-2 border-on-surface pb-1'
                    : 'text-on-surface-variant hover:text-on-surface'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + mobile hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 bg-secondary text-on-secondary px-6 py-2.5 rounded-sm font-headline font-bold text-sm hover:bg-secondary-dim transition-all duration-300"
            >
              Obtenir un devis
            </Link>

            <button
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden p-2 -mr-2 text-on-surface-variant hover:text-on-surface transition-colors"
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass-nav" style={{ borderTop: '1px solid rgba(164, 180, 190, 0.15)' }}>
          <nav className="max-w-7xl mx-auto px-8 py-6 flex flex-col gap-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'text-base font-label py-1 transition-colors duration-200',
                  isActive(href)
                    ? 'text-on-surface font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                )}
              >
                {label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-6 py-2.5 rounded-sm font-headline font-bold text-sm hover:bg-secondary-dim transition-all duration-300 w-fit mt-2"
            >
              Obtenir un devis
              <ArrowRight size={14} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
