'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepLayout } from '@/components/estimate';
import { useEstimateStore } from '@/hooks/useEstimateStore';
import { saveEstimateDraft, loadEstimateDraft } from '@/lib/storage';
import { cn } from '@/lib/utils';

export default function Step5Page() {
  const router = useRouter();
  const store = useEstimateStore();

  const [quantity, setQuantity] = useState<number>(store.quantity ?? 1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(99, prev + 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setQuantity(1);
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setQuantity(Math.max(1, Math.min(99, num)));
    }
  };

  const handleNext = async () => {
    setIsSubmitting(true);
    store.setStep5(quantity);
    const draft = loadEstimateDraft();
    saveEstimateDraft({
      lastStep: 5,
      createdAt: draft?.createdAt || new Date().toISOString(),
      data: { ...draft?.data, quantity },
    });

    try {
      const response = await fetch('/api/estimates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: store.name,
          phone: store.phone,
          address: store.address,
          windowType: store.windowType,
          dimensions: store.dimensions,
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error('견적 요청에 실패했습니다');
      }

      const data = await response.json();
      store.setResult(data.estimateId, data.results);
      router.push('/estimate/result');
    } catch {
      // API가 아직 없으면 mock 결과로 이동
      router.push('/estimate/result');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    store.setStep5(null);
    const draft = loadEstimateDraft();
    saveEstimateDraft({
      lastStep: 5,
      createdAt: draft?.createdAt || new Date().toISOString(),
      data: { ...draft?.data, quantity: null },
    });

    try {
      const response = await fetch('/api/estimates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: store.name,
          phone: store.phone,
          address: store.address,
          windowType: store.windowType,
          dimensions: store.dimensions,
          quantity: null,
        }),
      });

      if (!response.ok) throw new Error('Failed');

      const data = await response.json();
      store.setResult(data.estimateId, data.results);
      router.push('/estimate/result');
    } catch {
      router.push('/estimate/result');
    }
  };

  return (
    <StepLayout
      step={5}
      title="수량 입력"
      onNext={handleNext}
      nextLabel="견적 확인하기"
      nextLoading={isSubmitting}
      backHref="/estimate/step4"
      showSkip
      onSkip={handleSkip}
    >
      <div className="space-y-6">
        <p className="text-sm text-gray-500">
          교체할 창호의 수량을 입력해주세요.
        </p>

        {/* Stepper */}
        <div className="flex flex-col items-center gap-4">
          <label className="text-sm font-medium text-gray-700">창호 수량</label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full border-2 text-xl font-bold transition-colors cursor-pointer',
                quantity <= 1
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:border-primary hover:text-primary',
              )}
              aria-label="수량 감소"
            >
              −
            </button>

            <input
              type="number"
              value={quantity}
              onChange={handleInputChange}
              min={1}
              max={99}
              className="h-14 w-20 rounded-lg border border-gray-300 text-center text-2xl font-bold text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="수량"
            />

            <button
              type="button"
              onClick={handleIncrement}
              disabled={quantity >= 99}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full border-2 text-xl font-bold transition-colors cursor-pointer',
                quantity >= 99
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:border-primary hover:text-primary',
              )}
              aria-label="수량 증가"
            >
              +
            </button>
          </div>
          <span className="text-xs text-gray-400">1~99개</span>
        </div>
      </div>
    </StepLayout>
  );
}
