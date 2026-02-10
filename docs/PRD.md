# PRD: ezpz — 창호 견적 비교 웹서비스

> **프로젝트**: ezpz
> **버전**: 1.0
> **최종 수정**: 2026-02-10
> **도메인**: ezpzspace.com

---

## 1. 프로젝트 개요

### 1.1 한 줄 소개

창호(샤시) 교체 견적을 비대면으로 비교할 수 있는 모바일 퍼스트 반응형 웹 서비스

### 1.2 문제 정의

- 창호 교체 시 여러 업체에 개별 연락해야 하는 번거로움
- 브랜드/가격 비교가 어려워 합리적 의사결정 곤란
- 대면 견적 방문의 시간적/심리적 부담

### 1.3 해결 방안

- 3분 내 기본 정보 입력으로 LX, KCC, 청암 등 브랜드별 예상 견적 비교
- 원하면 전문가 상담(전화/방문) 신청까지 원스톱 진행

### 1.4 User Story

| # | 사용자 | 행위 | 목적 |
|---|--------|------|------|
| US-1 | 잠재 고객 | 랜딩페이지에서 서비스 가치를 확인한다 | 서비스 신뢰 후 견적 시작 |
| US-2 | 잠재 고객 | 이름, 전화번호, 주소를 입력한다 | 기본 견적 산출을 위해 |
| US-3 | 잠재 고객 | 창 유형, 규격, 갯수를 입력한다 (선택) | 더 정확한 견적을 위해 |
| US-4 | 잠재 고객 | 브랜드별 예상 견적을 비교한다 | 합리적 의사결정을 위해 |
| US-5 | 잠재 고객 | 전문가 상담을 신청한다 | 실제 시공 진행을 위해 |
| US-6 | 잠재 고객 | 도움말을 확인한다 | 창호 관련 지식 습득 |
| US-7 | 잠재 고객 | 고객센터에 문의한다 | 추가 질문 해결 |

---

## 2. User Flow

```
[랜딩페이지]
    │
    ├── CTA "무료 견적 시작하기"
    │       │
    │       ▼
    │   [이전 견적 있음?]
    │       │
    │       ├── Yes → [Bottom Sheet: 불러오기 / 새로 시작]
    │       │              ├── 불러오기 → [마지막 완료 Step + 1]
    │       │              └── 새로 시작 → [Step 1]
    │       │
    │       └── No → [Step 1: 이름, 전화번호]
    │                    │
    │                    ▼
    │                [Step 2: 주소, 층수]
    │                    │
    │                    ▼
    │                [Step 3: 창 유형 선택]
    │                    │
    │                    ├── 선택 → [Step 4]
    │                    └── Skip → [Step 4]
    │                                │
    │                                ▼
    │                           [Step 4: 규격 입력]
    │                                │
    │                                ├── 입력 → [Step 5]
    │                                └── Skip → [Step 5]
    │                                            │
    │                                            ▼
    │                                       [Step 5: 갯수 입력]
    │                                            │
    │                                            ├── 입력 → [API 호출]
    │                                            └── Skip → [API 호출]
    │                                                          │
    │                                                          ▼
    │                                                     [견적 결과]
    │                                                          │
    │                                                          ├── "상담 신청하기"
    │                                                          │       │
    │                                                          │       ▼
    │                                                          │   [상담 신청 폼]
    │                                                          │       │
    │                                                          │       ▼
    │                                                          │   [완료 화면] → [홈]
    │                                                          │
    │                                                          └── "홈으로 돌아가기" → [홈]
    │
    ├── 햄버거 메뉴
    │       ├── 홈
    │       ├── 견적 시작하기
    │       ├── 도움말 → [도움말 목록] → [도움말 상세]
    │       └── 고객센터 → [문의 폼] → [접수 완료]
    │
    └── 스크롤
        ├── Feature 섹션
        ├── 실적 섹션
        ├── 브랜드 섹션
        ├── FAQ 아코디언
        └── 하단 CTA
```

---

## 3. Information Architecture (IA)

