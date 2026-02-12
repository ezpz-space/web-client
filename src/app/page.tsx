import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/layout';
import { StatsSection } from '@/components/landing/StatsSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { EstimateChart } from '@/components/landing/EstimateChart';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="lg:flex lg:flex-row-reverse lg:items-center lg:gap-0">
        {/* Hero 이미지 영역 */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200 md:aspect-[16/7] lg:aspect-[4/3] lg:w-1/2">
          <Image
            src="/images/hero-building.jpg"
            alt="창호 교체 인테리어"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-white lg:hidden" />
        </div>

        {/* Hero 텍스트 */}
        <div className="px-4 py-8 md:py-12 lg:w-1/2 lg:px-12 lg:py-20 xl:px-20">
          <h1 className="text-[28px] font-bold leading-[1.3] text-gray-900 md:text-4xl lg:text-[42px] lg:leading-[1.3]">
            창교체, 어디서부터
            <br />
            알아봐야 할지
            <br />
            고민되셨나요?
          </h1>
          <Link
            href="/estimate"
            className="mt-8 hidden lg:inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-gray-900 shadow-lg transition-colors hover:brightness-95"
          >
            견적 알아보기
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Features */}
      <div className="mx-auto max-w-6xl">
        {/* Feature 1 */}
        <section className="px-4 pb-12 lg:flex lg:items-center lg:gap-12 lg:px-12 lg:pb-20 xl:px-20">
          <div className="lg:w-1/2">
            <h2 className="text-xl font-bold text-gray-900 md:text-2xl lg:text-3xl">
              먼저 감부터 잡아보세요
            </h2>
            <p className="mt-2 text-base leading-relaxed text-gray-500 lg:text-lg">
              복잡한 조건 없이, 주소와 창 정보만으로
              <br />
              가견적 범위를 알려드려요.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-center rounded-[28px] p-8 lg:mt-0 lg:w-1/2" style={{ background: 'linear-gradient(180deg, rgba(131,228,204,0.21) 0%, rgba(204,226,201,0.43) 67%), #fff' }}>
            <div className="w-full max-w-[260px] rounded-2xl bg-white p-5 shadow-[0_5px_13px_rgba(0,0,0,0.12)]">
              <p className="text-lg font-bold text-gray-900 leading-snug">
                우리집 창견적,
                <br />
                알아볼까요?
              </p>
              <div className="mt-4 rounded-xl bg-white px-3 py-2.5 border border-gray-100">
                <p className="text-sm text-gray-900">서울 강남구 이지피지로 123</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 2 */}
        <section className="px-4 pb-12 lg:flex lg:flex-row-reverse lg:items-center lg:gap-12 lg:px-12 lg:pb-20 xl:px-20">
          <div className="lg:w-1/2">
            <h2 className="text-xl font-bold text-gray-900 md:text-2xl lg:text-3xl">
              업체마다 다른 말,
              <br />
              ezpz가 한 번에 정리해요
            </h2>
            <p className="mt-2 text-base leading-relaxed text-gray-500 lg:text-lg">
              브랜드별 가견적 범위를 한 번에 보여줘서
              <br />
              직접 비교하지 않아도 돼요.
            </p>
          </div>
          <div className="mt-6 lg:mt-0 lg:w-1/2">
            <EstimateChart />
          </div>
        </section>

        {/* Feature 3 */}
        <section className="px-4 pb-12 lg:flex lg:items-center lg:gap-12 lg:px-12 lg:pb-20 xl:px-20">
          <div className="lg:w-1/2">
            <h2 className="text-xl font-bold text-gray-900 md:text-2xl lg:text-3xl">
              이제 맡기면 돼요
            </h2>
            <p className="mt-2 text-base leading-relaxed text-gray-500 lg:text-lg">
              가견적을 받은 뒤 방문 상담 요청까지
              <br />
              한 번에 끝낼 수 있어요.
            </p>
          </div>
          <div className="mt-6 flex aspect-[4/3] w-full items-center justify-center rounded-xl bg-accent-light lg:mt-0 lg:w-1/2 lg:aspect-auto lg:py-12">
            <Image
              src="/images/landing-illustration.svg"
              alt="상담 요청 일러스트"
              width={280}
              height={230}
              className="object-contain"
            />
          </div>
        </section>
      </div>

      {/* Stats */}
      <StatsSection />

      {/* Brands */}
      <section className="mx-auto max-w-6xl px-4 py-12 lg:px-12 lg:py-20 xl:px-20">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl lg:text-3xl lg:text-center">
          LX, KCC, 청암 등
          <br />
          다양한 브랜드 견적을 한번에
        </h2>
        <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12 lg:gap-16">
          {[
            { src: '/images/logo-lx.png', alt: 'LX 하우시스', width: 108, height: 37 },
            { src: '/images/logo-kcc.png', alt: 'KCC Homecc', width: 168, height: 37 },
            { src: '/images/logo-home.svg', alt: 'Home WINDOW 정암홈 윈도우', width: 128, height: 37 },
          ].map((brand) => (
            <div key={brand.alt} className="flex h-12 items-center justify-center">
              <Image
                src={brand.src}
                alt={brand.alt}
                width={brand.width}
                height={brand.height}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      <Footer />

      {/* 하단 여백 (플로팅 CTA 가림 방지) - 모바일/태블릿만 */}
      <div className="h-20 lg:hidden" />

      {/* Floating CTA - 모바일/태블릿만 */}
      <div className="fixed inset-x-0 bottom-0 z-30 px-4 pb-6 pt-3 bg-gradient-to-t from-white via-white/95 to-transparent lg:hidden">
        <Link
          href="/estimate"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-semibold text-gray-900 shadow-lg transition-colors hover:brightness-95"
        >
          견적 알아보기
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      </div>
    </>
  );
}
