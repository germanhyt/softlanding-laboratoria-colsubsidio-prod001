import {
  animate,
  inView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import {
  type MotionVariantName,
  hiddenStyleForVariant,
  itemEntrance,
  itemInViewOptions,
  motionTravel,
  subtleHiddenForVariant,
} from "../../lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  itemSelector?: string;
  /** Entrance direction for each `[data-motion-item]`. Default: up (bottom→top). */
  variant?: MotionVariantName;
  staggerDelay?: number;
  y?: number;
  trigger?: "view" | "mount";
};

function isBelowFold(el: HTMLElement): boolean {
  return el.getBoundingClientRect().top >= window.innerHeight * 0.98;
}

function applyHiddenStyle(
  el: HTMLElement,
  variant: MotionVariantName,
  y: number,
  subtle = false,
) {
  if (subtle) {
    const s = subtleHiddenForVariant(variant, y);
    el.style.opacity = String(s.opacity);
    if (s.x !== undefined) {
      el.style.transform = `translate3d(${s.x}px, 0, 0)`;
    } else if (s.y !== undefined) {
      el.style.transform = `translate3d(0, ${s.y}px, 0)`;
    } else if (s.scale !== undefined) {
      el.style.transform = `scale(${s.scale})`;
    } else {
      el.style.transform = "none";
    }
  } else {
    const hidden = hiddenStyleForVariant(variant, y);
    el.style.opacity = hidden.opacity;
    el.style.transform = hidden.transform;
  }
  el.style.willChange = "opacity, transform";
}

/**
 * Per-item scroll entrances for `[data-motion-item]` children.
 * Each item animates on its own inView — no group blink.
 */
export default function MotionScope({
  children,
  className,
  itemSelector = "[data-motion-item]",
  variant = "up",
  staggerDelay = 0.07,
  y = motionTravel.y,
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

    const played = new WeakSet<HTMLElement>();
    const cleanups: (() => void)[] = [];

    const reveal = (el: HTMLElement, order: number, forceFull = false) => {
      if (played.has(el)) return;
      played.add(el);

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const alreadyVisible =
        !forceFull && rect.top < vh * 0.88 && rect.bottom > 0;

      applyHiddenStyle(el, variant, y, alreadyVisible);

      requestAnimationFrame(() => {
        void animate(
          el,
          { opacity: 1, y: 0, x: 0, scale: 1 },
          {
            ...itemEntrance,
            delay: order * staggerDelay,
          },
        ).then(() => {
          el.style.opacity = "";
          el.style.transform = "";
          el.style.willChange = "";
        });
      });
    };

    if (trigger === "mount") {
      items.forEach((el, index) => reveal(el, index, true));
      return;
    }

    items.forEach((el, index) => {
      if (isBelowFold(el)) {
        applyHiddenStyle(el, variant, y, false);
      }

      cleanups.push(
        inView(
          el,
          () => reveal(el, index),
          itemInViewOptions,
        ),
      );
    });

    return () => cleanups.forEach((stop) => stop());
  }, [reduceMotion, itemSelector, variant, staggerDelay, y, trigger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
