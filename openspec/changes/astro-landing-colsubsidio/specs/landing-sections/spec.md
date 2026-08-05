# landing-sections Specification

## Purpose

Single-page content sections from hero through closing CTA, in Figma/prototype order, with desktop Colsubsidio copy as source of truth and responsive desktop + mobile layouts.

## Requirements

### Requirement: Canonical Section Order

The landing body MUST render sections in this order with the listed anchors: (1) Hero `#inicio`, (2) Desafío/Propósito `#proposito`, (3) Identificación `#identificacion`, (4) Beneficios `#beneficios`, (5) Experiencia 10 semanas `#experiencia`, (6) Metodología `#metodologia`, (7) ¿Este programa es para ti? `#requisitos`, (8) ¿Qué necesitas saber…? `#logistica`, (9a) About Laboratoria `#conocenos-lab`, (9b) Closing CTA band `#postular`. Header precedes and FAQ/footer follow (covered by other capabilities).

#### Scenario: DOM order matches IA

- GIVEN the built index page
- WHEN section landmarks/anchors are listed top-to-bottom
- THEN they appear in the canonical order above through `#postular`

---

### Requirement: Desktop Colsubsidio Copy Source of Truth

All viewports MUST use desktop Figma Colsubsidio copy for hero and program messaging. The system MUST NOT ship stale UTP / 6-week hero copy from mobile Figma or `1_mobile` prototypes. Where mobile prototype H2s conflict (notably §7/§8), desktop Figma titles MUST win. About block (§9a) CTA MUST be Conócenos (not Postular).

#### Scenario: No UTP copy on mobile

- GIVEN a mobile viewport on the hero
- WHEN hero headline and subcopy are read
- THEN they match desktop Colsubsidio program copy and MUST NOT mention UTP or a 6-week-only program framing

#### Scenario: Correct about CTA

- GIVEN section `#conocenos-lab`
- WHEN the primary CTA is inspected
- THEN it is Conócenos linking to `https://laboratoria.la`

---

### Requirement: Responsive Section Layouts

Each section MUST present desktop and mobile layouts aligned to Figma/prototypes: hero full-bleed with partner logos; §2 text+image; §3 three pain cards (Confianza, Habilidades, Ruta laboral); §4 six benefit cards in magenta panel; §5 two modules (3 + 6 weeks) plus pause footnote and Postular; §6 four methodology pillars; §7 five eligibility rows + Postular + portrait; §8 three logistics cards with `X` date/schedule placeholders + lifestyle photo; §9a about + illustration; §9b yellow closing band with Postular. Mobile MAY stack columns and use carousels where defined by interactions capability.

#### Scenario: Experience modules facts

- GIVEN section `#experiencia`
- WHEN module content is read
- THEN it presents 3 weeks Activa tu carrera, 1 week pause, and 6 weeks Data Fundamentals within a free 10-week program framing

#### Scenario: Logistics placeholders

- GIVEN section `#logistica`
- WHEN date/duration/schedule card values are read
- THEN unresolved schedule/date fields use `X` placeholders (not fabricated real dates)

#### Scenario: Desktop vs mobile structure

- GIVEN the same section on desktop and mobile breakpoints from the brief
- WHEN layouts are compared
- THEN desktop matches multi-column/grid compositions and mobile uses stacked (or carousel) compositions without dropping required content blocks

---

### Requirement: Section Assets

Section imagery MUST be sourced from `info/img/` (mapped by content per exploration), with visual QA against `info/prototype/` desktop and mobile PNGs. Missing §8 icons MAY use React Icons / SVG equivalents.

#### Scenario: Asset wiring

- GIVEN each illustrated section
- WHEN the page is viewed at desktop and mobile
- THEN expected hero/section images render and match the mapped asset folders (no blank critical media)
