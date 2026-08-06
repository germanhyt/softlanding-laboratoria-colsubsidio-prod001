import { siteConfig } from "@config/site.config";

export type FaqItem = {
  q: string;
  a: string;
  /** Interim answers pending client legal/marketing sign-off */
  needsReview: boolean;
};

export const navLinks = [
  { label: "Propósito", href: "#proposito" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Requisitos", href: "#requisitos" },
] as const;

export const logos = {
  laboBlack: {
    src: "/assets/logos/logo-labo-black.png",
    alt: "Laboratoria",
  },
  laboWhite: {
    src: "/assets/logos/logo-labo-white.png",
    alt: "Laboratoria",
  },
  colsubsidio: {
    src: "/assets/logos/logo-colsubsidio.png",
    alt: "Colsubsidio",
  },
} as const;

export const hero = {
  id: "inicio",
  headline:
    "Prepárate para volver al mercado laboral con más confianza y nuevas herramientas.",
  subcopy:
    "Colsubsidio y Laboratoria presentan un programa gratuito de 10 semanas para fortalecer tu perfil, desarrollar habilidades digitales y construir una estrategia clara para tu búsqueda de empleo.",
  cta: { label: "Postular", href: siteConfig.postularUrl },
  image: {
    src: "/assets/hero/hero.webp",
    alt: "Dos mujeres profesionales colaborando en un entorno de oficina moderno",
  },
  imageMobile: {
    src: "/assets/hero/hero--mobile.png",
    alt: "Dos mujeres profesionales colaborando en un entorno de oficina moderno",
  },
} as const;

export const proposito = {
  id: "proposito",
  headlineBefore: "Volver al mercado laboral",
  headlineAccent: "puede ser un gran desafío.",
  body: "El mercado laboral cambia constantemente y hoy exige nuevas herramientas, preparación y una estrategia clara para volver a posicionarte.",
  image: {
    src: "/assets/proposito/photo.webp",
    alt: "Mujer profesional reflexionando frente a su laptop en un espacio de trabajo",
  },
} as const;

export const identificacion = {
  id: "identificacion",
  headlineBefore: "Si te identificas con alguna de estas situaciones, ",
  headlineAccent: "Activa tu carrera",
  headlineAfter: " es para ti",
  cards: [
    {
      label: "Confianza",
      body: "Siento que estar fuera del mercado laboral ha hecho que pierda confianza en mi perfil profesional.",
      image: {
        src: "/assets/identificacion/confianza.webp",
        alt: "Ilustración de una mujer en un camino profesional con brújula y herramientas digitales",
      },
    },
    {
      label: "Habilidades",
      body: "Siento que necesito actualizar mis herramientas y habilidades para enfrentar el mercado laboral actual.",
      image: {
        src: "/assets/identificacion/habilidades.webp",
        alt: "Ilustración de manos colaborando con notas, laptop y herramientas de aprendizaje",
      },
    },
    {
      label: "Ruta laboral",
      body: "Tengo experiencia, pero no sé cómo volver a posicionarme ni por dónde empezar mi búsqueda.",
      image: {
        src: "/assets/identificacion/ruta.webp",
        alt: "Ilustración de dos mujeres caminando juntas en su ruta laboral",
      },
    },
  ],
} as const;

export const beneficios = {
  id: "beneficios",
  headlineBefore: "Fortalece tu perfil y ",
  headlineAccent: "prepárate para volver al mercado laboral",
  introBefore: "No es solo teoría. ",
  introAccent: "Durante 10 semanas trabajarás con herramientas prácticas",
  introAfter:
    " para mejorar tu búsqueda de empleo, actualizar tus habilidades digitales y prepararte mejor para los procesos de selección.",
  cards: [
    {
      title: "Recuperarás la confianza en tu perfil profesional",
      body: "Reconocerás tus fortalezas y lo que puedes aportar para volver a postular con mayor seguridad.",
      image: {
        src: "/assets/beneficios/icon-1.webp",
        alt: "Ícono de confianza profesional",
      },
    },
    {
      title: "Construirás una estrategia clara de búsqueda laboral",
      body: "Definirás tus objetivos y organizarás acciones concretas para avanzar con mayor enfoque.",
      image: {
        src: "/assets/beneficios/icon-2.webp",
        alt: "Ícono de estrategia de búsqueda laboral",
      },
    },
    {
      title: "Te prepararás para los procesos de selección",
      body: "Practicarás cómo presentar tu perfil y afrontar entrevistas con mayor preparación y confianza.",
      image: {
        src: "/assets/beneficios/icon-3.webp",
        alt: "Ícono de preparación para selección",
      },
    },
    {
      title: "Fortalecerás tu CV y perfil de LinkedIn",
      body: "Aprenderás a comunicar mejor tu experiencia, habilidades y valor profesional.",
      image: {
        src: "/assets/beneficios/icon-4.webp",
        alt: "Ícono de CV y LinkedIn",
      },
    },
    {
      title: "Usarás la IA y los datos como aliados",
      body: "Desarrollarás habilidades digitales para potenciar tu búsqueda de empleo y fortalecer tu perfil profesional.",
      image: {
        src: "/assets/beneficios/icon-5.webp",
        alt: "Ícono de IA y datos",
      },
    },
    {
      title: "Ampliarás tu red profesional",
      body: "Conectarás con una comunidad de mujeres que podrá acompañarte, compartir experiencias e impulsar tu desarrollo.",
      image: {
        src: "/assets/beneficios/icon-6.webp",
        alt: "Ícono de red profesional",
      },
    },
  ],
} as const;

export const experiencia = {
  id: "experiencia",
  headline: "Así será tu experiencia durante las 10 semanas",
  introBefore: "El programa está dividido en dos módulos que ",
  introAccent:
    "combinan preparación para la búsqueda de empleo y formación en habilidades digitales.",
  footnote: "*Tendrás una semana de pausa entre ambos módulos.",
  cta: { label: "Postular", href: siteConfig.postularUrl },
  /**
   * Precomposed art for §5 (white/magenta geometry + character + icons).
   * Source: info/img/Ilustración sección 5/Group 1000004521.png
   * Use this asset alone on the right — no CSS wedges / extra layers.
   */
  artComposite: {
    src: "/assets/experiencia/art-composite.png",
    alt: "Ilustración de una mujer trabajando en su laptop con herramientas digitales",
  },
  modules: [
    {
      badge: "3 semanas",
      title: "Módulo 1 · Activa tu carrera",
      items: [
        "Fortalecerás tu confianza.",
        "Definirás tu objetivo profesional.",
        "Mejorarás tu estrategia de búsqueda de empleo.",
        "Te prepararás para los procesos de selección.",
      ],
    },
    {
      badge: "6 semanas",
      title: "Módulo 2 · Data Fundamentals",
      items: [
        "Aprenderás los fundamentos del análisis de datos.",
        "Desarrollarás habilidades digitales que te ayudarán a fortalecer tu perfil profesional.",
      ],
    },
  ],
} as const;

export const metodologia = {
  id: "metodologia",
  headlineBefore: "Aprenderás haciendo,",
  headlineAccent: "acompañada en cada etapa",
  introBefore: "La ",
  introAccent: "experiencia combina",
  introAfter:
    " práctica, reflexión, acompañamiento personalizado y aprendizaje en comunidad.",
  pillars: [
    {
      label: "Aprendizaje práctico",
      body: "Aplicarás lo aprendido en ejercicios, actividades y situaciones cercanas al mundo laboral.",
      image: {
        src: "/assets/metodologia/practico.webp",
        alt: "Mujeres colaborando frente a una laptop en un entorno de aprendizaje práctico",
      },
    },
    {
      label: "Acompañamiento",
      body: "Recibirás orientación y retroalimentación para avanzar en tu proceso.",
      image: {
        src: "/assets/metodologia/acompanamiento.webp",
        alt: "Mujer sonriendo mientras trabaja en su laptop con acompañamiento",
      },
    },
    {
      label: "Uso de tecnología",
      body: "Integrarás herramientas digitales e inteligencia artificial en tu aprendizaje y búsqueda de empleo.",
      image: {
        src: "/assets/metodologia/tecnologia.webp",
        alt: "Mujer usando una tablet como parte del uso de tecnología",
      },
    },
    {
      label: "Comunidad",
      body: "Compartirás la experiencia con otras mujeres, aprenderás de sus perspectivas y ampliarás tu red profesional.",
      image: {
        src: "/assets/metodologia/comunidad.webp",
        alt: "Grupo de mujeres compartiendo en comunidad en un espacio de trabajo",
      },
    },
  ],
} as const;

export const requisitos = {
  id: "requisitos",
  headline: "¿Este programa es para ti?",
  intro: "Este programa es para ti si:",
  items: [
    "Actualmente estás buscando empleo.",
    "Tienes 18 años o más y resides en Bogotá.",
    "Cuentas con experiencia laboral previa.",
    "Quieres actualizar tus herramientas y habilidades para enfrentar mejor tu búsqueda.",
    "Puedes dedicar aproximadamente 11,5 horas por semana durante las 10 semanas del programa.",
  ],
  cta: { label: "Postular", href: siteConfig.postularUrl },
  /**
   * Precomposed portrait (magenta + yellow diagonal + subject).
   * Source: info/img/Imagen sección 7 (2)/Group 1000004522.png
   */
  image: {
    src: "/assets/requisitos/portrait-composite.png",
    alt: "Retrato de una mujer profesional sonriendo con los brazos cruzados",
  },
} as const;

export const logistica = {
  id: "logistica",
  headline: "¿Qué necesitas saber para participar?",
  /** Desktop full-bleed (landscape). */
  imageDesktop: {
    src: "/assets/logistica/desktop.webp",
    alt: "Dos mujeres profesionales conversando en una oficina moderna",
  },
  /** Mobile stacked portrait (tall crop + top vignette in Logistica.astro). */
  imageMobile: {
    src: "/assets/logistica/mobile.png",
    alt: "Dos mujeres profesionales conversando en una oficina moderna",
  },
  cards: [
    {
      title: "Postulación e inicio del programa",
      icon: "plane" as const,
      items: [
        "Las postulaciones estarán abiertas del X al X de X.",
        "El programa iniciará el X de X de 2026.",
      ],
    },
    {
      title: "Duración y sesiones del programa",
      icon: "clock" as const,
      items: [
        "10 semanas.",
        "3 sesiones en vivo por semana, equivalentes a 7,5 horas.",
        "4 horas de trabajo individual.",
      ],
    },
    {
      title: "Horarios de sesiones en vivo",
      icon: "calendar" as const,
      items: [
        "Las sesiones se realizarán los X, X y X, de X:00 a. m. a X:00 p. m.",
      ],
    },
  ],
} as const;

export const conocenos = {
  id: "conocenos-lab",
  headline:
    "Más de 10 años impulsando el desarrollo profesional en Latinoamérica.",
  body: "Somos una organización que impulsa a mujeres a construir carreras de calidad en la era de la IA, combinando habilidades, acompañamiento humano y comunidad para que accedan a empleos de calidad y construyan carreras plenas en la era de la IA.",
  cta: { label: "Conócenos", href: siteConfig.conocenosUrl },
  /**
   * LatAm map watermark (left). Source: info/img/seccion 9/Group 1000004523.png
   */
  map: {
    src: "/assets/conocenos/map-latam.png",
    alt: "",
  },
  image: {
    src: "/assets/conocenos/group.webp",
    alt: "Ilustración de un grupo de mujeres conversando",
  },
} as const;

export const closingCta = {
  id: "postular",
  headline: "Empieza hoy el camino hacia tu próximo empleo",
  body: "Si estás lista para fortalecer tu confianza, desarrollar nuevas habilidades y prepararte para acceder a mejores oportunidades laborales. ¡Postula hoy!",
  cta: { label: "Postular", href: siteConfig.postularUrl },
} as const;

/**
 * FAQ questions from Figma/prototype. Answers are interim (page facts)
 * and marked needsReview until client legal/marketing sign-off.
 */
export const faq = {
  id: "faq",
  headline: "Preguntas frecuentes",
  items: [
    {
      q: "¿Quiénes pueden postular?",
      a: "Mujeres que actualmente buscan empleo, tienen 18 años o más, residen en Bogotá, cuentan con experiencia laboral previa y pueden dedicar aproximadamente 11,5 horas por semana durante las 10 semanas del programa.",
      needsReview: true,
    },
    {
      q: "¿Cómo será el proceso de selección?",
      a: "Tras postular, el equipo revisará tu información y te contactará con los siguientes pasos. Los detalles finales del proceso serán confirmados al abrir la convocatoria.",
      needsReview: true,
    },
    {
      q: "¿Cuánto dura el programa?",
      a: "El programa es gratuito y dura 10 semanas: 3 semanas de Activa tu carrera, 1 semana de pausa y 6 semanas de Data Fundamentals.",
      needsReview: true,
    },
    {
      q: "¿Cuánto tiempo debo dedicar cada semana?",
      a: "Aproximadamente 11,5 horas por semana: 7,5 horas en 3 sesiones en vivo y 4 horas de trabajo individual.",
      needsReview: true,
    },
    {
      q: "¿Necesito conocimientos previos en análisis de datos?",
      a: "No. El módulo Data Fundamentals cubre los fundamentos del análisis de datos para fortalecer tu perfil, sin exigir experiencia previa en el área.",
      needsReview: true,
    },
    {
      q: "¿Tiene algún costo?",
      a: "No. Es un programa gratuito de Colsubsidio y Laboratoria.",
      needsReview: true,
    },
    {
      q: "¿Cuándo inicia?",
      a: "Las fechas de postulación e inicio se confirmarán próximamente (placeholders X en la sección de logística). El programa está planificado para 2026.",
      needsReview: true,
    },
    {
      q: "¿Qué pasa después de postular?",
      a: "Recibirás información sobre el estado de tu postulación y los siguientes pasos del proceso. Mantén revisado tu correo para las comunicaciones del equipo.",
      needsReview: true,
    },
  ] satisfies FaqItem[],
} as const;

export const footer = {
  homeHref: "#inicio",
  conocenos: { label: "Conócenos", href: siteConfig.conocenosUrl },
} as const;
