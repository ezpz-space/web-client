'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WindowStepLayout } from '@/components/estimate/WindowStepLayout';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { useEstimateStore } from '@/hooks/useEstimateStore';
import { cn } from '@/lib/utils';
import type { WindowType } from '@/types';

type TopLevelType = 'standard' | 'balcony';

export default function WindowTypePage() {
  const router = useRouter();
  const store = useEstimateStore();
  const windowNumber = store.currentWindowIndex + 1;

  const saved = store.editingWindow.windowType;
  const initialTopLevel: TopLevelType | null =
    saved === 'standard' ? 'standard'
    : saved === 'expanded' || saved === 'non-expanded' ? 'balcony'
    : null;
  const initialSubType =
    saved === 'expanded' || saved === 'non-expanded' ? saved : null;

  const [topLevel, setTopLevel] = useState<TopLevelType | null>(initialTopLevel);
  const [subType, setSubType] = useState<'expanded' | 'non-expanded' | null>(initialSubType);
  const [showHelp, setShowHelp] = useState(false);
  const [subError, setSubError] = useState(false);

  const resolvedWindowType: WindowType | null =
    topLevel === 'standard' ? 'standard'
    : topLevel === 'balcony' && subType ? subType
    : null;

  const handleNext = () => {
    if (topLevel === 'balcony' && !subType) {
      setSubError(true);
      return;
    }
    if (!resolvedWindowType) return;
    store.setWindowType(resolvedWindowType);
    router.push('/estimate/window/width');
  };

  return (
    <>
      <WindowStepLayout
        windowNumber={windowNumber}
        step="1/3"
        title="창 유형이 무엇인가요?"
        helpLink={{ label: '일반 창과 발코니 창의 차이', onClick: () => setShowHelp(true) }}
        onNext={handleNext}
        nextDisabled={resolvedWindowType === null}
        backHref="/estimate/step2"
      >
        <div className="space-y-4" role="radiogroup" aria-label="창 유형 선택">
          {/* 일반 창 */}
          <button
            type="button"
            role="radio"
            aria-checked={topLevel === 'standard'}
            onClick={() => { setTopLevel('standard'); setSubType(null); setSubError(false); }}
            className={cn(
              'w-full flex flex-col items-start gap-1 rounded-xl border-2 px-5 py-4 text-left transition-all cursor-pointer',
              topLevel === 'standard'
                ? 'border-primary bg-primary-light'
                : 'border-gray-200 hover:border-gray-300',
            )}
          >
            <span className={cn('text-lg font-semibold', topLevel === 'standard' ? 'text-primary' : 'text-gray-900')}>
              일반 창
            </span>
          </button>

          {/* 발코니 창 */}
          <button
            type="button"
            role="radio"
            aria-checked={topLevel === 'balcony'}
            onClick={() => { setTopLevel('balcony'); setSubError(false); }}
            className={cn(
              'w-full flex flex-col items-start gap-1 rounded-xl border-2 px-5 py-4 text-left transition-all cursor-pointer',
              topLevel === 'balcony'
                ? 'border-primary bg-primary-light'
                : 'border-gray-200 hover:border-gray-300',
            )}
          >
            <span className={cn('text-lg font-semibold', topLevel === 'balcony' ? 'text-primary' : 'text-gray-900')}>
              발코니 창
            </span>
          </button>

          {/* 확장/비확장 sub-selection */}
          {topLevel === 'balcony' && (
            <div className="space-y-2 pl-2">
              <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="발코니 유형">
                <button
                  type="button"
                  role="radio"
                  aria-checked={subType === 'non-expanded'}
                  onClick={() => { setSubType('non-expanded'); setSubError(false); }}
                  className={cn(
                    'rounded-xl border-2 px-4 py-3 text-center transition-all cursor-pointer',
                    subType === 'non-expanded'
                      ? 'border-primary bg-primary-light text-primary font-semibold'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300',
                  )}
                >
                  비확장
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={subType === 'expanded'}
                  onClick={() => { setSubType('expanded'); setSubError(false); }}
                  className={cn(
                    'rounded-xl border-2 px-4 py-3 text-center transition-all cursor-pointer',
                    subType === 'expanded'
                      ? 'border-primary bg-primary-light text-primary font-semibold'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300',
                  )}
                >
                  확장
                </button>
              </div>
              {subError && (
                <p className="text-[13px] text-error" role="alert">
                  확장 여부가 선택되지 않았습니다.
                </p>
              )}
            </div>
          )}
        </div>
      </WindowStepLayout>

      {/* Help Bottom Sheet */}
      <BottomSheet open={showHelp} onClose={() => setShowHelp(false)}>
        <div className="max-h-[70vh] overflow-y-auto space-y-6 pb-4">
          <h3 className="text-2xl font-bold text-gray-900">일반 창과 발코니 창의 차이</h3>
          <p className="text-[15px] text-gray-400">
            창을 열었을 때 외부 공기가 바로 들어오면 발코니 창, 아니면 일반 창이에요.
          </p>

          <div className="space-y-2">
            <h4 className="text-xl font-semibold text-gray-900">일반 창</h4>
            <p className="text-lg font-semibold text-gray-700">실내 공간과 실내 공간 사이</p>
            <p className="text-base text-gray-400">
              창을 열어도 바로 바깥 공기가 들어오지 않는 창이에요. 창 너머가 또 다른 실내 공간이라면 일반 창에 해당해요.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xl font-semibold text-gray-900">발코니 창</h4>
            <p className="text-lg font-semibold text-gray-700">실내 공간과 외부 공간 사이</p>
            <p className="text-base text-gray-400">
              창을 열면 바로 바깥 공기가 느껴지는 창이에요. 외부 공간과 연결된 창이라면 발코니 창이에요.
            </p>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
