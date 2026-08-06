import { useReducedMotion, motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  type MotionVariantName,
  variantMap,
  viewportEager,
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
 * - already in viewport → animate in immediately (no stuck opacity:0)
 * - below fold → start hidden, reveal on scroll
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

  useEffect(() => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      setInViewOnArm(rect.top < vh * 0.92 && rect.bottom > vh * 0.08);
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

  // Already on screen: play entrance once from hidden → visible
  if (inViewOnArm) {
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
      viewport={viewportEager}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
