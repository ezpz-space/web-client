'use client';

import { CountUp } from '@/components/ui';

export function StatsSection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto flex max-w-md justify-around text-center">
        <div>
          <CountUp
            end={3000}
            suffix="+"
            className="text-3xl font-bold text-primary"
          />
          <p className="mt-1 text-sm text-gray-500">누적 견적 건수</p>
        </div>
        <div>
          <CountUp
            end={2000}
            suffix="+"
            className="text-3xl font-bold text-primary"
          />
          <p className="mt-1 text-sm text-gray-500">상담 완료 건수</p>
        </div>
      </div>
    </section>
  );
}
