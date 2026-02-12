'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const FAQ_ITEMS = [
  {
    q: '가견적이 정확한가요?',
    a: 'EZPZ에서 제공하는 견적은 입력하신 정보를 기준으로 한 가견적이에요. 실제 견적은 현장 방문 후 창 상태, 시공 환경 등을 확인한 뒤 확정돼요.',
  },
  {
    q: '왜 가격이 범위로 나오나요?',
    a: '창호 사양, 부자재, 현장 조건 등에 따라 가격이 달라질 수 있어 최저~최고 범위로 안내하고 있어요.',
  },
  {
    q: '다른 업체 견적과 차이가 날 수 있나요?',
    a: '네, 현장 상황(철거 난이도, 층수, 시공 방식 등)에 따라 차이가 발생할 수 있어요. 정확한 금액은 방문 견적을 통해 확인해 주세요.',
  },
  {
    q: '입력한 정보가 정확하지 않아도 되나요?',
    a: '대략적인 정보만으로도 가견적을 받을 수 있어요. 다만, 정확한 정보를 입력할수록 실제 견적과의 차이가 줄어들어요.',
  },
  {
    q: '왜 주소를 입력해야 하나요?',
    a: '지역에 따라 시공 단가와 출장비가 달라질 수 있어 정확한 가견적 산출을 위해 주소 입력을 요청드리고 있어요.',
  },
  {
    q: '견적만 보고 상담을 안 받아도 되나요?',
    a: '네, 가견적 확인만 하셔도 괜찮아요. 상담 신청은 선택 사항이며, 어떠한 의무도 없어요.',
  },
  {
    q: '상담 요청하면 바로 전화가 오나요?',
    a: '상담 요청 후 선택하신 희망 시간대에 맞춰 연락을 드려요. 요청 즉시 전화가 오는 건 아니에요.',
  },
  {
    q: '상담은 무료인가요?',
    a: '네, 가견적 확인과 상담 신청은 완전 무료예요. 별도의 수수료나 중개비가 없어요.',
  },
  {
    q: 'EZPZ는 시공 업체인가요?',
    a: 'EZPZ는 직접 시공하는 업체가 아니라, 여러 브랜드의 견적을 비교하고 상담을 연결해 주는 서비스예요.',
  },
  {
    q: '상담 후 견적이 달라질 수도 있나요?',
    a: '네, 현장 방문 후 창 상태나 시공 조건에 따라 최종 견적이 달라질 수 있어요. 가견적은 참고용으로 활용해 주세요.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 lg:px-12 lg:py-20 xl:px-20">
      <h2 className="mb-6 text-xl font-bold text-gray-900 lg:text-3xl">자주 묻는 질문</h2>
      <div className="space-y-2 lg:max-w-3xl">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={item.q}
              className="overflow-hidden rounded-xl border border-gray-100"
            >
              <button
                type="button"
                onClick={() => handleToggle(i)}
                className="flex w-full items-center gap-3 px-4 py-4 text-left text-[15px] font-medium text-gray-900 transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                {/* +/x 아이콘 */}
                <svg
                  className={cn(
                    'h-4 w-4 shrink-0 transition-transform',
                    isOpen ? 'text-gray-900' : 'text-gray-400',
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  )}
                </svg>
                <span>{item.q}</span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pl-11 text-sm leading-relaxed text-gray-500">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
