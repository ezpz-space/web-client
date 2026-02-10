'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepLayout } from '@/components/estimate';
import { Input } from '@/components/ui';
import { useEstimateStore } from '@/hooks/useEstimateStore';
import { saveEstimateDraft, loadEstimateDraft } from '@/lib/storage';
import type { Address } from '@/types';

export default function Step2Page() {
  const router = useRouter();
  const store = useEstimateStore();

  const [address, setAddress] = useState<Address>(
    store.address || { zonecode: '', address: '', addressDetail: '', floor: undefined },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = address.zonecode.length > 0 && address.address.length > 0;

  const handleAddressSearch = () => {
    // Daum/Kakao Postcode API
    if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).daum) {
      const daum = (window as unknown as { daum: { Postcode: new (opts: { oncomplete: (data: { zonecode: string; address: string }) => void }) => { open: () => void } } }).daum;
      new daum.Postcode({
        oncomplete: (data: { zonecode: string; address: string }) => {
          setAddress((prev) => ({
            ...prev,
            zonecode: data.zonecode,
            address: data.address,
          }));
          setErrors({});
        },
      }).open();
    } else {
      // Fallback: manual input for dev
      const addr = prompt('주소를 입력해주세요 (개발용)');
      if (addr) {
        setAddress((prev) => ({
          ...prev,
          zonecode: '00000',
          address: addr,
        }));
        setErrors({});
      }
    }
  };

  const handleNext = () => {
    if (!isValid) {
      setErrors({ address: '주소를 검색해주세요' });
      return;
    }
    store.setStep2(address);
    const draft = loadEstimateDraft();
    saveEstimateDraft({
      lastStep: 2,
      createdAt: draft?.createdAt || new Date().toISOString(),
      data: { ...draft?.data, address },
    });
    router.push('/estimate/step3');
  };

  return (
    <StepLayout
      step={2}
      title="주소 입력"
      onNext={handleNext}
      nextDisabled={!isValid}
      backHref="/estimate/step1"
    >
      <div className="space-y-5">
        {/* Address search */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">주소</label>
          <button
            type="button"
            onClick={handleAddressSearch}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-left text-base transition-colors hover:border-primary cursor-pointer"
          >
            {address.address ? (
              <span className="text-gray-900">{address.address}</span>
            ) : (
              <span className="text-gray-400">주소를 검색해주세요</span>
            )}
          </button>
          {errors.address && (
            <p role="alert" className="text-sm text-error">{errors.address}</p>
          )}
        </div>

        {/* Detail address */}
        <Input
          label="상세 주소"
          placeholder="상세 주소를 입력해주세요 (동/호)"
          value={address.addressDetail || ''}
          onChange={(e) =>
            setAddress((prev) => ({ ...prev, addressDetail: e.target.value }))
          }
          maxLength={100}
        />

        {/* Floor */}
        <Input
          label="층수 (선택)"
          type="number"
          placeholder="층수를 입력해주세요"
          value={address.floor ?? ''}
          onChange={(e) => {
            const val = e.target.value;
            setAddress((prev) => ({
              ...prev,
              floor: val ? parseInt(val, 10) : undefined,
            }));
          }}
          min={1}
          max={99}
        />
      </div>
    </StepLayout>
  );
}
