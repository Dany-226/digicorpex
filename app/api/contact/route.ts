import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'

interface ContactBody {
  nom: string
  email: string
  objectif: string
  brief: string
  gdpr: boolean
}

interface DiagnosticBody {
  email: string
  subject: 'Diagnostic automatisation'
  name?: string
  message?: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function handleDiagnostic(email: string): Promise<NextResponse> {
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 })
  }

  let pdfBase64: string
  try {
    const pdfPath = path.join(process.cwd(), 'public/downloads/diagnostic-automatisation.pdf')
    const pdfBuffer = fs.readFileSync(pdfPath)
    pdfBase64 = pdfBuffer.toString('base64')
  } catch {
    return NextResponse.json({ error: 'PDF indisponible.' }, { status: 500 })
  }

  const res = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY ?? '',
    },
    body: JSON.stringify({
      sender: { name: 'Digicorpex', email: 'noreply@digicorpex.com' },
      to: [{ email }],
      replyTo: { email: 'contact@digicorpex.com' },
      subject: 'Votre diagnostic - Ce que vos journées vous coûtent vraiment',
      htmlContent: `
        <div style="font-family:system-ui,sans-serif;color:#475569;max-width:520px;margin:0 auto;padding:32px 0;">
          <p style="font-size:13px;text-transform:uppercase;letter-spacing:0.1em;color:#94a3b8;margin-bottom:24px;">digicorpex</p>
          <p style="font-size:16px;font-weight:300;color:#0f172a;line-height:1.6;margin-bottom:16px;">Bonjour,</p>
          <p style="font-size:15px;font-weight:300;color:#475569;line-height:1.7;margin-bottom:16px;">
            Vous trouverez en pièce jointe le diagnostic d'automatisation Digicorpex.
            12 pages, aucun remplissage.
          </p>
          <p style="font-size:15px;font-weight:300;color:#475569;line-height:1.7;margin-bottom:32px;">
            Si vous arrivez à la page 12 avec trois oui, vous savez où nous trouver.
          </p>
          <p style="font-size:14px;color:#64748b;line-height:1.6;">— L'équipe Digicorpex</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:32px 0;">
          <p style="font-size:11px;color:#94a3b8;">contact@digicorpex.com · digicorpex.com</p>
        </div>
      `,
      attachment: [
        {
          name: 'diagnostic-automatisation-digicorpex.pdf',
          content: pdfBase64,
        },
      ],
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    console.error('[Brevo diagnostic error]', res.status, detail)
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ContactBody> & Partial<DiagnosticBody>

    /* ── Diagnostic automatisation branch ── */
    if (body.subject === 'Diagnostic automatisation') {
      return handleDiagnostic(body.email ?? '')
    }

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
