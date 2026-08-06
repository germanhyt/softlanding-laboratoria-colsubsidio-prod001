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

function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || 0;
  return rect.top < vh * 0.9 && rect.bottom > vh * 0.08;
}

/**
 * Staggers Astro-rendered children marked with `data-motion-item`.
 * Items stay visible until the entrance plays — no flash on off-screen blocks.
 */
export default function MotionScope({
  children,
  className,
  itemSelector = "[data-motion-item]",
  staggerDelay = 0.055,
  y = 10,
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

    let played = false;

    const play = (mode: "full" | "subtle" = "full") => {
      if (played) return;
      played = true;

      const travel = mode === "subtle" ? Math.min(y, 6) : y;
      const fromOpacity = mode === "subtle" ? 0.94 : 0;

      items.forEach((el) => {
        el.style.opacity = String(fromOpacity);
        el.style.transform = `translate3d(0, ${travel}px, 0)`;
        el.style.willChange = "opacity, transform";
      });

      requestAnimationFrame(() => {
        void animate(
          items,
          { opacity: 1, y: 0 },
          {
            delay: stagger(staggerDelay),
            duration: mode === "subtle" ? 0.4 : 0.44,
            ease: easeOutExpo,
          },
        ).then(() => {
          items.forEach((el) => {
            el.style.willChange = "";
            el.style.transform = "";
            el.style.opacity = "";
          });
        });
      });
    };

    if (trigger === "mount") {
      play(isInViewport(root) ? "subtle" : "full");
      return;
    }

    return inView(
      root,
      () => play("full"),
      { amount: 0.22, once: true, margin: "0px 0px -5% 0px" },
    );
  }, [reduceMotion, itemSelector, staggerDelay, y, trigger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
