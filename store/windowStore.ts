import { create } from 'zustand';
import { WindowState } from '@/types';

interface WindowStoreState {
  windows: WindowState[];
  nextZIndex: number;
  addWindow: (window: Omit<WindowState, 'zIndex'>) => void;
  removeWindow: (id: string) => void;
  updateWindow: (id: string, updates: Partial<WindowState>) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  getWindowById: (id: string) => WindowState | undefined;
}

export const useWindowStore = create<WindowStoreState>((set, get) => ({
  windows: [],
  nextZIndex: 1,

  addWindow: (window) =>
    set((state) => ({
      windows: [...state.windows, { ...window, zIndex: state.nextZIndex }],
      nextZIndex: state.nextZIndex + 1,
    })),

  removeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    })),

  updateWindow: (id, updates) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, ...updates } : w)),
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
    })),

  maximizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: true, x: 0, y: 0, width: 100, height: 100 } : w
      ),
    })),

  restoreWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: false, isMaximized: false } : w
      ),
    })),

  focusWindow: (id) =>
    set((state) => {
      const maxZ = Math.max(...state.windows.map((w) => w.zIndex), 0);
      return {
        windows: state.windows.map((w) =>
          w.id === id ? { ...w, zIndex: maxZ + 1 } : w
        ),
        nextZIndex: maxZ + 2,
      };
    }),

  getWindowById: (id) => get().windows.find((w) => w.id === id),
}));
