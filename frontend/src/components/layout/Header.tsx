'use client';

import Image from 'next/image';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="w-full border-b border-gray-200 bg-white py-4">
      <div className="mx-auto flex max-w-screen-md items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="" width={96} height={24} priority />
          <h1 className="sr-only">dot.daily</h1>
        </div>
        <div className="text-sm text-brand-dark">{title}</div>
      </div>
    </header>
  );
}
