import Link from 'next/link'

export default function HeroAuto() {
  return (
    <section className="relative py-32 px-8 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 60%, #1e293b 100%)' }}>
      <div className="max-w-4xl mx-auto">

        <span className="inline-block text-[10px] font-label uppercase tracking-[0.25em] text-slate-300 border border-slate-500 px-3 py-1 rounded-sm mb-10">
          Offre lancement
        </span>

        <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-white mb-3">
          Votre entreprise devrait<br />travailler pour vous.
        </h1>
        <p className="font-headline text-3xl md:text-4xl font-light text-slate-300 mb-10 tracking-tight">
          Pas l&apos;inverse.
        </p>

        <p className="text-lg font-light text-slate-300 max-w-2xl leading-relaxed mb-14">
          Nous déployons des systèmes intelligents qui automatisent ce qui vous coûte du temps,
          de l&apos;argent et de l&apos;attention - sans que vous ayez à comprendre comment ça marche.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-sm font-headline font-bold text-sm hover:bg-slate-100 transition-all duration-300"
        >
          Diagnostic gratuit 30 min →
        </Link>

      </div>
    </section>
  )
}
