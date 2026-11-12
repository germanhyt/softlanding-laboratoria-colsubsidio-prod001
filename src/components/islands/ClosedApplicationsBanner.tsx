import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { OPEN_CLOSED_APPLICATIONS } from "../../lib/closedApplications";
import { easeOutExpo } from "../../lib/motion";

type Props = {
  brand: string;
  partner: string;
  logoSrc: string;
  partnerLogoSrc: string;
  headlineBefore: string;
  headlineAccent: string;
  bodyBefore: string;
  bodyAccent: string;
  bodyAfter: string;
};

const clipClosed = "inset(0 0 100% 0 round 20px)";
const clipOpen = "inset(0 0 0% 0 round 20px)";

export default function ClosedApplicationsBanner({
  brand,
  partner,
  logoSrc,
  partnerLogoSrc,
  headlineBefore,
  headlineAccent,
  bodyBefore,
  bodyAccent,
  bodyAfter,
}: Props) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_CLOSED_APPLICATIONS, onOpen);
    return () => window.removeEventListener(OPEN_CLOSED_APPLICATIONS, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.28 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-brand-dark/45 backdrop-blur-[2px]"
            aria-label="Cerrar aviso"
            onClick={() => setOpen(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            initial={reduce ? { opacity: 0 } : { clipPath: clipClosed, opacity: 1 }}
            animate={reduce ? { opacity: 1 } : { clipPath: clipOpen, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { clipPath: clipClosed, opacity: 1 }}
            transition={{ duration: reduce ? 0.18 : 0.48, ease: easeOutExpo }}
            className="relative z-10 w-full max-w-[640px] overflow-hidden rounded-[1.25rem] bg-brand-neutral-white px-6 py-8 shadow-[0_16px_40px_rgba(15,25,31,0.18)] sm:px-8 sm:py-10 md:px-10"
          >
            <button
              type="button"
              className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-dark transition-opacity hover:opacity-70"
              aria-label="Cerrar aviso"
              onClick={() => setOpen(false)}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <h2
              id={titleId}
              className="pr-10 text-[1.65rem] font-bold leading-[1.15] tracking-tight text-brand-dark sm:text-[2.1rem]"
            >
              <span className="block">{headlineBefore}</span>
              <span className="block text-brand-magenta">{headlineAccent}</span>
            </h2>

            <p
              id={descId}
              className="mt-6 border-l-2 border-brand-magenta pl-4 text-[0.9375rem] leading-[1.55] text-brand-dark sm:pl-5 sm:text-base md:text-lg md:leading-[1.55]"
            >
              {bodyBefore}
              <strong className="font-bold">{bodyAccent}</strong>
              {bodyAfter}
            </p>

            <div className="mt-8 flex items-center justify-end gap-2 sm:gap-2.5">
              <img
                src={logoSrc}
                alt={`Logo ${brand}`}
                className="h-[16px] w-auto sm:h-[18px]"
                width={160}
                height={20}
              />
              <span className="text-sm font-semibold leading-none" aria-hidden="true">
                /
              </span>
              <img
                src={partnerLogoSrc}
                alt={`Logo ${partner}`}
                className="h-[26px] w-auto sm:h-[30px]"
                width={140}
                height={28}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
