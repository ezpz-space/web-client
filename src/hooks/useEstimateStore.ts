import { create } from 'zustand';
import type {
  Address,
  WindowType,
  GlassType,
  WindowConfig,
  WindowInfo,
  BrandEstimate,
  PriceRange,
  WindowSummary,
} from '@/types';

interface EstimateState {
  // Sign-in (optional)
  name: string;
  phone: string;
  // Address
  address: Address | null;
  // Multi-window
  windows: WindowInfo[];
  currentWindowIndex: number;
  // Current window being edited (partial state)
  editingWindow: Partial<WindowInfo>;
  // Result
  estimateId: string | null;
  totalPrice: PriceRange | null;
  windowSummary: WindowSummary[];
  brands: BrandEstimate[];

  // Actions — User info
  setUserInfo: (name: string, phone: string) => void;
  setAddress: (address: Address) => void;

  // Actions — Window editing
  startNewWindow: () => void;
  editWindow: (index: number) => void;
  setWindowType: (windowType: WindowType) => void;
  setWindowWidth: (width: number) => void;
  setWindowHeight: (height: number) => void;
  setWindowDetails: (glassType?: GlassType, windowConfig?: WindowConfig) => void;
  saveCurrentWindow: () => void;
  removeWindow: (index: number) => void;

  // Actions — Result
  setResult: (estimateId: string, totalPrice: PriceRange, windowSummary: WindowSummary[], brands: BrandEstimate[]) => void;

  // Actions — General
  reset: () => void;
  loadFromDraft: (data: Partial<EstimateState>) => void;
}

const initialState = {
  name: '',
  phone: '',
  address: null,
  windows: [],
  currentWindowIndex: 0,
  editingWindow: {},
  estimateId: null,
  totalPrice: null,
  windowSummary: [],
  brands: [],
};

export const useEstimateStore = create<EstimateState>((set, get) => ({
  ...initialState,

  setUserInfo: (name, phone) => set({ name, phone }),
  setAddress: (address) => set({ address }),

  startNewWindow: () => {
    const { windows } = get();
    set({
      currentWindowIndex: windows.length,
      editingWindow: { id: crypto.randomUUID(), quantity: 1 },
    });
  },

  editWindow: (index) => {
    const { windows } = get();
    if (index < windows.length) {
      set({
        currentWindowIndex: index,
        editingWindow: { ...windows[index] },
      });
    }
  },

  setWindowType: (windowType) =>
    set((state) => ({
      editingWindow: { ...state.editingWindow, windowType },
    })),

  setWindowWidth: (width) =>
    set((state) => ({
      editingWindow: { ...state.editingWindow, width },
    })),

  setWindowHeight: (height) =>
    set((state) => ({
      editingWindow: { ...state.editingWindow, height },
    })),

  setWindowDetails: (glassType, windowConfig) =>
    set((state) => ({
      editingWindow: { ...state.editingWindow, glassType, windowConfig },
    })),

  saveCurrentWindow: () => {
    const { editingWindow, currentWindowIndex, windows } = get();
    const w = editingWindow as WindowInfo;
    if (!w.id || !w.windowType || !w.width || !w.height) return;

    const updated = [...windows];
    if (currentWindowIndex < windows.length) {
      updated[currentWindowIndex] = w;
    } else {
      updated.push(w);
    }
    set({ windows: updated, editingWindow: {} });
  },

  removeWindow: (index) =>
    set((state) => ({
      windows: state.windows.filter((_, i) => i !== index),
    })),

  setResult: (estimateId, totalPrice, windowSummary, brands) =>
    set({ estimateId, totalPrice, windowSummary, brands }),

  reset: () => set(initialState),
  loadFromDraft: (data) => set(data),
}));
