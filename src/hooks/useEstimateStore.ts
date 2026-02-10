import { create } from 'zustand';
import type {
  Address,
  WindowType,
  Dimensions,
  BrandEstimate,
} from '@/types';

interface EstimateState {
  // Step 1
  name: string;
  phone: string;
  // Step 2
  address: Address | null;
  // Step 3
  windowType: WindowType | null;
  // Step 4
  dimensions: Dimensions | null;
  // Step 5
  quantity: number | null;
  // Result
  estimateId: string | null;
  results: BrandEstimate[];

  // Actions
  setStep1: (name: string, phone: string) => void;
  setStep2: (address: Address) => void;
  setStep3: (windowType: WindowType | null) => void;
  setStep4: (dimensions: Dimensions | null) => void;
  setStep5: (quantity: number | null) => void;
  setResult: (estimateId: string, results: BrandEstimate[]) => void;
  reset: () => void;
  loadFromDraft: (data: Partial<EstimateState>) => void;
}

const initialState = {
  name: '',
  phone: '',
  address: null,
  windowType: null,
  dimensions: null,
  quantity: null,
  estimateId: null,
  results: [],
};

export const useEstimateStore = create<EstimateState>((set) => ({
  ...initialState,

  setStep1: (name, phone) => set({ name, phone }),
  setStep2: (address) => set({ address }),
  setStep3: (windowType) => set({ windowType }),
  setStep4: (dimensions) => set({ dimensions }),
  setStep5: (quantity) => set({ quantity }),
  setResult: (estimateId, results) => set({ estimateId, results }),
  reset: () => set(initialState),
  loadFromDraft: (data) => set(data),
}));
