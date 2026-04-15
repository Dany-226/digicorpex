'use client'

import { useState } from 'react'
import { ChevronsRight, ChevronLeft, Lock, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormData {
  nom: string
  email: string
  objectif: string
  brief: string
  gdpr: boolean
}

const OBJECTIFS = [
  { value: 'site-creation', label: 'Créer mon site web' },
  { value: 'refonte', label: 'Refondre l\'existant' },
  { value: 'seo', label: 'Stratégie SEO' },
  { value: 'application', label: 'Application web' },
]

const STEP_LABELS = ['Qualification Projet', 'Votre Brief', 'Validation']

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState<FormData>({
    nom: '',
    email: '',
    objectif: '',
    brief: '',
    gdpr: false,
  })

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }))

  const canAdvanceStep0 =
    form.nom.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.objectif !== ''

  const canAdvanceStep1 = form.brief.trim().length > 10

  const handleSubmit = async () => {
    if (!form.gdpr) return
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

      {/* ── Card header -progress dots ── */}
      <div className="flex items-center gap-3 mb-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'w-2.5 h-2.5 rounded-full transition-colors duration-300',
              i <= step ? 'bg-secondary' : 'bg-surface-container-high'
            )}
          />
        ))}
        <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">
          {STEP_LABELS[step]}
        </span>
      </div>

      {/* ── Step 0 -Informations + Objectif ── */}
      {step === 0 && (
        <div className="space-y-8">
          {/* Nom + Email 2-col grid */}
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

          {/* Objectifs radio cards */}
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">
              Votre objectif principal
            </label>
            <div className="grid grid-cols-2 gap-4">
              {OBJECTIFS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => set('objectif', value)}
                  className={cn(
                    'bg-surface-container-low p-4 rounded-sm text-left text-sm font-body transition-all duration-200',
                    form.objectif === value
                      ? 'bg-secondary text-on-secondary'
                      : 'text-on-surface hover:bg-surface-container'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep(1)}
            disabled={!canAdvanceStep0}
            className="w-full inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary py-4 rounded-sm font-headline font-bold text-sm uppercase tracking-widest hover:bg-secondary-dim transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continuer
            <ChevronsRight size={16} />
          </button>
        </div>
      )}

      {/* ── Step 1 -Brief ── */}
      {step === 1 && (
        <div className="space-y-8">
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
              Brief Projet{' '}
              <span className="text-outline-variant normal-case tracking-normal">
                (Confidentiel)
              </span>
            </label>
            <textarea
              rows={6}
              value={form.brief}
              onChange={(e) => set('brief', e.target.value)}
              placeholder=""
              className="w-full bg-surface-container-high border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm font-body resize-none"
            />
            <p className="text-xs text-on-surface-variant/60 mt-2">
              Décrivez votre contexte, vos contraintes et vos ambitions.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(0)}
              className="inline-flex items-center gap-2 text-sm font-label text-on-surface-variant hover:text-on-surface transition-colors px-4 py-4"
            >
              <ChevronLeft size={16} />
              Retour
            </button>
            <button
              onClick={() => setStep(2)}
              disabled={!canAdvanceStep1}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary py-4 rounded-sm font-headline font-bold text-sm uppercase tracking-widest hover:bg-secondary-dim transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continuer
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2 -Validation + Submit ── */}
      {step === 2 && (
        <div className="space-y-8">
          {/* Summary */}
          <div className="bg-surface-container-low p-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant font-label">Contact</span>
              <span className="font-medium text-on-surface">{form.nom} - {form.email}</span>
            </div>
            <div className="h-px bg-outline-variant/20" />
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant font-label">Objectif</span>
              <span className="font-medium text-on-surface capitalize">
                {OBJECTIFS.find((o) => o.value === form.objectif)?.label}
              </span>
            </div>
            <div className="h-px bg-outline-variant/20" />
            <div className="text-sm">
              <span className="text-on-surface-variant font-label block mb-1">Brief</span>
              <p className="text-on-surface line-clamp-2">{form.brief}</p>
            </div>
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

          {/* Footer -lock + submit */}
          <div>
            {status === 'error' && (
              <p className="text-sm text-red-500 mb-4">
                Une erreur est survenue. Veuillez réessayer ou nous contacter par email.
              </p>
            )}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 text-sm font-label text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <ChevronLeft size={16} />
                Retour
              </button>
              <button
                onClick={handleSubmit}
                disabled={!form.gdpr || status === 'loading'}
                className="inline-flex items-center gap-3 bg-secondary text-on-secondary px-10 py-4 rounded-sm font-headline font-bold text-sm uppercase tracking-widest hover:bg-secondary-dim transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Lock size={14} />
                )}
                Envoyer ma demande
                <ChevronsRight size={16} />
              </button>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-on-surface-variant/60 mt-4">
              <Lock size={11} />
              Transmission sécurisée - données confidentielles
            </p>
          </div>
        </div>
      )}

    </div>
  )
}
