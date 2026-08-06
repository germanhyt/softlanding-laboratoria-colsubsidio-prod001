import type { Transition, Variants } from "framer-motion";

/** Soft product curve — calm, professional, no bounce. */
export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.85,
};

/** Shared entrance transition — short travel, smooth settle. */
const enter = {
  duration: 0.52,
  ease: easeOutExpo,
} as const;

export const motionTravel = {
  y: 14,
  x: 14,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: motionTravel.y },
  visible: {
    opacity: 1,
    y: 0,
    transition: enter,
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -motionTravel.x },
  visible: {
    opacity: 1,
    x: 0,
    transition: enter,
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: motionTravel.x },
  visible: {
    opacity: 1,
    x: 0,
    transition: enter,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.48, ease: easeOutExpo },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.01 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.52, ease: easeOutExpo },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.03,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

/**
 * Scroll reveal viewport — triggers slightly before the element enters,
 * so the entrance finishes as it becomes visible (no blink).
 */
export const viewportScroll = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -80px 0px",
} as const;

export type MotionVariantName = "up" | "left" | "right" | "fade" | "scale";

export const variantMap: Record<MotionVariantName, Variants> = {
  up: fadeUp,
  left: fadeLeft,
  right: fadeRight,
  fade: fadeIn,
  scale: scaleIn,
};

/** Per-axis hidden state for imperative pre-hide (below fold at hydrate). */
export function hiddenStyleForVariant(
  variant: MotionVariantName,
  y = motionTravel.y,
): { opacity: string; transform: string } {
  switch (variant) {
    case "left":
      return {
        opacity: "0",
        transform: `translate3d(-${motionTravel.x}px, 0, 0)`,
      };
    case "right":
      return {
        opacity: "0",
        transform: `translate3d(${motionTravel.x}px, 0, 0)`,
      };
    case "scale":
      return { opacity: "0", transform: "scale(1.01)" };
    case "fade":
      return { opacity: "0", transform: "none" };
    default:
      return { opacity: "0", transform: `translate3d(0, ${y}px, 0)` };
  }
}

export const itemEntrance = {
  duration: 0.52,
  ease: easeOutExpo,
} as const;

export const itemInViewOptions = {
  once: true,
  amount: 0.15,
  margin: "0px 0px 100px 0px",
} as const;

/**
 * Landing choreography — alternate vertical rise vs horizontal slide by section role.
 *
 * | Section        | Headlines / copy     | Lists / cards | Media / opposite col |
 * |----------------|----------------------|---------------|----------------------|
 * | Hero           | mount stagger left   | —             | up (partners)        |
 * | Propósito      | left                 | —             | right                |
 * | Identificación | up                   | up            | —                    |
 * | Beneficios     | left + right         | up            | —                    |
 * | Experiencia    | up                   | up            | — (art plain)        |
 * | Metodología    | left + right         | up            | —                    |
 * | Requisitos     | left                 | up            | right                |
 * | Logística      | left                 | up            | — (photo plain)      |
 * | Conócenos      | left                 | —             | right                |
 * | Closing CTA    | up                   | —             | —                    |
 * | FAQ            | up                   | fade          | —                    |
 */
export function subtleHiddenForVariant(
  variant: MotionVariantName,
  y = motionTravel.y,
): { opacity: number; x?: number; y?: number; scale?: number } {
  switch (variant) {
    case "left":
      return { opacity: 0.94, x: -6 };
    case "right":
      return { opacity: 0.94, x: 6 };
    case "scale":
      return { opacity: 0.96, scale: 1.004 };
    case "fade":
      return { opacity: 0.94 };
    default:
      return { opacity: 0.94, y: Math.min(y, 8) };
  }
}
