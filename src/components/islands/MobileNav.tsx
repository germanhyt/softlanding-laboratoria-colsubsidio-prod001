import { useEffect, useId, useState } from "react";

export type MobileNavLink = {
  label: string;
  href: string;
};

type Props = {
  links: MobileNavLink[];
  conocenosUrl: string;
  postularUrl: string;
  logoSrc?: string;
  logoAlt?: string;
};

export default function MobileNav({
  links,
  conocenosUrl,
  postularUrl,
}: Props) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [solidHeader, setSolidHeader] = useState(false);

  useEffect(() => {
    const sync = () => {
      setSolidHeader(window.scrollY > 24 || window.innerWidth >= 1024);
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  useEffect(() => {
    const headerEl = document.getElementById("site-header");
    if (!headerEl) return;

    if (open) {
      headerEl.classList.add("is-solid", "is-nav-open");
    } else {
      headerEl.classList.remove("is-nav-open");
      if (window.scrollY <= 24 && window.innerWidth < 1024) {
        headerEl.classList.remove("is-solid");
      }
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);
  const iconOnDark = !solidHeader && !open;

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className={`inline-flex h-10 w-10 items-center justify-center rounded-md transition ${
          iconOnDark ? "text-brand-neutral-white" : "text-brand-dark"
        }`}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">Menú</span>
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {/* Backdrop overlay below header */}
      <div
        className={`fixed inset-x-0 top-14 sm:top-16 bottom-0 z-30 bg-brand-dark/30 transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        onClick={close}
      />

      {/* Mobile navigation panel — appearing directly below header with clippy radial reveal */}
      <nav
        id={panelId}
        aria-label="Menú móvil"
        className={`mobile-nav-clippy fixed inset-x-0 top-14 sm:top-16 bottom-0 z-40 flex flex-col justify-between border-t border-brand-dark/10 bg-brand-neutral-white px-6 py-6 shadow-2xl ${
          open ? "is-open" : ""
        }`}
        {...(!open ? { inert: true as const } : {})}
      >
        <ul className="flex flex-col gap-1 overflow-y-auto py-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-xl px-4 py-3.5 text-base font-semibold text-brand-dark transition hover:bg-brand-neutral-mist hover:text-brand-magenta"
                onClick={close}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={conocenosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl px-4 py-3.5 text-base font-semibold text-brand-dark transition hover:bg-brand-neutral-mist hover:text-brand-magenta"
              onClick={close}
            >
              Conócenos
            </a>
          </li>
        </ul>

        <div className="border-t border-brand-dark/10 pt-5 pb-2">
          <a
            href={postularUrl}
            className="inline-flex w-full items-center justify-center rounded-full bg-brand-yellow px-6 py-3.5 text-base font-bold text-brand-neutral-black transition hover:bg-brand-yellow-soft shadow-md active:scale-[0.99]"
            onClick={close}
          >
            Postular
          </a>
        </div>
      </nav>
    </div>
  );
}
