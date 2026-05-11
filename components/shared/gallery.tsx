"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type GalleryProps = {
  images: { src: string; alt: string }[];
  columns?: 2 | 3 | 4;
  className?: string;
};

export function Gallery({ images, columns = 3, className }: GalleryProps) {
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
            <div
              key={`${img.src}-${i}`}
              className="relative w-[75vw] shrink-0 aspect-[4/3] overflow-hidden bg-[color:var(--color-navy-soft)]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="75vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Grid */}
      <div className={cn("hidden md:grid gap-3", colClasses[columns], className)}>
        {images.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="relative aspect-[4/3] overflow-hidden bg-[color:var(--color-navy-soft)]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
}
