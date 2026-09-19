import Link from 'next/link'

export default function HomeFooter() {
  return <footer className="home-legal" aria-label="Informations et navigation complémentaire">
    <span>© {new Date().getFullYear()} Digicorpex</span>
    <nav aria-label="Navigation complémentaire">
      <Link href="/agents">Agents IA</Link><Link href="/services">Services</Link>
      <Link href="/blog">Blog</Link><Link href="/about">À propos</Link>
      <Link href="/contact">Contact</Link><Link href="/mentions-legales">Mentions légales</Link>
      <Link href="/confidentialite">Confidentialité</Link>
    </nav>
  </footer>
}
