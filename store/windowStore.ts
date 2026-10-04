import { create } from 'zustand';
import type { AppId, WindowState } from '@/types';

export const TASKBAR_HEIGHT = 48;

interface OpenOptions {
  width: number;
  height: number;
}

interface WindowStore {
  windows: WindowState[];
  activeId: AppId | null;
  topZ: number;
  open: (id: AppId, size: OpenOptions) => void;
  close: (id: AppId) => void;
  closeAll: () => void;
  focus: (id: AppId) => void;
  minimize: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  setBounds: (id: AppId, bounds: Partial<Pick<WindowState, 'x' | 'y' | 'width' | 'height'>>) => void;
  /** Taskbar behaviour: open → focus → minimize, like Windows. */
  activate: (id: AppId, size: OpenOptions) => void;
  /** Pull every window back inside the work area after the viewport changes size. */
  clampWindows: () => void;
}

function topmostVisible(windows: WindowState[], exclude?: AppId): AppId | null {
  const candidates = windows.filter((w) => !w.minimized && w.id !== exclude);
  if (!candidates.length) return null;
  return candidates.reduce((a, b) => (a.z > b.z ? a : b)).id;
}

// Desktop chrome that new windows should avoid covering (see components/desktop.tsx).
const ICON_COLUMN = 104;
const PROFILE_WIDGET = 392;
const MIN_WORK_AREA = 640;
// WinUI's Large size class. Below this the profile widget is hidden, so the
// whole width is free for windows (see components/desktop.tsx).
const LARGE_BREAKPOINT = 1008;

function initialBounds(count: number, { width, height }: OpenOptions) {
  if (typeof window === 'undefined') return { x: 80, y: 40, width, height };
  const vw = window.innerWidth;
  const vh = window.innerHeight - TASKBAR_HEIGHT;

  // Prefer the free area between the icon column and the profile widget; fall back to the whole screen.
  let left = ICON_COLUMN;
  let right = vw >= LARGE_BREAKPOINT ? vw - PROFILE_WIDGET : vw - 16;
  if (right - left < MIN_WORK_AREA) {
    left = 16;
    right = vw - 16;
  }

  const w = Math.min(width, right - left);
  const h = Math.min(height, vh - 32);
  const offset = (count % 6) * 28;
  return {
    width: w,
    height: h,
    x: Math.min(left + Math.round((right - left - w) / 2) + offset, vw - w - 16),
    y: Math.max(16, Math.min(Math.round((vh - h) / 2) - 24 + offset, vh - h - 16)),
  };
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  activeId: null,
  topZ: 10,

  open: (id, size) => {
    const existing = get().windows.find((w) => w.id === id);
    if (existing) {
      get().focus(id);
      return;
    }
    set((s) => {
      const z = s.topZ + 1;
      return {
        windows: [
          ...s.windows,
          { id, ...initialBounds(s.windows.length, size), z, minimized: false, maximized: false },
        ],
        activeId: id,
        topZ: z,
      };
    });
  },

  close: (id) =>
    set((s) => {
      const windows = s.windows.filter((w) => w.id !== id);
      return { windows, activeId: s.activeId === id ? topmostVisible(windows) : s.activeId };
    }),

  closeAll: () => set({ windows: [], activeId: null }),

  focus: (id) =>
    set((s) => {
      const z = s.topZ + 1;
      return {
        windows: s.windows.map((w) => (w.id === id ? { ...w, z, minimized: false } : w)),
        activeId: id,
        topZ: z,
      };
    }),

  minimize: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
      activeId: s.activeId === id ? topmostVisible(s.windows, id) : s.activeId,
    })),

  toggleMaximize: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)),
    })),

  setBounds: (id, bounds) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, ...bounds } : w)),
    })),

  clampWindows: () =>
    set((s) => {
      if (typeof window === 'undefined') return s;
      const vw = window.innerWidth;
      const vh = window.innerHeight - TASKBAR_HEIGHT;
      return {
        windows: s.windows.map((w) => {
          const width = Math.min(w.width, Math.max(280, vw - 16));
          const height = Math.min(w.height, Math.max(220, vh - 16));
          return {
            ...w,
            width,
            height,
            x: Math.min(Math.max(w.x, 8), Math.max(8, vw - width - 8)),
            y: Math.min(Math.max(w.y, 0), Math.max(0, vh - height - 8)),
          };
        }),
      };
    }),

  activate: (id, size) => {
    const { windows, activeId, open, focus, minimize } = get();
    const win = windows.find((w) => w.id === id);
    if (!win) open(id, size);
    else if (win.minimized || activeId !== id) focus(id);
    else minimize(id);
  },
}));
