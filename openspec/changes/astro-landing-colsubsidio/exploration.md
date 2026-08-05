## Exploration: Astro landing — Laboratoria Colsubsidio

**Change name**: `astro-landing-colsubsidio`  
**Mode**: hybrid (OpenSpec + Engram)  
**Sources**: Figma Framelink MCP (desktop `933:13415`, mobile `1163:1042`) + `info/prototype/` + `info/img/`  
**Date**: 2026-08-05  
**Autopilot**: defaults applied; assumptions documented below

### Current State

Greenfield repo: no `package.json`, no Astro scaffold. OpenSpec initialized (`openspec/config.yaml`, empty `specs/`, `changes/archive/`). Design and copy are available via Figma + prototype PNGs + section asset folders. Stack is planned only (Astro 5 static, React 19 islands, TS, Tailwind **^3.4.18**, Framer Motion, React Icons, Swiper, SweetAlert2, pnpm).

Figma desktop frame **Desktop - 20** is the source of truth for Colsubsidio copy. Mobile Figma/prototype hero still contains stale UTP / 6-week copy — **do not ship**; reuse desktop Colsubsidio hero text on mobile.

### Affected Areas

- `openspec/changes/astro-landing-colsubsidio/` — this change (exploration → propose → design → tasks)
- `info/img/**` — section assets to copy into `public/` or `src/assets/` at scaffold time
- `info/prototype/**` — visual QA reference (19 PNGs)
- Future (not created yet): `src/pages/index.astro`, section components, React islands (nav drawer, Swiper carousels, FAQ accordion, motion), `tailwind.config.ts`, `config/seoConfig.ts`, `config/site.config.ts`, `astro.config.mjs`

### Ordered section list (IA)

Canonical order for a single-page landing. Anchor IDs are autopilot defaults for in-page nav.

| # | Section (ES) | Anchor | Key content blocks | Desktop | Mobile |
|---|--------------|--------|--------------------|---------|--------|
| 0 | Header / Nav | — | Logo `<Laboratoria>`, links, CTA Postular | Horizontal nav + yellow Postular pill | Logo + hamburger; drawer with same links + Postular |
| 1 | Hero | `#inicio` | H1 + subcopy + Postular; partner logos Colsubsidio / Laboratoria; full-bleed photo + dark overlay | Left-aligned copy over photo; logos bottom-left | Stacked copy over gradient; photo below; **use desktop Colsubsidio copy** (not UTP stub) |
| 2 | Desafío / Propósito | `#proposito` | H2 split color (pink accent on second phrase); body; rounded photo | 2-col: text left, image right | Text → image stack |
| 3 | Identificación | `#identificacion` | Yellow band; H2; 3 pain cards (Confianza, Habilidades, Ruta laboral) | 3-col card row | Swiper carousel + 3 dots |
| 4 | Beneficios | `#beneficios` | H2 + intro; magenta panel; **6** benefit cards (icon + title + body) | 3×2 grid inside magenta rounded panel | Swiper (6 dots) or stacked cards |
| 5 | Experiencia 10 semanas | `#experiencia` | Yellow band; 2 module cards (3 + 6 semanas); pause footnote; Postular (black); illustration | Modules side-by-side + illustration | Modules stacked + illustration + centered black Postular |
| 6 | Metodología | `#metodologia` | H2 (pink accent); intro with pink rule; 4 pillars with photo + pill label + copy | 4-col grid | Vertical stack of 4 blocks |
| 7 | ¿Este programa es para ti? | `#requisitos` | H2; “si:”; 5 eligibility rows; yellow Postular; portrait composite | 2-col: list+CTA left, art right | Stack: list → CTA → art (**ignore wrong H2 in some mobile PNGs**) |
| 8 | ¿Qué necesitas saber…? | `#logistica` | Dark panel; 3 info cards (dates/duration/schedule with **X placeholders**); lifestyle photo | 2-col: cards left, image right | Dark stack of 3 cards → full-width image (**ignore wrong H2 in some mobile PNGs**) |
| 9a | About Laboratoria | `#conocenos-lab` | “Más de 10 años…”; org blurb; **Conócenos** → external; group illustration; faint LatAm outline | 2-col text + illustration | Stack; CTA should be **Conócenos** (Figma desktop), not Postular |
| 9b | Closing CTA band | `#postular` | Yellow rounded band; headline; support line; black Postular | Centered band | Same, full width |
| 10 | FAQ | `#faq` | “Preguntas frecuentes”; 8 accordion questions (answers **not in Figma**) | Centered accordion list | Left-aligned title + accordion |
| 11 | Footer | — | Yellow bar: logo + Conócenos | Same | Same |

**Program facts locked from design**

- Free 10-week program (Colsubsidio × Laboratoria)
- Modules: **3 weeks** Activa tu carrera + **1 week pause** + **6 weeks** Data Fundamentals
- ~11.5 h/week (7.5 live + 4 individual); 3 live sessions/week
- Eligibility: job seeking, 18+, Bogotá, prior work experience, skill update intent, time commitment
- Schedule/dates still placeholders (`X`)

### Nav / CTA map

| Control | Type | Target (autopilot) |
|---------|------|--------------------|
| Propósito | Nav scroll | `#proposito` (section 2) |
| Beneficios | Nav scroll | `#beneficios` (section 4) |
| Experiencia | Nav scroll | `#experiencia` (section 5) |
| Requisitos | Nav scroll | `#requisitos` (section 7) |
| Conócenos (nav + about + footer) | External | `https://laboratoria.la` (new tab, `rel="noopener"`) |
| Postular (nav, hero, modules, eligibility, closing) | CTA placeholder | `#postular` until client URL; optional SweetAlert2 “próximamente” if no URL |
| Logo | Home | `#inicio` / top |

