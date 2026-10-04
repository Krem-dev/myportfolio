'use client';

import { useSyncExternalStore } from 'react';
import { LARGE_QUERY, SMALL_QUERY } from './ui/breakpoints';

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** WinUI "Small" size class (phones). The desktop metaphor is dropped here. */
export const useIsSmall = () => useMediaQuery(SMALL_QUERY);

/** WinUI "Large" size class: room for the desktop chrome alongside a window. */
export const useIsLarge = () => useMediaQuery(LARGE_QUERY);
