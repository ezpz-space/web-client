'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { clearEstimateDraft } from '@/lib/storage';
import { useEstimateStore } from '@/hooks/useEstimateStore';

export default function CompletePage() {
  const router = useRouter();
  const store = useEstimateStore();

  useEffect(() => {
    // Clear draft on completion
    clearEstimateDraft();

    // Prevent back navigation to consultation form
    window.history.replaceState(null, '', '/estimate/complete');
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm text-center space-y-6">
        {/* Success icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success-light">
          <svg className="h-10 w-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        {/* Message */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">상담 요청이 완료됐어요.</h1>
          <p className="mt-3 text-base text-gray-500 leading-relaxed">
            전문가가 내용을 확인한 뒤<br />
            순차적으로 연락드릴 거에요.<br />
            조금만 기다려주세요!
          </p>
        </div>

        {/* Summary card */}
        <div className="rounded-lg border border-gray-200 px-4 py-4 text-left space-y-2 text-sm">
          <h2 className="font-semibold text-gray-700 mb-2">상담 신청 내역</h2>
          <div className="flex justify-between">
            <span className="text-gray-500">이름</span>
            <span className="text-gray-900">{store.name || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">연락처</span>
            <span className="text-gray-900">{store.phone || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">주소</span>
            <span className="text-gray-900 text-right max-w-[200px]">{store.address?.address || '-'}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-2 pt-2">
          <Button fullWidth size="lg" onClick={() => router.push('/')}>
            홈으로 돌아가기
          </Button>
          <button
            type="button"
            onClick={() => {
              store.reset();
              router.push('/estimate/step1');
            }}
            className="w-full py-2 text-center text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            새로운 견적 알아보기
          </button>
        </div>
      </div>
    </div>
  );
}
