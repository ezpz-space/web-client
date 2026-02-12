'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useEstimateStore } from '@/hooks/useEstimateStore';
import { Spinner } from '@/components/ui';

export default function LoadingPage() {
  const router = useRouter();
  const store = useEstimateStore();

  useEffect(() => {
    const submitEstimate = async () => {
      try {
        const response = await fetch('/api/estimates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: store.name || undefined,
            phone: store.phone || undefined,
            address: store.address,
            windows: store.windows,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          store.setResult(
            data.estimateId,
            data.totalPrice,
            data.windowSummary,
            data.brands,
          );
        }
      } catch {
        // Fallback: navigate to result with mock data
      }

      // Navigate to result after a brief delay for UX
      setTimeout(() => {
        router.replace('/estimate/result');
      }, 1500);
    };

    submitEstimate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center px-4">
      <div className="text-center space-y-4">
        <Spinner />
        <h1 className="text-2xl font-bold text-gray-900">최종 견적을 준비하고 있어요</h1>
        <p className="text-base text-gray-400">창 정보와 조건을 하나씩 확인 중이에요</p>
      </div>
    </div>
  );
}
