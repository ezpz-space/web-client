export function StatsSection() {
  return (
    <section className="bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 px-6 py-14">
      {/* Stat 1 */}
      <div className="mb-12 flex gap-5">
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
    </section>
  );
}
