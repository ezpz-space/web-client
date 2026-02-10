import { z } from 'zod';

// ── Step 1: 기본 정보 ──

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
  floor: z
    .number()
    .int()
    .min(1, '1~99 사이의 숫자를 입력해주세요')
    .max(99, '1~99 사이의 숫자를 입력해주세요')
    .nullable()
    .optional(),
});

export const step2Schema = z.object({
  address: addressSchema,
});

// ── Step 3: 창 유형 ──

export const windowTypeSchema = z.enum(['expanded', 'non-expanded']).nullable();

// ── Step 4: 규격 ──

export const dimensionsSchema = z
  .object({
    width: z
      .number()
      .min(100, '100mm 이상 입력해주세요')
      .max(10000, '10000mm 이하로 입력해주세요'),
    height: z
      .number()
      .min(100, '100mm 이상 입력해주세요')
      .max(10000, '10000mm 이하로 입력해주세요'),
  })
  .nullable();

// ── Step 5: 갯수 ──

export const quantitySchema = z
  .number()
  .int()
  .min(1, '1개 이상 입력해주세요')
  .max(99, '99개 이하로 입력해주세요')
  .nullable();

// ── 견적 전체 ──

export const estimateInputSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  address: addressSchema,
  windowType: windowTypeSchema,
  dimensions: dimensionsSchema,
  quantity: quantitySchema,
});

// ── 상담 신청 ──

export const consultationSchema = z.object({
  estimateId: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
  availableDays: z
    .array(z.enum(['MON', 'TUE', 'WED', 'THU', 'FRI']))
    .min(1, '상담 가능한 요일을 선택해주세요'),
  timeSlot: z.string().min(1, '상담 가능한 시간대를 선택해주세요'),
  consultationType: z.enum(['PHONE', 'VISIT'], {
    message: '상담 방식을 선택해주세요',
  }),
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
