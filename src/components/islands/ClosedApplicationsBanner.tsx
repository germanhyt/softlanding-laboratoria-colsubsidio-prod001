import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "../../lib/motion";

type Props = {
  brand: string;
  partner: string;
  logoSrc: string;
  partnerLogoSrc: string;
  title: string;
  body: string;
};

const STORAGE_KEY = "colsubsidio-closed-applications-banner";
const clipClosed = "inset(0 0 100% 0 round 20px)";
const clipOpen = "inset(0 0 0% 0 round 20px)";

export default function ClosedApplicationsBanner({
  brand,
  partner,
  logoSrc,
  partnerLogoSrc,
  title,
  body,
}: Props) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* private mode */
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* private mode */
    }
    setOpen(false);
  };

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
            onClick={close}
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
            className="relative z-10 w-full max-w-[560px] overflow-hidden rounded-[20px] bg-brand-yellow px-5 py-7 shadow-[0_16px_40px_rgba(15,25,31,0.18)] sm:px-8 sm:py-9 md:px-10"
          >
            <span
              className="absolute left-0 top-0 h-1.5 w-full bg-brand-magenta-bright"
              aria-hidden="true"
            />

            <button
              type="button"
              className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-neutral-black transition-opacity hover:opacity-70"
              aria-label="Cerrar aviso"
              onClick={close}
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

            <div className="flex gap-[13px]">
              <span
                className="mt-1 w-1 shrink-0 self-stretch rounded-full bg-brand-magenta-bright"
                aria-hidden="true"
              />
              <div>
                <h2
                  id={titleId}
                  className="text-[26px] font-semibold leading-[1.18] text-brand-neutral-black sm:text-[32px]"
                >
                  {title}
                </h2>
                <p
                  id={descId}
                  className="mt-3 max-w-[420px] text-base leading-relaxed text-brand-dark sm:text-lg"
                >
                  {body}
                </p>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-end gap-2 sm:gap-2.5">
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