### Asset mapping summary

Folder names in `info/img/` are approximate (some “sección N” labels are off by ~1 vs prototype numbering). Map by content:

| Destination section | Folder / files |
|---------------------|----------------|
| Hero + §2 photo | `Imágenes sección Hero banner(Desktop - mobile) y imagen sección 2/` — `ChatGPT Image 3 ago 2026, 05_37_25 2.webp` (hero), `05_45_45 3.webp` (§2), `image 144.webp` (likely logos/partner mark — verify) |
| §3 pain illustrations | `Ilustraciones sección 3/` — habilidades, ruta/caminando, confianza/path; **also** `Ilustración grupo de chicas - Conócenos.webp` → use in §9a |
| §4 benefit icons | `Ilustraciones sección 4 (2)/` — ícono 1…6.webp |
| §5 experience art | `Ilustración sección 5/Group 1000004516.webp` |
| §6 pillars | `Imágenes sección 6 (2)/` — Aprendizaje práctico, Acompañamiento, Uso de tecnología, Comunidad `.webp` |
| §7 portrait composite | `Imagen sección 7 (2)/Exclude.webp` (+ CSS pink/yellow geometry if needed) |
| §8 photo | Desktop: `Imagen sección 8/ChatGPT Image 3 ago 2026, 07_02_44 2.webp`; Mobile: `Imagen sección 8 mobile/Group 1000004518.webp` |
| Decorative lines | `Vectores líneas/Vector amarillo.webp`, `Vectores morado y claro.webp` |
| Icons §8 (paper plane, clock, calendar) | Not exported as files — use React Icons / SVG from Figma components `45/40/68 Curved Icon` |
| Logos | Extract from Figma/prototype or `image 144.webp`; footer text logo as typography |

### Design tokens (from Figma)

- **Font**: Work Sans
- **Yellow CTA / bands**: `#FFE521`, `#FADE4B`, `#FBE653`
- **Magenta / pink accents**: `#ED72EF`, `#EE77F2`, `#E878EC`, `#B240A6`
- **Dark panels**: `#0F191F`, `#050709`, `#232323`
- **Neutrals**: `#FFFFFF`, `#F6F6F6`, `#F7F6F6`, `#000000`
- **Mint accents** (illustrations): `#41E7AA`, `#57F7AA`

### Approaches

1. **Single Astro page + section components + selective React islands** — Match Laboratoria softlanding pattern: Astro sections for static content; islands for hamburger, Swiper (§3/§4 mobile), FAQ accordion, Framer Motion entrance, SweetAlert2 on Postular if needed.
   - Pros: Best LCP/SEO; clear IA mapping; islands only where interactive
   - Cons: Need careful asset/public path setup; content config for placeholders
   - Effort: Medium

2. **Mostly React SPA inside Astro** — One large React tree for the page.
   - Pros: Familiar if team is React-first
   - Cons: Heavier JS; fights Astro static strengths; worse default SEO/perf
   - Effort: Medium–High

3. **CMS-driven sections** — Out of brief scope.
   - Pros: Editorial flexibility later
   - Cons: No backend/CMS in brief; delays launch
   - Effort: High

### Recommendation

**Approach 1.** Scaffold Astro 5 static with Tailwind **3.4.x** (package pin wins over SDD.md “Tailwind 4” wording), Work Sans, token colors above, section components in order 1–11, React islands for nav drawer / Swiper / FAQ / motion / optional alert. Copy source: **desktop Figma**; layout: desktop + mobile prototypes with noted corrections. Postular → `#postular`; `site` URL placeholder TBD in `astro.config` / `site.config.ts`.

### Risks

- **Stale mobile hero copy** (UTP / 6 weeks) in Figma mobile + `1_mobile-*.png` — must override with Colsubsidio desktop copy
- **Mislabeled mobile prototype H2s** on §7/§8 PNGs — trust desktop Figma titles
- **FAQ answers missing** in Figma/prototypes — only 8 questions; answers need client copy or interim reuse of page facts
- **Date/schedule placeholders (`X`)** — logistics cards incomplete until client fills dates
- **Postular URL pending** — multiple CTAs depend on one decision
- **Production `site` URL TBD** — blocks accurate sitemap/canonical until set
- **Asset folder naming drift** — risk of wiring wrong image; verify visually during apply
- **Tailwind major conflict in brief** — resolved by autopilot: **^3.4.18**
- **About CTA inconsistency** — some mobile exports show Postular; desktop Figma shows Conócenos for about block

### Autopilot assumptions (open questions closed for now)

| Topic | Assumption |
|-------|------------|
| Change name | `astro-landing-colsubsidio` |
| Site URL | Placeholder `https://example.com` (TBD) until client provides |
| Postular | `#postular` (closing band); no SweetAlert until URL known (MAY add later) |
| Tailwind | `^3.4.18` + `tailwind.config.ts` (not v4) |
| Hero mobile copy | Same as desktop Colsubsidio |
| Nav anchors | As in table above |
| FAQ answers | Interim answers derived from page facts in propose/spec; mark client-review |
| Lang | Spanish UI copy; English SDD artifacts |
| SweetAlert2 | Reserved for future Postular/empty-state; not required for first static pass |
| Clip-path | Use where Figma/prototypes show geometric openings (hero/section transitions) |

### Ready for Proposal

**Yes.** Next: `sdd-propose` for change `astro-landing-colsubsidio` — scope single static landing, stack pins, IA/anchors, asset plan, open client deps (Postular URL, dates, FAQ answers, site URL).
