import { NextResponse } from 'next/server';
import { estimateInputSchema } from '@/lib/validations';
import type { BrandEstimate, BrandCode, EstimateResponse } from '@/types';

// Mock brand data for MVP (no DB yet)
function calculateEstimates(input: {
  windowType: string | null;
  dimensions: { width: number; height: number } | null;
  quantity: number | null;
}): BrandEstimate[] {
  const qty = input.quantity ?? 4;
  const baseMultiplier = input.windowType === 'expanded' ? 1.15 : 1.0;

  const brands: {
    code: BrandCode;
    name: string;
    baseMin: number;
    baseMax: number;
    installCount: number;
    features: string[];
    details: {
      glassType: string;
      frameMaterial: string;
      thermalPerformance: string;
      soundInsulation: string;
      warrantyYears: number;
    };
  }[] = [
    {
      code: 'LX',
      name: 'LX 하우시스',
      baseMin: 350000,
      baseMax: 550000,
      installCount: 2847,
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
      code: 'KCC',
      name: 'KCC 창호',
      baseMin: 300000,
      baseMax: 480000,
      installCount: 2134,
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
      code: 'CHUNGAM',
      name: '청암창호',
      baseMin: 280000,
      baseMax: 420000,
      installCount: 1562,
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

  return brands.map((brand) => {
    const unitMin = Math.round(brand.baseMin * baseMultiplier);
    const unitMax = Math.round(brand.baseMax * baseMultiplier);
    const totalMin = unitMin * qty;
    const totalMax = unitMax * qty;
    // 평당 비용 (assuming ~3.3m² per pyeong, standard window ~1.5m²)
    const pyeongMin = Math.round(unitMin * 0.45);
    const pyeongMax = Math.round(unitMax * 0.45);

    return {
      brand: brand.code,
      brandName: brand.name,
      logoUrl: `/images/brands/${brand.code.toLowerCase()}.png`,
      minPrice: totalMin,
      maxPrice: totalMax,
      pricePerUnit: { min: unitMin, max: unitMax },
      pricePerPyeong: { min: pyeongMin, max: pyeongMax },
      installationCount: brand.installCount,
      features: brand.features,
      details: brand.details,
    };
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = estimateInputSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: '입력값이 올바르지 않습니다', details: result.error.flatten() },
        { status: 400 },
      );
    }

    const estimates = calculateEstimates({
      windowType: result.data.windowType,
      dimensions: result.data.dimensions,
      quantity: result.data.quantity,
    });

    const estimateId = `est_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const response: EstimateResponse = {
      estimateId,
      results: estimates,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 },
    );
  }
}
