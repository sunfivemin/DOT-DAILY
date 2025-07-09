import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /* config options here */
  // 성능 최적화 설정
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  // 이미지 최적화
  images: {
    formats: ["image/webp", "image/avif"],
  },
  // 압축 활성화
  compress: true,
};

export default withBundleAnalyzer(nextConfig);
