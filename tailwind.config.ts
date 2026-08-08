import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
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
        center: true,
        padding: {
          DEFAULT: "1rem",
          xs: "1rem",
          sm: "1.25rem",
          md: "1.5rem",
          lg: "2rem",
          xl: "2.5rem",
          "2xl": "3rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1360px",
        },
      },
      fontFamily: {
        sans: ['"Work Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          yellow: {
            DEFAULT: "#FFE521",
            soft: "#FADE4B",
            pale: "#FBE653",
          },
          magenta: {
            DEFAULT: "#ED72EF",
            bright: "#EE77F2",
            soft: "#E878EC",
            deep: "#B240A6",
          },
          dark: {
            DEFAULT: "#0F191F",
            deeper: "#050709",
            muted: "#232323",
          },
          mint: {
            DEFAULT: "#41E7AA",
            bright: "#57F7AA",
          },
          neutral: {
            white: "#FFFFFF",
            mist: "#F6F6F6",
            fog: "#F7F6F6",
            black: "#000000",
          },
        },
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, #FFE521 0%, #ED72EF 100%)",
        /* §8 Logística — sampled from 8_desktop prototype */
        "gradient-logistica":
          "linear-gradient(90deg, #0b0b0b 0%, #141414 28%, #1f1f1f 55%, #2a2a2a 78%, #323232 100%)",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
