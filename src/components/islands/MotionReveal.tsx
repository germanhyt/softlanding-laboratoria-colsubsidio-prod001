import { useReducedMotion, motion } from "framer-motion";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  type MotionVariantName,
  easeOutExpo,
  hiddenStyleForVariant,
  subtleHiddenForVariant,
  variantMap,
  viewportScroll,
} from "../../lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: MotionVariantName;
  /** `view` = reveal on scroll; `mount` = animate once on load (hero). */
  trigger?: "view" | "mount";
};

function isBelowFold(el: HTMLElement): boolean {
  return el.getBoundingClientRect().top >= window.innerHeight * 0.92;
}

/** Soft entrance when the block is already on screen at hydrate. */
function subtleFromVariant(variant: MotionVariantName) {
  return subtleHiddenForVariant(variant);
}

/**
 * Single-block scroll entrance — one heading, paragraph, image, or CTA per instance.
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
  const [mode, setMode] = useState<"pending" | "scroll" | "enter">("pending");
  const variants = variantMap[variant];

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || trigger !== "view") {
      setMode("enter");
      return;
    }
    if (isBelowFold(el)) {
      const hidden = hiddenStyleForVariant(variant);
      el.style.opacity = hidden.opacity;
      el.style.transform = hidden.transform;
      el.style.willChange = "opacity, transform";
      setMode("scroll");
    } else {
      setMode("enter");
    }
  }, [trigger, variant]);

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

  if (mode === "pending") {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  if (mode === "enter") {
    const from = subtleFromVariant(variant);
    const to = { opacity: 1, y: 0, x: 0, scale: 1 };
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={from}
        animate={to}
        transition={{ duration: 0.52, ease: easeOutExpo, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportScroll}
      transition={{ delay }}
      onAnimationComplete={() => {
        const el = ref.current;
        if (!el) return;
        el.style.opacity = "";
        el.style.transform = "";
        el.style.willChange = "";
      }}
    >
      {children}
    </motion.div>
  );
}
