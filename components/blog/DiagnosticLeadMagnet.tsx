'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

const items = [
  'Le diagnostic en 12 questions calibrées sur le terrain',
  '5 cas réels avant/après, chiffrés et anonymisés',
  'La grille de calcul du coût réel du statu quo',
  'Les 3 questions pour décider en 10 minutes',
]

export default function DiagnosticLeadMagnet() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: '',
          email,
          message: 'Demande de diagnostic automatisation',
          subject: 'Diagnostic automatisation',
        }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="px-8 pb-32 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-800 rounded-sm p-12 md:p-16">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Colonne gauche */}
            <div>
              <span className="text-xs tracking-widest text-slate-400 uppercase border border-slate-600 px-3 py-1 rounded-sm inline-block mb-6">
                Diagnostic offert
              </span>

              <h3 className="font-headline text-3xl font-light text-white leading-snug">
                Ce que vos journées vous coûtent vraiment.
              </h3>

              <p className="text-slate-400 font-light mt-3 leading-relaxed">
                12 pages. Le diagnostic qu&apos;on facture en cabinet. Offert. Sans relance.
              </p>

              <ul className="mt-8 space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-slate-400 mt-0.5 shrink-0" strokeWidth={1.5} />
                    <span className="text-sm font-light text-slate-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-slate-500 italic mt-6">
                Ils sont fous de donner ça gratos.
              </p>
            </div>

            {/* Colonne droite — formulaire */}
            <div>
              {status === 'done' ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <CheckCircle2 size={32} className="text-slate-400 mb-4" strokeWidth={1.5} />
                  <p className="text-white font-headline font-light text-lg mb-1">
                    C&apos;est en route.
                  </p>
                  <p className="text-sm text-slate-400">
                    Vérifiez votre boîte dans quelques minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-label uppercase tracking-widest text-slate-400 mb-2">
                      Adresse email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full bg-transparent border-0 border-b border-slate-600 focus:border-slate-400 rounded-none px-0 py-3 text-white outline-none transition-colors text-sm placeholder:text-slate-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-white text-slate-900 w-full rounded-sm py-3.5 font-headline font-bold text-sm uppercase tracking-widest hover:bg-slate-100 transition-colors duration-300 disabled:opacity-60 mt-2"
                  >
                    {status === 'loading' ? 'Envoi…' : 'Recevoir le diagnostic'}
                  </button>

                  {status === 'error' && (
                    <p className="text-xs text-red-400 text-center">
                      Une erreur est survenue. Réessayez ou écrivez-nous directement.
                    </p>
                  )}

                  <p className="text-xs text-slate-500 text-center mt-0">
                    Aucune relance. Aucun spam. Juste le PDF.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
