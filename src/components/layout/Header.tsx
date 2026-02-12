'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Drawer } from './Drawer';

const navItems = [
  { label: '내 견적 조회하기', href: '/estimate' },
  { label: '도움말', href: '/help' },
  { label: '고객센터', href: '/contact' },
];

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-8">
        <Link href="/" aria-label="ezpz 홈">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-ezpz.svg" alt="ezpz" className="h-7" />
        </Link>

        {/* Desktop nav — temporarily hidden
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        */}

        {/* Mobile hamburger — temporarily hidden
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer lg:hidden"
          aria-label="메뉴 열기"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        */}
      </header>

      {/* Drawer — temporarily hidden
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      */}
    </>
  );
}
