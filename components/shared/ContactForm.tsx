'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronsRight, Lock, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormData {
  besoin: string
  nom: string
  email: string
  entreprise: string
  secteur: string
  outils: string
  timing: string
  gdpr: boolean
}

type Status = 'idle' | 'loading' | 'success' | 'error' | 'test'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const busy = useRef(false)
  const requestId = useRef('')
  const [website, setWebsite] = useState('')
  const [showContext, setShowContext] = useState(false)
  const [form, setForm] = useState<FormData>({
    besoin: '',
    nom: '',
    email: '',
    entreprise: '',
    secteur: '',
    outils: '',
    timing: '',
    gdpr: false,
  })

  const set = (field: keyof FormData, value: string | boolean) => {
    requestId.current = ''
    setForm((f) => ({ ...f, [field]: value }))
  }

  const canSubmit =
    form.besoin.trim().length >= 10 &&
    form.nom.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.gdpr

  const handleSubmit = async () => {
    if (!canSubmit || busy.current) return
    busy.current = true
    requestId.current ||= crypto.randomUUID()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': requestId.current },
        body: JSON.stringify({ ...form, website }),
      })
      const result = await res.json()
      if (res.ok && result.ok && !result.test) {
        setStatus('success')
      } else if (result.test) {
        setStatus('test')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally { busy.current = false }
  }

  /* ── Success state ── */
  if (status === 'success') {
    return (
      <div className="bg-surface-container-lowest p-10 shadow-[0px_48px_48px_rgba(38,52,61,0.06)] flex flex-col items-center justify-center text-center py-20">
        <CheckCircle2 size={48} className="text-secondary mb-6" strokeWidth={1.5} />
        <h3 role="status" className="font-headline font-bold text-2xl text-on-surface mb-3">
          Message envoyé !
        </h3>
        <p className="text-on-surface-variant max-w-sm leading-relaxed">
          Nous avons bien reçu votre demande. Vous recevrez une réponse
          personnalisée sous 48h ouvrées.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={(event) => { event.preventDefault(); void handleSubmit() }} aria-label="Demander un diagnostic IA" className="bg-surface-container-lowest p-10 shadow-[0px_48px_48px_rgba(38,52,61,0.06)]">
      <div hidden><label htmlFor="contact-website">Site web</label><input id="contact-website" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} /></div>
      <div className="space-y-8">

        {/* Besoin - texte libre, en premier */}
        <div>
          <label htmlFor="contact-besoin" className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
            Décrivez votre besoin
          </label>
          <textarea
            rows={4}
            id="contact-besoin" name="besoin" maxLength={5000} required value={form.besoin}
            onChange={(e) => set('besoin', e.target.value)}
            placeholder="Je veux automatiser [tâche], connecté à [outil], pour gagner du temps sur [problème]."
            className="w-full bg-surface-container-high border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm font-body resize-none placeholder:text-on-surface-variant/50"
          />
        </div>

        {/* Nom + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <label htmlFor="contact-nom" className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
              Nom complet
            </label>
            <input
              type="text"
              id="contact-nom" name="nom" maxLength={120} required value={form.nom}
              onChange={(e) => set('nom', e.target.value)}
              className="w-full bg-surface-container-high border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm font-body"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
              Adresse email
            </label>
            <input
              type="email"
              id="contact-email" name="email" maxLength={254} required value={form.email}
              onChange={(e) => set('email', e.target.value)}
              className="w-full bg-surface-container-high border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm font-body"
            />
          </div>
        </div>

        {/* Contexte optionnel - replié par défaut */}
        <div>
          <button
            type="button"
            aria-expanded={showContext}
            aria-controls="contact-context"
            onClick={() => setShowContext((v) => !v)}
            className="inline-flex items-center gap-2 text-sm font-headline font-bold text-secondary hover:text-secondary-dim transition-colors"
          >
            Ajouter du contexte (optionnel)
            <ChevronDown
              size={16}
              className={cn('transition-transform duration-300', showContext && 'rotate-180')}
            />
          </button>

          {showContext && (
            <div id="contact-context" className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
              <div>
                <label htmlFor="contact-entreprise" className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
                  Entreprise
                </label>
                <input
                  type="text"
                  id="contact-entreprise" name="entreprise" maxLength={500} value={form.entreprise}
                  onChange={(e) => set('entreprise', e.target.value)}
                  className="w-full bg-surface-container-high border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm font-body"
                />
              </div>
              <div>
                <label htmlFor="contact-secteur" className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
                  Secteur
                </label>
                <input
                  type="text"
                  id="contact-secteur" name="secteur" maxLength={500} value={form.secteur}
                  onChange={(e) => set('secteur', e.target.value)}
                  className="w-full bg-surface-container-high border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm font-body"
                />
              </div>
              <div>
                <label htmlFor="contact-outils" className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
                  Outils déjà utilisés
                </label>
                <input
                  type="text"
                  id="contact-outils" name="outils" maxLength={500} value={form.outils}
                  onChange={(e) => set('outils', e.target.value)}
                  className="w-full bg-surface-container-high border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm font-body"
                />
              </div>
              <div>
                <label htmlFor="contact-timing" className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
                  Timing
                </label>
                <input
                  type="text"
                  id="contact-timing" name="timing" maxLength={500} value={form.timing}
                  onChange={(e) => set('timing', e.target.value)}
                  className="w-full bg-surface-container-high border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm font-body"
                />
              </div>
            </div>
          )}
        </div>

        {/* GDPR */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input type="checkbox" name="gdpr" required checked={form.gdpr} onChange={event => set('gdpr', event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-slate-700" />
          <span className="text-xs text-on-surface-variant leading-relaxed">
            J&apos;accepte que ces informations soient utilisées pour traiter
            ma demande, conformément à la{' '}
            <Link
              href="/confidentialite"
              className="text-secondary hover:text-secondary-dim underline underline-offset-2 transition-colors duration-200"
            >
              politique de confidentialité
            </Link>{' '}
            de Digicorpex.
          </span>
        </label>

        {/* Submit */}
        <div>
          {status === 'test' && <p role="status" className="text-sm mb-4">Test réussi : aucun e-mail envoyé dans cet environnement.</p>}
          {status === 'error' && (
            <p role="alert" className="text-sm text-red-500 mb-4">
              Une erreur est survenue. Veuillez réessayer ou nous contacter par email.
            </p>
          )}
          <button
            type="submit"
            disabled={!canSubmit || status === 'loading'}
            className="w-full inline-flex items-center justify-center gap-3 bg-secondary text-on-secondary py-4 rounded-sm font-headline font-bold text-sm uppercase tracking-widest hover:bg-secondary-dim transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Lock size={14} />
            )}
            Envoyer ma demande
            <ChevronsRight size={16} />
          </button>
          <p className="flex items-center gap-1.5 text-xs text-on-surface-variant/60 mt-4">
            <Lock size={11} />
            Transmission sécurisée - données confidentielles
          </p>
        </div>

      </div>
    </form>
  )
}
