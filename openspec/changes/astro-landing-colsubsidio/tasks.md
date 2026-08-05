# Tasks: Astro Landing — Laboratoria Colsubsidio

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 1800–2800 (greenfield + assets + ~15 components) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR1 shell → PR2 sections A → PR3 sections B+FAQ → PR4 islands+SEO+polish |
| Delivery strategy | auto-chain |
| Chain strategy | feature-branch-chain |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Scaffold + tokens + Header/Footer | PR 1 | Base = feature tracker; `pnpm build` |
| 2 | Hero → Experiencia (+ assets) | PR 2 | Base = PR1 branch |
| 3 | Metodología → Closing + FAQ | PR 3 | Base = PR2; Postular=`#postular` |
| 4 | Islands + SEO + polish | PR 4 | Base = PR3; final `pnpm build` |

## Phase 1: Scaffold

- [x] 1.1 Create `package.json` with Astro ^5.15.3, `@astrojs/{react,sitemap,tailwind}`, React 19, framer-motion, swiper, sweetalert2, react-icons; Tailwind **^3.4.18**; pnpm only
- [x] 1.2 Create `astro.config.mjs` (`output:"static"`, react, tailwind `applyBaseStyles:false`, sitemap) + `tsconfig.json`
- [x] 1.3 Create `config/site.config.ts` (`siteUrl` placeholder, `postularUrl:'#postular'`, `conocenosUrl`) + stub `config/seoConfig.ts` + `utils/helpers.ts`
- [x] 1.4 Create `src/pages/index.astro`, `src/layouts/BaseLayout.astro`, empty `src/styles/global.css`; smoke `pnpm build`

## Phase 2: Design Tokens

- [x] 2.1 Create `tailwind.config.ts`: Work Sans, screens xs→4xl, `brand.*` colors (yellow/magenta/dark/mint/neutrals), `@tailwindcss/typography`
- [x] 2.2 Wire `global.css` base/font imports to tokens; verify utilities resolve in BaseLayout

## Phase 3: Sections

- [x] 3.1 Copy `info/img/` → `public/assets/{hero,proposito,identificacion,beneficios,experiencia,metodologia,requisitos,logistica,conocenos,vectors,logos}/` per design map
- [x] 3.2 Create `src/content/content.ts` (nav, all sections, FAQ×8 `needsReview:true`, schedule `X`, CTAs from site config)
- [x] 3.3 Create `Header.astro` + `Footer.astro` (anchors, Conócenos external noopener, Postular `#postular`)
- [x] 3.4 Create sections `Hero`→`Propósito`→`Identificacion`→`Beneficios`→`Experiencia` `.astro` (desktop Colsubsidio copy; no UTP)
- [x] 3.5 Create sections `Metodologia`→`Requisitos`→`Logistica`→`Conocenos`→`ClosingCta` `.astro` (desktop H2 wins; §8 `X`; §9a Conócenos)
- [x] 3.6 Create `Faq.astro` + `FaqAccordion.tsx` (`client:visible`, 8 items after `#postular`)
- [x] 3.7 Create islands `MobileNav.tsx` (`client:load`), `SectionSwiper.tsx` (`client:visible` §3/§4 mobile), optional `Motion*.tsx` + `PostularCta.tsx`
- [x] 3.8 Compose all sections in `index.astro` canonical order; smoke `pnpm build`

## Phase 4: SEO

- [x] 4.1 Complete `seoConfig.ts` (title/description/og/twitter/canonical from `siteUrl`) and wire into `BaseLayout` `<head>`
- [x] 4.2 Add `public/robots.txt` + ensure `@astrojs/sitemap` emits sitemap; `astro.config` `site` ← `siteUrl`

## Phase 5: Polish

- [x] 5.1 Visual QA vs `info/prototype/` desktop+mobile; fix layout/copy drift (esp. hero, §7/§8 H2)
- [x] 5.2 Honor `prefers-reduced-motion` on Motion islands; confirm Postular/`siteUrl` are single-config swaps
- [x] 5.3 Final `pnpm build` smoke; confirm robots+sitemap in `dist/`
