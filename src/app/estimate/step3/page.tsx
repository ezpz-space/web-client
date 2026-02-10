'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepLayout } from '@/components/estimate';
import { useEstimateStore } from '@/hooks/useEstimateStore';
import { saveEstimateDraft, loadEstimateDraft } from '@/lib/storage';
import { cn } from '@/lib/utils';
import type { WindowType } from '@/types';

const WINDOW_OPTIONS: { value: WindowType; label: string; description: string }[] = [
  {
    value: 'expanded',
    label: '확장 발코니',
    description: '발코니를 실내 공간으로 확장한 구조',
  },
  {
    value: 'non-expanded',
    label: '비확장 발코니',
    description: '기존 발코니 구조를 유지한 상태',
  },
];

export default function Step3Page() {
  const router = useRouter();
  const store = useEstimateStore();

  const [windowType, setWindowType] = useState<WindowType | null>(
    store.windowType,
  );

  const handleNext = () => {
    store.setStep3(windowType);
    const draft = loadEstimateDraft();
    saveEstimateDraft({
      lastStep: 3,
      createdAt: draft?.createdAt || new Date().toISOString(),
      data: { ...draft?.data, windowType },
    });
    router.push('/estimate/step4');
  };

  const handleSkip = () => {
    store.setStep3(null);
    const draft = loadEstimateDraft();
    saveEstimateDraft({
      lastStep: 3,
      createdAt: draft?.createdAt || new Date().toISOString(),
      data: { ...draft?.data, windowType: null },
    });
    router.push('/estimate/step4');
  };

  return (
    <StepLayout
      step={3}
      title="창 유형 선택"
      onNext={handleNext}
      nextDisabled={!windowType}
      backHref="/estimate/step2"
      showSkip
      onSkip={handleSkip}
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          발코니 확장 여부를 선택해주세요.
          <span className="ml-1 inline-block relative group">
            <svg className="inline h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <span className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-60 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg z-10">
              확장 발코니는 발코니 공간을 실내로 편입한 구조입니다. 창호 규격과 가격에 영향을 줍니다.
            </span>
          </span>
        </p>

        <div className="grid gap-3">
          {WINDOW_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setWindowType(option.value)}
              className={cn(
                'flex flex-col items-start gap-1 rounded-xl border-2 px-5 py-4 text-left transition-all cursor-pointer',
                windowType === option.value
                  ? 'border-primary bg-primary-light'
                  : 'border-gray-200 hover:border-gray-300',
              )}
            >
              <span className={cn(
                'text-base font-semibold',
                windowType === option.value ? 'text-primary' : 'text-gray-900',
              )}>
                {option.label}
              </span>
              <span className="text-sm text-gray-500">{option.description}</span>
            </button>
          ))}
        </div>
      </div>
    </StepLayout>
  );
}
