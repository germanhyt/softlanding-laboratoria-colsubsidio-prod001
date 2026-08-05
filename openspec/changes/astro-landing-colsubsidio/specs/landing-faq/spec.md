# landing-faq Specification

## Purpose

FAQ block (`#faq`) with eight accordion questions and interim fact-based answers pending client legal/copy sign-off.

## Requirements

### Requirement: Eight FAQ Items

The system MUST render a “Preguntas frecuentes” section at `#faq` after the closing CTA band and before the footer. The section MUST contain exactly eight question items matching the Figma/prototype question list. Desktop SHOULD center the accordion; mobile SHOULD left-align the title and list.

#### Scenario: FAQ placement and count

- GIVEN the built landing page
- WHEN section `#faq` is inspected
- THEN it appears after `#postular` and before the footer and contains exactly eight questions

#### Scenario: Responsive title alignment

- GIVEN desktop and mobile viewports
- WHEN the FAQ heading is viewed
- THEN desktop presentation is centered and mobile title/list alignment follows the mobile prototype (left-aligned)

---

### Requirement: Interim Answers Marked for Review

Because Figma/prototypes supply questions only, the system MUST provide interim answers derived from locked program facts (free 10-week Colsubsidio × Laboratoria program; modules 3+pause+6; ~11.5 h/week; eligibility; logistics placeholders). Interim answers MUST be centrally configurable and SHOULD be marked for client review (e.g. content flag or comment in the copy source). Final legal/marketing sign-off is OUT OF SCOPE for this change.

#### Scenario: Answer present for each question

- GIVEN any of the eight FAQ items
- WHEN the item is expanded
- THEN a non-empty interim answer is shown

#### Scenario: Client-review marking

- GIVEN the FAQ copy source
- WHEN an implementer or reviewer inspects answer entries
- THEN interim answers are identifiable as pending client review

#### Scenario: Fact consistency

- GIVEN interim FAQ answers about duration, cost, or modules
- WHEN compared to landing section facts
- THEN they MUST NOT contradict the free 10-week / 3+1+6 module framing
