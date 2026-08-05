import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { easeOutExpo } from "../../lib/motion";

export type FaqAccordionItem = {
  q: string;
  a: string;
  needsReview?: boolean;
};

type Props = {
  items: FaqAccordionItem[];
};

export default function FaqAccordion({ items }: Props) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="divide-y divide-brand-dark/15 border-y border-brand-dark/15">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.q} className="py-1">
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-bold text-brand-dark transition hover:text-brand-dark/80 sm:text-lg"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.q}</span>
                <span
                  className={`shrink-0 text-brand-dark transition-transform duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 9l6 6 6-6"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="panel"
                  initial={
                    reduceMotion
                      ? false
                      : { height: 0, opacity: 0 }
                  }
                  animate={
                    reduceMotion
                      ? { height: "auto", opacity: 1 }
                      : { height: "auto", opacity: 1 }
                  }
                  exit={
                    reduceMotion
                      ? undefined
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.28, ease: easeOutExpo }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 pr-8 text-sm leading-relaxed text-brand-dark/80 sm:text-base">
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
