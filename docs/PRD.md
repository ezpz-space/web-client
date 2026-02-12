# PRD: ezpz — 창호 견적 비교 웹서비스

> **프로젝트**: ezpz
> **버전**: 2.0 (Figma Design 기반 전면 개정)
> **최종 수정**: 2026-02-10
> **도메인**: ezpzspace.com
> **Figma**: Design 페이지 (`EiBoPAigLQxQ0jz1nYqqyz`)

---

## 1. 프로젝트 개요

### 1.1 한 줄 소개

창호(샤시) 교체 가견적을 비대면으로 비교할 수 있는 모바일 퍼스트 반응형 웹 서비스

### 1.2 문제 정의

- 창호 교체 시 여러 업체에 개별 연락해야 하는 번거로움
- 브랜드/가격 비교가 어려워 합리적 의사결정 곤란
- 대면 견적 방문의 시간적/심리적 부담

### 1.3 해결 방안

- 주소와 창 정보만으로 LX, KCC, 청암 등 브랜드별 가견적 범위 비교
- 여러 개의 창문을 등록하여 종합 가견적 산출
- 원하면 전문가 상담(전화/방문) 신청까지 원스톱 진행

---

## 2. User Flow

```
[랜딩페이지]
    │
    ├── CTA "견적 알아보기"
    │       │
    │       ▼
    │   [Sign-in: 이름 + 연락처]
    │       │
    │       ├── "신규 견적 알아보기" → [주소 입력]
    │       └── "건너뛰기"           → [주소 입력]
    │
    │   [주소 입력 (1/3)]
    │       │
    │       ▼
    │   ┌── 창 정보 입력 (창 N) ──────────────────────┐
    │   │                                              │
    │   │   [창 유형 선택 (1/3)]                        │
    │   │       ├── 일반 창                             │
    │   │       └── 발코니 창 → 확장/비확장              │
    │   │           │                                   │
    │   │           ▼                                   │
    │   │   [가로 길이 입력 (2/3)]                       │
    │   │           │                                   │
    │   │           ▼                                   │
    │   │   [세로 길이 입력 (3/3)]                       │
    │   │           │                                   │
    │   │           ▼                                   │
    │   │   [(선택) 상세 정보: 유리 유형 + 창 구성]       │
    │   │                                              │
    │   └──────────────────────────────────────────────┘
    │       │
    │       ▼
    │   [창 정보 목록]
    │       ├── "추가하기" → 창 정보 입력 반복
    │       └── "최종 견적 확인하기"
    │               │
    │               ▼
    │           [로딩 화면]
    │               │
    │               ▼
    │           [최종 견적 결과]
    │               │
    │               ├── "상담 요청하기"
    │               │       │
    │               │       ▼
    │               │   [상담 요청: 이름/연락처 + 일정]
    │               │       │
    │               │       ▼
    │               │   [완료 화면]
    │               │
    │               └── "저장하기" → 저장 후 홈
    │
    ├── 햄버거 메뉴
    │       ├── 홈
    │       ├── 견적 시작하기
    │       ├── 도움말
    │       └── 고객센터
    │
    └── 스크롤
        ├── Feature 섹션 (3개)
        ├── 실적 섹션 (3K+, 2K+)
        ├── 브랜드 섹션
        ├── FAQ 아코디언 (10개)
        └── 하단 CTA
```

---

## 3. Information Architecture (IA)

```
ezpz
├── 홈 (/)
│   ├── Header (로고 + 햄버거)
│   ├── Hero 섹션
│   ├── Feature 섹션 x3
│   ├── 실적 섹션
│   ├── 브랜드 섹션
│   ├── FAQ 아코디언
│   ├── 하단 CTA
│   └── Footer
│
├── 견적 프로세스 (/estimate)
│   ├── Sign-in (/estimate/step1) — 이름, 연락처
│   ├── 주소 입력 (/estimate/step2) — 주소, 상세주소
│   ├── 창 정보 입력 (per-window sub-flow)
│   │   ├── 창 유형 (/estimate/window/type) — 일반/발코니 + 확장여부
│   │   ├── 가로 길이 (/estimate/window/width) — mm 입력
│   │   ├── 세로 길이 (/estimate/window/height) — mm 입력
│   │   └── 상세 정보 (/estimate/window/details) — 유리 유형, 창 구성 (선택)
│   ├── 창 목록 (/estimate/windows) — 등록된 창 요약, 추가/삭제
│   ├── 로딩 (/estimate/loading) — 견적 계산 중
│   ├── 최종 견적 (/estimate/result) — 총 가견적, 브랜드별 상세
│   ├── 상담 요청 (/estimate/consultation) — 이름/연락처 + 일정 선택
│   └── 완료 (/estimate/complete)
│
├── 도움말 (/help) — 후순위
└── 고객센터 (/contact) — 후순위
```

---

## 4. 전체 페이지 & 라우트 목록

