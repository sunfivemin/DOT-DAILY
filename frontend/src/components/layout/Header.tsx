// src/components/layout/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-surface-base/80 backdrop-blur-sm z-10">
      <div className="flex items-center justify-between p-4 h-20 max-w-md mx-auto">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="dot_daily 로고"
            width={100}
            height={24}
            priority
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        <h1 className="text-lg font-bold text-text-strong">{title}</h1>
      </div>
    </header>
  );
}
