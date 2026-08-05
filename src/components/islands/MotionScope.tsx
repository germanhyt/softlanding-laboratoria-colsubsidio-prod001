import {
  animate,
  inView,
  stagger,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { easeOutExpo } from "../../lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** CSS selector for staggered children (default: [data-motion-item]). */
  itemSelector?: string;
  staggerDelay?: number;
  y?: number;
  /** `view` = when scope enters viewport; `mount` = on hydrate (hero). */
  trigger?: "view" | "mount";
};

/**
 * Staggers Astro-rendered children marked with `data-motion-item`.
 * Keeps section markup in `.astro` while still using Framer Motion.
 */
export default function MotionScope({
  children,
  className,
  itemSelector = "[data-motion-item]",
  staggerDelay = 0.1,
  y = 24,
  trigger = "view",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduceMotion) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>(itemSelector),
    );
    if (items.length === 0) return;

    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      el.style.willChange = "opacity, transform";
    });

    const play = () => {
      void animate(
        items,
        { opacity: 1, y: 0 },
        {
          delay: stagger(staggerDelay),
          duration: 0.55,
          ease: easeOutExpo,
        },
      ).then(() => {
        items.forEach((el) => {
          el.style.willChange = "";
        });
      });
    };

    if (trigger === "mount") {
      play();
      return;
    }

    return inView(root, play, { amount: 0.18, once: true });
  }, [reduceMotion, itemSelector, staggerDelay, y, trigger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
