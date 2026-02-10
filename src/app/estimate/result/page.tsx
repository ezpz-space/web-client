'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEstimateStore } from '@/hooks/useEstimateStore';
import { Button, Accordion } from '@/components/ui';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import type { BrandEstimate } from '@/types';

// Mock data for when API hasn't been called yet
const MOCK_RESULTS: BrandEstimate[] = [
  {
    brand: 'LX',
    brandName: 'LX 하우시스',
    logoUrl: '/images/brands/lx.png',
    minPrice: 1400000,
    maxPrice: 2200000,
    pricePerUnit: { min: 350000, max: 550000 },
    pricePerPyeong: { min: 157500, max: 247500 },
    installationCount: 2847,
    features: ['국내 1위 브랜드', '최고급 단열 성능', 'AS 네트워크 최다'],
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
    brandName: 'KCC 창호',
    logoUrl: '/images/brands/kcc.png',
    minPrice: 1200000,
    maxPrice: 1920000,
    pricePerUnit: { min: 300000, max: 480000 },
    pricePerPyeong: { min: 135000, max: 216000 },
    installationCount: 2134,
    features: ['가성비 우수', '다양한 디자인', '빠른 시공'],
    details: {
      glassType: '로이 이중유리 (22mm)',
      frameMaterial: 'PVC',
      thermalPerformance: '1.2 W/m²K',
      soundInsulation: '37dB 차음',
      warrantyYears: 7,
    },
  },
  {
    brand: 'CHUNGAM',
    brandName: '청암창호',
    logoUrl: '/images/brands/chungam.png',
    minPrice: 1120000,
    maxPrice: 1680000,
    pricePerUnit: { min: 280000, max: 420000 },
    pricePerPyeong: { min: 126000, max: 189000 },
    installationCount: 1562,
    features: ['합리적 가격', '지역 밀착 시공', '맞춤 제작 가능'],
    details: {
      glassType: '로이 이중유리 (22mm)',
      frameMaterial: 'PVC',
      thermalPerformance: '1.3 W/m²K',
      soundInsulation: '35dB 차음',
      warrantyYears: 5,
    },
  },
];

function BrandCard({ estimate }: { estimate: BrandEstimate }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Card header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-gray-600">
            {estimate.brand}
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">{estimate.brandName}</h3>
            <p className="text-xs text-gray-500">설치 실적 {estimate.installationCount.toLocaleString()}건</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-3 rounded-lg bg-gray-50 px-4 py-3">
          <p className="text-xs text-gray-500 mb-1">예상 견적 범위</p>
          <p className="text-xl font-bold text-primary">
            {formatPrice(estimate.minPrice)} ~ {formatPrice(estimate.maxPrice)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            개당 {formatPrice(estimate.pricePerUnit.min)}~{formatPrice(estimate.pricePerUnit.max)}
            {' · '}
            평당 {formatPrice(estimate.pricePerPyeong.min)}~{formatPrice(estimate.pricePerPyeong.max)}
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5">
          {estimate.features.map((f) => (
            <span key={f} className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-medium text-primary">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Expandable details */}
      <div className="border-t border-gray-100">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
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

  const results = store.results.length > 0 ? store.results : MOCK_RESULTS;

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900">견적 결과</h1>
        <p className="mt-1 text-sm text-gray-500">3개 브랜드의 예상 견적을 비교해보세요</p>
      </div>

      {/* Input summary */}
      <div className="mx-4 mt-4 rounded-lg border border-gray-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">입력 정보</h2>
        <div className="grid grid-cols-2 gap-y-1 text-sm">
          <span className="text-gray-500">이름</span>
          <span className="text-gray-900">{store.name || '미입력'}</span>
          <span className="text-gray-500">연락처</span>
          <span className="text-gray-900">{store.phone || '미입력'}</span>
          <span className="text-gray-500">주소</span>
          <span className="text-gray-900">{store.address?.address || '미입력'}</span>
          <span className="text-gray-500">창 유형</span>
          <span className="text-gray-900">
            {store.windowType === 'expanded' ? '확장 발코니' : store.windowType === 'non-expanded' ? '비확장 발코니' : '미입력'}
          </span>
          <span className="text-gray-500">규격</span>
          <span className="text-gray-900">
            {store.dimensions ? `${store.dimensions.width} × ${store.dimensions.height}mm` : '미입력'}
          </span>
          <span className="text-gray-500">수량</span>
          <span className="text-gray-900">{store.quantity ? `${store.quantity}개` : '미입력'}</span>
        </div>
      </div>

      {/* Brand cards */}
      <div className="flex-1 px-4 py-4 space-y-4">
        {results.map((estimate) => (
          <BrandCard key={estimate.brand} estimate={estimate} />
        ))}

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center px-4">
          ※ 상기 금액은 예상 견적이며, 현장 상황에 따라 달라질 수 있습니다.
          정확한 견적은 방문 상담을 통해 확인해주세요.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 border-t border-gray-100 bg-white px-4 py-4 space-y-2">
        <Button fullWidth size="lg" onClick={() => router.push('/estimate/consultation')}>
          상담 신청하기
        </Button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="w-full py-2 text-center text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
