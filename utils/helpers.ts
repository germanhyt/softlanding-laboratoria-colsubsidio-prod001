/** Shared helpers for the landing (anchors, URLs, class joins). */

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** True when the CTA still points at the in-page closing band. */
export function isPostularPlaceholder(url: string): boolean {
  return url === "#postular" || url.trim() === "";
}

/** Normalize a section id into an in-page hash href. */
export function sectionHref(id: string): string {
  const cleaned = id.replace(/^#/, "");
  return `#${cleaned}`;
}
