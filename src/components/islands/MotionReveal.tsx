import { useReducedMotion, motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  type MotionVariantName,
  variantMap,
  viewportOnce,
} from "../../lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Entrance direction / style. Default: up */
  variant?: MotionVariantName;
  /** `view` = whileInView; `mount` = animate on load (hero). */
  trigger?: "view" | "mount";
};

/**
 * Entrance reveal for key section blocks.
 * Honors prefers-reduced-motion by rendering children statically.
 */
export default function MotionReveal({
  children,
  className,
  delay = 0,
  variant = "up",
  trigger = "view",
}: Props) {
  const reduceMotion = useReducedMotion();
  const variants = variantMap[variant];

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  if (trigger === "mount") {
    return (
      <motion.div
        className={className}
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
