import Link from 'next/link'

export default function CTAFinalAuto() {
  return (
    <section
      className="py-32 px-8"
      style={{ background: 'linear-gradient(135deg, #334155 0%, #0f172a 100%)' }}
    >
      <div className="max-w-2xl mx-auto text-center">

        <h2 className="font-headline text-4xl md:text-5xl font-light text-white tracking-tight leading-[1.1] mb-6">
          Trente minutes pour savoir si ça vaut le coup.
        </h2>

        <p className="text-lg font-light text-slate-400 leading-relaxed mb-12">
          Aucun engagement. Aucun jargon.<br />
          Juste une conversation honnête.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-white text-slate-900 px-10 py-4 rounded-sm font-headline font-bold text-sm hover:bg-slate-100 transition-all duration-300"
        >
          Réserver mon diagnostic →
        </Link>

      </div>
    </section>
  )
}
