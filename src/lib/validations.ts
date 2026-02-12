import { z } from 'zod';

// ── Step 1: Sign-in (optional) ──

export const nameSchema = z
  .string()
  .min(2, '이름은 2자 이상 입력해주세요')
  .max(20, '이름은 20자 이하로 입력해주세요')
  .regex(/^[가-힣a-zA-Z]+$/, '한글 또는 영문만 입력 가능합니다');

export const phoneSchema = z
  .string()
  .regex(/^010\d{7,8}$/, '올바른 전화번호를 입력해주세요');

export const step1Schema = z.object({
  name: nameSchema,
  phone: phoneSchema,
});

// ── Step 2: 주소 ──

export const addressSchema = z.object({
  zonecode: z.string().min(1, '주소를 검색해주세요'),
  address: z.string().min(1, '주소를 검색해주세요'),
  addressDetail: z.string().max(100).optional(),
});

// ── Window info ──

export const windowInfoSchema = z.object({
  id: z.string().min(1),
  windowType: z.enum(['standard', 'expanded', 'non-expanded']),
  width: z.number().min(100, '100mm 이상').max(10000, '10000mm 이하'),
  height: z.number().min(100, '100mm 이상').max(10000, '10000mm 이하'),
  glassType: z.enum(['clear', 'lowe', 'super-double-lowe']).optional(),
  windowConfig: z.enum(['fix', '2w', '3w']).optional(),
  quantity: z.number().int().min(1).max(99).default(1),
});

// ── 견적 전체 (multi-window) ──

export const estimateInputSchema = z.object({
  name: nameSchema.optional(),
  phone: phoneSchema.optional(),
  address: addressSchema,
  windows: z.array(windowInfoSchema).min(1, '창 정보를 1개 이상 입력해주세요'),
});

// ── 상담 신청 ──

export const consultationSchema = z.object({
  estimateId: z.string().min(1),
  name: z.string().optional(),
  phone: z.string().optional(),
  preferredDays: z.array(z.enum(['MON', 'TUE', 'WED', 'THU', 'FRI'])).optional(),
  preferredTime: z.string().optional(),
});

// ── 고객센터 문의 ──

export const contactSchema = z.object({
  name: nameSchema,
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식을 입력해주세요'),
  phone: phoneSchema,
  content: z
    .string()
    .min(10, '최소 10자 이상 입력해주세요')
    .max(1000, '1000자 이하로 입력해주세요'),
});
