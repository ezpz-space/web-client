'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui';
import { loadEstimateDraft, clearEstimateDraft } from '@/lib/storage';
import { useEstimateStore } from '@/hooks/useEstimateStore';

export default function EstimatePage() {
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  const loadFromDraft = useEstimateStore((s) => s.loadFromDraft);
  const reset = useEstimateStore((s) => s.reset);

  useEffect(() => {
    const draft = loadEstimateDraft();
    if (draft) {
      setHasDraft(true);
      setSheetOpen(true);
    } else {
      router.replace('/estimate/step1');
    }
  }, [router]);

  const handleLoadDraft = () => {
    const draft = loadEstimateDraft();
    if (draft) {
      loadFromDraft(draft.data as Parameters<typeof loadFromDraft>[0]);
      const nextStep = Math.min(draft.lastStep + 1, 5);
      setSheetOpen(false);
      router.push(`/estimate/step${nextStep}`);
    }
  };

  const handleNewEstimate = () => {
    clearEstimateDraft();
    reset();
    setSheetOpen(false);
    router.push('/estimate/step1');
  };

  if (!hasDraft) return null;

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <BottomSheet open={sheetOpen} onClose={handleNewEstimate}>
        <div className="space-y-4 px-2 pt-2">
          <p className="text-center text-lg font-bold text-gray-900">
            이전에 작성한 견적이 있습니다.
            <br />
            불러올까요?
          </p>
          <div className="space-y-3 pt-2">
            <Button fullWidth size="lg" onClick={handleLoadDraft}>
              이전 견적 불러오기
            </Button>
            <Button
              fullWidth
              size="lg"
              variant="secondary"
              onClick={handleNewEstimate}
            >
              새 견적 확인하기
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
