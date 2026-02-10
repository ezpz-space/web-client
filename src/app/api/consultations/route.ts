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

    // DB 저장 시도 (DB 미연결 시 fallback)
    let consultationId: string;
    try {
      const { getPrisma } = await import('@/lib/prisma');
      const saved = await getPrisma().consultation.create({
        data: {
          estimateId: result.data.estimateId,
          name: result.data.name,
          phone: result.data.phone,
          address: result.data.address,
          availableDays: result.data.availableDays,
          timeSlot: result.data.timeSlot,
          consultationType: result.data.consultationType,
        },
      });
      consultationId = saved.id;
    } catch {
      consultationId = `con_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    }

    const response: ConsultationResponse = {
      consultationId,
      message: '상담 신청이 접수되었습니다. 영업일 기준 1~2일 이내에 연락드리겠습니다.',
    };

    return NextResponse.json(response, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 },
    );
  }
}
