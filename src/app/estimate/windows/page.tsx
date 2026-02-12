'use client';

import { useRouter } from 'next/navigation';
import { useEstimateStore } from '@/hooks/useEstimateStore';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

const GLASS_LABELS: Record<string, string> = {
  clear: '투명',
  lowe: '로이',
  'super-double-lowe': '슈퍼 더블로이',
};

const CONFIG_LABELS: Record<string, string> = {
  fix: '픽스',
  '2w': '2W',
  '3w': '3W',
};

const TYPE_LABELS: Record<string, string> = {
  standard: '일반 창',
  expanded: '발코니 창 (확장)',
  'non-expanded': '발코니 창 (비확장)',
};

export default function WindowsListPage() {
  const router = useRouter();
  const store = useEstimateStore();

  const totalWindows = store.windows.reduce((sum, w) => sum + w.quantity, 0);

  const handleAddWindow = () => {
    store.startNewWindow();
    router.push('/estimate/window/type');
  };

  const handleEditWindow = (index: number) => {
    store.editWindow(index);
    router.push('/estimate/window/type');
  };

  const handleSubmit = () => {
    router.push('/estimate/loading');
  };

  const getWindowSummary = (w: typeof store.windows[0]) => {
    const parts = [TYPE_LABELS[w.windowType] || w.windowType];
    parts.push(`${w.width}×${w.height}`);
    if (w.glassType) parts.push(GLASS_LABELS[w.glassType] || w.glassType);
    if (w.windowConfig) parts.push(CONFIG_LABELS[w.windowConfig] || w.windowConfig);
    return parts.join(', ');
  };

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
        <button
          type="button"
          onClick={() => router.push('/estimate/step2')}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
          aria-label="뒤로가기"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">견적 알아보기</h1>
      </div>

      <div className="flex-1 px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">창 정보를 알려주세요</h2>

        {/* Window cards */}
        <div className="space-y-3">
          {store.windows.map((w, i) => (
            <button
              key={w.id}
              type="button"
              onClick={() => handleEditWindow(i)}
              className="w-full rounded-xl border border-gray-200 px-4 py-4 text-left hover:border-gray-300 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-base font-bold text-gray-900">창 {i + 1}</span>
                <span className="text-sm font-semibold text-gray-500">
                  {w.quantity > 1 ? `${w.quantity}개` : ''}
                </span>
              </div>
              <p className="text-[13px] font-medium text-gray-500">{getWindowSummary(w)}</p>
            </button>
          ))}

          {/* Empty state / add button */}
          {store.windows.length === 0 ? (
            <button
              type="button"
              onClick={handleAddWindow}
              className="w-full rounded-xl border-2 border-dashed border-gray-300 px-4 py-6 text-center hover:border-primary transition-colors cursor-pointer"
            >
              <p className="text-base font-bold text-gray-700 mb-1">창 1</p>
              <p className="text-sm font-semibold text-primary">정보 입력하기</p>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAddWindow}
              className="w-full rounded-xl border border-dashed border-gray-300 px-4 py-3 text-center text-sm text-gray-400 hover:border-primary hover:text-primary transition-colors cursor-pointer"
            >
              추가하기
            </button>
          )}
        </div>

        {/* Total count */}
        {totalWindows > 0 && (
          <p className="text-sm font-semibold text-gray-600 mt-4">총 {totalWindows}개</p>
        )}

        {/* Disclaimer */}
        <p className="text-sm text-gray-400 mt-6">
          입력한 정보로 계산된 예상 금액이며, 실제 시공가는 현장 조건에 따라 달라질 수 있습니다.
        </p>
      </div>

      {/* Bottom CTAs */}
      <div className="sticky bottom-0 border-t border-gray-100 bg-white px-4 py-4 space-y-2">
        <Button
          fullWidth
          size="lg"
          disabled={store.windows.length === 0}
          onClick={handleSubmit}
        >
          최종 견적 확인하기
        </Button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="w-full py-2 text-center text-base font-semibold text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
