// ── Estimate Input (Multi-window flow) ──

export interface Address {
  zonecode: string;
  address: string;
  addressDetail?: string;
}

export type WindowType = 'standard' | 'expanded' | 'non-expanded';
export type GlassType = 'clear' | 'lowe' | 'super-double-lowe';
export type WindowConfig = 'fix' | '2w' | '3w';

export interface WindowInfo {
  id: string;
  windowType: WindowType;
  width: number;   // mm
  height: number;  // mm
  glassType?: GlassType;
  windowConfig?: WindowConfig;
  quantity: number; // default 1
}

export interface EstimateInput {
  name?: string;
  phone?: string;
  address: Address;
  windows: WindowInfo[];
}

// ── Estimate Result (API response) ──

export type BrandCode = 'LX' | 'KCC' | 'CHEONGAM';

export interface PriceRange {
  min: number;
  max: number;
}

export interface BrandDetail {
  glassType: string;
  frameMaterial: string;
  thermalPerformance: string;
  soundInsulation: string;
  warrantyYears: number;
}

export interface BrandEstimate {
  brand: BrandCode;
  brandName: string;
  logoUrl: string;
  priceRange: PriceRange;
  installationCost: number;
  description: string;
  promotions?: string[];
  details: BrandDetail;
}

export interface WindowSummary {
  type: string;
  count: number;
}

export interface EstimateResponse {
  estimateId: string;
  totalPrice: PriceRange;
  windowSummary: WindowSummary[];
  brands: BrandEstimate[];
}

// ── Consultation ──

export type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';

export interface ConsultationRequest {
  estimateId: string;
  name?: string;
  phone?: string;
  preferredDays?: DayOfWeek[];
  preferredTime?: string;
}

export interface ConsultationResponse {
  consultationId: string;
  success: boolean;
}

// ── Contact ──

export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  content: string;
}

// ── localStorage draft ──

export interface EstimateDraft {
  createdAt: string;
  userInfo?: { name: string; phone: string };
  address?: Address;
  windows: Partial<WindowInfo>[];
  currentWindowIndex: number;
  currentStep: string;
}
