import { NextResponse } from 'next/server';
import { estimateInputSchema } from '@/lib/validations';
import type { BrandEstimate, BrandCode, EstimateResponse, PriceRange, WindowSummary } from '@/types';

function calculateEstimates(windows: {
  windowType: string;
  width: number;
  height: number;
  quantity: number;
}[]): { brands: BrandEstimate[]; totalPrice: PriceRange; windowSummary: WindowSummary[] } {
  const totalQty = windows.reduce((sum, w) => sum + w.quantity, 0);
  const hasExpanded = windows.some((w) => w.windowType === 'expanded');
  const baseMultiplier = hasExpanded ? 1.1 : 1.0;

  const brandData: {
    code: BrandCode;
    name: string;
    baseMin: number;
    baseMax: number;
    installCost: number;
    description: string;
    promotions?: string[];
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
      name: 'LX',
      baseMin: 350000,
      baseMax: 550000,
      installCost: 300000,
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
      code: 'KCC',
      name: 'KCC 글라스',
      baseMin: 300000,
      baseMax: 480000,
      installCost: 250000,
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
      code: 'CHEONGAM',
      name: '청암홈 윈도우',
      baseMin: 280000,
      baseMax: 420000,
      installCost: 200000,
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

  const brands: BrandEstimate[] = brandData.map((brand) => {
    const unitMin = Math.round(brand.baseMin * baseMultiplier);
    const unitMax = Math.round(brand.baseMax * baseMultiplier);

    return {
      brand: brand.code,
      brandName: brand.name,
      logoUrl: `/images/brands/${brand.code.toLowerCase()}.png`,
      priceRange: { min: unitMin * totalQty, max: unitMax * totalQty },
      installationCost: brand.installCost,
      description: brand.description,
      promotions: brand.promotions,
      details: brand.details,
    };
  });

  const totalPrice: PriceRange = {
    min: Math.min(...brands.map((b) => b.priceRange.min)),
    max: Math.max(...brands.map((b) => b.priceRange.max)),
  };

  const typeLabels: Record<string, string> = {
    standard: '일반 창',
    expanded: '발코니 창 (확장)',
    'non-expanded': '발코니 창 (비확장)',
  };

  const summaryMap = new Map<string, number>();
  for (const w of windows) {
    const label = typeLabels[w.windowType] || w.windowType;
    summaryMap.set(label, (summaryMap.get(label) || 0) + w.quantity);
  }

  const windowSummary: WindowSummary[] = Array.from(summaryMap.entries()).map(([type, count]) => ({ type, count }));

  return { brands, totalPrice, windowSummary };
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

    const { brands, totalPrice, windowSummary } = calculateEstimates(result.data.windows);

    let estimateId: string;
    try {
      const { getPrisma } = await import('@/lib/prisma');
      const saved = await getPrisma().estimate.create({
        data: {
          name: result.data.name || null,
          phone: result.data.phone || null,
          zonecode: result.data.address.zonecode,
          address: result.data.address.address,
          addressDetail: result.data.address.addressDetail,
          windows: JSON.parse(JSON.stringify(result.data.windows)),
          results: JSON.parse(JSON.stringify(brands)),
        },
      });
      estimateId = saved.id;
    } catch {
      estimateId = `est_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    }

    const response: EstimateResponse = {
      estimateId,
      totalPrice,
      windowSummary,
      brands,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 },
    );
  }
}
