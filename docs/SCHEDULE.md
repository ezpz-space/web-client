# ezpz 개발 일정

## Context

PRD 작성이 완료된 ezpz 프로젝트의 **실제 개발 일정**을 수립합니다.

- **개발 인원**: 1인 풀스택
- **MVP 범위**: 핵심 플로우만 (랜딩 → 견적 입력 → 결과 → 상담 신청)
- **일정**: 제한 없음, 품질 우선
- **후순위**: 도움말(`/help`), 고객센터(`/contact`)는 MVP 이후

## 일정 요약 (7주)

```
Week 1  ██████  프로젝트 셋업 & 공통 컴포넌트
Week 2  ██████  랜딩페이지
Week 3  ██████  견적 입력 Step 1~3 + localStorage
Week 4  ██████  견적 입력 Step 4~5 + 백엔드 API & DB
Week 5  ██████  견적 결과 + 상담 신청 + 완료
Week 6  ██████  통합 테스트 & 폴리싱
Week 7  ██████  배포 & 모니터링 셋업
────────────────────────────────────────────
(후속)   ░░░░░░  도움말, 고객센터, 관리자 기능
```

---

## Week 1: 프로젝트 셋업 & 공통 컴포넌트

### Day 1~2: 프로젝트 초기화

| 작업 | 상세 |
|------|------|
| Next.js 14+ 프로젝트 생성 | App Router, TypeScript |
| Tailwind CSS 설정 | 디자인 토큰 (색상, 타이포, breakpoint) |
| ESLint + Prettier | 코드 스타일 통일 |
| 디렉토리 구조 잡기 | `app/`, `components/`, `lib/`, `hooks/`, `types/` |
| Git 초기화 | `.gitignore`, 초기 커밋 |

**디렉토리 구조:**
```
src/
├── app/
│   ├── layout.tsx              # Root layout (Header 포함)
│   ├── page.tsx                # 랜딩페이지
│   ├── estimate/
│   │   ├── page.tsx            # 견적 시작 (Bottom Sheet)
│   │   ├── step1/page.tsx
│   │   ├── step2/page.tsx
│   │   ├── step3/page.tsx
│   │   ├── step4/page.tsx
│   │   ├── step5/page.tsx
│   │   ├── result/page.tsx
│   │   ├── consultation/page.tsx
│   │   └── complete/page.tsx
│   ├── help/                   # (후순위)
│   └── contact/                # (후순위)
├── components/
│   ├── ui/                     # 공통 UI 컴포넌트
│   ├── layout/                 # Header, Footer, Drawer
│   └── estimate/               # 견적 관련 컴포넌트
├── lib/
│   ├── validations.ts          # Zod 스키마
│   ├── storage.ts              # localStorage 유틸
│   └── api.ts                  # API 클라이언트
├── hooks/
│   └── useEstimateStore.ts     # Zustand 스토어
├── types/
│   └── index.ts                # 공유 타입 정의
└── styles/
    └── globals.css             # Tailwind + 글로벌 스타일
```

### Day 3~4: 공통 UI 컴포넌트

| 컴포넌트 | 소요 | 비고 |
|----------|------|------|
| `Button` | 2h | Primary / Secondary / Text / Outlined 변형 |
| `Input` | 3h | label, placeholder, error, 포커스 상태 |
| `Header` | 2h | 로고 + 햄버거, sticky |
| `Drawer` | 4h | 슬라이드, scrim, 포커스 트랩, ESC 닫기 |
| `Footer` | 1h | 정적 콘텐츠 |
| `Toast` | 2h | 성공/에러 메시지, 자동 닫힘 |
| `Modal` | 2h | 오버레이, 확인/취소 |
| `Spinner` | 0.5h | 로딩 인디케이터 |

### Day 5: 상태 관리 & 유틸

| 작업 | 상세 |
|------|------|
| Zustand 스토어 | `useEstimateStore` — 5 Step 데이터 + 결과 |
| localStorage 유틸 | `saveEstimateDraft()`, `loadEstimateDraft()`, `clearEstimateDraft()` |
| Zod 스키마 | 공통 validation 스키마 (이름, 전화번호, 주소 등) |
| 타입 정의 | `EstimateInput`, `BrandEstimate`, `ConsultationForm` 등 |

**산출물:** 공통 컴포넌트 라이브러리, 프로젝트 뼈대 완성

---

## Week 2: 랜딩페이지

### Day 1~2: Hero + Feature + 실적

