# CLAUDE.md — Digicorpex Project Context

> Ce fichier est lu par Claude Code à chaque session. Ne pas modifier sans raison.
> Dernière mise à jour : avril 2026

---

## 0. Règle absolue — Typographie

TYPOGRAPHIE : ne jamais utiliser de cadratins (—). Tiret simple (-) uniquement, ou reformulation.

---

## 1. Projet

**Digicorpex** est une agence web & digital dont le site a deux fonctions :
1. **Acquérir des leads** via un blog SEO à forte valeur éditoriale
2. **Crédibiliser** via un portfolio de réalisations et une page services

Le site est un **rebuild complet** depuis un brouillon Base44 (React/Vite). On ne migre pas le code — on s'en sert uniquement comme référence de contenu.

---

## 2. Stack technique

| Élément | Choix | Raison |
|---|---|---|
| Framework | **Next.js 14** App Router | SSG natif, métadonnées par route, optimal SEO |
| Rendu | `output: 'export'` (full static) | Cloudflare Pages, zéro runtime Edge |
| Styling | **Tailwind CSS v3** + tokens custom | Design system précis (voir section 5) |
| Composants | **shadcn/ui** | Base solide, headless, compatible Tailwind |
| Blog | **MDX** via `@next/mdx` | Édition via Claude Code + push GitHub |
| Formulaire | **Resend** (API REST) | Free tier, simple, fiable |
| Fonts | **Manrope + Inter** (Google Fonts) | Définis dans le design system |
| Icons | **Lucide React** | Cohérent avec shadcn |
| Déploiement | **Cloudflare Pages** ← GitHub | CI/CD automatique au push |
| Domaine | OVH → Cloudflare (nameservers) | |

---

## 3. Structure des fichiers

