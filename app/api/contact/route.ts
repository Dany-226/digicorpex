import { NextRequest, NextResponse } from 'next/server'

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'

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

    /* ── Send via Brevo Transactional Email API ── */
    const res = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY ?? '',
      },
      body: JSON.stringify({
        sender: { name: 'Digicorpex', email: 'noreply@digicorpex.com' },
        to: [{ email: 'contact@digicorpex.com' }],
        replyTo: { email: body.email },
        subject: `Nouvelle demande - ${body.objectif} - ${body.nom}`,
        htmlContent: `
          <h2>Nouvelle demande de contact</h2>
          <table>
            <tr><td><strong>Nom</strong></td><td>${body.nom}</td></tr>
            <tr><td><strong>Email</strong></td><td>${body.email}</td></tr>
            <tr><td><strong>Objectif</strong></td><td>${body.objectif}</td></tr>
          </table>
          <h3>Brief projet</h3>
          <p>${body.brief.replace(/\n/g, '<br>')}</p>
          <hr>
          <p style="color:#999;font-size:12px">Envoyé via digicorpex.com - RGPD accepté</p>
        `,
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      console.error('[Brevo error]', res.status, detail)
      return NextResponse.json(
        { error: "Erreur lors de l'envoi." },
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
