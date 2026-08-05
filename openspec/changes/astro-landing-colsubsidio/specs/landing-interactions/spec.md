# landing-interactions Specification

## Purpose

Interactive behaviors: mobile nav drawer, Swiper carousels for identification/benefits on mobile, FAQ accordion UI, motion, and CTA/link targets (Postular → `#postular`, Conócenos external).

## Requirements

### Requirement: Mobile Navigation Drawer

On mobile viewports, activating the hamburger MUST open a drawer (or equivalent overlay) that exposes the same nav destinations as desktop (Propósito, Beneficios, Experiencia, Requisitos, Conócenos, Postular). Choosing an in-page link MUST close the drawer and scroll to the target. Choosing Conócenos MUST open `https://laboratoria.la` in a new tab with `rel="noopener"`.

#### Scenario: Open and navigate

- GIVEN a mobile viewport with the drawer closed
- WHEN the user opens the hamburger and selects Beneficios
- THEN the drawer closes and the viewport scrolls to `#beneficios`

#### Scenario: External from drawer

- GIVEN the mobile drawer is open
- WHEN the user selects Conócenos
- THEN laboratoria.la opens externally with `rel="noopener"`

---

### Requirement: Mobile Swiper for Pain and Benefit Cards

On mobile, section `#identificacion` MUST present its three pain cards in a Swiper (or equivalent) carousel with three pagination dots. On mobile, section `#beneficios` MUST present its six benefit cards in a carousel with six pagination indicators (or stacked equivalent if carousel is inaccessible). Desktop MUST keep grid/row layouts (no requirement to carousel).

#### Scenario: Identification carousel

- GIVEN a mobile viewport on `#identificacion`
- WHEN the user swipes or uses pagination
- THEN all three pain cards (Confianza, Habilidades, Ruta laboral) are reachable

#### Scenario: Benefits carousel

- GIVEN a mobile viewport on `#beneficios`
- WHEN the user advances through the carousel
- THEN all six benefit cards are reachable

#### Scenario: Desktop no forced carousel

- GIVEN a desktop viewport on `#identificacion` and `#beneficios`
- WHEN layouts are inspected
- THEN cards appear in multi-column grid/row compositions

---

### Requirement: FAQ Accordion Interaction

FAQ items MUST expand/collapse so only the activated answer is revealed per common accordion patterns (at most one open at a time, OR multiple open — implementation MAY choose either, but MUST be keyboard-accessible). Collapsed items MUST still expose their question text.

#### Scenario: Expand answer

- GIVEN a collapsed FAQ item
- WHEN the user activates the question control
- THEN the interim answer becomes visible

#### Scenario: Collapse answer

- GIVEN an expanded FAQ item
- WHEN the user activates the question control again (or an explicit close control)
- THEN the answer is hidden and the question remains visible

---

### Requirement: CTA and Link Targets

All Postular CTAs (header, hero, experience, eligibility, closing band, drawer) MUST navigate to `#postular` until the client supplies an external URL via config. SweetAlert2 “próximamente” MUST NOT be required for the first static pass (MAY be added later). Conócenos targets (nav, about, footer, drawer) MUST use `https://laboratoria.la`. Logo MUST target `#inicio` or page top.

#### Scenario: Postular placeholder target

- GIVEN any Postular CTA on the page
- WHEN the user activates it
- THEN the browser navigates to `#postular` (closing CTA band)

#### Scenario: Config-ready Postular swap

- GIVEN a future client Postular URL is set in config
- WHEN CTAs are rendered
- THEN they SHOULD use the configured URL without rewriting each section component individually

---

### Requirement: Motion Presence

The system SHOULD apply Framer Motion (or equivalent) entrance/scroll presence on key sections so hierarchy is reinforced without blocking content if motion is reduced. The system MUST respect `prefers-reduced-motion` by reducing or disabling non-essential animation.

#### Scenario: Reduced motion

- GIVEN the user prefers reduced motion
- WHEN the landing loads and scrolls
- THEN non-essential animations are reduced or disabled while content remains available
