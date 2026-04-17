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
    <section className="py-24 px-8 bg-slate-900">
      <div className="max-w-7xl mx-auto">

        <h2 className="font-headline text-3xl font-light text-white tracking-tight mb-16">
          Simple par design
        </h2>

        <div className="grid md:grid-cols-3">
          {steps.map(({ number, title, text }, i) => (
            <div
              key={number}
              className={`pr-12 ${i < steps.length - 1 ? 'border-r border-slate-700 mr-12' : ''}`}
            >
              <span className="font-headline text-8xl font-bold text-slate-700 block leading-none select-none mb-4">
                {number}
              </span>
              <h3 className="font-headline text-xl font-light text-white mt-2 mb-3">
                {title}
              </h3>
              <p className="text-sm font-light text-slate-400 leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