```
ezpz
├── 홈 (/)
│   ├── Header (로고 + 햄버거 메뉴)
│   ├── Hero 섹션
│   ├── Feature 섹션
│   ├── 실적 섹션
│   ├── 브랜드 섹션
│   ├── FAQ 아코디언
│   ├── 하단 CTA
│   └── Footer
│
├── 견적 프로세스 (/estimate)
│   ├── 견적 시작 (Bottom Sheet)
│   ├── Step 1: 필수 정보 (/estimate/step1)
│   ├── Step 2: 주소 (/estimate/step2)
│   ├── Step 3: 창 유형 (/estimate/step3)
│   ├── Step 4: 규격 (/estimate/step4)
│   ├── Step 5: 갯수 (/estimate/step5)
│   ├── 견적 결과 (/estimate/result)
│   ├── 상담 신청 (/estimate/consultation)
│   └── 완료 (/estimate/complete)
│
├── 도움말 (/help)
│   ├── 도움말 목록
│   └── 도움말 상세 (/help/:id)
│
├── 고객센터 (/contact)
│
└── Drawer 메뉴 (전역 오버레이)
```

---

## 4. 전체 페이지 & 라우트 목록

| # | 라우트 | 페이지명 | PRD 문서 | 설명 |
|---|--------|----------|----------|------|
| 1 | `/` | 랜딩페이지 | PRD-01 | 서비스 소개, CTA |
| 2 | `/estimate` | 견적 시작 | PRD-02 | Bottom Sheet (이전 견적 분기) |
| 3 | `/estimate/step1` | Step 1 | PRD-02 | 이름, 전화번호 |
| 4 | `/estimate/step2` | Step 2 | PRD-02 | 주소, 층수 |
| 5 | `/estimate/step3` | Step 3 | PRD-02 | 창 유형 선택 |
| 6 | `/estimate/step4` | Step 4 | PRD-02 | 규격 입력 |
| 7 | `/estimate/step5` | Step 5 | PRD-02 | 갯수 입력 |
| 8 | `/estimate/result` | 견적 결과 | PRD-03 | 브랜드별 비교 카드 |
| 9 | `/estimate/consultation` | 상담 신청 | PRD-03 | 일정 및 방식 선택 |
| 10 | `/estimate/complete` | 완료 | PRD-03 | 성공 메시지 |
| 11 | `/help` | 도움말 목록 | PRD-01 | 가이드 카드 목록 |
| 12 | `/help/:id` | 도움말 상세 | PRD-01 | 개별 가이드 콘텐츠 |
| 13 | `/contact` | 고객센터 | PRD-01 | 문의 폼 |

---

## 5. 공통 UI 컴포넌트

| 컴포넌트 | 설명 | 사용 위치 |
|----------|------|-----------|
| `Header` | 로고 + 햄버거 아이콘, sticky | 전체 |
| `Drawer` | 사이드 메뉴 (오버레이) | 전체 |
| `Button` | Primary / Secondary / Text 버튼 | 전체 |
| `Input` | 텍스트 입력 (label, placeholder, error) | Step 1, 2, 4, 고객센터 |
| `Select` | 드롭다운 선택 | 필요 시 |
| `Card` | 정보 카드 (브랜드, 도움말 등) | 견적 결과, 도움말 |
| `BottomSheet` | 하단 슬라이드 업 패널 | 견적 시작 |
| `ProgressIndicator` | 5단계 진행 바 | 견적 프로세스 |
| `Accordion` | 접힘/펼침 리스트 | FAQ, 견적 상세 |
| `Stepper` | +/− 수량 조절 | Step 5 |
| `Tooltip` | 정보 툴팁 (ⓘ) | Step 3, 4 |
| `Toast` | 알림 메시지 (하단 팝업) | 에러/성공 알림 |
| `Modal` | 확인 모달 | 정보 수정, 에러 |
| `Spinner` | 로딩 인디케이터 | API 호출 중 |
| `Footer` | 회사 정보, 저작권 | 랜딩페이지 |
| `DaySelector` | 요일 복수 선택 칩 | 상담 신청 |
| `TimeGrid` | 시간대 그리드 선택 | 상담 신청 |

---

## 6. 데이터 모델

### 6.1 사용자 입력 (클라이언트)

