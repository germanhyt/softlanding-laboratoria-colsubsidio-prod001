import { siteConfig } from "./site.config";

const title = "Laboratoria × Colsubsidio | Soft Landing";
const description =
  "Programa gratuito de 10 semanas para impulsar tu inserción laboral con Laboratoria y Colsubsidio.";
const ogImage = `${siteConfig.siteUrl}/assets/hero/hero.png`;

/**
 * SEO meta for the landing. Canonical / Open Graph / Twitter derive from `siteUrl`.
 * Swap `siteConfig.siteUrl` once for production sitemap + social previews.
 */
export const seoConfig = {
  title,
  description,
  lang: siteConfig.lang,
  canonical: siteConfig.siteUrl,
  robots: "index, follow",
  themeColor: "#FFE521",
  openGraph: {
    title,
    description,
    url: siteConfig.siteUrl,
    type: "website" as const,
    locale: "es_CO",
    siteName: "Laboratoria Colsubsidio",
    image: ogImage,
    imageAlt:
      "Dos mujeres profesionales colaborando en un entorno de oficina moderno",
  },
  twitter: {
    card: "summary_large_image" as const,
    title,
    description,
    image: ogImage,
  },
} as const;

export type SeoConfig = typeof seoConfig;
