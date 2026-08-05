import { useEffect, useId, useState } from "react";

export type MobileNavLink = {
  label: string;
  href: string;
};

type Props = {
  links: MobileNavLink[];
  conocenosUrl: string;
  postularUrl: string;
  logoSrc: string;
  logoAlt: string;
};

export default function MobileNav({
  links,
  conocenosUrl,
  postularUrl,
  logoSrc,
  logoAlt,
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
          iconOnDark
            ? "text-brand-neutral-white"
            : "text-brand-dark"
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

      <div
        className={`fixed inset-0 z-40 bg-brand-dark/40 transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        onClick={close}
      />

      <nav
        id={panelId}
        aria-label="Menú móvil"
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col bg-brand-neutral-white shadow-xl transition-[clip-path,transform] duration-300 ease-out motion-reduce:transition-none ${
          open
            ? "[clip-path:inset(0_0_0_0)] translate-x-0"
            : "[clip-path:inset(0_0_0_100%)] translate-x-4"
        }`}
        {...(!open ? { inert: true as const } : {})}
      >
        <div className="flex items-center justify-between border-b border-brand-dark/10 px-5 py-4">
          <a
            href="#inicio"
            className="inline-flex items-center"
            aria-label={`${logoAlt} — inicio`}
            onClick={close}
          >
            <img
              src={logoSrc}
              alt={logoAlt}
              className="h-6 w-auto"
              width={140}
              height={18}
            />
          </a>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-brand-dark"
            aria-label="Cerrar menú"
            onClick={close}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-1 flex-col gap-1 px-3 py-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-xl px-4 py-3 text-base font-medium text-brand-dark transition hover:bg-brand-neutral-mist"
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
              className="block rounded-xl px-4 py-3 text-base font-medium text-brand-dark transition hover:bg-brand-neutral-mist"
              onClick={close}
            >
              Conócenos
            </a>
          </li>
        </ul>

        <div className="border-t border-brand-dark/10 p-5">
          <a
            href={postularUrl}
            className="inline-flex w-full items-center justify-center rounded-full bg-brand-yellow px-5 py-3 text-base font-bold text-brand-neutral-black transition hover:bg-brand-yellow-soft"
            onClick={close}
          >
            Postular
          </a>
        </div>
      </nav>
    </div>
  );
}
