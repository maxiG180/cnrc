import { useMemo, useEffect, useState } from "react";
import Supercluster from "supercluster";
import type { BBox, GeoJsonProperties } from "geojson";
import type { ListingFrontmatter } from "@/lib/mdx";

type Listing = {
  slug: string;
  frontmatter: ListingFrontmatter;
  content: string;
};

type ClusterProperties = GeoJsonProperties & {
  cluster?: boolean;
  cluster_id?: number;
  point_count?: number;
  listing?: Listing;
};

export type ClusterFeature = {
  type: "Feature";
  id?: number;
  properties: ClusterProperties;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
};

export function useMapClusters(
  listings: Listing[],
  bounds: { west: number; south: number; east: number; north: number } | null,
  zoom: number
) {
  // Create Supercluster instance
  const supercluster = useMemo(() => {
    if (listings.length === 0) return null;

    const cluster = new Supercluster<ClusterProperties>({
      radius: 60, // Cluster radius in pixels
      maxZoom: 16, // Max zoom to cluster points on
      minZoom: 0,
      minPoints: 2, // Minimum points to form a cluster
    });

    // Convert listings to GeoJSON features
    const features: ClusterFeature[] = listings
      .filter((listing) => listing.frontmatter.coordinates)
      .map((listing) => ({
        type: "Feature" as const,
        properties: {
          cluster: false,
          listing,
          // Add listing data as individual properties for querying
          slug: listing.slug,
          title: listing.frontmatter.title,
          category: listing.frontmatter.category,
        },
        geometry: {
          type: "Point" as const,
          coordinates: [
            listing.frontmatter.coordinates!.lng,
            listing.frontmatter.coordinates!.lat,
          ],
        },
      }));

    cluster.load(features);
    return cluster;
  }, [listings]);

  // Compute clusters based on current bounds and zoom
  const clusters = useMemo(() => {
    if (!supercluster) return [];

    // If no bounds yet, get all points
    if (!bounds) {
      return supercluster.getClusters(
        [-180, -90, 180, 90],
        Math.floor(zoom)
      ) as ClusterFeature[];
    }

    const bbox: BBox = [bounds.west, bounds.south, bounds.east, bounds.north];
    return supercluster.getClusters(bbox, Math.floor(zoom)) as ClusterFeature[];
  }, [bounds, zoom, supercluster]);

  return { clusters, supercluster };
}
