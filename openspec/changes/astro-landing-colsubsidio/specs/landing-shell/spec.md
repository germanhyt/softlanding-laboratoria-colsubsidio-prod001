# landing-shell Specification

## Purpose

Greenfield static site shell: Astro scaffold, design tokens, global layout (header/nav/footer), and SEO/site placeholders for the Colsubsidio × Laboratoria landing.

## Requirements

### Requirement: Static Astro Scaffold

The system MUST provide an Astro 5 static site (`output: "static"`) with TypeScript, Tailwind `^3.4.18` via `tailwind.config.ts`, and pnpm as the package manager. The system SHOULD reserve Framer Motion, React Icons, Swiper, and SweetAlert2 as declared dependencies for interactive islands.

#### Scenario: Production build succeeds

- GIVEN the scaffold and dependencies are installed
- WHEN the operator runs `pnpm build`
- THEN a static site artifact is produced without build errors

#### Scenario: Tailwind major pin

- GIVEN project dependencies are declared
- WHEN package versions are inspected
- THEN Tailwind MUST resolve to the 3.4.x line (`^3.4.18`), not v4

---

### Requirement: Design Tokens and Typography

The system MUST apply Work Sans as the primary typeface and expose brand color tokens matching Figma (yellow CTAs `#FFE521`/`#FADE4B`/`#FBE653`, magenta/pink accents, dark panels `#0F191F`/`#050709`, neutrals). Tokens MUST be usable from Tailwind utilities or CSS variables across all sections.

#### Scenario: Token availability

- GIVEN any landing section component
- WHEN brand colors or typography are applied
- THEN they resolve from shared tokens (not ad-hoc hex scattered without a token source)

---

### Requirement: Header Navigation and Footer

The system MUST render a persistent header with Laboratoria logo (links to `#inicio`), in-page nav links (Propósito → `#proposito`, Beneficios → `#beneficios`, Experiencia → `#experiencia`, Requisitos → `#requisitos`), Conócenos → `https://laboratoria.la` (new tab, `rel="noopener"`), and Postular CTA → `#postular`. Desktop MUST show horizontal nav; mobile MUST show logo + hamburger entry point. The system MUST render a yellow footer bar with logo and Conócenos external link.

#### Scenario: Desktop nav targets

- GIVEN a desktop viewport
- WHEN the user activates each header nav control
- THEN Propósito/Beneficios/Experiencia/Requisitos scroll to their section anchors, Conócenos opens laboratoria.la externally, and Postular navigates to `#postular`

#### Scenario: Mobile shell chrome

- GIVEN a mobile viewport
- WHEN the landing loads
- THEN the header shows logo + hamburger (not full horizontal nav) and the footer still exposes logo + Conócenos

---

### Requirement: SEO and Site Config Placeholders

The system MUST provide `config/seoConfig.ts` and `config/site.config.ts` (or equivalent) with a placeholder production `site` URL until the client supplies the real value. The static output MUST include robots and sitemap stubs consistent with that site config. Spanish UI copy MAY be assumed for meta defaults until final SEO copy is provided.

#### Scenario: Site URL placeholder

- GIVEN no client production URL yet
- WHEN SEO/sitemap/canonical configuration is read
- THEN a documented placeholder site URL is used and MUST be replaceable via config without section rewrites

#### Scenario: Robots and sitemap present

- GIVEN a successful static build
- WHEN build artifacts are inspected
- THEN robots and sitemap outputs are present
