import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export type IdentificacionSlide = {
  label: string;
  body: string;
  image: { src: string; alt: string };
};

export type BeneficiosSlide = {
  title: string;
  body: string;
  image: { src: string; alt: string };
};

type IdentificacionProps = {
  variant: "identificacion";
  cards: IdentificacionSlide[];
  className?: string;
};

type BeneficiosProps = {
  variant: "beneficios";
  cards: BeneficiosSlide[];
  className?: string;
};

type Props = IdentificacionProps | BeneficiosProps;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduced;
}

export default function SectionSwiper(props: Props) {
  const paginationRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isIdentificacion = props.variant === "identificacion";

  const bindPagination = (swiper: SwiperType) => {
    const el = paginationRef.current;
    if (!el) return;

    const pagination = swiper.params.pagination;
    if (!pagination || typeof pagination === "boolean") return;

    pagination.el = el;
    swiper.pagination.destroy();
    swiper.pagination.init();
    swiper.pagination.render();
    swiper.pagination.update();
  };

  return (
    <div className={props.className}>
      <Swiper
        modules={[Pagination]}
        slidesPerView={isIdentificacion ? 1.08 : 1}
        centeredSlides={isIdentificacion}
        spaceBetween={isIdentificacion ? 12 : 0}
        speed={reducedMotion ? 0 : 350}
        observer
        observeParents
        pagination={{ clickable: true }}
        onBeforeInit={bindPagination}
        onInit={bindPagination}
        /* Identificación: peek of next card; section clips with overflow-x-hidden */
        className={isIdentificacion ? "!overflow-visible" : "!overflow-hidden"}
      >
        {isIdentificacion
          ? props.cards.map((card) => (
              <SwiperSlide key={card.label} className="!h-auto">
                <article className="flex h-full flex-col rounded-[1.5rem] bg-brand-neutral-white px-6 py-7 shadow-[0_2px_12px_rgba(15,25,31,0.06)]">
                  <span className="mx-auto inline-flex w-fit rounded-full border border-brand-dark px-4 py-1 text-sm font-medium text-brand-dark">
                    {card.label}
                  </span>
                  <img
                    src={card.image.src}
                    alt={card.image.alt}
                    className="mx-auto mt-6 h-40 w-auto max-w-full object-contain"
                    loading="lazy"
                  />
                  <p className="mt-6 text-center text-sm leading-[1.5] text-brand-dark">
                    {card.body}
                  </p>
                </article>
              </SwiperSlide>
            ))
          : props.cards.map((card) => (
              <SwiperSlide key={card.title} className="!h-auto">
                <article className="rounded-[1.15rem] bg-brand-neutral-white p-5 sm:p-6">
                  <img
                    src={card.image.src}
                    alt=""
                    className="h-11 w-11 object-contain"
                    aria-hidden="true"
                    loading="lazy"
                  />
                  <h3 className="mt-4 text-base font-bold leading-snug text-brand-dark">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.5] text-brand-dark/85">
                    {card.body}
                  </p>
                </article>
              </SwiperSlide>
            ))}
      </Swiper>

      <div
        ref={paginationRef}
        className="section-swiper-pagination mt-5 flex items-center justify-center gap-2.5 sm:mt-6"
      />
    </div>
  );
}
