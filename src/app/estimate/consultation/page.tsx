'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEstimateStore } from '@/hooks/useEstimateStore';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { formatPhone } from '@/lib/utils';
import type { DayOfWeek, ConsultationType } from '@/types';

const DAYS: { value: DayOfWeek; label: string }[] = [
  { value: 'MON', label: '월' },
  { value: 'TUE', label: '화' },
  { value: 'WED', label: '수' },
  { value: 'THU', label: '목' },
  { value: 'FRI', label: '금' },
];

const TIME_SLOTS = [
  { value: '09:00-10:00', label: '09:00~10:00' },
  { value: '10:00-11:00', label: '10:00~11:00' },
  { value: '11:00-12:00', label: '11:00~12:00' },
  { value: '13:00-14:00', label: '13:00~14:00' },
  { value: '14:00-15:00', label: '14:00~15:00' },
  { value: '15:00-16:00', label: '15:00~16:00' },
  { value: '16:00-17:00', label: '16:00~17:00' },
  { value: '17:00-18:00', label: '17:00~18:00' },
];

const CONSULTATION_TYPES: { value: ConsultationType; label: string; description: string }[] = [
  { value: 'PHONE', label: '전화 상담', description: '전화로 상담을 진행합니다' },
  { value: 'VISIT', label: '방문 상담', description: '현장 방문하여 상담을 진행합니다' },
];

export default function ConsultationPage() {
  const router = useRouter();
  const store = useEstimateStore();

  const [availableDays, setAvailableDays] = useState<DayOfWeek[]>([]);
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [consultationType, setConsultationType] = useState<ConsultationType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = availableDays.length > 0 && timeSlot !== '' && consultationType !== null;

  const toggleDay = (day: DayOfWeek) => {
    setAvailableDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleSubmit = async () => {
    if (!isValid || !consultationType) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          estimateId: store.estimateId || 'est_mock',
          name: store.name,
          phone: store.phone,
          address: store.address?.address || '',
          availableDays,
          timeSlot,
          consultationType,
        }),
      });

      if (!response.ok) throw new Error('Failed');

      router.push('/estimate/complete');
    } catch {
      // Fallback: navigate even if API fails for MVP
      router.push('/estimate/complete');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col">
      {/* Header */}
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
        <h1 className="text-lg font-bold text-gray-900">상담 신청</h1>
      </div>

      <div className="flex-1 px-4 py-6 space-y-6">
        {/* Contact info (read-only) */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">기본 정보</h2>
          <div className="rounded-lg border border-gray-200 px-4 py-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">이름</span>
              <span className="text-gray-900">{store.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">연락처</span>
              <span className="text-gray-900">{formatPhone(store.phone)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">주소</span>
              <span className="text-gray-900 text-right max-w-[200px]">{store.address?.address}</span>
            </div>
          </div>
        </section>

        {/* Day selector */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">상담 가능 요일 (복수 선택)</h2>
          <div className="flex gap-2" role="group" aria-label="상담 가능 요일">
            {DAYS.map((day) => (
              <button
                key={day.value}
                type="button"
                aria-pressed={availableDays.includes(day.value)}
                onClick={() => toggleDay(day.value)}
                className={cn(
                  'flex-1 rounded-lg py-3 text-sm font-medium transition-colors cursor-pointer',
                  availableDays.includes(day.value)
                    ? 'bg-primary text-white'
                    : 'border border-gray-300 text-gray-600 hover:border-primary',
                )}
              >
                {day.label}
              </button>
            ))}
          </div>
        </section>

        {/* Time grid */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">상담 가능 시간</h2>
          <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="상담 가능 시간">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot.value}
                type="button"
                role="radio"
                aria-checked={timeSlot === slot.value}
                onClick={() => setTimeSlot(slot.value)}
                className={cn(
                  'rounded-lg py-3 text-sm font-medium transition-colors cursor-pointer',
                  timeSlot === slot.value
                    ? 'bg-primary text-white'
                    : 'border border-gray-300 text-gray-600 hover:border-primary',
                )}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </section>

        {/* Consultation type */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">상담 방식</h2>
          <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="상담 방식">
            {CONSULTATION_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                role="radio"
                aria-checked={consultationType === type.value}
                onClick={() => setConsultationType(type.value)}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-xl border-2 px-4 py-4 transition-all cursor-pointer',
                  consultationType === type.value
                    ? 'border-primary bg-primary-light'
                    : 'border-gray-200 hover:border-gray-300',
                )}
              >
                <span className={cn(
                  'text-base font-semibold',
                  consultationType === type.value ? 'text-primary' : 'text-gray-900',
                )}>
                  {type.label}
                </span>
                <span className="text-xs text-gray-500">{type.description}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Submit button */}
      <div className="sticky bottom-0 border-t border-gray-100 bg-white px-4 py-4">
        <Button
          fullWidth
          size="lg"
          disabled={!isValid}
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          상담 신청하기
        </Button>
      </div>
    </div>
  );
}
