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
  },
]

export default function CeQuOnChange() {
  return (
    <section className="py-24 px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        <h2 className="font-headline text-3xl font-light text-slate-800 tracking-tight mb-16 max-w-xl">
          Des systèmes qui travaillent quand vous dormez
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white p-10 rounded-sm">
              <Icon size={24} className="text-slate-400 mb-6" strokeWidth={1.5} />
              <h3 className="font-headline font-light text-xl text-slate-800 mb-4 leading-snug">
                {title}
              </h3>
              <p className="text-sm font-light text-slate-500 leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
