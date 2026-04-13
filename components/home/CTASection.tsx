import Link from 'next/link'
import { ChevronsRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="bg-secondary text-on-secondary py-32 px-8">
      <div className="max-w-7xl mx-auto text-center">

        <h2 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Prêt à transformer
          <br />
          votre présence digitale ?
        </h2>

        <p className="text-lg md:text-xl opacity-80 max-w-xl mx-auto leading-relaxed font-body mb-12">
          Échangeons sur votre projet. Un premier call de 30 minutes suffit
          pour dessiner les contours de votre stratégie.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-surface-container-lowest text-on-surface px-10 py-5 rounded-sm font-headline font-bold text-lg shadow-2xl hover:bg-surface transition-colors duration-300"
        >
          Démarrer votre projet
          <ChevronsRight size={20} />
        </Link>

      </div>
    </section>
  )
}
