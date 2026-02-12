import Image from 'next/image';

export function StatsSection() {
  return (
    <section className="relative">
      <Image
        src="/images/landing-bg.svg"
        alt=""
        width={821}
        height={1383}
        className="w-full h-auto"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 lg:px-12 xl:px-20">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Stat 1 */}
          <div className="flex gap-5">
            <div className="w-[3px] shrink-0 self-stretch bg-gray-900" />
            <div>
              <p className="text-[48px] font-bold leading-tight text-gray-900">3K +</p>
              <p className="mt-3 text-[15px] leading-relaxed text-gray-700">
                월 3000세대 이상의 OEM 공장 출
                <br />
                고가를 기반으로 제공되는
                <br />
                정확한 가견적
              </p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex gap-5">
            <div className="w-[3px] shrink-0 self-stretch bg-gray-900" />
            <div>
              <p className="text-[48px] font-bold leading-tight text-gray-900">2K +</p>
              <p className="mt-3 text-[15px] leading-relaxed text-gray-700">
                2000개 이상의 시공 현장 데이터를
                <br />
                기반으로 한 시공 단가
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
