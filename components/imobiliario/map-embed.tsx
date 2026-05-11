"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl/maplibre";
import type { ListingFrontmatter } from "@/lib/mdx";
import "maplibre-gl/dist/maplibre-gl.css";

type Listing = {
  slug: string;
  frontmatter: ListingFrontmatter;
  content: string;
};

type MapEmbedProps = {
  listings: Listing[];
  frontmatter?: ListingFrontmatter;
};

type MapListing = {
  slug: string;
  frontmatter: ListingFrontmatter;
};

function getMapListings(listings: Listing[], frontmatter?: ListingFrontmatter): MapListing[] {
  if (frontmatter) {
    return frontmatter.coordinates ? [{ slug: "", frontmatter }] : [];
  }

  return listings
    .filter((listing) => listing.frontmatter.coordinates)
    .map((listing) => ({ slug: listing.slug, frontmatter: listing.frontmatter }));
}

export function MapEmbed({ listings, frontmatter }: MapEmbedProps) {
  const [popupListing, setPopupListing] = useState<MapListing | null>(null);

  const mapListings = useMemo(
    () => getMapListings(listings, frontmatter),
    [listings, frontmatter]
  );

  const viewState = useMemo(() => {
    const coordinates = mapListings
      .map((listing) => listing.frontmatter.coordinates)
      .filter(Boolean) as Array<{ lat: number; lng: number }>;

    if (coordinates.length === 0) {
      return null;
    }

    return {
      latitude: coordinates.reduce((sum, coordinate) => sum + coordinate.lat, 0) / coordinates.length,
      longitude: coordinates.reduce((sum, coordinate) => sum + coordinate.lng, 0) / coordinates.length,
      zoom: frontmatter ? 15 : 7,
    };
  }, [mapListings, frontmatter]);

  if (!viewState || mapListings.length === 0) {
    return (
      <div className="w-full h-full bg-[color:var(--color-bone-soft)] rounded-lg flex items-center justify-center">
        <p className="text-[color:var(--color-stone-dark)] text-sm">
          Sem coordenadas para exibir no mapa
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden border border-[color:var(--color-stone)]/30"
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Map
        initialViewState={viewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        scrollZoom={true}
        dragPan
        dragRotate={false}
        doubleClickZoom
        touchZoomRotate
        touchPitch={false}
        pitchWithRotate={false}
        keyboard={false}
        bearing={0}
        minPitch={0}
        maxPitch={0}
        minZoom={4}
        maxZoom={18}
      >
        <NavigationControl position="top-right" showCompass={false} />

        {mapListings.map((listing) => {
          const coordinates = listing.frontmatter.coordinates;
          if (!coordinates) return null;

          return (
            <Marker
              key={`${listing.slug}-${listing.frontmatter.title}`}
              longitude={coordinates.lng}
              latitude={coordinates.lat}
              anchor="center"
              onClick={(event) => {
                event.originalEvent.stopPropagation();
                setPopupListing(listing);
              }}
            >
              <button
                type="button"
                aria-label={`Ver ${listing.frontmatter.title} no mapa`}
                className="h-9 w-9 rounded-full border-[3px] border-[color:var(--color-navy)] bg-[color:var(--color-gold)] shadow-lg transition-transform hover:scale-110"
              />
            </Marker>
          );
        })}

        {popupListing?.frontmatter.coordinates && (
          <Popup
            longitude={popupListing.frontmatter.coordinates.lng}
            latitude={popupListing.frontmatter.coordinates.lat}
            anchor="top"
            closeOnClick={false}
            maxWidth="280px"
            onClose={() => setPopupListing(null)}
          >
            <div className="font-sans overflow-hidden">
              {/* Hero Image */}
              {popupListing.frontmatter.hero && (
                <div className="relative w-full h-32 bg-[color:var(--color-bone-soft)]">
                  <Image
                    src={popupListing.frontmatter.hero}
                    alt={popupListing.frontmatter.title}
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-3">
                <h3 className="font-semibold text-sm text-[color:var(--color-navy)] mb-1 line-clamp-2">
                  {popupListing.frontmatter.title}
                </h3>
                <p className="text-xs text-[color:var(--color-stone-dark)] mb-2">
                  {popupListing.frontmatter.location}
                </p>
                {popupListing.frontmatter.price && (
                  <p className="text-sm font-semibold text-[color:var(--color-gold)] mb-3">
                    {popupListing.frontmatter.price}
                  </p>
                )}

                {/* Ver mais button */}
                {popupListing.slug && (
                  <Link
                    href={`/imobiliario/${popupListing.frontmatter.category}/${popupListing.slug}`}
                    className="block w-full bg-[color:var(--color-navy)] text-white text-center text-sm font-medium py-2 rounded hover:bg-[color:var(--color-navy-deep)] transition-colors"
                  >
                    Ver mais
                  </Link>
                )}
              </div>
            </div>
          </Popup>
        )}
      </Map>

      <style jsx global>{`
        .maplibregl-popup-content {
          padding: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }

        .maplibregl-popup-close-button {
          color: white;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          width: 24px;
          height: 24px;
          font-size: 16px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 8px;
          right: 8px;
          transition: background 0.2s;
        }

        .maplibregl-popup-close-button:hover {
          background: rgba(0, 0, 0, 0.7);
        }

        .maplibregl-popup-tip {
          border-top-color: white;
        }
      `}</style>
    </div>
  );
}
