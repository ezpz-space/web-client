'use client';

import { useState } from 'react';

interface ComingSoonCTAProps {
  variant: 'hero' | 'floating';
}

export function ComingSoonCTA({ variant }: ComingSoonCTAProps) {
  const [open, setOpen] = useState(false);

  if (variant === 'hero') {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-8 hidden lg:inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-gray-900 shadow-lg transition-colors hover:brightness-95 cursor-pointer"
        >
          견적 알아보기
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        {open && <ComingSoonModal onClose={() => setOpen(false)} />}
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 px-4 pb-6 pt-3 bg-gradient-to-t from-white via-white/95 to-transparent lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-semibold text-gray-900 shadow-lg transition-colors hover:brightness-95 cursor-pointer"
        >
          견적 알아보기
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      {open && <ComingSoonModal onClose={() => setOpen(false)} />}
    </>
  );
}

function ComingSoonModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative mx-4 w-full max-w-sm rounded-2xl bg-white px-6 py-8 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-2xl font-bold text-gray-900">Coming soon</p>
        <p className="mt-2 text-base text-gray-500">서비스 준비 중입니다.</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 rounded-full bg-primary px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark cursor-pointer"
        >
          확인
        </button>
      </div>
    </div>
  );
}
