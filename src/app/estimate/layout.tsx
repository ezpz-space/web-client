import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '견적 입력 - ezpz',
  description: '창호 교체 예상 견적을 확인하세요. 간단한 정보 입력만으로 LX, KCC, 청암 브랜드별 견적을 비교할 수 있습니다.',
  robots: { index: false, follow: false },
};

export default function EstimateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
