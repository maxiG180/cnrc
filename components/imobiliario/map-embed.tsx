"use client";

import { useMemo, useState } from "react";
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
    <div className="w-full h-full rounded-lg overflow-hidden border border-[color:var(--color-stone)]/30">
      <Map
        initialViewState={viewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        scrollZoom={false}
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
            maxWidth="250px"
            onClose={() => setPopupListing(null)}
          >
            <div className="p-2 font-sans">
              <strong className="mb-1 block text-sm text-[color:var(--color-navy)]">
                {popupListing.frontmatter.title}
              </strong>
              <span className="mb-1.5 block text-xs text-[color:var(--color-stone-dark)]">
                {popupListing.frontmatter.location}
              </span>
              {popupListing.frontmatter.price && (
                <span className="text-sm font-semibold text-[color:var(--color-gold)]">
                  {popupListing.frontmatter.price}
                </span>
              )}
            </div>
          </Popup>
        )}
      </Map>

      <style jsx global>{`
        .maplibregl-popup-content {
          padding: 0;
          background: var(--color-bone);
          border-radius: 8px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
        }

        .maplibregl-popup-close-button {
          color: var(--color-navy);
          font-size: 18px;
          padding: 4px 8px;
        }

        .maplibregl-popup-tip {
          border-top-color: var(--color-bone);
        }
      `}</style>
    </div>
  );
}
