"use client";

import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Map, { Source, Layer, NavigationControl, Popup, MapRef } from "react-map-gl/maplibre";
import type { CircleLayer, SymbolLayer } from "react-map-gl/maplibre";
import { useTranslations } from "next-intl";
import type { ListingFrontmatter } from "@/lib/mdx";
import { useMapClusters, type ClusterFeature } from "./use-map-clusters";
import "maplibre-gl/dist/maplibre-gl.css";

type Listing = {
  slug: string;
  frontmatter: ListingFrontmatter;
  content: string;
};

type MapEmbedProps = {
  listings: Listing[];
  frontmatter?: ListingFrontmatter;
  onMarkerClick?: (slug: string) => void;
  onClusterClick?: (slugs: string[]) => void;
  onVisibleListingsChange?: (slugs: string[]) => void;
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

export function MapEmbed({ listings, frontmatter, onMarkerClick, onClusterClick, onVisibleListingsChange }: MapEmbedProps) {
  const tMap = useTranslations("imobiliario.map");
  const mapRef = useRef<MapRef>(null);
  const [popupListing, setPopupListing] = useState<Listing | null>(null);
  const [bounds, setBounds] = useState<{ west: number; south: number; east: number; north: number } | null>(null);
  const [zoom, setZoom] = useState(7);
  const [iconLoaded, setIconLoaded] = useState(false);
  // Only use clustering for multiple listings (not single property view)
  const useClustering = !frontmatter && listings.length > 1;

  // Get clusters using our custom hook (only when clustering)
  const { clusters, supercluster } = useMapClusters(
    useClustering ? listings : [],
    bounds,
    zoom
  );

  // Update supercluster ref
  const superclusterRef = useRef(supercluster);
  superclusterRef.current = supercluster;

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

  // Create custom marker icon
  const createMarkerIcon = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 48;
    canvas.height = 60;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Draw pin/teardrop shape
    ctx.fillStyle = "#d4af37"; // Gold color
    ctx.beginPath();
    ctx.arc(24, 20, 18, 0, Math.PI * 2);
    ctx.fill();

    // Draw pin point
    ctx.beginPath();
    ctx.moveTo(24, 38);
    ctx.lineTo(14, 48);
    ctx.lineTo(34, 48);
    ctx.closePath();
    ctx.fill();

    // Draw navy border
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(24, 20, 18, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(24, 38);
    ctx.lineTo(14, 48);
    ctx.lineTo(34, 48);
    ctx.closePath();
    ctx.stroke();

    // Draw house icon in white
    ctx.fillStyle = "#1a1a2e";
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 2;

    // House roof
    ctx.beginPath();
    ctx.moveTo(24, 12);
    ctx.lineTo(18, 18);
    ctx.lineTo(30, 18);
    ctx.closePath();
    ctx.fill();

    // House body
    ctx.fillRect(19, 18, 10, 8);

    // Door
    ctx.fillStyle = "#d4af37";
    ctx.fillRect(22, 21, 4, 5);

    return canvas;
  }, []);

  // Load marker icon when map is ready
  const handleMapLoad = useCallback(() => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();

    // Update bounds
    const mapBounds = map.getBounds();
    setBounds({
      west: mapBounds.getWest(),
      south: mapBounds.getSouth(),
      east: mapBounds.getEast(),
      north: mapBounds.getNorth(),
    });
    setZoom(map.getZoom());

    // Load marker icon
    try {
      if (map.hasImage("house-marker")) {
        setIconLoaded(true);
        return;
      }

      const canvas = createMarkerIcon();
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      map.addImage("house-marker", {
        width: canvas.width,
        height: canvas.height,
        data: imageData.data,
      });
      setIconLoaded(true);
    } catch (error) {
      console.error("Error loading marker icon:", error);
    }
  }, [createMarkerIcon]);

  // Handle map move to update bounds and zoom
  const handleMove = useCallback(() => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();
    const mapBounds = map.getBounds();
    setBounds({
      west: mapBounds.getWest(),
      south: mapBounds.getSouth(),
      east: mapBounds.getEast(),
      north: mapBounds.getNorth(),
    });
    setZoom(map.getZoom());

    // Update visible listings
    if (onVisibleListingsChange) {
      try {
        // Query all visible features in the current viewport
        const features = map.queryRenderedFeatures({ layers: ["unclustered-point", "clusters"] });

        // Extract slugs from visible features
        const visibleSlugs = new Set<string>();

        features.forEach((feature: any) => {
          if (feature.properties?.cluster && superclusterRef.current) {
            // If it's a cluster, get all listings in that cluster
            try {
              const leaves = superclusterRef.current.getLeaves(feature.properties.cluster_id, Infinity);
              leaves.forEach((leaf: any) => {
                if (leaf.properties?.slug) {
                  visibleSlugs.add(leaf.properties.slug);
                }
              });
            } catch (e) {
              // Cluster might not be available yet
            }
          } else if (feature.properties?.slug) {
            // Individual point
            visibleSlugs.add(feature.properties.slug);
          }
        });

        onVisibleListingsChange(Array.from(visibleSlugs));
      } catch (error) {
        // Layers might not be loaded yet
      }
    }
  }, [onVisibleListingsChange]);

  // Handle cluster click - get all listings in cluster
  const handleClusterClick = useCallback(
    (cluster: ClusterFeature) => {
      if (!mapRef.current || !supercluster || !cluster.properties.cluster_id) return;

      // Get all leaves (individual points) within this cluster
      const leaves = supercluster.getLeaves(cluster.properties.cluster_id, Infinity);

      // Extract slugs from the leaves
      const slugs = leaves
        .map((leaf: any) => leaf.properties?.slug)
        .filter((slug: string | undefined): slug is string => Boolean(slug));

      // Notify parent component with the slugs
      if (onClusterClick && slugs.length > 0) {
        onClusterClick(slugs);
      }

      // Also zoom in to show the cluster area
      const expansionZoom = supercluster.getClusterExpansionZoom(cluster.properties.cluster_id);
      mapRef.current.flyTo({
        center: cluster.geometry.coordinates as [number, number],
        zoom: expansionZoom,
        duration: 500,
      });
    },
    [supercluster, onClusterClick]
  );

  // Handle map click
  const handleMapClick = useCallback(
    (event: any) => {
      if (!mapRef.current) return;

      // Only query layers if they exist
      if (!useClustering) {
        // In non-clustering mode, just query the unclustered-point layer
        try {
          const map = mapRef.current.getMap();

          // Check if layer exists
          if (!map.getLayer("unclustered-point")) {
            return;
          }

          const features = mapRef.current.queryRenderedFeatures(event.point, {
            layers: ["unclustered-point"],
          });

          if (!features.length) {
            setPopupListing(null);
            return;
          }

          const feature = features[0];
          const clickedSlug = feature.properties?.slug;

          let listing = listings.find((l) => l.slug === clickedSlug);

          if (!listing && frontmatter) {
            listing = { slug: "", frontmatter, content: "" };
          }

          if (listing) {
            // Center map on clicked marker (no zoom change)
            if (listing.frontmatter.coordinates && mapRef.current) {
              try {
                mapRef.current.flyTo({
                  center: [listing.frontmatter.coordinates.lng, listing.frontmatter.coordinates.lat],
                  duration: 600,
                });
              } catch (error) {
                console.debug("Error centering map:", error);
              }
            }
            // Set popup after starting animation
            setPopupListing(listing);
            // Notify parent component
            if (onMarkerClick && listing.slug) {
              onMarkerClick(listing.slug);
            }
          }
        } catch (error) {
          console.debug("Map click error:", error);
        }
        return;
      }

      // Clustering mode - query both layers
      try {
        const map = mapRef.current.getMap();

        // Check if layers actually exist before querying
        const layersToQuery: string[] = [];
        if (map.getLayer("clusters")) {
          layersToQuery.push("clusters");
        }
        if (map.getLayer("unclustered-point")) {
          layersToQuery.push("unclustered-point");
        }

        if (layersToQuery.length === 0) {
          return;
        }

        const features = mapRef.current.queryRenderedFeatures(event.point, {
          layers: layersToQuery,
        });

        if (!features.length) {
          setPopupListing(null);
          return;
        }

        const feature = features[0];

        // Handle cluster click
        if (feature.properties?.cluster) {
          const clusterId = feature.properties.cluster_id;
          const clusterFeature = clusters.find(
            (c) => c.properties.cluster_id === clusterId
          );
          if (clusterFeature) {
            handleClusterClick(clusterFeature);
          }
          return;
        }

        // Handle individual point click
        const clickedSlug = feature.properties?.slug;
        const listing = listings.find((l) => l.slug === clickedSlug);

        if (listing) {
          // Center map on clicked marker (no zoom change)
          if (listing.frontmatter.coordinates && mapRef.current) {
            try {
              mapRef.current.flyTo({
                center: [listing.frontmatter.coordinates.lng, listing.frontmatter.coordinates.lat],
                duration: 600,
              });
            } catch (error) {
              console.debug("Error centering map:", error);
            }
          }
          // Set popup after starting animation
          setPopupListing(listing);
          // Notify parent component
          if (onMarkerClick && listing.slug) {
            onMarkerClick(listing.slug);
          }
        }
      } catch (error) {
        console.debug("Map click error:", error);
      }
    },
    [clusters, listings, frontmatter, useClustering, handleClusterClick, onMarkerClick]
  );

  if (!viewState || mapListings.length === 0) {
    return (
      <div className="w-full h-full bg-[color:var(--color-bone-soft)] rounded-lg flex items-center justify-center">
        <p className="text-[color:var(--color-stone-dark)] text-sm">{tMap("noCoordinates")}</p>
      </div>
    );
  }

  // Layer styles
  const clusterLayer: CircleLayer = {
    id: "clusters",
    type: "circle",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": "#1a1a2e",
      "circle-radius": ["step", ["get", "point_count"], 20, 10, 25, 50, 30],
      "circle-stroke-width": 2,
      "circle-stroke-color": "#fff",
    },
  };

  const clusterCountLayer: SymbolLayer = {
    id: "cluster-count",
    type: "symbol",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-size": 14,
    },
    paint: {
      "text-color": "#ffffff",
    },
  };

  const unclusteredPointLayer: SymbolLayer = {
    id: "unclustered-point",
    type: "symbol",
    filter: ["!", ["has", "point_count"]],
    layout: {
      "icon-image": "house-marker",
      "icon-size": 0.8,
      "icon-anchor": "bottom",
      "icon-allow-overlap": true,
    },
  };

  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden border border-[color:var(--color-stone)]/30"
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Map
        ref={mapRef}
        initialViewState={viewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        attributionControl={false}
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
        onMove={handleMove}
        onLoad={handleMapLoad}
        onClick={handleMapClick}
      >
        <NavigationControl position="top-right" showCompass={false} />

        {iconLoaded && (
          <>
            {useClustering ? (
              <Source
                id="listings"
                type="geojson"
                data={{
                  type: "FeatureCollection",
                  features: clusters,
                }}
              >
                <Layer {...clusterLayer} />
                <Layer {...clusterCountLayer} />
                <Layer {...unclusteredPointLayer} />
              </Source>
            ) : (
              <Source
                id="listings"
                type="geojson"
                data={{
                  type: "FeatureCollection",
                  features: mapListings
                    .filter((listing) => listing.frontmatter.coordinates)
                    .map((listing) => ({
                      type: "Feature" as const,
                      properties: {
                        slug: listing.slug,
                        title: listing.frontmatter.title,
                      },
                      geometry: {
                        type: "Point" as const,
                        coordinates: [
                          listing.frontmatter.coordinates!.lng,
                          listing.frontmatter.coordinates!.lat,
                        ],
                      },
                    })),
                }}
              >
                <Layer {...unclusteredPointLayer} />
              </Source>
            )}
          </>
        )}

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
                    {tMap("viewMore")}
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
