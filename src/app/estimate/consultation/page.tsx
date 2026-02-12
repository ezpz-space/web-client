'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEstimateStore } from '@/hooks/useEstimateStore';
import { Button, Input } from '@/components/ui';
import { cn } from '@/lib/utils';
import { formatPhone } from '@/lib/utils';
import type { DayOfWeek } from '@/types';

const DAYS: { value: DayOfWeek; label: string }[] = [
  { value: 'MON', label: '월' },
  { value: 'TUE', label: '화' },
  { value: 'WED', label: '수' },
  { value: 'THU', label: '목' },
  { value: 'FRI', label: '금' },
];

const TIME_SLOTS = [
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM', '10:00 PM',
];

export default function ConsultationPage() {
  const router = useRouter();
  const store = useEstimateStore();

  const [step, setStep] = useState(1); // 1/2 or 2/2
  const [name, setName] = useState(store.name || '');
  const [phone, setPhone] = useState(store.phone || '');
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleDay = (day: DayOfWeek) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          estimateId: store.estimateId || 'est_mock',
          name: name || undefined,
          phone: phone || undefined,
          preferredDays: selectedDays.length > 0 ? selectedDays : undefined,
          preferredTime: selectedTime || undefined,
        }),
      });

      if (!response.ok) throw new Error('Failed');
      router.push('/estimate/complete');
    } catch {
      router.push('/estimate/complete');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    handleSubmit();
  };

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
        <button
          type="button"
          onClick={() => {
            if (step === 2) setStep(1);
            else router.back();
          }}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
          aria-label="뒤로가기"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">이제 전문가에게 맡겨볼게요</h1>
      </div>

      {step === 1 ? (
        /* Step 1/2 — Name & Phone */
        <>
          <div className="flex-1 px-4 py-6">
            <p className="text-base text-gray-400 mb-1">{step}/2</p>
            <p className="text-base text-gray-500 mb-6">
              상담에 필요한 정보를 남겨주세요.
            </p>

            <div className="space-y-4">
              <Input
                label="이름"
                placeholder="이름을 입력해주세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="연락처"
                placeholder="010-0000-0000"
                value={formatPhone(phone)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, '').slice(0, 11);
                  setPhone(raw);
                }}
                inputMode="tel"
              />
            </div>
          </div>

          <div className="sticky bottom-0 border-t border-gray-100 bg-white px-4 py-4 space-y-2">
            <Button fullWidth size="lg" onClick={() => setStep(2)}>
              계속하기
            </Button>
            <button
              type="button"
              onClick={handleSkip}
              className="w-full py-2 text-center text-base font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              건너뛰고 상담 요청하기
            </button>
          </div>
        </>
      ) : (
        /* Step 2/2 — Schedule */
        <>
          <div className="flex-1 px-4 py-6">
            <p className="text-base text-gray-400 mb-6">{step}/2</p>

            {/* Day selector */}
            <section className="mb-6">
              <h2 className="text-sm text-gray-400 mb-3">요일 선택</h2>
              <div className="flex gap-2" role="group" aria-label="상담 가능 요일">
                {DAYS.map((day) => (
                  <button
                    key={day.value}
                    type="button"
                    aria-pressed={selectedDays.includes(day.value)}
                    onClick={() => toggleDay(day.value)}
                    className={cn(
                      'flex-1 rounded-lg py-3 text-[13px] font-medium transition-colors cursor-pointer',
                      selectedDays.includes(day.value)
                        ? 'bg-primary text-white'
                        : 'border border-gray-200 text-gray-600 hover:border-primary',
                    )}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Time selector */}
            <section>
              <h2 className="text-sm text-gray-400 mb-3">시간 선택</h2>
              <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="상담 가능 시간">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    role="radio"
                    aria-checked={selectedTime === slot}
                    onClick={() => setSelectedTime(slot)}
                    className={cn(
                      'rounded-lg py-2.5 text-sm transition-colors cursor-pointer',
                      selectedTime === slot
                        ? 'bg-primary text-white'
                        : 'border border-gray-200 text-gray-600 hover:border-primary',
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="sticky bottom-0 border-t border-gray-100 bg-white px-4 py-4 space-y-2">
            <Button
              fullWidth
              size="lg"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              상담 요청하기
            </Button>
            <button
              type="button"
              onClick={handleSkip}
              className="w-full py-2 text-center text-base font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              건너뛰고 상담 요청하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
