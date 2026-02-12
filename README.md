# ezpz

창호(샤시) 교체 견적을 비대면으로 비교하는 모바일 퍼스트 반응형 웹서비스

## 주요 기능

- **견적 비교** — LX 하우시스, KCC 글라스, 청암창호 3사 예상 견적을 한눈에 비교
- **멀티 윈도우** — 여러 창을 개별 등록하고 통합 견적 확인
- **상담 연결** — 희망 요일/시간/방식을 선택해 상담 신청

## 기술 스택

| 카테고리 | 기술 |
|----------|------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| State | Zustand |
| Form | React Hook Form + Zod |
| Animation | Framer Motion |
| ORM | Prisma 7 |
| DB | PostgreSQL |

## 시작하기

```bash
# 의존성 설치
npm install

# Prisma 클라이언트 생성
npx prisma generate

# 개발 서버
npm run dev
```

## 환경 변수

```env
# .env
DATABASE_URL="postgresql://user:pass@host:5432/ezpz?sslmode=require"
```

> DATABASE_URL 미설정 시에도 앱은 정상 동작합니다. DB 연결 실패 시 임시 ID를 생성하고 계산 결과만 반환합니다.

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # 랜딩페이지
│   ├── api/                # API 라우트 (estimates, consultations)
│   └── estimate/           # 견적 플로우
│       ├── step1, step2    # 기본정보, 주소
│       ├── windows/        # 창 목록 관리
│       ├── window/         # 창 서브플로우 (type → width → height → details)
│       ├── loading/        # 견적 계산
│       ├── result/         # 결과 비교
│       ├── consultation/   # 상담 신청
│       └── complete/       # 완료
├── components/
│   ├── ui/                 # 공통 UI (Button, Input, Modal, BottomSheet 등)
│   ├── layout/             # Header, Drawer, Footer
│   ├── estimate/           # StepLayout, WindowStepLayout, ProgressIndicator
│   └── landing/            # EstimateChart, FaqSection, StatsSection
├── hooks/                  # useEstimateStore (Zustand)
├── lib/                    # utils, validations, storage, prisma
└── types/                  # 공유 타입 정의
```

## 문서

| 문서 | 내용 |
|------|------|
| [PRD](docs/PRD.md) | 통합 기획 문서 |
| [PRD-01](docs/PRD-01-landing.md) | 랜딩페이지 |
| [PRD-02](docs/PRD-02-estimate-process.md) | 견적 입력 프로세스 |
| [PRD-03](docs/PRD-03-estimate-result.md) | 결과, 상담, 완료 |
| [DEVLOG](docs/DEVLOG.md) | 개발 로그 |
