'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressIndicator } from './ProgressIndicator';
import { Button } from '@/components/ui';

interface StepLayoutProps {
  step: number;
  title: string;
  children: ReactNode;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  nextLoading?: boolean;
  showSkip?: boolean;
  onSkip?: () => void;
  backHref?: string;
}

export function StepLayout({
  step,
  title,
  children,
  onNext,
  nextLabel = '다음',
  nextDisabled = false,
  nextLoading = false,
  showSkip = false,
  onSkip,
  backHref,
}: StepLayoutProps) {
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
      {/* Step Header */}
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
        <h1 className="text-lg font-bold text-gray-900">{title}</h1>
      </div>

      {/* Progress */}
      <div className="px-4">
        <ProgressIndicator currentStep={step} />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6">{children}</div>

      {/* Bottom buttons */}
      <div className="sticky bottom-0 border-t border-gray-100 bg-white px-4 py-4 space-y-2">
        {showSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="w-full py-2 text-center text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            건너뛰기
          </button>
        )}
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
