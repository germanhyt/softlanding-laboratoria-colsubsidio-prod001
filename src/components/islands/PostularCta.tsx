type Props = {
  /** Kept for existing call sites; navigation is closed. */
  href?: string;
  label?: string;
  className?: string;
};

/**
 * Closed-call CTA. Renders as a non-interactive button so it never redirects.
 */
export default function PostularCta({
  label = "Convocatoria cerrada",
  className,
}: Props) {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      className={[className, "pointer-events-none cursor-not-allowed opacity-90"]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </button>
  );
}
