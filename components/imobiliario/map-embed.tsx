"use client";

import { useEffect, useRef } from "react";
import type { ListingFrontmatter } from "@/lib/mdx";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Listing = {
  slug: string;
  frontmatter: ListingFrontmatter;
  content: string;
};

type MapEmbedProps = {
  listings: Listing[];
  frontmatter?: ListingFrontmatter; // For single property pages
};

export function MapEmbed({ listings, frontmatter }: MapEmbedProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapIdRef = useRef(`map-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    // Determine what to show
    const listingsToShow = frontmatter
      ? [{ slug: "", frontmatter, content: "" }]
      : listings.filter((l) => l.frontmatter.coordinates);

    if (listingsToShow.length === 0) return;

    // Calculate center point
    const validCoords = listingsToShow
      .map((l) => l.frontmatter.coordinates)
      .filter(Boolean) as Array<{ lat: number; lng: number }>;

    if (validCoords.length === 0) return;

    const centerLat = validCoords.reduce((sum, c) => sum + c.lat, 0) / validCoords.length;
    const centerLng = validCoords.reduce((sum, c) => sum + c.lng, 0) / validCoords.length;

    // Initialize map
    const map = L.map(mapIdRef.current, {
      center: [centerLat, centerLng],
      zoom: frontmatter ? 15 : 7, // Closer zoom for single property
      scrollWheelZoom: false,
      attributionControl: false,
    });

    mapRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Custom marker icon
    const createCustomIcon = (isActive = false) =>
      L.divIcon({
        className: "custom-marker",
        html: `
        <div style="
          width: 36px;
          height: 36px;
          background-color: ${isActive ? "var(--color-navy)" : "var(--color-gold)"};
          border: 3px solid var(--color-navy);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          font-size: 10px;
          font-weight: bold;
          color: white;
        ">
        </div>
      `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18],
      });

    // Add markers
    listingsToShow.forEach((listing) => {
      if (!listing.frontmatter.coordinates) return;

      const { lat, lng } = listing.frontmatter.coordinates;

      L.marker([lat, lng], { icon: createCustomIcon() })
        .addTo(map)
        .bindPopup(
          `
        <div style="font-family: var(--font-inter); padding: 8px; min-width: 200px;">
          <strong style="color: var(--color-navy); font-size: 14px; display: block; margin-bottom: 4px;">
            ${listing.frontmatter.title}
          </strong>
          <span style="color: var(--color-stone-dark); font-size: 12px; display: block; margin-bottom: 6px;">
            ${listing.frontmatter.location}
          </span>
          ${
            listing.frontmatter.price
              ? `<span style="color: var(--color-gold); font-size: 13px; font-weight: 600;">
              ${listing.frontmatter.price}
            </span>`
              : ""
          }
        </div>
      `,
          {
            maxWidth: 250,
            closeButton: true,
          }
        );
    });

    // Fit bounds if multiple listings
    if (validCoords.length > 1) {
      const bounds = L.latLngBounds(validCoords.map((c) => [c.lat, c.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    // Cleanup on unmount
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [listings, frontmatter]);

  const listingsToShow = frontmatter
    ? [{ slug: "", frontmatter, content: "" }]
    : listings.filter((l) => l.frontmatter.coordinates);

  if (listingsToShow.length === 0) {
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
      id={mapIdRef.current}
      className="w-full h-full rounded-lg overflow-hidden border border-[color:var(--color-stone)]/30 relative"
      style={{ zIndex: 1 }}
    />
  );
}
