import { useReducedMotion, motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  type MotionVariantName,
  subtleInViewByVariant,
  subtleTransition,
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
 *
 * First paint / SSR stays VISIBLE. After hydrate we arm motion:
 * - already in viewport → subtle nudge (no opacity:0 flash)
 * - below fold → full reveal on scroll
 * Honors prefers-reduced-motion.
 */
export default function MotionReveal({
  children,
  className,
  delay = 0,
  variant = "up",
  trigger = "view",
}: Props) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [inViewOnArm, setInViewOnArm] = useState(false);
  const variants = variantMap[variant];
  const subtle = subtleInViewByVariant[variant];

  useEffect(() => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      setInViewOnArm(rect.top < vh * 0.88 && rect.bottom > vh * 0.1);
    }
    const id = requestAnimationFrame(() => setArmed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  if (!armed) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
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

  if (inViewOnArm) {
    return (
      <motion.div
        className={className}
        initial={subtle.initial}
        animate={subtle.animate}
        transition={{ ...subtleTransition, delay }}
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
