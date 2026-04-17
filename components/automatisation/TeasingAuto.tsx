import Link from 'next/link'

export default function TeasingAuto() {
  return (
    <section className="py-24 px-8 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-center">

          <div className="lg:col-span-5">
            <div className="w-16 h-px bg-slate-300 mb-10" />
            <h2 className="font-headline text-4xl font-light text-slate-800 tracking-tight leading-[1.1] mb-8">
              Ce n&apos;est que<br />le début
            </h2>
          </div>

          <div className="lg:col-span-7">
            <p className="text-lg font-light text-slate-500 leading-relaxed mb-10 max-w-xl">
              Nous travaillons sur des applications qui vont plus loin - pilotage financier,
              intelligence commerciale, conformité sectorielle. Réservées en priorité
              à nos premiers clients.
            </p>
            <Link
              href="/contact"
              className="text-sm font-label text-slate-700 underline underline-offset-4 hover:text-slate-900 transition-colors duration-300"
            >
              Être parmi les premiers →
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
