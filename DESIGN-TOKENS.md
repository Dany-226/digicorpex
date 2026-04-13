# DESIGN-TOKENS.md — Référence rapide

> Cheat sheet à garder ouvert pendant le développement.
> Source de vérité : CLAUDE.md section 5.

---

## Couleurs — Usage rapide

| Token Tailwind | Hex | Usage |
|---|---|---|
| `bg-surface` | #f6fafe | Background principal |
| `bg-surface-container-lowest` | #ffffff | Cards, éléments flottants |
| `bg-surface-container-low` | #eef4fa | Sections légères |
| `bg-surface-container` | #e5eff7 | Sections |
| `bg-surface-container-high` | #ddeaf3 | Inputs background |
| `bg-surface-dim` | #cadde9 | Textures, overlays |
| `bg-secondary` | #47617c | CTA, accents brand |
| `bg-secondary-dim` | #3b5570 | Hover CTA |
| `bg-tertiary-container` | #bbd7f6 | Expertise Badge |
| `bg-inverse-surface` | #0a0f12 | Footer |
| `text-on-surface` | #26343d | Texte principal |
| `text-on-surface-variant` | #52616a | Texte secondaire |
| `text-on-secondary` | #f7f9ff | Texte sur CTA |
| `text-on-tertiary-container` | #304c64 | Texte Expertise Badge |
| `border-outline-variant` | #a4b4be | Ghost borders (à 15% opacity) |
| `border-primary-container` | #e5e2e1 | Border input repos |
| `border-secondary` | #47617c | Border input focus |

---

## Typographie — Classes combinées

### Display Hero (H1 home/services)
```
font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] text-on-surface
```

### H2 Section
```
font-headline text-3xl font-bold tracking-tight text-on-surface
```

### H3 Article
```
font-headline text-2xl font-bold tracking-tight text-on-surface
```

### Numérotation géante décorative
```
font-headline text-8xl font-black text-secondary/10
```

### Numérotation card (01, 02...)
```
font-headline text-4xl font-black text-secondary/20
```

### Body standard
```
font-body text-lg leading-loose text-on-surface-variant
```

### Lead paragraph (intro article)
```
font-body text-xl md:text-2xl font-light leading-relaxed text-on-surface/90
```

### Label / Tag / Breadcrumb
```
font-label text-xs uppercase tracking-widest text-on-surface-variant
```

---

## Composants — Copy-paste prêt

### Navbar (glassmorphism)
```tsx
<nav className="fixed top-0 w-full z-50 glass-nav">
  <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
    <span className="font-headline text-2xl font-bold tracking-tighter text-on-surface">
      digicorpex
    </span>
    {/* nav links */}
    <button className="bg-secondary text-on-secondary px-6 py-2.5 rounded-sm font-headline font-bold text-sm hover:bg-secondary-dim transition-all duration-300">
      Obtenir un devis
    </button>
  </div>
</nav>
```

### Expertise Badge
```tsx
<span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-tertiary-container text-on-tertiary-container text-xs font-label uppercase tracking-widest rounded-full">
  Agence Digitale
</span>
```

### Card (no border)
```tsx
<div className="bg-surface-container-lowest editorial-shadow rounded-sm p-8">
  {/* contenu */}
</div>
```

### Blockquote article
```tsx
<blockquote className="bg-surface-container-low p-10 rounded-sm border-l-4 border-secondary my-12">
  <p className="text-2xl font-headline font-medium italic text-secondary leading-relaxed">
    "Citation..."
  </p>
</blockquote>
```

### Input formulaire (underline style)
```tsx
<div>
  <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
    Nom *
  </label>
  <input
    className="w-full bg-surface-container-high border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors duration-200 placeholder:text-on-surface-variant/40"
    placeholder=""
  />
</div>
```

### Section CTA (fond secondary)
```tsx
<section className="bg-secondary py-24 px-8">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-secondary mb-6">
      Prêt à bâtir votre présence digitale ?
    </h2>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="border-2 border-on-secondary/30 text-on-secondary px-8 py-3 rounded-sm font-headline font-bold text-sm hover:bg-on-secondary/10 transition-all">
        Démarrer un projet
      </button>
      <button className="text-on-secondary/70 hover:text-on-secondary px-8 py-3 font-headline text-sm transition-colors">
        Voir le portfolio →
      </button>
    </div>
  </div>
</section>
```

### Layout article (12 colonnes)
```tsx
<div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
  {/* Sidebar sociale — 1 col */}
  <aside className="hidden lg:block lg:col-span-1 sticky top-40 h-fit">
    {/* share, bookmark, link */}
  </aside>

  {/* Contenu — 7 cols */}
  <div className="lg:col-span-7 prose-custom">
    {/* article */}
  </div>

  {/* Sidebar droite — 4 cols */}
  <aside className="lg:col-span-4">
    {/* badge, related, CTA */}
  </aside>
</div>
```

---

## Espacements sections

| Contexte | Classes |
|---|---|
| Section standard | `py-20 px-4 sm:px-6 lg:px-8` |
| Section grande | `py-32 px-4 sm:px-6 lg:px-8` |
| Section hero | `pt-32 pb-24` |
| Container max | `max-w-7xl mx-auto` |
| Container article | `max-w-4xl mx-auto` |
| Colonne blog | `max-w-2xl` (680px) |

---

## Interdictions — rappel express

```
❌ border border-gray-200     → utiliser tonal layering
❌ text-black / text-gray-900  → utiliser text-on-surface
❌ rounded-full (sauf chips)   → utiliser rounded-sm
❌ shadow-md / shadow-lg       → utiliser editorial-shadow
❌ placeholder comme label     → label au-dessus toujours
❌ hr / divider                → spacing ou surface-container-high block
```
