import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.cnrc.pt" },
      { protocol: "https", hostname: "cnrc.pt" },
      { protocol: "https", hostname: "picsum.photos" },
      // GNews API image sources
      { protocol: "https", hostname: "**.noticiasaominuto.com" },
      { protocol: "https", hostname: "**.publico.pt" },
      { protocol: "https", hostname: "**.sapo.pt" },
      { protocol: "https", hostname: "**.rtp.pt" },
      { protocol: "https", hostname: "**.tvi.pt" },
      { protocol: "https", hostname: "**.jn.pt" },
      { protocol: "https", hostname: "**.dn.pt" },
      { protocol: "https", hostname: "**.cmjornal.pt" },
      { protocol: "https", hostname: "**.record.pt" },
      { protocol: "https", hostname: "**.abola.pt" },
      { protocol: "https", hostname: "**.jornaldenegocios.pt" },
      { protocol: "https", hostname: "**.dinheirovivo.pt" },
      { protocol: "https", hostname: "**.observador.pt" },
      { protocol: "https", hostname: "**.expresso.pt" },
      { protocol: "https", hostname: "**.impresa.pt" },
      { protocol: "https", hostname: "**.sabado.pt" },
      { protocol: "https", hostname: "**.visao.pt" },
      { protocol: "https", hostname: "**.sol.sapo.pt" },
      { protocol: "https", hostname: "**.ionline.pt" },
      { protocol: "https", hostname: "**.sicnoticias.pt" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
