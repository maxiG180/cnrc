"use client";

import { useEffect, useRef } from "react";

interface HeroVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export function HeroVideo({ src, poster, className = "" }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Threshold adaptativo: 50% no mobile, 70% no desktop
    const isMobile = window.innerWidth < 768;
    const threshold = isMobile ? 0.6 : 0.9;

    // Intersection Observer para pausar quando não visível
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Vídeo está visível, tocar
            video.play().catch(() => {
              // Ignorar erros de autoplay (browsers podem bloquear)
            });
          } else {
            // Vídeo não está visível, pausar para economizar recursos
            video.pause();
          }
        });
      },
      {
        // Pausar quando menos de threshold% do vídeo estiver visível
        threshold,
        // Sem margin adicional para deteção mais precisa
        rootMargin: "0px",
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      disableRemotePlayback
      preload="metadata"
      className={`object-cover ${className}`}
      style={{ objectPosition: "50% 40%" }}
    />
  );
}
