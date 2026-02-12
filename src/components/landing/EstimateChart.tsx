'use client';

import { useEffect, useRef } from 'react';

const A = { name: 'A사', baseLeft: 22, width: 35, from: '#b8e4ff', to: '#7ac8ff', period: 3.5, amplitude: 8 };

const BRANDS = [
  A,
  { name: 'B사', baseLeft: 40, width: 34, from: '#deff8a', to: '#c5f030', period: 4.2, amplitude: 6 },
  { name: 'C사', baseLeft: 16, width: 28, from: '#a0ffe8', to: '#6df0cc', period: 3.8, amplitude: 10 },
];

const A_PRICE_LOW = 700;
const A_PRICE_HIGH = 800;

export function EstimateChart() {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelLowRef = useRef<HTMLDivElement>(null);
  const labelHighRef = useRef<HTMLDivElement>(null);
  const labelLowTextRef = useRef<HTMLSpanElement>(null);
  const labelHighTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let animId: number;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - start) / 1000;
      const aOffset = Math.sin((elapsed * 2 * Math.PI) / A.period) * A.amplitude;

      BRANDS.forEach((brand, i) => {
        const bar = barsRef.current[i];
        if (!bar) return;
        const offset = Math.sin((elapsed * 2 * Math.PI) / brand.period) * brand.amplitude;
        bar.style.transform = `translateX(${offset}px)`;
      });

      if (labelLowRef.current) {
        labelLowRef.current.style.transform = `translateX(${aOffset}px)`;
      }
      if (labelHighRef.current) {
        labelHighRef.current.style.transform = `translateX(${aOffset}px)`;
      }

      const priceShift = Math.round((aOffset / A.amplitude) * 15);
      if (labelLowTextRef.current) {
        labelLowTextRef.current.textContent = `${A_PRICE_LOW + priceShift}만원`;
      }
      if (labelHighTextRef.current) {
        labelHighTextRef.current.textContent = `${A_PRICE_HIGH + priceShift}만원`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl bg-gray-50 px-5 pb-6 pt-14">
      <div className="space-y-5">
        {BRANDS.map((brand, i) => (
          <div key={brand.name}>
            <p className="mb-1.5 text-[15px] font-bold text-gray-900">{brand.name}</p>
            <div className="relative h-6 w-full rounded-full bg-gray-200/50">
              {/* 컬러 바 */}
              <div
                ref={(el) => { barsRef.current[i] = el; }}
                className="absolute top-0 h-full rounded-full will-change-transform"
                style={{
                  left: `${brand.baseLeft}%`,
                  width: `${brand.width}%`,
                  background: `linear-gradient(to right, ${brand.from}, ${brand.to})`,
                }}
              >
                <div className="absolute right-[6px] top-1/2 h-3 w-[3px] -translate-y-1/2 rounded-full bg-white/70" />
              </div>

              {/* A사: 가격 말풍선 오버레이 */}
              {i === 0 && (
                <>
                  <div
                    ref={labelLowRef}
                    className="absolute -top-12 -translate-x-1/2 will-change-transform"
                    style={{ left: `${A.baseLeft}%` }}
                  >
                    <div className="relative rounded-xl bg-white px-4 py-1.5 text-[13px] font-semibold text-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                      <span ref={labelLowTextRef}>700만원</span>
                      <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.05)]" />
                    </div>
                  </div>
                  <div
                    ref={labelHighRef}
                    className="absolute -top-12 -translate-x-1/2 will-change-transform"
                    style={{ left: `${A.baseLeft + A.width}%` }}
                  >
                    <div className="relative rounded-xl bg-white px-4 py-1.5 text-[13px] font-semibold text-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                      <span ref={labelHighTextRef}>800만원</span>
                      <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.05)]" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
