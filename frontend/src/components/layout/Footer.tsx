'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const tabs = [
  {
    key: 'myday',
    label: '나의 하루',
    icon: {
      on: '/nav-myday-on.svg',
      off: '/nav-myday.svg',
    },
    href: '/',
  },
  {
    key: 'retrospect',
    label: '오늘 회고',
    icon: {
      on: '/nav-retrospect-on.svg',
      off: '/nav-retrospect.svg',
    },
    href: '/retrospect',
  },
  {
    key: 'archive',
    label: '보류함',
    icon: {
      on: '/nav-archive-on.svg',
      off: '/nav-archive.svg',
    },
    href: '/archive',
  },
  {
    key: 'profile',
    label: '나의 정보',
    icon: {
      on: '/nav-user-on.svg',
      off: '/nav-user.svg',
    },
    href: '/profile',
  },
];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-white border-t border-border-default flex justify-around py-2 max-w-md mx-auto w-full">
      {tabs.map(tab => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.key}
            href={tab.href}
            className="flex flex-col items-center text-xs"
            aria-current={isActive ? 'page' : undefined}
          >
            <Image
              src={isActive ? tab.icon.on : tab.icon.off}
              alt={tab.label}
              width={24}
              height={24}
              priority
            />
            <span
              className={clsx(
                'mt-1',
                isActive ? 'text-nav-active' : 'text-nav-inactive'
              )}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </footer>
  );
}
