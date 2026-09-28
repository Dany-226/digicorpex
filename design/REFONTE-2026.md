# Refonte 2026

## Reference approved by the user

- `design/reference/index.html`: exact copy of the approved `index (2).html`.
- Textures: user-supplied `digicorpex-assets-codex.zip`, converted to local WebP variants.
- Order: hero, Déménageur / Traiteur / Gérant de bar, integrations, method, diagnostic CTA.
- The standalone file is the authority for copy and art direction, above historical V3/V4 labels or old design documents.
- No added friction section or homepage blog preview. Existing blog routes stay available from the footer.

## Implementation

Homepage components and scoped styles live in `components/refonte`. Existing routes use the `(site)` layout group: their public URLs do not change. The root layout keeps shared fonts and Organization metadata. The homepage uses the typographic logo in the approved HTML; no unapproved reconstructed SVG is substituted.

Controlled differences from the prototype: working `/contact` CTA, accessible mobile navigation, pause control, reduced-motion presentation, offscreen animation suspension, synchronized method reset, readable caption on the photo transition, footer links to preserved pages. The photo-transition caption and method title spacing retain the readability corrections recorded in the accepted plan.

Legacy CSS tokens remain unchanged. New CSS selectors and keyframe names are scoped to the homepage. Local font files are the same Latin subsets (including French glyphs) already cached by the previous Next build. Georgia remains a system serif, as in the reference.

## Asset provenance

- Four distinct texture sources from the supplied ZIP; `texture-rock.jpg` and `texture-glass.jpg` are duplicates of `rock.jpg` and `glass.jpg`.
- `rock-top.jpg` / `glass-bottom.jpg` belong to superseded CSS and are not dependencies of the final page.
- Software/AI SVGs use the installed `simple-icons` 16.28.0 package, with Salesforce/Excel paths and OpenAI artwork already in the repository. AI icons use ivory for legibility against the dark cards.
- Open Graph image is a 1200 × 630 crop of the supplied crystal texture.
- Fonts: Manrope, Inter, DM Sans; cached Google Fonts assets from the previous build, now served locally. These families use the SIL Open Font License; preserve accompanying license notices.

## Deferred work

The visual migration does not rewrite legacy services, blog copy, article cover imagery or public legal text. Legacy article search/newsletter/favorite widgets require a separate content/product decision; they are not added to this homepage. Dependencies must be checked against a current advisory registry before merge; no audit result from an offline run is treated as current.
