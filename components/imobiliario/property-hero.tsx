"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { defaultLayoutIcons, DefaultVideoLayout } from "@vidstack/react/player/layouts/default";
import type { ListingFrontmatter } from "@/lib/mdx";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

type PropertyHeroProps = {
  frontmatter: ListingFrontmatter;
};

const BADGE_STYLES = {
  novo: "bg-[color:var(--color-success)] text-white",
  investimento: "bg-[color:var(--color-gold)] text-[color:var(--color-navy)]",
  exclusivo: "bg-[color:var(--color-navy)] text-white",
  reduzido: "bg-[color:var(--color-danger)] text-white",
} as const;

const BADGE_LABELS = {
  novo: "Novo",
  investimento: "Investimento",
  exclusivo: "Exclusivo",
  reduzido: "Reduzido",
} as const;

export function PropertyHero({ frontmatter }: PropertyHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Reset zoom when changing images
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

  // Prevent body scroll and disable Lenis when lightbox is open
  useEffect(() => {
    const lenis = (window as any).__lenis;

    if (lightboxOpen) {
      // Get current scroll position
      const scrollY = window.scrollY;

      // Lock body scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      // Stop Lenis smooth scrolling
      if (lenis) {
        lenis.stop();
      }

      // Prevent wheel events on the document
      const preventScroll = (e: WheelEvent) => {
        if (!(e.target as HTMLElement).closest(".lightbox-zoom-area")) {
          e.preventDefault();
        }
      };

      document.addEventListener("wheel", preventScroll, { passive: false });

      return () => {
        // Restore scroll position
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);

        // Re-enable Lenis
        if (lenis) {
          lenis.start();
        }

        document.removeEventListener("wheel", preventScroll);
      };
    } else {
      // Reset zoom when closing
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [lightboxOpen]);

  // Combine hero + gallery + videos for complete media array
  type MediaItem = {
    type: "image" | "video";
    src: string;
  };

  const allMedia: MediaItem[] = [
    ...(frontmatter.hero ? [{ type: "image" as const, src: frontmatter.hero }] : []),
    ...(frontmatter.gallery || []).map((src) => ({ type: "image" as const, src })),
    ...(frontmatter.videos || []).map((src) => ({ type: "video" as const, src })),
  ];

  const hasMultipleItems = allMedia.length > 1;

  const currentItem = allMedia[currentIndex];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % allMedia.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  // Zoom handlers
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => {
      const newScale = Math.min(Math.max(1, prev + delta), 4);
      // Reset position if zooming back to 1
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newScale;
    });
  };

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (allMedia.length === 0) {
    return null;
  }

  const isVideo = currentItem?.type === "video";

  return (
    <>
      {/* Main Hero */}
      <div className="relative">
        {/* Main Media (Image or Video) */}
        <div className="relative aspect-[21/9] md:aspect-[21/7] overflow-hidden bg-[color:var(--color-stone)]/20">
          {isVideo ? (
            <video
              src={currentItem.src}
              className="absolute inset-0 w-full h-full object-cover"
              controls
              playsInline
              preload="metadata"
            />
          ) : (
            <Image
              src={currentItem.src}
              alt={frontmatter.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}

          {/* Watermark Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <Image
              src="/Logos/CNRC/Logos_CNRC_Transparent.png"
              alt=""
              width={120}
              height={48}
              className="opacity-30"
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Badges Overlay */}
          {frontmatter.badges && frontmatter.badges.length > 0 && (
            <div className="absolute top-6 left-6 md:top-8 md:left-8 flex flex-wrap gap-2 z-10">
              {frontmatter.badges.map((badge) => {
                const badgeKey = badge.toLowerCase() as keyof typeof BADGE_STYLES;
                const style = BADGE_STYLES[badgeKey] || BADGE_STYLES.novo;
                const label = BADGE_LABELS[badgeKey] || badge;

                return (
                  <span
                    key={badge}
                    className={`px-4 py-2 text-sm font-bold uppercase tracking-wider ${style} shadow-lg`}
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          )}

          {/* Lightbox Button */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute top-6 right-6 md:top-8 md:right-8 p-3 bg-white/90 backdrop-blur-sm hover:bg-white text-[color:var(--color-navy)] transition-colors z-10 shadow-lg"
            aria-label="Ver galeria completa"
          >
            <Maximize2 className="h-5 w-5" />
          </button>

          {/* Navigation Arrows */}
          {hasMultipleItems && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm hover:bg-white text-[color:var(--color-navy)] transition-all z-10 shadow-lg"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm hover:bg-white text-[color:var(--color-navy)] transition-all z-10 shadow-lg"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Media Counter */}
          {hasMultipleItems && (
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 px-4 py-2 bg-black/60 backdrop-blur-sm text-white text-sm font-medium z-10">
              {currentIndex + 1} / {allMedia.length}
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {hasMultipleItems && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent pb-6 pt-12">
            <div className="overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {allMedia.slice(0, 8).map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToImage(idx)}
                    className={`relative w-20 h-14 flex-shrink-0 overflow-hidden transition-all ${idx === currentIndex
                      ? "ring-2 ring-white ring-offset-2 ring-offset-black/50 opacity-100"
                      : "opacity-60 hover:opacity-100"
                      }`}
                  >
                    {item.type === "video" ? (
                      <video
                        src={item.src}
                        className="w-full h-full object-cover"
                        preload="metadata"
                      />
                    ) : (
                      <Image src={item.src} alt={`Miniatura ${idx + 1}`} fill className="object-cover" />
                    )}
                  </button>
                ))}
                {allMedia.length > 8 && (
                  <div className="flex items-center justify-center w-20 h-14 bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                    +{allMedia.length - 8}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
          {/* Header with close button */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-3 text-white hover:bg-white/10 transition-colors"
              aria-label="Fechar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div
            className="lightbox-zoom-area flex-1 relative flex items-center justify-center px-4 md:px-8 py-20 overflow-hidden"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
          >
            {/* Navigation Arrows */}
            {hasMultipleItems && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white transition-colors z-10 rounded-full"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white transition-colors z-10 rounded-full"
                  aria-label="Próximo"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            {/* Media Container */}
            {isVideo ? (
              <div className="relative w-full max-w-5xl h-[70vh]">
                <MediaPlayer
                  title={frontmatter.title}
                  src={currentItem.src}
                  aspectRatio="16/9"
                  crossOrigin
                  playsInline
                  autoPlay
                  className="w-full h-full"
                >
                  <MediaProvider />
                  <DefaultVideoLayout icons={defaultLayoutIcons} />
                </MediaPlayer>
              </div>
            ) : (
              <div
                className="relative w-full max-w-5xl h-[70vh] transition-transform"
                style={{
                  transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                }}
              >
                <Image
                  src={currentItem.src}
                  alt={frontmatter.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 1024px"
                  className="object-contain select-none"
                  draggable={false}
                />

                {/* Watermark Overlay in Lightbox */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <Image
                    src="/Logos/CNRC/Logos_CNRC_Transparent.png"
                    alt=""
                    width={100}
                    height={40}
                    className="opacity-20"
                    style={{ objectFit: "contain" }}
                    draggable={false}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail Navigation at Bottom */}
          {hasMultipleItems && (
            <div className="bg-black/60 backdrop-blur-sm py-3 px-4 border-t border-white/10">
              <div className="max-w-4xl mx-auto">
                <div className="flex gap-2 justify-center overflow-x-auto">
                  {allMedia.slice(0, 10).map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToImage(idx)}
                      className={`relative w-16 h-12 flex-shrink-0 overflow-hidden transition-all rounded ${idx === currentIndex
                        ? "ring-2 ring-white/90 opacity-100"
                        : "opacity-50 hover:opacity-75 hover:ring-1 hover:ring-white/30"
                        }`}
                    >
                      {item.type === "video" ? (
                        <video
                          src={item.src}
                          className="w-full h-full object-cover"
                          preload="metadata"
                        />
                      ) : (
                        <Image src={item.src} alt={`Miniatura ${idx + 1}`} fill sizes="64px" className="object-cover" />
                      )}
                    </button>
                  ))}
                  {allMedia.length > 10 && (
                    <div className="flex items-center justify-center w-16 h-12 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded">
                      +{allMedia.length - 10}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
