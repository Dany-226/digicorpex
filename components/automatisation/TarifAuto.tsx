const plans = [
  {
    price: 'À partir de 3 000 €',
    label: 'Mise en place',
    text: 'Audit, déploiement, formation, 30 jours de calibration inclus.',
  },
  {
    price: '300 € / mois',
    label: 'Pour qu\'on reste à bord',
    text: 'Monitoring, corrections, évolutions. Sans engagement.',
  },
]

export default function TarifAuto() {
  return (
    <section className="py-24 px-8 bg-slate-800">
      <div className="max-w-7xl mx-auto">

        <h2 className="font-headline text-3xl font-light text-white tracking-tight mb-16">
          Une offre lisible
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
          {plans.map(({ price, label, text }) => (
            <div key={label} className="bg-slate-700/50 backdrop-blur border border-slate-600 p-10 rounded-sm">
              <p className="font-headline text-4xl font-light text-white mb-2 tracking-tight">
                {price}
              </p>
              <p className="text-xs font-label uppercase tracking-widest text-slate-400 mb-6">
                {label}
              </p>
              <p className="text-sm font-light text-slate-300 leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
