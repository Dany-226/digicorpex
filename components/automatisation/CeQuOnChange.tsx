import Link from 'next/link'
import { Phone, FileText, Sparkles } from 'lucide-react'

const cards = [
  {
    icon: Phone,
    title: 'Vos appels, traités automatiquement',
    text: 'Chaque appel entrant qualifié, enregistré, suivi - sans qu\'un humain ait à intervenir.',
  },
  {
    icon: FileText,
    title: 'Vos documents, générés en minutes',
    text: 'Devis, contrats, rapports - produits automatiquement depuis vos données existantes.',
  },
  {
    icon: Sparkles,
    title: 'Votre entreprise, enfin mémorisée',
    text: 'Toute la connaissance de votre structure, accessible en une question. Rien de perdu, tout de retrouvé.',
    articleLink: true,
  },
]

export default function CeQuOnChange() {
  return (
    <section className="py-24 px-8 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto">

        <h2 className="font-headline text-3xl font-light text-slate-800 tracking-tight mb-16 max-w-xl">
          Des systèmes qui travaillent quand vous dormez
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map(({ icon: Icon, title, text, articleLink }) => (
            <div key={title} className="bg-slate-50 border-l-4 border-slate-300 p-10 rounded-sm">
              <Icon size={32} className="text-slate-400 mb-6" strokeWidth={1.5} />
              <h3 className="font-headline font-semibold text-lg text-slate-800 mb-4 leading-snug">
                {title}
              </h3>
              <p className="text-sm font-light text-slate-500 leading-relaxed">
                {text}
              </p>
              {articleLink && (
                <Link
                  href="/blog/wiki-ia-memoire-entreprise"
                  className="text-sm text-slate-400 hover:text-slate-200 underline underline-offset-4 transition-colors mt-4 inline-block"
                >
                  Lire : ce que coûte l&apos;absence de mémoire →
                </Link>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
