'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepLayout } from '@/components/estimate';
import { Input } from '@/components/ui';
import { useEstimateStore } from '@/hooks/useEstimateStore';
import { saveEstimateDraft, loadEstimateDraft } from '@/lib/storage';
import type { Dimensions } from '@/types';

export default function Step4Page() {
  const router = useRouter();
  const store = useEstimateStore();

  const [dimensions, setDimensions] = useState<Dimensions>(
    store.dimensions || { width: 0, height: 0 },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = dimensions.width >= 100 && dimensions.height >= 100;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (dimensions.width < 100 || dimensions.width > 10000) {
      newErrors.width = '100~10,000mm 사이의 값을 입력해주세요';
    }
    if (dimensions.height < 100 || dimensions.height > 10000) {
      newErrors.height = '100~10,000mm 사이의 값을 입력해주세요';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    store.setStep4(dimensions);
    const draft = loadEstimateDraft();
    saveEstimateDraft({
      lastStep: 4,
      createdAt: draft?.createdAt || new Date().toISOString(),
      data: { ...draft?.data, dimensions },
    });
    router.push('/estimate/step5');
  };

  const handleSkip = () => {
    store.setStep4(null);
    const draft = loadEstimateDraft();
    saveEstimateDraft({
      lastStep: 4,
      createdAt: draft?.createdAt || new Date().toISOString(),
      data: { ...draft?.data, dimensions: null },
    });
    router.push('/estimate/step5');
  };

  return (
    <StepLayout
      step={4}
      title="규격 입력"
      onNext={handleNext}
      nextDisabled={!isValid}
      backHref="/estimate/step3"
      showSkip
      onSkip={handleSkip}
    >
      <div className="space-y-5">
        <div className="rounded-lg bg-blue-50 px-4 py-3">
          <p className="text-sm text-blue-700">
            창호의 <strong>안쪽 치수</strong>를 mm 단위로 입력해주세요.
            정확한 치수를 모르시면 건너뛰셔도 됩니다.
          </p>
        </div>

        <Input
          label="가로 (mm)"
          type="number"
          placeholder="예: 1800"
          value={dimensions.width || ''}
          onChange={(e) => {
            const val = e.target.value;
            setDimensions((prev) => ({
              ...prev,
              width: val ? parseInt(val, 10) : 0,
            }));
            setErrors((prev) => ({ ...prev, width: '' }));
          }}
          error={errors.width}
          min={100}
          max={10000}
          suffix="mm"
        />

        <Input
          label="세로 (mm)"
          type="number"
          placeholder="예: 2400"
          value={dimensions.height || ''}
          onChange={(e) => {
            const val = e.target.value;
            setDimensions((prev) => ({
              ...prev,
              height: val ? parseInt(val, 10) : 0,
            }));
            setErrors((prev) => ({ ...prev, height: '' }));
          }}
          error={errors.height}
          min={100}
          max={10000}
          suffix="mm"
        />
      </div>
    </StepLayout>
  );
}
