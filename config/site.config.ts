/**
 * Client-swappable site URLs and locale.
 * Replace `siteUrl` when the production domain is confirmed.
 */
export const siteConfig = {
  siteUrl: "https://example.com", // TBD — production URL pending
  lang: "es",
  postularUrl:
    "https://app.laboratoria.la/apply?step=0&code=ADM-COLSUBSIDIO-21-SEP-2026",
  conocenosUrl: "https://laboratoria.la",
} as const;

export type SiteConfig = typeof siteConfig;
