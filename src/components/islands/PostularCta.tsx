import { motion, useReducedMotion } from "framer-motion";
import type { MouseEvent } from "react";
import {
  isExternalHttpUrl,
  isPostularPlaceholder,
  postularHref,
} from "@utils/helpers";
import { springSoft } from "../../lib/motion";

type Props = {
  href?: string;
  label?: string;
  className?: string;
};

/**
 * Shared Postular CTA island. Always resolves to the Laboratoria apply URL
 * from site config unless a non-empty href is passed.
 */
export default function PostularCta({
  href,
  label = "Postular",
  className,
}: Props) {
  const reduceMotion = useReducedMotion();
  const resolvedHref = href?.trim() || postularHref();
  const external = isExternalHttpUrl(resolvedHref);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (resolvedHref.trim() === "") {
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

    if (isPostularPlaceholder(resolvedHref)) return;
  };

  return (
    <motion.a
      href={resolvedHref}
      className={className}
      onClick={handleClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={reduceMotion ? undefined : { scale: 1.03, y: -1 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={springSoft}
    >
      {label}
    </motion.a>
  );
}
