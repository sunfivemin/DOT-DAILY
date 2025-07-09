// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";

const pretendard = localFont({
  src: "../fonts/Pretendard/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const kkonghae = localFont({
  src: "../fonts/kkonghae.woff2",
  variable: "--font-kkonghae",
  display: "block", // 장식용 폰트는 block으로 설정하여 즉시 표시
  preload: false,
  fallback: ["cursive"],
});

export const metadata: Metadata = {
  title: "DOT.DAILY",
  description: "투두 + 회고 기록 앱",
  // 성능 최적화를 위한 DNS prefetch
  other: {
    "dns-prefetch": "//fonts.gstatic.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 폰트 preload 최적화 */}
        <link
          rel="preload"
          href="/fonts/Pretendard/PretendardVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${pretendard.variable} ${kkonghae.variable} font-sans`}>
        <Providers>
          <div className="w-full max-w-md mx-auto min-h-screen bg-surface-base shadow-lg">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
