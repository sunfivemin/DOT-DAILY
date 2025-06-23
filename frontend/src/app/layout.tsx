// src/app/layout.tsx
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Providers from './providers';

const pretendard = localFont({
  src: '../fonts/Pretendard/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

const kkonghae = localFont({
  src: '../fonts/kkonghae.woff2',
  variable: '--font-kkonghae',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DOT.DAILY',
  description: '투두 + 회고 기록 앱',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
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
