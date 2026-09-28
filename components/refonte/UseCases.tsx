import Link from 'next/link'

export default function UseCases() {
  return (
<section className="section" id="cas" data-motion-section><div className="eyebrow">Cas d&apos;usage / le métier avant la technologie</div><h2>Des agents pour des problèmes qui existent vraiment.</h2><div className="cases">
<Link href="/blog/agent-ia-devis-demenagement-cas-client" className="case case-link"><div className="n">01 / DÉMÉNAGEUR</div><h3>Du premier appel<br />au planning.</h3><p>Collecte, données manquantes, préparation du devis, relance et organisation de la tournée.</p><span className="case-read">Lire le cas d’usage ↗</span></Link>
<Link href="/blog/traiteur-devis-reservations" className="case case-link"><div className="n">02 / TRAITEUR</div><h3>Une demande<br />ne se perd plus.</h3><p>Téléphone, email ou formulaire : l&apos;agent structure le besoin, vérifie les contraintes et prépare l&apos;action.</p><span className="case-read">Lire le cas d’usage ↗</span></Link>
<Link href="/blog/agent-ia-planning-bar-restaurant-cas-client" className="case case-link"><div className="n">03 / GÉRANT DE BAR</div><h3>Le planning absorbe<br />l&apos;imprévu.</h3><p>Disponibilités, compétences, contrats et absences consolidés sous contrôle humain.</p><span className="case-read">Lire le cas d’usage ↗</span></Link>
</div></section>
  )
}
