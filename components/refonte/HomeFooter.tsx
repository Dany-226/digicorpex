import Link from 'next/link'
import Image from 'next/image'

export default function HomeFooter() {
  return <footer className="home-legal" aria-label="Informations et navigation complémentaire">
    <div className="footer-brand"><Link href="/" aria-label="Digicorpex, accueil"><Image src="/brand/digicorpex-horizontal.svg" alt="Digicorpex" width={860} height={190} /></Link><span>© {new Date().getFullYear()} Digicorpex</span></div>
    <nav aria-label="Navigation complémentaire">
      <Link href="/agents">Agents IA</Link><Link href="/services">Services</Link>
      <Link href="/blog">Blog</Link><Link href="/about">À propos</Link>
      <Link href="/contact">Contact</Link><Link href="/mentions-legales">Mentions légales</Link>
      <Link href="/confidentialite">Confidentialité</Link>
    </nav>
  </footer>
}
