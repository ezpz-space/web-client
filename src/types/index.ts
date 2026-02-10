// ── Estimate Input (5-step form data) ──

export interface Address {
  zonecode: string;
  address: string;
  addressDetail?: string;
  floor?: number;
}

export type WindowType = 'expanded' | 'non-expanded';

export interface Dimensions {
  width: number;
  height: number;
}

export interface EstimateInput {
  name: string;
  phone: string;
  address: Address;
  windowType: WindowType | null;
  dimensions: Dimensions | null;
  quantity: number | null;
}

// ── Estimate Result (API response) ──

export type BrandCode = 'LX' | 'KCC' | 'CHUNGAM';

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
  minPrice: number;
  maxPrice: number;
  pricePerUnit: PriceRange;
  pricePerPyeong: PriceRange;
  installationCount: number;
  features: string[];
  details: BrandDetail;
}

export interface EstimateResponse {
  estimateId: string;
  results: BrandEstimate[];
}

// ── Consultation ──

export type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';
export type ConsultationType = 'PHONE' | 'VISIT';

export interface ConsultationRequest {
  estimateId: string;
  name: string;
  phone: string;
  address: string;
  availableDays: DayOfWeek[];
  timeSlot: string;
  consultationType: ConsultationType;
}

export interface ConsultationResponse {
  consultationId: string;
  message: string;
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
  lastStep: number;
  createdAt: string;
  data: Partial<EstimateInput>;
}
