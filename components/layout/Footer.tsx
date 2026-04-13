import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
]

const legalLinks = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/confidentialite', label: 'Confidentialité' },
  { href: '/cgv', label: 'CGV' },
]

export default function Footer() {
  return (
    <footer className="bg-inverse-surface">
      <div className="max-w-7xl mx-auto px-8 py-20">

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 md:gap-8">

          {/* Brand + tagline */}
          <div>
            <Link
              href="/"
              className="font-headline font-bold tracking-tighter text-xl text-surface-container-lowest block mb-4"
            >
              digicorpex
            </Link>
            <p className="text-sm text-inverse-on-surface leading-relaxed max-w-xs">
              Agence web & digital spécialisée en développement, design UX/UI et stratégie SEO.
              Bordeaux.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] font-label uppercase tracking-[0.2em] text-inverse-on-surface/50 mb-6">
              Navigation
            </p>
            <ul className="space-y-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-inverse-on-surface hover:text-surface transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <p className="text-[10px] font-label uppercase tracking-[0.2em] text-inverse-on-surface/50 mb-6">
              Légal
            </p>
            <ul className="space-y-3">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-inverse-on-surface hover:text-surface transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-label uppercase tracking-[0.2em] text-inverse-on-surface/50 mb-6">
              Contact
            </p>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contact@digicorpex.com"
                  className="flex items-start gap-2.5 text-sm text-inverse-on-surface hover:text-surface transition-colors duration-200"
                >
                  <Mail size={14} className="mt-0.5 shrink-0" />
                  contact@digicorpex.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+33674058657"
                  className="flex items-center gap-2.5 text-sm text-inverse-on-surface hover:text-surface transition-colors duration-200"
                >
                  <Phone size={14} className="shrink-0" />
                  +33 6 74 05 86 57
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 text-center" style={{ borderTop: '1px solid rgba(153, 157, 161, 0.1)' }}>
          <p className="text-xs text-inverse-on-surface/40">
            © {new Date().getFullYear()} Digicorpex. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
