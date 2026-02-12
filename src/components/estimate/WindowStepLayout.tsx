'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

interface WindowStepLayoutProps {
  windowNumber: number;
  step: string;       // "1/3", "2/3", "3/3"
  title: string;
  subtitle?: string;
  helpLink?: { label: string; onClick: () => void };
  children: ReactNode;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  nextLoading?: boolean;
  backHref?: string;
}

export function WindowStepLayout({
  windowNumber,
  step,
  title,
  subtitle,
  helpLink,
  children,
  onNext,
  nextLabel = '계속하기',
  nextDisabled = false,
  nextLoading = false,
  backHref,
}: WindowStepLayoutProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col">
      {/* Nav header */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
        <button
          type="button"
          onClick={handleBack}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
          aria-label="뒤로가기"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">창 {windowNumber}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6">
        <p className="text-base text-gray-400 mb-2">{step}</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{title}</h2>
        {subtitle && (
          <p className="text-base text-gray-400 mb-4">{subtitle}</p>
        )}
        {helpLink && (
          <button
            type="button"
            onClick={helpLink.onClick}
            className="text-base font-medium text-primary underline mb-6 cursor-pointer"
          >
            {helpLink.label}
          </button>
        )}
        <div className="mt-6">{children}</div>
      </div>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 border-t border-gray-100 bg-white px-4 py-4">
        <Button
          fullWidth
          size="lg"
          disabled={nextDisabled}
          loading={nextLoading}
          onClick={onNext}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
}
