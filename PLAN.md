# PLAN.md — Digicorpex Build Plan

> Découpage en sessions Claude Code autonomes et séquencées.
> Chaque phase = un bloc livrable et testable avant de passer au suivant.
> Statut : ⬜ À faire | 🔄 En cours | ✅ Terminé

---

## PHASE 0 — Setup & Configuration
*Durée estimée : 1 session*

### 0.1 — Init projet Next.js ⬜
```bash
npx create-next-app@latest digicorpex \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"
```

### 0.2 — Configuration next.config.mjs ⬜
- Activer `output: 'export'`
- Activer MDX via `@next/mdx`
- Configurer `images.unoptimized: true` (requis pour static export)

### 0.3 — Tailwind config — Design System tokens ⬜
- Copier intégralement la palette de couleurs depuis CLAUDE.md section 5
- Configurer `fontFamily` (Manrope, Inter)
- Configurer `borderRadius` (valeurs custom)
- Ajouter `editorial-shadow` dans `theme.extend.boxShadow`

### 0.4 — globals.css ⬜
- Import Google Fonts (Manrope + Inter) via `<link>` dans layout, pas CSS import
- Classes `.glass-nav` et `.editorial-shadow`
- Reset de base cohérent avec le design system
- `selection` color : `secondary-container`

