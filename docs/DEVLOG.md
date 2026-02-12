# ezpz 개발 로그

## 목차
1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택](#2-기술-스택)
3. [디렉토리 구조](#3-디렉토리-구조)
4. [개발 진행 기록](#4-개발-진행-기록)
5. [파일별 상세 설명](#5-파일별-상세-설명)
6. [디자인 토큰](#6-디자인-토큰)
7. [데이터 모델](#7-데이터-모델)
8. [API 엔드포인트](#8-api-엔드포인트)
9. [트러블슈팅](#9-트러블슈팅)
10. [현재 상태 및 남은 작업](#10-현재-상태-및-남은-작업)

---

## 1. 프로젝트 개요

- **서비스명**: ezpz (이지피지)
- **도메인**: ezpzspace.com
- **목적**: 창호(샤시) 교체 견적을 비대면으로 비교하는 모바일 퍼스트 반응형 웹서비스
- **비교 브랜드**: LX 하우시스, KCC 글라스, 청암창호
- **핵심 플로우**: 랜딩 → 견적 입력(5단계) → 결과 비교 → 상담 신청 → 완료
- **Figma 파일**: File Key `OmU6Z2dJrKYmkxCDqADHEY` (현재) / `EiBoPAigLQxQ0jz1nYqqyz` (초기)
  - User Flow: `11:282`
  - IA: `37:1161`
  - Landing: `100:5638`
  - Estimate: `100:6001`

### PRD 문서
| 파일 | 내용 |
|------|------|
| `docs/PRD.md` | 통합 문서 (User Flow, IA, 라우트, 컴포넌트, 데이터 모델, API, 기술스택) |
| `docs/PRD-01-landing.md` | 랜딩페이지, Drawer, 도움말, 고객센터 |
| `docs/PRD-02-estimate-process.md` | 견적 입력 5단계 (기본정보→주소→창유형→규격→수량) |
| `docs/PRD-03-estimate-result.md` | 견적 결과, 상담 신청, 완료 화면 |
| `docs/SCHEDULE.md` | 7주 개발 일정 |

---

## 2. 기술 스택

| 카테고리 | 기술 | 버전 | 선택 이유 |
|----------|------|------|-----------|
| 프레임워크 | Next.js (App Router) | 16.1.6 | SSR/SSG, 파일 기반 라우팅, Turbopack |
| 언어 | TypeScript | 5.x | 타입 안전성 |
| 스타일 | Tailwind CSS v4 | 4.x | 모바일 퍼스트, `@theme inline` 문법 |
| 상태관리 | Zustand | 5.0.11 | 경량, 1인 개발에 적합 |
| 폼 검증 | Zod | 4.3.6 | 프론트/백 스키마 공유 |
| 폼 관리 | React Hook Form | 7.71.1 | 성능, Zod resolver 통합 |
| 애니메이션 | Framer Motion | 12.34.0 | BottomSheet, 페이지 전환 |
| ORM | Prisma | 7.3.0 | TypeScript 통합, 마이그레이션 |
| DB | PostgreSQL | - | JSONB 지원, Supabase/Neon 호환 |
| DB 어댑터 | @prisma/adapter-pg | 7.3.0 | Prisma 7 필수 (pg 네이티브 드라이버) |
| 주소 API | 카카오 주소검색 | v2 | 국내 표준, 무료 |
| 배포 (예정) | Vercel | - | Next.js 최적 호환 |

### dependencies (package.json)
```json
{
  "@hookform/resolvers": "^5.2.2",
  "@prisma/adapter-pg": "^7.3.0",
  "@prisma/client": "^7.3.0",
  "framer-motion": "^12.34.0",
  "next": "16.1.6",
  "pg": "^8.18.0",
  "prisma": "^7.3.0",
  "react": "19.2.3",
  "react-dom": "19.2.3",
  "react-hook-form": "^7.71.1",
  "zod": "^4.3.6",
  "zustand": "^5.0.11"
}
```

---

## 3. 디렉토리 구조

```
ezpz/
├── docs/                           # PRD, 일정, 개발로그
│   ├── PRD.md
│   ├── PRD-01-landing.md
│   ├── PRD-02-estimate-process.md
│   ├── PRD-03-estimate-result.md
│   ├── SCHEDULE.md
│   └── DEVLOG.md                   ← 이 문서
│
├── prisma/
│   └── schema.prisma               # DB 스키마 (Estimate, Consultation)
├── prisma.config.ts                 # Prisma 7 설정 (datasource URL)
│
├── src/
│   ├── app/                         # Next.js App Router 페이지
│   │   ├── layout.tsx               # 루트 레이아웃 (Header, Toast, 카카오 SDK)
│   │   ├── page.tsx                 # 랜딩페이지
│   │   ├── globals.css              # Tailwind v4 디자인 토큰
│   │   ├── robots.ts                # robots.txt 생성
│   │   ├── sitemap.ts               # sitemap.xml 생성
│   │   │
│   │   ├── api/
│   │   │   ├── estimates/route.ts   # POST /api/estimates
│   │   │   └── consultations/route.ts # POST /api/consultations
│   │   │
│   │   └── estimate/
│   │       ├── layout.tsx           # 견적 페이지 공통 metadata (noindex)
│   │       ├── page.tsx             # 견적 시작 (BottomSheet: 이전 견적 불러오기)
│   │       ├── step1/page.tsx       # 이름 + 전화번호
│   │       ├── step2/page.tsx       # 주소 (카카오) + 상세주소
│   │       ├── windows/page.tsx     # 창 목록 관리 (추가/편집/삭제)
│   │       ├── window/
│   │       │   ├── type/page.tsx    # 창 유형 (일반/발코니→확장/비확장)
│   │       │   ├── width/page.tsx   # 가로 길이 (mm)
│   │       │   ├── height/page.tsx  # 세로 길이 (mm)
│   │       │   └── details/page.tsx # 유리/구성 선택 (선택사항)
│   │       ├── loading/page.tsx     # 견적 계산 로딩 (API 호출)
│   │       ├── result/page.tsx      # 견적 결과 (브랜드 3사 비교)
│   │       ├── consultation/page.tsx # 상담 신청 (요일/시간/방식)
│   │       └── complete/page.tsx    # 완료 화면
│   │
│   ├── components/
│   │   ├── ui/                      # 공통 UI 컴포넌트
│   │   │   ├── index.ts             # barrel export
│   │   │   ├── Button.tsx           # 4 variant, 3 size, loading
│   │   │   ├── Input.tsx            # label, error, suffix, ARIA
│   │   │   ├── Spinner.tsx          # 3 size SVG 스피너
│   │   │   ├── Toast.tsx            # Context + Provider, 3 type
│   │   │   ├── Modal.tsx            # native <dialog>, scrim
│   │   │   ├── Accordion.tsx        # chevron rotate, max-height transition
│   │   │   ├── BottomSheet.tsx      # Framer Motion spring, scrim, ESC
│   │   │   └── CountUp.tsx          # IntersectionObserver + easeOutQuart
│   │   │
│   │   ├── layout/                  # 레이아웃 컴포넌트
│   │   │   ├── index.ts
│   │   │   ├── Header.tsx           # sticky h-14, 로고, 햄버거
│   │   │   ├── Drawer.tsx           # 슬라이드, 포커스 트랩, ESC
│   │   │   └── Footer.tsx           # 회사 정보
│   │   │
│   │   ├── estimate/                # 견적 관련 컴포넌트
│   │   │   ├── index.ts
│   │   │   ├── ProgressIndicator.tsx # 2단계 진행 표시 (dot + line)
│   │   │   ├── StepLayout.tsx       # 공통 Step 레이아웃 (back, progress, next)
│   │   │   └── WindowStepLayout.tsx # 창 서브 플로우 레이아웃 (창 N, step, CTA)
│   │   │
│   │   └── landing/                 # 랜딩 전용 컴포넌트
│   │       ├── StatsSection.tsx     # 실적 섹션 (정적 텍스트)
│   │       ├── FaqSection.tsx       # FAQ 아코디언 (10개 Q&A)
│   │       └── EstimateChart.tsx    # 브랜드 비교 차트 (rAF 애니메이션)
│   │
│   ├── hooks/
│   │   └── useEstimateStore.ts      # Zustand 스토어 (5 Step + Result)
│   │
│   ├── lib/
│   │   ├── utils.ts                 # cn(), formatPhone(), stripPhone(), formatPrice()
│   │   ├── validations.ts           # Zod 스키마 (Step1~5, 상담, 문의)
│   │   ├── storage.ts               # localStorage draft CRUD
│   │   └── prisma.ts                # Prisma 클라이언트 팩토리 (PrismaPg adapter)
│   │
│   ├── types/
│   │   └── index.ts                 # 전체 공유 타입 정의
│   │
│   └── generated/
│       └── prisma/                  # Prisma generate 출력 (gitignore)
│
└── public/
    ├── favicon.ico
    └── images/
        ├── hero-building.jpg        # Hero 배경 이미지
        ├── landing-illustration.svg # Feature 3 일러스트
        ├── logo-ezpz.svg           # 헤더 로고
        ├── logo-lx.png             # LX 하우시스 (Figma 추출)
        ├── logo-kcc.png            # KCC Homecc (Figma 추출)
        └── logo-home.svg           # Home WINDOW 정암 (4파트 SVG 조합)
```

**소스 코드 규모**: 약 2,892줄 (generated 제외)

---

## 4. 개발 진행 기록

### Commit 1: `c488f8b` — 프로젝트 초기화

**범위**: Week 1 (프로젝트 셋업 + 공통 컴포넌트 + 랜딩페이지)

#### 진행 내용
1. **Next.js 프로젝트 생성**
   - `create-next-app`으로 App Router + TypeScript + Tailwind CSS 프로젝트 생성
   - 기존 ezpz 디렉토리에 `.claude/` 폴더가 있어 `create-next-app` 실행 불가
   - **해결**: `/tmp/ezpz-temp`에 프로젝트 생성 후 파일 복사

2. **디자인 토큰 설정** (`globals.css`)
   - Tailwind v4 `@theme inline` 문법으로 커스텀 색상 정의
   - Primary: `#2563EB`, Error: `#DC2626`, Success: `#16A34A`
   - Gray scale 50~900 (Neutral 톤)
   - `focus-visible` 글로벌 스타일, `overflow-hidden` 유틸

3. **공통 타입 정의** (`types/index.ts`)
   - `EstimateInput`, `Address`, `WindowType`, `Dimensions`
   - `BrandEstimate`, `BrandDetail`, `PriceRange`
   - `ConsultationRequest/Response`, `DayOfWeek`, `ConsultationType`
   - `ContactRequest`, `EstimateDraft`

4. **Zod 검증 스키마** (`lib/validations.ts`)
   - `step1Schema`: 이름 2~20자 한글/영문, 전화번호 010 형식
   - `step2Schema`: 주소 필수, 층수 선택(1~99)
   - `windowTypeSchema`: nullable enum
   - `dimensionsSchema`: 100~10,000mm
   - `quantitySchema`: 1~99 정수
   - `consultationSchema`, `contactSchema`

5. **상태 관리** (`hooks/useEstimateStore.ts`)
   - Zustand store: `setStep1`~`setStep5`, `setResult`, `reset`, `loadFromDraft`
   - 5단계 데이터 + 견적 결과를 메모리에 보관

6. **localStorage 유틸** (`lib/storage.ts`)
   - 키: `ezpz_estimate_draft`
   - `saveEstimateDraft()`, `loadEstimateDraft()`, `clearEstimateDraft()`
   - `EstimateDraft` 타입: `{ lastStep, createdAt, data }`

7. **유틸 함수** (`lib/utils.ts`)
   - `cn()`: clsx + tailwind-merge 대용 (단순 필터 조인)
   - `formatPhone()`: `01012345678` → `010-1234-5678` 자동 하이픈
   - `stripPhone()`: 하이픈 제거
   - `formatPrice()`: `1500000` → `150만원`

8. **UI 컴포넌트 8개** (`components/ui/`)
   - `Button`: 4 variant (primary/secondary/outlined/text), 3 size (sm/md/lg), loading 상태, forwardRef
   - `Input`: label, error(`role="alert"`), suffix, `aria-invalid`, `aria-describedby`, forwardRef
   - `Spinner`: sm/md/lg SVG 회전 애니메이션
   - `Toast`: Context 기반 Provider + `useToast()` 훅, success/error/info, 3초 자동 닫힘
   - `Modal`: native `<dialog>`, `showModal()`/`close()`, scrim 클릭 닫기, body overflow 제어
   - `Accordion`: 단일 오픈, chevron 회전 애니메이션, `max-height` transition

9. **레이아웃 컴포넌트 3개** (`components/layout/`)
   - `Header`: sticky `h-14`, ezpz 로고(Link `/`), 햄버거 버튼, Drawer 제어
   - `Drawer`: 우측 슬라이드(80vw, max-w-320px), scrim 오버레이, ESC 닫기, **포커스 트랩** (Tab/Shift+Tab 순환), 포커스 복원
     - 메뉴: 홈, 견적 시작하기, 도움말, 고객센터
   - `Footer`: ezpz space, 이메일, copyright(동적 연도)

10. **랜딩페이지** (`app/page.tsx`)
    - Hero: 다크 배경, 헤드라인 "창호 교체, 어디서부터 시작해야 할지 모르겠다면", CTA
    - Feature 카드 3개: pain-point 기반 카피
    - Stats: 누적 견적 3,000+건, 상담 완료 2,000+건
    - 브랜드 로고 섹션
    - FAQ: 4개 Q&A (`<details>` 네이티브)
    - Bottom CTA: primary 배경, 흰색 테두리 버튼
    - Footer

11. **루트 레이아웃** (`app/layout.tsx`)
    - `<html lang="ko">`, Header, ToastProvider
    - SEO metadata + Open Graph 태그

12. **PRD 문서 4개** + **개발 일정 문서** 작성

#### 발생한 이슈
- `create-next-app`이 기존 디렉토리의 `.claude/` 폴더 때문에 실행 거부 → `/tmp`에서 생성 후 복사
- 복사 후 `node_modules` 손상 (`Cannot find module '../server/require-hook'`) → `rm -rf node_modules && npm install`
- Zod v4에서 `z.enum()` 옵션 `required_error` → `message`로 변경됨

**파일 수**: 37개, **코드 라인**: ~10,046줄 (문서 포함)

---

### Commit 2: `f2a5b77` — 견적 플로우 전체 구현

**범위**: Week 3~5 (견적 입력 5단계 + 결과 + 상담 + 완료 + API)

#### 진행 내용

1. **BottomSheet 컴포넌트** (`components/ui/BottomSheet.tsx`)
   - Framer Motion `animate={{ y: 0 }}` spring 애니메이션
   - scrim 오버레이 (클릭 시 닫기)
   - ESC 키 닫기
   - body overflow 제어

2. **견적 시작 페이지** (`app/estimate/page.tsx`)
   - localStorage에서 이전 draft 확인
   - 있으면 BottomSheet 표시: "이전 견적 불러오기" / "새 견적 확인하기"
   - 없으면 바로 `/estimate/step1`로 이동
   - 불러오기: draft 데이터를 Zustand store에 로드 → `lastStep + 1`로 이동

3. **ProgressIndicator** (`components/estimate/ProgressIndicator.tsx`)
   - 5단계 dot + connector line 진행 표시
   - 상태: 완료(파란 원 + 체크), 현재(파란 원 + ring), 미완료(회색 테두리), 스킵(점선)
   - `role="list"`, `aria-current="step"`, `aria-label="견적 진행 단계"`

4. **StepLayout** (`components/estimate/StepLayout.tsx`)
   - 공통 Step 페이지 레이아웃
   - 뒤로가기 버튼 (backHref 또는 router.back)
   - 제목, ProgressIndicator, 콘텐츠 영역
   - sticky 하단: 건너뛰기(선택) + 다음 버튼
   - Props: `step`, `title`, `onNext`, `nextLabel`, `nextDisabled`, `nextLoading`, `showSkip`, `onSkip`, `backHref`

5. **Step 1 — 기본 정보** (`app/estimate/step1/page.tsx`)
   - 이름 + 전화번호 입력
   - 전화번호 자동 하이픈 포맷팅 (`formatPhone`)
   - 실시간 유효성 검사: `isValid` (이름 2자+한글영문, 010 형식)
   - 제출 시 Zod `step1Schema` 검증
   - Zustand store + localStorage draft 저장

6. **Step 2 — 주소** (`app/estimate/step2/page.tsx`)
   - 카카오 주소 검색 API 연동
     - `window.daum.Postcode` 객체가 있으면 팝업 호출
     - 없으면 `prompt()`로 개발용 fallback
   - 상세 주소 (선택, 최대 100자)
   - 층수 (선택, 1~99 정수)
   - 주소 검색 버튼 스타일: 선택 전 placeholder, 선택 후 실제 주소 표시

7. **Step 3 — 창 유형** (`app/estimate/step3/page.tsx`)
   - 카드형 라디오 선택: 확장 발코니 / 비확장 발코니
   - 각 카드에 제목 + 설명
   - 정보 툴팁 (hover 시 팝오버)
   - **건너뛰기 가능** → `windowType = null`로 저장

8. **Step 4 — 규격** (`app/estimate/step4/page.tsx`)
   - 가로/세로 입력 (mm 단위, `suffix="mm"`)
   - 범위 검증: 100~10,000mm
   - 안내 배너: "창호의 안쪽 치수를 mm 단위로 입력해주세요"
   - **건너뛰기 가능** → `dimensions = null`

9. **Step 5 — 수량** (`app/estimate/step5/page.tsx`)
   - 스테퍼 컴포넌트: −/+ 버튼 + 직접 입력
   - 범위: 1~99, 경계값에서 버튼 비활성화
   - 버튼 레이블: "견적 확인하기" (nextLabel 커스텀)
   - API 호출 (`POST /api/estimates`)
   - 성공 시 store에 결과 저장 → `/estimate/result` 이동
   - 실패 시에도 result 페이지로 이동 (mock 결과 표시)
   - **건너뛰기 가능** → `quantity = null`

10. **견적 결과 페이지** (`app/estimate/result/page.tsx`)
    - 입력 정보 요약 카드 (미입력 항목은 "미입력" 표시)
    - 브랜드 비교 카드 3장 (BrandCard 컴포넌트)
      - 로고, 브랜드명, 설치 실적
      - 예상 견적 범위 (min~max, 만원 단위)
      - 개당/평당 비용
      - 특징 뱃지 3개
      - "상세 보기" 아코디언: 유리 사양, 프레임, 단열, 방음, 보증
    - 면책 문구: "상기 금액은 예상 견적이며..."
    - 하단 CTA: "상담 신청하기" + "홈으로 돌아가기"
    - API 미연결 시 MOCK_RESULTS fallback

11. **상담 신청 페이지** (`app/estimate/consultation/page.tsx`)
    - 기본 정보 읽기 전용 (이름, 연락처, 주소)
    - 요일 선택: 월~금 5개 칩, 복수 선택 (`aria-pressed`)
    - 시간 선택: 2열 8슬롯 (09:00~18:00, 점심 12~13시 제외)
    - 상담 방식: 전화/방문 카드 라디오
    - 3개 모두 선택 시 "상담 신청하기" 버튼 활성화
    - `POST /api/consultations` 호출 → 완료 페이지 이동

12. **완료 페이지** (`app/estimate/complete/page.tsx`)
    - 성공 아이콘 (초록 원 + 체크)
    - "상담 신청 완료" 메시지 + "영업일 1~2일 내 연락"
    - 상담 내역 카드 (이름, 연락처, 주소)
    - "홈으로 돌아가기" + "새 견적 시작하기" CTA
    - `clearEstimateDraft()` — localStorage draft 삭제
    - `history.replaceState` — 뒤로가기 방지

13. **API 라우트 2개** (`app/api/`)
    - `POST /api/estimates`: Zod 검증 → 브랜드별 견적 계산 → 응답
      - 가격 계산 로직: 기본 단가 × 확장 배율(1.15) × 수량
      - LX (35~55만), KCC (30~48만), 청암 (28~42만) 기본 단가
    - `POST /api/consultations`: Zod 검증 → 접수 확인 응답

**파일 수**: 15개 추가, **코드 라인**: +1,563줄

---

### Commit 3: `59f9c68` — 폴리싱 + DB + SEO + 접근성

**범위**: Week 2 일부 + Week 4 일부 + Week 6 일부

#### 진행 내용

1. **랜딩페이지 개선**
   - Feature 카드에 SVG 아이콘 추가 (비용, 비교, 결정)
   - `hover:shadow-md` 호버 효과
   - Hero 그래디언트 오버레이 추가
   - 브랜드 섹션: 소제목 "비교 가능한 브랜드" + hover 컬러 전환(gray-300→gray-700)
   - Bottom CTA: 부제목 "3분이면 충분합니다" 추가
   - 반응형 타이포 개선 (md:text-lg, lg:text-5xl)

2. **CountUp 컴포넌트** (`components/ui/CountUp.tsx`)
   - `IntersectionObserver` (threshold 0.3)로 뷰포트 진입 감지
   - `requestAnimationFrame`으로 부드러운 카운트업
   - `easeOutQuart` (1 - (1-t)⁴) 이징 적용
   - Props: `end`, `duration(=2000ms)`, `suffix`, `className`

3. **StatsSection** (`components/landing/StatsSection.tsx`)
   - CountUp을 사용하는 client 컴포넌트 분리
   - 랜딩 페이지(서버 컴포넌트)에서 분리하여 번들 최적화

4. **Prisma 7 + PostgreSQL 설정**
   - `prisma init --datasource-provider postgresql`
   - `prisma/schema.prisma` 작성:
     - **Estimate** 모델: 5 Step 데이터 + results(Json) + consultations 관계
     - **Consultation** 모델: 견적 참조, 요일 배열, 시간, 방식, 상태
   - `@prisma/adapter-pg` + `pg` 패키지 설치 (Prisma 7 필수)
   - `src/lib/prisma.ts`: `getPrisma()` 팩토리 함수 (글로벌 싱글턴)
   - API 라우트 업데이트: DB 저장 시도 → 실패 시 임시 ID fallback

5. **카카오 주소 검색 SDK**
   - `app/layout.tsx`에 `<Script>` 추가
   - `//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js`
   - `strategy="lazyOnload"` — 페이지 로드 완료 후 비동기 로딩

6. **SEO 최적화**
   - `app/robots.ts`: `/api/`, `/estimate/complete` 차단, sitemap 참조
   - `app/sitemap.ts`: `/`, `/estimate` 경로 등록
   - `app/estimate/layout.tsx`: `robots: { index: false, follow: false }` — 견적 페이지 검색 노출 방지

7. **접근성 개선**
   - Step 3 창 유형: `role="radiogroup"` + `role="radio"` + `aria-checked`
   - 상담 요일: `role="group"` + `aria-pressed` (toggle button 패턴)
   - 상담 시간: `role="radiogroup"` + `role="radio"` + `aria-checked`
   - 상담 방식: `role="radiogroup"` + `role="radio"` + `aria-checked`

#### 발생한 이슈
- Prisma generated 파일 `@/generated/prisma` import 실패 — Turbopack 별칭 미인식
  - `../generated/prisma`로 변경해도 동일
  - **해결**: `../generated/prisma/client` (Prisma 7은 `client.ts`가 진입점)
- `new PrismaClient()` 인자 0개 에러 — Prisma 7은 `adapter` 또는 `accelerateUrl` 필수
  - **해결**: `@prisma/adapter-pg` 설치, `PrismaPg` 어댑터 사용
- `datasourceUrl` 옵션 없음 에러 — Prisma 7 API 변경
  - **해결**: `new PrismaClient({ adapter: new PrismaPg({ connectionString }) })`

**파일 수**: 18개 변경, **코드 라인**: +1,366줄

---

## 5. 파일별 상세 설명

### 공통 UI 컴포넌트

| 파일 | 라인수 | 역할 | 주요 기능 |
|------|--------|------|-----------|
| `Button.tsx` | 91 | 범용 버튼 | 4 variant, 3 size, loading 스피너, `cursor-not-allowed` |
| `Input.tsx` | 63 | 폼 입력 필드 | label-htmlFor, error `role="alert"`, `aria-invalid`, suffix, forwardRef |
| `Spinner.tsx` | 34 | 로딩 인디케이터 | SVG `animate-spin`, sm(16)/md(24)/lg(32)px |
| `Toast.tsx` | 84 | 토스트 메시지 | Context API, `useToast()`, 3 type, 3초 `setTimeout` |
| `Modal.tsx` | 89 | 모달 다이얼로그 | `<dialog>`, `showModal()`/`close()`, `::backdrop`, body overflow |
| `Accordion.tsx` | 63 | 접기/펼치기 | chevron `rotate-180`, `max-height` transition, `overflow-hidden` |
| `BottomSheet.tsx` | 66 | 하단 시트 | Framer Motion `y: '100%' → 0`, spring, scrim `bg-black/50`, ESC |
| `CountUp.tsx` | 61 | 숫자 카운트업 | IntersectionObserver, `requestAnimationFrame`, easeOutQuart |

### 견적 관련 컴포넌트

| 파일 | 역할 | 주요 기능 |
|------|------|-----------|
| `ProgressIndicator.tsx` | 단계 진행바 | 2 dot + 1 connector, completed/current/incomplete |
| `StepLayout.tsx` | Step 공통 레이아웃 | back 버튼, title, progress, content flex-1, sticky bottom buttons |
| `WindowStepLayout.tsx` | 창 서브 플로우 레이아웃 | `창 N` 헤더, step 카운터(1/3), title, helpLink, back, CTA |

### 레이아웃 컴포넌트

| 파일 | 라인수 | 역할 | 주요 기능 |
|------|--------|------|-----------|
| `Header.tsx` | 31 | 상단 헤더 | sticky, z-50, 로고 Link, 햄버거 토글 |
| `Drawer.tsx` | 140 | 사이드 메뉴 | 우측 슬라이드, scrim, ESC, **포커스 트랩** (Tab 순환), 포커스 복원 |
| `Footer.tsx` | 11 | 하단 푸터 | ezpz space, email, `new Date().getFullYear()` |

### 페이지별 상세

| 페이지 | 핵심 로직 |
|--------|-----------|
| `page.tsx` (랜딩) | Hero 이미지 + Features(3) + EstimateChart + Stats(정적) + Brands + FAQ(10) + 플로팅 CTA |
| `estimate/page.tsx` | `loadEstimateDraft()` → draft 있으면 BottomSheet, 없으면 step1 redirect |
| `step1/page.tsx` | `formatPhone` 자동 하이픈, `step1Schema.safeParse`, store+draft 저장 |
| `step2/page.tsx` | `window.daum.Postcode` 팝업 or prompt fallback, 상세주소 |
| `windows/page.tsx` | 창 목록 카드, 추가/편집 버튼, 총 수량, "최종 견적 확인하기" CTA |
| `window/type/page.tsx` | 일반/발코니 2단계 라디오, 확장/비확장 서브셀렉션, 도움말 BottomSheet |
| `window/width/page.tsx` | 대형 폰트 mm 입력, 100~10000 범위, 측정 도움말 BottomSheet |
| `window/height/page.tsx` | 세로 길이 mm 입력 |
| `window/details/page.tsx` | 유리 타입(3종), 구성(3종) 선택, `saveCurrentWindow()` |
| `loading/page.tsx` | Spinner + `POST /api/estimates` → 1.5초 후 result 리다이렉트 |
| `result/page.tsx` | 입력 요약 + BrandCard×3 (가격, 특징, 상세 아코디언) + 면책문 |
| `consultation/page.tsx` | 요일 multi-select + 시간 radio + 방식 radio, API 호출 |
| `complete/page.tsx` | 성공 아이콘, 내역 카드, draft 삭제, `replaceState` |

---

## 6. 디자인 토큰

### 색상 (globals.css `@theme inline`) — Figma 동기화 완료

```
Primary:       #036463 (Teal)
Primary Dark:  #01403F
Primary Light: #E1FFFF

Accent:        #EAFF7C (Lime)
Accent Light:  #FDFFF0

Gray 50:  #FAFAFA    Gray 500: #656565
Gray 100: #F0F0F0    Gray 600: #434343
Gray 200: #D6D6D6    Gray 700: #242424
Gray 300: #AFAFAF    Gray 800: #1A1A1A
Gray 400: #898989    Gray 900: #000000

Error:       #FF6D70
Error Light: #FFF5F4
Success:       #5EE085
Success Light: #F0FCE6

Input BG:    #F0F4F5
Input Light: #FBFBF9
```

### 타이포그래피

- 기본 폰트: Pretendard → system-ui → sans-serif
- 반응형: `text-3xl md:text-4xl lg:text-5xl` (Hero)

### 간격 & 사이즈

- Header 높이: `h-14` (56px)
- 컨텐츠 영역: `min-h-[calc(100vh-56px)]`
- 카드 라운드: `rounded-xl` (12px) ~ `rounded-2xl` (16px)
- 버튼 사이즈: sm `py-1.5`, md `py-2.5`, lg `py-3.5`
- 하단 고정 버튼: `sticky bottom-0`

---

## 7. 데이터 모델

### Zustand Store (`useEstimateStore`)

```typescript
interface EstimateState {
  // User info (optional)
  name: string;
  phone: string;
  // Address
  address: Address | null;
  // Multi-window
  windows: WindowInfo[];         // 완료된 창 목록
  currentWindowIndex: number;    // 현재 편집 중인 인덱스
  editingWindow: Partial<WindowInfo>; // 편집 중 임시 데이터
  // Result
  estimateId: string | null;
  totalPrice: PriceRange | null;
  windowSummary: WindowSummary[];
  brands: BrandEstimate[];
}
```

### localStorage Draft

```typescript
interface EstimateDraft {
  createdAt: string;
  userInfo?: { name: string; phone: string };
  address?: Address;
  windows: Partial<WindowInfo>[];
  currentWindowIndex: number;
  currentStep: string;           // 현재 라우트 경로
}
// 키: 'ezpz_estimate_draft'
```

### Prisma DB 스키마

```
Estimate (1) ──── (*) Consultation
   │                      │
   ├── id (cuid)          ├── id (cuid)
   ├── name?              ├── estimateId (FK)
   ├── phone?             ├── name?
   ├── address            ├── phone?
   ├── windows (Json[])   ├── preferredDays[]
   ├── results (Json)     ├── preferredTime?
   └── createdAt          ├── status (PENDING)
                          └── createdAt
```

---

## 8. API 엔드포인트

### `POST /api/estimates`

**요청**:
```json
{
  "name": "홍길동",
  "phone": "01012345678",
  "address": { "zonecode": "06234", "address": "서울시 강남구..." },
  "windowType": "expanded",      // null 가능
  "dimensions": { "width": 1800, "height": 2400 },  // null 가능
  "quantity": 4                   // null 가능
}
```

**응답** (200):
```json
{
  "estimateId": "clxxx...",
  "results": [
    {
      "brand": "LX",
      "brandName": "LX 하우시스",
      "minPrice": 1610000,
      "maxPrice": 2530000,
      "pricePerUnit": { "min": 402500, "max": 632500 },
      "pricePerPyeong": { "min": 181125, "max": 284625 },
      "installationCount": 2847,
      "features": ["국내 1위 브랜드", ...],
      "details": { "glassType": "로이 삼중유리 (24mm)", ... }
    },
    // KCC, 청암 동일 구조
  ]
}
```

**가격 계산 로직**:
- 기본 단가 × 확장 배율(1.15) × 수량(기본 4)
- 평당 = 단가 × 0.45
- LX: 35~55만 / KCC: 30~48만 / 청암: 28~42만 (개당 기본)

### `POST /api/consultations`

**요청**:
```json
{
  "estimateId": "clxxx...",
  "name": "홍길동",
  "phone": "01012345678",
  "address": "서울시 강남구...",
  "availableDays": ["MON", "WED", "FRI"],
  "timeSlot": "14:00-15:00",
  "consultationType": "VISIT"
}
```

**응답** (201):
```json
{
  "consultationId": "clyyy...",
  "message": "상담 신청이 접수되었습니다. 영업일 기준 1~2일 이내에 연락드리겠습니다."
}
```

---

## 9. 트러블슈팅

### 이슈 1: create-next-app 디렉토리 충돌
- **문제**: 기존 ezpz 디렉토리에 `.claude/` 폴더가 있어 `create-next-app` 실행 거부
- **원인**: `create-next-app`은 빈 디렉토리만 허용
- **해결**: `/tmp/ezpz-temp`에 프로젝트 생성 → `.claude/`와 `docs/` 제외하고 전체 복사

### 이슈 2: node_modules 손상
- **문제**: 파일 복사 후 `npx next build` 시 `Cannot find module '../server/require-hook'`
- **원인**: `/tmp`에서 복사한 node_modules가 경로 의존성 깨짐
- **해결**: `rm -rf node_modules && npm install`

### 이슈 3: Zod v4 API 변경
- **문제**: `z.enum(['PHONE', 'VISIT'], { required_error: '...' })` 타입 에러
- **원인**: Zod v4에서 enum 옵션의 `required_error` 제거, `message`로 대체
- **해결**: `{ message: '상담 방식을 선택해주세요' }`로 변경

### 이슈 4: Prisma 7 import 경로
- **문제**: `@/generated/prisma`로 import 시 Turbopack `Module not found`
- **원인**: Prisma 7은 `client.ts`가 진입점이며, 디렉토리 자체는 모듈이 아님
- **시도 1**: `../generated/prisma` (상대 경로) → 동일 에러
- **해결**: `../generated/prisma/client`로 명시적 파일 지정

### 이슈 5: PrismaClient 생성자 인자
- **문제**: `new PrismaClient()` → "Expected 1 arguments, but got 0"
- **원인**: Prisma 7은 `adapter` 또는 `accelerateUrl` 필수
- **시도 1**: `{ datasourceUrl: process.env.DATABASE_URL }` → `datasourceUrl` 속성 없음
- **해결**: `@prisma/adapter-pg` 설치 → `new PrismaClient({ adapter: new PrismaPg({ connectionString }) })`

### 이슈 6: DB 없이 빌드
- **문제**: DB 연결 없이 빌드 시 Prisma 클라이언트 초기화 실패 가능성
- **해결**: API 라우트에서 `dynamic import` + `try/catch` 패턴 적용
  - DB 연결 성공 → Prisma로 저장, 실제 ID 반환
  - DB 연결 실패 → 임시 ID 생성, 계산 결과만 반환 (graceful fallback)

### 이슈 7: Tailwind v4 커스텀 애니메이션 미적용
- **문제**: `globals.css`에 `@keyframes` + `.animate-estimate-slide` class 정의했으나 적용 안 됨
- **원인**: Tailwind v4에서는 커스텀 애니메이션을 `@theme`에 `--animate-*` 변수로 등록해야 함
- **시도 1**: CSS class로 직접 정의 → Tailwind가 인식하지 못함
- **해결**: `@theme { --animate-estimate-slide: estimate-slide 8s ease-in-out infinite; }`
- **최종**: `requestAnimationFrame` 기반 컴포넌트로 전환하여 CSS 애니메이션 불필요

### 이슈 8: Figma SVG 로고 조합
- **문제**: Home WINDOW 로고가 Figma에서 4개 별도 벡터 그룹으로 제공
- **원인**: Figma에서 그룹이 아닌 개별 레이어로 내보내기
- **해결**: 4개 SVG 파일의 path 데이터를 하나의 SVG에 `<g transform="translate(x,y)">` 로 조합
- **좌표**: House icon (0,0), Home text (40.89, 4.2), WINDOW text (40.88, 28.55), Korean text (86.61, 28.6)

---

## 10. 현재 상태 및 남은 작업

### 빌드 상태

```
Route (app)
├ ○ /                         ← 랜딩페이지
├ ƒ /api/estimates            ← 견적 API
├ ƒ /api/consultations        ← 상담 API
├ ○ /estimate                 ← 시작 (BottomSheet)
├ ○ /estimate/step1           ← 이름/전화번호
├ ○ /estimate/step2           ← 주소
├ ○ /estimate/windows         ← 창 목록 관리
├ ○ /estimate/window/type     ← 창 유형
├ ○ /estimate/window/width    ← 가로 길이
├ ○ /estimate/window/height   ← 세로 길이
├ ○ /estimate/window/details  ← 유리/구성 (선택)
├ ○ /estimate/loading         ← 계산 로딩
├ ○ /estimate/result          ← 결과 비교
├ ○ /estimate/consultation    ← 상담 신청
├ ○ /estimate/complete        ← 완료
├ ○ /robots.txt               ← SEO
└ ○ /sitemap.xml              ← SEO
```

### Session 4: WIP — 아키텍처 전환 + 랜딩 피그마 싱크

**범위**: 견적 프로세스 아키텍처 전환 (5-step 선형 → 멀티 윈도우) + 랜딩페이지 Figma 디자인 싱크 + UI 폴리싱

#### 1. 견적 프로세스 아키텍처 전환

기존 5-step 선형 플로우를 **멀티 윈도우 서브 플로우** 구조로 전면 재설계.

**이전 구조** (삭제):
```
/estimate/step1 → step2 → step3 → step4 → step5 → result
```

**새 구조**:
```
/estimate → step1(이름/전화) → step2(주소) → windows(창 목록)
                                                  ↓
                                           window/type → window/width → window/height → window/details
                                                  ↓
                                           windows → loading → result → consultation → complete
```

**삭제된 파일**:
- `src/app/estimate/step3/page.tsx` — 창 유형 (단일)
- `src/app/estimate/step4/page.tsx` — 규격 (단일)
- `src/app/estimate/step5/page.tsx` — 수량 (단일)

**신규 파일**:

| 파일 | 역할 |
|------|------|
| `src/app/estimate/windows/page.tsx` | 창 목록 관리 (추가/편집/삭제, 총 수량) |
| `src/app/estimate/window/type/page.tsx` | 창 유형 선택 (일반/발코니→확장/비확장) + 도움말 BottomSheet |
| `src/app/estimate/window/width/page.tsx` | 가로 길이 입력 (mm, 대형 폰트) + 측정 도움말 BottomSheet |
| `src/app/estimate/window/height/page.tsx` | 세로 길이 입력 (mm) |
| `src/app/estimate/window/details/page.tsx` | 유리/구성 선택 (선택사항) → `saveCurrentWindow()` |
| `src/app/estimate/loading/page.tsx` | 견적 계산 로딩 (Spinner + API 호출 → result 리다이렉트) |
| `src/components/estimate/WindowStepLayout.tsx` | 창 서브 플로우 공통 레이아웃 (`창 N`, step 표시, back, CTA) |

#### 2. 타입 시스템 전면 재설계 (`types/index.ts`)

```typescript
// 신규 타입
export type GlassType = 'clear' | 'lowe' | 'super-double-lowe';
export type WindowConfig = 'fix' | '2w' | '3w';

export interface WindowInfo {
  id: string;           // crypto.randomUUID()
  windowType: WindowType;
  width: number;        // mm
  height: number;       // mm
  glassType?: GlassType;
  windowConfig?: WindowConfig;
  quantity: number;      // default 1
}

export interface EstimateInput {
  name?: string;         // 선택 (기존: 필수)
  phone?: string;        // 선택 (기존: 필수)
  address: Address;
  windows: WindowInfo[]; // 복수 창 (기존: 단일)
}
```

**결과 타입도 변경**: `BrandEstimate`에 `priceRange`, `installationCost`, `description`, `promotions`, `logoUrl` 추가. `WindowSummary` 신규. `ConsultationRequest` 간소화.

#### 3. Zustand 스토어 재설계 (`useEstimateStore.ts`)

```typescript
// 멀티 윈도우 관련 신규 state
windows: WindowInfo[];
currentWindowIndex: number;
editingWindow: Partial<WindowInfo>;

// 신규 actions
startNewWindow()     // 새 창 추가 시작
editWindow(index)    // 기존 창 편집
setWindowType/Width/Height/Details()  // 단계별 입력
saveCurrentWindow()  // 편집 완료 → windows 배열에 저장
removeWindow(index)  // 창 삭제
```

#### 4. 디자인 토큰 Figma 싱크 (`globals.css`)

| 변경 전 | 변경 후 | 비고 |
|---------|---------|------|
| `#2563EB` (Blue) | `#036463` (Teal) | Primary 색상 전면 변경 |
| `#1D4ED8` | `#01403F` | Primary Dark |
| `#DBEAFE` | `#E1FFFF` | Primary Light |
| `#F59E0B` (Amber) | `#EAFF7C` (Lime) | Accent 색상 변경 |
| Neutral Gray | Figma Foundation Gray | 50~900 전체 교체 |
| `#DC2626` | `#FF6D70` | Error |
| `#16A34A` | `#5EE085` | Success |
| - | `#F0F4F5`, `#FBFBF9` | Input 배경 신규 |

#### 5. PRD 문서 전면 재작성

4개 PRD 문서를 Figma IA/UserFlow/디자인과 완전 동기화:
- `PRD.md`: 라우트 구조, 컴포넌트 트리, 데이터 모델 전체 갱신
- `PRD-01-landing.md`: Figma 디자인 기반 섹션별 상세 스펙
- `PRD-02-estimate-process.md`: 멀티 윈도우 플로우 반영
- `PRD-03-estimate-result.md`: 결과/상담/완료 화면 갱신

#### 6. 랜딩페이지 Figma 디자인 싱크 (`page.tsx`)

| 변경 | 상세 |
|------|------|
| Hero | 다크 배경 → 이미지 배경 + 하단 그래디언트 오버레이 |
| Feature 카드 | SVG 아이콘 + 호버 카드 → 텍스트 + 인라인 목업 이미지 |
| Feature 2 | 정적 이미지 → `EstimateChart` 애니메이션 컴포넌트 |
| Stats | CountUp 애니메이션 → 정적 텍스트 ("3K +", "2K +") |
| 브랜드 | 가로 나열 → 세로 중앙 정렬, Figma 로고 이미지 사용 |
| FAQ | `<details>` 네이티브 → `FaqSection` 클라이언트 컴포넌트 (10개 Q&A) |
| CTA | 하단 고정 + 그래디언트 배경 + accent 색상 |

#### 7. 브랜드 비교 차트 애니메이션 (`EstimateChart.tsx`, 신규)

`requestAnimationFrame` 기반 독립 애니메이션 컴포넌트:

```typescript
const A = { name: 'A사', baseLeft: 22, width: 35, period: 3.5, amplitude: 8 };
const BRANDS = [A, B사, C사]; // 각각 다른 period/amplitude
```

- 각 브랜드 바가 독립적으로 좌우 사인파 움직임 (`Math.sin(elapsed * 2π / period) * amplitude`)
- A사 바 양 끝에 가격 말풍선 오버레이 (700만원 ~ 800만원)
- 가격이 바 움직임에 연동되어 실시간 변동
- `will-change-transform`으로 GPU 가속

#### 8. FAQ 섹션 분리 (`FaqSection.tsx`, 신규)

- 10개 Q&A (Figma PRD 기반)
- 단일 오픈 아코디언 (첫 번째 기본 열림)
- `+` / `×` 아이콘 토글
- `aria-expanded` 접근성

#### 9. Drawer 스크롤 잠금 개선 (`Drawer.tsx`)

```typescript
// 이전: body.classList.add('overflow-hidden')
// 이후: html position:fixed + scroll position 보존
const html = document.documentElement;
html.style.position = 'fixed';
html.style.top = `-${scrollY}px`;
html.style.width = '100%';
```

닫을 때 `window.scrollTo()`로 원래 스크롤 위치 복원. `html`에 적용하여 iOS Safari 호환성 확보.

#### 10. 기타 변경

- **Viewport 메타**: `maximumScale: 1` 추가 (모바일 자동 확대 방지)
- **Header**: 메뉴 항목 텍스트 변경 ("내 견적 조회하기", "도움말", "고객센터")
- **로고 에셋**: Figma에서 재추출 (LX PNG, KCC PNG, Home WINDOW SVG 재조합)
- **ProgressIndicator**: Step 3 제거 (5 → 2단계)
- **StepLayout**: 멀티 윈도우 구조 지원 위한 props 조정
- **Prisma 스키마**: `WindowInfo` 배열 지원을 위한 Json 필드 추가
- **API**: 멀티 윈도우 입력 처리, `BrandEstimate` 응답 구조 변경

#### 트러블슈팅

| 이슈 | 원인 | 해결 |
|------|------|------|
| Tailwind v4 커스텀 애니메이션 미적용 | CSS class만 정의, `@theme` 미등록 | `@theme`에 `--animate-*` 변수로 등록 |
| 차트 전체 슬라이딩 | 컨테이너에 애니메이션 적용 | 각 바 개별 `requestAnimationFrame` |
| 가격 레이블 레이아웃 깨짐 | 별도 행으로 배치 | 바 트랙 위에 `absolute` 오버레이 |
| Drawer 배경 확대 의심 | scrim 오버레이에 의한 시각적 착각 | 실제 확대 없음 확인 (macOS Chrome) |

**변경 규모**: 28개 파일, +1,387줄 / -2,443줄

---

### Session 5: 배포 준비 + 반응형 + Coming soon

**범위**: GitHub 레포 생성/push, Vercel 배포 준비, 반응형 레이아웃, Drawer 버그 수정, 임시 Coming soon 처리

#### 1. GitHub 레포 생성 및 push

- `ezpz-space/web-client` private 레포 생성
- `origin` remote 연결, `master` → `main` 브랜치 변경
- 전체 커밋 이력 push 완료

#### 2. Vercel 배포 준비

- **Prisma generate 빌드 에러 해결**: `package.json`에 `"postinstall": "prisma generate"` 추가
  - Vercel에서 `npm install` 후 자동으로 Prisma 클라이언트 생성
- `README.md` 작성 (프로젝트 개요, 기술 스택, 시작 가이드, 구조, 문서 링크)

#### 3. 반응형 레이아웃 (모바일 → 태블릿 → PC)

Figma 3개 프레임(모바일 `123:5260`, 태블릿 `359:19519`, PC `354:102363`) 기반으로 Tailwind 반응형 클래스 적용.

| 컴포넌트 | 모바일/태블릿 | PC (`lg:` 1024px+) |
|----------|-------------|---------------------|
| **Header** | 로고만 (메뉴 숨김 상태) | 로고 + 텍스트 네비게이션 (주석 처리 상태) |
| **Hero** | 이미지 위 + 텍스트 아래 | 텍스트 좌 + 이미지 우 2col + 인라인 CTA |
| **Feature 1~3** | 세로 1col | 텍스트 + 이미지 가로 2col (Feature 2는 reverse) |
| **Stats** | 세로 배치 | 가로 나란히 (`lg:flex-row`) |
| **Brands** | 세로 정렬 | 가로 나란히 (`md:flex-row`) |
| **FAQ** | 전체 폭 | `max-w-3xl` 제한 |
| **Floating CTA** | 하단 고정 | 숨김 → Hero에 인라인 CTA |

**변경 파일**: `page.tsx`, `Header.tsx`, `StatsSection.tsx`, `FaqSection.tsx`

#### 4. Drawer 스크롤 복귀 버그 수정

- **문제**: Drawer 닫을 때 메인페이지 스크롤이 최상단으로 이동
- **원인**: `html` element에 `position: fixed` + `top: -scrollY` 방식의 스크롤 잠금이 복원 시 실패
- **해결**: `position: fixed` 방식 제거 → 단순 `body.style.overflow = 'hidden'`으로 변경
  - Drawer 자체가 `fixed` 오버레이이므로 body 위치 변경 불필요

#### 5. Coming soon 임시 처리

- **Header**: 햄버거 메뉴 버튼, 데스크탑 네비게이션, Drawer 모두 주석 처리
- **CTA 버튼**: `Link`에서 `button`으로 변경, 클릭 시 "Coming soon" 모달 표시
- `ComingSoonCTA` 클라이언트 컴포넌트 신규 생성
  - `variant="hero"`: 데스크탑 Hero 영역 인라인 CTA
  - `variant="floating"`: 모바일/태블릿 하단 고정 CTA
  - `ComingSoonModal`: scrim + 중앙 카드 ("Coming soon / 서비스 준비 중입니다.")

#### 커밋 이력

```
47d7ecc feat: 메뉴 버튼 임시 숨김 + 견적 알아보기 Coming soon 모달 추가
e6be9d0 feat: add responsive layout for tablet/PC + fix drawer scroll reset
fb63b92 fix: add postinstall script for Prisma generate on Vercel
6c75dfd docs: add README
afe994f chore: remove accidentally committed .next trace files
```

---

### Git 커밋 이력 (전체)

```
47d7ecc feat: 메뉴 버튼 임시 숨김 + 견적 알아보기 Coming soon 모달 추가
e6be9d0 feat: add responsive layout for tablet/PC + fix drawer scroll reset
fb63b92 fix: add postinstall script for Prisma generate on Vercel
6c75dfd docs: add README
afe994f chore: remove accidentally committed .next trace files
902cca7 feat: multi-window estimate architecture + Figma design sync
59f9c68 feat: add landing polish, Prisma DB, SEO, accessibility improvements
f2a5b77 feat: implement complete estimate flow (Steps 1-5, result, consultation, complete)
c488f8b chore: initialize Next.js 14+ project with ezpz foundation
```

### 완료된 작업

- [x] 프로젝트 초기화 (Next.js, Tailwind, ESLint, TypeScript)
- [x] 디자인 토큰 Figma 동기화 (Teal primary, Lime accent, Foundation Gray)
- [x] 공통 UI 컴포넌트 8개
- [x] 레이아웃 컴포넌트 3개 (Header, Drawer, Footer)
- [x] Zustand 상태 관리 (멀티 윈도우 구조)
- [x] Zod 검증 스키마 전체
- [x] 타입 시스템 전체 (멀티 윈도우, WindowInfo, GlassType, WindowConfig)
- [x] 랜딩페이지 Figma 디자인 싱크 (Hero, Features, EstimateChart, Stats, Brands, FAQ, CTA)
- [x] 반응형 레이아웃 (모바일/태블릿/PC — Tailwind `md:`, `lg:`)
- [x] EstimateChart 애니메이션 (rAF 기반 독립 사인파 바 + 가격 연동)
- [x] FaqSection 컴포넌트 (10개 Q&A, 단일 오픈 아코디언)
- [x] 견적 시작 (BottomSheet, draft 불러오기)
- [x] Step 1~2 (이름/전화, 주소)
- [x] 멀티 윈도우 서브 플로우 (type → width → height → details → windows 목록)
- [x] WindowStepLayout 공통 컴포넌트
- [x] 견적 로딩 페이지 (API 호출 + Spinner)
- [x] API 라우트 2개 (estimates, consultations) — 멀티 윈도우 대응
- [x] 견적 결과 페이지 (브랜드 비교 카드)
- [x] 상담 신청 페이지 (요일/시간/방식)
- [x] 완료 페이지 (draft 정리, 뒤로가기 방지)
- [x] Prisma 7 + PostgreSQL 스키마 (WindowInfo Json 배열)
- [x] 카카오 주소 SDK 연동
- [x] SEO (robots.txt, sitemap.xml, metadata)
- [x] 접근성 (ARIA roles, radiogroup, pressed)
- [x] Drawer 스크롤 버그 수정 (overflow hidden 방식)
- [x] 브랜드 로고 Figma 재추출 (LX, KCC, Home WINDOW)
- [x] GitHub 레포 생성 (`ezpz-space/web-client`, private)
- [x] Vercel 배포 준비 (postinstall, README)
- [x] Coming soon 모달 (견적 CTA 임시 처리)

### 남은 작업

| 우선순위 | 작업 | 상세 |
|----------|------|------|
| P0 | Vercel 배포 완료 | GitHub 연결, 환경 변수, 도메인(ezpzspace.com) 설정 |
| P0 | DB 연결 | PostgreSQL 인스턴스 생성 (Supabase/Neon), `DATABASE_URL` 설정, `prisma migrate dev` |
| P1 | Coming soon 해제 | 견적 플로우 연결, 메뉴 버튼 복원 |
| P1 | GA4 이벤트 트래킹 | CTA 클릭, 견적 완료, 상담 신청 이벤트 |
| P1 | Sentry 에러 트래킹 | 프론트/백 에러 모니터링 |
| P1 | Lighthouse 최적화 | LCP < 2.5s, CLS < 0.1, 이미지 최적화 |
| P2 | 도움말 페이지 | `/help`, `/help/:id` (후순위) |
| P2 | 고객센터 페이지 | `/contact` 문의 폼 (후순위) |
| P2 | 이메일/SMS 알림 | 상담 접수 확인 알림 |
| P3 | E2E 테스트 | Playwright 자동화 |
| P3 | 관리자 페이지 | 견적/상담 관리, CMS |

### 로컬 개발 실행

```bash
# 의존성 설치
npm install

# Prisma 클라이언트 생성
npx prisma generate

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

### 환경 변수 (.env)

```env
# DB 연결 (Supabase/Neon)
DATABASE_URL="postgresql://user:pass@host:5432/ezpz?sslmode=require"
```

> **참고**: DATABASE_URL 미설정 시에도 앱은 정상 동작합니다. API가 DB 저장에 실패하면 임시 ID를 생성하고 계산 결과만 반환합니다.
