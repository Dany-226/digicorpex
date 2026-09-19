/** Shared Web API handlers for Pages Functions and the local Next dev adapter. */
export interface MailEnvironment {
  RESEND_API_KEY?: string
  CONTACT_TO_EMAIL?: string
  MAIL_TEST_MODE?: string
}

const response = (body: unknown, status = 200) => Response.json(body, {
  status, headers: { 'Cache-Control': 'no-store' },
})
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]!))
const emailValid = (value: unknown): value is string => typeof value === 'string' && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  if (!request.headers.get('content-type')?.includes('application/json')) return null
  // Limit the stream, including requests without a Content-Length header.
  const reader = request.body?.getReader()
  if (!reader) return null
  const decoder = new TextDecoder()
  let raw = '', size = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > 16384) { await reader.cancel(); return null }
      raw += decoder.decode(value, { stream: true })
    }
    raw += decoder.decode()
    const body: unknown = JSON.parse(raw)
    return typeof body === 'object' && body !== null && !Array.isArray(body) ? body as Record<string, unknown> : null
  } catch { return null } finally { reader.releaseLock() }
}

async function sendMail(env: MailEnvironment, mail: Record<string, unknown>, request: Request) {
  // Only set MAIL_TEST_MODE in local/Preview; no mail is sent in this mode.
  if (env.MAIL_TEST_MODE === 'true') return response({ ok: true, test: true })
  if (!env.RESEND_API_KEY) return response({ error: 'Service temporairement indisponible.' }, 503)
  const key = request.headers.get('Idempotency-Key')
  const headers: Record<string, string> = { 'Content-Type': 'application/json', Authorization: `Bearer ${env.RESEND_API_KEY}` }
  if (key && /^[a-zA-Z0-9-]{16,100}$/.test(key)) headers['Idempotency-Key'] = key
  try {
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST', headers, body: JSON.stringify(mail), signal: AbortSignal.timeout(10000),
    })
    if (!result.ok) return response({ error: "L’envoi a échoué. Veuillez réessayer." }, 502)
    return response({ ok: true })
  } catch { return response({ error: 'Le service ne répond pas. Veuillez réessayer.' }, 502) }
}

export async function handleContact(request: Request, env: MailEnvironment) {
  const body = await readBody(request)
  if (!body) return response({ error: 'Requête invalide.' }, 400)
  if (typeof body.website === 'string' && body.website) return response({ ok: true })
  if (typeof body.nom !== 'string' || body.nom.trim().length < 2 || body.nom.length > 120) return response({ error: 'Nom invalide.' }, 400)
  if (!emailValid(body.email)) return response({ error: 'Adresse email invalide.' }, 400)
  if (typeof body.besoin !== 'string' || body.besoin.trim().length < 10 || body.besoin.length > 5000) return response({ error: 'Décrivez votre besoin en 10 à 5 000 caractères.' }, 400)
  if (body.gdpr !== true) return response({ error: 'Consentement requis.' }, 400)
  const fields: [string, string][] = [['entreprise', 'Entreprise'], ['secteur', 'Secteur'], ['outils', 'Outils déjà utilisés'], ['timing', 'Timing']]
  for (const [key] of fields) {
    if (body[key] !== undefined && (typeof body[key] !== 'string' || (body[key] as string).length > 500)) return response({ error: 'Contexte invalide.' }, 400)
  }
  const context = fields.filter(([key]) => (body[key] as string | undefined)?.trim()).map(([key, label]) => `<p><strong>${label}</strong> : ${escapeHtml(body[key] as string)}</p>`).join('')
  return sendMail(env, {
    from: 'Digicorpex <noreply@digicorpex.com>', to: [env.CONTACT_TO_EMAIL || 'danielrollin@digicorpex.com'],
    reply_to: body.email, subject: `Nouvelle demande - ${body.nom.replace(/[\r\n]/g, ' ')}`,
    html: `<h2>Demande de diagnostic IA</h2><p>${escapeHtml(body.nom)} - ${escapeHtml(body.email)}</p><p>${escapeHtml(body.besoin).replace(/\n/g, '<br>')}</p>${context}<p>Consentement au traitement de la demande : accepté.</p>`,
  }, request)
}

export async function handleDiagnostic(request: Request, env: MailEnvironment) {
  const body = await readBody(request)
  if (!body || !emailValid(body.email) || body.gdpr !== true) return response({ error: 'Adresse email et consentement requis.' }, 400)
  if (typeof body.website === 'string' && body.website) return response({ ok: true })
  return sendMail(env, {
    from: 'Digicorpex <noreply@digicorpex.com>', to: [body.email], reply_to: 'danielrollin@digicorpex.com',
    subject: 'Votre diagnostic automatisation - Digicorpex',
    html: '<p>Bonjour,</p><p>Voici votre diagnostic automatisation :</p><p><a href="https://www.digicorpex.com/downloads/diagnostic-automatisation.pdf">Télécharger le diagnostic PDF</a></p><p>Aucune inscription à une newsletter. Pour nous joindre : danielrollin@digicorpex.com.</p>',
  }, request)
}