| # | 라우트 | 페이지명 | PRD 문서 | 설명 |
|---|--------|----------|----------|------|
| 1 | `/` | 랜딩페이지 | PRD-01 | 서비스 소개, CTA |
| 2 | `/estimate/step1` | Sign-in | PRD-02 | 이름, 연락처 (Skip 가능) |
| 3 | `/estimate/step2` | 주소 입력 | PRD-02 | 카카오 주소 검색 |
| 4 | `/estimate/window/type` | 창 유형 | PRD-02 | 일반/발코니, 확장여부 |
| 5 | `/estimate/window/width` | 가로 길이 | PRD-02 | mm 단위 입력 |
| 6 | `/estimate/window/height` | 세로 길이 | PRD-02 | mm 단위 입력 |
| 7 | `/estimate/window/details` | 상세 정보 | PRD-02 | 유리 유형, 창 구성 (선택) |
| 8 | `/estimate/windows` | 창 목록 | PRD-02 | 등록된 창 요약, 추가/삭제 |
| 9 | `/estimate/loading` | 로딩 | PRD-02 | 견적 계산 중 |
| 10 | `/estimate/result` | 최종 견적 | PRD-03 | 총 가견적, 브랜드별 상세 |
| 11 | `/estimate/consultation` | 상담 요청 | PRD-03 | 이름/연락처 + 일정 |
| 12 | `/estimate/complete` | 완료 | PRD-03 | 성공 메시지 |

---

## 5. 디자인 시스템

### 5.1 색상 (Figma Foundation_color)

| 토큰 | 값 | 용도 |
|------|----|------|
| **Primary (Lime)** | `#EAFF7C` | 하이라이트, 강조 배지 |
| Primary/100 | `#FDFFF0` | 라이트 배경 |
| Primary/200 | `#F7FFCC` | |
| Primary/300 | `#c1d700` | |
| Primary/400 | `#9cae00` | |
| Primary/500 | `#788700` | |
| Primary/600 | `#576200` | |
| Primary/700 | `#373f00` | |
| **Secondary (Teal)** | `#036463` | CTA 버튼, 링크, 인터랙티브 요소 |
| Secondary/100 | `#aefffe` | |
| Secondary/200 | `#10dfdd` | |
| Secondary/300 | `#0bb4b2` | |
| Secondary/400 | `#068b8a` | |
| Secondary/500 | `#036463` | 주 사용 색상 |
| Secondary/600 | `#01403f` | 호버/다크 |
| Secondary/700 | `#001e1e` | |
| **Grayscale** | | |
| Gray 100 | `#d6d6d6` | 보더 |
| Gray 200 | `#afafaf` | |
| Gray 300 | `#898989` | |
| Gray 400 | `#656565` | 보조 텍스트 |
| Gray 500 | `#434343` | |
| Gray 600 | `#242424` | 본문 텍스트 |
| Gray 700 | `#000000` | |
| **System** | | |
| Error | `#FF6D70` | 에러 상태 |
| Success | `#5EE085` | 성공 상태 |
| **ETC/Input** | | |
| Input BG | `#F0F4F5` | 입력 필드 배경 |
| Input Light | `#FBFBF9` | |
| Input Alt | `#F6F7EE` | |

