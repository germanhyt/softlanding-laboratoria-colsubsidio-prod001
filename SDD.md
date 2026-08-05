

Sobre el proyecto:

1) El proyecto es una landing para "Laboratoria Colsubsidio" para impulsar la inserciòn laboral

2) La Arquitectura de informacióm se basa en los siguientes puntos
- en info/img/ enccontramos las imágenes que se asignarán a cada sección de la landing
- El frame general lo revisamos de mcp con figma que te indicaré
- En caso de haber problemas con el punto anterior (figma) vamos a leer las imagenes de info/prototype/

3) Secciones:
- Respetamos cada sección según el figma o las imágenes estructuradas que están en prototype (desktop y mobile)
a) desktop: https://www.figma.com/design/wxEnH7TSQ263B9DSTEYmy8/Proyectos---Laboratoria?node-id=933-13415&t=SpOaXJf2EyaMaFlg-4
b) mobile: https://www.figma.com/design/wxEnH7TSQ263B9DSTEYmy8/Proyectos---Laboratoria?node-id=1163-1042&t=SpOaXJf2EyaMaFlg-4

4) Enlaces:
- Este es el enlace para conócenos: https://laboratoria.la
- Las otras opciones sonde redirección a cada sección
- Enlace para postular: pendiente



Detalles técnicos:

1) Para maquetado y estilos:
- React island y typescript: con web componentes, hooks y buenas prácticas para un rendimiento óptimo de los renders.
- Tailwindcss 4 con tailwind.config.ts: estilos con orden jerárquico y buenas prácticas, en casos especiales usar css puro.
- React Icons: Para iconos
- Framer-motion: Para efectos y animaciones, en casos especiales usar css puro.
- Clippy css: Para aperutra de main en responsive y donde sea necesario
- Swiper: Para carousel de cards, reseñas, contenidos.

2) Para SEO:
- crear config/seoConfig.ts y config/site.config.ts: Preparado para personalizar datos del cliente
- además preparar el file de robots y sitemap

3) Helpers
- utils/helpers.ts: En caso de que se necesiten funciones comunes


4) Para el gestor de depndencias:
- pnpm

5) Consideramos tailwind.config.ts y responsive:
- "import type { Config } from 'tailwindcss';
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "1.2rem",
          md: "1.5rem",
          lg: "2rem",
          xl: "3rem",
          "2xl": "6rem",
        },
      },
      fontFamily: {
      },
      colors: {
        primary: {
        },
        text: {
        },
        background: {

        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient()',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
"

6) Basado en el package.json:
- "  "dependencies": {
    "@astrojs/react": "^4.4.0",
    "@astrojs/sitemap": "^3.6.0",
    "@astrojs/tailwind": "^6.0.2",
    "astro": "^5.15.3",
    "framer-motion": "^12.23.24",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "sweetalert2": "^11.26.3",
    "swiper": "^12.0.3"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.19",
    "@types/node": "^24.9.1",
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.2.2",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.6",
    "react-icons": "^5.5.0",
    "tailwindcss": "^3.4.18",
    "typescript": "^5.9.3",
  }" 


7) En caso sea landing basado en el astro.config.mjs cuyo ejemplo es (readaptamos):
- "// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.biotraining.pe",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date("2025-11-12"),
    }),
  ],
  output: "static",
});
"

--



====================================================