| 섹션 | 소요 | 비고 |
|------|------|------|
| Hero 섹션 | 3h | 배경 이미지, 오버레이, CTA |
| Feature 카드 3개 | 2h | 모바일 1열, 데스크톱 3열 그리드 |
| 실적 섹션 | 3h | 카운트업 애니메이션 (Intersection Observer) |

### Day 3: 브랜드 + FAQ

| 섹션 | 소요 | 비고 |
|------|------|------|
| 브랜드 로고 섹션 | 1h | grayscale → hover 컬러 |
| `Accordion` 컴포넌트 | 3h | 단일 오픈, 슬라이드 애니메이션, 화살표 회전 |
| FAQ 콘텐츠 적용 | 1h | 4개 Q&A |

### Day 4: 하단 CTA + Footer + 반응형

| 작업 | 소요 | 비고 |
|------|------|------|
| 하단 CTA 섹션 | 1h | Primary 배경, 흰색 버튼 |
| Footer | 0.5h | 이미 Week 1에서 컴포넌트 완성 |
| 반응형 테스트 & 조정 | 3h | 모바일/태블릿/데스크톱 |

### Day 5: SEO + 메타 + 이벤트 트래킹

| 작업 | 소요 | 비고 |
|------|------|------|
| 메타 태그 / OG 태그 | 1h | `metadata` export (Next.js) |
| GA4 초기 설정 | 2h | `gtag` 또는 `@next/third-parties` |
| CTA 클릭 이벤트 | 1h | Hero CTA, 하단 CTA 트래킹 |

**산출물:** 랜딩페이지 완성, 반응형 대응, 기본 SEO

---

## Week 3: 견적 입력 (Step 1~3 + localStorage)

### Day 1: 견적 시작 + Bottom Sheet

| 작업 | 소요 | 비고 |
|------|------|------|
| `BottomSheet` 컴포넌트 | 4h | Framer Motion 슬라이드업, 핸들, scrim |
| 이전 견적 분기 로직 | 2h | localStorage 확인 → 불러오기/새로 시작 |
| `/estimate` 페이지 | 1h | Bottom Sheet 연결 |

### Day 2: Step 1 — 이름 + 전화번호

| 작업 | 소요 | 비고 |
|------|------|------|
| `ProgressIndicator` 컴포넌트 | 3h | 5단계, 완료/현재/미완료/Skip 상태 |
| Step 1 폼 | 2h | React Hook Form + Zod |
| 전화번호 자동 포맷팅 | 1h | 010-XXXX-XXXX 자동 하이픈 |
| localStorage 자동 저장 | 1h | Step 완료 시 저장 |

### Day 3: Step 2 — 주소

| 작업 | 소요 | 비고 |
|------|------|------|
| 카카오 주소 API 연동 | 4h | SDK 로드, 팝업/모달, 결과 바인딩 |
| 상세 주소 + 층수 필드 | 1h | 층수는 선택(optional) |
| Validation + 저장 | 1h | 주소 필수, 층수 범위 |

### Day 4~5: Step 3 — 창 유형 + 공통 리팩터

| 작업 | 소요 | 비고 |
|------|------|------|
| 카드형 라디오 선택 UI | 2h | 확장/비확장 발코니 |
| `Tooltip` 컴포넌트 | 2h | ⓘ 아이콘, 팝오버 |
| "건너뛰기" 로직 | 1h | windowType = null, Step 4 이동 |
| Step 1~3 통합 테스트 | 2h | 전체 흐름, Skip, 뒤로가기, localStorage |
| 리팩터링 | 1h | 공통 패턴 추출 (StepLayout 등) |

**산출물:** 견적 프로세스 전반부 완성, localStorage 저장/복원

---

## Week 4: 견적 입력 (Step 4~5) + 백엔드

### Day 1: Step 4 — 규격 입력

| 작업 | 소요 | 비고 |
|------|------|------|
| 가로/세로 입력 필드 | 2h | mm 단위, 범위 검증 (100~10000) |
| Info 툴팁 (안쪽 치수) | 1h | 일러스트 + 설명 |
| Skip 로직 | 0.5h | dimensions = null |

### Day 2: Step 5 — 갯수 + 제출

| 작업 | 소요 | 비고 |
|------|------|------|
| `Stepper` 컴포넌트 | 2h | +/−, 직접 입력, 1~99 |
| "견적 확인하기" 버튼 | 1h | API 호출 트리거 |
| 로딩 오버레이 | 1h | 전체 화면 스피너 + "견적을 계산하고 있습니다..." |
| Skip 로직 | 0.5h | quantity = null |

