import Link from 'next/link'

export default function UseCases() {
  return (
<section className="section" id="cas" data-motion-section><div className="eyebrow">Cas d&apos;usage / le métier avant la technologie</div><h2>Des agents pour des problèmes qui existent vraiment.</h2><div className="cases">
<article className="case"><div className="n">01 / DÉMÉNAGEUR</div><h3>Du premier appel<br />au planning.</h3><p>Collecte, données manquantes, préparation du devis, relance et organisation de la tournée.</p></article>
<Link href="/blog/traiteur-devis-reservations" className="case case-link"><div className="n">02 / TRAITEUR</div><h3>Une demande<br />ne se perd plus.</h3><p>Téléphone, email ou formulaire : l&apos;agent structure le besoin, vérifie les contraintes et prépare l&apos;action.</p><span className="case-read">Lire le cas d’usage ↗</span></Link>
<article className="case"><div className="n">03 / GÉRANT DE BAR</div><h3>Le planning absorbe<br />l&apos;imprévu.</h3><p>Disponibilités, compétences, contrats et absences consolidés sous contrôle humain.</p></article>
</div></section>
  )
}