```typescript
interface EstimateInput {
  // Step 1 - 필수
  name: string;
  phone: string;

  // Step 2 - 주소 필수, 층수 선택
  address: {
    zonecode: string;
    address: string;
    addressDetail?: string;
    floor?: number;       // 선택 (미입력 허용)
  };

  // Step 3 - 선택 (Skip 가능)
  windowType: 'expanded' | 'non-expanded' | null;

  // Step 4 - 선택 (Skip 가능)
  dimensions: {
    width: number;   // mm
    height: number;  // mm
  } | null;

  // Step 5 - 선택 (Skip 가능)
  quantity: number | null;
}
```

### 6.2 견적 결과 (서버 응답)

```typescript
interface EstimateResponse {
  estimateId: string;
  results: BrandEstimate[];
}

interface BrandEstimate {
  brand: 'LX' | 'KCC' | 'CHUNGAM';
  brandName: string;
  logoUrl: string;
  minPrice: number;
  maxPrice: number;
  pricePerUnit: {
    min: number;
    max: number;
  };
  pricePerPyeong: {        // 평당 비용
    min: number;
    max: number;
  };
  installationCount: number;  // 설치사업 건수
  features: string[];
  details: {
    glassType: string;
    frameMaterial: string;
    thermalPerformance: string;
    soundInsulation: string;
    warrantyYears: number;
  };
}
```

### 6.3 상담 신청

```typescript
interface ConsultationRequest {
  estimateId: string;
  name: string;
  phone: string;
  address: string;
  availableDays: ('MON' | 'TUE' | 'WED' | 'THU' | 'FRI')[];
  timeSlot: string;           // "09:00-10:00"
  consultationType: 'PHONE' | 'VISIT';
}

interface ConsultationResponse {
  consultationId: string;
  message: string;
}
```

### 6.4 고객 문의

```typescript
interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  content: string;
}
```

### 6.5 DB 스키마 (참고)

```
estimates
├── id (PK, UUID)
├── name (VARCHAR)
├── phone (VARCHAR)
├── address (JSONB)
├── window_type (ENUM, nullable)
├── dimensions (JSONB, nullable)
├── quantity (INT, nullable)
├── results (JSONB)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

consultations
├── id (PK, UUID)
├── estimate_id (FK → estimates.id)
├── available_days (VARCHAR[])
├── time_slot (VARCHAR)
├── consultation_type (ENUM: PHONE, VISIT)
├── status (ENUM: PENDING, CONFIRMED, COMPLETED, CANCELLED)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

contacts
├── id (PK, UUID)
├── name (VARCHAR)
├── email (VARCHAR)
├── phone (VARCHAR)
├── content (TEXT)
├── status (ENUM: RECEIVED, REPLIED, CLOSED)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

help_articles
├── id (PK, UUID)
├── title (VARCHAR)
├── description (VARCHAR)
├── content (TEXT / Markdown)
├── thumbnail_url (VARCHAR)
├── sort_order (INT)
├── published (BOOLEAN)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

---

## 7. API Endpoint 설계

### 7.1 견적

| Method | Endpoint | 설명 | Request | Response |
|--------|----------|------|---------|----------|
| `POST` | `/api/estimates` | 견적 생성 | `EstimateInput` | `EstimateResponse` |
| `GET` | `/api/estimates/:id` | 견적 조회 | — | `EstimateResponse` |

### 7.2 상담

| Method | Endpoint | 설명 | Request | Response |
|--------|----------|------|---------|----------|
| `POST` | `/api/consultations` | 상담 신청 | `ConsultationRequest` | `ConsultationResponse` |

### 7.3 고객센터

| Method | Endpoint | 설명 | Request | Response |
|--------|----------|------|---------|----------|
| `POST` | `/api/contact` | 문의 접수 | `ContactRequest` | `{ success, message }` |

### 7.4 도움말

| Method | Endpoint | 설명 | Request | Response |
|--------|----------|------|---------|----------|
| `GET` | `/api/help` | 도움말 목록 | — | `HelpArticle[]` |
| `GET` | `/api/help/:id` | 도움말 상세 | — | `HelpArticle` |

### 7.5 공통 Response 형식

```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

