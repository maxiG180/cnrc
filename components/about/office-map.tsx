"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Map, { Marker, NavigationControl, Popup, MapRef } from "react-map-gl/maplibre";
import Image from "next/image";
import { useTranslations } from "next-intl";
import "maplibre-gl/dist/maplibre-gl.css";

// Real geographic coordinates [longitude, latitude]
export interface Office {
  name: string;
  slug: string;
  coordinates: [number, number];
  isInternational: boolean;
  image: string;
}

export const offices: Office[] = [
  { name: "Lisboa", slug: "lisboa", coordinates: [-9.1393, 38.7223], isInternational: false, image: "/images/office-lisboa.jpg" },
  { name: "Barreiro", slug: "barreiro", coordinates: [-9.0719, 38.6634], isInternational: false, image: "/images/office-barreiro.jpg" },
  { name: "Montijo", slug: "montijo", coordinates: [-8.9739, 38.7074], isInternational: false, image: "/images/office-montijo.jpg" },
  { name: "Braga", slug: "braga", coordinates: [-8.4261, 41.5454], isInternational: false, image: "/images/office-braga.jpg" },
];

interface OfficeMapProps {
  onOfficeClick?: (office: Office) => void;
  selectedOffice?: Office | null;
}

export function OfficeMap({ onOfficeClick, selectedOffice }: OfficeMapProps = {}) {
  const t = useTranslations("officeMap");
  const [popupInfo, setPopupInfo] = useState<Office | null>(null);
  const [cursor, setCursor] = useState<string>("grab");
  const [isMobile, setIsMobile] = useState(false);
  const mapRef = useRef<MapRef>(null);

  // Update popup and fly to location when selectedOffice changes
  useEffect(() => {
    if (selectedOffice && mapRef.current) {
      setPopupInfo(selectedOffice);

      // Fly to the selected office location
      mapRef.current.flyTo({
        center: [selectedOffice.coordinates[0], selectedOffice.coordinates[1]],
        zoom: 10,
        duration: 2000,
        essential: true
      });
    }
  }, [selectedOffice]);

  const onMarkerClick = useCallback((office: Office) => {
    setPopupInfo(office);
    onOfficeClick?.(office);
  }, [onOfficeClick]);

  // Detect if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative w-full max-w-[600px] mx-auto px-8 md:px-0">
      <div
        className="bg-[color:var(--color-bone)]/50 rounded-lg overflow-hidden border border-[color:var(--color-stone)]/20"
        onWheel={(e) => {
          // Only prevent page scroll on desktop when scrolling over map
          if (!isMobile) {
            e.stopPropagation();
          }
        }}
      >
        <div className="h-[500px] md:h-[650px]">
          <Map
            ref={mapRef}
            initialViewState={{
              longitude: -8.0,
              latitude: 39.5,
              zoom: 5.8,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          scrollZoom={!isMobile}
          dragPan={true}
          dragRotate={false}
          doubleClickZoom={true}
          touchZoomRotate={true}
          touchPitch={false}
          pitchWithRotate={false}
          keyboard={false}
          bearing={0}
          minPitch={0}
          maxPitch={0}
          minZoom={4}
          maxZoom={12}
          cursor={cursor}
          onMouseEnter={() => setCursor("grab")}
          onMouseLeave={() => setCursor("default")}
          onDragStart={() => setCursor("grabbing")}
          onDragEnd={() => setCursor("grab")}
          attributionControl={false}
        >
          <NavigationControl position="top-right" showCompass={false} />

          {offices.map((office) => (
            <Marker
              key={office.slug}
              longitude={office.coordinates[0]}
              latitude={office.coordinates[1]}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                onMarkerClick(office);
              }}
            >
              <div className="cursor-pointer group">
                {/* Pin marker */}
                <div
                  className="relative transition-transform group-hover:scale-110"
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-lg"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      fill={office.isInternational ? "var(--color-danger)" : "var(--color-gold)"}
                      stroke="white"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12"
                      cy="9"
                      r="3"
                      fill="white"
                      opacity="0.9"
                    />
                  </svg>
                </div>
              </div>
            </Marker>
          ))}

          {popupInfo && (
            <Popup
              longitude={popupInfo.coordinates[0]}
              latitude={popupInfo.coordinates[1]}
              anchor="top"
              onClose={() => setPopupInfo(null)}
              closeOnClick={false}
              className="custom-popup"
              maxWidth="500px"
            >
              <div className="overflow-hidden">
                {/* Office Image */}
                <div className="relative w-full aspect-square bg-[color:var(--color-stone)]/10">
                  <Image
                    src={popupInfo.image}
                    alt={popupInfo.name}
                    fill
                    sizes="500px"
                    className="object-cover object-center"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Office Info */}
                <div className="p-5">
                  <p className="font-semibold text-[color:var(--color-navy)] text-xl">
                    {popupInfo.name}
                  </p>
                  <p className="text-base text-[color:var(--color-ink)]/70 mt-2">
                    {popupInfo.isInternational ? t("international") : t("portugal")}
                  </p>
                </div>
              </div>
            </Popup>
          )}
        </Map>
        </div>

        {/* Legend */}
        <div className="p-4 bg-[color:var(--color-bone)] flex items-center justify-center gap-6 text-sm border-t border-[color:var(--color-stone)]/20">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[color:var(--color-gold)] border-2 border-white shadow-sm" />
            <span className="text-[color:var(--color-ink)]/70">{t("portugal")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[color:var(--color-danger)] border-2 border-white shadow-sm" />
            <span className="text-[color:var(--color-ink)]/70">{t("international")}</span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-[color:var(--color-ink)]/60">
        <span className="hidden md:inline">{t("instructionsDesktop")} </span>
        <span className="md:hidden">{t("instructionsMobile")} </span>
        {t("instructionsClick")}
      </p>

      <style jsx global>{`
        .maplibregl-popup-content {
          padding: 0;
          background: var(--color-bone);
          border-radius: 8px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
        }

        .maplibregl-popup-close-button {
          font-size: 20px;
          padding: 4px 8px;
          color: var(--color-navy);
        }

        .maplibregl-popup-close-button:hover {
          background: var(--color-bone-soft);
        }

        .maplibregl-popup-tip {
          border-top-color: var(--color-bone);
        }
      `}</style>
    </div>
  );
}
