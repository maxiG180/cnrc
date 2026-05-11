"use client";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { defaultLayoutIcons, DefaultVideoLayout } from "@vidstack/react/player/layouts/default";
import { useTranslations } from "next-intl";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

type VideoPlayerProps = {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
};

export function VideoPlayer({ src, poster, title, className }: VideoPlayerProps) {
  const t = useTranslations();
  return (
    <div className={className}>
      <MediaPlayer
        title={title ?? t("common.videoTitle")}
        src={src}
        poster={poster}
        aspectRatio="16/9"
        crossOrigin
        playsInline
      >
        <MediaProvider />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </div>
  );
}
