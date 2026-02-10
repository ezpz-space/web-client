import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/layout';
import { ToastProvider } from '@/components/ui';

export const metadata: Metadata = {
  title: 'ezpz - 창호 견적 비교',
  description:
    '창호(샤시) 교체 견적을 비대면으로 비교하세요. LX, KCC, 청암 등 브랜드별 예상 견적을 3분 만에 확인할 수 있습니다.',
  openGraph: {
    title: 'ezpz - 창호 견적 비교',
    description:
      '창호 교체, 어디서부터 시작해야 할지 모르겠다면. 견적부터 확인하세요.',
    siteName: 'ezpz',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          strategy="lazyOnload"
        />
      </head>
      <body className="antialiased">
        <ToastProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
