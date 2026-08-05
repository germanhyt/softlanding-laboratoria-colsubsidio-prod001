# Design: Astro Landing — Laboratoria Colsubsidio

## Technical Approach

Greenfield **Astro 5 static** single page (`output: "static"`). Astro sections for markup/SEO; **React 19 islands** only for interactivity. Typed `content.ts` centralizes copy/anchors/links/dates so Postular/`site`/schedule are config swaps. SoT: Figma desktop `933:13415`; mobile layouts from prototypes with desktop Colsubsidio copy. Implements proposal caps `landing-shell` / `landing-sections` / `landing-faq` / `landing-interactions`.

## Architecture Decisions

| Decision | Options | Tradeoff | Choice |
|----------|---------|----------|--------|
| Page model | Astro+islands / React SPA / CMS | Perf vs DX vs editorial | **Astro sections + selective islands** |
| Tailwind | Brief “v4” / `^3.4.18` | Config API vs `@astrojs/tailwind` ^6 | **`tailwindcss` ^3.4.18** + `tailwind.config.ts` |
| Postular | External / `#postular` / alert-only | URL pending | **`#postular`**; SweetAlert2 optional if URL empty |
| Site URL | Real / placeholder | Sitemap accuracy | **`https://example.com` TBD** |
| Assets | `src/assets` / `public/` | Hash vs stable URLs | **`public/assets/...`** semantic names |
| Content | Inline / module | Swap cost | **`src/content/content.ts`** |
| Mobile nav | CSS / React + clip-path | Bundle vs fidelity | **`MobileNav` island**; clippy where Figma needs geometry |

## Astro vs React islands

| Surface | Impl | Directive |
|---------|------|-----------|
| Layout, desktop Header, Footer, Hero→§9a, Closing CTA | `.astro` | — |
| Mobile drawer | `MobileNav.tsx` | `client:load` |
| §3/§4 mobile carousel | `SectionSwiper.tsx` | `client:visible` |
| FAQ accordion | `FaqAccordion.tsx` | `client:visible` |
| Entrance motion | `Motion*.tsx` | `client:visible` |
| Optional Postular alert | `PostularCta.tsx` + SweetAlert2 | `client:idle` |

```
index.astro → Layout → Header(+MobileNav) → sections → Faq(+island) → Footer
Desktop §3/§4: CSS grid | Mobile: same data → SectionSwiper
```

## Folder structure

```
astro.config.mjs, package.json, tailwind.config.ts, tsconfig.json
public/{robots.txt, favicon.svg, assets/{hero,proposito,identificacion,beneficios,
  experiencia,metodologia,requisitos,logistica,conocenos,vectors,logos}/}
config/{seoConfig.ts, site.config.ts}
utils/helpers.ts
src/{pages/index.astro, layouts/BaseLayout.astro, styles/global.css,
  content/content.ts, components/{Header,Footer}.astro,
  components/sections/*.astro, components/islands/*.tsx}
```

## Tailwind tokens

- Font: Work Sans (`theme.extend.fontFamily.sans`)
- Screens: `xs:375` `sm:640` `md:768` `lg:1024` `xl:1280` `2xl:1536` `3xl:1920` `4xl:2560` + SDD container paddings
- Colors → `brand.*`: yellow `#FFE521`/`#FADE4B`/`#FBE653`; magenta `#ED72EF`/`#EE77F2`/`#B240A6`; dark `#0F191F`/`#050709`/`#232323`; neutrals; mint `#41E7AA`/`#57F7AA`
- Plugin `@tailwindcss/typography`; Astro `applyBaseStyles: false`

## Asset mapping (`info/img` → `public/assets`)

