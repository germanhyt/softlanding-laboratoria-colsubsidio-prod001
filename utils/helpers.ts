import { siteConfig } from "@config/site.config";

/** Shared helpers for the landing (anchors, URLs, class joins). */

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function isExternalHttpUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

/** True when the CTA still points at the in-page closing band. */
export function isPostularPlaceholder(url: string): boolean {
  return url === "#postular" || url.trim() === "";
}

/** Canonical Postular destination (Laboratoria apply form). */
export function postularHref(): string {
  return siteConfig.postularUrl;
}

/** Normalize a section id into an in-page hash href. */
export function sectionHref(id: string): string {
  const cleaned = id.replace(/^#/, "");
  return `#${cleaned}`;
}
