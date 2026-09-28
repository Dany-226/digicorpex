'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function HomeNavigation() {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  return (
    <header className="home-nav" onKeyDown={(event) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
    }}>
      <Link className="logo" href="/" aria-label="Digicorpex, accueil"><Image src="/brand/digicorpex-horizontal.svg" alt="Digicorpex" width={860} height={190} priority /><small>/ intelligence opérationnelle</small></Link>
      <button ref={toggle} type="button" className="menu-toggle" aria-controls="home-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? 'Fermer' : 'Menu'}
      </button>
      <nav id="home-navigation" className={`links${open ? ' is-open' : ''}`} aria-label="Navigation principale" onClick={() => setOpen(false)}>
        <Link href="/services">Services</Link><Link href="/blog">Blog</Link><a href="#cas">Cas concrets</a><a href="#methode">Méthode</a><a href="#contact" className="navcta">Diagnostic IA</a>
      </nav>
    </header>
  )
}
