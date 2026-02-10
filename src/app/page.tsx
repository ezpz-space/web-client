import Link from 'next/link';
import { Footer } from '@/components/layout';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center bg-gray-900 px-4 text-center">
        <div className="relative z-10 max-w-lg">
          <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
            창호 교체, 어디서부터
            <br />
            시작해야 할지 모르겠다면
          </h1>
          <p className="mt-3 text-base text-gray-300">견적부터 확인하세요</p>
          <Link
            href="/estimate"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            견적 확인하기
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: '얼마나 들지 몰라 불안하다면',
              desc: '견적부터 먼저 확인하세요. 예상 비용을 미리 알 수 있습니다',
            },
            {
              title: '여러 매장 돌아다니기 힘들다면',
              desc: '한 곳에서 브랜드별 가격을 한눈에 비교하세요',
            },
            {
              title: '결정이 너무 복잡하다면',
              desc: '쉽고 명확한 숫자로 비교하고, 간편하게 결정하세요',
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-gray-200 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto flex max-w-md justify-around text-center">
          <div>
            <p className="text-3xl font-bold text-primary">3,000+</p>
            <p className="mt-1 text-sm text-gray-500">누적 견적 건수</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">2,000+</p>
            <p className="mt-1 text-sm text-gray-500">상담 완료 건수</p>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-12">
        <div className="flex items-center justify-center gap-8 text-lg font-semibold text-gray-400">
          <span>LX 하우시스</span>
          <span>KCC 글라스</span>
          <span>청암</span>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-2xl px-4 py-12">
        <h2 className="mb-6 text-center text-2xl font-bold">자주 묻는 질문</h2>
        <div className="divide-y divide-gray-200">
          {[
            {
              q: '견적 금액은 얼마나 정확한가요?',
              a: '입력하신 정보를 기반으로 산출한 예상 금액이며, 실제 시공 비용은 현장 확인 후 확정됩니다.',
            },
            {
              q: '왜 견적이 범위로 나오나요?',
              a: '창호 사양, 부자재, 현장 조건 등에 따라 가격이 달라질 수 있어 최저~최고 범위로 안내합니다.',
            },
            {
              q: '실제 업체 견적과 차이가 날 수 있나요?',
              a: '네, 현장 상황에 따라 차이가 발생할 수 있습니다. 정확한 금액은 방문 견적을 통해 확인하세요.',
            },
            {
              q: '단열은 왜 중요한가요?',
              a: '창호는 주거 공간의 열손실 중 가장 큰 비중을 차지합니다. 단열 성능이 좋은 창호로 교체하면 냉난방비를 절감할 수 있습니다.',
            },
          ].map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-gray-900">
                {item.q}
                <svg
                  className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-primary px-4 py-12 text-center">
        <h3 className="text-xl font-bold text-white">
          지금 바로 견적을 비교해보세요
        </h3>
        <Link
          href="/estimate"
          className="mt-4 inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
        >
          견적 확인하기
        </Link>
      </section>

      <Footer />
    </>
  );
}
