'use client';

import { useState } from 'react';
import { Input, Button } from '@/components/ui';
import { formatPhone, stripPhone } from '@/lib/utils';
import { leadSchema } from '@/lib/validations';

interface ComingSoonCTAProps {
  variant: 'hero' | 'floating';
}

export function ComingSoonCTA({ variant }: ComingSoonCTAProps) {
  const [open, setOpen] = useState(false);

  if (variant === 'hero') {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-8 hidden lg:inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-gray-900 shadow-lg transition-colors hover:brightness-95 cursor-pointer"
        >
          견적 알아보기
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        {open && <LeadCaptureModal onClose={() => setOpen(false)} />}
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 px-4 pb-6 pt-3 bg-gradient-to-t from-white via-white/95 to-transparent lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-semibold text-gray-900 shadow-lg transition-colors hover:brightness-95 cursor-pointer"
        >
          견적 알아보기
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      {open && <LeadCaptureModal onClose={() => setOpen(false)} />}
    </>
  );
}

function LeadCaptureModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const rawPhone = stripPhone(phone);

  const isValid =
    name.length >= 2 &&
    /^[가-힣a-zA-Z]+$/.test(name) &&
    (email.length > 0 || rawPhone.length > 0);

  const handleSubmit = async () => {
    const data = { name, email: email || undefined, phone: rawPhone || undefined };
    const result = leadSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string | undefined;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        } else if (!field) {
          fieldErrors._root = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setErrors({ _root: '요청에 실패했습니다. 잠시 후 다시 시도해주세요.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative mx-4 w-full max-w-sm rounded-2xl bg-white px-6 py-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-light">
              <svg className="h-7 w-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="mt-4 text-xl font-bold text-gray-900">감사합니다!</p>
            <p className="mt-2 text-sm text-gray-500">
              서비스 오픈 시 알려드릴게요.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-primary px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark cursor-pointer"
            >
              확인
            </button>
          </div>
        ) : (
          <>
            <p className="text-xl font-bold text-gray-900">서비스 오픈 알림 받기</p>
            <p className="mt-1 text-sm text-gray-500">
              연락처를 남겨주시면 오픈 시 알려드릴게요.
            </p>

            <div className="mt-5 space-y-4">
              <Input
                label="이름"
                placeholder="이름을 입력해주세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                autoComplete="name"
              />
              <Input
                label="이메일"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                autoComplete="email"
              />
              <Input
                label="전화번호"
                type="tel"
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                error={errors.phone}
                inputMode="tel"
                autoComplete="tel"
              />
              {errors._root && (
                <p className="text-sm text-error">{errors._root}</p>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="secondary"
                size="lg"
                onClick={onClose}
                className="flex-1"
              >
                닫기
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                disabled={!isValid}
                loading={loading}
                className="flex-1"
              >
                알림 신청
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
