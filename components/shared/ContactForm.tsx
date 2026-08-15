'use client'

import { useState } from 'react'
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

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
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

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }))

  const canSubmit =
    form.besoin.trim().length > 10 &&
    form.nom.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.gdpr

  const handleSubmit = async () => {
    if (!canSubmit) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  /* ── Success state ── */
  if (status === 'success') {
    return (
      <div className="bg-surface-container-lowest p-10 shadow-[0px_48px_48px_rgba(38,52,61,0.06)] flex flex-col items-center justify-center text-center py-20">
        <CheckCircle2 size={48} className="text-secondary mb-6" strokeWidth={1.5} />
        <h3 className="font-headline font-bold text-2xl text-on-surface mb-3">
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
    <div className="bg-surface-container-lowest p-10 shadow-[0px_48px_48px_rgba(38,52,61,0.06)]">
      <div className="space-y-8">

        {/* Besoin - texte libre, en premier */}
        <div>
          <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
            Décrivez votre besoin
          </label>
          <textarea
            rows={4}
            value={form.besoin}
            onChange={(e) => set('besoin', e.target.value)}
            placeholder="Je veux automatiser [tâche], connecté à [outil], pour gagner du temps sur [problème]."
            className="w-full bg-surface-container-high border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm font-body resize-none placeholder:text-on-surface-variant/50"
          />
        </div>

        {/* Nom + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
              Nom complet
            </label>
            <input
              type="text"
              value={form.nom}
              onChange={(e) => set('nom', e.target.value)}
              className="w-full bg-surface-container-high border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm font-body"
            />
          </div>
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
              Adresse email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              className="w-full bg-surface-container-high border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm font-body"
            />
          </div>
        </div>

        {/* Contexte optionnel - replié par défaut */}
        <div>
          <button
            type="button"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
                  Entreprise
                </label>
                <input
                  type="text"
                  value={form.entreprise}
                  onChange={(e) => set('entreprise', e.target.value)}
                  className="w-full bg-surface-container-high border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm font-body"
                />
              </div>
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
                  Secteur
                </label>
                <input
                  type="text"
                  value={form.secteur}
                  onChange={(e) => set('secteur', e.target.value)}
                  className="w-full bg-surface-container-high border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm font-body"
                />
              </div>
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
                  Outils déjà utilisés
                </label>
                <input
                  type="text"
                  value={form.outils}
                  onChange={(e) => set('outils', e.target.value)}
                  className="w-full bg-surface-container-high border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm font-body"
                />
              </div>
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
                  Timing
                </label>
                <input
                  type="text"
                  value={form.timing}
                  onChange={(e) => set('timing', e.target.value)}
                  className="w-full bg-surface-container-high border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm font-body"
                />
              </div>
            </div>
          )}
        </div>

        {/* GDPR */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <div
            className={cn(
              'w-5 h-5 rounded-sm border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors',
              form.gdpr
                ? 'bg-secondary border-secondary'
                : 'border-primary-container group-hover:border-secondary'
            )}
            onClick={() => set('gdpr', !form.gdpr)}
          >
            {form.gdpr && <CheckCircle2 size={12} className="text-on-secondary" />}
          </div>
          <span className="text-xs text-on-surface-variant leading-relaxed">
            J&apos;accepte que ces informations soient utilisées pour traiter
            ma demande, conformément à la politique de confidentialité de
            Digicorpex.
          </span>
        </label>

        {/* Submit */}
        <div>
          {status === 'error' && (
            <p className="text-sm text-red-500 mb-4">
              Une erreur est survenue. Veuillez réessayer ou nous contacter par email.
            </p>
          )}
          <button
            onClick={handleSubmit}
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
    </div>
  )
}
