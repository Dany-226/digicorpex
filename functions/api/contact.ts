interface ContactBody {
  besoin: string
  nom: string
  email: string
  entreprise?: string
  secteur?: string
  outils?: string
  timing?: string
  gdpr: boolean
}

interface Env {
  RESEND_API_KEY: string
}

interface PagesContext {
  request: Request
  env: Env
}

const RESEND_API_URL = 'https://api.resend.com/emails'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function onRequestPost({ request, env }: PagesContext): Promise<Response> {
  try {
    const body = (await request.json()) as Partial<ContactBody>

    /* ── Validation ── */
    if (!body.nom?.trim() || body.nom.trim().length < 2) {
      return jsonResponse({ error: 'Nom invalide.' }, 400)
    }
    if (!body.email || !isValidEmail(body.email)) {
      return jsonResponse({ error: 'Adresse email invalide.' }, 400)
    }
    if (!body.besoin?.trim() || body.besoin.trim().length < 10) {
      return jsonResponse({ error: 'Besoin trop court.' }, 400)
    }
    if (!body.gdpr) {
      return jsonResponse({ error: 'Consentement RGPD requis.' }, 400)
    }

    /* ── Contexte optionnel -uniquement les champs renseignés ── */
    const contextFields: [string, string | undefined][] = [
      ['Entreprise', body.entreprise],
      ['Secteur', body.secteur],
      ['Outils déjà utilisés', body.outils],
      ['Timing', body.timing],
    ]
    const contextRows = contextFields
      .filter(([, value]) => value?.trim())
      .map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${value}</td></tr>`)
      .join('')
    const contextSection = contextRows
      ? `<h3>Contexte additionnel</h3><table>${contextRows}</table>`
      : ''

    /* ── Send via Resend API ── */
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Digicorpex <noreply@digicorpex.com>',
        to: ['danielrollin@digicorpex.com'],
        reply_to: body.email,
        subject: `Nouvelle demande - ${body.nom}`,
        html: `
          <h2>Nouvelle demande de contact</h2>
          <table>
            <tr><td><strong>Nom</strong></td><td>${body.nom}</td></tr>
            <tr><td><strong>Email</strong></td><td>${body.email}</td></tr>
          </table>
          <h3>Besoin décrit</h3>
          <p>${body.besoin.replace(/\n/g, '<br>')}</p>
          ${contextSection}
          <hr>
          <p style="color:#999;font-size:12px">Envoyé via digicorpex.com - RGPD accepté</p>
        `,
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      console.error('[Resend error]', res.status, detail)
      return jsonResponse({ error: "Erreur lors de l'envoi." }, 500)
    }

    return jsonResponse({ ok: true }, 200)
  } catch (err) {
    console.error('[Contact function error]', err)
    return jsonResponse({ error: 'Erreur serveur.' }, 500)
  }
}