에러 시:
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "입력 정보를 확인해주세요",
    "details": [
      { "field": "phone", "message": "올바른 전화번호를 입력해주세요" }
    ]
  }
}
```

---

## 8. 기술 스택

### 8.1 프론트엔드

| 항목 | 기술 | 이유 |
|------|------|------|
| 프레임워크 | **Next.js 14+** (App Router) | SSR/SSG, 라우팅, SEO |
| 언어 | **TypeScript** | 타입 안전성 |
| 스타일링 | **Tailwind CSS** | 모바일 퍼스트, 유틸리티 기반 |
| 상태 관리 | **Zustand** (또는 React Context) | 경량, Step간 상태 공유 |
| 폼 관리 | **React Hook Form + Zod** | 유효성 검증, 성능 |
| 주소 검색 | **카카오 주소 API** | 국내 주소 표준 |
| 애니메이션 | **Framer Motion** | 페이지 전환, Bottom Sheet |
| HTTP | **Axios** (또는 fetch) | API 통신 |

### 8.2 백엔드

| 항목 | 기술 | 이유 |
|------|------|------|
| 런타임 | **Node.js** | 프론트와 동일 언어 |
| 프레임워크 | **Next.js API Routes** (또는 별도 Express) | 풀스택 통합 |
| ORM | **Prisma** | TypeScript 통합, 마이그레이션 |
| 이메일 | **Resend** (또는 Nodemailer) | 문의 접수 알림 |
| Validation | **Zod** | 프론트/백 스키마 공유 |

### 8.3 데이터베이스

| 항목 | 기술 | 이유 |
|------|------|------|
| RDBMS | **PostgreSQL** | JSONB 지원, 확장성 |
| 호스팅 | **Supabase** (또는 Neon) | 관리형 PostgreSQL |

### 8.4 인프라 & 배포

| 항목 | 기술 | 이유 |
|------|------|------|
| 호스팅 | **Vercel** | Next.js 최적화 |
| 도메인 | ezpzspace.com | — |
| CDN | Vercel Edge Network | 자동 |
| 모니터링 | **Sentry** | 에러 트래킹 |
| 분석 | **Google Analytics 4** | 트래픽/이벤트 분석 |

---

## 9. 비기능 요구사항

| 항목 | 요구사항 |
|------|----------|
| 성능 | LCP < 2.5초, FCP < 1.8초, CLS < 0.1 |
| SEO | 시맨틱 HTML, 메타 태그, OG 태그, sitemap.xml |
| 접근성 | WCAG 2.1 AA, 키보드 네비게이션, 스크린 리더 |
| 반응형 | 모바일 퍼스트 (< 768px), 태블릿 (768~1023px), 데스크톱 (≥ 1024px) |
| 보안 | HTTPS, 입력 값 sanitize, Rate limiting, CSRF 방지 |
| 개인정보 | 전화번호/주소 암호화 저장, 개인정보처리방침 |
| 브라우저 | Chrome, Safari, Samsung Internet (최신 2버전) |

---

## 10. 개별 PRD 문서

| 문서 | 범위 | 링크 |
|------|------|------|
| PRD-01 | 랜딩페이지, 메뉴, 도움말, 고객센터 | [PRD-01-landing.md](./PRD-01-landing.md) |
| PRD-02 | 견적 입력 프로세스 (5단계) | [PRD-02-estimate-process.md](./PRD-02-estimate-process.md) |
| PRD-03 | 견적 결과, 상담 신청, 완료 | [PRD-03-estimate-result.md](./PRD-03-estimate-result.md) |

---

## 11. 마일스톤 (참고)

| Phase | 범위 | 주요 산출물 |
|-------|------|-------------|
| Phase 1 | 랜딩페이지 + 견적 프로세스 (프론트엔드) | 정적 UI, 로컬 상태 |
| Phase 2 | 백엔드 API + DB 연동 | 견적 계산 로직, 데이터 저장 |
| Phase 3 | 상담 신청 + 이메일 알림 | 상담 플로우, 알림 시스템 |
| Phase 4 | 도움말 + 고객센터 | 콘텐츠 관리, 문의 처리 |
| Phase 5 | QA + 최적화 + 배포 | 성능 최적화, 프로덕션 배포 |
