import type { Transition, Variants } from "framer-motion";

/** Soft product curve — calm, professional, no bounce. */
export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.85,
};

/** Shared entrance transition — short travel, quick settle. */
const enter = {
  duration: 0.46,
  ease: easeOutExpo,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: enter,
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: enter,
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 10 },
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
    transition: { duration: 0.42, ease: easeOutExpo },
  },
};

/** Very subtle scale — large panels only; prefer fade/up elsewhere. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.008 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.48, ease: easeOutExpo },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.02,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0,
    },
  },
};

/** Standard in-view trigger — fires when block is meaningfully on screen. */
export const viewportOnce = {
  once: true,
  amount: 0.22,
  margin: "0px 0px -6% 0px",
} as const;

export type MotionVariantName = "up" | "left" | "right" | "fade" | "scale";

export const variantMap: Record<MotionVariantName, Variants> = {
  up: fadeUp,
  left: fadeLeft,
  right: fadeRight,
  fade: fadeIn,
  scale: scaleIn,
};

/** No opacity flash when the block is already on screen at hydrate. */
export const subtleInViewByVariant: Record<
  MotionVariantName,
  { initial: Record<string, number>; animate: Record<string, number> }
> = {
  up: { initial: { opacity: 1, y: 5 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 1, x: -5 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 1, x: 5 }, animate: { opacity: 1, x: 0 } },
  fade: { initial: { opacity: 0.94 }, animate: { opacity: 1 } },
  scale: { initial: { opacity: 1, scale: 1.004 }, animate: { opacity: 1, scale: 1 } },
};

export const subtleTransition = {
  duration: 0.38,
  ease: easeOutExpo,
} as const;