| Source | Dest |
|--------|------|
| Hero `…05_37_25 2.webp` | `hero/hero.webp` |
| §2 `…05_45_45 3.webp` | `proposito/photo.webp` |
| `image 144.webp` | `logos/partners.webp` (verify) |
| §3 habilidades/confianza/ruta | `identificacion/{…}.webp` |
| Conócenos group webp | `conocenos/group.webp` |
| §4 ícono 1–6 | `beneficios/icon-{1..6}.webp` |
| §5 Group… | `experiencia/illustration.webp` |
| §6 four pillars | `metodologia/{practico,acompanamiento,tecnologia,comunidad}.webp` |
| §7 Exclude | `requisitos/portrait.webp` |
| §8 desktop/mobile | `logistica/{desktop,mobile}.webp` |
| Vectores | `vectors/{amarillo,morado}.webp` |
| §8 calendar/clock/plane | React Icons / SVG (not in img/) |

`info/prototype/` = QA only, not shipped.

## SEO & site

- `site.config.ts`: `{ siteUrl:'https://example.com', lang:'es', postularUrl:'#postular', conocenosUrl:'https://laboratoria.la' }`
- `seoConfig.ts`: title, description, og/twitter, canonical from `siteUrl`
- `astro.config.mjs`: `site` ← siteUrl; `react()`, `tailwind({applyBaseStyles:false})`, `sitemap({changefreq:'weekly', priority:0.7})`
- `public/robots.txt`: Allow `/` + Sitemap URL

## Content model

`content.ts` exports: `navLinks`, `hero`, `proposito`, `identificacion.cards`, `beneficios.cards`, `experiencia.modules`, `metodologia.pillars`, `requisitos.items`, `logistica.cards` (dates `"X"`), `conocenos`, `closingCta`, `faq.items[8]` (`needsReview: true`), `footer`. CTAs pull URLs from site config.

## Dependencies (SDD.md pins)

**deps**: `astro` ^5.15.3, `@astrojs/react` ^4.4.0, `@astrojs/sitemap` ^3.6.0, `@astrojs/tailwind` ^6.0.2, `react`/`react-dom` ^19.2.0, `framer-motion` ^12.23.24, `sweetalert2` ^11.26.3, `swiper` ^12.0.3  
**dev**: `tailwindcss` **^3.4.18**, `@tailwindcss/typography`, `postcss`, `autoprefixer`, `react-icons` ^5.5.0, `typescript` ^5.9.3, `@types/*`  
**pm**: pnpm only.

## Data flow

```
content.ts + site.config ──► Astro sections (static HTML)
         ├─► island props (FAQ / Swiper / nav)
         └─► seoConfig ──► <head> + sitemap/robots
User: anchors / #postular | Conócenos → laboratoria.la
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `package.json`, lock, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.ts` | Create | Scaffold + pins |
| `config/seoConfig.ts`, `site.config.ts`, `utils/helpers.ts` | Create | SEO/site/helpers |
| `public/robots.txt`, `public/assets/**` | Create | Robots + renamed assets |
| `src/pages/index.astro`, `layouts/BaseLayout.astro`, `styles/global.css` | Create | Entry |
| `src/content/content.ts` | Create | Copy/FAQ |
| `components/{Header,Footer}.astro`, `sections/*.astro` | Create | Static UI |
| `components/islands/{MobileNav,SectionSwiper,FaqAccordion,Motion*,PostularCta}.tsx` | Create | Islands |

## Interfaces

```ts
export const siteConfig = {
  siteUrl: 'https://example.com', // TBD
  lang: 'es',
  postularUrl: '#postular',
  conocenosUrl: 'https://laboratoria.la',
} as const;
type FaqItem = { q: string; a: string; needsReview: boolean };
```

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | — | Deferred (`strict_tdd: false`) |
| Build | Static output | `pnpm build` |
| Visual | Desktop/mobile | vs `info/prototype/` + Figma |

## Migration / Rollout

No migration. Deploy `dist/`. Rollback = revert branch. Postular/`siteUrl` = single-config swaps.

## Open Questions

- [ ] Production `site` URL
- [ ] Final Postular absolute URL
- [ ] FAQ sign-off; real schedule dates
- [ ] Confirm `image 144.webp` = partner logos
