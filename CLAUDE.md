# CLAUDE.md — Digicorpex Project Context

> Ce fichier est lu par Claude Code à chaque session. Ne pas modifier sans raison.
> Dernière mise à jour : avril 2026

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

```
digicorpex/
├── app/
│   ├── layout.tsx              # Layout racine (font, metadata globale)
│   ├── page.tsx                # Home
│   ├── services/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── blog/
│   │   ├── page.tsx            # Liste des articles
│   │   └── [slug]/
│   │       └── page.tsx        # Article individuel
│   └── api/
│       └── contact/
│           └── route.ts        # Endpoint Resend
├── components/
│   ├── ui/                     # shadcn/ui (ne pas modifier manuellement)
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── RealisationsCarousel.tsx
│   │   └── BlogPreview.tsx
│   ├── blog/
│   │   ├── ArticleHeader.tsx
│   │   ├── ArticleContent.tsx
│   │   ├── SocialSidebar.tsx
│   │   ├── ExpertiseBadge.tsx
│   │   └── RelatedArticles.tsx
│   └── shared/
│       ├── SEO.tsx
│       └── ContactForm.tsx
├── content/
│   └── blog/                   # Fichiers .mdx (1 fichier = 1 article)
│       ├── cahier-des-charges.mdx
│       ├── seo-conversationnel.mdx
│       └── ...
├── lib/
│   ├── mdx.ts                  # Utilitaires lecture MDX
│   └── resend.ts               # Client Resend
├── public/
│   └── images/
├── tailwind.config.ts          # Tokens design system (CRITIQUE)
├── next.config.mjs
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
- Email : `contact@digicorpex.com`
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

---

## 12. Convention de travail avec Claude Code

- **1 session = 1 tâche** du PLAN.md (voir fichier séparé)
- Toujours vérifier la cohérence avec le design system avant de créer un composant
- Ne jamais créer de styles inline — tout passe par les classes Tailwind avec les tokens
- Les composants sont en TypeScript (`.tsx`)
- Nommage : PascalCase pour les composants, kebab-case pour les fichiers MDX
