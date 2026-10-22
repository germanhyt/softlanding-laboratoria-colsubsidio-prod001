/**
 * Client-swappable site URLs and locale.
 * Replace `siteUrl` when the production domain is confirmed.
 */
export const siteConfig = {
  siteUrl: "https://example.com", // TBD — production URL pending
  lang: "es",
  postularUrl: "https://platform.laboratoria.la/apply/b2b-col-nov-2026",
  conocenosUrl: "https://laboratoria.la",
} as const;

export type SiteConfig = typeof siteConfig;
