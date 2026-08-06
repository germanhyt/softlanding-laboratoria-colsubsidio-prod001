import type { Transition, Variants } from "framer-motion";

/** Soft product curve — calm, professional, no bounce. */
export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.85,
};

/** Shared entrance transition — slightly quicker, shorter travel. */
const enter = {
  duration: 0.55,
  ease: easeOutExpo,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: enter,
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: enter,
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 18 },
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
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.03 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
};

/** Earlier, more reliable in-view trigger for section reveals. */
export const viewportOnce = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -4% 0px",
} as const;

/** Eager trigger for dense card grids / above-the-fold blocks. */
export const viewportEager = {
  once: true,
  amount: 0.08,
  margin: "100px 0px 60px 0px",
} as const;

export type MotionVariantName = "up" | "left" | "right" | "fade" | "scale";

export const variantMap: Record<MotionVariantName, Variants> = {
  up: fadeUp,
  left: fadeLeft,
  right: fadeRight,
  fade: fadeIn,
  scale: scaleIn,
};