> **참고**: Figma에서 "Primary"는 Lime(#EAFF7C), "Secondary"는 Teal(#036463)이지만,
> UI에서 CTA 버튼 등 주요 인터랙션에는 **Secondary(Teal)**이 사용됩니다.
> 코드에서는 `--color-primary: #036463` (Teal)로 매핑합니다.

### 5.2 타이포그래피 (Figma 기준)

| 용도 | 크기 | 굵기 | 예시 |
|------|------|------|------|
| 대형 숫자 입력 | 60px | Bold (700) | 규격 입력값 |
| 통계 숫자 | 53px | Bold (700) | 3K+, 2K+ |
| 가격 표시 | 36px | Bold (700) | 100~300 |
| 랜딩 헤드라인 | 30px | Bold (700) | Hero 제목 |
| 섹션 서브헤드 | 26px | Bold (700) | Feature 제목 |
| 화면 제목 | 24px | Bold (700) | 각 Step 질문 |
| 단위 라벨 | 24px | Regular (400) | mm |
| 모달 제목 | 20px | SemiBold (600) | 다이얼로그 |
| 옵션 제목 | 18px | SemiBold (600) | 일반 창, 발코니 창 |
| 네비 제목 | 18px | Bold (700) | 견적 알아보기 |
| 스킵 액션 | 17px | Medium (500) | 건너뛰기 |
| CTA 버튼 | 16px | SemiBold (600) | 계속하기 |
| 본문 | 16px | Regular (400) | 설명 텍스트 |
| 폼 라벨 | 15px | Regular (400) | 이름, 연락처 |
| 옵션 칩 | 14px | SemiBold (600) | 투명, 로이, 2W |
| 부가 정보 | 14px | Regular (400) | 면책 문구 |
| 요약 텍스트 | 13px | Medium (500) | 창 정보 요약 |
| 스텝 표시 | 12px | Regular (400) | 1/3, 2/3 |
| 뱃지 | 10px | SemiBold (600) | TIME SENSITIVE |

**폰트 패밀리**: Pretendard (UI), Noto Sans KR (Foundation 제목)

### 5.3 버튼 (Figma Button)

| 타입 | 스타일 | 용도 |
|------|--------|------|
| Primary | Secondary(Teal) 배경 + 흰색 텍스트 | CTA 버튼 |
| Secondary | 라운드 보더 + 아이콘 중앙 | 옵션 선택 |
| Text/L | 텍스트만 (16px SemiBold) | 건너뛰기 등 |
| Text/S | 텍스트만 (14px Regular) | 보조 액션 |
| Text underline | 밑줄 (13px Medium) | 기존 견적 불러오기 |
| Form Button | 카드형 (16px Bold 제목 + 14px SemiBold CTA) | 창 정보 입력하기 |
| Round-L | 대형 라운드 카드 (18px SemiBold) | 일반 창/발코니 창 |

### 5.4 반응형 Breakpoint

| 이름 | 범위 | Figma |
|------|------|-------|
| Mobile | < 678px | 기본 (모바일 퍼스트) |
| Tablet | 678px ~ 1099px | tablet 섹션 |
| Desktop | ≥ 1100px | pc 섹션 |

---

## 6. 데이터 모델

### 6.1 사용자 입력 (클라이언트)

```typescript
// Sign-in (Skip 가능)
interface UserInfo {
  name: string;
  phone: string;
}

// 주소
interface Address {
  zonecode: string;
  address: string;
  addressDetail?: string;
}

// 개별 창 정보
interface WindowInfo {
  id: string;                                    // 클라이언트 생성 UUID
  windowType: 'standard' | 'expanded' | 'non-expanded';
  width: number;                                 // mm
  height: number;                                // mm
  glassType?: 'clear' | 'lowe' | 'super-double-lowe';  // 선택
  windowConfig?: 'fix' | '2w' | '3w';           // 선택
  quantity: number;                              // 기본 1
}

// 전체 견적 입력
interface EstimateInput {
  userInfo?: UserInfo;        // Skip 가능
  address: Address;           // 필수
  windows: WindowInfo[];      // 1개 이상
}
```

### 6.2 견적 결과 (서버 응답)

```typescript
interface EstimateResponse {
  estimateId: string;
  totalPrice: { min: number; max: number };
  windowSummary: { type: string; count: number }[];
  brands: BrandEstimate[];
}

interface BrandEstimate {
  brand: 'LX' | 'KCC' | 'CHEONGAM';
  brandName: string;        // "LX", "KCC 글라스", "청암홈 윈도우"
  priceRange: { min: number; max: number };
  installationCost: number;
  description: string;       // 브랜드 설명 (15px)
  promotions?: string[];     // "20% 할인", "안전방충망 행사 중"
}
```

### 6.3 상담 요청

```typescript
interface ConsultationRequest {
  estimateId: string;
  name: string;
  phone: string;
  preferredDates?: string[];   // ISO date strings (캘린더 선택)
  preferredTime?: string;      // 시간대
}
```

---

## 7. API Endpoint 설계

| Method | Endpoint | 설명 |
|--------|----------|------|
| `POST` | `/api/estimates` | 견적 생성 (창 목록 기반) |
| `GET` | `/api/estimates/:id` | 저장된 견적 조회 |
| `POST` | `/api/consultations` | 상담 요청 |

---

## 8. 기술 스택

| 항목 | 기술 | 이유 |
|------|------|------|
| 프레임워크 | Next.js 16+ (App Router) | SSR/SSG, 파일 라우팅 |
| 언어 | TypeScript | 타입 안전성 |
| 스타일링 | Tailwind CSS v4 | 모바일 퍼스트, `@theme inline` |
| 상태 관리 | Zustand | 경량, 다중 창 상태 관리 |
| 폼 검증 | Zod | 프론트/백 스키마 공유 |
| 주소 검색 | 카카오 주소 API | 국내 표준 |
| DB | PostgreSQL (Prisma) | JSONB, 마이그레이션 |
| 배포 | Vercel | Next.js 최적 호환 |
| 폰트 | Pretendard | Figma 디자인 시스템 |

---

## 9. 비기능 요구사항

| 항목 | 요구사항 |
|------|----------|
| 성능 | LCP < 2.5초, CLS < 0.1 |
| SEO | 시맨틱 HTML, 메타 태그, OG 태그, sitemap.xml |
| 접근성 | WCAG 2.1 AA, 키보드 네비게이션 |
| 반응형 | 모바일 퍼스트 (< 678px) |
| 보안 | HTTPS, 입력 값 sanitize |

---

## 10. 개별 PRD 문서

| 문서 | 범위 |
|------|------|
| [PRD-01-landing.md](./PRD-01-landing.md) | 랜딩페이지, 메뉴 |
| [PRD-02-estimate-process.md](./PRD-02-estimate-process.md) | 견적 입력 (Sign-in → 창 목록 → 로딩) |
| [PRD-03-estimate-result.md](./PRD-03-estimate-result.md) | 최종 견적, 상담 요청, 완료 |