### Day 3~4: 백엔드 — DB + API

| 작업 | 소요 | 비고 |
|------|------|------|
| PostgreSQL + Prisma 설정 | 2h | Supabase 또는 Neon |
| DB 스키마 & 마이그레이션 | 3h | estimates, consultations 테이블 |
| `POST /api/estimates` | 4h | 입력 검증 (Zod), 견적 계산 로직, 결과 저장 |
| `GET /api/estimates/:id` | 1h | 견적 결과 조회 |
| 견적 계산 로직 | 3h | 브랜드별 가격 범위 산출 알고리즘 |

### Day 5: 프론트-백 연동

| 작업 | 소요 | 비고 |
|------|------|------|
| API 클라이언트 (`lib/api.ts`) | 1h | fetch wrapper, 에러 핸들링 |
| Step 5 → API → 결과 연결 | 2h | 성공/실패 분기 |
| 에러 처리 (400, 429, 500) | 2h | 토스트, 재시도 버튼 |
| E2E 테스트 (Step 1→5→API) | 2h | 전체 흐름 수동 테스트 |

**산출물:** 견적 입력 전체 완성, 백엔드 API 동작, DB 연동

---

## Week 5: 견적 결과 + 상담 신청 + 완료

### Day 1~2: 견적 결과 페이지

| 작업 | 소요 | 비고 |
|------|------|------|
| 입력 정보 요약 카드 | 2h | Skip된 항목 "미입력" 표시 |
| 브랜드 견적 카드 x3 | 5h | 로고, 가격 범위, 평당 비용, 설치사업 건수, 특징 |
| 카드 "상세 보기" 아코디언 | 2h | 유리 사양, 프레임, 단열/방음, 보증 |
| 가격 면책 문구 | 0.5h | caption 스타일 |
| 하단 CTA | 1h | "상담 신청하기" + "홈으로 돌아가기" |

### Day 3~4: 상담 신청 폼

| 작업 | 소요 | 비고 |
|------|------|------|
| 기본 정보 확인 (읽기 전용) | 1h | 이름, 전화번호, 주소 |
| `DaySelector` 컴포넌트 | 3h | 월~금 복수 선택 칩 |
| `TimeGrid` 컴포넌트 | 3h | 2열 8슬롯, 점심시간 비활성 |
| 상담 방식 카드 선택 | 1h | 전화/방문, 라디오 카드 |
| `POST /api/consultations` API | 2h | 백엔드 엔드포인트 |
| 폼 Validation + 제출 | 2h | 3개 필드 모두 선택 시 활성화 |

### Day 5: 완료 화면 + 통합

| 작업 | 소요 | 비고 |
|------|------|------|
| 완료 화면 UI | 2h | 성공 아이콘 애니메이션, 상담 내역 카드 |
| history.replaceState | 0.5h | 뒤로가기 방지 |
| localStorage 정리 | 0.5h | 완료 시 draft 삭제 |
| 결과→상담→완료 통합 테스트 | 3h | 전체 플로우 |

**산출물:** 핵심 플로우 전체 완성 (랜딩 → 견적 → 결과 → 상담 → 완료)

---

## Week 6: 통합 테스트 & 폴리싱

### Day 1~2: 전체 플로우 테스트

| 작업 | 소요 | 비고 |
|------|------|------|
| Happy Path 테스트 | 2h | 모든 필드 입력 → 견적 → 상담 → 완료 |
| Skip Path 테스트 | 2h | Step 3~5 건너뛰기 조합 |
| 에러 케이스 테스트 | 2h | Validation 실패, API 에러, 타임아웃 |
| localStorage 복원 테스트 | 1h | 중간 이탈 후 재방문, 불러오기/새로 시작 |
| 반응형 테스트 | 2h | 모바일/태블릿/데스크톱 전 화면 |

### Day 3: 접근성 & 성능

| 작업 | 소요 | 비고 |
|------|------|------|
| 접근성 감사 | 3h | ARIA, 키보드 네비게이션, 포커스 관리 |
| Lighthouse 성능 최적화 | 3h | LCP < 2.5s, CLS < 0.1, 이미지 최적화 |

### Day 4~5: UI 폴리싱

| 작업 | 소요 | 비고 |
|------|------|------|
| 애니메이션 다듬기 | 3h | 페이지 전환, Bottom Sheet, 아코디언 |
| 에러 상태 UI 점검 | 2h | 모든 폼의 에러 메시지 표시 |
| 로딩 상태 점검 | 1h | 스피너, 버튼 비활성화, 중복 클릭 방지 |
| 엣지 케이스 수정 | 2h | 발견된 버그 수정 |

