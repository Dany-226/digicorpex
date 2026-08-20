import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    "Politique de confidentialité du site Digicorpex : données collectées, sous-traitants, durée de conservation, vos droits et cookies.",
  alternates: {
    canonical: 'https://www.digicorpex.com/confidentialite',
  },
}

export default function ConfidentialitePage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────── */}
      <section className="py-24 md:py-32 px-8 bg-surface">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-on-surface">
            Politique de confidentialité
          </h1>
        </div>
      </section>

      {/* ── Contenu ─────────────────────────────── */}
      <section className="pb-24 md:pb-32 px-8 bg-surface">
        <div className="max-w-3xl mx-auto space-y-16 font-body">

          {/* Responsable du traitement */}
          <div>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-4">
              Responsable du traitement
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              DIGICORPEX, SASU au capital de 500 euros, 226 rue Camille Godard,
              33000 Bordeaux, RCS Bordeaux 940 521 719. Représentée par Daniel
              Rollin, contactable à danielrollin@digicorpex.com.
            </p>
          </div>

          {/* Données collectées et finalités */}
          <div>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-4">
              Données collectées et finalités
            </h2>
            <ul className="list-disc list-outside pl-5 space-y-3 text-on-surface-variant leading-relaxed">
              <li>
                Formulaire de contact (nom, email, message, contexte
                optionnel) : traitement de votre demande et suivi commercial.
              </li>
              <li>
                Téléchargement du diagnostic gratuit (email) : envoi du
                document et communications ponctuelles liées à
                l&apos;automatisation IA. Désinscription possible à tout
                moment via le lien présent dans chaque email.
              </li>
              <li>
                Prise de rendez-vous (nom, email, créneau choisi) : gestion du
                rendez-vous via Google Agenda.
              </li>
            </ul>
          </div>

          {/* Sous-traitants */}
          <div>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-4">
              Sous-traitants
            </h2>
            <ul className="list-disc list-outside pl-5 space-y-3 text-on-surface-variant leading-relaxed mb-6">
              <li>
                Cloudflare, Inc. (101 Townsend Street, San Francisco, CA
                94107, États-Unis) : hébergement du site.
              </li>
              <li>Zoho Corporation : réception des emails de contact.</li>
              <li>
                Resend : envoi des emails liés au formulaire de contact.
              </li>
              <li>
                Brevo (Sendinblue SAS, 7 rue de Madrid, 75008 Paris) : envoi
                du diagnostic PDF.
              </li>
              <li>
                Google LLC : gestion des rendez-vous (Google Agenda) et
                mesure d&apos;audience (Google Analytics).
              </li>
            </ul>
            <p className="text-on-surface-variant leading-relaxed">
              Ces prestataires agissent en tant que sous-traitants au sens du
              RGPD.
            </p>
          </div>

          {/* Durée de conservation */}
          <div>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-4">
              Durée de conservation
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Vos données de contact sont conservées le temps nécessaire au
              traitement de votre demande, et au maximum 12 mois.
            </p>
          </div>

          {/* Vos droits */}
          <div>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-4">
              Vos droits
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès,
              de rectification, de suppression, d&apos;opposition et de
              portabilité de vos données. Pour exercer ces droits, contactez
              danielrollin@digicorpex.com.
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-4">
              Cookies
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Ce site utilise Google Analytics (Google LLC) pour mesurer
              l&apos;audience. Ce service n&apos;est activé qu&apos;après
              votre consentement, recueilli via la bannière présente en bas
              de page. Vous pouvez modifier ou retirer votre consentement à
              tout moment via le lien « Gérer les cookies » en pied de page.
              Votre choix est conservé pendant 6 mois.
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
