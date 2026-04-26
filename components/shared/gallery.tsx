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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!emblaApi || !open) return;
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
          emblaApi={emblaApi}
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
  emblaApi,
  onClose,
  onPrev,
  onNext,
}: {
  images: { src: string; alt: string }[];
  emblaRef: ReturnType<typeof useEmblaCarousel>[0];
  emblaApi: ReturnType<typeof useEmblaCarousel>[1];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [thumbsEmblaRef, thumbsEmblaApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  useEffect(() => dialogRef.current?.focus(), []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
      setScale(1); // Reset zoom when changing images
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!thumbsEmblaApi) return;
    thumbsEmblaApi.scrollTo(currentIndex);
  }, [currentIndex, thumbsEmblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  }, [emblaApi]);

  const toggleZoom = useCallback(() => {
    setScale(prev => prev > 1 ? 1 : 2);
  }, []);

  // Handle wheel event for zoom and prevent page scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY * -0.001;
      const newScale = Math.min(Math.max(1, scale + delta), 3);
      setScale(newScale);
    };

    // Add listener to window to catch all wheel events
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Also prevent touchmove for mobile
    const preventTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) return; // Allow pinch zoom
      e.preventDefault();
    };
    document.body.addEventListener('touchmove', preventTouch, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.body.removeEventListener('touchmove', preventTouch);
    };
  }, [scale]);

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex flex-col bg-black/95"
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 rounded-full p-2 text-white hover:bg-white/10 transition-colors"
        aria-label="Fechar galeria"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Main Image Area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-4 z-10 rounded-full p-2 bg-black/30 text-white hover:bg-black/50 transition-colors"
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="absolute right-4 z-10 rounded-full p-2 bg-black/30 text-white hover:bg-black/50 transition-colors"
          aria-label="Próxima imagem"
        >
          <ChevronRight className="h-8 w-8" />
        </button>

        {/* Carousel Container - Compact Size like DILS */}
        <div className="overflow-hidden w-full max-w-3xl" ref={emblaRef}>
          <div className="flex">
            {images.map((img, idx) => (
              <div key={img.src} className="relative shrink-0 grow-0 basis-full flex items-center justify-center px-4">
                <div
                  ref={idx === currentIndex ? imageRef : null}
                  onClick={toggleZoom}
                  className="relative w-full h-[60vh] max-h-[500px] transition-transform duration-200 cursor-zoom-in"
                  style={{
                    transform: idx === currentIndex ? `scale(${scale})` : 'scale(1)',
                    cursor: scale > 1 ? 'zoom-out' : 'zoom-in'
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 90vw, 768px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="bg-black/60 backdrop-blur-sm py-3 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto overflow-hidden" ref={thumbsEmblaRef}>
          <div className="flex gap-2 justify-center">
            {images.map((img, i) => (
              <button
                key={`thumb-${img.src}-${i}`}
                type="button"
                onClick={() => scrollTo(i)}
                className={cn(
                  "relative shrink-0 w-16 h-12 overflow-hidden transition-all rounded",
                  currentIndex === i
                    ? "ring-2 ring-white/90 opacity-100"
                    : "opacity-50 hover:opacity-75 hover:ring-1 hover:ring-white/30"
                )}
                aria-label={`Ver imagem ${i + 1}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
