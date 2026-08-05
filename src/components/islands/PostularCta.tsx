import { motion, useReducedMotion } from "framer-motion";
import type { MouseEvent } from "react";
import { isPostularPlaceholder } from "@utils/helpers";
import { springSoft } from "../../lib/motion";

type Props = {
  href: string;
  label?: string;
  className?: string;
};

/**
 * Shared Postular CTA island. Navigates to `href` from site config.
 * SweetAlert2 is reserved for a future empty-URL gate; `#postular` is a valid placeholder target.
 */
export default function PostularCta({
  href,
  label = "Postular",
  className,
}: Props) {
  const reduceMotion = useReducedMotion();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Only intercept truly empty targets; `#postular` scrolls to the closing band.
    if (href.trim() === "") {
      event.preventDefault();
      void import("sweetalert2").then((mod) =>
        mod.default.fire({
          title: "Próximamente",
          text: "La postulación estará disponible en breve.",
          confirmButtonText: "Entendido",
          confirmButtonColor: "#FFE521",
        }),
      );
      return;
    }

    // Keep default navigation for `#postular` and absolute URLs.
    if (isPostularPlaceholder(href)) return;
  };

  return (
    <motion.a
      href={href || "#postular"}
      className={className}
      onClick={handleClick}
      whileHover={reduceMotion ? undefined : { scale: 1.03, y: -1 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={springSoft}
    >
      {label}
    </motion.a>
  );
}
