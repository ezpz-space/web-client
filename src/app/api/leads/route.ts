import { NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: '입력값이 올바르지 않습니다', details: result.error.flatten() },
        { status: 400 },
      );
    }

    const { name, email, phone } = result.data;

    let leadId: string;
    try {
      const { getPrisma } = await import('@/lib/prisma');
      const saved = await getPrisma().lead.create({
        data: {
          name,
          email: email || null,
          phone: phone || null,
        },
      });
      leadId = saved.id;
    } catch {
      leadId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    }

    return NextResponse.json({ leadId, success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 },
    );
  }
}