### 0.5 — Installation des dépendances ⬜
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install resend
npm install lucide-react
npm install clsx tailwind-merge
npx shadcn-ui@latest init
```
Composants shadcn à installer : `button`, `card`, `input`, `textarea`, `badge`

### 0.6 — Structure de dossiers ⬜
Créer l'arborescence complète définie dans CLAUDE.md section 3 (dossiers vides avec `.gitkeep`)

### 0.7 — Variables d'environnement ⬜
- Créer `.env.local` avec `RESEND_API_KEY=`
- Créer `.env.example` (sans valeurs) à commiter
- Vérifier que `.env.local` est dans `.gitignore`

**Livrable phase 0 :** `npm run dev` tourne sans erreur, `npm run build` génère `/out`

---

## PHASE 1 — Layout & Navigation
*Durée estimée : 1 session*

### 1.1 — app/layout.tsx ⬜
- Import fonts Google (Manrope + Inter) via `next/font/google`
- Metadata globale (title template, description, OG)
- Schema.org Organization en JSON-LD
- Body avec classes de base design system

### 1.2 — Header.tsx ⬜
- Glassmorphism : `surface-container-lowest` 80% opacity + `blur(12px)`
- Logo "digicorpex" en Manrope, `font-bold`, `tracking-tighter`
- Nav : Blog, Services, About — style actif avec `border-b-2`
- CTA "Obtenir un devis" → bouton `secondary` sharp (`rounded-sm`)
- Mobile : menu hamburger avec état open/close
- Fixed top, z-50

### 1.3 — Footer.tsx ⬜
- Background `inverse-surface` (#0a0f12)
- 4 colonnes : Brand + tagline / Navigation / Légal / Contact
- Contact : email + téléphone
- Copyright centré en bas
- Pas de bordures — séparation par spacing

**Livrable phase 1 :** Layout visible sur toutes les routes, nav fonctionnelle

---

## PHASE 2 — Page Home
*Durée estimée : 2 sessions*
*Référence HTML : home.html*

### 2.1 — Hero Section ⬜
- Grid `lg:grid-cols-12` : texte `lg:col-span-7` + visuel `lg:col-span-5`
- Expertise Badge "Premier Agence Digitale" en `tertiary-container`
- H1 Manrope `text-5xl md:text-7xl font-extrabold tracking-tighter` sur 2 lignes, mot clé en `text-secondary`
- Sous-titre `text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed`
- Double CTA : `bg-secondary` "Démarrer votre projet" + `bg-surface-container-high` "Voir notre expertise" avec icône arrow
- Visuel droite : image `aspect-square` en `grayscale opacity-90` + overlay gradient `from-secondary/20`
- Float card absolue en bas-gauche de l'image : `bg-surface-container-lowest p-8 shadow-xl` avec stat "98%" + label
- Bande décorative `absolute top-0 right-0 w-1/3 h-full bg-surface-container-low -z-10 opacity-50`

### 2.2 — Services Grid (hover reveal) ⬜
- Section fond `surface-container-low`
- H2 + barre décorative `w-20 h-1.5 bg-secondary`
- Grid 3 colonnes `border-t border-l border-outline-variant/20`
- Chaque card : `bg-surface-container-lowest p-12 border-r border-b border-outline-variant/20`
- **Hover effect** : `group hover:bg-secondary transition-colors duration-500` — tout le texte et l'icône passent en `on-secondary`
- Icônes Material Symbols en `text-4xl text-secondary group-hover:text-on-secondary`
- 3 services : Consulting Stratégique / Ingénierie Produit / Analytics Digital

### 2.3 — Blog Preview ⬜
- Layout `lg:grid-cols-12` : article featured `lg:col-span-8` + liste `lg:col-span-4`
- Featured : image `aspect-[16/9]` en `grayscale` + hover scale, catégorie label, H3, excerpt, lien "Lire l'article →"
- Liste droite : 3 articles en stack avec catégorie + H4 + séparateur `h-px bg-outline-variant/30`
- Lien "Tous les articles" en `uppercase tracking-widest text-secondary` aligné en haut à droite du header
- Articles lus depuis MDX dynamiquement

### 2.4 — CTA Section ⬜
- `bg-secondary text-on-secondary py-32`
- H2 `text-4xl md:text-6xl font-extrabold` + sous-titre `opacity-80`
- Bouton unique `bg-surface-container-lowest text-on-background px-10 py-5 rounded-sm font-bold text-lg shadow-2xl`

**Livrable phase 2 :** Home complète, statique, responsive

---

## PHASE 3 — Page Services
*Durée estimée : 1 session*
*Référence HTML : services.html*

### 3.1 — Hero Services ⬜
- Container `max-w-3xl` aligné à gauche
- Expertise Badge "Notre Expertise" en `tertiary-container text-[10px] tracking-[0.2em]`
- H1 `text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]` — "Architecting" noir + "Digital Excellence." en `text-secondary`
- Sous-titre `text-lg text-on-surface-variant max-w-xl`

### 3.2 — Services alternés (3 blocs) ⬜
- `space-y-32` entre les blocs — espacement massif
- **Service 01 — Web Development** : image `md:col-span-7` gauche + contenu `md:col-span-5` droite
- **Service 02 — UX/UI Design** : contenu `md:col-span-5` gauche (`order-2 md:order-1`) + image droite
- **Service 03 — SEO Strategy** : image gauche + contenu droite (comme 01)
- Images : `bg-surface-container-low p-2` wrappant `aspect-video` avec `grayscale hover:grayscale-0 transition-all duration-700` + overlay `bg-secondary/10 mix-blend-multiply`
- Numérotation : `font-headline font-extrabold text-surface-dim text-8xl block mb-4`
- H2 service : `text-4xl font-headline font-bold text-on-background`
- Checklist : `material-symbols-outlined text-secondary text-sm` + texte `text-sm font-medium`
- CTA inline : `flex items-center gap-2 group font-headline font-bold text-secondary` + icône `arrow_forward` avec `group-hover:translate-x-1`
- Services FR : Développement Web / Design UX/UI / Stratégie SEO

### 3.3 — CTA finale ⬜
- `bg-secondary py-32` pleine largeur
- H2 `text-5xl font-extrabold text-on-secondary tracking-tight`
- Bouton 1 : `bg-surface text-on-surface px-10 py-4 rounded-sm font-bold uppercase tracking-widest`
- Bouton 2 : `text-on-secondary border-b border-on-secondary/30 pb-1 font-bold` (text link underline)

**Livrable phase 3 :** Page Services complète

---

## PHASE 4 — Blog
*Durée estimée : 2 sessions*

### 4.1 — Système MDX ⬜
- Configurer `lib/mdx.ts` : lecture des fichiers MDX, extraction du frontmatter
- Fonction `getAllArticles()` — trie par date desc
- Fonction `getArticleBySlug(slug)` — pour pages individuelles
- Types TypeScript frontmatter : `title, description, date, readTime, category, slug`

### 4.2 — Migration contenu ⬜
Créer les fichiers MDX depuis le contenu du brouillon :
- `content/blog/cahier-des-charges.mdx`
- `content/blog/seo-conversationnel.mdx`
- `content/blog/contenu-ia-seo.mdx`
- `content/blog/google-maps-local.mdx`

### 4.3 — Page liste `/blog` ⬜
*Référence HTML : blog-list.html*

**Header éditorial :**
- Layout flex `justify-between items-end` : titre gauche + search input droite
- Badge "Insights & Strategy"
- H1 `text-5xl md:text-7xl font-extrabold tracking-tighter` — "The Digital" + "Perspective." en `text-secondary`
- Search input : style underline `bg-surface-container-high border-b-2 border-primary-container focus:border-secondary`

**Grille principale `lg:grid-cols-12 gap-16` :**

*Colonne articles `lg:col-span-8` :*
- Article featured : image `aspect-[16/9]` + hover scale, meta `text-[11px] uppercase tracking-widest`, H2 `text-3xl md:text-4xl`, excerpt `text-lg`, lien "Lire →"
- Grid 2 colonnes : 2 articles avec image `aspect-square` + catégorie `text-secondary uppercase` + H3 + excerpt `line-clamp-3`
- Pagination custom : `w-12 h-[1px] bg-secondary` + numéros + "Next" avec chevron

*Sidebar `lg:col-span-4` :*
- **Lead gen form** : `bg-surface-container-low p-10` sans border, H3, email input underline, bouton `bg-on-background text-white`
- **Catégories** : titre `uppercase tracking-[0.2em] border-b border-surface-container-high`, liste avec compteurs `text-outline-variant text-[10px]`
- **Expertise Badge block** : `bg-tertiary-container/30 border border-tertiary-container/50 p-8`

### 4.4 — Page article `/blog/[slug]` ⬜
*Référence HTML : blog-post.html*

**Header `max-w-4xl mx-auto` :**
- Breadcrumb `text-xs uppercase tracking-widest` : Insights › Catégorie › Titre
- H1 `text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1]`
- Séparateur auteur/meta : `border-y border-outline-variant/15 py-6`
- Avatar `w-12 h-12 rounded-full` + nom `font-headline font-bold` + titre en `uppercase tracking-wider`
- Meta droite : icône calendar + date + icône schedule + temps de lecture

**Image featured `max-w-7xl mx-auto` :**
- `aspect-[21/9] w-full overflow-hidden rounded-sm`

**Article grid `lg:grid-cols-12 gap-16` :**

*Sidebar sociale `lg:col-span-1` (sticky) :*
- `border-r border-outline-variant/15`
- 3 boutons `w-10 h-10 rounded-sm hover:bg-surface-container` : share, bookmark, link
- Séparateur `w-px h-12 bg-outline-variant/20`

*Contenu `lg:col-span-7` :*
- Lead `text-xl md:text-2xl font-light leading-relaxed text-on-surface/90 mb-12`
- H2 `font-headline text-3xl font-bold tracking-tight mt-16 mb-6`
- Body `text-lg leading-loose text-on-surface-variant mb-8`
- Blockquote : `bg-surface-container-low p-10 border-l-4 border-secondary` + texte `text-2xl font-medium italic text-secondary`
- Mini grid 2 cols : cards `bg-surface-container-lowest p-8 editorial-shadow` avec numérotation `text-4xl font-black text-secondary/20`

*Sidebar droite `lg:col-span-4` :*
- Expertise Badge block : `bg-tertiary-container p-8` + icône `workspace_premium` FILL + titre + description
- Related articles : titre `uppercase tracking-widest border-b`, 2 articles avec catégorie + H6 + hover `text-secondary`
- CTA audit : `bg-inverse-surface p-8 text-on-primary` + bouton `bg-surface-container-lowest`

**Section auteur `max-w-4xl` :**
- `bg-surface-container-low p-12 flex gap-8`
- Avatar `w-32 h-32 rounded-sm grayscale hover:grayscale-0 transition-all duration-500`
- Bio + liens LinkedIn / Portfolio en `uppercase tracking-widest text-secondary`

**Lead Magnet `max-w-7xl` :**
- `bg-secondary px-8 py-24 md:p-24 rounded-sm relative overflow-hidden`
- Décoration : `absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2`
- Grid `lg:grid-cols-2 gap-16` : pitch gauche + formulaire blanc droite
- Formulaire blanc `bg-white p-10 rounded-sm shadow-2xl` avec email input + select + bouton

### 4.5 — Métadonnées ⬜
- `generateStaticParams` pour SSG des slugs
- `generateMetadata` depuis frontmatter
- Schema.org BlogPosting JSON-LD + BreadcrumbList

**Livrable phase 4 :** Blog fonctionnel, articles lisibles, SSG confirmé

---

## PHASE 5 — About & Contact
*Durée estimée : 1 session*

### 5.1 — Page About ⬜
- Hero éditorial sobre (même structure que Services hero)
- Section histoire — contenu aligné sur la réalité (Toulouse, pas Paris ni Bordeaux)
- Valeurs en cards `surface-container-lowest editorial-shadow`
- Schema.org address cohérent

### 5.2 — Page Contact ⬜
*Référence HTML : contact.html*

**Layout `lg:grid-cols-12 gap-16` :**

*Colonne gauche `lg:col-span-5` :*
- Label "Initier un Partenariat" en `text-xs uppercase tracking-widest text-secondary`
- H1 `text-5xl font-extrabold tracking-tighter` — texte + "Digital Future." en `text-secondary`
- Sous-titre `text-lg text-on-surface-variant max-w-md`
- Bloc localisation : icône `corporate_fare` dans `w-12 h-12 bg-surface-container rounded-sm` + adresse réelle (Toulouse)
- Bloc "Consultation expédiée" : `bg-surface-container-low p-8 border-l-4 border-secondary` + lien "Prendre rendez-vous →"

*Colonne droite `lg:col-span-7` :*
- Card `bg-surface-container-lowest p-10 shadow-[0px_48px_48px_rgba(38,52,61,0.06)]`
- Header card : progress dots `w-2.5 h-2.5 rounded-full` (1 `bg-secondary` + 2 `bg-surface-container-high`) + label "Qualification Projet"
- Grille formulaire `grid grid-cols-2 gap-8` pour Nom + Email
- Objectifs en radio buttons `grid grid-cols-2 gap-4` : chaque option `bg-surface-container-low p-4 rounded-sm`
- Textarea "Brief Projet (Confidentiel)" 4 lignes underline style
- Footer form : GDPR mention avec icône lock + bouton `bg-secondary px-10 py-4` avec icône double chevron
- Section map : `h-[300px] grayscale hover:grayscale-0 transition-all duration-700` + pin animé `animate-pulse`

### 5.3 — API Route Resend ⬜
- `app/api/contact/route.ts` POST
- Validation → `Resend.send()` → JSON response
- `RESEND_API_KEY` en variable d'environnement
- Email vers `contact@digicorpex.com`

**Livrable phase 5 :** Formulaire fonctionnel, emails reçus

---

## PHASE 6 — SEO & Performance
*Durée estimée : 1 session*

### 6.1 — Métadonnées globales ⬜
- Vérifier que chaque page a `generateMetadata` complet
- OG images (optionnel : statiques dans `/public/og/`)
- Twitter cards

### 6.2 — Sitemap ⬜
```ts
// app/sitemap.ts
// Génère sitemap.xml statique avec toutes les routes + articles
```

### 6.3 — robots.txt ⬜
```ts
// app/robots.ts
```

### 6.4 — Schema.org audit ⬜
- Organization : adresse cohérente (Toulouse), email, téléphone réels
- BlogPosting sur chaque article
- BreadcrumbList sur les articles
- Vérifier avec Google Rich Results Test

### 6.5 — Performance ⬜
- `next/image` sur toutes les images (avec `unoptimized: true` pour static export)
- Fonts chargées via `next/font/google` (pas de `<link>` dans useEffect)
- Vérifier que `/out` ne contient pas de JS inutile

**Livrable phase 6 :** Lighthouse > 90 sur toutes les catégories

---

## PHASE 7 — Déploiement
*Durée estimée : 1 session*

### 7.1 — Cloudflare Pages setup ⬜
- Connecter le repo GitHub
- Build command : `npm run build`
- Output directory : `out`
- Variables d'environnement : `RESEND_API_KEY`

### 7.2 — Domaine OVH → Cloudflare ⬜
- Changer les nameservers OVH vers Cloudflare
- Configurer le custom domain dans Cloudflare Pages
- Vérifier HTTPS automatique

### 7.3 — Tests post-déploiement ⬜
- Toutes les routes accessibles
- Formulaire de contact fonctionnel (test réel)
- Sitemap accessible sur `/sitemap.xml`
- Google Search Console — soumettre le sitemap

---

## Ordre de priorité recommandé

```
Phase 0 → Phase 1 → Phase 2 → Phase 4 → Phase 3 → Phase 5 → Phase 6 → Phase 7
```

Le blog est au cœur de la stratégie SEO — il passe avant la page Services.

---

## Template de prompt pour démarrer une session Claude Code

```
Contexte : projet Digicorpex — site Next.js 14 App Router, full static export, 
design system "Digital Architect" (voir CLAUDE.md).

Tâche : Phase X.Y — [NOM DE LA TÂCHE]

[Description spécifique de ce que tu veux accomplir dans cette session]

Contraintes design à respecter :
- [rappel des règles pertinentes pour cette tâche]

Fichiers concernés :
- [liste les fichiers à créer ou modifier]
```
