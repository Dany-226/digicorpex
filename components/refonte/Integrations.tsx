import LogoMarquee from "./LogoMarquee"

export default function Integrations() {
  return (
<section className="connectors" id="integrations" data-motion-section>
 <div className="rock-transition"></div><div className="light-field"></div>
 <div className="connectors-head">
   <div className="eyebrow">Connexion / sans remplacer votre stack</div>
   <h2>Vos outils savent déjà beaucoup de choses.<br /><em>Nous les faisons travailler ensemble.</em></h2>
   <p className="connectors-intro">Salesforce connaît vos clients. Outlook reçoit leurs demandes. Excel contient vos données. Votre agenda connaît vos disponibilités.<br /><br />Le problème n&apos;est pas nécessairement l&apos;outil. <strong>C&apos;est ce qui se passe entre les outils.</strong></p>
 </div>
 <div className="tool-groups">
   <div className="tool-label">Nous nous connectons à votre environnement</div>
   <LogoMarquee kind="tools" />
   <div className="tool-label">Et choisissons l&apos;intelligence adaptée à chaque tâche</div>
   <LogoMarquee kind="ai" />
   <div className="tool-label methods-label">Votre entreprise n&apos;a pas à s&apos;adapter à l&apos;IA. C&apos;est l&apos;IA qui doit s&apos;adapter à votre entreprise.</div>
   <div className="connect-methods">
    <article className="connect-method"><span>01</span><h3>Nouveaux standards IA</h3><p>MCP — connexion structurée aux systèmes et outils compatibles.</p></article>
    <article className="connect-method"><span>02</span><h3>Vos logiciels communiquent</h3><p>API — intégration directe avec vos applications existantes.</p></article>
    <article className="connect-method"><span>03</span><h3>Réagir en temps réel</h3><p>Webhooks — une action déclenche immédiatement la suivante.</p></article>
    <article className="connect-method"><span>04</span><h3>Votre outil est spécifique</h3><p>Connecteur sur mesure — nous relions aussi vos systèmes propriétaires.</p></article>
   </div>
 </div>
</section>
  )
}