> Vérifiée contre le repo réel le 22/08/2026 (l'ancienne version de ce bloc datait d'avant
> plusieurs refontes et migrations - Brevo→Resend notamment - et n'avait jamais été recalée).

```
digicorpex/
├── app/
│   ├── layout.tsx              # Layout racine (font, metadata globale)
│   ├── page.tsx                # Home
│   ├── globals.css
│   ├── icon.svg                # Favicon (convention Next.js App Router)
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── services/
│   │   ├── page.tsx
│   │   └── automatisation/
│   │       └── page.tsx        # Redirige vers /agents en prod (next.config.mjs)
│   ├── about/
│   │   └── page.tsx
│   ├── agents/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── mentions-legales/
│   │   └── page.tsx
│   ├── confidentialite/
│   │   └── page.tsx
│   ├── blog/
│   │   ├── page.tsx            # Liste des articles
│   │   └── [slug]/
│   │       └── page.tsx        # Article individuel
│   └── api/
│       └── contact/
│           └── route.ts        # Diagnostic PDF uniquement (Brevo) - PAS le formulaire de contact
├── functions/
│   └── api/
│       └── contact.ts          # Cloudflare Pages Function - formulaire de contact, Resend
├── components/
│   ├── ui/                     # shadcn/ui (ne pas modifier manuellement)
│   │   ├── badge.tsx, button.tsx, card.tsx, input.tsx, textarea.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx, AgentAnimation.tsx
│   │   ├── UseCasesSection.tsx, UseCaseLogPanel.tsx
│   │   ├── ServicesGrid.tsx, ContrastSection.tsx, IntegrationsSection.tsx
│   │   ├── BlogPreview.tsx, CTASection.tsx
│   ├── agents/
│   │   ├── AgentsHero.tsx, AgentsGrid.tsx, AgentWorkflow.tsx, AgentsCTA.tsx
│   ├── automatisation/
│   │   ├── HeroAuto.tsx, AccrocheAuto.tsx, TeasingAuto.tsx, CeQuOnChange.tsx
│   │   ├── CommentCaPasse.tsx, TarifAuto.tsx, CTAFinalAuto.tsx
│   ├── blog/
│   │   ├── DiagnosticLeadMagnet.tsx, SocialSidebar.tsx, StatGrid.tsx
│   └── shared/
│       ├── ContactForm.tsx
│       └── ScrollReveal.tsx
├── content/
│   └── blog/                   # Fichiers .mdx (1 fichier = 1 article) - 5 articles actuellement
│       ├── cahier-des-charges.mdx
│       ├── seo-conversationnel.mdx
│       ├── contenu-ia-seo.mdx
│       ├── google-maps-local.mdx
│       └── wiki-ia-memoire-entreprise.mdx
├── lib/
│   ├── mdx.ts                  # Utilitaires lecture MDX
│   └── utils.ts
├── public/
│   ├── _redirects              # Redirections Cloudflare Pages
│   ├── logo.svg, logo-light.svg, logo-tagline.svg
│   ├── downloads/               # diagnostic-automatisation.pdf, diagnostic.html
│   └── images/
├── tailwind.config.ts          # Tokens design system (CRITIQUE)
├── next.config.mjs
├── .dev.vars                    # Secrets locaux Wrangler (gitignore, jamais commité)
└── CLAUDE.md                   # Ce fichier
```

---

## 4. Pages & routes

| Route | Composant | Référence HTML |
|---|---|---|
| `/` | `app/page.tsx` | home.html |
| `/services` | `app/services/page.tsx` | services.html |
| `/about` | `app/about/page.tsx` | — |
| `/blog` | `app/blog/page.tsx` | blog-list.html |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | blog-post.html |
| `/contact` | `app/contact/page.tsx` | contact.html |

### Patterns communs à toutes les pages

**Nav active state :** lien actif = `text-on-surface border-b-2 border-on-surface pb-1` / inactif = `text-on-surface-variant hover:text-on-surface`

**Sections espacement standard :** `py-32 px-8` avec `max-w-7xl mx-auto`

**Images avec effet grayscale :** `grayscale hover:grayscale-0 transition-all duration-700` — utilisé sur toutes les photos de services et réalisations

**Material Symbols :** les icônes utilisées dans les HTML de référence sont des Material Symbols Google. Les remplacer par leurs équivalents **Lucide React** les plus proches lors du build Next.js. Mapping principal :
- `arrow_forward` → `ArrowRight`
- `check_circle` → `CheckCircle2`
- `share` → `Share2`
- `bookmark` → `Bookmark`
- `link` → `Link2`
- `calendar_today` → `Calendar`
- `schedule` → `Clock`
- `search` → `Search`
- `workspace_premium` → `Award`
- `corporate_fare` → `Building2`
- `location_on` → `MapPin`
- `chevron_right` → `ChevronRight`
- `keyboard_double_arrow_right` → `ChevronsRight`
- `lock` → `Lock`

---

## 5. Design System — CRITIQUE

> Le design system est NON-NÉGOCIABLE. Toute déviation est une erreur.
> Référence visuelle : les deux screenshots fournis (blog post + services page).
> Direction créative : **"The Digital Architect"** — portfolio architectural premium.

### Palette de tokens (tailwind.config.ts)

```ts
colors: {
  // Surfaces (backgrounds)
  'surface': '#f6fafe',                    // bg principal
  'surface-bright': '#f6fafe',
  'surface-container-lowest': '#ffffff',   // cards
  'surface-container-low': '#eef4fa',      // sections légères
  'surface-container': '#e5eff7',          // sections
  'surface-container-high': '#ddeaf3',     // inputs bg
  'surface-container-highest': '#d5e5ef',
  'surface-variant': '#d5e5ef',
  'surface-dim': '#cadde9',

  // Brand colors
  'primary': '#5f5e5e',
  'primary-dim': '#535252',
  'primary-container': '#e5e2e1',
  'secondary': '#47617c',                  // CTA principal, accents
  'secondary-dim': '#3b5570',              // hover CTA
  'secondary-container': '#cfe5ff',
  'tertiary': '#47627b',
  'tertiary-container': '#bbd7f6',         // Expertise Badge

  // Text
  'on-surface': '#26343d',                 // texte principal (jamais #000)
  'on-surface-variant': '#52616a',         // texte secondaire
  'on-secondary': '#f7f9ff',
  'on-tertiary': '#f6f9ff',
  'on-tertiary-container': '#304c64',

  // Outlines
  'outline': '#6e7d86',
  'outline-variant': '#a4b4be',            // ghost borders à 15% opacity seulement

  // Utilitaires
  'background': '#f6fafe',
  'inverse-surface': '#0a0f12',
  'inverse-on-surface': '#999da1',
}
```

### Typographie

```ts
fontFamily: {
  headline: ['Manrope', 'sans-serif'],   // Titres, display, nombres
  body: ['Inter', 'sans-serif'],          // Corps, labels
  label: ['Inter', 'sans-serif'],
}
```

Échelles :
- Display hero : `text-5xl md:text-7xl`, `font-extrabold`, `tracking-tighter`, `leading-[1.1]`
- H2 sections : `text-3xl`, `font-bold`, `tracking-tight`, `font-headline`
- Body : `text-lg`, `leading-loose`, `font-body`
- Labels/tags : `text-xs`, `uppercase`, `tracking-widest`, `font-label`

### Border radius

```ts
borderRadius: {
  DEFAULT: '0.125rem',   // sharp corporate — utiliser par défaut
  lg: '0.25rem',
  xl: '0.5rem',
  full: '0.75rem',       // UNIQUEMENT pour utility chips
}
```

### Shadows

```ts
// Seule shadow autorisée — "editorial shadow"
'editorial-shadow': '0 48px 48px -12px rgba(38, 52, 61, 0.06)'
```

### CSS custom classes à définir dans globals.css

```css
.glass-nav {
  background: rgba(246, 250, 254, 0.8);
  backdrop-filter: blur(12px);
}

.editorial-shadow {
  box-shadow: 0 48px 48px -12px rgba(38, 52, 61, 0.06);
}
```

---

## 6. Règles design — INTERDICTIONS STRICTES

- ❌ **Pas de bordures 1px solides** pour délimiter des sections ou des cards
- ❌ **Pas de `#000000`** pour le texte — utiliser `on-surface` (#26343d)
- ❌ **Pas de `rounded-full`** sauf pour les utility chips
- ❌ **Pas de grilles 12 colonnes symétriques partout** — utiliser des layouts 60/40 ou asymétriques
- ❌ **Pas de dividers `<hr>`** — remplacer par du spacing vertical ou des blocs `surface-container-high`
- ❌ **Pas de placeholders comme labels** dans les formulaires

### Règles positives

- ✅ Profondeur par **tonal layering** : `surface` → `surface-container-low` → `surface-container-lowest`
- ✅ Glassmorphism sur la navbar : `surface-container-lowest` à 80% opacity + `blur(12px)`
- ✅ Espacement vertical généreux entre sections : `py-20` à `py-32` (80px–120px)
- ✅ Blog : colonne centrale max `max-w-2xl` (680px) pour la lisibilité
- ✅ Gradient ou glassmorphism sur les CTAs et hero sections
- ✅ Nombres et data en `font-headline` (Manrope)

---

## 7. Composants signature

### Expertise Badge
```tsx
<span className="inline-flex items-center gap-1.5 px-3 py-1 bg-tertiary-container text-on-tertiary-container text-xs font-label uppercase tracking-widest rounded-full">
  Architecture Certified
</span>
```

### Bouton Primary (CTA)
```tsx
<button className="bg-secondary text-on-secondary px-6 py-2.5 rounded-sm font-headline font-bold text-sm hover:bg-secondary-dim transition-all duration-300">
  Get a Quote
</button>
```

### Input formulaire (sans box)
```tsx
<div>
  <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
    Nom
  </label>
  <input className="w-full bg-surface-container-high border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors" />
</div>
```

### Card article blog (no border)
```tsx
<article className="bg-surface-container-lowest editorial-shadow rounded-sm p-8">
  {/* Pas de border, profondeur par shadow et background */}
</article>
```

---

## 8. SEO — Métadonnées

Chaque page doit exporter une fonction `generateMetadata` Next.js :

```ts
export const metadata: Metadata = {
  title: 'Page Title | Digicorpex',
  description: '...',
  openGraph: { ... },
}
```

Les articles MDX doivent contenir un frontmatter :
```mdx
---
title: "Titre de l'article"
description: "Meta description"
date: "2026-01-22"
readTime: "27 min"
category: "SEO"
slug: "cahier-des-charges"
---
```

Schema.org via JSON-LD dans les layouts — Organization sur toutes les pages, BlogPosting sur les articles.

---

## 9. Formulaire de contact

- Backend : **Resend** (`resend.com`)
- Route : `app/api/contact/route.ts` (POST)
- Validation côté client : champs requis nom, email, message
- Validation côté serveur : vérification basique avant envoi
- Variable d'environnement : `RESEND_API_KEY` (dans `.env.local`, ne jamais commiter)

---

## 10. Contenu de référence (brouillon Base44)

Les réalisations à afficher dans le carousel :
- **Stumpr** — Réseau social dédié aux amputés — `https://stumpr.app`
- **Expertise Prothèse** — Plateforme d'expertise en dommage corporel — `https://expertiseprothese.com`
- **IA Lucide** — Média indépendant sur l'IA — `https://ialucide.fr/`
- **Guide-Aidant** — Ressources pour aidants familiaux — `https://guide-aidant.fr/`

Contact réel :
- Email : `danielrollin@digicorpex.com`
- Tél : `+33 6 74 05 86 57`

---

## 11. Commandes utiles

```bash
# Dev
npm run dev

# Build static
npm run build
# → génère le dossier /out

# Vérifier le build avant push
npx serve out
```

### Tester les Cloudflare Pages Functions (formulaire de contact et tout ce qui suivra)

`npm run dev` (`next dev` seul) n'exécute PAS les fichiers sous `functions/` - ce sont des
Cloudflare Pages Functions (routes serveur qui tournent sur le runtime Workers), un mécanisme
totalement séparé de Next.js. En dev classique, un appel `fetch('/api/contact', ...)` retombe
sur la route Next.js `app/api/contact/route.ts` si elle existe encore, ou sur un 404 sinon - dans
les deux cas ça n'a rien à voir avec ce qui tourne réellement en production.

Pour tester une Pages Function en conditions réelles :

```bash
npm run build:static          # génère /out
npx wrangler pages dev out --compatibility-date=2026-01-01
```

Sans passer par `wrangler pages dev`, une Pages Function semblera cassée (erreur 400/404) alors
qu'elle ne l'est pas - c'est juste que `next dev` n'a jamais eu accès au code qui la gère. Ne pas
déboguer `functions/*` via `next dev`, dans cette session ou une future.

---

## 12. Convention de travail avec Claude Code

- **1 session = 1 tâche** du PLAN.md (voir fichier séparé)
- Toujours vérifier la cohérence avec le design system avant de créer un composant
- Ne jamais créer de styles inline — tout passe par les classes Tailwind avec les tokens
- Les composants sont en TypeScript (`.tsx`)
- Nommage : PascalCase pour les composants, kebab-case pour les fichiers MDX

---

## 13. Journal - État réel (juillet 2026)

> Suivi des tâches confirmées et en attente. Mis à jour à chaque session significative.

### Fait

- **Email de contact remplacé** : `contact@digicorpex.com` -> `danielrollin@digicorpex.com` partout (Schema.org dans `app/layout.tsx` et `app/about/page.tsx`, route Brevo `app/api/contact/route.ts`, Footer, page `/contact`, `diagnostic.html`, docs projet). Choix assumé : adresse nominative en façade, pas d'alias générique.
- **Script de régénération PDF** : `scripts/generate-diagnostic-pdf.mjs` (commande `npm run generate:diagnostic-pdf`) régénère `public/downloads/diagnostic-automatisation.pdf` depuis `diagnostic.html` via Puppeteer. Point d'attention documenté : ne pas ajouter de `footerTemplate` Puppeteer si le CSS source a déjà `@page { @bottom-center }` - certains builds Chromium honorent les deux et dupliquent le footer visuellement.
- **Page `/agents` créée** avec `AgentWorkflow.tsx`, animation SVG signature (5 nœuds qui s'allument séquentiellement toutes les 800ms, connecteurs en `stroke-dashoffset`, cycle de 6s). Décision de design actée : une seule animation narrative forte plutôt que plusieurs effets dispersés. Redirection 301 `/services/automatisation` -> `/agents` gérée via `public/_redirects` (les `redirects` de `next.config.mjs` sont ignorés en mode `output: export`, donc non fonctionnels sur le build Cloudflare Pages réel).
- **Espace blanc sous le Hero (Home) corrigé** : la colonne de texte du Hero varie significativement en hauteur selon le breakpoint (402px en desktop jusqu'à 547px sur mobile étroit, environ 36% d'écart) - donc pas de hauteur stable sur laquelle caler le terminal. Solution retenue : ajustement du timing de `AgentAnimation.tsx` plutôt que du `min-h-[480px]`. Les 2 premières lignes sont visibles dès le montage (`INITIAL_VISIBLE = 2`) et les 4 suivantes arrivent en 300ms d'écart au lieu de 700 à 800ms, donc le terminal atteint son état plein en environ 1,2s au lieu de 4,2s sur un cycle de 8s. Vérifié par capture d'écran et mesure DOM sur desktop (1280 à 1920px) et mobile (375 à 430px) : les hauteurs de section sont inchangées (le `min-h` n'a pas bougé), seule la perception de vide en début de cycle est corrigée.

- **`/mentions-legales` créée** : page statique (`app/mentions-legales/page.tsx`) - éditeur, directeur de publication, contact, hébergement (Cloudflare), propriété intellectuelle, données personnelles (renvoi vers `/confidentialite`). Existait déjà en local non commitée depuis une session précédente (19/07) ; vérifiée (aucun cadratin, design system respecté, `tsc --noEmit` propre) puis commitée. Le Footer pointait déjà vers cette route, rien à modifier côté intégration.
- **Point d'attention - assets de marque multi-variantes** : Avant d'intégrer un nouvel asset de marque livré en plusieurs variantes (avec/sans tagline, clair/sombre), vérifier la cohérence de taille du wordmark entre les fichiers, pas seulement le padding/viewBox de chaque fichier pris isolément. Un écart de taille de police entre variantes ne se voit qu'en comparaison côte à côte à hauteur de rendu égale.
- **`/confidentialite` créée** (session précédente) : la route existe désormais, plus un lien mort.
- **Formulaire de contact migré vers Resend (Cloudflare Pages Function)** : `app/api/contact/route.ts` (Next.js Route Handler) ne s'exécutait en réalité jamais en production. Confirmé par deux vérifications indépendantes : build statique local (`STATIC_EXPORT=1 next build` liste la route en `ƒ Dynamic`, absente du dossier `/out` généré - aucun fichier `api/` nulle part dedans) et test live (`curl -I` sur `/api/contact` en prod renvoie 405 sur POST et 404 sur HEAD, signature exacte d'un hébergement 100% statique sans Pages Functions). Le formulaire échouait donc silencieusement pour tout visiteur depuis le passage en export statique, indépendamment du fournisseur d'emailing utilisé. Corrigé en créant `functions/api/contact.ts` (Cloudflare Pages Function, runtime Workers) qui intercepte `/api/contact` en production - l'URL appelée par `ContactForm.tsx` ne change pas. Brevo abandonné pour ce flux (conflit DKIM/SPF avec le MX Zoho existant à la racine du domaine, jamais résolu) au profit de Resend, domaine `digicorpex.com` vérifié (DKIM, SPF, DMARC). Testé de bout en bout via `wrangler pages dev` (voir section 11) : envoi réel accepté par l'API Resend (200), réception confirmée sur `danielrollin@digicorpex.com` le 20/08/2026.

### Vérifié cette session

- **Footer** : description à jour ("Agents IA pour PME et TPE...", l'ancienne version "Agence web & digital..." n'est plus présente) et lien "Agents IA" présent en première position de la nav, vers `/agents`. Confirmé.
- **Aucun autre appelant de `/api/contact`** : recherche exhaustive (`.ts`, `.tsx`, `.mjs`, `.js`, hors `node_modules`) - seuls `ContactForm.tsx` (formulaire de contact, migré) et `DiagnosticLeadMagnet.tsx` (`subject: 'Diagnostic automatisation'`, non affecté) postent vers cette route.

### À faire

- **`/cgv`** : lien mort dans le Footer, route jamais créée.
- **Diagnostic PDF (`handleDiagnostic` dans `app/api/contact/route.ts`) toujours cassé en prod, même cause structurelle** : reste sur Brevo, hors scope de la migration Resend de cette session. Dépend encore de `fs.readFileSync` pour lire le PDF (incompatible avec le runtime Workers d'une Pages Function - il faudra un autre mécanisme, ex. asset binding Cloudflare) et de la création/validation de `contact@digicorpex.com` côté expéditeur avant d'être testable. À traiter dans une session séparée.
