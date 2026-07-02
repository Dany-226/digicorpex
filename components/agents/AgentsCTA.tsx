import Link from 'next/link'

export default function AgentsCTA() {
  return (
    <section className="py-32 px-8 bg-gradient-to-b from-slate-800 to-slate-950">
      <div className="max-w-2xl mx-auto text-center">

        <h2 className="font-headline text-5xl font-light text-white tracking-tight leading-[1.1] mb-6">
          Un agent déployé change tout.
        </h2>

        <p className="text-lg font-light text-slate-400 leading-relaxed mb-12">
          30 minutes pour identifier lequel déployer en premier.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-white text-slate-900 px-10 py-4 rounded-sm font-headline font-bold text-sm uppercase tracking-widest hover:bg-slate-100 transition-all duration-300"
        >
          Réserver le diagnostic
        </Link>

      </div>
    </section>
  )
}
