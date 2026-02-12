'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WindowStepLayout } from '@/components/estimate/WindowStepLayout';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { useEstimateStore } from '@/hooks/useEstimateStore';

export default function WindowWidthPage() {
  const router = useRouter();
  const store = useEstimateStore();
  const windowNumber = store.currentWindowIndex + 1;

  const [width, setWidth] = useState<string>(
    store.editingWindow.width ? String(store.editingWindow.width) : ''
  );
  const [showHelp, setShowHelp] = useState(false);

  const numWidth = parseInt(width, 10);
  const isValid = !isNaN(numWidth) && numWidth >= 100 && numWidth <= 10000;

  const handleNext = () => {
    if (!isValid) return;
    store.setWindowWidth(numWidth);
    router.push('/estimate/window/height');
  };

  return (
    <>
      <WindowStepLayout
        windowNumber={windowNumber}
        step="2/3"
        title="창문의 가로 길이를 측정해주세요."
        helpLink={{ label: '창문 길이 측정 방법', onClick: () => setShowHelp(true) }}
        onNext={handleNext}
        nextDisabled={!isValid}
        backHref="/estimate/window/type"
      >
        <div className="flex flex-col items-center justify-center py-8">
          <div className="flex items-baseline gap-3">
            <input
              type="number"
              inputMode="numeric"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="0"
              className="w-40 text-center text-[60px] font-bold text-gray-900 border-none outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              aria-label="가로 길이 (mm)"
            />
            <span className="text-2xl text-gray-400">mm</span>
          </div>
        </div>
      </WindowStepLayout>

      <MeasurementHelpSheet open={showHelp} onClose={() => setShowHelp(false)} />
    </>
  );
}

function MeasurementHelpSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="max-h-[70vh] overflow-y-auto space-y-6 pb-4">
        <h3 className="text-2xl font-bold text-gray-900">창문 길이 측정 방법</h3>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-gray-900">단위</h4>
          <p className="text-base text-gray-400">
            모든 치수는 mm 기준으로 입력해 주세요.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-gray-900">기준</h4>
          <p className="text-base text-gray-400">
            벽과 맞닿아 있는 창틀의 바깥쪽 기준으로 가로 세로 길이를 측정해주세요. (길이가 일정하지 않은 경우에는 가장 긴 값을 입력해 주세요.)
          </p>
        </div>
      </div>
    </BottomSheet>
  );
}
