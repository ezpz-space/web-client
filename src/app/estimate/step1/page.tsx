'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepLayout } from '@/components/estimate';
import { Input } from '@/components/ui';
import { useEstimateStore } from '@/hooks/useEstimateStore';
import { saveEstimateDraft } from '@/lib/storage';
import { formatPhone, stripPhone } from '@/lib/utils';
import { step1Schema } from '@/lib/validations';

export default function Step1Page() {
  const router = useRouter();
  const { name: savedName, phone: savedPhone, setStep1 } = useEstimateStore();

  const [name, setName] = useState(savedName);
  const [phone, setPhone] = useState(savedPhone ? formatPhone(savedPhone) : '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const rawPhone = stripPhone(phone);

  const validate = () => {
    const result = step1Schema.safeParse({ name, phone: rawPhone });
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    setErrors(fieldErrors);
    return false;
  };

  const isValid =
    name.length >= 2 &&
    /^[가-힣a-zA-Z]+$/.test(name) &&
    /^010\d{7,8}$/.test(rawPhone);

  const handleNext = () => {
    if (!validate()) return;
    setStep1(name, rawPhone);
    saveEstimateDraft({
      lastStep: 1,
      createdAt: new Date().toISOString(),
      data: { name, phone: rawPhone },
    });
    router.push('/estimate/step2');
  };

  return (
    <StepLayout
      step={1}
      title="견적 정보 입력"
      onNext={handleNext}
      nextDisabled={!isValid}
      backHref="/"
    >
      <div className="space-y-5">
        <Input
          label="이름"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          autoComplete="name"
        />
        <Input
          label="전화번호"
          type="tel"
          placeholder="010-0000-0000"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          error={errors.phone}
          inputMode="tel"
          autoComplete="tel"
        />
      </div>
    </StepLayout>
  );
}
