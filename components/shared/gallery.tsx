"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

type GalleryProps = {
  images: { src: string; alt: string }[];
  columns?: 2 | 3 | 4;
  className?: string;
};

export function Gallery({ images, columns = 3, className }: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: index });

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index, true);
  }, [emblaApi, index, open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") emblaApi?.scrollNext();
      if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, emblaApi]);

  const colClasses = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-3 lg:grid-cols-4",
  } as const;

  return (
    <>
      {/* Mobile: Horizontal scroll */}
      <div className="md:hidden -mx-6 px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 pb-2">
          {images.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              type="button"
              onClick={() => openAt(i)}
              className="group relative w-[75vw] shrink-0 aspect-[4/3] overflow-hidden bg-[color:var(--color-navy-soft)] focus:outline-none"
              aria-label={`Abrir imagem ${i + 1} na galeria`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="75vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-active:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-[color:var(--color-navy)]/0 transition-colors duration-300 group-active:bg-[color:var(--color-navy)]/20" />
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Grid */}
      <div className={cn("hidden md:grid gap-3", colClasses[columns], className)}>
        {images.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            type="button"
            onClick={() => openAt(i)}
            className="group relative aspect-[4/3] overflow-hidden bg-[color:var(--color-navy-soft)] focus:outline-none"
            aria-label={`Abrir imagem ${i + 1} na galeria`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-[color:var(--color-navy)]/0 transition-colors duration-300 group-hover:bg-[color:var(--color-navy)]/20" />
          </button>
        ))}
      </div>

      {open && (
        <Lightbox
          images={images}
          emblaRef={emblaRef}
          onClose={() => setOpen(false)}
          onPrev={() => emblaApi?.scrollPrev()}
          onNext={() => emblaApi?.scrollNext()}
        />
      )}
    </>
  );
}

function Lightbox({
  images,
  emblaRef,
  onClose,
  onPrev,
  onNext,
}: {
  images: { src: string; alt: string }[];
  emblaRef: ReturnType<typeof useEmblaCarousel>[0];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => dialogRef.current?.focus(), []);

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[color:var(--color-navy-deep)]/95 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-10 rounded-full p-3 text-[color:var(--color-bone)] hover:bg-white/10"
        aria-label="Fechar galeria"
      >
        <X className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={onPrev}
        className="absolute left-3 md:left-6 z-10 rounded-full p-2.5 text-[color:var(--color-bone)] hover:bg-white/10"
        aria-label="Imagem anterior"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        type="button"
        onClick={onNext}
        className="absolute right-3 md:right-6 z-10 rounded-full p-2.5 text-[color:var(--color-bone)] hover:bg-white/10"
        aria-label="Próxima imagem"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((img) => (
            <div key={img.src} className="relative shrink-0 grow-0 basis-full flex items-center justify-center p-8 md:p-16">
              <div className="relative w-full h-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
