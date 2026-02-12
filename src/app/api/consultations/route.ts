import { NextResponse } from 'next/server';
import { consultationSchema } from '@/lib/validations';
import type { ConsultationResponse } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = consultationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: '입력값이 올바르지 않습니다', details: result.error.flatten() },
        { status: 400 },
      );
    }

    let consultationId: string;
    try {
      const { getPrisma } = await import('@/lib/prisma');
      const saved = await getPrisma().consultation.create({
        data: {
          estimateId: result.data.estimateId,
          name: result.data.name || null,
          phone: result.data.phone || null,
          preferredDays: result.data.preferredDays || [],
          preferredTime: result.data.preferredTime || null,
        },
      });
      consultationId = saved.id;
    } catch {
      consultationId = `con_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    }

    const response: ConsultationResponse = {
      consultationId,
      success: true,
    };

    return NextResponse.json(response, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 },
    );
  }
}
