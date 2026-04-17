const steps = [
  {
    number: '01',
    title: '30 minutes ensemble',
    text: 'On identifie ce qui vous coûte le plus. Pas de jargon, pas de PowerPoint.',
  },
  {
    number: '02',
    title: 'On construit, vous validez',
    text: 'Déploiement en 2 à 4 semaines. Vous testez avant de signer quoi que ce soit.',
  },
  {
    number: '03',
    title: 'On reste',
    text: 'Maintenance, évolutions, nouveaux besoins - on est là dans la durée.',
  },
]

export default function CommentCaPasse() {
  return (
    <section className="py-24 px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        <h2 className="font-headline text-3xl font-light text-slate-800 tracking-tight mb-16">
          Simple par design
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map(({ number, title, text }) => (
            <div key={number}>
              <span className="font-headline text-6xl font-extrabold text-slate-100 block mb-4 leading-none select-none">
                {number}
              </span>
              <h3 className="font-headline font-light text-xl text-slate-800 mb-3">
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
