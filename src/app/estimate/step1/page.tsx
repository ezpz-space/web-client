'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepLayout } from '@/components/estimate';
import { Input } from '@/components/ui';
import { useEstimateStore } from '@/hooks/useEstimateStore';
import { formatPhone, stripPhone } from '@/lib/utils';
import { step1Schema } from '@/lib/validations';

export default function Step1Page() {
  const router = useRouter();
  const { name: savedName, phone: savedPhone, setUserInfo } = useEstimateStore();

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
    setUserInfo(name, rawPhone);
    router.push('/estimate/step2');
  };

  return (
    <StepLayout
      step={1}
      title="견적 알아보기"
      onNext={handleNext}
      nextLabel="신규 견적 알아보기"
      nextDisabled={!isValid}
      backHref="/"
      showSkip
      onSkip={() => router.push('/estimate/step2')}
    >
      <div className="space-y-5">
        <p className="text-base text-gray-500">
          입력하신 정보는 견적 저장 및
          <br />
          재조회 용도로만 사용돼요.
        </p>
        <Input
          label="이름"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          autoComplete="name"
        />
        <Input
          label="연락처"
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
