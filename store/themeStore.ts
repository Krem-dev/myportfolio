import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark';

interface ThemeStore {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

const STORAGE_KEY = 'theme';

export function readInitialTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  mode: 'light',
  setMode: (mode) => set({ mode }),
  toggle: () => {
    const mode = get().mode === 'light' ? 'dark' : 'light';
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {}
    set({ mode });
  },
}));
