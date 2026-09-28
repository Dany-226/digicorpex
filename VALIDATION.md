# Validation de la refonte

Référence utilisateur : `design/reference/index.html` et textures du ZIP fourni.
Base locale : `d5e7dd58b5a29f77dfccb427de2725990f5dae2f`.

## Vérifié localement

- Build Next.js 14.2.35 en export statique : 22 pages générées.
- TypeScript : aucune erreur.
- ESLint : aucune erreur ; deux avertissements préexistants sur les balises img de composants d’ancienne homepage désormais inutilisés par l’accueil.
- 8 tests : contrats contact/PDF, validation de types et consentement, limite de taille, échappement HTML, idempotence transmise au fournisseur, erreurs réseau/fournisseur, mode de recette sans envoi, slugs publiés et exclusion des brouillons.
- Export : 8 pages principales, 5 articles publiés, absence des 2 brouillons, présence des assets CSS locaux, des canonicals et du fichier de redirection.
- Analyse des liens internes de toutes les pages exportées : aucun lien local manquant.
- JSON-LD de toutes les pages exportées : parsing réussi.
- Source HTML : les textes et sections retenus ont été repris en JSX ; aucun HTML utilisateur injecté au runtime.

Le build a été exécuté dans `/private/tmp/digicorpex-refonte-check`, copie des sources de la branche. Les dépendances proviennent du `node_modules` du précédent audit et correspondent au lockfile existant. Une installation fraîche `npm ci` et un audit des vulnérabilités restent à exécuter dans un environnement connecté. Le runtime local de validation est Node 24.19.0 ; Node 22 est demandé en CI.

## À vérifier avant merge

- Correspondance avec le dernier main distant et le commit Cloudflare en production.
- Installation fraîche, audit actuel des dépendances et statut GitHub Actions.
- Compilation/routage des Pages Functions sur Cloudflare Preview (Wrangler non disponible localement).
- Vérification visuelle et interactive sur navigateur : desktop/mobile, Safari/Chromium, clavier, pause et reset, contraste, performance. Aucun résultat visuel ou Lighthouse n’est déclaré acquis.
- Réception réelle d’un e-mail de recette contrôlé. Aucun e-mail réel n’a été envoyé pendant cette session.
- Statuts HTTP sur Preview : 404, redirection historique, robots/noindex propre à l’environnement.
- Validation utilisateur du rendu Preview avant merge main.

## Limites de l’environnement

GitHub n’est pas joignable depuis le terminal (résolution DNS bloquée). L’ouverture d’un serveur localhost retourne EPERM. L’ouverture du fichier local dans le navigateur intégré a également été rejetée par sa politique de sécurité. Aucun contournement n’a été appliqué. La Preview distante et la recette visuelle ne sont donc pas réalisées.

Voir `DEPLOYMENT.md` pour les étapes restantes et le rollback.
