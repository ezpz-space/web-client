'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEstimateStore } from '@/hooks/useEstimateStore';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { BrandEstimate } from '@/types';

const MOCK_BRANDS: BrandEstimate[] = [
  {
    brand: 'LX',
    brandName: 'LX',
    logoUrl: '/images/brands/lx.png',
    priceRange: { min: 1400000, max: 2200000 },
    installationCost: 300000,
    description: 'LX 하우시스 브랜드 창호. 국내 1위 브랜드로 최고급 단열 성능을 자랑합니다.',
    promotions: ['20% 할인'],
    details: {
      glassType: '로이 삼중유리 (24mm)',
      frameMaterial: 'PVC + 알루미늄 복합',
      thermalPerformance: '1.0 W/m²K',
      soundInsulation: '40dB 차음',
      warrantyYears: 10,
    },
  },
  {
    brand: 'KCC',
    brandName: 'KCC 글라스',
    logoUrl: '/images/brands/kcc.png',
    priceRange: { min: 1200000, max: 1920000 },
    installationCost: 250000,
    description: 'KCC 글라스 브랜드 창호. 가성비가 우수하고 다양한 디자인을 제공합니다.',
    promotions: ['안전방충망 행사 중'],
    details: {
      glassType: '로이 이중유리 (22mm)',
      frameMaterial: 'PVC',
      thermalPerformance: '1.2 W/m²K',
      soundInsulation: '37dB 차음',
      warrantyYears: 7,
    },
  },
  {
    brand: 'CHEONGAM',
    brandName: '청암홈 윈도우',
    logoUrl: '/images/brands/chungam.png',
    priceRange: { min: 1120000, max: 1680000 },
    installationCost: 200000,
    description: '청암홈 윈도우 브랜드 창호. 합리적 가격과 맞춤 제작이 가능합니다.',
    details: {
      glassType: '로이 이중유리 (22mm)',
      frameMaterial: 'PVC',
      thermalPerformance: '1.3 W/m²K',
      soundInsulation: '35dB 차음',
      warrantyYears: 5,
    },
  },
];

function formatManwon(won: number): string {
  return Math.round(won / 10000).toLocaleString();
}

function BrandCard({ estimate }: { estimate: BrandEstimate }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-gray-600">
            {estimate.brand === 'CHEONGAM' ? '청' : estimate.brand}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{estimate.brandName}</h3>
        </div>

        {/* Price */}
        <div className="mb-3 rounded-lg bg-gray-50 px-4 py-3">
          <p className="text-2xl font-bold text-primary">
            {formatManwon(estimate.priceRange.min)}~{formatManwon(estimate.priceRange.max)}
            <span className="text-base font-normal text-gray-400 ml-1">만원</span>
          </p>
          <p className="text-sm text-gray-400 mt-1">
            시공비 {formatManwon(estimate.installationCost)}만원
          </p>
        </div>

        {/* Description */}
        <p className="text-[15px] text-gray-400 mb-3">{estimate.description}</p>

        {/* Promotions */}
        {estimate.promotions && estimate.promotions.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {estimate.promotions.map((p) => (
              <span key={p} className="rounded-full bg-accent-light px-2.5 py-1 text-[10px] font-semibold text-gray-700">
                {p}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Expandable details */}
      <div className="border-t border-gray-100">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="flex w-full items-center justify-center gap-1 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          상세 보기
          <svg
            className={cn('h-4 w-4 transition-transform', expanded && 'rotate-180')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        {expanded && (
          <div className="border-t border-gray-100 px-5 py-4 space-y-2">
            <DetailRow label="유리 사양" value={estimate.details.glassType} />
            <DetailRow label="프레임" value={estimate.details.frameMaterial} />
            <DetailRow label="단열 성능" value={estimate.details.thermalPerformance} />
            <DetailRow label="방음 성능" value={estimate.details.soundInsulation} />
            <DetailRow label="보증 기간" value={`${estimate.details.warrantyYears}년`} />
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const store = useEstimateStore();

  const brands = store.brands.length > 0 ? store.brands : MOCK_BRANDS;
  const totalPrice = store.totalPrice || { min: 1120000, max: 2200000 };

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
        <button
          type="button"
          onClick={() => router.push('/estimate/windows')}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
          aria-label="뒤로가기"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">견적 알아보기</h1>
      </div>

      <div className="flex-1 px-4 py-6">
        {/* Total price */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">우리집 창문 예상견적</h2>
        <div className="mb-4">
          <p
            className="text-4xl font-bold text-primary"
            aria-label={`${formatManwon(totalPrice.min)}만원에서 ${formatManwon(totalPrice.max)}만원`}
          >
            {formatManwon(totalPrice.min)}~{formatManwon(totalPrice.max)}
            <span className="text-base font-normal text-gray-400 ml-1">만원</span>
          </p>
        </div>

        {/* Window summary */}
        {store.windows.length > 0 && (
          <div className="mb-6 rounded-lg border border-gray-200 px-4 py-3">
            <h3 className="text-base font-bold text-gray-700 mb-2">창 정보</h3>
            {store.windows.map((w, i) => (
              <p key={w.id} className="text-[13px] font-medium text-gray-500">
                창 {i + 1}: {w.windowType === 'standard' ? '일반 창' : w.windowType === 'expanded' ? '발코니 확장' : '발코니 비확장'}, {w.width}×{w.height}mm
                {w.glassType && `, ${w.glassType === 'clear' ? '투명' : w.glassType === 'lowe' ? '로이' : '슈퍼 더블로이'}`}
                {w.windowConfig && `, ${w.windowConfig === 'fix' ? '픽스' : w.windowConfig.toUpperCase()}`}
              </p>
            ))}
            <p className="text-sm text-gray-400 mt-1">총 {store.windows.reduce((s, w) => s + w.quantity, 0)}개</p>
          </div>
        )}

        {/* Brand cards */}
        <div className="space-y-4">
          {brands.map((estimate) => (
            <BrandCard key={estimate.brand} estimate={estimate} />
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-sm text-gray-400 text-center px-4 mt-6">
          입력한 정보로 계산된 예상 금액이며, 실제 시공가는 현장 조건에 따라 달라질 수 있습니다.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 border-t border-gray-100 bg-white px-4 py-4 space-y-2">
        <Button fullWidth size="lg" onClick={() => router.push('/estimate/consultation')}>
          상담 요청하기
        </Button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="w-full py-2 text-center text-base font-semibold text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
