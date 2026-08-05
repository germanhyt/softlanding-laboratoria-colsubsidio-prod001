/**
 * Client-swappable site URLs and locale.
 * Replace `siteUrl` and `postularUrl` when the client provides final values.
 */
export const siteConfig = {
  siteUrl: "https://example.com", // TBD — production URL pending
  lang: "es",
  postularUrl: "#postular",
  conocenosUrl: "https://laboratoria.la",
} as const;

export type SiteConfig = typeof siteConfig;
