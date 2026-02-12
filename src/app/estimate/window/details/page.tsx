'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEstimateStore } from '@/hooks/useEstimateStore';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { GlassType, WindowConfig } from '@/types';

const GLASS_OPTIONS: { value: GlassType; label: string }[] = [
  { value: 'clear', label: '투명' },
  { value: 'lowe', label: '로이' },
  { value: 'super-double-lowe', label: '슈퍼 더블로이' },
];

const CONFIG_OPTIONS: { value: WindowConfig; label: string }[] = [
  { value: 'fix', label: '픽스' },
  { value: '2w', label: '2W' },
  { value: '3w', label: '3W' },
];

export default function WindowDetailsPage() {
  const router = useRouter();
  const store = useEstimateStore();
  const windowNumber = store.currentWindowIndex + 1;

  const [glassType, setGlassType] = useState<GlassType | undefined>(store.editingWindow.glassType);
  const [windowConfig, setWindowConfig] = useState<WindowConfig | undefined>(store.editingWindow.windowConfig);
  const [showHelp, setShowHelp] = useState(false);
  const [helpTab, setHelpTab] = useState<'glass' | 'config'>('glass');

  const handleAdd = () => {
    store.setWindowDetails(glassType, windowConfig);
    store.saveCurrentWindow();
    router.push('/estimate/windows');
  };

  return (
    <>
      <div className="flex min-h-[calc(100vh-56px)] flex-col">
        {/* Nav header */}
        <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
            aria-label="뒤로가기"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">창 {windowNumber}</h1>
        </div>

        <div className="flex-1 px-4 py-6">
          <h2 className="text-2xl font-bold text-gray-900">(선택) 상세 정보를 입력해주세요.</h2>
          <p className="text-base text-gray-400 mt-1 mb-2">더 정확한 견적이 필요하다면</p>
          <button
            type="button"
            onClick={() => setShowHelp(true)}
            className="text-base font-medium text-primary underline mb-6 cursor-pointer"
          >
            유리와 창 구성 안내
          </button>

          <div className="space-y-6 mt-6">
            {/* Glass type */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">유리 유형</label>
              <div className="flex gap-2" role="radiogroup" aria-label="유리 유형">
                {GLASS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={glassType === opt.value}
                    onClick={() => setGlassType(opt.value)}
                    className={cn(
                      'flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors cursor-pointer',
                      glassType === opt.value
                        ? 'bg-primary text-white'
                        : 'border border-gray-200 text-gray-600 hover:border-gray-300',
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Window config */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">창 구성</label>
              <div className="flex gap-2" role="radiogroup" aria-label="창 구성">
                {CONFIG_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={windowConfig === opt.value}
                    onClick={() => setWindowConfig(opt.value)}
                    className={cn(
                      'flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors cursor-pointer',
                      windowConfig === opt.value
                        ? 'bg-primary text-white'
                        : 'border border-gray-200 text-gray-600 hover:border-gray-300',
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="sticky bottom-0 border-t border-gray-100 bg-white px-4 py-4">
          <Button fullWidth size="lg" onClick={handleAdd}>
            추가하기
          </Button>
        </div>
      </div>

      {/* Help Bottom Sheet */}
      <BottomSheet open={showHelp} onClose={() => setShowHelp(false)}>
        <div className="max-h-[70vh] overflow-y-auto pb-4">
          {/* Tabs */}
          <div className="flex gap-4 mb-4 border-b border-gray-100">
            <button
              type="button"
              onClick={() => setHelpTab('glass')}
              className={cn(
                'pb-2 text-base font-semibold cursor-pointer',
                helpTab === 'glass' ? 'text-primary border-b-2 border-primary' : 'text-gray-400',
              )}
            >
              유리 유형
            </button>
            <button
              type="button"
              onClick={() => setHelpTab('config')}
              className={cn(
                'pb-2 text-base font-semibold cursor-pointer',
                helpTab === 'config' ? 'text-primary border-b-2 border-primary' : 'text-gray-400',
              )}
            >
              창 구성
            </button>
          </div>

          {helpTab === 'glass' ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-semibold text-gray-900">투명 유리</h4>
                <p className="text-sm text-gray-400 mt-1">가장 기본적인 유리예요. 채광이 좋고, 가장 일반적으로 사용되는 유형이에요.</p>
              </div>
              <div>
                <h4 className="text-base font-semibold text-gray-900">로이 유리 (Low-E)</h4>
                <p className="text-sm text-gray-400 mt-1">유리 표면에 은(Ag) 코팅이 적용돼 실내 열 손실을 줄여주고 난방 효율을 높여줘요.</p>
              </div>
              <div>
                <h4 className="text-base font-semibold text-gray-900">슈퍼 더블 로이</h4>
                <p className="text-sm text-gray-400 mt-1">은(Ag) 코팅을 두 겹으로 적용한 사양이에요. 로이 유리보다 단열 성능이 더 강화된 옵션이에요.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-semibold text-gray-900">픽스</h4>
                <p className="text-sm text-gray-400 mt-1">열고 닫을 수 없는 고정형 창이에요.</p>
              </div>
              <div>
                <h4 className="text-base font-semibold text-gray-900">2W</h4>
                <p className="text-sm text-gray-400 mt-1">두 짝으로 구성된 미닫이 창입니다.</p>
              </div>
              <div>
                <h4 className="text-base font-semibold text-gray-900">3W</h4>
                <p className="text-sm text-gray-400 mt-1">세 짝으로 구성되어 개방 폭이 넓은 미닫이 창입니다.</p>
              </div>
            </div>
          )}
        </div>
      </BottomSheet>
    </>
  );
}