**산출물:** 품질 검증 완료, 프로덕션 준비 상태

---

## Week 7: 배포 & 모니터링

### Day 1~2: 배포

| 작업 | 소요 | 비고 |
|------|------|------|
| Vercel 프로젝트 설정 | 1h | 환경 변수, 도메인 연결 |
| 도메인 연결 (ezpzspace.com) | 1h | DNS 설정 |
| 프로덕션 DB 설정 | 2h | Supabase/Neon 프로덕션 인스턴스 |
| 환경별 설정 분리 | 1h | dev / staging / production |
| 프로덕션 배포 & 스모크 테스트 | 2h | 전체 플로우 재검증 |

### Day 3~4: 모니터링 & 분석

| 작업 | 소요 | 비고 |
|------|------|------|
| Sentry 연동 | 2h | 에러 트래킹 |
| GA4 이벤트 최종 설정 | 2h | CTA 클릭, 견적 완료, 상담 신청 |
| 에러 알림 설정 | 1h | Sentry → Slack/Email 알림 |

### Day 5: 문서 & 마무리

| 작업 | 소요 |
|------|------|
| 환경 변수 문서화 | 1h |
| 배포 프로세스 문서화 | 1h |
| 릴리즈 노트 작성 | 1h |

**산출물:** 프로덕션 배포 완료, 모니터링 가동

---

## 후속 작업 (MVP 이후)

MVP 배포 후 우선순위에 따라 추가 개발:

| 순위 | 작업 | 소요 | 비고 |
|------|------|------|------|
| P1 | 도움말 페이지 (`/help`, `/help/:id`) | 3일 | API + 콘텐츠 관리 |
| P1 | 고객센터 (`/contact`) | 2일 | 폼 + 이메일/SMS 발송 |
| P2 | 이메일 알림 시스템 | 2일 | 상담 접수 확인 메일 |
| P2 | SMS 알림 연동 | 2일 | NHN Cloud / Twilio 등 |
| P3 | 관리자 페이지 | 5일 | 견적/상담 관리, 도움말 CMS |
| P3 | E2E 자동화 테스트 | 3일 | Playwright 또는 Cypress |

---

## 기술 결정 사항

| 항목 | 선택 | 이유 |
|------|------|------|
| 프레임워크 | Next.js 14+ (App Router) | SSR/SSG, 파일 기반 라우팅 |
| 언어 | TypeScript | 타입 안전성 |
| 스타일 | Tailwind CSS | 모바일 퍼스트, 유틸리티 |
| 상태 관리 | Zustand | 경량, 1인 개발에 적합 |
| 폼 | React Hook Form + Zod | 성능, 프론트/백 스키마 공유 |
| 애니메이션 | Framer Motion | Bottom Sheet, 페이지 전환 |
| DB | PostgreSQL (Supabase) | JSONB, 관리형 |
| ORM | Prisma | 마이그레이션, TypeScript 통합 |
| 배포 | Vercel | Next.js 최적 호환 |
| 주소 API | 카카오 주소 검색 | 국내 표준, 무료 |

---

## 핵심 파일 목록

### PRD 참조
- `docs/PRD.md` — 통합 문서
- `docs/PRD-01-landing.md` — 랜딩페이지
- `docs/PRD-02-estimate-process.md` — 견적 프로세스
- `docs/PRD-03-estimate-result.md` — 결과/상담/완료

### 주요 구현 파일
- `src/app/layout.tsx` — 루트 레이아웃
- `src/app/page.tsx` — 랜딩페이지
- `src/app/estimate/` — 견적 프로세스 전체
- `src/components/ui/` — 공통 컴포넌트
- `src/hooks/useEstimateStore.ts` — 전역 상태
- `src/lib/validations.ts` — Zod 스키마
- `src/lib/storage.ts` — localStorage
- `prisma/schema.prisma` — DB 스키마

---

## 검증 방법

1. **기능 검증**: 각 Week 종료 시 해당 범위 수동 테스트
2. **반응형 검증**: Chrome DevTools 모바일/태블릿/데스크톱
3. **접근성 검증**: Lighthouse Accessibility 점수 90+
4. **성능 검증**: Lighthouse Performance 점수 90+, LCP < 2.5s
5. **E2E 검증**: 전체 Happy Path + Skip Path + 에러 케이스
