import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Lazy init — avoids module-level crash when RESEND_API_KEY is empty at build
let _resend: Resend | null = null
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

interface ContactBody {
  nom: string
  email: string
  objectif: string
  brief: string
  gdpr: boolean
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ContactBody>

    /* ── Validation ── */
    if (!body.nom?.trim() || body.nom.trim().length < 2) {
      return NextResponse.json(
        { error: 'Nom invalide.' },
        { status: 400 }
      )
    }
    if (!body.email || !isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide.' },
        { status: 400 }
      )
    }
    if (!body.objectif?.trim()) {
      return NextResponse.json(
        { error: 'Objectif manquant.' },
        { status: 400 }
      )
    }
    if (!body.brief?.trim() || body.brief.trim().length < 10) {
      return NextResponse.json(
        { error: 'Brief trop court.' },
        { status: 400 }
      )
    }
    if (!body.gdpr) {
      return NextResponse.json(
        { error: 'Consentement RGPD requis.' },
        { status: 400 }
      )
    }

    /* ── Send via Resend ── */
    const { error } = await getResend().emails.send({
      from: 'Digicorpex <noreply@digicorpex.com>',
      to: ['contact@digicorpex.com'],
      replyTo: body.email,
      subject: `Nouvelle demande — ${body.objectif} — ${body.nom}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <table>
          <tr><td><strong>Nom</strong></td><td>${body.nom}</td></tr>
          <tr><td><strong>Email</strong></td><td>${body.email}</td></tr>
          <tr><td><strong>Objectif</strong></td><td>${body.objectif}</td></tr>
        </table>
        <h3>Brief projet</h3>
        <p>${body.brief.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color:#999;font-size:12px">Envoyé via digicorpex.com — RGPD accepté</p>
      `,
    })

    if (error) {
      console.error('[Resend error]', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('[Contact route error]', err)
    return NextResponse.json(
      { error: 'Erreur serveur.' },
      { status: 500 }
    )
  }
}
